import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            🎓 Personalized Learning Path Generator
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered adaptive learning paths tailored to your goals, pace, and learning style.
            Master GRE Quantitative with a personalized roadmap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600 text-sm">Adaptive paths based on your assessment</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Adaptive to Your Pace</h3>
              <p className="text-gray-600 text-sm">Learn at your own comfortable speed</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">Monitor your improvement over time</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/onboarding')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Get Started
            </button>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;