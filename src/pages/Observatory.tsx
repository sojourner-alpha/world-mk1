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

  // Observatory image from App.tsx
  const observatoryImage = "https://cdn.midjourney.com/ed339c2f-a4e1-431f-96fe-79f1da80128a/0_0.png";
  
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
          src={observatoryImage} 
          alt="Observatory" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="container-custom relative z-20 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="bg-matted/60 backdrop-blur-sm text-white p-8 rounded-lg">
              <h1 className="text-4xl font-heading mb-4">Observatory</h1>
              <p className="text-xl mb-6">Ideas & future perspectives</p>
              <p className="mb-6">A futuristic lookout point where thoughts on emerging technologies, future trends, and speculative ideas come together.</p>
              <div className="mt-6">
                <button className="btn btn-primary rounded-md px-6 py-2 bg-blue-600 hover:bg-blue-700 transition">
                  <span>Future Three.js Experience</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">Emerging Horizons</h2>
            
            <div className="bg-parchment p-8 rounded-lg shadow-md mb-12">
              <p className="text-lg mb-6">
                This section presents essays, predictions, and thought experiments that examine
                the intersection of technology, society, and human potential.
              </p>
              <p>
                Observatory invites you to explore emerging trends and ideas that may reshape
                our technological landscape, offering a forward-looking perspective on our digital future.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-parchment p-6 rounded-lg shadow-md fade-in-up">
                <h3 className="text-xl font-heading mb-4">Future Trends</h3>
                <p>
                  Analysis and insights into emerging technologies and their potential
                  impact on industries, society, and individual lives.
                </p>
                <div className="mt-4 text-blue-600">Coming soon</div>
              </div>
              
              <div className="bg-parchment p-6 rounded-lg shadow-md fade-in-up">
                <h3 className="text-xl font-heading mb-4">Thought Experiments</h3>
                <p>
                  Speculative explorations of potential futures, considering various
                  technological, social, and cultural trajectories.
                </p>
                <div className="mt-4 text-blue-600">Coming soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Three.js Experience */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading mb-6">Enter The Observatory</h2>
            <p className="text-lg mb-8">
              A future immersive Three.js experience will allow you to explore this world
              in an interactive 3D environment. Stay tuned as we develop this feature.
            </p>
            <button className="btn btn-outline border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-md px-8 py-3">
              Coming Soon
            </button>
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

export default Observatory; 