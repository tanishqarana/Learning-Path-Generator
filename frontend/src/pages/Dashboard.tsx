import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🎯 Welcome Back, John!
              </h1>
              <p className="text-gray-600 mt-2">
                Target: GRE 160 | Progress: 25%
              </p>
            </div>
            <button 
              onClick={() => navigate('/learning-path')}
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              View Full Learning Path
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Learning Path */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              📚 Current Learning Path
            </h2>
            
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[
                { id: 1, name: 'Arithmetic', time: '30min', difficulty: 2, status: 'current' },
                { id: 2, name: 'Fractions', time: '45min', difficulty: 3, status: 'next' },
                { id: 3, name: 'Algebra', time: '60min', difficulty: 2, status: 'upcoming' }
              ].map((module) => (
                <div key={module.id} className="min-w-[200px] bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-semibold text-gray-800">{module.name}</span>
                    {module.status === 'current' && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{module.time}</div>
                  <div className="text-yellow-500 text-sm">{'⭐'.repeat(module.difficulty)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              📈 Progress Overview
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Concepts Mastered</span>
                <span className="font-semibold">8/55</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Spent</span>
                <span className="font-semibold">5h 30m</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Streak</span>
                <span className="font-semibold text-green-600">7 days 🔥</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">🎯 Recommended Next</h3>
                <p className="text-gray-600">Fractions Practice - Building on arithmetic fundamentals</p>
                <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;