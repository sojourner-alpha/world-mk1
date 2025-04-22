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
    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (document, element) => {
          // Make links visible in cloned document for capturing positions
          const links = element.getElementsByTagName('a');
          Array.from(links).forEach(link => {
            link.style.color = '#1d4ed8'; // Make links blue
            link.style.textDecoration = 'underline';
          });
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'letter');
      
      // Calculate scaling to fit the page while maintaining aspect ratio
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = Math.min(widthRatio, heightRatio);
      
      const centerX = (pageWidth - canvas.width * ratio) / 2;
      const centerY = (pageHeight - canvas.height * ratio) / 2;
      
      // Add the image first
      pdf.addImage(imgData, 'PNG', centerX, centerY, canvas.width * ratio, canvas.height * ratio);

      // Then add all the links
      if (cvRef.current) {
        const links = cvRef.current.getElementsByTagName('a');
        const cvWidth = cvRef.current.offsetWidth;
        const cvHeight = cvRef.current.offsetHeight;
        
        Array.from(links).forEach(link => {
          const rect = link.getBoundingClientRect();
          const parent = link.offsetParent as HTMLElement;
          if (!parent) return;
          
          // Calculate position relative to CV container
          const x = (link.offsetLeft / cvWidth) * canvas.width * ratio + centerX;
          const y = (link.offsetTop / cvHeight) * canvas.height * ratio + centerY;
          const width = (link.offsetWidth / cvWidth) * canvas.width * ratio;
          const height = (link.offsetHeight / cvHeight) * canvas.height * ratio;
          
          // Add clickable link annotation
          pdf.link(x, y, width, height, { url: link.href });
        });
      }
      
      pdf.save('curtis_lederle_cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
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
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FaDownload className="mr-2" />
                    <span>Generate & Download</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile layout - centered buttons */}
          <div className="flex md:hidden flex-col items-center justify-center space-y-3">
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full max-w-[220px] justify-center shadow-sm font-medium"
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FaDownload className="mr-2" />
                  <span>Generate & Download</span>
                </>
              )}
            </button>
            <Link 
              to="/workshop" 
              className="flex items-center text-blue-600 hover:text-blue-800 py-2 w-full max-w-[220px] justify-center text-sm"
            >
              <FaArrowLeft className="mr-1.5" size={12} />
              <span>Back to Workshop</span>
            </Link>
          </div>
        </header>
        
        {/* CV template for PDF generation */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div ref={cvRef} style={{ width: '816px', height: '1056px', background: 'white' }}>
            <CvTemplate />
          </div>
        </div>
        
        {/* Mobile-specific container with precisely sized content */}
        <div className="block md:hidden mb-4">
          <div className="flex justify-center overflow-hidden">
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ 
              width: '408px',
              height: '528px',
              maxWidth: '100%' 
            }}>
              <div style={{ 
                width: '816px',
                height: '1056px',
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
          <p className="font-medium">Click the generate button to create and download the latest version.</p>
          <p className="text-sm mt-2">The PDF will be generated with active links for digital distribution.</p>
          <p className="text-sm mt-2 md:hidden">The CV is shown at reduced size to fit your screen.</p>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/alt-cv" className="text-blue-600 hover:text-blue-800">
            View General CV
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CvPage; 