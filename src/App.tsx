import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Origin from './pages/Origin';
import Workshop from './pages/Workshop';
import Loft from './pages/Loft';
import Observatory from './pages/Observatory';
import Crossroads from './pages/Crossroads';

// Placeholder images (these would be replaced with actual images)
const originImage = "https://cdn.midjourney.com/969574b2-9458-4444-b404-8bd3778f0ea8/0_3.png";
const workshopImage = "https://cdn.midjourney.com/2a89e5b4-ee6a-42bd-991e-8561a9b2fbe7/0_1.png";
const loftImage = "https://cdn.midjourney.com/969574b2-9458-4444-b404-8bd3778f0ea8/0_2.png";
const observatoryImage = "https://cdn.midjourney.com/ed339c2f-a4e1-431f-96fe-79f1da80128a/0_0.png";
const crossroadsImage = "https://cdn.midjourney.com/902fb2dd-864a-45fb-8bed-b3450745581d/0_0.png";

const Header = () => (
  <header className="py-6">
    <div className="container-wide">
      <div className="flex flex-col">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl font-heading text-slate-800">Curtis James Lederle</h1>
          <div className="hidden md:flex space-x-8 text-sm text-slate-600">
            {/* These will be added later, just placeholders */}
            <span className="cursor-not-allowed opacity-50">About</span>
            <span className="cursor-not-allowed opacity-50">Contact</span>
          </div>
        </div>
        <p className="text-slate-600 mt-1"> Techologist + Investor + Consultant </p>
        <div className="header-divider"></div>
      </div>
    </div>
  </header>
);

// Interface for our portal card props
interface PortalCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tag: string;
  tagColor: string;
  longDescription: string;
}

const PortalCard = ({ title, description, image, link, tag, tagColor, longDescription }: PortalCardProps) => {
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

  return (
    <div className="card-container">
      <div className="portal-card">
        <span className={`card-tag ${getTagColorClass()}`}>{tag}</span>
        <img src={image} alt={title} className="portal-card-image" />
        
        {/* Card content (always visible at bottom) */}
        <div className="portal-card-content">
          <h2 className="text-xl font-heading mb-2">{title}</h2>
          <p className="text-sm text-gray-300 mb-3">{description}</p>
          <Link to={link} className="btn btn-outline mt-auto self-start py-1 px-3 text-xs">
            Explore
          </Link>
        </div>
        
        {/* Description that slides up on hover */}
        <div className="card-description">
          <h3 className="text-lg font-heading mb-4">{title}</h3>
          <p className="text-sm leading-relaxed">{longDescription}</p>
        </div>
      </div>
    </div>
  );
};

// Social Media Icon Component
interface SocialIconProps {
  url: string;
  icon: string;
  name: string;
}

const SocialIcon = ({ url, icon, name }: SocialIconProps) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="social-icon"
    aria-label={name}
  >
    {icon}
  </a>
);

// Easter egg component for the Crossroads
const CrossroadsEasterEgg = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link 
      to="/crossroads" 
      className="easter-egg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? '🔥' : '?'}
    </Link>
  );
};

// Section components for each portal area
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
              <p className="text-lg mb-6">A space where you can discover the journey and personal story that shaped my identity and values.</p>
              <p className="mb-6">This section features an interactive timeline, personal values exploration, and hidden insights that reveal more about who I am beyond my professional identity.</p>
            </div>
            <Link to="/origin" className="btn btn-primary content-button"><span>Explore Origin</span></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WorkshopSection = () => (
  <section id="workshop" className="scroll-section relative">
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
              <p className="text-lg mb-6">A high-tech digital lab showcasing professional projects, skills, and technical innovations that demonstrate expertise.</p>
              <p className="mb-6">Here you'll find an interactive portfolio of case studies, project demos, and a visual representation of technical skills applied across different domains.</p>
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
              <p className="text-lg mb-6">A vibrant studio space that houses creative pursuits, hobbies, and artistic expressions beyond the professional realm.</p>
              <p className="mb-6">This section features a gallery of creative projects, music, writing, and other passion-driven work that showcases the more personal side of creativity.</p>
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
              <p className="mb-6">Explore essays, predictions, and thought experiments that examine the intersection of technology, society, and human potential.</p>
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
    <div className="section-transition top"></div>
    <div className="absolute inset-0 z-0">
      <img src={crossroadsImage} alt="Crossroads" className="w-full h-full object-cover object-center" style={{aspectRatio: "16/9", objectPosition: "center 70%"}} />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    <div className="container-wide relative z-10 h-full flex items-center">
      <div className="max-w-lg ml-auto mr-20 text-white">
        <div className="content-container content-container-right">
          <h2 className="section-title text-white content-title text-center">Crossroads</h2>
          <div className="content-text">
            <div className="text-left w-full">
              <p className="text-lg mb-6">A central meeting place designed for connection, collaboration, and community engagement.</p>
              <p className="mb-6">Here you can reach out for collaborations, leave your mark on an interactive visitor map, or find various ways to connect through social channels.</p>
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
    origin: "Origin chronicles my path from engineer to investor, revealing the formative experiences and values that drive my approach to building solutions and analyzing problems.",
    workshop: "Workshop showcases technical skills and innovations, demonstrating how engineering principles translate into tangible solutions and practical applications across domains.",
    loft: "Loft unveils creative pursuits that fuel imagination and remind us that technology serves human expression. Here creativity meets technical expertise in unexpected ways.",
    observatory: "Observatory invites you to explore emerging trends and ideas that may reshape our technological landscape, offering a forward-looking perspective on our digital future."
  };

  return (
    <div className="bg-parchment">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-wide">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-6xl font-heading leading-tight mb-6 animate-fade-in text-slate-800">
              Explore a Blueprint of Possibility
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-20 animate-slide-up">
              Where engineering meets imagination and data powers discovery
            </p>
          </div>
          
          {/* Portal Cards Row - evenly spaced across the page */}
          <div className="cards-container animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <PortalCard 
              title="Origin" 
              description="Personal story & journey" 
              image={originImage} 
              link="/origin"
              tag="STORY"
              tagColor="tag-amber"
              longDescription={portalDescriptions.origin}
            />
            <PortalCard 
              title="Workshop" 
              description="Professional portfolio & skills" 
              image={workshopImage} 
              link="/workshop"
              tag="TECH"
              tagColor="tag-blue"
              longDescription={portalDescriptions.workshop}
            />
            <PortalCard 
              title="Loft" 
              description="Hobbies & creative pursuits" 
              image={loftImage} 
              link="/loft"
              tag="CREATIVE"
              tagColor="tag-green"
              longDescription={portalDescriptions.loft}
            />
            <PortalCard 
              title="Observatory" 
              description="Ideas & future perspectives" 
              image={observatoryImage} 
              link="/observatory"
              tag="FUTURE"
              tagColor="tag-purple"
              longDescription={portalDescriptions.observatory}
            />
          </div>
          
          {/* Call to Action Text - Simplified since descriptions are now on cards */}
          <div className="call-to-action animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-base">
              Explore the intersection of <strong>web building</strong> and <strong>world building</strong> through these four portals, 
              each offering a unique lens into different dimensions of creation and thought.
            </p>
            
            <p className="text-base mt-6">
              Step through these portals to discover how the architecture of digital spaces can mirror the intricate design of our mental models and future visions.
            </p>
          </div>
          
          {/* Social Media Icons */}
          <div className="my-12">
            <div className="header-divider"></div>
            <div className="social-icon-container">
              <SocialIcon 
                url="https://github.com/sojourner-alpha" 
                icon="GH" 
                name="GitHub"
              />
              <SocialIcon 
                url="https://x.com/curtlederle" 
                icon="X" 
                name="Twitter / X"
              />
              <SocialIcon 
                url="https://www.linkedin.com/in/clederle/" 
                icon="IN" 
                name="LinkedIn"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Crossroads Easter Egg */}
      <CrossroadsEasterEgg />
      
      {/* Scroll Sections */}
      <div ref={sectionsRef}>
        <OriginSection />
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
            <div className="flex space-x-6">
              <a href="https://x.com/curtlederle" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900">Twitter</a>
              <a href="https://github.com/sojourner-alpha" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900">GitHub</a>
              <a href="https://www.linkedin.com/in/clederle/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/origin" element={<Origin />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/loft" element={<Loft />} />
        <Route path="/observatory" element={<Observatory />} />
        <Route path="/crossroads" element={<Crossroads />} />
      </Routes>
    </Router>
  );
}

export default App;
