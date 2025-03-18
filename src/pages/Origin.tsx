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
                      Roots & Family
                    </button>
                    <button 
                      className={`py-2 px-4 mr-2 ${activeTab === 'athletics' 
                        ? 'border-b-2 border-blue-400 text-blue-300' 
                        : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setActiveTab('athletics')}
                    >
                      Athletics
                    </button>
                    <button 
                      className={`py-2 px-4 mr-2 ${activeTab === 'outdoor' 
                        ? 'border-b-2 border-blue-400 text-blue-300' 
                        : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setActiveTab('outdoor')}
                    >
                      Outdoor
                    </button>
                    <button 
                      className={`py-2 px-4 ${activeTab === 'education' 
                        ? 'border-b-2 border-blue-400 text-blue-300' 
                        : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setActiveTab('education')}
                    >
                      Education & Career
                    </button>
                  </div>
                  
                  {/* Tab Content - No height limitation to show all content */}
                  <div className="pr-2">
                    {/* Roots & Family Content */}
                    {activeTab === 'roots' && (
                      <div>
                        <p className="mb-3">
                          Born and raised in the American Midwest, I grew up in a family that valued
                          family education and travel. Education to maintain a learner's mind and 
                          continually improve you mind. Travel to experience new cultures and 
                          expand your perspective. 
                        </p>
                        <p className="mb-3">
                          My parents shared passion for curiosity and adventure would shape our family experiences.
                          From exploring world heritage sites in the American southwest to the Inca Trail, Machu Picchu
                          and the Galapagos Islands, our family trips were not to .
                        </p>
                        <p>
                          These early influences instilled in me a deep appreciation for both 
                          intellectual pursuit and practical application—seeing the world not just 
                          as it is, but envisioning how it could be improved through thoughtful design 
                          and purposeful innovation.
                        </p>
                      </div>
                    )}
                    
                    {/* Athletics Content */}
                    {activeTab === 'athletics' && (
                      <div>
                        <p className="mb-3">
                          As an active child, I found joy in movement and competition—playing hockey and soccer
                          throughout my early years. This athletic foundation evolved into high school achievements,
                          where I competed at the highest levels in both track and diving.
                        </p>
                        <p className="mb-3">
                          My competitive spirit continued into my twenties, where I swam and played squash 
                          at a competitive level. Today, I maintain a balanced physical practice through yoga, 
                          meditation, tai chi, and regular strength training.
                        </p>
                        <p>
                          These athletic pursuits have taught me discipline, perseverance, and the value of
                          continuous improvement—principles that extend far beyond physical activity into all
                          aspects of my professional and personal life.
                        </p>
        </div>
                    )}
                    
                    {/* Outdoor Content */}
                    {activeTab === 'outdoor' && (
                      <div>
                        <p className="mb-3">
                          My summers were spent at a camp in northern Minnesota, where I developed a profound
                          connection with the natural world. There, I first participated in and eventually led
                          multi-day expeditions—hiking, canoeing, mountaineering, and sailing through the
                          wilderness areas of Minnesota and California.
                        </p>
                        <p className="mb-3">
                          These immersive experiences shaped my approach to leadership and problem-solving—learning
                          to navigate not just geographic terrain, but the complex interpersonal dynamics that
                          emerge in challenging environments.
                        </p>
                        <p>
                          The wilderness became my classroom for understanding systems thinking, resource management,
                          and the delicate balance between ambitious goals and practical limitations—lessons that
                          continue to influence my professional perspective.
                        </p>
                      </div>
                    )}
                    
                    {/* Education & Career Content */}
                    {activeTab === 'education' && (
        <div>
                        <p className="mb-3">
                          As an American-Canadian dual citizen, I've had the privilege of experiencing diverse
                          perspectives across borders. My academic journey led me to McGill University in Montreal,
                          where I studied engineering and developed the technical foundation that would launch my
                          professional path.
                        </p>
                        <p className="mb-3">
                          Post-graduation, I worked with engineering firms in New York and Toronto, applying
                          theoretical knowledge to real-world challenges. Eventually, my interests evolved toward
                          the business side of technology, with roles based in Montreal, Toronto, San Francisco,
                          and now Minneapolis.
                        </p>
                        <p>
                          For a deeper look into my professional journey and technical expertise, visit the
                          <Link to="/workshop" className="text-blue-300 hover:text-blue-100 ml-1">Workshop</Link> world.
                          To explore my creative interests and hobbies, check out the
                          <Link to="/loft" className="text-blue-300 hover:text-blue-100 ml-1">Loft</Link> world.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
        </div>
            
            {/* World Map Section - Now using the WorldMap component */}
            <div className="mt-8 bg-matted/70 backdrop-blur-sm rounded-lg p-6 max-w-4xl w-full mx-auto text-white fade-in">
              <h2 className="text-2xl font-heading mb-4">Global Journey</h2>
              
              {/* Replace SVG with WorldMap component */}
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