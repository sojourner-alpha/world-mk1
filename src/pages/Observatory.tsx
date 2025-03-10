import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Observatory = () => {
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
  const observatoryHero = "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2000";
  
  return (
    <div className="bg-parchment text-slate-800 min-h-screen">
      {/* Header */}
      <header className="py-6 border-b border-slate-300 sticky top-0 bg-parchment/95 backdrop-blur-sm z-10">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-heading text-slate-800">Curtis James</Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-600 hover:text-slate-900 text-sm">Home</Link>
              <span className="text-blue-600 text-sm">Observatory</span>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-matted/70 to-transparent z-10"></div>
        <img 
          src={observatoryHero} 
          alt="Observatory" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container-custom relative z-10 flex items-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-heading mb-6 text-white">Observatory</h1>
            <p className="text-xl text-gray-200">
              A futuristic lookout tower gazing into tomorrow's possibilities
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-heading mb-8 fade-in-up text-slate-800">Ideas & Future Perspectives</h2>
                <div className="fade-in-up matted-section">
                  <p className="mb-6">
                    Welcome to Observatory, where we explore the intersection of technology, society, and human potential. 
                    This is where I share thoughts on emerging technologies, predictions about future trends, 
                    and speculative ideas about where we might be heading.
                  </p>
                  <p className="mb-6">
                    Observatory represents the forward-looking aspect of my identity — the part that's constantly 
                    scanning the horizon for what comes next, analyzing patterns, and imagining possible futures. 
                    It's a space for intellectual exploration and thoughtful examination of complex ideas.
                  </p>
                  <h3 className="text-2xl font-heading mt-12 mb-6">Featured Thoughts</h3>
                  <div className="bg-black/80 p-8 rounded-lg border border-gray-700 mb-10">
                    <h4 className="text-xl font-heading mb-4">The Future of Digital Identity</h4>
                    <p className="mb-4">
                      In a world where our digital and physical lives continue to merge, how will our concept of identity evolve? 
                      This ongoing series explores the philosophical, technical, and social implications of our changing relationship with identity.
                    </p>
                    <div className="flex justify-end">
                      <span className="text-blue-400 cursor-not-allowed opacity-70">Coming soon</span>
                    </div>
                  </div>
                  <div className="bg-black/80 p-8 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-heading mb-4">Sustainable Technology Futures</h4>
                    <p className="mb-4">
                      How can we ensure that technological progress aligns with ecological sustainability? This exploration 
                      looks at emerging models for tech development that prioritize regenerative relationships with our planet.
                    </p>
                    <div className="flex justify-end">
                      <span className="text-blue-400 cursor-not-allowed opacity-70">Coming soon</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-heading mt-16 mb-6 fade-in-up text-slate-800">Future Features</h3>
                <div className="fade-in-up matted-section">
                  <p className="mb-4">
                    Observatory will evolve to include:
                  </p>
                  <ul className="list-disc pl-5 mb-10 space-y-2">
                    <li>An essay collection on technology futures</li>
                    <li>Interactive simulations that visualize emerging trends</li>
                    <li>A "futures sandbox" where visitors can experiment with different variables to see how they might shape tomorrow</li>
                    <li>A curated reading list of forward-thinking books and articles</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-matted rounded-lg border border-gray-700 p-6 mb-8 fade-in-up">
                  <h3 className="text-xl font-heading mb-4 text-white">Connect</h3>
                  <p className="text-gray-300 mb-6">
                    Interested in discussing future technologies or speculative ideas? Let's connect and explore these concepts together.
                  </p>
                  <Link to="/crossroads" className="btn btn-primary w-full">Reach Out</Link>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-800/30 p-6 fade-in-up text-white">
                  <h3 className="text-xl font-heading mb-4">Future Dispatch</h3>
                  <p className="text-gray-200 mb-6">
                    Join the observatory's regular transmission of insights, predictions, and thought experiments.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-black/50 border border-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      disabled
                    />
                    <button className="btn btn-primary whitespace-nowrap opacity-50 cursor-not-allowed">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic">Coming soon</p>
                </div>
              </div>
            </aside>
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
                <Link to="/crossroads" className="text-slate-600 hover:text-slate-900">Crossroads</Link>
              </nav>
              <p className="text-sm text-slate-500">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Observatory; 