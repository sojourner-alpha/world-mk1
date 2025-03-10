import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Crossroads = () => {
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

  // Placeholder image
  const crossroadsHero = "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000";
  
  return (
    <div className="bg-parchment text-slate-800 min-h-screen">
      {/* Header */}
      <header className="py-6 border-b border-slate-300 sticky top-0 bg-parchment/95 backdrop-blur-sm z-10">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-heading text-slate-800">Curtis James</Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-600 hover:text-slate-900 text-sm">Home</Link>
              <span className="text-blue-600 text-sm">Crossroads</span>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-matted/70 to-transparent z-10"></div>
        <img 
          src={crossroadsHero} 
          alt="Crossroads" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container-custom relative z-10 flex items-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-heading mb-6 text-white">Crossroads</h1>
            <p className="text-xl text-gray-200">
              A central meeting place for connection and collaboration
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-heading mb-8 fade-in-up text-slate-800">Let's Connect</h2>
              <div className="fade-in-up matted-section">
                <p className="text-lg mb-8">
                  I'm always interested in new ideas, collaborations, or just connecting with like-minded people. 
                  Feel free to reach out using the form below.
                </p>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your name"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your email address"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your message"
                      disabled
                    ></textarea>
                  </div>
                  
                  <div>
                    <button type="button" className="btn btn-primary px-8 py-3 opacity-50 cursor-not-allowed" disabled>
                      Send Message <span className="ml-2 text-xs italic">(Coming Soon)</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Connect Options */}
            <div>
              <h2 className="text-3xl font-heading mb-8 fade-in-up text-slate-800">Other Ways to Connect</h2>
              
              <div className="space-y-8">
                <div className="matted-section fade-in-up">
                  <h3 className="text-xl font-heading mb-4">Social Platforms</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="flex items-center p-3 bg-black/40 rounded-md hover:bg-black/60 transition-colors cursor-not-allowed opacity-70">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full mr-3">
                        T
                      </span>
                      <span>Twitter</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-black/40 rounded-md hover:bg-black/60 transition-colors cursor-not-allowed opacity-70">
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full mr-3">
                        G
                      </span>
                      <span>GitHub</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-black/40 rounded-md hover:bg-black/60 transition-colors cursor-not-allowed opacity-70">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-700 rounded-full mr-3">
                        L
                      </span>
                      <span>LinkedIn</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-black/40 rounded-md hover:bg-black/60 transition-colors cursor-not-allowed opacity-70">
                      <span className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full mr-3">
                        Y
                      </span>
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
                
                <div className="matted-section fade-in-up">
                  <h3 className="text-xl font-heading mb-4">Visitor Map</h3>
                  <p className="mb-4 text-gray-300">
                    Leave your mark on the digital visitor map. Share where you're from and join the global community of explorers.
                  </p>
                  <div className="relative aspect-video bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                    <p className="text-sm text-gray-400">Interactive map coming soon</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-800/20 p-8 fade-in-up text-white">
                  <h3 className="text-xl font-heading mb-4">Newsletter</h3>
                  <p className="mb-4 text-gray-200">
                    Stay updated with my latest projects, ideas, and announcements.
                  </p>
                  <div className="flex space-x-2">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-black/40 border border-gray-700 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      disabled
                    />
                    <button className="btn btn-primary whitespace-nowrap opacity-50 cursor-not-allowed">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-slate-300">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-xl font-heading block mb-1 text-slate-800">Curtis James</Link>
              <p className="text-sm text-slate-600">Digital Craftsman & Futurist</p>
            </div>
            <div className="flex flex-col items-end">
              <nav className="flex space-x-6 mb-4">
                <Link to="/" className="text-slate-600 hover:text-slate-900">Home</Link>
                <Link to="/origin" className="text-slate-600 hover:text-slate-900">Origin</Link>
                <Link to="/workshop" className="text-slate-600 hover:text-slate-900">Workshop</Link>
                <Link to="/loft" className="text-slate-600 hover:text-slate-900">Loft</Link>
                <Link to="/observatory" className="text-slate-600 hover:text-slate-900">Observatory</Link>
              </nav>
              <p className="text-sm text-slate-500">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Crossroads; 