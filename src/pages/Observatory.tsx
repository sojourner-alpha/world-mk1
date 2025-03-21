import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFilePdf, FaVideo } from 'react-icons/fa';

// Custom components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

// Custom hooks
import { useAnimations } from '../hooks/useAnimations';

// Interfaces
interface ProjectType {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  media?: {
    type: 'pdf' | 'video';
    url: string;
  };
}

const Observatory = () => {
  // Track which sections are expanded - using an array to allow multiple sections
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>('research');
  
  // Use shared animations
  useAnimations();

  // Observatory image from App.tsx
  const observatoryImage = "/world-mk1/assets/images/observatory.png";

  // Projects/Research data for Markets section
  const marketProjects: Record<string, ProjectType[]> = {
    research: [
      {
        title: "AI in Financial Markets",
        description: "Research on the application of large language models for predictive analytics in financial market forecasting.",
        technologies: ["Python", "PyTorch", "Financial Data", "LLMs"],
        status: "In Progress"
      },
      {
        title: "Neurotechnology Trends 2025",
        description: "Comprehensive analysis of emerging neurotechnology and brain-computer interface advancements and their implications.",
        technologies: ["Neural Interfaces", "Neuroscience", "Emerging Tech"],
        link: "https://example.com/neurotechnology-trends",
        status: "Completed",
        media: {
          type: "pdf",
          url: "/research/neurotechnology-trends.pdf"
        }
      },
      {
        title: "Quantum Computing in Drug Discovery",
        description: "Exploration of quantum algorithms for accelerating molecular simulation and drug discovery processes.",
        technologies: ["Quantum Computing", "Biochemistry", "Simulation"],
        status: "Planned"
      }
    ],
    forecasts: [
      {
        title: "The Future of Remote Work",
        description: "Analysis of how AI, XR, and robotics will transform remote work experiences by 2030.",
        technologies: ["Workplace Tech", "XR", "AI"],
        link: "https://example.com/remote-work-future",
        status: "Completed",
        media: {
          type: "video",
          url: "https://youtube.com/watch?v=example"
        }
      },
      {
        title: "Climate Tech Investment Outlook",
        description: "Market and technology forecast for climate tech investments for the next decade.",
        technologies: ["CleanTech", "Market Analysis", "Energy Systems"],
        status: "In Progress"
      },
      {
        title: "Neuromorphic Computing Impact",
        description: "Forecast on how neuromorphic chips will reshape computing architecture and AI capabilities.",
        technologies: ["Neuromorphic Computing", "Chip Design", "AI Hardware"],
        status: "Planned"
      }
    ],
    analyses: [
      {
        title: "AI Governance Frameworks",
        description: "Comparative analysis of emerging AI governance frameworks across North America, EU, and Asia.",
        technologies: ["AI Ethics", "Policy", "Regulation"],
        link: "https://example.com/ai-governance",
        status: "Completed"
      },
      {
        title: "Synthetic Biology Market Analysis",
        description: "Deep dive into the commercial applications and market potential of synthetic biology advances.",
        technologies: ["SynBio", "Market Analysis", "Biotechnology"],
        status: "In Progress"
      },
      {
        title: "Implications of Advanced Language Models",
        description: "Analysis of the economic, social, and technological implications of increasingly capable language models.",
        technologies: ["LLMs", "AI Safety", "Economic Impact"],
        status: "Planned"
      }
    ]
  };

  // Projects/Research data for Mental Models section
  const mentalModelProjects: Record<string, ProjectType[]> = {
    psychology: [
      {
        title: "Trading Psychology",
        description: "Deep exploration of emotional triggers in financial decision-making and techniques for developing emotional resilience.",
        technologies: ["Psychology", "Trading", "Decision Science"],
        status: "In Progress"
      },
      {
        title: "Cognitive Biases in Investment",
        description: "Cataloging and analyzing common cognitive biases that affect investment decisions and strategies to overcome them.",
        technologies: ["Behavioral Economics", "Psychology", "Investing"],
        status: "Completed"
      },
      {
        title: "Risk: A Comprehensive Framework",
        description: "Understanding the dual nature of risk - the necessity of taking calculated risks and the importance of risk mitigation.",
        technologies: ["Risk Analysis", "Psychology", "Decision Theory"],
        status: "In Progress"
      }
    ],
    criticalThinking: [
      {
        title: "USAF Cognitive Frameworks",
        description: "Analysis of critical thinking frameworks developed by the US Air Force and their application to decision-making.",
        technologies: ["Military Strategy", "Critical Thinking", "OODA Loop"],
        link: "https://example.com/usaf-thinking",
        status: "Completed",
        media: {
          type: "pdf",
          url: "/research/usaf-thinking.pdf"
        }
      },
      {
        title: "Boyd's Theories in Modern Context",
        description: "Applying John Boyd's strategic theories to contemporary business and technology landscapes.",
        technologies: ["OODA Loop", "Strategy", "Decision-Making"],
        status: "Planned"
      },
      {
        title: "The Art of Clear Thinking",
        description: "Distillation of principles from various disciplines to create a framework for clear, rational thought processes.",
        technologies: ["Cognitive Science", "Logic", "Philosophy"],
        status: "In Progress"
      }
    ],
    mentalModels: [
      {
        title: "Munger's Mental Models",
        description: "Examination of Charlie Munger's multidisciplinary approach to decision-making and problem-solving.",
        technologies: ["Mental Models", "Decision Theory", "Interdisciplinary"],
        status: "Completed"
      },
      {
        title: "Latticework of Models",
        description: "Building a comprehensive framework of interconnected mental models from various disciplines.",
        technologies: ["Systems Thinking", "Philosophy", "Science"],
        status: "In Progress"
      },
      {
        title: "Practical Applications of Mental Models",
        description: "Case studies on applying mental models to real-world problems and decisions.",
        technologies: ["Decision Science", "Problem Solving", "Case Studies"],
        status: "Planned"
      }
    ]
  };

  // Projects/Research data for Meditations section
  const meditationProjects: Record<string, ProjectType[]> = {
    stillness: [
      {
        title: "The Practice of Presence",
        description: "Exploration of mindfulness techniques and their impact on creativity, focus, and decision-making quality.",
        technologies: ["Mindfulness", "Neuroscience", "Productivity"],
        status: "In Progress"
      },
      {
        title: "Digital Sabbaticals",
        description: "Research on the benefits of periodic digital disconnection and its effects on cognitive restoration.",
        technologies: ["Digital Wellbeing", "Psychology", "Attention"],
        status: "Completed"
      },
      {
        title: "Stillness in Motion",
        description: "Finding meditative states within active pursuits and high-performance environments.",
        technologies: ["Flow State", "Sports Psychology", "Meditation"],
        status: "Planned"
      }
    ],
    routines: [
      {
        title: "The Power of Daily Practice",
        description: "Analysis of how consistent routines build mastery and create conditions for sustained creativity.",
        technologies: ["Habit Formation", "Expertise", "Productivity"],
        status: "Completed",
        media: {
          type: "pdf",
          url: "/research/daily-practice.pdf"
        }
      },
      {
        title: "Morning Routines of High Performers",
        description: "Comparative study of morning rituals across various disciplines and their impact on daily performance.",
        technologies: ["Productivity", "Habits", "Performance"],
        status: "In Progress"
      },
      {
        title: "Deliberate Practice Framework",
        description: "Structured approach to developing expertise through focused, intentional practice methods.",
        technologies: ["Expertise", "Skill Acquisition", "Performance"],
        status: "Planned"
      }
    ],
    digitalCraft: [
      {
        title: "Digital Spaces as Meditation",
        description: "Conceptualizing digital creation as a form of meditative practice and artistic expression.",
        technologies: ["Digital Art", "Meditation", "Web Design"],
        status: "Completed"
      },
      {
        title: "Code as Craft",
        description: "Exploring programming as a creative medium and form of applied meditation.",
        technologies: ["Programming", "Craftsmanship", "Flow State"],
        status: "In Progress"
      },
      {
        title: "Modern Zen Gardens",
        description: "Drawing parallels between traditional contemplative practices and digital creation spaces.",
        technologies: ["Design", "Zen Philosophy", "Digital Craft"],
        status: "Planned"
      }
    ]
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={observatoryImage} 
          alt="Observatory" 
          className="w-full h-full object-cover"
          style={{objectPosition: "center 15%"}}
        />
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-heading text-white">Curtis James | Lederle</Link>
            <div>
              <Link to="/" className="text-white hover:text-blue-300 transition">← Home</Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content area - with custom scrollbar */}
      <div className="relative z-10 h-[calc(100vh-96px)] overflow-auto scrollbar-custom">
        <div className="container mx-auto p-6 flex flex-col">
          {/* Title - Fixed centered position */}
          <div className="absolute top-0 left-0 right-0 py-8 text-center">
            <h1 className="text-4xl md:text-5xl font-heading text-white mb-2">Observatory</h1>
            <p className="text-xl text-white">illuminating the inner and outer cosmos</p>
          </div>
          
          {/* Buttons Container - Right justified when collapsed, centered when open */}
          <div className="mt-32 flex flex-col gap-8 items-end">
            {/* Markets Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('markets') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-white/80 backdrop-blur-sm rounded-lg text-slate-800 shadow-sm fade-in origin-section-button ${
                  !expandedSections.includes('markets') ? 'border border-slate-200 hover:border-slate-300' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('markets') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('markets') 
                        ? prev.filter(section => section !== 'markets')
                        : [...prev, 'markets']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading text-slate-800">Markets</h2>
                  {expandedSections.includes('markets') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'markets'));
                      }}
                      className="text-lg hover:text-blue-600 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('markets') && (
                  <div className="p-4 pt-0 section-content">
                    <div className="space-y-4 mb-6">
                      <p className="text-slate-700">
                        Understanding markets is about seeing the complex interplay of companies, industries, and systems that form our economic landscape. Beyond financial analysis, this is about grasping the deeper patterns and forces that shape our world.
                      </p>
                      <p className="text-slate-700">
                        Here, the focus is on critical systems, emerging trends, and the frameworks we use to make sense of an increasingly complex marketplace.
                      </p>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center mb-8 gap-2 relative z-50">
                      {Object.keys(marketProjects).map((section) => (
                        <button
                          key={section}
                          onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            setActiveSection(section);
                          }}
                          className={`px-4 py-2 rounded-full font-medium text-sm relative z-50 ${
                            activeSection === section 
                              ? 'bg-blue-600 text-white shadow-sm' 
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                          } transition-all duration-300`}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                      ))}
                    </div>
                    
                    {/* Project Cards */}
                    <div className="grid gap-6">
                      {marketProjects[activeSection]?.map((project, index) => (
                        <div key={index} className="bg-white/90 border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl text-blue-700">{project.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${
                              project.status === 'Completed' ? 'bg-green-100 text-green-800 border border-green-200' :
                              project.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <p className="text-slate-700 mb-4">{project.description}</p>
                          
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* Media & Links */}
                          <div className="flex justify-end">
                            {project.media && (
                              <a 
                                href={project.media.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center mr-4 text-blue-600 hover:text-blue-800"
                              >
                                {project.media.type === 'pdf' ? (
                                  <>
                                    <FaFilePdf className="mr-1" />
                                    <span>PDF</span>
                                  </>
                                ) : (
                                  <>
                                    <FaVideo className="mr-1" />
                                    <span>Video</span>
                                  </>
                                )}
                              </a>
                            )}
                            
                            {project.link && (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <span>Learn more</span>
                                <FaArrowRight className="ml-2" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Mental Models Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('mentalModels') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-white/80 backdrop-blur-sm rounded-lg text-slate-800 shadow-sm fade-in origin-section-button ${
                  !expandedSections.includes('mentalModels') ? 'border border-slate-200 hover:border-slate-300' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('mentalModels') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('mentalModels') 
                        ? prev.filter(section => section !== 'mentalModels')
                        : [...prev, 'mentalModels']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading text-slate-800">Mental Models</h2>
                  {expandedSections.includes('mentalModels') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'mentalModels'));
                      }}
                      className="text-lg hover:text-blue-600 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('mentalModels') && (
                  <div className="p-4 pt-0 section-content">
                    <div className="space-y-4 mb-6">
                      <p className="text-slate-700">
                        Mental models are frameworks for understanding the world. They help us make sense of complexity, navigate uncertainty, and make better decisions.
                      </p>
                      <p className="text-slate-700">
                        This section explores the psychology of decision-making, critical thinking frameworks, and the latticework of interdisciplinary models that can improve our reasoning and understanding.
                      </p>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center mb-8 gap-2 relative z-50">
                      {Object.keys(mentalModelProjects).map((section) => (
                        <button
                          key={section}
                          onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            setActiveSection(section);
                          }}
                          className={`px-4 py-2 rounded-full font-medium text-sm relative z-50 ${
                            activeSection === section 
                              ? 'bg-blue-600 text-white shadow-sm' 
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                          } transition-all duration-300`}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                      ))}
                    </div>
                    
                    {/* Project Cards */}
                    <div className="grid gap-6">
                      {mentalModelProjects[activeSection]?.map((project, index) => (
                        <div key={index} className="bg-white/90 border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl text-blue-700">{project.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${
                              project.status === 'Completed' ? 'bg-green-100 text-green-800 border border-green-200' :
                              project.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <p className="text-slate-700 mb-4">{project.description}</p>
                          
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* Media & Links */}
                          <div className="flex justify-end">
                            {project.media && (
                              <a 
                                href={project.media.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center mr-4 text-blue-600 hover:text-blue-800"
                              >
                                {project.media.type === 'pdf' ? (
                                  <>
                                    <FaFilePdf className="mr-1" />
                                    <span>PDF</span>
                                  </>
                                ) : (
                                  <>
                                    <FaVideo className="mr-1" />
                                    <span>Video</span>
                                  </>
                                )}
                              </a>
                            )}
                            
                            {project.link && (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <span>Learn more</span>
                                <FaArrowRight className="ml-2" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Meditations Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('meditations') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-white/80 backdrop-blur-sm rounded-lg text-slate-800 shadow-sm fade-in origin-section-button ${
                  !expandedSections.includes('meditations') ? 'border border-slate-200 hover:border-slate-300' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('meditations') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('meditations') 
                        ? prev.filter(section => section !== 'meditations')
                        : [...prev, 'meditations']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading text-slate-800">Meditations</h2>
                  {expandedSections.includes('meditations') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'meditations'));
                      }}
                      className="text-lg hover:text-blue-600 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('meditations') && (
                  <div className="p-4 pt-0 section-content">
                    <div className="space-y-4 mb-6">
                      <p className="text-slate-700">
                        In a world of constant noise and distraction, the practice of stillness and presence offers a counterbalance—a way to reconnect with deeper wisdom and creativity.
                      </p>
                      <p className="text-slate-700">
                        This section explores the power of focused practice, the benefits of meditative states, and the view of creative work—like this website itself—as a form of meditation and cultivation.
                      </p>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center mb-8 gap-2 relative z-50">
                      {Object.keys(meditationProjects).map((section) => (
                        <button
                          key={section}
                          onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            setActiveSection(section);
                          }}
                          className={`px-4 py-2 rounded-full font-medium text-sm relative z-50 ${
                            activeSection === section 
                              ? 'bg-blue-600 text-white shadow-sm' 
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                          } transition-all duration-300`}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                      ))}
                    </div>
                    
                    {/* Project Cards */}
                    <div className="grid gap-6">
                      {meditationProjects[activeSection]?.map((project, index) => (
                        <div key={index} className="bg-white/90 border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl text-blue-700">{project.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${
                              project.status === 'Completed' ? 'bg-green-100 text-green-800 border border-green-200' :
                              project.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <p className="text-slate-700 mb-4">{project.description}</p>
                          
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* Media & Links */}
                          <div className="flex justify-end">
                            {project.media && (
                              <a 
                                href={project.media.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center mr-4 text-blue-600 hover:text-blue-800"
                              >
                                {project.media.type === 'pdf' ? (
                                  <>
                                    <FaFilePdf className="mr-1" />
                                    <span>PDF</span>
                                  </>
                                ) : (
                                  <>
                                    <FaVideo className="mr-1" />
                                    <span>Video</span>
                                  </>
                                )}
                              </a>
                            )}
                            
                            {project.link && (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <span>Learn more</span>
                                <FaArrowRight className="ml-2" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Observatory; 