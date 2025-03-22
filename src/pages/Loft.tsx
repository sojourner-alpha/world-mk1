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
  const [activeMusic, setActiveMusic] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<'center' | 'left' | 'right'>('center');
  
  // Use shared animations
  useAnimations();

  // Background image
  const loftImage = "/world-mk1/assets/images/loft.png";

  // Core brand colors for books - greyscale palette
  const bookColors = [
    'bg-slate-900', // near black
    'bg-slate-800', // very dark grey
    'bg-slate-700', // dark grey
    'bg-slate-600', // medium-dark grey
    'bg-slate-500', // medium grey
    'bg-slate-400', // medium-light grey
    'bg-slate-300', // light grey
    'bg-slate-200', // very light grey
    'bg-white',     // white
    'bg-gray-900',  // alternate dark
    'bg-gray-800',  // alternate medium-dark
    'bg-gray-700'   // alternate medium
  ];

  // Media content by category
  const books: Media[] = [
    {
      title: "Nexus",
      creator: "Yuval Noah Harari",
      year: "2023",
      description: "An exploration of how technological innovations are reshaping society, connecting humanity, and changing the future of our species.",
      tags: ["Technology", "Society", "Future"],
      link: "https://www.audible.com/pd/Nexus-Audiobook/B0CT49S3V8",
      color: bookColors[0]
    },
    {
      title: "On Writing",
      creator: "Stephen King",
      year: "2000",
      description: "Part memoir, part master class by one of the bestselling authors of all time, offering practical advice on the craft of writing and insights into King's own career.",
      tags: ["Writing", "Memoir", "Creativity"],
      link: "https://www.audible.com/pd/On-Writing-Audiobook/B002V1A0WE",
      color: bookColors[1]
    },
    {
      title: "Poor Charlie's Almanack",
      creator: "Charles Munger",
      year: "2005",
      description: "A collection of speeches and talks from Charlie Munger, offering wisdom on decision making, investing, and the pursuit of a successful life.",
      tags: ["Finance", "Wisdom", "Mental Models"],
      link: "https://www.audible.com/pd/Poor-Charlies-Almanack-Audiobook/B0CMDCLDTP",
      color: bookColors[2]
    },
    {
      title: "Sam Altman's Principles",
      creator: "Sam Altman",
      year: "2018",
      description: "A guide to productivity and effective work habits from the CEO of OpenAI, offering insights into how to approach complex problems and achieve success.",
      tags: ["Productivity", "Leadership", "Tech"],
      link: "https://blog.samaltman.com/productivity",
      color: bookColors[3]
    },
    {
      title: "The Book of Five Rings",
      creator: "Miyamoto Musashi",
      year: "1645",
      description: "A classic text on martial arts, strategy, and philosophy written by the legendary Japanese swordsman, offering timeless wisdom applicable to modern challenges.",
      tags: ["Strategy", "Philosophy", "Martial Arts"],
      link: "https://www.audible.com/pd/A-Book-of-Five-Rings-Audiobook/B004I76HQC",
      color: bookColors[4]
    },
    {
      title: "The Coddling of the American Mind",
      creator: "Greg Lukianoff & Jonathan Haidt",
      year: "2018",
      description: "An analysis of the three 'Great Untruths' that have spread through society and are harming the development of young adults and undermining educational institutions.",
      tags: ["Psychology", "Society", "Education"],
      link: "https://www.audible.com/pd/The-Coddling-of-the-American-Mind-Audiobook/B079P6VFH1",
      color: bookColors[5]
    },
    {
      title: "The Coming Wave",
      creator: "Mustafa Suleyman & Michael Bhaskar",
      year: "2023",
      description: "An examination of how AI and synthetic biology will transform our world, presenting both the opportunities and dangers these technologies might bring.",
      tags: ["AI", "Technology", "Future"],
      link: "https://www.audible.com/pd/The-Coming-Wave-Audiobook/B0BVSJKM4Z",
      color: bookColors[6]
    },
    {
      title: "The Daily Stoic",
      creator: "Ryan Holiday",
      year: "2016",
      description: "A collection of 366 meditations on wisdom, perseverance, and the art of living, drawing on the ancient philosophy of Stoicism and its enduring relevance today.",
      tags: ["Philosophy", "Self-Improvement", "Stoicism"],
      link: "https://www.audible.com/pd/The-Daily-Stoic-Audiobook/B01M4IDLAG",
      color: bookColors[7]
    },
    {
      title: "The Great Degeneration",
      creator: "Niall Ferguson",
      year: "2013",
      description: "A historical examination of institutional decay in Western societies, exploring how economic, political, and social systems are showing signs of decline.",
      tags: ["History", "Economics", "Politics"],
      link: "https://www.audible.com/pd/The-Great-Degeneration-Audiobook/B00CS395BM",
      color: bookColors[0]
    },
    {
      title: "The Intelligent Investor",
      creator: "Benjamin Graham",
      year: "1949",
      description: "The definitive book on value investing, offering timeless strategies for financial success through rational investment approaches rather than speculative behavior.",
      tags: ["Finance", "Investing", "Economics"],
      link: "https://www.audible.com/pd/The-Intelligent-Investor-Rev-Ed-Audiobook/B00V95QQXA",
      color: bookColors[1]
    },
    {
      title: "The Nature of Technology",
      creator: "Brian Arthur",
      year: "2009",
      description: "A profound exploration of how technologies evolve, combining to create new technologies and forming the foundation of economic advancement.",
      tags: ["Technology", "Innovation", "Economics"],
      link: "https://www.audible.com/pd/The-Nature-of-Technology-Audiobook/B002V1JG4C",
      color: bookColors[2]
    },
    {
      title: "1984",
      creator: "George Orwell",
      year: "1949",
      description: "A dystopian novel set in a totalitarian society, examining themes of mass surveillance, repressive regimentation, and the manipulation of truth.",
      tags: ["Dystopian", "Classic", "Political Fiction"],
      link: "https://www.audible.com/pd/1984-Audiobook/B002V19RO6",
      color: bookColors[3]
    },
    {
      title: "Sapiens",
      creator: "Yuval Noah Harari",
      year: "2011",
      description: "A brief history of humankind, exploring how Homo sapiens came to dominate the Earth and how our societies, beliefs, and institutions evolved over time.",
      tags: ["History", "Anthropology", "Evolution"],
      link: "https://www.audible.com/pd/Sapiens-Audiobook/B0741G911Q",
      color: bookColors[4]
    },
    {
      title: "Thinking, Fast and Slow",
      creator: "Daniel Kahneman",
      year: "2011",
      description: "An exploration of the two systems that drive the way we think—System 1 (fast, intuitive) and System 2 (slow, deliberate)—revealing the biases that affect our everyday decisions.",
      tags: ["Psychology", "Decision Making", "Cognitive Science"],
      link: "https://www.audible.com/pd/Thinking-Fast-and-Slow-Audiobook/B005TKKCWC",
      color: bookColors[5]
    },
    {
      title: "Zero to One",
      creator: "Peter Thiel",
      year: "2014",
      description: "Notes on startups and how to build the future, challenging conventional wisdom about innovation and encouraging entrepreneurs to create truly new things.",
      tags: ["Business", "Startups", "Innovation"],
      link: "https://www.audible.com/pd/Zero-to-One-Audiobook/B00M27LBU2",
      color: bookColors[6]
    },
    {
      title: "Dune",
      creator: "Frank Herbert",
      year: "1965",
      description: "A science fiction epic set in a distant future where noble houses control planetary fiefs, following the story of young Paul Atreides as he navigates political intrigue on the desert planet Arrakis.",
      tags: ["Science Fiction", "Space Opera", "Political"],
      link: "https://www.audible.com/pd/Dune-Audiobook/B002V1OF70",
      color: bookColors[7]
    },
    {
      title: "Brave New World",
      creator: "Aldous Huxley",
      year: "1932",
      description: "A dystopian novel depicting a genetically engineered future society where stability is prioritized over freedom, creativity, and human emotion.",
      tags: ["Dystopian", "Classic", "Science Fiction"],
      link: "https://www.audible.com/pd/Brave-New-World-Audiobook/B002V8L6X8",
      color: bookColors[0]
    },
    {
      title: "Deep Work",
      creator: "Cal Newport",
      year: "2016",
      description: "Rules for focused success in a distracted world, arguing that deep concentration is becoming increasingly rare and valuable in our economy.",
      tags: ["Productivity", "Focus", "Personal Development"],
      link: "https://www.audible.com/pd/Deep-Work-Audiobook/B0189PX1RQ",
      color: bookColors[1]
    },
    {
      title: "48 Laws of Power",
      creator: "Robert Greene",
      year: "1998",
      description: "A comprehensive guide to the art of power, distilling 3,000 years of history into 48 essential laws that reveal the dynamics of control, influence, and defense against manipulation.",
      tags: ["Psychology", "Strategy", "History"],
      link: "https://www.audible.com/pd/The-48-Laws-of-Power-Audiobook/B00WSZG4EM",
      color: bookColors[2]
    },
    {
      title: "Meditations",
      creator: "Marcus Aurelius",
      year: "180 AD",
      description: "Personal writings of the Roman Emperor Marcus Aurelius, recording his private notes to himself and ideas on Stoic philosophy, with profound insights on virtue, duty, and resilience.",
      tags: ["Philosophy", "Stoicism", "Personal Development"],
      link: "https://www.audible.com/pd/Meditations-Audiobook/B004IBRMZS",
      color: bookColors[3]
    },
    {
      title: "Security Analysis",
      creator: "Benjamin Graham & David Dodd",
      year: "1934",
      description: "The foundational text of value investing, providing a framework for analyzing securities and identifying undervalued investments, written in the aftermath of the 1929 stock market crash.",
      tags: ["Finance", "Investing", "Economics"],
      link: "https://www.audible.com/pd/Security-Analysis-Sixth-Edition-Audiobook/B002V0GVIK",
      color: bookColors[4]
    }
  ];

  const podcasts: Media[] = [
    {
      title: "Lex Fridman - Narendra Modi",
      creator: "Lex Fridman Podcast",
      description: "Conversation with Narendra Modi, Prime Minister of India, discussing leadership, technology, and the future of India.",
      tags: ["Leadership", "Politics", "India"],
      link: "https://open.spotify.com/episode/40sptZNuCXjhzPYTG6K2rh?si=d64a669bb7ea4f91",
      imageUrl: "/world-mk1/assets/images/podcast-placeholder.jpg"
    },
    {
      title: "Lex Fridman - Deepseek",
      creator: "Lex Fridman Podcast",
      description: "Discussion about Deepseek, artificial intelligence, and innovations in deep learning technology.",
      tags: ["AI", "Technology", "Deep Learning"],
      link: "https://open.spotify.com/episode/5JKVOvxQ0c9xJmVK3O1asA?si=c3194131223a44cf",
      imageUrl: "/world-mk1/assets/images/podcast-placeholder.jpg"
    },
    {
      title: "Lex Fridman - Marc Andreessen",
      creator: "Lex Fridman Podcast",
      description: "Interview with Marc Andreessen, co-founder of Andreessen Horowitz, discussing venture capital, startups, and the future of technology.",
      tags: ["Venture Capital", "Technology", "Startups"],
      link: "https://open.spotify.com/episode/5iXQAfEnrO3kWtg4WzYXUD?si=445aa20832f64b21",
      imageUrl: "/world-mk1/assets/images/podcast-placeholder.jpg"
    },
    {
      title: "Lex Fridman - Guido van Rossum",
      creator: "Lex Fridman Podcast",
      description: "Conversation with Guido van Rossum, creator of Python, discussing programming languages and software development.",
      tags: ["Programming", "Python", "Software"],
      link: "https://open.spotify.com/episode/69V7CtdbB8blcxNPXvpnmk?si=a26f4aa0b01346b8",
      imageUrl: "/world-mk1/assets/images/podcast-placeholder.jpg"
    },
    {
      title: "Lex Fridman - Demis Hassabis",
      creator: "Lex Fridman Podcast",
      description: "Interview with Demis Hassabis, CEO of DeepMind, discussing artificial intelligence and the quest to solve intelligence.",
      tags: ["AI", "DeepMind", "Research"],
      link: "https://open.spotify.com/episode/3KqezvIUnBKhBnkRVYgBNW?si=a6881ccb6b514e09",
      imageUrl: "/world-mk1/assets/images/podcast-placeholder.jpg"
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
      title: "DJ DAH ISHI - INCredible Coffee",
      creator: "Live Set",
      imageUrl: "https://i.ytimg.com/vi/V94h0x34zqA/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=V94h0x34zqA&t=1s"
    },
    {
      title: "Fred again.. - Rooftop Live",
      creator: "Boiler Room",
      imageUrl: "https://i.ytimg.com/vi/6MAzUT1YhWE/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=6MAzUT1YhWE"
    },
    {
      title: "Chill Out Beat Live Mix",
      creator: "ChillStream",
      imageUrl: "https://i.ytimg.com/vi/8yFdtwoLgJA/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=8yFdtwoLgJA"
    }
  ];

  // Helper function to extract YouTube video ID
  const getYoutubeId = (url: string): string => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
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
                  <div className="flex items-center gap-2">
                    <p className="text-amber-800 text-sm hidden md:block">Click a book to learn more</p>
                    <div className="text-amber-800/70 flex items-center gap-1 text-xs">
                      <span>•</span>
                      <FaArrowRight className="animate-pulse-slow text-amber-700/70" />
                      <span>Scroll</span>
                    </div>
                  </div>
                </div>
                
                {/* Bookshelf with 3D effect */}
                <div className="bg-amber-800/40 p-5 rounded shadow-inner border border-amber-700/20 relative">
                  {/* Wood grain texture */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                    <div className="h-full w-full bg-gradient-to-b from-amber-100/10 to-amber-900/10 rounded"></div>
                  </div>
                  
                  {/* Books - Horizontal Layout with scroll */}
                  <div className="relative z-10 overflow-x-auto py-2 px-1">
                    {/* Fade gradient for scroll indication */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800/40 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-800/40 to-transparent z-10 pointer-events-none"></div>
                    
                    <div className="flex gap-4 min-w-max pb-2">
                    {books.map((book, index) => (
                      <div 
                        key={index} 
                        className="relative"
                      >
                        {/* Book spine */}
                        <div 
                            className={`${book.color} h-48 md:h-56 w-16 md:w-20 rounded-sm shadow-md flex items-center relative transform transition-all duration-300 ${clickedBook === index ? 'translate-y-2' : ''} hover:brightness-110`}
                            onClick={(e) => {
                              // Check the book's position to determine popup placement
                              const bookRect = e.currentTarget.getBoundingClientRect();
                              const windowWidth = window.innerWidth;
                              const position = bookRect.left < windowWidth * 0.3 ? 'left' : 
                                              bookRect.right > windowWidth * 0.7 ? 'right' : 'center';
                              setPopupPosition(position);
                              setClickedBook(clickedBook === index ? null : index);
                            }}
                          >
                            {/* Vertical book title */}
                            <h3 className={`${book.color === 'bg-white' || book.color === 'bg-slate-200' || book.color === 'bg-slate-300' || book.color === 'bg-slate-400' ? 'text-slate-800' : 'text-white'} font-medium px-2 py-1 text-center absolute inset-0 flex items-center justify-center text-sm origin-center -rotate-90 whitespace-nowrap`}>
                            {book.title}
                          </h3>
                        </div>
                        
                        {/* Book details popup */}
                        {clickedBook === index && (
                          <>
                            {/* Overlay that dims the background */}
                            <div 
                              className="fixed inset-0 bg-black/60 z-[9000]" 
                              onClick={() => setClickedBook(null)}
                            ></div>
                            
                            {/* Book details popup */}
                            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 bg-white rounded-lg shadow-2xl p-6 z-[9001] max-h-[80vh] overflow-y-auto">
                              <h4 className="font-heading text-slate-800 text-xl">{book.title}</h4>
                              <p className="text-slate-600">{book.creator} • {book.year}</p>
                              <div className="my-3 h-px bg-slate-200"></div>
                              <p className="text-slate-700 mb-4">{book.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {book.tags?.map((tag, tagIndex) => (
                                  <span key={tagIndex} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              
                              {book.link && (
                                <a 
                                  href={book.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 w-full"
                                >
                                  View on Audible
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </a>
                              )}
                              
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setClickedBook(null);
                                }}
                                className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 text-xl"
                                aria-label="Close book details"
                              >
                                ×
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    </div>
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
                          className={`bg-slate-800 rounded p-3 transition-all ${activePodcast === index ? 'ring-2 ring-blue-500' : 'hover:bg-slate-700'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-grow">
                              <h3 className="text-white text-sm font-medium line-clamp-1">{podcast.title}</h3>
                              <p className="text-slate-400 text-xs line-clamp-1">{podcast.creator}</p>
                            </div>
                            <button 
                              className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                              onClick={() => setActivePodcast(activePodcast === index ? null : index)}
                            >
                              {activePodcast === index ? <FaPause size={12} /> : <FaPlay size={12} />}
                            </button>
                          </div>
                          
                          {/* Embedded Spotify player */}
                          {activePodcast === index && podcast.link && (
                            <div className="mt-3 pt-3 border-t border-slate-700">
                              <iframe 
                                src={podcast.link.replace('episode/', 'embed/episode/')} 
                                width="100%" 
                                height="152" 
                                frameBorder="0" 
                                allow="encrypted-media"
                                title={podcast.title}
                                className="rounded"
                              ></iframe>
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
                      {activeMusic !== null ? (
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${getYoutubeId(music[activeMusic].link)}`}
                          title={music[activeMusic].title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0"
                        ></iframe>
                      ) : (
                        <>
                          <img 
                            src="/world-mk1/assets/images/music-placeholder.jpg" 
                            alt="Music visualizer" 
                            className="w-full h-full object-cover opacity-80"
                          />
                          
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button 
                              className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full text-white"
                              onClick={() => setActiveMusic(1)}
                            >
                              <FaPlay size={24} />
                            </button>
                            
                            {/* Theatre mode button */}
                            <button className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
                              <FaTv size={14} />
                            </button>
                          </div>
                        </>
                      )}
                  </div>
                  
                    {/* Close button for active video */}
                    {activeMusic !== null && (
                      <button
                        onClick={() => setActiveMusic(null)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                        aria-label="Close video"
                      >
                        &times;
                      </button>
                    )}
                    
                    {/* Music playlist */}
                    <div className="p-3 space-y-2">
                      {music.map((item, index) => (
                      <div 
                        key={index} 
                          className={`flex items-center gap-2 p-2 rounded ${activeMusic === index ? 'bg-slate-800 ring-1 ring-blue-500' : 'bg-slate-800/50 hover:bg-slate-800'} cursor-pointer`}
                          onClick={() => setActiveMusic(index)}
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
                          <button 
                            className="p-2 text-slate-400 hover:text-white"
                          >
                            {activeMusic === index ? <FaPause size={12} /> : <FaPlay size={12} />}
                          </button>
                        </div>
                      ))}
                                </div>
                              </div>
                              </div>
                            </div>
              
              {/* Inspirational Quotes - Full width */}
              <div className="lg:col-span-12 my-4">
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg shadow-md p-6 text-center">
                  <blockquote className="text-white text-xl md:text-2xl font-heading italic mb-3">
                    "The future belongs to those who believe in the beauty of their dreams."
                  </blockquote>
                  <cite className="text-white/90 block">— Eleanor Roosevelt</cite>
                  
                  <div className="mt-4 flex justify-center items-center gap-3">
                    <button className="text-white/70 hover:text-white transition-colors p-2" aria-label="Previous quote">
                      <FaChevronLeft size={16} />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-md text-sm transition-colors">
                      New Quote
                    </button>
                    <button className="text-white/70 hover:text-white transition-colors p-2" aria-label="Next quote">
                      <FaChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Gaming Corner and World Building - Bottom sections */}
              <div className="lg:col-span-6">
                <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center">
                      <FaGamepad className="text-slate-300 mr-2" />
                      <h2 className="text-lg font-heading text-slate-300">Gaming Corner</h2>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row">
                    {/* Gaming Setup Image */}
                    <div className="sm:w-1/2 relative">
                      <img 
                        src="/world-mk1/assets/images/gaming-setup.jpg" 
                        alt="Gaming Setup" 
                        className="w-full h-full object-cover"
                        style={{maxHeight: "220px"}}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <h3 className="text-white font-medium">Current Setup</h3>
                        <p className="text-white/70 text-xs">Optimized for immersive worlds</p>
                      </div>
                    </div>
                    
                    {/* Game list */}
                    <div className="sm:w-1/2 p-4 bg-slate-900">
                      <h3 className="text-white text-sm font-medium mb-3">Current Games</h3>
                      <ul className="space-y-1.5 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-slate-300">Sea of Thieves</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-slate-300">FTL: Faster Than Light</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span className="text-slate-300">Dune Awakening</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span className="text-slate-300">Subnautica</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span className="text-slate-300">Valheim</span>
                        </li>
                      </ul>
                      
                      <div className="mt-3 pt-2 border-t border-slate-700">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Legend:</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                              <span>Playing</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                              <span>Completed</span>
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
              </div>
              
              {/* World Building Workshop */}
              <div className="lg:col-span-6">
                <div className="bg-slate-100 rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center">
                      <GiWorld className="text-slate-700 mr-2" />
                      <h2 className="text-lg font-heading text-slate-700">World Building Workshop</h2>
                    </div>
                  </div>
                  
                  {/* World projects grid */}
                  <div className="p-4 grid grid-cols-3 gap-3">
                    {/* Project 1 */}
                    <div className="rounded-lg overflow-hidden shadow-sm bg-white border border-slate-200">
                      <div className="relative">
                        <img 
                          src="/world-mk1/assets/images/world-1.jpg" 
                          alt="Fantasy World" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded text-center">
                          Three.js
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-slate-900 text-sm">Fantasy Realm</h3>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">Interactive medieval world</p>
                        <div className="mt-1.5 flex justify-between items-center">
                          <span className="text-xs text-slate-500">In progress</span>
                          <a href="#" className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2 py-0.5 rounded">
                            Explore
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project 2 */}
                    <div className="rounded-lg overflow-hidden shadow-sm bg-white border border-slate-200">
                      <div className="relative">
                        <img 
                          src="/world-mk1/assets/images/world-2.jpg" 
                          alt="Space Station" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute top-1 right-1 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded text-center">
                          Babylon.js
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-slate-900 text-sm">Space Station Alpha</h3>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">Orbital habitat simulation</p>
                        <div className="mt-1.5 flex justify-between items-center">
                          <span className="text-xs text-slate-500">Planning</span>
                          <a href="#" className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2 py-0.5 rounded">
                            Preview
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project 3 */}
                    <div className="rounded-lg overflow-hidden shadow-sm bg-white border border-slate-200">
                      <div className="relative">
                        <img 
                          src="/world-mk1/assets/images/world-3.jpg" 
                          alt="Underwater World" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded text-center">
                          A-Frame
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-slate-900 text-sm">Oceanic Depths</h3>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">Underwater ecosystem</p>
                        <div className="mt-1.5 flex justify-between items-center">
                          <span className="text-xs text-slate-500">Concept</span>
                          <a href="#" className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-2 py-0.5 rounded">
                            Idea Board
                          </a>
                        </div>
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