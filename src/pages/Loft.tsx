import { Link } from 'react-router-dom';

const Loft = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link to="/" className="text-secondary hover:text-accent">← Back to Nexus</Link>
        </nav>
        
        <h1 className="text-4xl font-heading mb-6">Loft</h1>
        <p className="text-lg mb-8">A vibrant, eclectic studio—an artist's loft or a lush garden of ideas.</p>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-heading mb-4">Hobbies & Creative Pursuits</h2>
          <p className="mb-4">
            This is a placeholder for showcasing your passions and side projects. Here, you'll highlight your 
            creative pursuits outside of work—whether it's music, writing, art, or any other form of expression.
          </p>
          <p>
            Future features might include a gallery of creative works, embedded media like music or videos, 
            and perhaps a collaborative canvas where visitors can leave their mark.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loft; 