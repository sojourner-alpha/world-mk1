import { useState, useEffect } from 'react';
import { FaChartLine, FaCode, FaGithub, FaRobot, FaPython } from 'react-icons/fa';
import { SiJupyter, SiPandas, SiNumpy } from 'react-icons/si';

// Custom components
import PageHeader from '../components/PageHeader';
import { ProjectCardProps } from '../components/ProjectCard';

// Custom hooks
import { useAnimations } from '../hooks/useAnimations';

// Interface for our project cards
interface FinanceProjectProps extends ProjectCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status: 'Completed' | 'In Progress' | 'Planned';
  categories: string[];
}

const Finance = () => {
  // Track which section is expanded
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [typingComplete, setTypingComplete] = useState<boolean>(false);
  
  // Use shared animations
  useAnimations();

  // Effect for the typing animation
  useEffect(() => {
    // Add the CSS for typing animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      .typing-animation {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        border-right: 2px solid transparent;
        width: 0;
        animation: typing 1.5s steps(12, end) forwards;
      }
      
      .cursor-blink {
        display: inline-block;
        height: 1.2em;
        width: 0.4em;
        background-color: #22c55e;
        animation: blink 1s infinite;
        opacity: 0;
        transition: opacity 0.2s;
      }
      
      .typing .cursor-blink {
        opacity: 0.75;
      }
      
      .typing-done .cursor-blink {
        animation: none;
        opacity: 0.75;
      }
      
      .card-typing-animation {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        animation: typing 1.5s steps(20, end) forwards;
        animation-delay: 2s;
      }
      
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes blink {
        0%, 100% { opacity: 0.75; }
        50% { opacity: 0; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-in-out forwards;
      }
    `;
    document.head.appendChild(styleSheet);

    // Set typing complete after animation
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Finance background image
  const financeImage = "/assets/images/finance.png";

  // Finance project categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fundamentals', name: 'Fundamental Analysis' },
    { id: 'technical', name: 'Technical Analysis' }
  ];

  // Finance projects data
  const projects: FinanceProjectProps[] = [
    {
      name: "Fundamental Analysis Dashboard",
      description: "Interactive dashboard for analyzing company financials, valuation metrics, and growth indicators. Built with Python and Streamlit.",
      technologies: ["Python", "Pandas", "Financial Analysis", "Streamlit"],
      type: "github",
      isPublic: false,
      status: "In Progress",
      icon: FaChartLine,
      categories: ["fundamentals"]
    },
    {
      name: "Technical Analysis Toolkit",
      description: "Library of technical indicators and chart patterns for market analysis. Includes backtesting capabilities and customizable strategies.",
      technologies: ["Python", "NumPy", "Technical Analysis", "Visualization"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaCode,
      categories: ["technical"]
    },
    {
      name: "Portfolio Optimization Engine",
      description: "Advanced portfolio construction tools based on Modern Portfolio Theory, factor models, and risk management techniques.",
      technologies: ["Python", "Risk Modeling", "Optimization", "Statistics"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaChartLine,
      categories: ["portfolio"]
    },
    {
      name: "Financial News Sentiment Analyzer",
      description: "NLP-based tool for analyzing sentiment and impact of financial news on market movements and specific securities.",
      technologies: ["Python", "NLP", "Machine Learning", "News API"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaRobot,
      categories: ["ml"]
    },
    {
      name: "Jupyter Notebooks Collection",
      description: "Series of educational notebooks covering key financial analysis concepts, CFA curriculum topics, and practical implementation examples.",
      technologies: ["Jupyter", "Python", "Financial Analysis", "Education"],
      type: "github",
      isPublic: false,
      status: "In Progress",
      icon: SiJupyter,
      categories: ["fundamentals", "technical", "portfolio"]
    },
    {
      name: "Data Pipeline for Financial Analysis",
      description: "ETL pipeline for collecting, cleaning, and organizing financial data from various sources for analysis and modeling.",
      technologies: ["Python", "SQL", "APIs", "Data Engineering"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaPython,
      categories: ["fundamentals", "technical", "ml"]
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.categories?.includes(activeCategory));
  
  // Function to handle section expansion
  const handleSectionClick = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background image - darken for terminal feel */}
      <div className="fixed inset-0 z-0">
        <img 
          src={financeImage} 
          alt="Finance Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Header */}
      <PageHeader pageName="Finance" />
      
      {/* Main content area - full height and scrollable */}
      <div className="relative z-10 pt-12 md:pt-16 pb-12">
        <div className="container mx-auto px-3 md:px-6 flex flex-col">
          {/* Terminal Title Container */}
          <div className="mb-4 mt-4 flex flex-col items-center md:items-start md:ml-4 w-full">
            {/* Command Prompt Container - Make fully transparent */}
            <div className="bg-transparent px-2 md:px-5 py-3 rounded-md shadow-none w-full md:w-auto">
              {/* Command Prompt */}
              <div className={`font-mono text-green-500 flex items-center text-base md:text-lg ${typingComplete ? 'typing-done' : 'typing'} justify-center md:justify-start`}>
                <span className="text-gray-500 mr-2">$</span>
                <span className={`${typingComplete ? '' : 'typing-animation'}`}>finance_lab</span>
                <span className="cursor-blink ml-1"></span>
              </div>
              
              {/* Comment Line */}
              <div className="font-mono text-xs text-gray-500 mt-2 opacity-0 animate-fadeIn text-center md:text-left" 
                style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                <span>// quantitative & fundamental analysis toolbox</span>
              </div>
            </div>
            
            {/* Filter Buttons - Centered Below Title */}
            <div className="mt-5 mb-6 md:mt-6 md:mb-8 flex flex-wrap justify-center md:justify-start w-full gap-1.5 md:gap-2">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-2 md:px-3 py-1 rounded font-mono text-xs md:text-sm ${
                    activeCategory === category.id 
                      ? 'bg-green-900/50 text-green-400 border border-green-600' 
                      : 'bg-black/70 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-300'
                  } transition-all duration-300`}
                >
                  {activeCategory === category.id ? '>' : '--'} {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid - Terminal Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20">
            {filteredProjects.map((project, index) => (
              <div key={index} 
                className="bg-black/80 backdrop-blur-sm rounded-md shadow-md border border-gray-700 hover:border-green-600/50 transition-all duration-300 flex flex-col h-full"
              >
                {/* Card Header - Terminal Style */}
                <div className="border-b border-gray-800 px-3 md:px-4 py-2.5 md:py-3 flex justify-between items-start">
                  <div className="flex items-center overflow-hidden">
                    <project.icon size={16} className="text-green-500 mr-2 md:mr-3 flex-shrink-0" />
                    <h3 className="text-sm md:text-base font-mono font-medium text-gray-300 truncate">
                      <span className="card-typing-animation">{project.name}</span>
                    </h3>
                  </div>
                  <span className={`text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm font-mono flex-shrink-0 ml-2 ${
                    project.status === 'Completed' ? 'bg-green-900/30 text-green-500 border border-green-800' :
                    project.status === 'In Progress' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-800' :
                    'bg-blue-900/30 text-blue-400 border border-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 p-3 md:p-4 pb-1 md:pb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-gray-900 text-gray-400 px-1.5 md:px-2 py-0.5 rounded text-[10px] md:text-xs border border-gray-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Description - Terminal Style */}
                <div className="p-3 md:p-4 pt-1 md:pt-2 flex-grow">
                  <p className="text-gray-300 text-xs md:text-sm font-mono leading-relaxed">{project.description}</p>
                </div>
                
                {/* Action Button - Terminal Style */}
                <div className="p-3 md:p-4 pt-0 border-t border-gray-800">
                  {project.isPublic ? (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-3 md:px-4 py-2 rounded bg-green-900/40 text-green-400 border border-green-800 hover:bg-green-900/60 transition-all font-mono w-full text-sm"
                    >
                      <FaGithub size={16} className="mr-2" /> git clone
                    </a>
                  ) : (
                    <span className="flex items-center justify-center px-3 md:px-4 py-2 rounded bg-gray-900/40 text-gray-500 border border-gray-800 cursor-not-allowed font-mono w-full text-sm">
                      <FaGithub size={16} className="mr-2" /> coming_soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance; 