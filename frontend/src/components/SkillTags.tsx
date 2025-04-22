import React from 'react';
import { IconType } from 'react-icons';

interface SkillTagsProps {
  title: string;
  icon: IconType;
  skills: string[];
  colorClass: string; // CSS class for the tag background/border color
}

const SkillTags: React.FC<SkillTagsProps> = ({ title, icon: Icon, skills, colorClass }) => {
  return (
    <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
      <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
        <Icon className={`mr-2 ${colorClass.replace('bg-', 'text-').replace('-50', '-600')}`} />
        {title}
      </h3>
      <div className="h-px bg-slate-300 mb-4"></div>
      <div className="flex flex-wrap gap-2 justify-center">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className={`${colorClass} text-slate-700 px-3 py-1 rounded-full text-sm border ${colorClass.replace('bg-', 'border-')}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillTags; 