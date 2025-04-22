import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiSubstack } from 'react-icons/si';

const PageFooter: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-300">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-heading text-slate-800">Curtis James | Lederle </h2>
            <p className="text-sm text-slate-600">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/sojourner-alpha" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-600 hover:text-slate-800 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://x.com/curtlederle" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-600 hover:text-slate-800 transition-colors"
              aria-label="Twitter/X"
            >
              <FaXTwitter size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/clederle/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-600 hover:text-slate-800 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a 
              href="https://curtislederle.substack.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-600 hover:text-slate-800 transition-colors"
              aria-label="Substack"
            >
              <SiSubstack size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter; 