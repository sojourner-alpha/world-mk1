import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaDownload, FaBuilding, FaChartLine, FaCogs, FaGithub, FaLinkedinIn, FaLandmark, FaGraduationCap } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiNotion, SiSubstack } from 'react-icons/si';

// Custom components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import ProjectCard, { ProjectCardProps } from '../components/ProjectCard';
import ToolBox from '../components/ToolBox';
import SkillTags from '../components/SkillTags';

// Custom hooks
import { useAnimations } from '../hooks/useAnimations';

// Career timeline interfaces
interface Position {
  title: string;
  period: string;
  description?: string;
  skills?: string[];
  metrics?: string[];
}

interface CareerTimelineItem {
  company: string;
  url?: string;
  role?: string;
  period?: string;
  location: string;
  description?: string;
  positions?: Position[];
  tags: string[];
  metrics?: string[];
  skills?: string[];
}

const Workshop = () => {
  const [showStudentOrgs, setShowStudentOrgs] = useState(false);
  
  // Use shared animations
  useAnimations();

  // Workshop image from App.tsx
  const workshopImage = "/world-mk1/assets/images/workshop.png";

  // Career timeline data
  const careerTimeline: CareerTimelineItem[] = [
    {
      company: "Sojourn Insight",
      url: "https://www.sojourninsight.com",
      role: "Partner",
      period: "2023 - Present",
      location: "Minneapolis · Remote",
      description: "Consulting services for founders, executives and researchers.\nR&D in machine learning applications in operations and finance.",
      skills: ["Investment Management", "Analysis", "Financial Modeling", "Operations Management", "Machine Learning"],
      tags: ["Startup", "Consulting", "AI/ML", "Private", "B2B", "Founder"],
      metrics: [
        "Fundraising readiness for Toronto based startup",
        "ML applications input to a Stanford Lab",
      ],
    },
    {
      company: "Tread Technologies",
      url: "https://www.tread.io",
      role: "Multiple Roles",
      period: "2021 - 2024",
      location: "San Anselmo · Toronto · Minneapolis",
      tags: ["Startup", "SaaS", "Data Tracking", "Private", "B2B", "First US Employee"],
      metrics: [
        "9x ARR growth in 24 months",
        "500% increased avg. contract size",
        "Deployed CRM, sales ops and website"
      ],
      positions: [
        {
          title: "Strategic Advisor",
          period: "2023 - 2024",
          description: "Provided strategic guidance on product development, go-to-market strategy, and organizational structure during key transition period.",
          skills: ["Business Strategy", "Management"],
          
        },
        {
          title: "Chief of Staff",
          period: "2022 - 2023",
          description: "Orchestrated cross-functional initiatives, managed strategic projects, and supported the CEO in scaling operations and team development.",
          skills: ["Start-ups", "Process Improvement", "Analytics"]
        },
        {
          title: "Vice President Sales and Marketing",
          period: "2022 - 2023",
          description: "Directed all sales and marketing initiatives, developed go-to-market strategies, and built the commercial team from the ground up.",
          skills: ["Sales Management", "C-Level Executive Support", "Sales Operations", "Marketing Strategy"]
        },
        {
          title: "Head of Sales",
          period: "2021 - 2022",
          description: "Established sales processes, built initial customer relationships, and developed the foundation for the company's revenue operations."
        },
        {
          title: "Regional General Manager",
          period: "2020 - 2021",
          description: "Led regional operations, managing P&L responsibility and driving market expansion across multiple territories.",
          skills: ["Regional Management", "P&L Responsibility"]
        },
      ]
    },
    {
      company: "Zendesk",
      url: "https://www.zendesk.com",
      role: "Multiple Roles",
      period: "2020 - 2022",
      location: "San Francisco · Singapore · Seoul",
      tags: ["Enterprise", "SaaS", "CRM", "Public", "B2B/B2C"],
      metrics: [
        "Led APAC expansion of acquired tech",
        "Point of contact for Corp. Dev. M&A team"
      ],
      positions: [
        {
          title: "Senior Account Executive",
          period: "2019 - 2020",
          description: "Asia Pacific Lead - Conversation Solutions Team"
        },
      ]
    },
    {
      company: "Smooch.io",
      url: "https://www.smooch.io",
      role: "Director of Business Development",
      period: "2016 - 2019",
      location: "San Francisco · Montreal",
      description: "Unified API communication platform for businesses to manage customer conversations across multiple channels.",
      tags: ["Startup", "APIs", "Acquired by Zendesk", "B2B", "First US Employee"],
      metrics: [
        "20x revenue multiple at acquisition",
        "Closed 25% of revenue deals",
        "First business hire under C-Suite"
      ]
    },
    {
      company: "Enercon",
      url: "https://www.enercon.de/en/home/",
      role: "Multiple Roles",
      period: "2013 - 2016",
      location: "Montreal · Toronto · San Francisco",
      tags: ["Enterprise", "OEM", "Energy", "Private", "B2B", "First US Employee"],
      metrics: [
        "$320M+ contracts negotiated",
        "140MW project portfolio",
        "Utility scale negotiations"
      ],
      positions: [
        {
          title: "Commercial Manager",
          period: "2015 - 2016",
          description: "Business development, sales, account management, contract negotiation, claims & settlements [North American Customers]\n\nStrategy, policy, conferences, presentations, engagement [North American Markets]"
        },
        {
          title: "Commercial Analyst",
          period: "2013 - 2015",
          description: "Contract structuring, financial analysis, market strategy [Ontario & Quebec]\n\nCommercial & legal negotiations [Eastern Canada]\n\nValue engineering, market analysis [Canada]"
        }
      ]
    },
    {
      company: "Sigmund Soudack & Associates",
      url: "https://www.soudack.com",
      role: "Engineer",
      period: "2013",
      location: "Toronto",
      description: "Designing junior engineer on projects ranging from skyscraper condominiums to single family residential homes across the Greater Toronto Area.",
      tags: ["Enterprise", "Engineering", "Private", "B2B"]
    }
  ];

  // Student organizations data
  const studentOrganizations = [
    {
      company: "National Organization for Business and Engineering",
      url: "#",
      role: "Multiple Roles",
      period: "2012 - 2014",
      location: "Montreal · McGill University",
      positions: [
        {
          title: "Vice President External, National Board",
          period: "2013 - 2014",
          description: "Liaison of the organization to all affiliates. Member of the National Board working with the Internal Vice President, President, Finance and Technology Chairs to expand and enhance NOBE across North America."
        },
        {
          title: "Vice President Entrepreneurship, National Representative McGill Board",
          period: "2012 - 2013",
          description: "NOBE's first Vice President Entrepreneurship and Canadian representative to American chapters at National Conference at USC. Coordinated the McGill/NOvA Tech Innovation Day."
        }
      ]
    },
    {
      company: "Canadian Society for Civil Engineering",
      url: "#",
      role: "Multiple Roles",
      period: "2011 - 2013",
      location: "Montreal · McGill University",
      positions: [
        {
          title: "President, McGill Student Chapter",
          period: "2012 - 2013",
          description: "Established partnerships with professionals, organizations and engineering firms in Montreal to create opportunities for engineering students."
        },
        {
          title: "Vice President Operations & Communications",
          period: "2011 - 2012",
          description: "Revitalized McGill Student Chapter, created relationships to local professionals, companies and organizations."
        }
      ]
    }
  ];

  // Projects data
  const projects: ProjectCardProps[] = [
    {
      name: "This Website",
      description: "Open source project combining web building and world building into a personal multiverse. Built with React, TypeScript, and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/sojourner-alpha/world-mk1",
      type: "github",
      isPublic: true
    },
    {
      name: "AI Financial Analysis",
      description: "Advanced financial analysis platform leveraging AI for market insights and portfolio optimization. Coming soon.",
      technologies: ["Python", "LLMs", "SQL", "React", "FastAPI"],
      githubUrl: "https://github.com/sojourner-alpha/dojofi",
      type: "github",
      isPublic: false
    },
    {
      name: "AI/ML In Precision Neuroscience",
      description: "Research brief exploring applications of machine learning in RNA sequencing and neuroscience research.",
      technologies: ["AI/ML", "RNA", "Arc Institute", "Stanford"],
      url: "https://sojournhabits.notion.site/ai-rna",
      type: "notion",
      isPublic: true
    },
    {
      name: "2025 Insight",
      description: "Analysis of emerging technology trends and their implications for the future of work, society, and innovation.",
      technologies: ["Substack", "AI/ML", "Projections", "Robotics"],
      url: "https://substack.com/home/post/p-154955133",
      type: "substack",
      isPublic: true
    }
  ];

  // Tool categories
  const toolCategories = [
    {
      title: "Ops",
      icon: FaCogs,
      tools: [
        { name: "Notion", url: "https://www.notion.so" },
        { name: "Cursor", url: "https://cursor.sh" },
        { name: "Midjourney", url: "https://www.midjourney.com" },
        { name: "Perplexity", url: "https://www.perplexity.ai" },
        { name: "Google Suite", url: "https://workspace.google.com" }
      ]
    },
    {
      title: "AI/ML",
      icon: FaChartLine,
      tools: [
        { name: "OpenAI", url: "https://openai.com" },
        { name: "Grok", url: "https://grok.x.com" },
        { name: "Claude", url: "https://anthropic.com/claude" },
        { name: "LLaMA", url: "https://ai.meta.com/llama" },
        { name: "Deepseek", url: "https://deepseek.ai" },
        { name: "Ollama", url: "https://ollama.ai" },
        { name: "MCP", url: "https://mcp.ai" }
      ]
    },
    {
      title: "FinTech",
      icon: FaLandmark,
      tools: [
        { name: "thinkorswim", url: "https://www.tdameritrade.com/tools-and-platforms/thinkorswim/desktop.page" },
        { name: "Finviz", url: "https://finviz.com" },
        { name: "TradingView", url: "https://www.tradingview.com" },
        { name: "Tradezella", url: "https://tradezella.com" },
        { name: "APIs", url: "https://www.programmableweb.com" }
      ]
    }
  ];

  // Skills categorization
  const skillCategories = [
    {
      title: "Technical",
      icon: FaCogs,
      skills: [
        "Financial Modeling",
        "Asset Pricing",
        "Operations Management",
        "Machine Learning",
        "Python/SQL/FastAPI",
        "Calculus + Linear Algebra",
        "Probability Theory",
      ],
      colorClass: "bg-blue-50"
    },
    {
      title: "Business",
      icon: FaChartLine,
      skills: [
        "Contract Negotiation",
        "Business Strategy",
        "Sales Management",
        "Investment Management",
        "Process Improvement",
        "Systems Implementation",
        "Market Analysis",
      ],
      colorClass: "bg-green-50"
    },
    {
      title: "Leadership",
      icon: FaBuilding,
      skills: [
        "C-Suite Staff Support",
        "Team Management",
        "Strategic Planning",
        "Cross-functional Leadership",
        "Organizational Development",
        "Partnership Building",
        "Board Observer"
      ],
      colorClass: "bg-slate-50"
    }
  ];
  
  return (
    <div className="bg-parchment text-slate-800 min-h-screen">
      {/* Header - using reusable component */}
      <PageHeader pageName="Workshop" />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-matted/70 to-transparent z-10"></div>
        <img 
          src={workshopImage} 
          alt="Workshop" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="absolute inset-0 z-20">
          <div className="h-full flex items-center p-8">
          <div className="max-w-2xl">
              <div className="bg-matted/60 backdrop-blur-sm text-white p-8 rounded-lg shadow-sm">
                <div>
                  <h1 className="text-4xl font-heading mb-4">Workshop</h1>
                  <p className="text-xl mb-6">Portfolio, Skills & Career</p>
                  <p className="mb-6">
                    Professional history in scaling startups, driving revenue growth, and supporting executive decision-making with a blend of technical and business expertise.
                  <br/> <br/>
                    This space showcases open source projects, professional skills, and a detailed career timeline.
                  </p>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <div className="flex gap-4 items-center">
                    <a 
                      href="https://github.com/sojourner-alpha" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-blue-300 transition"
                    >
                      <FaGithub size={24} />
                    </a>
                    <div className="w-px h-6 bg-white/30"></div>
                    <a 
                      href="https://www.linkedin.com/in/clederle/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-blue-300 transition"
                    >
                      <FaLinkedinIn size={24} />
                    </a>
                    <div className="w-px h-6 bg-white/30"></div>
                    <Link 
                      to="/cv" 
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <FaDownload className="mr-2" />
                      <span>Download CV</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section - using ProjectCard component */}
      <section className="scroll-section py-8 relative mt-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/world-mk1/assets/images/projects.png"
            alt="Projects Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/30"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-4xl font-heading text-center text-slate-800">Projects</h2>
              <p className="text-slate-800 text-center mt-4">Limited collection of technical projects, research, and publications.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={index}
                  {...project}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Career Timeline Section */}
      <section className="scroll-section py-16 bg-white mt-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Tools Section - using ToolBox component */}
            <h2 className="text-3xl font-heading mb-6 text-center">Tools</h2>
            <div className="grid md:grid-cols-3 gap-6 justify-items-center mb-16">
              {toolCategories.map((category, index) => (
                <ToolBox 
                  key={index} 
                  title={category.title} 
                  icon={category.icon} 
                  tools={category.tools} 
                />
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-200 mb-16"></div>

            {/* Skills Section - using SkillTags component */}
            <h2 className="text-3xl font-heading mb-6 text-center">Skills</h2>
            <div className="grid md:grid-cols-3 gap-6 justify-items-center mb-16">
              {skillCategories.map((category, index) => (
                <SkillTags 
                  key={index} 
                  title={category.title} 
                  icon={category.icon} 
                  skills={category.skills} 
                  colorClass={category.colorClass} 
                />
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-200 mb-16"></div>

            {/* Career Journey */}
            <h2 className="text-3xl font-heading mb-8 text-center">Journey</h2>
            
            <div className="space-y-12">
              {careerTimeline.map((position, index) => (
                <div key={index} className="bg-parchment p-8 rounded-lg shadow-sm fade-in-up">
                  {/* Company Name */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <a 
                        href={position.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-2xl font-heading text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        {position.company}
                      </a>
                      
                      {/* Special tags in upper right */}
                      <div className="flex gap-2">
                        {position.tags.filter(tag => tag === "Founder" || tag === "First US Employee").map((tag, tagIndex) => (
                          <span 
                            key={`special-${tagIndex}`}
                            className="px-3 py-1 rounded-full text-sm bg-slate-600 text-slate-100 border border-slate-500 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="h-px bg-slate-300 my-4"></div>
                  </div>

                  {/* Tags - excluding special tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {position.tags.filter(tag => tag !== "Founder" && tag !== "First US Employee").map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Location */}
                  <p className="text-slate-600 mb-6">{position.location}</p>

                  {/* Roles and Details */}
                  <div className="mt-4 space-y-4">
                    {position.positions ? (
                      // Multiple positions
                      position.positions.map((subPosition, subIndex) => (
                        <div key={subIndex} className="border-l-2 border-blue-300 pl-4">
                          <div className="flex justify-between items-start">
                            <p className="text-slate-800 font-medium">{subPosition.title}</p>
                            <p className="text-slate-600 text-sm">{subPosition.period}</p>
                          </div>
                          {subPosition.description && (
                            <p className="text-slate-600 mt-2">{subPosition.description}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      // Single position
                      <div className="border-l-2 border-blue-300 pl-4">
                        <div className="flex justify-between items-start">
                          <p className="text-slate-800 font-medium">{position.role}</p>
                          <p className="text-slate-600 text-sm">{position.period}</p>
                        </div>
                        {position.description && (
                          <div className="text-slate-600 mt-2">
                            {position.description.split('\n').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Key Achievements - Moved to bottom of card */}
                  {(position.metrics || position.positions?.some(p => p.metrics)) && (
                    <div className="mt-8 bg-blue-50/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-800 mb-2">Key Achievements</p>
                      <ul className="flex flex-wrap gap-2">
                        {position.metrics ? (
                          position.metrics.map((metric, metricIndex) => (
                            <li key={metricIndex} className="text-slate-700 text-sm flex items-center">
                              <span className="text-blue-500 mr-1">•</span>
                              {metric}
                            </li>
                          ))
                        ) : (
                          position.positions?.map((subPosition, subIndex) => 
                            subPosition.metrics?.map((metric, metricIndex) => (
                              <li key={`${subIndex}-${metricIndex}`} className="text-slate-700 text-sm flex items-center">
                                <span className="text-blue-500 mr-1">•</span>
                                {metric}
                              </li>
                            ))
                          ).flat()
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Easter Egg - Graduation Cap */}
            <div className="flex flex-col items-center mt-12">
              <button 
                onClick={() => {
                  console.log('Toggling student orgs:', !showStudentOrgs);
                  console.log('Student orgs data:', studentOrganizations);
                  setShowStudentOrgs(!showStudentOrgs);
                }}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110 bg-parchment p-3 rounded-full shadow-sm"
                aria-label="Toggle student organizations"
              >
                <FaGraduationCap size={28} />
              </button>
            </div>

            {/* Student Organizations Section */}
            {showStudentOrgs && (
              <>
                <div className="mt-12">
                  <h2 className="text-3xl font-heading mb-8 text-center">Student Organizations</h2>
                  <p className="text-center mb-8 text-slate-600">Educational leadership positions during university</p>
                </div>
                
                {studentOrganizations && studentOrganizations.length > 0 ? (
                  <div className="space-y-8">
                    {studentOrganizations.map((org, index) => (
                      <div key={index} className="bg-parchment p-8 rounded-lg shadow-sm">
                        {/* Organization Name */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-heading text-slate-800">
                              {org.company}
                            </h3>
                            
                            {/* Period removed from upper right */}
                          </div>
                          <div className="h-px bg-slate-300 my-4"></div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-700">
                            Student Organization
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                            Education
                          </span>
                        </div>

                        {/* Location */}
                        <p className="text-slate-600 mb-6">{org.location}</p>

                        {/* Roles and Details */}
                        <div className="mt-4 space-y-4">
                          {org.positions && org.positions.map((pos, posIndex) => (
                            <div key={posIndex} className="border-l-2 border-blue-300 pl-4">
                              <div className="flex justify-between items-start">
                                <p className="text-slate-800 font-medium">{pos.title}</p>
                                <p className="text-slate-600 text-sm">{pos.period}</p>
                              </div>
                              {pos.description && (
                                <p className="text-slate-600 mt-2">{pos.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-600">No student organization data available.</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer - using reusable component */}
      <PageFooter />
    </div>
  );
};

export default Workshop;