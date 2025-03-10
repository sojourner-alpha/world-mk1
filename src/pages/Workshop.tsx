import { Link } from 'react-router-dom';

const Workshop = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link to="/" className="text-secondary hover:text-accent">← Back to Nexus</Link>
        </nav>
        
        <h1 className="text-4xl font-heading mb-6">Workshop</h1>
        <p className="text-lg mb-8">A high-tech workshop or a sleek cybernetic lab for your professional profile.</p>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-heading mb-4">Professional Portfolio & Skills</h2>
          <p className="mb-4">
            This is a placeholder for your professional portfolio. Here, you'll showcase your career achievements, 
            skills, and professional projects. Think of it as your high-tech lab where your technical expertise shines.
          </p>
          <p>
            Future features might include case studies of past work, interactive demos of projects, 
            and a "project builder" where visitors can see how you've applied different skills in real projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Workshop; 