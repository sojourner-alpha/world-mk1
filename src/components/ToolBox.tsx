import React from 'react';
import { IconType } from 'react-icons';

interface Tool {
  name: string;
  url: string;
}

interface ToolBoxProps {
  title: string;
  icon: IconType;
  tools: Tool[];
}

const ToolBox: React.FC<ToolBoxProps> = ({ title, icon: Icon, tools }) => {
  return (
    <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
      <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
        <Icon className="mr-2 text-slate-600" />
        {title}
      </h3>
      <div className="h-px bg-slate-300 mb-4"></div>
      <div className="flex flex-wrap gap-2 justify-center">
        {tools.map((tool, index) => (
          <a 
            key={index}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-50 text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-200 hover:bg-slate-100 transition-all duration-200 hover:scale-110 hover:shadow-md"
          >
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ToolBox; 