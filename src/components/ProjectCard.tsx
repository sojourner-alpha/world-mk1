import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiNotion, SiSubstack } from 'react-icons/si';

// Define the interface for project data
export interface ProjectCardProps {
  name: string;
  description: string;
  technologies: string[];
  type: 'github' | 'notion' | 'substack';
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
  return (
    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm fade-in-up">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-heading text-slate-800">{name}</h3>
        {type === 'github' && !isPublic && (
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Coming Soon</span>
        )}
      </div>
      
      {/* Divider between title and tags */}
      <div className="h-px bg-slate-300 my-3"></div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, techIndex) => (
          <span 
            key={techIndex}
            className="bg-slate-600 text-slate-100 px-3 py-1 rounded-full text-sm border border-slate-500"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="text-slate-800 mb-4">{description}</p>
      <div className="flex justify-center">
        {type === 'github' ? (
          isPublic ? (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 rounded-md bg-white/80 border border-slate-300 text-blue-600 hover:text-blue-800 hover:bg-white/90 transition-all shadow-sm"
            >
              <FaGithub size={22} className="mr-2" /> View Code
            </a>
          ) : (
            <span className="flex items-center justify-center px-4 py-2 rounded-md bg-white/80 border border-slate-300 text-slate-800 cursor-not-allowed shadow-sm">
              <FaGithub size={22} className="mr-2" /> Private
            </span>
          )
        ) : (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 rounded-md bg-white/80 border border-slate-300 text-blue-600 hover:text-blue-800 hover:bg-white/90 transition-all shadow-sm"
          >
            {type === 'notion' ? (
              <><SiNotion size={22} className="mr-2" /> Read Research</>
            ) : (
              <><SiSubstack size={22} className="mr-2" /> Read Article</>
            )}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 