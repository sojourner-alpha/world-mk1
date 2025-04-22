import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

interface PageHeaderProps {
  pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-b from-black/70 to-black/20 pt-4 md:pt-6 pb-4">
        <div className="container-custom px-4 md:px-6">
          <div className="flex items-center justify-between relative">
            {/* Mobile back arrow - visible on mobile only */}
            <Link to="/" className="md:hidden text-white/80 hover:text-white z-10 px-2 py-1 -ml-2">
              <FaChevronLeft size={18} />
            </Link>
            
            {/* Center title on mobile, left-aligned on desktop */}
            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <Link to="/" className="text-xl md:text-2xl font-heading text-white">Curtis James | Lederle</Link>
            </div>
            
            {/* Desktop navigation - hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className={`text-white/80 hover:text-white text-sm flex items-center transition-colors ${pageName === 'Home' ? 'text-white underline underline-offset-4' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/workshop" 
                className={`text-white/80 hover:text-white text-sm transition-colors ${pageName === 'Workshop' ? 'text-white underline underline-offset-4' : ''}`}
              >
                Workshop
              </Link>
              <Link 
                to="/study" 
                className={`text-white/80 hover:text-white text-sm transition-colors ${pageName === 'Study' ? 'text-white underline underline-offset-4' : ''}`}
              >
                Study
              </Link>
              <Link 
                to="/loft" 
                className={`text-white/80 hover:text-white text-sm transition-colors ${pageName === 'Loft' ? 'text-white underline underline-offset-4' : ''}`}
              >
                Loft
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader; 