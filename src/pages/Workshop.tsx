import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaDownload, FaBuilding, FaChartLine, FaCogs, FaGithub, FaLinkedinIn, FaLandmark, FaGraduationCap } from 'react-icons/fa';
import { SiNotion, SiSubstack } from 'react-icons/si';

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

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Observer for section transitions
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-section');
          const bgImage = entry.target.querySelector('img');
          if (bgImage) {
            bgImage.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            bgImage.style.opacity = '1';
          }
        } else {
          entry.target.classList.remove('active-section');
          const bgImage = entry.target.querySelector('img');
          if (bgImage) {
            bgImage.style.opacity = '0.8';
          }
        }
      });
    }, { 
      threshold: [0.1, 0.5, 0.9],
      rootMargin: '-10% 0px -10% 0px'
    });

    // Apply observers to elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });
    
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      fadeElements.forEach(element => {
        fadeObserver.unobserve(element);
      });
      sections.forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  // Add scrolling effects for parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.clientHeight;
        const scrollPercent = (scrollPosition - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
        
        const bgImage = section.querySelector('img');
        if (bgImage && scrollPercent >= 0 && scrollPercent <= 1) {
          const translateY = scrollPercent * 50;
          bgImage.style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Workshop image from App.tsx
  const workshopImage = "https://cdn.midjourney.com/2a89e5b4-ee6a-42bd-991e-8561a9b2fbe7/0_1.png";

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
      tags: ["Startup", "SaaS", "Construction Tech", "Private", "B2B", "First US Employee"],
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
      tags: ["Enterprise", "CRM Software", "Public", "B2B/B2C"],
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
      tags: ["Startup", "Software", "Acquired by Zendesk", "B2B", "First US Employee"],
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
      tags: ["Enterprise", "Manufacturing", "Energy", "Private", "B2B", "First US Employee"],
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
      tags: ["Enterprise", "Engineering", "Construction", "Private", "B2B"]
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
  const projects = [
    {
      name: "This Website",
      description: "Open source project combining web building and world building into a personal multiverse. Built with React, TypeScript, and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/sojourner-alpha/world-mk1",
      demoUrl: window.location.origin,
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

  // Skills categorization
  const skills = {
    business: [
      "Contract Negotiation",
      "Business Strategy",
      "Sales Management",
      "Investment Management",
      "Process Improvement",
      "Systems Implementation",
      "Market Analysis",

    ],
    technical: [
      "Calculus + Linear Algebra",
      "Probability Theory",
      "Financial Modeling",
      "Asset Pricing",
      "Operations Management",
      "Machine Learning",
      "Python/SQL/FastAPI"
    ],
    leadership: [
      "C-Suite Staff Support",
      "Team Management",
      "Strategic Planning",
      "Cross-functional Leadership",
      "Organizational Development",
      "Partnership Building",
      "Board Observer"
    ]
  };
  
  return (
    <div className="bg-parchment text-slate-800 min-h-screen">
      {/* Header */}
      <header className="py-6 border-b border-slate-300 sticky top-0 bg-parchment/95 backdrop-blur-sm z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-heading text-slate-800">Curtis James | Lederle</Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-600 hover:text-slate-900 text-sm">Home</Link>
              <span className="text-blue-600 text-sm">Workshop</span>
            </nav>
          </div>
        </div>
      </header>
      
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
                  <p className="mb-6">A virtual digital lab showcasing open source projects, professional skills, and detailed career path. See Github, LinkedIn, and download CV.</p>
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
      
      {/* Projects Section */}
      <section className="scroll-section py-8 relative mt-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://cdn.midjourney.com/6c1b299d-eeb6-438d-9b23-07fc83c82d86/0_1.png"
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
                <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm fade-in-up">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-heading text-slate-800">{project.name}</h3>
                    {project.type === 'github' && !project.isPublic && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Coming Soon</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-slate-600 text-slate-100 px-3 py-1 rounded-full text-sm border border-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-800 mb-4">{project.description}</p>
                  <div className="flex justify-center">
                    {project.type === 'github' ? (
                      project.isPublic ? (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <FaGithub size={24} className="mr-2" /> View Code
                        </a>
                      ) : (
                        <span className="flex items-center text-slate-800 cursor-not-allowed">
                          <FaGithub size={24} className="mr-2" /> Private
                        </span>
                      )
                    ) : (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        {project.type === 'notion' ? (
                          <><SiNotion size={24} className="mr-2" /> Read Research</>
                        ) : (
                          <><SiSubstack size={24} className="mr-2" /> Read Article</>
                        )}
                      </a>
                    )}
              </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Career Timeline Section */}
      <section className="scroll-section py-16 bg-white mt-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Core Tools */}
            <h2 className="text-3xl font-heading mb-6 text-center">Tools</h2>
            <div className="grid md:grid-cols-3 gap-6 justify-items-center mb-16">
              {/* Ops Tools */}
              <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
                <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
                  <FaCogs className="mr-2 text-slate-600" />
                  Ops
                </h3>
                <div className="h-px bg-slate-300 mb-4"></div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: "Notion", url: "https://www.notion.so" },
                    { name: "Cursor", url: "https://cursor.sh" },
                    { name: "Midjourney", url: "https://www.midjourney.com" },
                    { name: "Perplexity", url: "https://www.perplexity.ai" },
                    { name: "Google Suite", url: "https://workspace.google.com" }
                  ].map((tool, index) => (
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

              {/* AI/ML Tools */}
              <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
                <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
                  <FaChartLine className="mr-2 text-slate-600" />
                  AI/ML
                </h3>
                <div className="h-px bg-slate-300 mb-4"></div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: "OpenAI", url: "https://openai.com" },
                    { name: "Grok", url: "https://grok.x.com" },
                    { name: "Claude", url: "https://anthropic.com/claude" },
                    { name: "LLaMA", url: "https://ai.meta.com/llama" },
                    { name: "Deepseek", url: "https://deepseek.ai" },
                    { name: "Ollama", url: "https://ollama.ai" },
                    { name: "MCP", url: "https://mcp.ai" }
                  ].map((tool, index) => (
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

              {/* FinTech Tools */}
              <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
                <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
                  <FaLandmark className="mr-2 text-slate-600" />
                  FinTech
                </h3>
                <div className="h-px bg-slate-300 mb-4"></div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: "thinkorswim", url: "https://www.tdameritrade.com/tools-and-platforms/thinkorswim/desktop.page" },
                    { name: "Finviz", url: "https://finviz.com" },
                    { name: "TradingView", url: "https://www.tradingview.com" },
                    { name: "Tradezella", url: "https://tradezella.com" },
                    { name: "APIs", url: "https://www.programmableweb.com" }
                  ].map((tool, index) => (
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
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-200 mb-16"></div>

            {/* Professional Skills */}
            <h2 className="text-3xl font-heading mb-6 text-center">Skills</h2>
            <div className="grid md:grid-cols-3 gap-6 justify-items-center mb-16">
              {/* Technical Skills */}
              <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
                <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
                  <FaCogs className="mr-2 text-blue-600" />
                  Technical
                </h3>
                <div className="h-px bg-slate-300 mb-4"></div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.technical.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-slate-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Business Skills */}
              <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
                <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
                  <FaChartLine className="mr-2 text-green-600" />
                  Business
                </h3>
                <div className="h-px bg-slate-300 mb-4"></div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.business.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-green-50 text-slate-700 px-3 py-1 rounded-full text-sm border border-green-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Leadership Skills */}
              <div className="bg-parchment p-4 rounded-lg shadow-sm fade-in-up w-full">
                <h3 className="text-xl font-heading mb-3 flex items-center justify-center text-slate-700">
                  <FaBuilding className="mr-2 text-slate-600" />
                  Leadership
                </h3>
                <div className="h-px bg-slate-300 mb-4"></div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.leadership.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-slate-50 text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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
                    <a 
                      href={position.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-2xl font-heading text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      {position.company}
                    </a>
                    <div className="h-px bg-slate-300 my-4"></div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {position.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={`px-3 py-1 rounded-full text-sm ${
                          tag === "First US Employee" || tag === "Founder"
                            ? "bg-slate-600 text-slate-100 border border-slate-500 font-medium" 
                            : "bg-blue-50 text-blue-700"
                        }`}
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
            <div className="flex justify-center mt-12">
              <button 
                onClick={() => {
                  console.log('Toggling student orgs:', !showStudentOrgs);
                  setShowStudentOrgs(!showStudentOrgs);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-300 transform hover:scale-110"
                aria-label="Toggle student organizations"
              >
                <FaGraduationCap size={32} />
            </button>
            </div>

            {/* Student Organizations Section */}
            {showStudentOrgs && (
              <div className="mt-12">
                <h2 className="text-3xl font-heading mb-8 text-center">Student Organizations</h2>
                <div className="space-y-8">
                  {studentOrganizations.map((org, index) => (
                    <div key={index} className="bg-parchment p-8 rounded-lg shadow-sm">
                      <div className="border-l-4 border-red-800 pl-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-heading text-slate-800">{org.company}</h3>
                            <p className="text-slate-600">{org.location}</p>
                          </div>
                          <p className="text-slate-600">{org.period}</p>
                        </div>
                        <p className="text-slate-700 font-medium mb-4">{org.role}</p>
                        
                        {org.positions && (
                          <div className="space-y-4">
                            {org.positions.map((pos, posIndex) => (
                              <div key={posIndex} className="border-l-2 border-red-700 pl-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-slate-800 font-medium">{pos.title}</h4>
                                  <p className="text-slate-600 text-sm">{pos.period}</p>
                                </div>
                                {pos.description && (
                                  <p className="text-slate-600">{pos.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-slate-300">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-heading text-slate-800">Curtis James | Lederle </h2>
              <p className="text-sm text-slate-600">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div>
              <Link to="/" className="text-slate-600 hover:text-slate-900">Back to Nexus</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Workshop;