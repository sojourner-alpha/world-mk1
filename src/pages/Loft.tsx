import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPodcast, FaGamepad, FaMusic, FaQuoteLeft, FaPaintBrush, FaGlobe, FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute, FaDesktop, FaTv, FaStickyNote, FaChevronLeft, FaChevronRight, FaGlobeAmericas, FaGlobeAsia, FaGlobeEurope, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
  const [clickedBook, setClickedBook] = useState<number | null>(null);
  const [fullscreenArt, setFullscreenArt] = useState<boolean>(false);
  
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
    },
    {
      title: "The Three-Body Problem",
      creator: "Liu Cixin",
      year: "2008",
      description: "A hard science fiction masterpiece that begins during China's Cultural Revolution and spans to a future where humanity faces an existential threat from an alien civilization.",
      tags: ["Science Fiction", "First Contact", "Physics"],
      link: "https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)",
      color: "bg-green-700"
    },
    {
      title: "The Dawn of Everything",
      creator: "David Graeber & David Wengrow",
      year: "2021",
      description: "A groundbreaking exploration of human history that challenges conventional narratives about the development of civilization, inequality, and political systems.",
      tags: ["Anthropology", "History", "Politics"],
      link: "https://en.wikipedia.org/wiki/The_Dawn_of_Everything",
      color: "bg-red-700"
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
    },
    {
      title: "Library",
      creator: "AI Collaboration",
      year: "2023",
      description: "A cozy digital library that captures the essence of knowledge and the wonder of discovering new ideas through books.",
      tags: ["AI Generated", "Knowledge", "Reading"],
      imageUrl: "/world-mk1/assets/images/art/library.png"
    },
    {
      title: "Matrix",
      creator: "AI Collaboration",
      year: "2023",
      description: "A visual representation of the digital realm, inspired by the iconic aesthetic of the Matrix films and the concept of simulated reality.",
      tags: ["AI Generated", "Digital", "Cyberpunk"],
      imageUrl: "/world-mk1/assets/images/art/matrix.png"
    },
    {
      title: "Mask",
      creator: "AI Collaboration",
      year: "2023",
      description: "An exploration of identity and persona, portraying the many faces we wear and the layers of self we present to the world.",
      tags: ["AI Generated", "Identity", "Surreal"],
      imageUrl: "/world-mk1/assets/images/art/mask.png"
    },
    {
      title: "Tinker",
      creator: "AI Collaboration",
      year: "2023",
      description: "A celebration of invention and curiosity, depicting the joy of tinkering and building with one's hands.",
      tags: ["AI Generated", "Invention", "Creative"],
      imageUrl: "/world-mk1/assets/images/art/tinker.png"
    },
    {
      title: "Truth",
      creator: "AI Collaboration",
      year: "2023",
      description: "A philosophical piece reflecting on the nature of truth and perspective, and how our understanding is shaped by our vantage point.",
      tags: ["AI Generated", "Philosophy", "Conceptual"],
      imageUrl: "/world-mk1/assets/images/art/truth.png"
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

  // Keyboard navigation for art gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenArt) return;
      
      switch (e.key) {
        case 'ArrowRight':
          nextArtwork();
          break;
        case 'ArrowLeft':
          prevArtwork();
          break;
        case 'Escape':
          setFullscreenArt(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenArt]);

  // Toggle the 3D showcase display
  const toggleGlobeDisplay = () => {
    setShowGlobeDisplay(!showGlobeDisplay);
  };

  // Music collection
  const music: Array<{
    title: string;
    creator: string;
    imageUrl?: string;
    link: string;
  }> = [
    {
      title: "Chill Lo-Fi Mix",
      creator: "Ambient Sounds",
      imageUrl: "/world-mk1/assets/images/music-lofi.jpg",
      link: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
    },
    {
      title: "Focus Beats",
      creator: "Concentration Music",
      imageUrl: "/world-mk1/assets/images/music-focus.jpg",
      link: "https://www.youtube.com/watch?v=lTRiuFIWV54"
    },
    {
      title: "Space Ambient",
      creator: "Cosmic Sounds",
      imageUrl: "/world-mk1/assets/images/music-space.jpg",
      link: "https://www.youtube.com/watch?v=tNkZsRW7h2c"
    },
    {
      title: "Nature Sounds",
      creator: "Relaxation Audio",
      link: "https://www.youtube.com/watch?v=eKFTSSKCzWA"
    }
  ];

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
          <div className="absolute bottom-8 right-8 md:right-16 lg:right-24">
            <button 
              onClick={toggleGlobeDisplay}
              className="text-white hover:text-blue-300 transition-all transform hover:scale-110 focus:outline-none bg-black/30 backdrop-blur-sm p-3 rounded-full"
              aria-label="Open 3D showcase"
            >
              <GiWorld size={28} />
            </button>
          </div>
        </div>
      </section>
      
      {/* Main Loft Space - Immersive Layout */}
      <section className="relative py-8 md:py-12 bg-slate-100">
        <div className="container mx-auto px-2 md:px-4">
          <div className="relative max-w-7xl mx-auto">
            {/* Wood Panel Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-amber-900/30 rounded-xl"></div>
            
            {/* Loft Grid Layout */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 p-3 md:p-6">
              
              {/* Bookshelf Section - Full width */}
              <div className="lg:col-span-12 bg-amber-900/30 p-5 rounded-lg shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaBook className="text-amber-700 mr-2" />
                    <h2 className="text-xl font-heading text-amber-800">Bookshelf</h2>
                  </div>
                  <p className="text-amber-800 text-sm hidden md:block">Click a book to learn more</p>
                </div>
                
                {/* Bookshelf with 3D effect */}
                <div className="bg-amber-800/40 p-5 rounded shadow-inner border border-amber-700/20 relative">
                  {/* Wood grain texture */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                    <div className="h-full w-full bg-gradient-to-b from-amber-100/10 to-amber-900/10 rounded"></div>
                  </div>
                  
                  {/* Books - Horizontal Layout */}
                  <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center md:justify-between relative z-10">
                    {books.map((book, index) => (
                      <div 
                        key={index} 
                        className="relative"
                      >
                        {/* Book spine */}
                        <div 
                          className={`${book.color} h-48 md:h-56 w-20 md:w-24 rounded-sm shadow-md flex items-center relative transform transition-all duration-300 ${clickedBook === index ? 'translate-y-4' : ''}`}
                          onClick={() => setClickedBook(clickedBook === index ? null : index)}
                        >
                          <h3 className="text-white font-medium px-3 py-2 text-center absolute inset-0 flex items-center justify-center">
                            {book.title}
                          </h3>
                        </div>
                        
                        {/* Book details popup */}
                        {clickedBook === index && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-white/95 rounded-lg shadow-lg p-4 z-50">
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
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setClickedBook(null);
                              }}
                              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                              aria-label="Close book details"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Bookshelf bottom wood */}
                  <div className="h-3 bg-amber-900 mt-4 rounded-b shadow-inner"></div>
                </div>
              </div>
              
              {/* Middle section with Art Gallery, Podcasts, and Music in a 3-column layout */}
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Podcast Player (Radio) */}
                <div className="bg-slate-800 p-5 rounded-lg shadow-lg border-2 border-slate-700">
                  <div className="flex items-center mb-4">
                    <FaPodcast className="text-slate-300 mr-2" />
                    <h2 className="text-xl font-heading text-slate-300">Radio Station</h2>
                  </div>
                  
                  {/* Radio with podcasts */}
                  <div className="bg-slate-900 rounded p-4 shadow-inner border border-slate-700 text-white">
                    {/* Radio top with dials */}
                    <div className="flex items-center justify-between mb-3 bg-slate-800 p-2 rounded">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <div className="text-xs text-slate-400">PODCAST FM</div>
                      <div className="w-8 h-3 bg-amber-400/70 rounded"></div>
                    </div>
                    
                    {/* Podcasts list */}
                    <div className="space-y-4">
                      {podcasts.slice(0, 3).map((podcast, index) => (
                        <div 
                          key={index} 
                          className={`bg-slate-800 rounded p-3 transition-all cursor-pointer ${activePodcast === index ? 'ring-2 ring-blue-500' : 'hover:bg-slate-700'}`}
                          onClick={() => setActivePodcast(activePodcast === index ? null : index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex-shrink-0">
                              <img 
                                src={podcast.imageUrl} 
                                alt={podcast.title} 
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-white text-sm font-medium line-clamp-1">{podcast.title}</h3>
                              <p className="text-slate-400 text-xs line-clamp-1">{podcast.creator}</p>
                            </div>
                            <button className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white">
                              {activePodcast === index ? <FaPause size={12} /> : <FaPlay size={12} />}
                            </button>
                          </div>
                          
                          {/* Expanded podcast info */}
                          {activePodcast === index && (
                            <div className="mt-3 pt-3 border-t border-slate-700">
                              <p className="text-slate-300 text-sm mb-3 line-clamp-3">{podcast.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
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
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      <FaGlobe size={14} />
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
                
                {/* Art Gallery in the center */}
                <div className="bg-slate-200/60 backdrop-blur-sm p-5 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaPaintBrush className="text-slate-700 mr-2" />
                      <h2 className="text-xl font-heading text-slate-700">Art Gallery</h2>
                    </div>
                  </div>
                  
                  {/* Framed Picture with Navigation */}
                  <div className="bg-white p-3 rounded-sm shadow-md border border-slate-300 aspect-square relative">
                    {/* Picture Frame with decorative border */}
                    <div className="absolute inset-0 border-8 border-amber-800/30 rounded-sm pointer-events-none z-20"></div>
                    
                    {/* The artwork */}
                    <div className="relative w-full h-full overflow-hidden">
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
                      
                      {/* Fullscreen button */}
                      <button 
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullscreenArt(true);
                        }}
                        aria-label="View artwork in fullscreen"
                      >
                        <FaExpand size={14} />
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
                  
                  {/* Artwork thumbnails preview */}
                  <div className="mt-4 flex gap-1 overflow-x-auto py-2">
                    {artworks.map((artwork, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedArtwork(index)}
                        className={`h-14 w-14 flex-shrink-0 rounded overflow-hidden cursor-pointer transition-all ${selectedArtwork === index ? 'ring-2 ring-blue-500 opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <img
                          src={artwork.imageUrl}
                          alt={`Thumbnail of ${artwork.title}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Music Player (Tablet) */}
                <div className="bg-slate-900 p-5 rounded-lg shadow-lg border-2 border-slate-800">
                  <div className="flex items-center mb-4">
                    <FaMusic className="text-slate-300 mr-2" />
                    <h2 className="text-xl font-heading text-slate-300">Music Lounge</h2>
                  </div>
                  
                  {/* Tablet-like music player */}
                  <div className="bg-black rounded-lg overflow-hidden border border-slate-700 shadow-inner">
                    {/* Tablet header with camera */}
                    <div className="flex justify-center p-1 border-b border-slate-800 bg-slate-900">
                      <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    </div>
                    
                    {/* Music video/thumbnail container */}
                    <div className="aspect-video bg-black relative">
                      <img 
                        src="/world-mk1/assets/images/music-placeholder.jpg" 
                        alt="Music visualizer" 
                        className="w-full h-full object-cover opacity-80"
                      />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full text-white">
                          <FaPlay size={24} />
                        </button>
                        
                        {/* Theatre mode button */}
                        <button className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
                          <FaTv size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Music playlist */}
                    <div className="p-3 space-y-2">
                      {music.slice(0, 3).map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 p-2 rounded bg-slate-800/50 hover:bg-slate-800 cursor-pointer"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-slate-700 rounded overflow-hidden">
                            <img 
                              src={item.imageUrl || "/world-mk1/assets/images/music-placeholder.jpg"} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <h3 className="text-white text-sm font-medium truncate">{item.title}</h3>
                            <p className="text-slate-400 text-xs truncate">{item.creator}</p>
                          </div>
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 text-slate-400 hover:text-white"
                          >
                            <FaPlay size={12} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Inspirational Quotes - Full width */}
              <div className="lg:col-span-12 my-6">
                <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-800 rounded-lg shadow-lg p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <FaQuoteLeft className="text-white/60 text-3xl" />
                  </div>
                  <blockquote className="text-white text-xl md:text-2xl font-heading italic mb-4">
                    "The future belongs to those who believe in the beauty of their dreams."
                  </blockquote>
                  <cite className="text-white/80 text-sm md:text-base font-medium">— Eleanor Roosevelt</cite>
                  
                  <div className="mt-6 flex justify-center gap-4">
                    <button className="text-white/70 hover:text-white transition-colors">
                      <FaArrowLeft size={18} />
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors">
                      New Quote
                    </button>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <FaArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Gaming Corner and World Building - Bottom sections */}
              <div className="lg:col-span-6 bg-slate-800 p-5 rounded-lg shadow-lg border-2 border-slate-700">
                <div className="flex items-center mb-4">
                  <FaGamepad className="text-slate-300 mr-2" />
                  <h2 className="text-xl font-heading text-slate-300">Gaming Corner</h2>
                </div>
                
                {/* Gaming setup display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Featured game */}
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="aspect-video relative">
                      <img 
                        src="/world-mk1/assets/images/gaming-setup.jpg" 
                        alt="Gaming Setup" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-medium text-lg">Current Setup</h3>
                        <p className="text-white/70 text-sm">Optimized for immersive worlds</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Game collection */}
                  <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                    <h3 className="text-white text-base font-medium mb-2">Current Games</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        No Man's Sky
                      </li>
                      <li className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        The Witcher 3
                      </li>
                      <li className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Cyberpunk 2077
                      </li>
                      <li className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Elden Ring
                      </li>
                      <li className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Hollow Knight
                      </li>
                    </ul>
                    
                    <div className="mt-3 pt-2 border-t border-slate-700">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Legend:</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Playing</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>On hold</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span>Next</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* World Building Workshop */}
              <div className="lg:col-span-6 bg-slate-200/60 backdrop-blur-sm p-5 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <GiWorld className="text-slate-700 mr-2" />
                  <h2 className="text-xl font-heading text-slate-700">World Building Workshop</h2>
                </div>
                
                {/* World projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Project 1 */}
                  <div className="bg-white/70 rounded-lg overflow-hidden shadow-md border border-slate-300">
                    <div className="aspect-video relative">
                      <img 
                        src="/world-mk1/assets/images/world-1.jpg" 
                        alt="Fantasy World" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Three.js
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-slate-900">Fantasy Realm</h3>
                      <p className="text-xs text-slate-600 mt-1">Interactive medieval world with dynamic lighting</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-slate-500">In progress</span>
                        <button className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2 py-1 rounded">
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project 2 */}
                  <div className="bg-white/70 rounded-lg overflow-hidden shadow-md border border-slate-300">
                    <div className="aspect-video relative">
                      <img 
                        src="/world-mk1/assets/images/world-2.jpg" 
                        alt="Space Station" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        Babylon.js
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-slate-900">Space Station Alpha</h3>
                      <p className="text-xs text-slate-600 mt-1">Orbital habitat with physics simulation</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-slate-500">Planning</span>
                        <button className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2 py-1 rounded">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project 3 */}
                  <div className="bg-white/70 rounded-lg overflow-hidden shadow-md border border-slate-300">
                    <div className="aspect-video relative">
                      <img 
                        src="/world-mk1/assets/images/world-3.jpg" 
                        alt="Underwater World" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        A-Frame
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-slate-900">Oceanic Depths</h3>
                      <p className="text-xs text-slate-600 mt-1">Underwater ecosystem with procedural generation</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-slate-500">Concept</span>
                        <button className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2 py-1 rounded">
                          Idea Board
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3D Showcase Overlay */}
      {showGlobeDisplay && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-8">
          <div className="w-full h-full max-w-4xl max-h-[80vh] bg-black rounded-lg overflow-hidden relative">
            {/* Placeholder for Three.js content - will be replaced with actual Three.js implementation */}
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center p-4 md:p-8">
                <h2 className="text-2xl md:text-3xl font-heading mb-4">3D Showcase Coming Soon</h2>
                <p className="max-w-md mx-auto mb-6 text-sm md:text-base">This space will feature interactive 3D exhibits of world building projects and experiments.</p>
                <button 
                  onClick={toggleGlobeDisplay}
                  className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm md:text-base"
                >
                  Close Preview
                </button>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={toggleGlobeDisplay}
              className="absolute top-2 right-2 md:top-4 md:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Close showcase"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Art Gallery Modal */}
      {fullscreenArt && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="w-full h-full flex flex-col">
            {/* Top navigation bar */}
            <div className="h-16 bg-black/80 flex items-center justify-between px-4 sm:px-6">
              <div className="flex items-center">
                <h3 className="text-white font-heading text-lg md:text-xl">
                  {artworks[selectedArtwork].title}
                </h3>
                <span className="mx-2 text-white/50">|</span>
                <p className="text-white/80 text-sm md:text-base">{artworks[selectedArtwork].creator} • {artworks[selectedArtwork].year}</p>
                <span className="ml-4 text-white/70 text-sm border border-white/20 px-2 py-0.5 rounded">
                  {selectedArtwork + 1} / {artworks.length}
                </span>
              </div>
              <button 
                onClick={() => setFullscreenArt(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                aria-label="Close fullscreen gallery"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            {/* Main artwork display */}
            <div className="flex-grow relative flex items-center justify-center p-4">
              {/* Left arrow */}
              <button 
                onClick={prevArtwork}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10"
                aria-label="Previous artwork"
              >
                <FaChevronLeft size={24} />
              </button>
              
              {/* Art image */}
              <div className="relative max-h-full max-w-full">
                <img 
                  src={artworks[selectedArtwork].imageUrl} 
                  alt={artworks[selectedArtwork].title}
                  className="max-h-[calc(100vh-180px)] max-w-full object-contain rounded shadow-2xl"
                />
              </div>
              
              {/* Right arrow */}
              <button 
                onClick={nextArtwork}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10"
                aria-label="Next artwork"
              >
                <FaChevronRight size={24} />
              </button>
            </div>
            
            {/* Bottom thumbnail gallery */}
            <div className="h-24 md:h-32 bg-black/80 p-2 overflow-x-auto">
              <div className="flex items-center h-full gap-2 md:gap-4 px-2">
                {artworks.map((artwork, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedArtwork(index)}
                    className={`h-full aspect-square cursor-pointer rounded-md overflow-hidden transition-all ${selectedArtwork === index ? 'ring-4 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Artwork description - optional */}
            <div className="absolute bottom-32 md:bottom-40 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 transform transition-transform duration-300 hover:opacity-100 opacity-80">
              <p className="text-white/90 text-sm md:text-base max-w-4xl mx-auto">
                {artworks[selectedArtwork].description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2 max-w-4xl mx-auto">
                {artworks[selectedArtwork].tags?.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="bg-white/10 text-white/90 px-2 py-0.5 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Keyboard shortcuts hint */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="flex items-center gap-4 text-white/60 text-xs">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">←</kbd>
                  <span>Previous</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">→</kbd>
                  <span>Next</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">ESC</kbd>
                  <span>Close</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer - using reusable component */}
      <PageFooter />
    </div>
  );
};

export default Loft; 