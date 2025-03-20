import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Observatory = () => {
  // Track which sections are expanded - using an array to allow multiple sections
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  // Track which tab is active for each section
  const [activeTabs, setActiveTabs] = useState({
    systems: 'energy',
    robotics: 'overview',
    space: 'overview',
    economics: 'overview'
  });

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

  // Observatory image from App.tsx
  const observatoryImage = "https://cdn.midjourney.com/ed339c2f-a4e1-431f-96fe-79f1da80128a/0_0.png";

  // Handle tab change
  const handleTabChange = (section: string, tab: string) => {
    setActiveTabs(prev => ({
      ...prev,
      [section]: tab
    }));
  };
  
  return (
    <div className="h-screen overflow-hidden relative">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={observatoryImage} 
          alt="Observatory" 
          className="w-full h-full object-cover"
          style={{objectPosition: "center 15%"}}
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
            <h1 className="text-4xl md:text-5xl font-heading text-white mb-2">Observatory</h1>
            <p className="text-xl text-white">visions of emerging horizons</p>
          </div>
          
          {/* Buttons Container - Right justified when collapsed, centered when open */}
          <div className="mt-32 flex flex-col gap-8 items-end">
            {/* Critical Systems Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('systems') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-matted/70 backdrop-blur-sm rounded-lg text-white fade-in origin-section-button ${
                  !expandedSections.includes('systems') ? 'border border-white/30 hover:border-white/50' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('systems') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('systems') 
                        ? prev.filter(section => section !== 'systems')
                        : [...prev, 'systems']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading">Critical Systems</h2>
                  {expandedSections.includes('systems') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'systems'));
                      }}
                      className="text-lg hover:text-blue-300 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('systems') && (
                  <div className="p-4 pt-0 section-content">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-gray-600 mb-4 relative z-50">
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.systems === 'energy' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('systems', 'energy')}
                      >
                        Energy
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.systems === 'infrastructure' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('systems', 'infrastructure')}
                      >
                        Infrastructure
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 relative z-50 ${activeTabs.systems === 'information' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('systems', 'information')}
                      >
                        Information
                      </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="pr-2 relative z-0">
                      {/* Energy Content */}
                      {activeTabs.systems === 'energy' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <p>
                              Energy systems form the foundation of modern civilization, powering everything from homes and transportation to industrial processes and digital infrastructure.
                            </p>
                            <p>
                              As we transition toward sustainable energy sources, AI is revolutionizing how we generate, distribute, and consume energy at all scales.
                            </p>
                            <p>
                              This section explores first-principles thinking on energy systems as a fundamental constraint and enabler of civilizational advancement.
                            </p>
                          </div>
                          
                          {/* Project Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {/* Project Card 1 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Fusion Energy Economics</h3>
                              <p className="text-white/80 mb-3">A techno-economic assessment of commercial fusion energy deployment pathways and their potential impact on global energy markets.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">In progress</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Report</button>
                              </div>
                            </div>
                            
                            {/* Project Card 2 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">AI-Optimized Grid Systems</h3>
                              <p className="text-white/80 mb-3">Exploring how machine learning algorithms can improve grid stability, demand forecasting, and renewable integration at continental scale.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Upcoming</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Project</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Infrastructure Content */}
                      {activeTabs.systems === 'infrastructure' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <p>
                              Infrastructure represents the physical and organizational structures that enable society to function and thrive.
                            </p>
                            <p>
                              AI-enhanced infrastructure systems are transforming how we build cities, manage resources, handle logistics, and develop resilient systems for an uncertain future.
                            </p>
                            <p>
                              This section examines emerging paradigms in infrastructure development that could overcome current bottlenecks to human flourishing.
                            </p>
                          </div>
                          
                          {/* Project Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {/* Project Card 1 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Autonomous Construction Systems</h3>
                              <p className="text-white/80 mb-3">Investigating how robotics and AI will revolutionize construction through prefabrication, on-site automation, and novel materials.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">In progress</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Report</button>
                              </div>
                            </div>
                            
                            {/* Project Card 2 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Resilient Urban Systems</h3>
                              <p className="text-white/80 mb-3">A framework for designing cities that can adapt to climate change, population shifts, and resource constraints through integrated systems approaches.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Upcoming</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Project</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Information Content */}
                      {activeTabs.systems === 'information' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <p>
                              Information systems govern how data is created, transmitted, stored, and utilized across society and the economy.
                            </p>
                            <p>
                              AI is fundamentally transforming information systems while being shaped by them, creating new capabilities and challenges in knowledge management, communication, and decision-making.
                            </p>
                            <p>
                              This section explores how information flows may evolve and how these changes could unlock new levels of coordination and innovation.
                            </p>
                          </div>
                          
                          {/* Project Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {/* Project Card 1 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Collective Intelligence Architectures</h3>
                              <p className="text-white/80 mb-3">Analyzing systems that combine human and machine intelligence to solve complex problems beyond the capabilities of either alone.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">In development</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Report</button>
                              </div>
                            </div>
                            
                            {/* Project Card 2 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">AI Governance Models</h3>
                              <p className="text-white/80 mb-3">Evaluating institutional designs and technical mechanisms that could enable beneficial AI development while mitigating systemic risks.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Ongoing</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Project</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Robotics Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('robotics') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-matted/70 backdrop-blur-sm rounded-lg text-white fade-in origin-section-button ${
                  !expandedSections.includes('robotics') ? 'border border-white/30 hover:border-white/50' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('robotics') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('robotics') 
                        ? prev.filter(section => section !== 'robotics')
                        : [...prev, 'robotics']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading">Robotics</h2>
                  {expandedSections.includes('robotics') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'robotics'));
                      }}
                      className="text-lg hover:text-blue-300 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('robotics') && (
                  <div className="p-4 pt-0 section-content">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-gray-600 mb-4 relative z-50">
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.robotics === 'overview' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('robotics', 'overview')}
                      >
                        Overview
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.robotics === 'humanoid' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('robotics', 'humanoid')}
                      >
                        Humanoid
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 relative z-50 ${activeTabs.robotics === 'industrial' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('robotics', 'industrial')}
                      >
                        Industrial
                      </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="pr-2 relative z-0">
                      {/* Overview Content */}
                      {activeTabs.robotics === 'overview' && (
                        <div className="space-y-4">
                          <p>
                            Robotics is experiencing a renaissance driven by advances in AI, materials science, and sensing technologies. Once confined to controlled industrial environments, robots are increasingly capable of operating in complex, unstructured settings.
                          </p>
                          <p>
                            The convergence of deep learning, simulation environments, and new hardware approaches is enabling a new generation of robots with unprecedented capabilities.
                          </p>
                          <p>
                            This observatory lens tracks the frontier of robotics research and applications, from manufacturing and healthcare to home assistance and exploration.
                          </p>
                        </div>
                      )}
                      
                      {/* Humanoid Robotics Content */}
                      {activeTabs.robotics === 'humanoid' && (
                        <div className="space-y-4">
                          <p>
                            Humanoid robots are designed with physical characteristics resembling the human body. This form factor offers versatility in human-designed environments and intuitive human-robot interaction.
                          </p>
                          <p>
                            Recent breakthroughs include improved bipedal locomotion, dexterous manipulation, and whole-body coordination. Companies like Figure, Tesla, Agility Robotics, and Boston Dynamics are driving rapid innovation in this space.
                          </p>
                          <p>
                            The commercial deployment of general-purpose humanoid robots could transform labor markets, elder care, household assistance, and dangerous occupations within the next decade.
                          </p>
                        </div>
                      )}
                      
                      {/* Industrial Robotics Content */}
                      {activeTabs.robotics === 'industrial' && (
                        <div className="space-y-4">
                          <p>
                            Industrial robotics is evolving beyond traditional fixed-position automation to include collaborative robots (cobots), autonomous mobile robots (AMRs), and flexible manufacturing systems.
                          </p>
                          <p>
                            Modern industrial robots leverage computer vision, reinforcement learning, and advanced control systems to adapt to changing conditions and work safely alongside humans.
                          </p>
                          <p>
                            Emerging applications include construction robotics, agricultural automation, and fully autonomous factories with minimal human intervention. These systems promise to reshape global supply chains and manufacturing capabilities.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Space Technology Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('space') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-matted/70 backdrop-blur-sm rounded-lg text-white fade-in origin-section-button ${
                  !expandedSections.includes('space') ? 'border border-white/30 hover:border-white/50' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('space') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('space') 
                        ? prev.filter(section => section !== 'space')
                        : [...prev, 'space']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading">Space Technology</h2>
                  {expandedSections.includes('space') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'space'));
                      }}
                      className="text-lg hover:text-blue-300 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('space') && (
                  <div className="p-4 pt-0 section-content">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-gray-600 mb-4 relative z-50">
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.space === 'overview' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('space', 'overview')}
                      >
                        Overview
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.space === 'propulsion' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('space', 'propulsion')}
                      >
                        Propulsion
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 relative z-50 ${activeTabs.space === 'habitation' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('space', 'habitation')}
                      >
                        Habitation
                      </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="pr-2 relative z-0">
                      {/* Overview Content */}
                      {activeTabs.space === 'overview' && (
                        <div className="space-y-4">
                          <p>
                            Space technology is undergoing a transformation from government-led exploration to a diverse ecosystem of commercial innovation, international cooperation, and ambitious long-term visions.
                          </p>
                          <p>
                            Reusable launch vehicles, miniaturized satellites, advanced propulsion concepts, and in-space manufacturing are reducing costs and expanding capabilities beyond what was previously possible.
                          </p>
                          <p>
                            This observatory lens monitors developments in launch systems, satellite applications, deep space exploration, and the emerging space economy that could reshape humanity's relationship with the cosmos.
                          </p>
                        </div>
                      )}
                      
                      {/* Propulsion Content */}
                      {activeTabs.space === 'propulsion' && (
                        <div className="space-y-4">
                          <p>
                            Advanced space propulsion technologies promise to dramatically reduce transit times within our solar system and potentially enable interstellar missions.
                          </p>
                          <p>
                            Near-term developments include high-power electric propulsion, nuclear thermal propulsion, and various forms of solar sails. These approaches offer significant advantages over conventional chemical rockets for certain mission profiles.
                          </p>
                          <p>
                            Longer-term concepts include fusion propulsion, antimatter catalyzed reactions, and breakthrough physics approaches that could theoretically achieve a significant fraction of light speed for small payloads.
                          </p>
                        </div>
                      )}
                      
                      {/* Habitation Content */}
                      {activeTabs.space === 'habitation' && (
                        <div className="space-y-4">
                          <p>
                            Sustainable human presence beyond Earth requires solving complex challenges in closed-loop life support, radiation protection, artificial gravity, and psychological well-being.
                          </p>
                          <p>
                            Current space stations serve as testbeds for technologies that will enable long-duration missions to the Moon, Mars, and beyond. Commercial space stations are expected to greatly expand orbital living volume in the coming decade.
                          </p>
                          <p>
                            Advanced concepts include utilizing in-situ resources for construction, 3D printing habitats, and eventually establishing self-sustaining settlements that could survive independent of Earth.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Macro Economics Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedSections.includes('economics') 
                  ? 'w-full max-w-4xl self-center' 
                  : 'w-64 cursor-pointer hover:scale-105'
              }`}
            >
              <div 
                className={`bg-matted/70 backdrop-blur-sm rounded-lg text-white fade-in origin-section-button ${
                  !expandedSections.includes('economics') ? 'border border-white/30 hover:border-white/50' : ''
                }`}
                onClick={(e) => {
                  // Check if the click is on the header or content
                  const target = e.target as HTMLElement;
                  const isHeader = target.closest('.section-header');
                  const isContent = target.closest('.section-content');
                  
                  // Only handle click if not clicking on content or header
                  if (!expandedSections.includes('economics') || (!isHeader && !isContent)) {
                    setExpandedSections(prev => 
                      prev.includes('economics') 
                        ? prev.filter(section => section !== 'economics')
                        : [...prev, 'economics']
                    );
                  }
                }}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 section-header">
                  <h2 className="text-2xl font-heading">Macro Economics</h2>
                  {expandedSections.includes('economics') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSections(prev => prev.filter(section => section !== 'economics'));
                      }}
                      className="text-lg hover:text-blue-300 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Expanded Content */}
                {expandedSections.includes('economics') && (
                  <div className="p-4 pt-0 section-content">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-gray-600 mb-4 relative z-50">
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.economics === 'overview' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('economics', 'overview')}
                      >
                        Overview
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 mr-2 relative z-50 ${activeTabs.economics === 'metrics' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('economics', 'metrics')}
                      >
                        Key Metrics
                      </button>
                      <button 
                        type="button"
                        className={`py-2 px-4 relative z-50 ${activeTabs.economics === 'models' 
                          ? 'border-b-2 border-blue-400 text-blue-300' 
                          : 'text-gray-300 hover:text-white'}`}
                        onClick={() => handleTabChange('economics', 'models')}
                      >
                        Economic Models
                      </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="pr-2 relative z-0">
                      {/* Overview Content */}
                      {activeTabs.economics === 'overview' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <p>
                              Macroeconomic systems coordinate resources, labor, and capital at societal scale, fundamentally shaping human welfare and technological progress.
                            </p>
                            <p>
                              AI and automation are driving unprecedented changes in economic structures, potentially transforming productivity, labor markets, and wealth distribution.
                            </p>
                            <p>
                              This section tracks key metrics and explores first-principles models of economic transformation in an era of intelligent machines.
                            </p>
                          </div>
                          
                          {/* Project Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {/* Project Card 1 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">AI Productivity Metrics</h3>
                              <p className="text-white/80 mb-3">A dashboard tracking the impact of AI on economic productivity across sectors, with projections for future growth trajectories.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Coming soon</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Dashboard</button>
                              </div>
                            </div>
                            
                            {/* Project Card 2 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Post-Scarcity Economics</h3>
                              <p className="text-white/80 mb-3">Theoretical frameworks for economic systems operating under conditions of radically abundant energy, computation, and manufacturing capability.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Early research</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Project</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Metrics Content */}
                      {activeTabs.economics === 'metrics' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <p>
                              Tracking key economic indicators helps us understand the impact of technological change on broader economic systems.
                            </p>
                            <p>
                              Here we compile and analyze metrics related to productivity, employment, wealth distribution, and technological adoption across different sectors and regions.
                            </p>
                          </div>
                          
                          {/* Project Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {/* Project Card 1 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Global AI Impact Index</h3>
                              <p className="text-white/80 mb-3">A comprehensive analysis of AI adoption rates across industries and their correlation with productivity and economic growth.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">In development</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Index</button>
                              </div>
                            </div>
                            
                            {/* Project Card 2 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Labor Market Transformation</h3>
                              <p className="text-white/80 mb-3">Tracking skill premiums, job displacement, and job creation patterns across the economy as automation accelerates.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Ongoing research</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Data</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Models Content */}
                      {activeTabs.economics === 'models' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <p>
                              Traditional economic models struggle to capture the dynamics of an economy transformed by general-purpose AI and advanced automation.
                            </p>
                            <p>
                              This section explores new conceptual frameworks for understanding economic systems under conditions of rapidly increasing technological capabilities.
                            </p>
                          </div>
                          
                          {/* Project Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {/* Project Card 1 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Recursive Production Functions</h3>
                              <p className="text-white/80 mb-3">Exploring mathematical models for economic growth when AI can recursively improve the key factors of production.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Theoretical work</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Paper</button>
                              </div>
                            </div>
                            
                            {/* Project Card 2 */}
                            <div className="bg-black/30 border border-white/20 rounded-lg p-4 hover:border-white/40 transition">
                              <h3 className="text-xl text-blue-300 mb-2">Distribution Mechanisms</h3>
                              <p className="text-white/80 mb-3">Evaluating alternative economic distribution systems for a world where labor is no longer the primary factor in production.</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Early research</span>
                                <button className="text-blue-300 hover:text-blue-100 transition">View Project</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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

export default Observatory; 