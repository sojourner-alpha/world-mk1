import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPodcast, FaGamepad, FaMusic, FaQuoteLeft, FaPaintBrush, FaGlobe, FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute, FaDesktop, FaTv, FaStickyNote, FaChevronLeft, FaChevronRight, FaGlobeAmericas, FaGlobeAsia, FaGlobeEurope } from 'react-icons/fa';
import { GiEarthAmerica, GiWorld } from 'react-icons/gi';

// Custom components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

// Custom hooks
import { useAnimations } from '../hooks/useAnimations';

interface Media {
  title: string;
  creator?: string;
  year?: string;
  description: string;
  link?: string;
  tags?: string[];
  imageUrl?: string;
  color?: string; // For books and albums
}

interface Quote {
  text: string;
  author: string;
  source?: string;
  year?: string;
}

const Loft = () => {
  // States for interactive elements
  const [selectedArtwork, setSelectedArtwork] = useState<number>(0);
  const [showGlobeDisplay, setShowGlobeDisplay] = useState(false);
  const [activePodcast, setActivePodcast] = useState<number | null>(null);
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  
  // Use shared animations
  useAnimations();

  // Background image
  const loftImage = "/world-mk1/assets/images/loft.png";

  // Media content by category
  const books: Media[] = [
    {
      title: "Dune",
      creator: "Frank Herbert",
      year: "1965",
      description: "A masterpiece of worldbuilding that explores ecology, politics, religion, and human evolution in a far-future interstellar society.",
      tags: ["Science Fiction", "Epic", "Politics"],
      link: "https://en.wikipedia.org/wiki/Dune_(novel)",
      color: "bg-amber-700"
    },
    {
      title: "Thinking, Fast and Slow",
      creator: "Daniel Kahneman",
      year: "2011",
      description: "An exploration of the two systems that drive the way we think—System 1 (fast, intuitive) and System 2 (slow, deliberate)—revealing cognitive biases that affect our judgment.",
      tags: ["Psychology", "Behavioral Economics", "Decision Making"],
      link: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
      color: "bg-blue-600"
    },
    {
      title: "Snow Crash",
      creator: "Neal Stephenson",
      year: "1992",
      description: "A science fiction novel that explores virtual reality, linguistics, religion, and memetics in a cyberpunk future.",
      tags: ["Science Fiction", "Cyberpunk", "Virtual Reality"],
      link: "https://en.wikipedia.org/wiki/Snow_Crash",
      color: "bg-slate-800"
    }
  ];

  const podcasts: Media[] = [
    {
      title: "Lex Fridman Podcast",
      creator: "Lex Fridman",
      description: "Conversations about AI, science, technology, history, philosophy and the nature of intelligence, consciousness, love, and power.",
      tags: ["AI", "Technology", "Philosophy"],
      link: "https://lexfridman.com/podcast/",
      imageUrl: "https://lexfridman.com/wordpress/wp-content/uploads/powerpress/artwork_3000-230.png"
    },
    {
      title: "The Tim Ferriss Show",
      creator: "Tim Ferriss",
      description: "Interviews with world-class performers across various fields to extract tools, tactics, and routines that listeners can apply to their own lives.",
      tags: ["Personal Development", "Business", "Health"],
      link: "https://tim.blog/podcast/",
      imageUrl: "https://i0.wp.com/tim.blog/wp-content/uploads/2022/06/the-tim-ferriss-show-3000x3000-1.png?w=1000&ssl=1"
    },
    {
      title: "Hardcore History",
      creator: "Dan Carlin",
      description: "In-depth, dramatic retellings of historical events that bring the past to life through storytelling and analysis.",
      tags: ["History", "Storytelling", "Analysis"],
      link: "https://www.dancarlin.com/hardcore-history-series/",
      imageUrl: "https://www.dancarlin.com/graphics/DC_HH_iTunes.jpg"
    }
  ];

  const games: Media[] = [
    {
      title: "Disco Elysium",
      creator: "ZA/UM",
      year: "2019",
      description: "A groundbreaking RPG that focuses on narrative and dialogue, featuring an amnesiac detective solving a murder in a politically charged city.",
      tags: ["RPG", "Mystery", "Political"],
      link: "https://en.wikipedia.org/wiki/Disco_Elysium",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/Disco_Elysium_Cover_art.jpg"
    },
    {
      title: "Outer Wilds",
      creator: "Mobius Digital",
      year: "2019",
      description: "An open world mystery about a solar system trapped in a 22-minute time loop, ending with the sun going supernova.",
      tags: ["Exploration", "Puzzle", "Space"],
      link: "https://en.wikipedia.org/wiki/Outer_Wilds",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/32/Outer_Wilds_Cover_Art.jpg"
    },
    {
      title: "The Legend of Zelda: Breath of the Wild",
      creator: "Nintendo",
      year: "2017",
      description: "A pioneering open-world adventure that emphasizes exploration and experimentation in a vast, interactive world.",
      tags: ["Adventure", "Open World", "Puzzle"],
      link: "https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg"
    }
  ];

  const artworks: Media[] = [
    {
      title: "Digital World",
      creator: "AI Collaboration",
      year: "2023",
      description: "An exploration of digital landscapes through generative AI, creating detailed virtual worlds that blend reality with imagination.",
      tags: ["AI Generated", "Digital", "Landscape"],
      imageUrl: "/world-mk1/assets/images/art/digital-world.png"
    },
    {
      title: "Bodhi",
      creator: "AI Collaboration",
      year: "2023",
      description: "A serene exploration of mindfulness and spiritual awakening, depicted through the iconic imagery of the Bodhi tree.",
      tags: ["AI Generated", "Spiritual", "Meditation"],
      imageUrl: "/world-mk1/assets/images/art/bodhi.png"
    },
    {
      title: "Lego",
      creator: "AI Collaboration",
      year: "2023",
      description: "A playful reimagining of creative construction, celebrating the joy of building and the endless possibilities of imagination.",
      tags: ["AI Generated", "Creative", "Playful"],
      imageUrl: "/world-mk1/assets/images/art/lego.png"
    }
  ];

  // Quotes
  const quotes: Quote[] = [
    {
      text: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
      author: "Albert Einstein",
      source: "The World as I See It",
      year: "1931"
    },
    {
      text: "The universe is not only stranger than we imagine, it is stranger than we can imagine.",
      author: "J.B.S. Haldane",
      source: "Possible Worlds and Other Papers",
      year: "1927"
    },
    {
      text: "We are all in the gutter, but some of us are looking at the stars.",
      author: "Oscar Wilde",
      source: "Lady Windermere's Fan",
      year: "1893"
    },
    {
      text: "I know not with what weapons World War III will be fought, but World War IV will be fought with sticks and stones.",
      author: "Albert Einstein"
    },
    {
      text: "The future is already here – it's just not evenly distributed.",
      author: "William Gibson",
      year: "1993"
    }
  ];
  
  // Navigation functions for artwork carousel
  const nextArtwork = () => {
    setSelectedArtwork((prev) => (prev + 1) % artworks.length);
  };
  
  const prevArtwork = () => {
    setSelectedArtwork((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  // Toggle the 3D showcase display
  const toggleGlobeDisplay = () => {
    setShowGlobeDisplay(!showGlobeDisplay);
  };

  return (
    <div className="bg-parchment text-slate-800 min-h-screen">
      {/* Header - using reusable component */}
      <PageHeader pageName="Loft" />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-matted/70 to-transparent z-10"></div>
        <img 
          src={loftImage} 
          alt="Loft" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="absolute inset-0 z-20">
          <div className="h-full flex items-center p-8">
            <div className="max-w-2xl">
              <div className="bg-matted/60 backdrop-blur-sm text-white p-8 rounded-lg shadow-sm">
                <h1 className="text-4xl font-heading mb-4">Loft</h1>
                <p className="text-xl mb-6">Creative Space & Media Collection</p>
                <p className="mb-6">Welcome to my digital loft - a cozy, cluttered space filled with books, art, games, podcasts, and thoughtful quotes that have shaped my perspective and sparked my imagination.</p>
              </div>
            </div>
          </div>
          
          {/* Globe Easter Egg - moved to hero section and restyled */}
          <div className="absolute bottom-8 right-80">
            <button 
              onClick={toggleGlobeDisplay}
              className="text-white hover:text-blue-300 transition-all transform hover:scale-110 focus:outline-none"
              aria-label="Open 3D showcase"
            >
              <GiWorld size={32} />
            </button>
          </div>
        </div>
      </section>
      
      {/* Main Loft Space - Immersive Layout */}
      <section className="relative py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="relative max-w-7xl mx-auto">
            {/* Wood Panel Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-amber-900/30 rounded-xl"></div>
            
            {/* Loft Grid Layout */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
              
              {/* Bookshelf Section - 3 columns on large screens */}
              <div className="lg:col-span-3 bg-amber-900/30 p-5 rounded-lg shadow-inner">
                <div className="flex items-center mb-4">
                  <FaBook className="text-amber-700 mr-2" />
                  <h2 className="text-xl font-heading text-amber-800">Bookshelf</h2>
                </div>
                
                {/* Bookshelf with 3D effect */}
                <div className="bg-amber-800/40 p-5 rounded shadow-inner border border-amber-700/20 relative">
                  {/* Wood grain texture */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                    <div className="h-full w-full bg-gradient-to-b from-amber-100/10 to-amber-900/10 rounded"></div>
                  </div>
                  
                  {/* Books */}
                  <div className="flex flex-col gap-4 relative z-10">
                    {books.map((book, index) => (
                      <div 
                        key={index} 
                        className="relative"
                        onMouseEnter={() => setHoveredBook(index)}
                        onMouseLeave={() => setHoveredBook(null)}
                      >
                        {/* Book spine */}
                        <div className={`${book.color} h-32 rounded-sm shadow-md flex items-center relative transform transition-all duration-300 ${hoveredBook === index ? 'translate-x-4' : ''}`}>
                          <h3 className="text-white font-medium px-3 py-2 text-center rotate-90 absolute inset-0 flex items-center justify-center">
                            {book.title}
                          </h3>
                        </div>
                        
                        {/* Book details popup */}
                        {hoveredBook === index && (
                          <div className="absolute left-full top-0 ml-6 w-64 bg-white/95 rounded-lg shadow-lg p-4 z-50">
                            <h4 className="font-heading text-slate-800 text-lg">{book.title}</h4>
                            <p className="text-slate-600 text-sm">{book.creator} • {book.year}</p>
                            <div className="my-2 h-px bg-slate-200"></div>
                            <p className="text-slate-700 text-sm mb-3">{book.description}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {book.tags?.map((tag, tagIndex) => (
                                <span key={tagIndex} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {book.link && (
                              <a 
                                href={book.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-end"
                              >
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Bookshelf bottom wood */}
                  <div className="h-3 bg-amber-900 mt-4 rounded-b shadow-inner"></div>
                </div>
              </div>
              
              {/* Art Gallery Wall - 4 columns on large screens */}
              <div className="lg:col-span-4 bg-slate-200/60 backdrop-blur-sm p-5 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaPaintBrush className="text-slate-700 mr-2" />
                    <h2 className="text-xl font-heading text-slate-700">Art Gallery</h2>
                  </div>
                </div>
                
                {/* Framed Picture with Navigation */}
                <div className="bg-white p-3 rounded-sm shadow-md border border-slate-300 aspect-square relative">
                  {/* Picture Frame */}
                  <div className="relative w-full h-full overflow-hidden">
                    {/* The artwork */}
                    <img 
                      src={artworks[selectedArtwork].imageUrl} 
                      alt={artworks[selectedArtwork].title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Artwork info overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-3">
                      <h3 className="font-heading text-lg">{artworks[selectedArtwork].title}</h3>
                      <p className="text-sm text-white/80">{artworks[selectedArtwork].creator} • {artworks[selectedArtwork].year}</p>
                    </div>
                    
                    {/* Navigation controls */}
                    <button 
                      onClick={prevArtwork}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={nextArtwork}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                
                {/* Artwork description */}
                <div className="mt-4 bg-white/70 p-4 rounded shadow-sm">
                  <p className="text-slate-700 text-sm">{artworks[selectedArtwork].description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {artworks[selectedArtwork].tags?.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Podcast Player (Computer Screen) - 5 columns on large screens */}
              <div className="lg:col-span-5 bg-slate-800 p-5 rounded-lg shadow-lg border-2 border-slate-700">
                <div className="flex items-center mb-4">
                  <FaDesktop className="text-slate-300 mr-2" />
                  <h2 className="text-xl font-heading text-slate-300">Podcasts</h2>
                </div>
                
                {/* Computer screen with podcasts */}
                <div className="bg-slate-900 rounded p-4 shadow-inner border border-slate-700 text-white">
                  {/* Screen header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-400">Podcast Player</div>
                  </div>
                  
                  {/* Podcasts list */}
                  <div className="space-y-4">
                    {podcasts.map((podcast, index) => (
                      <div 
                        key={index} 
                        className={`bg-slate-800 rounded p-3 transition-all cursor-pointer ${activePodcast === index ? 'ring-2 ring-blue-500' : 'hover:bg-slate-700'}`}
                        onClick={() => setActivePodcast(activePodcast === index ? null : index)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 flex-shrink-0">
                            <img 
                              src={podcast.imageUrl} 
                              alt={podcast.title} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-white text-sm font-medium">{podcast.title}</h3>
                            <p className="text-slate-400 text-xs">{podcast.creator}</p>
                          </div>
                          <button className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white">
                            {activePodcast === index ? <FaPause size={12} /> : <FaPlay size={12} />}
                          </button>
                        </div>
                        
                        {/* Expanded podcast info */}
                        {activePodcast === index && (
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <p className="text-slate-300 text-sm mb-3">{podcast.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                  <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
                                </div>
                                <span className="text-xs text-slate-400">12:34</span>
                              </div>
                              <div className="flex gap-3">
                                <button className="text-slate-400 hover:text-white">
                                  <FaVolumeUp size={14} />
                                </button>
                                {podcast.link && (
                                  <a 
                                    href={podcast.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
                                  >
                                    Listen
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Gaming Setup - 6 columns on large screens */}
              <div className="lg:col-span-6 bg-slate-900 p-5 rounded-lg shadow-xl border border-slate-800">
                <div className="flex items-center mb-4">
                  <FaTv className="text-slate-300 mr-2" />
                  <h2 className="text-xl font-heading text-slate-300">Gaming Corner</h2>
                </div>
                
                {/* Gaming monitor with games */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {games.map((game, index) => (
                    <div 
                      key={index} 
                      className={`bg-slate-800 rounded-lg overflow-hidden border border-slate-700 transition-all ${activeGame === index ? 'ring-2 ring-purple-500 transform scale-105' : 'hover:ring-1 hover:ring-purple-400'}`}
                      onClick={() => setActiveGame(activeGame === index ? null : index)}
                    >
                      {/* Game cover */}
                      <div className="relative aspect-video">
                        <img 
                          src={game.imageUrl} 
                          alt={game.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <h3 className="text-white text-sm font-medium">{game.title}</h3>
                          <p className="text-white/70 text-xs">{game.creator}</p>
                        </div>
                      </div>
                      
                      {/* Game details (shown if active) */}
                      {activeGame === index && (
                        <div className="p-3 bg-slate-800">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {game.tags?.map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-slate-300 text-xs mb-2">{game.description}</p>
                          {game.link && (
                            <a 
                              href={game.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 text-xs flex items-center justify-end"
                            >
                              Learn more
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quote Board - 6 columns on large screens */}
              <div className="lg:col-span-6 bg-slate-200/70 backdrop-blur-sm p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <FaStickyNote className="text-slate-700 mr-2" />
                  <h2 className="text-xl font-heading text-slate-700">Inspirational Quotes</h2>
                </div>
                
                {/* Cork board with quote notes */}
                <div className="bg-amber-100 p-5 rounded shadow-inner border border-amber-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quotes.map((quote, index) => (
                    <div 
                      key={index} 
                      className="bg-white/90 p-4 rounded shadow-md border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform"
                      style={{ 
                        transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (index % 3)}deg)`,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                      }}
                    >
                      <FaQuoteLeft className="text-slate-300 mb-2" size={18} />
                      <p className="text-slate-800 text-sm italic mb-3">{quote.text}</p>
                      <div className="flex justify-end">
                        <div className="text-right">
                          <p className="text-slate-800 font-medium text-sm">— {quote.author}</p>
                          {(quote.source || quote.year) && (
                            <p className="text-slate-500 text-xs">
                              {quote.source}
                              {quote.source && quote.year && ", "}
                              {quote.year}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3D Showcase Overlay */}
      {showGlobeDisplay && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="w-full h-full max-w-7xl max-h-[90vh] bg-black rounded-lg overflow-hidden relative">
            {/* Placeholder for Three.js content - will be replaced with actual Three.js implementation */}
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="text-3xl font-heading mb-4">3D Showcase Coming Soon</h2>
                <p className="max-w-md mx-auto mb-6">This space will feature interactive 3D exhibits of world building projects and experiments.</p>
                <button 
                  onClick={toggleGlobeDisplay}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Close Preview
                </button>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={toggleGlobeDisplay}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Close showcase"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Footer - using reusable component */}
      <PageFooter />
    </div>
  );
};

export default Loft; 