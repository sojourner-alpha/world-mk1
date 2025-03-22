import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaSpinner } from 'react-icons/fa';
import CvTemplate from './CvTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CvPage: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!cvRef.current) return;

    setIsGenerating(true);
    const cv = cvRef.current;
    
    try {
      // Create a PDF with links enabled
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: [8.5, 11]
      });
      
      // Use html2canvas with higher quality settings
      const canvas = await html2canvas(cv, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions
      const imgWidth = 8.5;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Find and add hyperlinks to the PDF
      if (cvRef.current) {
        const links = cvRef.current.querySelectorAll('a');
        links.forEach(link => {
          const rect = link.getBoundingClientRect();
          const cvRect = cv.getBoundingClientRect();
          
          // Calculate relative position in PDF coordinates
          const x = (rect.left - cvRect.left) * imgWidth / cvRect.width;
          const y = (rect.top - cvRect.top) * imgHeight / cvRect.height;
          const width = rect.width * imgWidth / cvRect.width;
          const height = rect.height * imgHeight / cvRect.height;
          
          // Add link annotation to PDF
          pdf.link(x, y, width, height, { url: link.href });
        });
      }
      
      pdf.save('curtis_lederle_cv.pdf');
      
    } catch (error) {
      console.error('Error generating PDF', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-heading text-slate-800 mb-4">Curtis James | Lederle</h1>
          
          <div className="flex justify-between items-center">
            <Link to="/workshop" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="mr-2" />
              <span>Back to Workshop</span>
            </Link>
            <div className="flex space-x-4">
              <a 
                href="/world-mk1/curtis_lederle_cv.pdf" 
                download
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <FaDownload className="mr-2" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </header>
        
        {/* Template Preview with drop shadow and scaling */}
        <div className="flex justify-center mb-10">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden transform scale-85 origin-top mx-auto" style={{ width: '8.5in', height: '11in' }}>
            <div ref={cvRef}>
              <CvTemplate />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-600 bg-slate-200 p-4 rounded-lg">
          <p className="font-medium">Preview of your CV resume above. Click the download button to save as PDF.</p>
          <p className="text-sm mt-2">All links in the PDF remain active for digital distribution.</p>
        </div>
      </div>
    </div>
  );
};

export default CvPage; 