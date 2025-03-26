import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedinIn, FaEnvelope, FaArrowCircleRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiSubstack } from 'react-icons/si';

// Custom components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import WorldMap from '../components/WorldMap';

// Custom hooks
import { useAnimations } from '../hooks/useAnimations';

const Crossroads = () => {
  const contactFormRef = useRef<HTMLFormElement>(null);
  
  // Use shared animations
  useAnimations();

  // Crossroads image from App.tsx
  const crossroadsImage = "/world-mk1/assets/images/crossroads.png";

  // Handle form submission (mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual form submission logic here
    alert('This form is not yet connected to a backend. Please use the direct contact options below.');
  };

  return (
    <div className="bg-parchment text-slate-800 min-h-screen">
      {/* Header - using reusable component */}
      <PageHeader pageName="Crossroads" />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-matted/70 to-transparent z-10"></div>
        <img 
          src={crossroadsImage} 
          alt="Crossroads" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="absolute inset-0 z-20">
          <div className="h-full flex items-center p-8">
            <div className="max-w-2xl">
              <div className="bg-matted/60 backdrop-blur-sm text-white p-8 rounded-lg shadow-sm">
                <h1 className="text-4xl font-heading mb-4">Crossroads</h1>
                <p className="text-xl mb-6">Contact & Community</p>
                <p className="mb-6">A virtual crossroads serving as the central hub connecting the worlds and networks beyond. Find me across the internet or reach out directly.</p>
                <div className="flex gap-4">
                  <a 
                    href="#connect" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center"
                  >
                    <span>Connect</span>
                    <FaArrowRight className="ml-2" />
                  </a>
                  <a 
                    href="#map" 
                    className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors flex items-center"
                  >
                    <span>World Map</span>
                    <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="scroll-section py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading text-center mb-16">Connect</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="fade-in-up">
                <h3 className="text-2xl font-heading mb-4">Send a Message</h3>
                <form ref={contactFormRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg w-full"
                  >
                    Send Message
                  </button>
                  <p className="text-sm text-slate-500 text-center mt-4">
                    * This form is for demonstration purposes only
                  </p>
                </form>
              </div>
              
              {/* Social Links */}
              <div className="space-y-8 fade-in-up">
                <h3 className="text-2xl font-heading mb-4">Find Me Online</h3>
                <div className="space-y-4">
                  <a 
                    href="https://github.com/sojourner-alpha" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FaGithub size={32} className="text-slate-800 mr-4" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-slate-500">@sojourner-alpha</p>
                    </div>
                    <FaArrowCircleRight className="ml-auto text-blue-600" />
                  </a>
                  
                  <a 
                    href="https://x.com/curtlederle" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FaXTwitter size={32} className="text-slate-800 mr-4" />
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-slate-500">@curtlederle</p>
                    </div>
                    <FaArrowCircleRight className="ml-auto text-blue-600" />
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/clederle/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FaLinkedinIn size={32} className="text-slate-800 mr-4" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-slate-500">in/clederle</p>
                    </div>
                    <FaArrowCircleRight className="ml-auto text-blue-600" />
                  </a>
                  
                  <a 
                    href="https://curtislederle.substack.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <SiSubstack size={32} className="text-slate-800 mr-4" />
                    <div>
                      <p className="font-medium">Substack</p>
                      <p className="text-sm text-slate-500">curtislederle.substack.com</p>
                    </div>
                    <FaArrowCircleRight className="ml-auto text-blue-600" />
                  </a>
                  
                  <a 
                    href="mailto:curtis@lederle.io" 
                    className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FaEnvelope size={32} className="text-slate-800 mr-4" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-slate-500">curtis@lederle.io</p>
                    </div>
                    <FaArrowCircleRight className="ml-auto text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* World Map Section */}
      <section id="map" className="scroll-section py-16 bg-gray-100">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-heading mb-4">World Map</h2>
            <p className="text-lg mb-12">Navigate the multiverse and discover how worlds connect</p>
            
            <div className="bg-parchment p-6 rounded-lg shadow-lg fade-in-up">
              <WorldMap />
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm fade-in-up">
                <h3 className="text-xl font-heading mb-2">Workshop</h3>
                <p className="text-slate-600 mb-4">Engineering, data science, and business projects</p>
                <Link 
                  to="/workshop" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Visit Workshop
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm fade-in-up">
                <h3 className="text-xl font-heading mb-2">Observatory</h3>
                <p className="text-slate-600 mb-4">Analysis of emerging technology and future trends</p>
                <Link 
                  to="/observatory" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Visit Observatory
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm fade-in-up">
                <h3 className="text-xl font-heading mb-2">Loft</h3>
                <p className="text-slate-600 mb-4">Creative pursuits, media, and personal interests</p>
                <Link 
                  to="/loft" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Visit Loft
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - using reusable component */}
      <PageFooter />
    </div>
  );
};

export default Crossroads; 