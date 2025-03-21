import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
  return (
    <header className="py-6 border-b border-slate-300 sticky top-0 bg-parchment/95 backdrop-blur-sm z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading text-slate-800">Curtis James | Lederle</Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-slate-600 text-sm">{pageName}</span>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PageHeader; 