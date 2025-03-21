import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaToolbox, FaLightbulb, FaEllipsis } from 'react-icons/fa6';
import { SiSubstack } from 'react-icons/si';
import Origin from './pages/Origin';
import Workshop from './pages/Workshop';
import Loft from './pages/Loft';
import Observatory from './pages/Observatory';
import Crossroads from './pages/Crossroads';
import CvPage from './pages/CvPage';

// Placeholder images (these would be replaced with actual images)
// const originImage = "https://cdn.midjourney.com/969574b2-9458-4444-b404-8bd3778f0ea8/0_3.png";
const originImage = "/world-mk1/assets/images/origin.png";
const workshopImage = "/world-mk1/assets/images/workshop.png";
const loftImage = "/world-mk1/assets/images/loft.png";
const observatoryImage = "/world-mk1/assets/images/observatory.png";
const crossroadsImage = "/world-mk1/assets/images/crossroads.png";

const Header = () => {
  const [socialExpanded, setSocialExpanded] = useState(false);
  
  const toggleSocial = () => {
    setSocialExpanded(!socialExpanded);
  };
  
  return (
    <header className="py-6">
      <div className="container-wide">
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <h1 className="text-3xl font-heading text-slate-800">Curtis James | Lederle</h1>
            <div className="flex items-center">
              <div className={`social-icons-header flex items-center ${socialExpanded ? 'expanded' : 'collapsed'}`}>
                {socialExpanded && (
                  <>
                    <a 
                      href="https://github.com/sojourner-alpha" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-slate-800 transition-colors px-2"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/clederle/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-slate-800 transition-colors px-2"
                    >
                      <FaLinkedinIn size={20} />
                    </a>
                    <a 
                      href="https://x.com/curtlederle" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-slate-800 transition-colors px-2"
                    >
                      <FaXTwitter size={20} />
                    </a>
                    <a 
                      href="https://curtislederle.substack.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-slate-800 transition-colors px-2"
                    >
                      <SiSubstack size={20} />
                    </a>
                  </>
                )}
                <button 
                  onClick={toggleSocial} 
                  className="text-slate-600 hover:text-slate-800 transition-colors ml-2 p-1 rounded-full hover:bg-slate-200"
                  aria-label="Toggle social media links"
                >
                  <FaEllipsis size={20} />
                </button>
              </div>
            </div>
          </div>
          <p className="text-slate-600 mt-1"> techologist + analyst + investor + consultant </p>
          <div className="header-divider"></div>
        </div>
      </div>
    </header>
  );
}

// Interface for our portal card props
interface PortalCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tag: string;
  tagColor: string;
  longDescription: string;
  shadowActive: boolean;
  animationDelay?: string;
}

const PortalCard = ({ title, description, image, link, tag, tagColor, longDescription, shadowActive, animationDelay = '2s' }: PortalCardProps) => {
  // Map tag colors to actual Tailwind classes
  const getTagColorClass = () => {
    switch(tagColor) {
      case 'tag-blue': return 'bg-blue-500';
      case 'tag-purple': return 'bg-purple-500';
      case 'tag-green': return 'bg-emerald-500';
      case 'tag-amber': return 'bg-amber-500';
      case 'tag-rose': return 'bg-rose-500';
      default: return 'bg-blue-500';
    }
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <div className="card-container">
      <div className={`portal-card ${shadowActive ? 'shadow-active' : ''}`}>
        <span className={`card-tag ${getTagColorClass()}`}>{tag}</span>
        <img src={image} alt={title} className="portal-card-image" />
        
        {/* Card content (centered vertically) */}
        <div className={`portal-card-content animate-slide-up ${expanded ? 'expanded' : ''}`} style={{ animationDelay }}>
          <h2 className="text-lg md:text-xl font-heading mb-2">{title}</h2>
          <p className="text-xs md:text-sm text-gray-300 mb-3">{description}</p>
          
          {/* Description section that expands in place */}
          <div className={`card-expandable-description ${expanded ? 'expanded' : 'collapsed'}`}>
            {expanded && (
              <p className="text-xs md:text-sm text-gray-200 mb-3 leading-relaxed">{longDescription}</p>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <Link to={link} className="btn btn-outline py-2 px-4 md:px-6 text-sm md:text-base font-medium w-full text-center">
              Explore
            </Link>
            <button 
              onClick={toggleExpand} 
              className="expand-btn text-xs md:text-sm text-gray-300 hover:text-white flex items-center justify-center gap-1 py-1 px-2 rounded transition-all duration-300"
              aria-label={expanded ? "Show less information" : "Show more information"}
            >
              {expanded ? 'Less info' : 'More info'}
              <span className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Media Icon Component
interface SocialIconProps {
  url: string;
  icon: React.ComponentType<{ size?: number }>;
  name: string;
}

const SocialIcon = ({ url, icon: Icon, name }: SocialIconProps) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="social-icon"
    aria-label={name}
  >
    <Icon size={24} />
  </a>
);

// Alternative implementation for using custom PNG images
/*
interface SocialIconProps {
  url: string;
  imageSrc: string;
  name: string;
}

const SocialIcon = ({ url, imageSrc, name }: SocialIconProps) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="social-icon"
    aria-label={name}
  >
    <img src={imageSrc} alt={name} className="w-6 h-6" />
  </a>
);
*/

// Section components for each portal area
/*
const OriginSection = () => (
  <section id="origin" className="scroll-section relative">
    <div className="absolute inset-0 z-0">
      <img src={originImage} alt="Origin" className="w-full h-full object-cover object-center" style={{aspectRatio: "16/9"}} />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    <div className="section-transition bottom"></div>
    <div className="container-wide relative z-10 h-full flex items-center">
      <div className="max-w-lg ml-auto mr-20 text-white">
        <div className="content-container content-container-right">
          <h2 className="section-title text-white content-title text-center">Origin</h2>
          <div className="content-text">
            <div className="text-left w-full">
              <p className="text-lg mb-6">A space where you can discover the journey and personal story that shaped my identity and perspective.</p>
            </div>
            <Link to="/origin" className="btn btn-primary content-button"><span>Explore Origin</span></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
*/

const WorkshopSection = () => (
  <section id="workshop" className="scroll-section relative mt-8 md:mt-16 lg:mt-20 z-10">
    <div className="section-transition top"></div>
    <div className="absolute inset-0 z-0">
      <img src={workshopImage} alt="Workshop" className="w-full h-full object-cover object-center" style={{aspectRatio: "16/9"}} />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    <div className="section-transition bottom"></div>
    <div className="container-wide relative z-10 h-full flex items-center">
      <div className="max-w-lg mr-auto ml-20 text-white">
        <div className="content-container content-container-left">
          <h2 className="section-title text-white content-title text-center">Workshop</h2>
          <div className="content-text">
            <div className="text-left w-full">
              <p className="text-lg mb-6">A professional portfolio featuring open source projects, technical skills, and career history with links to GitHub, LinkedIn, and CV.</p>
            </div>
            <Link to="/workshop" className="btn btn-primary content-button"><span>Enter Workshop</span></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LoftSection = () => (
  <section id="loft" className="scroll-section relative">
    <div className="section-transition top"></div>
    <div className="absolute inset-0 z-0">
      <img src={loftImage} alt="Loft" className="w-full h-full object-cover object-center" style={{aspectRatio: "16/9"}} />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    <div className="section-transition bottom"></div>
    <div className="container-wide relative z-10 h-full flex items-center">
      <div className="max-w-lg ml-auto mr-20 text-white">
        <div className="content-container content-container-right">
          <h2 className="section-title text-white content-title text-center">Loft</h2>
          <div className="content-text">
            <div className="text-left w-full">
              <p className="text-lg mb-6">A creative space showcasing books, art, games, and media that have shaped my perspective and sparked imagination.</p>
            </div>
            <Link to="/loft" className="btn btn-primary content-button"><span>Discover Loft</span></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ObservatorySection = () => (
  <section id="observatory" className="scroll-section relative">
    <div className="section-transition top"></div>
    <div className="absolute inset-0 z-0">
      <img src={observatoryImage} alt="Observatory" className="w-full h-full object-cover" style={{aspectRatio: "16/9", objectPosition: "center 20%"}} />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    <div className="section-transition bottom"></div>
    <div className="container-wide relative z-10 h-full flex items-center">
      <div className="max-w-lg mr-auto ml-20 text-white">
        <div className="content-container content-container-left">
          <h2 className="section-title text-white content-title text-center">Observatory</h2>
          <div className="content-text">
            <div className="text-left w-full">
              <p className="text-lg mb-6">A futuristic lookout point where thoughts on emerging technologies, future trends, and speculative ideas come together.</p>
            </div>
            <Link to="/observatory" className="btn btn-primary content-button"><span>Visit Observatory</span></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CrossroadsSection = () => (
  <section id="crossroads" className="scroll-section relative">
    <div className="absolute inset-0 z-0">
      <img src={crossroadsImage} alt="Crossroads" className="w-full h-full object-cover object-center" style={{aspectRatio: "16/9", objectPosition: "center 70%"}} />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    {/* Firefly - with responsive positioning */}
    <Link 
      to="/origin" 
      className="absolute w-4 h-4 rounded-full bg-white/80 hover:bg-yellow-200/90 transition-all duration-500 shadow-glow animate-pulse-slower z-[100] firefly-easter-egg"
      aria-label="Hidden portal"
    />
    <div className="section-transition top"></div>
    <div className="container-wide relative z-10 h-full flex items-center">
      <div className="max-w-lg ml-auto mr-20 text-white">
        <div className="content-container content-container-right">
          <h2 className="section-title text-white content-title text-center">Crossroads</h2>
          <div className="content-text">
            <div className="text-left w-full">
              <p className="text-lg mb-6">A central meeting place designed for connection, collaboration, and community engagement.</p>
            </div>
            <Link to="/crossroads" className="btn btn-primary content-button"><span>Join At Crossroads</span></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Home component with elegant layout
const Home = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [shadowsActive, setShadowsActive] = useState(() => {
    // Get saved preference from localStorage on initial render
    const saved = localStorage.getItem('shadowsActive');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleShadows = () => {
    const newValue = !shadowsActive;
    setShadowsActive(newValue);
    // Save preference to localStorage
    localStorage.setItem('shadowsActive', JSON.stringify(newValue));
  };

  // Animation for scroll sections
  useEffect(() => {
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
        // When a section enters the viewport
        if (entry.isIntersecting) {
          // Add active class to current section
          entry.target.classList.add('active-section');
          
          // Get the background image and transition elements
          const bgImage = entry.target.querySelector('img');
          if (bgImage) {
            bgImage.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            bgImage.style.opacity = '1';
            
            // Find transition lines and animate them
            const transitions = entry.target.querySelectorAll('.section-transition');
            transitions.forEach(transition => {
              if (transition) {
                (transition as HTMLElement).style.opacity = '1';
              }
            });
          }
        } else {
          // Remove active class from sections that are not in viewport
          entry.target.classList.remove('active-section');
          
          // Fade out background when section is not in view
          const bgImage = entry.target.querySelector('img');
          if (bgImage) {
            bgImage.style.opacity = '0.8';
          }
          
          // Fade out transition lines
          const transitions = entry.target.querySelectorAll('.section-transition');
          transitions.forEach(transition => {
            if (transition) {
              (transition as HTMLElement).style.opacity = '0';
            }
          });
        }
      });
    }, { 
      threshold: [0.1, 0.5, 0.9],
      rootMargin: '-10% 0px -10% 0px' // Add margin to trigger earlier/later
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
      // Cleanup
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
        
        // Calculate how far into the section we've scrolled (as a percentage)
        const scrollPercent = (scrollPosition - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
        
        // Apply parallax effect to the background image
        const bgImage = section.querySelector('img');
        if (bgImage && scrollPercent >= 0 && scrollPercent <= 1) {
          // Subtle parallax effect - move slower than scroll
          const translateY = scrollPercent * 50; // 50px max movement
          bgImage.style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Portal descriptions that will appear on the back of cards
  const portalDescriptions = {
    workshop: "Explore my open source projects, professional portfolio, technical skills and career path.",
    loft: "Discover my creative pursuits, hobby projects, podcasts, music and writing.",
    observatory: "Consider forward looking musings, predictions, and thought experiments."
  };

  return (
    <div className={`bg-parchment ${shadowsActive ? 'shadows-active-bg' : ''}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section flex flex-col py-6 md:py-12 pb-24 md:pb-24 min-h-[200vh] md:min-h-0 relative z-30">
        <div className="container-wide flex flex-col">
        
          <div className="max-w-5xl mx-auto text-center mb-2">
            <h1 className="text-xl md:text-2xl font-heading font-bold leading-tight mb-4 animate-fade-in text-slate-800">
              Welcome to my world(s).
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-4 animate-slide-up" style={{ animationDelay: '2s' }}>
              Where engineering meets imagination and data powers discovery.
            </p>
            
            <div className="header-divider mb-3"></div>
            
            <div className="call-to-action animate-fade-in" style={{ animationDelay: '0.4s' }}>
            </div>
          </div>
          
          {/* Portal Cards Row */}
          <div className="flex items-center justify-center py-4">
            <div className="w-full">
              <div className="cards-container flex flex-col md:flex-row items-center justify-center gap-12 md:gap-4 px-4 mb-16 md:mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="card-container md:w-auto">
                  <PortalCard 
                    title="Workshop" 
                    description="Professional portfolio & skills" 
                    image={workshopImage} 
                    link="/workshop"
                    tag="TECH"
                    tagColor="tag-green"
                    longDescription={portalDescriptions.workshop}
                    shadowActive={shadowsActive}
                    animationDelay="3s"
                  />
                </div>
                <div className="card-container md:w-auto">
                  <PortalCard 
                    title="Loft" 
                    description="Hobbies & creative pursuits" 
                    image={loftImage} 
                    link="/loft"
                    tag="CREATIVE"
                    tagColor="tag-blue"
                    longDescription={portalDescriptions.loft}
                    shadowActive={shadowsActive}
                    animationDelay="4s"
                  />
                </div>
                <div className="card-container md:w-auto">
                  <PortalCard 
                    title="Observatory" 
                    description="Ideas & future perspectives" 
                    image={observatoryImage} 
                    link="/observatory"
                    tag="FUTURE"
                    tagColor="tag-amber"
                    longDescription={portalDescriptions.observatory}
                    shadowActive={shadowsActive}
                    animationDelay="5s"
                  />
                </div>
              </div>
              
              {/* Social Media Icons - added responsive padding */}
              <div className="py-6">
                <div className="header-divider"></div>
                <div className="max-w-2xl mx-auto px-4 py-4">
                  <p className="text-base text-center">
                    This is my digital workshop and an experiment in <strong>web building</strong> + <strong>world building</strong>. Everything you see here is built by me, with the help of AI. 
                    <br />  <br /> Explore the portals above, each offering a unique lens into different dimensions of my work, creations and thoughts. Hidden easter eggs await!
                  </p>
                </div>
                <div className="flex justify-center my-6 mb-16 md:mb-6">
                  <div className="social-icon-container z-30">
                    <SocialIcon 
                      url="https://github.com/sojourner-alpha" 
                      icon={FaGithub}
                      name="GitHub"
                    />
                    <SocialIcon 
                      url="https://www.linkedin.com/in/clederle/" 
                      icon={FaLinkedinIn}
                      name="LinkedIn"
                    />
                    {/* Add lightbulb toggle as a social icon */}
                    <div 
                      className={`social-icon light-toggle ${shadowsActive ? 'active' : ''}`}
                      onClick={toggleShadows}
                      aria-label="Toggle light effects"
                      style={{ backgroundColor: shadowsActive ? 'rgba(100, 100, 100, 0.7)' : '#d1d5db' }}
                    >
                      <FaLightbulb size={24} />
                    </div>
                    <SocialIcon 
                      url="https://x.com/curtlederle" 
                      icon={FaXTwitter}
                      name="Twitter / X"
                    />
                    <SocialIcon 
                      url="https://curtislederle.substack.com" 
                      icon={SiSubstack}
                      name="Substack"
                    />
                  </div>
                </div>
                
                {/* Open Source Disclaimer */}
                <div className="open-source-disclaimer animate-fade-in mt-4 mb-12 md:mb-16" style={{ animationDelay: '0.5s' }}>
                  <p className="text-sm text-center text-slate-600">
                    This website and other projects I build are <strong>open source</strong> and available on <a href="https://github.com/sojourner-alpha" className="text-blue-700 hover:underline">GitHub</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer div to prevent overlap - increased height and made responsive */}
      <div className="h-40 md:h-36 lg:h-48"></div>
      
      {/* Scroll Sections */}
      <div ref={sectionsRef} className="relative z-20">
        <WorkshopSection />
        <LoftSection />
        <ObservatorySection />
        <CrossroadsSection />
      </div>
      
      {/* Footer */}
      <footer className="py-12 border-t border-slate-300">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-heading text-slate-800">Curtis James | Lederle </h2>
              <p className="text-sm text-slate-600">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex space-x-4">
              <SocialIcon 
                url="https://github.com/sojourner-alpha" 
                icon={FaGithub}
                name="GitHub"
              />
              <SocialIcon 
                url="https://x.com/curtlederle" 
                icon={FaXTwitter}
                name="Twitter / X"
              />
              <SocialIcon 
                url="https://www.linkedin.com/in/clederle/" 
                icon={FaLinkedinIn}
                name="LinkedIn"
              />
              <SocialIcon 
                url="https://curtislederle.substack.com" 
                icon={SiSubstack}
                name="Substack"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router basename="/world-mk1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/origin" element={<Origin />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/loft" element={<Loft />} />
        <Route path="/observatory" element={<Observatory />} />
        <Route path="/crossroads" element={<Crossroads />} />
        <Route path="/cv" element={<CvPage />} />
      </Routes>
    </Router>
  );
}

export default App;
