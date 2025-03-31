import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFilePdf, FaVideo, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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

// Interface for curriculum days
interface CurriculumDay {
  title: string;
  goal: string;
  keyConcepts: string[];
  resources: Array<{
    title: string;
    type: 'article' | 'video' | 'book' | 'website';
    url?: string;
  }>;
  activities: string[];
  outcome: string;
}

const Study = () => {
  // Track which sections are expanded - using an array to allow multiple sections
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>('research');
  const [expandedCurriculum, setExpandedCurriculum] = useState<boolean>(false);
  
  // Use shared animations
  useAnimations();

  // Study image from App.tsx
  const studyImage = "/assets/images/study.png";

  // Curriculum data for Buy Side Analysis
  const buySideCurriculum: CurriculumDay[] = [
    {
      title: "Day 1: Introduction to Buy Side and Industry Landscape",
      goal: "Understand the role of buy-side analysts and the broader investment management ecosystem.",
      keyConcepts: [
        "Differences between buy-side and sell-side analysis",
        "Investment management industry structure",
        "Types of investment firms and their strategies",
        "Core responsibilities of a buy-side analyst",
        "Career progression in investment analysis"
      ],
      resources: [
        {
          title: "The Buy Side: A Wall Street Trader's Tale - Turney Duff",
          type: "book"
        },
        {
          title: "Introduction to Investment Management",
          type: "article",
          url: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/introduction-investment-management"
        },
        {
          title: "Buy-Side vs. Sell-Side Analysts: What's the Difference?",
          type: "article",
          url: "https://www.investopedia.com/articles/professionals/093015/buyside-vs-sellside-analysts-what-difference.asp"
        }
      ],
      activities: [
        "Map the investment management ecosystem with key players and their relationships",
        "Analyze job descriptions for buy-side analysts across different firms",
        "Create a comparison table of buy-side vs. sell-side analysis approaches",
        "Review sample analyst reports to understand structure and content"
      ],
      outcome: "Comprehensive understanding of the buy-side analyst role, responsibilities, and industry positioning to provide foundation for the remainder of the curriculum."
    }
  ];

  // Projects/Research data for Markets section
  const marketProjects: Record<string, ProjectType[]> = {
    investmentAnalysis: [
      {
        title: "Self Guided Curriculum for Buy Side Analysis",
        description: "A comprehensive 2-week intensive program covering equity research, valuation methods, financial modeling, and investment decision frameworks for buy-side analysts and portfolio managers.",
        technologies: ["Equity Research", "Financial Modeling", "Valuation", "Portfolio Construction"],
        link: "https://sojourninsight.notion.site/buy-side-analysis?pvs=4",
        status: "In Progress"
      }
    ],
    criticalSystems: [
      {
        title: "Energy Transition Dynamics",
        description: "Analysis of the global shift from fossil fuels to renewable energy sources and its implications for markets, corporations, and governments.",
        technologies: ["Renewable Energy", "Grid Systems", "Energy Markets", "Climate Policy"],
        status: "In Progress"
      },
      {
        title: "Infrastructure Investment Outlook",
        description: "Assessment of global infrastructure needs, funding mechanisms, and investment opportunities in transportation, utilities, and digital networks.",
        technologies: ["Infrastructure", "Project Finance", "Public-Private Partnerships", "Capital Allocation"],
        link: "https://example.com/infrastructure-outlook",
        status: "Completed",
        media: {
          type: "pdf",
          url: "/research/infrastructure-outlook.pdf"
        }
      },
      {
        title: "Information System Resilience",
        description: "Evaluation of critical information infrastructure, data governance frameworks, and cybersecurity challenges in an increasingly connected world.",
        technologies: ["Information Systems", "Cybersecurity", "Data Governance", "Digital Resilience"],
        status: "Planned"
      },
      {
        title: "Robotics Supply Chain Revolution",
        description: "Investigation into how advanced robotics and automation are transforming manufacturing, logistics, and global supply chains.",
        technologies: ["Robotics", "Manufacturing", "Logistics", "Supply Chain"],
        status: "In Progress"
      },
      {
        title: "Space Economy Development",
        description: "Mapping the emerging commercial space sector, from launch services and satellite networks to resource utilization and space manufacturing.",
        technologies: ["Space Tech", "Satellite Networks", "Launch Services", "Aerospace"],
        status: "Planned"
      }
    ],
    ai: [
      {
        title: "AI Economic Impact Assessment",
        description: "Comprehensive analysis of how artificial intelligence is reshaping economic structures, labor markets, and productivity across sectors.",
        technologies: ["Economics", "Labor Markets", "Productivity Analysis", "AI Systems"],
        status: "In Progress",
        media: {
          type: "video",
          url: "https://example.com/ai-economic-impact"
        }
      },
      {
        title: "Financial Services AI Transformation",
        description: "Study of AI applications in banking, investment management, insurance, and regulatory compliance within financial services.",
        technologies: ["FinTech", "AI Models", "Banking", "RegTech"],
        link: "https://example.com/finserv-ai",
        status: "Completed"
      },
      {
        title: "Healthcare AI Revolution",
        description: "Examination of AI's impact on healthcare delivery, drug discovery, diagnostics, and personalized medicine approaches.",
        technologies: ["HealthTech", "Drug Discovery", "Diagnostics", "Medical AI"],
        status: "In Progress"
      },
      {
        title: "Manufacturing & Logistics AI Integration",
        description: "Analysis of AI implementation in smart factories, predictive maintenance, supply chain optimization, and logistics networks.",
        technologies: ["Industrial AI", "Smart Manufacturing", "Predictive Systems", "Logistics"],
        status: "Planned"
      },
      {
        title: "AI Governance Frameworks",
        description: "Evaluation of emerging regulatory approaches, ethical guidelines, and governance structures for artificial intelligence technologies.",
        technologies: ["AI Ethics", "Regulation", "Governance", "Policy Development"],
        link: "https://example.com/ai-governance",
        status: "Completed",
        media: {
          type: "pdf",
          url: "/research/ai-governance.pdf"
        }
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
          src={studyImage} 
          alt="Study" 
          className="w-full h-full object-cover"
          style={{objectPosition: "center 50%"}}
        />
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      </div>
      
      {/* Header */}
      <PageHeader pageName="Study" />
      
      {/* Main content area - with custom scrollbar */}
      <div className="relative z-10 h-[calc(100vh-96px)] overflow-auto scrollbar-custom">
        <div className="container mx-auto p-6 flex flex-col">
          {/* Title - Fixed centered position */}
          <div className="absolute top-0 left-0 right-0 py-8 md:py-8 pt-28 md:pt-20 text-center">
            <div className="bg-matted/60 backdrop-blur-sm inline-block px-8 py-4 rounded-lg shadow-sm">
              <h1 className="text-4xl font-heading mb-2 text-white">Study</h1>
              <p className="text-xl mb-6 text-white">Research, Analysis & Synthesis</p>
            </div>
          </div>
          
          {/* Buttons Container - Right justified when collapsed, centered when open */}
          <div className="mt-60 md:mt-32 flex flex-col gap-8 items-end">
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
                        Investment analysis is about understanding the complex dynamics of financial markets, companies, and economic systems to make informed capital allocation decisions.
                      </p>
                      <p className="text-slate-700">
                        This section documents my learning journey through various investment disciplines, including equity research, valuation methodologies, financial modeling, and portfolio construction principles.
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
                          
                          {/* Curriculum Expand Button - Only for Buy Side Analysis */}
                          {project.title === "Self Guided Curriculum for Buy Side Analysis" && (
                            <div className="mt-4 mb-2 relative z-50">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedCurriculum(!expandedCurriculum);
                                }}
                                className="flex items-center text-blue-600 hover:text-blue-800 font-medium relative z-50"
                              >
                                {expandedCurriculum ? (
                                  <>
                                    <FaChevronUp className="mr-2" />
                                    <span>Hide Curriculum Details</span>
                                  </>
                                ) : (
                                  <>
                                    <FaChevronDown className="mr-2" />
                                    <span>View Curriculum Details</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                          
                          {/* Expanded Curriculum Content */}
                          {project.title === "Self Guided Curriculum for Buy Side Analysis" && expandedCurriculum && (
                            <div 
                              className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 relative z-50"
                              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
                            >
                              <h4 className="text-lg font-medium text-slate-800 mb-4">Curriculum Schedule</h4>
                              
                              {buySideCurriculum.map((day, dayIndex) => (
                                <div key={dayIndex} className="mb-6 pb-6 border-b border-slate-200 last:border-0 last:mb-0 last:pb-0">
                                  <h5 className="text-lg font-medium text-blue-700 mb-3">{day.title}</h5>
                                  
                                  {/* Goal */}
                                  <div className="mb-4">
                                    <h6 className="text-sm font-bold text-slate-700 mb-1">Goal</h6>
                                    <p className="text-slate-700">{day.goal}</p>
                                  </div>
                                  
                                  {/* Key Concepts */}
                                  <div className="mb-4">
                                    <h6 className="text-sm font-bold text-slate-700 mb-1">Key Concepts</h6>
                                    <ul className="list-disc pl-5">
                                      {day.keyConcepts.map((concept, conceptIndex) => (
                                        <li key={conceptIndex} className="text-slate-700 mb-1">{concept}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {/* Resources */}
                                  <div className="mb-4">
                                    <h6 className="text-sm font-bold text-slate-700 mb-1">Resources</h6>
                                    <ul className="list-disc pl-5">
                                      {day.resources.map((resource, resourceIndex) => (
                                        <li key={resourceIndex} className="text-slate-700 mb-1">
                                          {resource.url ? (
                                            <a 
                                              href={resource.url} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                              {resource.title} ({resource.type})
                                            </a>
                                          ) : (
                                            <span>{resource.title} ({resource.type})</span>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {/* Activities */}
                                  <div className="mb-4">
                                    <h6 className="text-sm font-bold text-slate-700 mb-1">Activities</h6>
                                    <ul className="list-disc pl-5">
                                      {day.activities.map((activity, activityIndex) => (
                                        <li key={activityIndex} className="text-slate-700 mb-1">{activity}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {/* Outcome */}
                                  <div className="mb-2">
                                    <h6 className="text-sm font-bold text-slate-700 mb-1">Outcome</h6>
                                    <p className="text-slate-700">{day.outcome}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Media & Links */}
                          <div className="flex justify-end relative z-50">
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
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 relative z-50"
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
                          <div className="flex justify-end relative z-50">
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
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 relative z-50"
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
                          <div className="flex justify-end relative z-50">
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
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 relative z-50"
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

export default Study; 