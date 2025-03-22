import React from 'react';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

// Skills data from Workshop page
const skills = {
  business: [
    "Contract Negotiation",
    "Business Strategy",
    "Sales Management",
    "Investment Management",
    "Process Improvement",
    "Systems Implementation",
  ],
  technical: [
    "Calculus + Linear Algebra",
    "Probability Theory",
    "Financial Modeling",
    "Asset Pricing",
    "Operations Management",
    "Machine Learning",
  ],
  leadership: [
    "C-Suite Staff Support",
    "Team Management",
    "Strategic Planning",
    "Cross-functional Leadership",
    "Organizational Development",
    "Partnership Building",
  ]
};

// Career timeline from Workshop page
const careerHighlights = [
  {
    company: "Sojourn Insight",
    role: "Partner",
    period: "2023 - Present",
    description: "Consulting services for founders, executives and researchers. R&D in machine learning applications in operations and finance.",
    achievements: [
      "Fundraising readiness for Toronto based startup",
      "ML applications input to a Stanford Lab",
    ]
  },
  {
    company: "Tread Technologies",
    role: "Strategic Advisor / Chief of Staff / VP Sales & Marketing",
    period: "2021 - 2024",
    description: "Led cross-functional initiatives, managed strategic projects, and supported the CEO in scaling operations and team development.",
    achievements: [
      "9x ARR growth in 24 months",
      "500% increased avg. contract size",
      "Deployed CRM, sales ops and website"
    ]
  },
  {
    company: "Zendesk",
    role: "Senior Account Executive",
    period: "2020 - 2022",
    description: "Asia Pacific Lead - Conversation Solutions Team",
    achievements: [
      "Led APAC expansion of acquired tech",
      "Point of contact for Corp. Dev. M&A team"
    ]
  },
  {
    company: "Smooch.io",
    role: "Director of Business Development",
    period: "2016 - 2019",
    description: "Unified API communication platform for businesses to manage customer conversations across multiple channels.",
    achievements: [
      "20x revenue multiple at acquisition",
      "Closed 25% of revenue deals",
      "First business hire under C-Suite"
    ]
  },
];

// Education data
const education = [
  {
    institution: "McGill University",
    degree: "Bachelor of Engineering",
    field: "Civil Engineering",
    period: "2009 - 2014",
  },
  {
    institution: "MIT edX",
    degree: "Professional Certificate",
    field: "Probability & Finance",
    period: "2022",
  },
  {
    institution: "Self Guided",
    degree: "Technical Development",
    field: "Python, React, SQL, HTML, Three.js, MCP",
    period: "2016 - Present",
  }
];

// Project data
const projects = [
  {
    name: "Personal Website",
    description: "Open source project built with React, TypeScript, and Tailwind CSS.",
    url: "https://github.com/sojourner-alpha/world-mk1"
  },
  {
    name: "AI Financial Analysis",
    description: "Financial analysis platform leveraging AI for market insights.",
    url: "https://github.com/sojourner-alpha/dojofi"
  },
  {
    name: "AI/ML In Precision Neuroscience",
    description: "Research brief exploring applications of machine learning in RNA sequencing.",
    url: "https://sojournhabits.notion.site/ai-rna"
  },
  {
    name: "2025 Insight",
    description: "Analysis of emerging technology trends and their implications.",
    url: "https://substack.com/home/post/p-154955133"
  }
];

const CvTemplate: React.FC = () => {
  return (
    <div className="cv-page bg-white text-gray-800 p-12" style={{ 
      width: '8.5in', 
      height: '11in', 
      fontFamily: 'Inter, sans-serif',
      border: '2px solid #e2e8f0',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Curtis James Lederle</h1>
          <p className="text-gray-600">Analyst + Technologist + Investor + Consultant</p>
        </div>
        <div className="flex items-center space-x-5">
          <a href="https://curtisjames.ai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 text-sm">
            curtisjames.ai
          </a>
          <div className="h-4 w-px bg-gray-300"></div>
          <a href="https://github.com/sojourner-alpha" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/clederle/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
            <FaLinkedinIn size={18} />
          </a>
          <a href="mailto:contact@curtisjames.ai" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
            <FaEnvelope size={18} />
          </a>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <p className="text-sm leading-snug">
          Partner at Sojourn Insight consulting on AI/ML and operations with proven experience in propelling B2B SaaS growth.
          Background in scaling startups, driving revenue, and supporting executive decision-making with a unique blend of technical 
          and business expertise.
        </p>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">Professional Experience</h2>
        <div className="space-y-3">
          {careerHighlights.map((job, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold">{job.company}</span> | {job.role}
                </div>
                <span className="text-gray-600">{job.period}</span>
              </div>
              <p className="text-xs mt-1 leading-snug">{job.description}</p>
              {job.achievements && (
                <ul className="text-xs mt-1 text-gray-700 pl-4">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="leading-tight ml-2 relative">
                      <span className="absolute -left-4">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">Skills</h2>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <h3 className="text-sm font-medium mb-1">Business</h3>
            <ul className="text-xs text-gray-700 pl-4">
              {skills.business.map((skill, index) => (
                <li key={index} className="leading-tight ml-2 relative">
                  <span className="absolute -left-4">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">Technical</h3>
            <ul className="text-xs text-gray-700 pl-4">
              {skills.technical.map((skill, index) => (
                <li key={index} className="leading-tight ml-2 relative">
                  <span className="absolute -left-4">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">Leadership</h3>
            <ul className="text-xs text-gray-700 pl-4">
              {skills.leadership.map((skill, index) => (
                <li key={index} className="leading-tight ml-2 relative">
                  <span className="absolute -left-4">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="text-sm mb-1">
            <div className="flex justify-between">
              <div>
                <span className="font-bold">{edu.institution}</span> | {edu.degree}, {edu.field}
              </div>
              <span className="text-gray-600">{edu.period}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">Projects</h2>
        <div className="grid grid-cols-2 gap-3">
          {projects.map((project, index) => (
            <div key={index} className="text-sm">
              <h3 className="font-medium">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                  {project.name}
                </a>
              </h3>
              <p className="text-xs text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 mt-auto pt-4">
        <p>References available upon request</p>
      </footer>
    </div>
  );
};

export default CvTemplate; 