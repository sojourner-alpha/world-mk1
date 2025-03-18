import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WorldMap from '../components/WorldMap';

const Origin = () => {
  // Track if the biography card is expanded - set to true for expanded by default
  const [isBioExpanded, setIsBioExpanded] = useState(true);
  // Track which tab is active
  const [activeTab, setActiveTab] = useState('roots');
  // Track hovered place for tooltip
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Animation for elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Origin image from App.tsx
  const originImage = "https://cdn.midjourney.com/969574b2-9458-4444-b404-8bd3778f0ea8/0_3.png";
  
  // Places with proper lat/lng coordinates
  const places = [
    { name: "Minneapolis", region: "Midwest", type: "Current Base", coordinates: { lat: 44.9778, lng: -93.2650 } },
    { name: "Montreal", region: "Canada", type: "Home", coordinates: { lat: 45.5017, lng: -73.5673 } },
    { name: "Toronto", region: "Canada", type: "Home", coordinates: { lat: 43.6532, lng: -79.3832 } },
    { name: "New York", region: "East Coast", type: "Home", coordinates: { lat: 40.7128, lng: -74.0060 } },
    { name: "San Francisco", region: "West Coast", type: "Home", coordinates: { lat: 37.7749, lng: -122.4194 } },
    { name: "Singapore", region: "Asia", type: "Work", coordinates: { lat: 1.3521, lng: 103.8198 } },
    { name: "Seoul", region: "Asia", type: "Work", coordinates: { lat: 37.5665, lng: 126.9780 } },
    { name: "Berlin", region: "Europe", type: "Work", coordinates: { lat: 52.5200, lng: 13.4050 } },
    { name: "Bremen", region: "Europe", type: "Work", coordinates: { lat: 53.0793, lng: 8.8017 } },
    { name: "Necker Island", region: "Caribbean", type: "Work", coordinates: { lat: 18.5156, lng: -64.3571 } },
    { name: "Isle of Tiree", region: "UK", type: "Work", coordinates: { lat: 56.4911, lng: -6.8873 } },
    { name: "Halifax", region: "Canada", type: "Work", coordinates: { lat: 44.6488, lng: -63.5752 } },
  ];

  // Group places by type for the legend
  const placeTypes = [...new Set(places.map(place => place.type))];

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={originImage} 
          alt="Origin" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-heading text-white">Curtis James</Link>
            <div>
              <Link to="/" className="text-white hover:text-blue-300 transition">← Back to Nexus</Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content area */}
      <div className="relative z-10 h-[calc(100vh-96px)] overflow-auto">
        <div className="container mx-auto p-6 flex flex-col">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-heading text-white mb-2">Origin</h1>
            <p className="text-xl text-white">Personal story & journey</p>
          </div>
          
          {/* Centered Bio Card */}
          <div className="flex-1 flex flex-col items-center">
            <div 
              className={`bg-matted/70 backdrop-blur-sm rounded-lg transition-all duration-300 
                          max-w-4xl w-full mx-auto text-white fade-in cursor-pointer
                          ${isBioExpanded ? 'h-auto' : 'h-16'}`}
            >
              {/* Card Header - Always visible */}
              <div 
                className="flex items-center justify-between p-4 h-16"
                onClick={() => setIsBioExpanded(!isBioExpanded)}
              >
                <h2 className="text-2xl font-heading">Biography</h2>
                <span className="text-lg">
                  {isBioExpanded ? '−' : '+'}
                </span>
              </div>
              
              {/* Expandable Content */}
              {isBioExpanded && (
                <div className="p-4 pt-0">
                  {/* Tabs */}
                  <div className="flex flex-wrap border-b border-gray-600 mb-4">
                    <button 
                      className={`py-2 px-4 mr-2 ${activeTab === 'roots' 
                        ? 'border-b-2 border-blue-400 text-blue-300' 
                        : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setActiveTab('roots')}
                    >
                      Roots
                    </button>
                    <button 
                      className={`py-2 px-4 mr-2 ${activeTab === 'education' 
                        ? 'border-b-2 border-blue-400 text-blue-300' 
                        : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setActiveTab('education')}
                    >
                      Education
                    </button>
                    <button 
                      className={`py-2 px-4 ${activeTab === 'perspective' 
                        ? 'border-b-2 border-blue-400 text-blue-300' 
                        : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setActiveTab('perspective')}
                    >
                      Perspective
                    </button>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="pr-2">
                    {/* Roots Content */}
                    {activeTab === 'roots' && (
                      <div className="space-y-4">
                        <p>
                          I grew up in the American Midwest surrounded by a family of architects, doctors, and engineers—role models who showed me the power of focus and applied intellect.
                        </p>
                        <p>
                          My early days were spent tinkering with Legos and my mom's scale models. Watching her return to school for architecture ingrained a learner's mindset. Conversations over years with my dad fueled a love for data and science, while his voracious reading shaped my habits. Nearby, my favorite place was the workshop of my grandfather—a WWII RCAF engineer and master handyman—where anything could be built or fixed.
                        </p>
                        <p>
                          Canoeing the Boundary Waters, hiking Superior National Forest, and sailing Lake Superior humbled me with nature's scale, while sports instilled discipline and routine. A teenage mountaineering trip in the Sierra Nevadas opened me to the power of meditative stillness.
                        </p>
                        <p>
                          These experiences forged a mind driven to explore, build, and learn.
                        </p>
                      </div>
                    )}
                    
                    {/* Education Content */}
                    {activeTab === 'education' && (
                      <div className="space-y-4">
                        <p>
                          After high school I landed at university in Montreal, in the heart of a thriving international population mixed with a fiercly independent local spirit and a hub of students and entreprenuers in both the sciences and the arts. 
                        </p>
                        <p>
                          While there, I studied civil engineering and applied sciences, led student organizations connecting peers to local projects, and tutored science and math.
                        </p>
                        <p>
                          After university, I dove into industry headfirst—engineering first, then business—learning through lived experience (see <Link to="/workshop" className="text-blue-300 hover:text-blue-100">Workshop</Link>).
                        </p>
                        <p>
                          In the years since, I have continued to chase knowledge via an unending self guided cirriculum. It has ranged from probability and finance to psycology and philosophy to machine learning and more as it continues to evolve. 
                        </p>
                        <p>
                          I strive to devour more books each year as I continue to maintain the learner's mindset.
                        </p>
                      </div>
                    )}
                    
                    {/* Perspective Content */}
                    {activeTab === 'perspective' && (
                      <div className="space-y-4">
                        <p>
                          I'm curious, optimistic, disciplined, and patient—drawn to creation, from this digital workshop to hands-on builds.
                        </p>
                        <p>
                          Technology has been an evolving tool and near constant companion in my life. From a kid's tape player to teenage smartphones and video games, then software eating the world in apps in my 20s. 
                        </p>
                        <p>
                          In my 30s, AI's rise has sparked a scientific explosion and unlocked new frontiers. I see us at the dawn of a new age, where intellect and imagination can create unimaginable things.
                        </p>
                        <p>
                          As a parent I am deeply invested in understanding and shaping how these tools are built and used. 
                        </p>
                        <p>
                          As Narendra Modi said in an interview with Lex Fridman... "knowledge alone isn't enough, we must immerse ourselves in the flow of practice". And so we shall. 
                        </p>
                        <p>
                          This is my lens: to build, to explore, to share.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* World Map Section */}
            <div className="mt-8 bg-matted/70 backdrop-blur-sm rounded-lg p-6 max-w-4xl w-full mx-auto text-white fade-in">
              <h2 className="text-2xl font-heading mb-4">Geography</h2>
              
              {/* World Map Component */}
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <WorldMap 
                  places={places} 
                  onHoverPlace={setHoveredPlace} 
                  hoveredPlace={hoveredPlace}
                />
              </div>
              
              {/* Map Legend */}
              <div className="mt-4 flex flex-wrap gap-4">
                {placeTypes.map((type, index) => {
                  const getColor = () => {
                    switch(type) {
                      case 'Current Base': return 'bg-blue-500';
                      case 'Home': return 'bg-green-500';
                      case 'Work': return 'bg-red-500';
                      default: return 'bg-orange-500';
                    }
                  };

                  return (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getColor()} mr-2`}></div>
                      <span className="text-sm">{type}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Location list */}
              <div className="mt-4 flex flex-wrap gap-2">
                {places.map((place, index) => {
                  const getBgColor = () => {
                    switch(place.type) {
                      case 'Current Base': return 'bg-blue-500/20 border border-blue-500/40';
                      case 'Home': return 'bg-green-500/20 border border-green-500/40';
                      case 'Work': return 'bg-red-500/20 border border-red-500/40';
                      default: return 'bg-orange-500/20 border border-orange-500/40';
                    }
                  };
                  
                  return (
                    <div key={index} className={`px-3 py-1 rounded-full text-sm ${getBgColor()}`}>
                      {place.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Origin; 