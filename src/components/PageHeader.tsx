import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

interface PageHeaderProps {
  pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-b from-black/50 to-transparent pt-6 pb-4">
        <div className="container-custom">
          <div className="flex items-center justify-between relative">
            {/* Mobile back arrow - visible on mobile only */}
            <Link to="/" className="md:hidden text-white/80 hover:text-white absolute left-0 z-10">
              <FaChevronLeft size={18} />
            </Link>
            
            {/* Center title on mobile, left-aligned on desktop */}
            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <Link to="/" className="text-2xl font-heading text-white">Curtis James | Lederle</Link>
            </div>
            
            {/* Desktop navigation - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white/80 hover:text-white text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Home</span>
              </Link>
              <span className="text-white/80 text-sm">{pageName}</span>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader; 