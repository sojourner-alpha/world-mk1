import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WorldMap from '../components/WorldMap';

const Origin = () => {
  // Track which sections are expanded - now using an array to allow multiple sections
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  // Track which tab is active
  const [activeTab, setActiveTab] = useState('perspective');
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
  const originImage = "/world-mk1/assets/images/origin.png";
  
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
    { name: "Chicago", region: "Midwest", type: "Work", coordinates: { lat: 41.8781, lng: -87.6298 } },
    { name: "Houston", region: "South", type: "Work", coordinates: { lat: 29.7604, lng: -95.3698 } },
  ];

  // Group places by type for the legend
  // const placeTypes = [...new Set(places.map(place => place.type))];

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
            <Link to="/" className="text-2xl font-heading text-white">Curtis James | Lederle</Link>
            <div>
              <Link to="/" className="text-white hover:text-blue-300 transition">← Home</Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content area - with custom scrollbar */}
      <div className="relative z-10 h-[calc(100vh-96px)] overflow-auto scrollbar-custom">
        <div className="container mx-auto p-6 flex flex-col">
          {/* Title - Fixed centered position */}
          <div className="absolute top-0 left-0 right-0 py-8 text-center">
            <h1 className="text-4xl md:text-5xl font-heading text-white mb-2">Origin</h1>
            <p className="text-xl text-white">influences on my perspective</p>
          </div>
          
          {/* Buttons Container - Left justified */}
          <div className="mt-32 flex flex-col gap-8">
            {/* Biography Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('bio') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-matted/70 backdrop-blur-sm rounded-lg text-white fade-in origin-section-button ${
                  !expandedSections.includes('bio') ? 'border border-white/30 hover:border-white/50' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('bio') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('bio') 
                        ? prev.filter(section => section !== 'bio')
                        : [...prev, 'bio']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading">Biography</h2>
                  {expandedSections.includes('bio') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'bio'));
                      }}
                      className="text-lg hover:text-blue-300 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('bio') && (
                  <div className="p-4 pt-0 section-content">
                    {/* Tabs - Now with explicit button styling and z-index */}
                    <div className="flex flex-wrap border-b border-gray-600 mb-4 relative z-50">
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTab === 'perspective' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => setActiveTab('perspective')}
                      >
                        Perspective
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTab === 'education' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => setActiveTab('education')}
                      >
                        Education
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 relative z-50 ${activeTab === 'roots' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => setActiveTab('roots')}
                      >
                        Roots
                      </button>
                    </div>
                    
                    {/* Tab Content - Now with lower z-index */}
                    <div className="pr-2 relative z-0">
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
                            Knowledge alone isn't enough, we must immerse ourselves in the flow of practice - Modi 
                          </p>
                          <p>
                            This is my lens: to build, to explore, to share.
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
                      
                      {/* Roots Content */}
                      {activeTab === 'roots' && (
                        <div className="space-y-4">
                          <p>
                            I grew up incredibly fortunate. I was a child of the American Midwest surrounded by a loving and supportive family of architects, doctors, and engineers—role models who showed me the power of focus and applied intellect.
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
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Geography Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('geo') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-matted/70 backdrop-blur-sm rounded-lg text-white fade-in origin-section-button ${
                  !expandedSections.includes('geo') ? 'border border-white/30 hover:border-white/50' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('geo') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('geo') 
                        ? prev.filter(section => section !== 'geo')
                        : [...prev, 'geo']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading">Geography</h2>
                  {expandedSections.includes('geo') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'geo'));
                      }}
                      className="text-lg hover:text-blue-300 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('geo') && (
                  <div className="p-4 pt-0 section-content">
                    {/* Legend - Now left justified */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                        <span className="text-sm text-white">Current Base</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-white">Home</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-700"></div>
                        <span className="text-sm text-white">Work</span>
                      </div>
                    </div>

                    {/* Places List - Now centered */}
                    <div className="mb-4 flex flex-col items-center">
                      <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {places
                          .filter(place => place.type === 'Current Base' || place.type === 'Home')
                          .map(place => (
                            <span
                              key={place.name}
                              className={`px-2 py-1 rounded text-sm ${
                                place.type === 'Current Base' 
                                  ? 'bg-gray-500' 
                                  : 'bg-blue-500'
                              }`}
                              onMouseEnter={() => setHoveredPlace(place.name)}
                              onMouseLeave={() => setHoveredPlace(null)}
                            >
                              {place.name}
                            </span>
                          ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {places
                          .filter(place => place.type === 'Work')
                          .map(place => (
                            <span
                              key={place.name}
                              className="px-2 py-1 rounded text-sm bg-green-700"
                              onMouseEnter={() => setHoveredPlace(place.name)}
                              onMouseLeave={() => setHoveredPlace(null)}
                            >
                              {place.name}
                            </span>
                          ))}
                      </div>
                    </div>
                    
                    {/* World Map Component - Now with higher z-index */}
                    <div className="relative w-full h-80 rounded-lg overflow-hidden z-50">
                      <WorldMap 
                        places={places} 
                        onHoverPlace={setHoveredPlace} 
                        initialCenter={{ lat: 45, lng: -90 }}
                        initialZoom={2.5}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Origin; 