import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FaDownload, FaBuilding, FaChartLine, FaCogs, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Workshop = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Animation for scroll elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Workshop image from App.tsx
  const workshopImage = "https://cdn.midjourney.com/2a89e5b4-ee6a-42bd-991e-8561a9b2fbe7/0_1.png";

  // Career timeline data
  const careerTimeline = [
    {
      company: "Sojourn Insight LLC",
      url: "#",
      role: "Partner",
      period: "2023 - Present",
      location: "Minneapolis, Minnesota · Remote",
      description: "Consulting services for founders, executives and researchers. R&D in machine learning applications in operations and finance.",
      skills: ["Investment Management", "Analysis", "Financial Modeling", "Operations Management", "Machine Learning"]
    },
    {
      company: "Tread",
      url: "#",
      role: "Multiple Roles",
      period: "2021 - 2024",
      location: "Minneapolis, Minnesota",
      positions: [
        {
          title: "Strategic Advisor",
          period: "2023 - 2024",
          description: "Provided strategic guidance on product development, go-to-market strategy, and organizational structure during key transition period.",
          skills: ["Business Strategy", "Management"]
        },
        {
          title: "Regional General Manager",
          period: "2022 - 2023",
          description: "Led regional operations, managing P&L responsibility and driving market expansion across multiple territories.",
          skills: ["Regional Management", "P&L Responsibility"]
        },
        {
          title: "Vice President Sales and Marketing",
          period: "2022 - 2023",
          description: "Directed all sales and marketing initiatives, developed go-to-market strategies, and built the commercial team from the ground up.",
          skills: ["Sales Management", "C-Level Executive Support", "Sales Operations", "Marketing Strategy"]
        },
        {
          title: "Chief of Staff",
          period: "2021 - 2022",
          description: "Orchestrated cross-functional initiatives, managed strategic projects, and supported the CEO in scaling operations and team development.",
          skills: ["Start-ups", "Process Improvement", "Analytics"]
        },
        {
          title: "Head of Sales",
          period: "2021 - 2022",
          description: "Established sales processes, built initial customer relationships, and developed the foundation for the company's revenue operations."
        }
      ]
    },
    {
      company: "Zendesk",
      url: "#",
      role: "Multiple Roles",
      period: "2020 - 2022",
      location: "San Francisco Bay Area",
      positions: [
        {
          title: "Senior Account Executive",
          period: "2019 - 2020",
          description: "Asia Pacific Lead - Conversation Solutions Team (Smooch.io Acquisition)"
        },
        {
          title: "Director Of Business Development",
          period: "2019 - 2020"
        }
      ]
    },
    {
      company: "Enercon Canada Inc.",
      url: "#",
      role: "Multiple Roles",
      period: "2013 - 2015",
      location: "Toronto, Canada Area",
      description: "Business development, sales, account management, contract negotiation, claims & settlements for North American customers.",
      positions: [
        {
          title: "Commercial Manager",
          period: "2015",
          description: "Strategy, policy, conferences, presentations, engagement for North American Markets"
        },
        {
          title: "Commercial Analyst",
          period: "2013 - 2015",
          description: "Contract structuring, financial analysis, market strategy for Ontario & Quebec. Commercial & legal negotiations for Eastern Canada."
        }
      ]
    },
    {
      company: "Sigmund Soudack & Associates Inc.",
      url: "#",
      role: "Engineer",
      period: "2013",
      location: "Toronto, Canada Area",
      description: "Designing junior engineer on projects ranging from skyscraper condominiums to single family residential homes across the Greater Toronto Area.",
      responsibilities: [
        "Structural design & analysis",
        "Creation of 3D models of proposed and existing towers",
        "Site visits and inspection",
        "Project management"
      ]
    }
  ];

  // Student organizations data
  const studentOrganizations = [
    {
      company: "National Organization for Business and Engineering",
      url: "#",
      role: "Multiple Leadership Roles",
      period: "2012 - 2014",
      location: "Montreal, Canada Area",
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
      role: "Multiple Leadership Roles",
      period: "2011 - 2013",
      location: "Montreal, Canada Area",
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

  // Open source projects data
  const openSourceProjects = [
    {
      name: "This Website",
      description: "Open source project combining web building and world building into a personal multiverse. Built with React, TypeScript, and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/sojourner-alpha/world-mk1",
      demoUrl: window.location.origin,
      isPublic: true
    },
    {
      name: "AI Financial Analysis",
      description: "Advanced financial analysis platform leveraging AI for market insights and portfolio optimization. Coming soon.",
      technologies: ["Python", "Machine Learning", "Financial Analysis"],
      githubUrl: "https://github.com/sojourner-alpha/dojofi",
      isPublic: false
    }
  ];

  // Skills categorization
  const skills = {
    business: [
      "Business Strategy",
      "Sales Management",
      "Marketing Strategy",
      "Investment Management",
      "Process Improvement",
      "Contract Negotiation",
      "Business Development"
    ],
    technical: [
      "Machine Learning",
      "Financial Modeling",
      "Analytics",
      "Operations Management",
      "Structural Engineering",
      "Project Management",
      "3D Modeling"
    ],
    leadership: [
      "C-Level Executive Support",
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
      <header className="py-6 border-b border-slate-300 sticky top-0 bg-parchment/95 backdrop-blur-sm z-10">
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
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-matted/70 to-transparent z-10"></div>
        <img 
          src={workshopImage} 
          alt="Workshop" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="container-custom relative z-20 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="bg-matted/60 backdrop-blur-sm text-white p-8 rounded-lg">
              <div>
                <h1 className="text-4xl font-heading mb-4">Workshop</h1>
                <p className="text-xl mb-6">Professional portfolio & skills</p>
                <p className="mb-6">A high-tech digital lab showcasing professional projects, skills, and technical innovations that demonstrate expertise.</p>
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
                  <a 
                    href="https://www.linkedin.com/in/clederle/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-blue-300 transition"
                  >
                    <FaLinkedinIn size={24} />
                  </a>
                  <div className="w-px h-6 bg-white/30"></div>
                  <a 
                    href="/cv.pdf" 
                    download 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <FaDownload className="mr-2" />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Projects Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">Open Source Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {openSourceProjects.map((project, index) => (
                <div key={index} className="bg-parchment p-6 rounded-lg shadow-md fade-in-up">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-heading">{project.name}</h3>
                    {!project.isPublic && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Coming Soon</span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center ${project.isPublic ? 'text-blue-600 hover:text-blue-800' : 'text-slate-400 cursor-not-allowed'}`}
                    >
                      <FaGithub className="mr-1" /> {project.isPublic ? 'Code' : 'Private'}
                    </a>
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">Professional Skills</h2>
            
            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
              {/* Technical Skills */}
              <div className="bg-parchment p-6 rounded-lg shadow-md fade-in-up w-full">
                <h3 className="text-xl font-heading mb-4 flex items-center justify-center">
                  <FaCogs className="mr-2 text-blue-600" />
                  Technical
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.technical.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Business Skills */}
              <div className="bg-parchment p-6 rounded-lg shadow-md fade-in-up w-full">
                <h3 className="text-xl font-heading mb-4 flex items-center justify-center">
                  <FaChartLine className="mr-2 text-green-600" />
                  Business
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.business.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Leadership Skills */}
              <div className="bg-parchment p-6 rounded-lg shadow-md fade-in-up w-full">
                <h3 className="text-xl font-heading mb-4 flex items-center justify-center">
                  <FaBuilding className="mr-2 text-slate-600" />
                  Leadership
                </h3>
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
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">Career Journey</h2>
            
            <div className="space-y-12">
              {careerTimeline.map((position, index) => (
                <div key={index} className="bg-parchment p-8 rounded-lg shadow-md fade-in-up">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <a 
                          href={position.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-2xl font-heading text-slate-800 hover:text-blue-600 transition-colors"
                        >
                          {position.company}
                        </a>
                        <p className="text-slate-600">{position.location}</p>
                      </div>
                      <p className="text-slate-600 text-right">{position.period}</p>
                    </div>
                    <p className="text-slate-700 font-medium">{position.role}</p>
                    {position.description && (
                      <p className="text-slate-600 mt-4">{position.description}</p>
                    )}
                    {position.positions && (
                      <div className="mt-4 space-y-4">
                        {position.positions.map((subPosition, subIndex) => (
                          <div key={subIndex} className="border-l-2 border-blue-300 pl-4">
                            <div className="flex justify-between items-start">
                              <p className="text-slate-800 font-medium">{subPosition.title}</p>
                              <p className="text-slate-600 text-sm">{subPosition.period}</p>
                            </div>
                            {subPosition.description && (
                              <p className="text-slate-600 mt-2">{subPosition.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {position.responsibilities && (
                      <ul className="mt-4 list-disc list-inside text-slate-600 space-y-1">
                        {position.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Organizations Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">Student Leadership</h2>
            
            <div className="space-y-12">
              {studentOrganizations.map((position, index) => (
                <div key={index} className="bg-parchment p-8 rounded-lg shadow-md fade-in-up">
                  <div className="border-l-4 border-purple-500 pl-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <a 
                          href={position.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-2xl font-heading text-slate-800 hover:text-purple-600 transition-colors"
                        >
                          {position.company}
                        </a>
                        <p className="text-slate-600">{position.location}</p>
                      </div>
                      <p className="text-slate-600 text-right">{position.period}</p>
                    </div>
                    <p className="text-slate-700 font-medium">{position.role}</p>
                    {position.description && (
                      <p className="text-slate-600 mt-4">{position.description}</p>
                    )}
                    {position.positions && (
                      <div className="mt-4 space-y-4">
                        {position.positions.map((subPosition, subIndex) => (
                          <div key={subIndex} className="border-l-2 border-purple-300 pl-4">
                            <div className="flex justify-between items-start">
                              <p className="text-slate-800 font-medium">{subPosition.title}</p>
                              <p className="text-slate-600 text-sm">{subPosition.period}</p>
                            </div>
                            {subPosition.description && (
                              <p className="text-slate-600 mt-2">{subPosition.description}</p>
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