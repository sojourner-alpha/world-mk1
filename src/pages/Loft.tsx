import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaFilm, FaGamepad, FaMusic, FaQuoteLeft } from 'react-icons/fa';

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
}

interface Quote {
  text: string;
  author: string;
  source?: string;
  year?: string;
}

const Loft = () => {
  const [activeTab, setActiveTab] = useState('books');
  
  // Use shared animations
  useAnimations();

  // Loft image from App.tsx
  const loftImage = "/world-mk1/assets/images/loft.png";

  // Media content by category
  const media: Record<string, Media[]> = {
    books: [
      {
        title: "Dune",
        creator: "Frank Herbert",
        year: "1965",
        description: "A masterpiece of worldbuilding that explores ecology, politics, religion, and human evolution in a far-future interstellar society.",
        tags: ["Science Fiction", "Epic", "Politics"],
        link: "https://en.wikipedia.org/wiki/Dune_(novel)"
      },
      {
        title: "Thinking, Fast and Slow",
        creator: "Daniel Kahneman",
        year: "2011",
        description: "An exploration of the two systems that drive the way we think—System 1 (fast, intuitive) and System 2 (slow, deliberate)—revealing cognitive biases that affect our judgment.",
        tags: ["Psychology", "Behavioral Economics", "Decision Making"],
        link: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow"
      },
      {
        title: "Snow Crash",
        creator: "Neal Stephenson",
        year: "1992",
        description: "A science fiction novel that explores virtual reality, linguistics, religion, and memetics in a cyberpunk future.",
        tags: ["Science Fiction", "Cyberpunk", "Virtual Reality"],
        link: "https://en.wikipedia.org/wiki/Snow_Crash"
      }
    ],
    films: [
      {
        title: "Blade Runner 2049",
        creator: "Denis Villeneuve",
        year: "2017",
        description: "A visually stunning sequel that explores what it means to be human in a world of artificial beings.",
        tags: ["Science Fiction", "Cyberpunk", "Neo-noir"],
        link: "https://en.wikipedia.org/wiki/Blade_Runner_2049"
      },
      {
        title: "Arrival",
        creator: "Denis Villeneuve",
        year: "2016",
        description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
        tags: ["Science Fiction", "Drama", "Linguistics"],
        link: "https://en.wikipedia.org/wiki/Arrival_(film)"
      },
      {
        title: "The Tree of Life",
        creator: "Terrence Malick",
        year: "2011",
        description: "An impressionistic story of a Texas family in the 1950s, intercut with a narrative thread involving the beginning of the universe and the origin of life on Earth.",
        tags: ["Drama", "Experimental", "Philosophical"],
        link: "https://en.wikipedia.org/wiki/The_Tree_of_Life_(film)"
      }
    ],
    games: [
      {
        title: "Disco Elysium",
        creator: "ZA/UM",
        year: "2019",
        description: "A groundbreaking RPG that focuses on narrative and dialogue, featuring an amnesiac detective solving a murder in a politically charged city.",
        tags: ["RPG", "Mystery", "Political"],
        link: "https://en.wikipedia.org/wiki/Disco_Elysium"
      },
      {
        title: "Outer Wilds",
        creator: "Mobius Digital",
        year: "2019",
        description: "An open world mystery about a solar system trapped in a 22-minute time loop, ending with the sun going supernova.",
        tags: ["Exploration", "Puzzle", "Space"],
        link: "https://en.wikipedia.org/wiki/Outer_Wilds"
      },
      {
        title: "The Legend of Zelda: Breath of the Wild",
        creator: "Nintendo",
        year: "2017",
        description: "A pioneering open-world adventure that emphasizes exploration and experimentation in a vast, interactive world.",
        tags: ["Adventure", "Open World", "Puzzle"],
        link: "https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild"
      }
    ],
    music: [
      {
        title: "To Pimp a Butterfly",
        creator: "Kendrick Lamar",
        year: "2015",
        description: "A groundbreaking hip-hop album that combines jazz, funk, and spoken word to explore themes of Black identity, racism, and self-empowerment.",
        tags: ["Hip-hop", "Jazz", "Social Commentary"],
        link: "https://en.wikipedia.org/wiki/To_Pimp_a_Butterfly"
      },
      {
        title: "Kid A",
        creator: "Radiohead",
        year: "2000",
        description: "An experimental rock album that blends electronic music, jazz, and classical influences to create a soundscape that feels both futuristic and timeless.",
        tags: ["Alternative Rock", "Experimental", "Electronic"],
        link: "https://en.wikipedia.org/wiki/Kid_A"
      },
      {
        title: "Vespertine",
        creator: "Björk",
        year: "2001",
        description: "An intimate, introspective album that constructs delicate electronic soundscapes from microbeats, choirs, harps, and music boxes.",
        tags: ["Electronic", "Experimental", "Ambient"],
        link: "https://en.wikipedia.org/wiki/Vespertine"
      }
    ]
  };

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

  // Get current media based on active tab
  const currentMedia = media[activeTab as keyof typeof media] || [];

  // Get icon for current media type
  const getMediaIcon = () => {
    switch(activeTab) {
      case 'books': return <FaBook className="mr-2" />;
      case 'films': return <FaFilm className="mr-2" />;
      case 'games': return <FaGamepad className="mr-2" />;
      case 'music': return <FaMusic className="mr-2" />;
      default: return <FaBook className="mr-2" />;
    }
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
                <p className="text-xl mb-6">Media, Quotes & Reflections</p>
                <p className="mb-6">A digital library showcasing books, films, games, and music that have shaped my perspective and sparked my imagination. Also includes a collection of favorite quotes that resonate with my worldview.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="scroll-section py-16 mt-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-3xl font-heading text-center text-slate-800">Library</h2>
              <p className="text-slate-800 text-center mb-6">A curated collection of influential works across different media.</p>
              
              {/* Media Tabs */}
              <div className="flex flex-wrap justify-center mb-8 gap-2">
                {Object.keys(media).map((mediaType) => (
                  <button
                    key={mediaType}
                    onClick={() => setActiveTab(mediaType)}
                    className={`px-4 py-2 rounded-full font-medium text-sm ${
                      activeTab === mediaType 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm'
                    } transition-all duration-300`}
                  >
                    {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Media List */}
            <div className="grid gap-8">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-heading flex items-center">
                  {getMediaIcon()}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h3>
              </div>
              
              {currentMedia.length > 0 ? (
                <div className="grid gap-6">
                  {currentMedia.map((item, index) => (
                    <div key={index} className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm fade-in-up">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-heading text-slate-800">{item.title}</h4>
                      </div>
                      
                      <div className="text-sm text-slate-600 mb-2">
                        {item.creator && <span>{item.creator}</span>}
                        {item.creator && item.year && <span> • </span>}
                        {item.year && <span>{item.year}</span>}
                      </div>
                      
                      {/* Divider between title and content */}
                      <div className="h-px bg-slate-300 my-3"></div>
                      
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="bg-slate-600 text-slate-100 px-3 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-slate-700 mb-4">{item.description}</p>
                      
                      {item.link && (
                        <div className="flex justify-end">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                          >
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-600">No items to display.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Quotes Section */}
      <section className="scroll-section py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-heading text-center">Quotes</h2>
              <p className="text-slate-600 text-center">Words that resonate and inspire.</p>
            </div>
            
            <div className="grid gap-8">
              {quotes.map((quote, index) => (
                <div key={index} className="bg-parchment p-6 rounded-lg shadow-sm fade-in-up relative">
                  <FaQuoteLeft className="text-blue-200 absolute top-4 left-4 opacity-30" size={30} />
                  <div className="ml-8">
                    <p className="text-slate-800 mb-4 italic">{quote.text}</p>
                    <div className="flex justify-end">
                      <div className="text-right">
                        <p className="text-slate-800 font-medium">— {quote.author}</p>
                        {(quote.source || quote.year) && (
                          <p className="text-slate-600 text-sm">
                            {quote.source}
                            {quote.source && quote.year && ", "}
                            {quote.year}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - using reusable component */}
      <PageFooter />
    </div>
  );
};

export default Loft; 