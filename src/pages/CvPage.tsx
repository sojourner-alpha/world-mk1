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
    <div className="bg-slate-100 min-h-screen py-4 md:py-8">
      <div className="max-w-5xl mx-auto px-0 md:px-4">
        <header className="mb-4 md:mb-8 px-4">
          <h1 className="text-2xl md:text-3xl font-heading text-slate-800 mb-4 text-center">Curtis James | Lederle</h1>
          
          {/* Desktop layout - row */}
          <div className="hidden md:flex justify-between items-center">
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
          
          {/* Mobile layout - centered buttons */}
          <div className="flex md:hidden flex-col items-center justify-center space-y-3">
            <a 
              href="/world-mk1/curtis_lederle_cv.pdf" 
              download
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full max-w-[220px] justify-center shadow-sm font-medium"
            >
              <FaDownload className="mr-2" />
              <span>Download CV</span>
            </a>
            <Link 
              to="/workshop" 
              className="flex items-center text-blue-600 hover:text-blue-800 py-2 w-full max-w-[220px] justify-center text-sm"
            >
              <FaArrowLeft className="mr-1.5" size={12} />
              <span>Back to Workshop</span>
            </Link>
          </div>
        </header>
        
        {/* Hidden CV template for PDF generation */}
        <div className="hidden">
          <div ref={cvRef} style={{ width: '8.5in', height: '11in', background: 'white' }}>
            <CvTemplate />
          </div>
        </div>
        
        {/* Mobile-specific container with precisely sized content */}
        <div className="block md:hidden mb-4">
          {/* Container sized to exactly fit CV at 0.5 scale */}
          <div className="flex justify-center overflow-hidden">
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ 
              width: '408px', /* 8.5in * 0.5 * 96dpi */
              height: '528px', /* 11in * 0.5 * 96dpi */
              maxWidth: '100%' 
            }}>
              <div style={{ 
                width: '816px', /* 8.5in * 96dpi */
                height: '1056px', /* 11in * 96dpi */
                transform: 'scale(0.5)',
                transformOrigin: 'top left' 
              }}>
                <CvTemplate />
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop container with centered alignment */}
        <div className="hidden md:flex justify-center mb-10">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden transform scale-[0.85] origin-top" style={{ width: '8.5in', height: '11in' }}>
            <CvTemplate />
          </div>
        </div>
        
        <div className="mt-4 md:mt-8 text-center text-gray-600 bg-slate-200 p-4 rounded-lg mx-4">
          <p className="font-medium">Click the download button to save as PDF.</p>
          <p className="text-sm mt-2">All links in the PDF remain active for digital distribution.</p>
          <p className="text-sm mt-2 md:hidden">The CV is shown at reduced size to fit your screen.</p>
        </div>
      </div>
    </div>
  );
};

export default CvPage; 