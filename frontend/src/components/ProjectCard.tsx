import React from 'react';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { SiNotion, SiSubstack } from 'react-icons/si';

// Define the interface for project data
export interface ProjectCardProps {
  name: string;
  description: string;
  technologies: string[];
  type: 'github' | 'notion' | 'substack' | 'tool';
  isPublic?: boolean;
  githubUrl?: string;
  url?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  technologies,
  type,
  isPublic = true,
  githubUrl,
  url
}) => {
  const getBgColorClass = () => {
    switch (type) {
      case 'github':
        return 'bg-gray-800 border-gray-700';
      case 'notion':
        return 'bg-white border-gray-300';
      case 'substack':
        return 'bg-amber-50 border-amber-200';
      case 'tool':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-gray-300';
    }
  };

  const getTextColorClass = () => {
    switch (type) {
      case 'github':
        return 'text-white';
      case 'notion':
        return 'text-gray-800';
      case 'substack':
        return 'text-amber-900';
      case 'tool':
        return 'text-blue-900';
      default:
        return 'text-gray-800';
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'github':
        return isPublic ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed';
      case 'notion':
        return isPublic ? 'bg-gray-800 hover:bg-black text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed';
      case 'substack':
        return isPublic ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-200 text-amber-400 cursor-not-allowed';
      case 'tool':
        return isPublic ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-200 text-blue-400 cursor-not-allowed';
      default:
        return isPublic ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed';
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'github':
        return <FaGithub className="mr-2" />;
      case 'notion':
        return <SiNotion className="mr-2" />;
      case 'substack':
        return <SiSubstack className="mr-2" />;
      case 'tool':
        return <FaArrowRight className="mr-2" />;
      default:
        return <FaArrowRight className="mr-2" />;
    }
  };

  return (
    <div className={`rounded-xl shadow-md border overflow-hidden transform hover:scale-[1.02] transition-all ${getBgColorClass()}`}>
      <div className="p-6">
        <h3 className={`text-lg font-bold mb-2 ${getTextColorClass()}`}>{name}</h3>
        <p className={`text-sm mb-4 ${type === 'github' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className={`px-2 py-1 rounded-full text-xs ${
                type === 'github' 
                  ? 'bg-gray-700 text-gray-300' 
                  : type === 'notion'
                  ? 'bg-gray-100 text-gray-600'
                  : type === 'substack'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {isPublic ? (
          <a
            href={url || githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 rounded ${getButtonClass()}`}
          >
            {renderIcon()}
            <span>{type === 'github' ? 'View on GitHub' : type === 'notion' ? 'View in Notion' : type === 'substack' ? 'Read on Substack' : 'Use Tool'}</span>
          </a>
        ) : (
          <button
            disabled
            className={`inline-flex items-center px-4 py-2 rounded ${getButtonClass()}`}
          >
            {renderIcon()}
            <span>Coming Soon</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 