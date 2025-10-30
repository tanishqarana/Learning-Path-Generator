import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const studentProfile = {
    name: "John Doe",
    target_score: 160,
    available_time_week: 360, // 6 hours in minutes
    preferred_difficulty_pace: "medium",
    learning_style: "visual",
    knowledge_map: {
      "Arithmetic": 90,
      "Algebra": 60,
      "Geometry": 30,
      "Statistics": 50,
      "Probability": 40,
      "Word Problems": 70
    },
    performance: {
      avg_completion_rate: 85,
      strong_areas: ["Arithmetic", "Algebra"],
      weak_areas: ["Geometry", "Probability"],
      total_study_time: 1980, // 33 hours in minutes
      modules_completed: 8,
      current_streak: 7
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h` : `${minutes}m`;
  };

  const getProficiencyColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                👤 Student Profile
              </h1>
              <p className="text-gray-600">
                Manage your learning preferences and track your progress
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {isEditing ? 'Save Changes' : 'Edit Preferences'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Knowledge Map */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              📊 Knowledge Map
            </h2>
            
            <div className="space-y-4">
              {Object.entries(studentProfile.knowledge_map).map(([subject, score]) => (
                <div key={subject}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{subject}</span>
                    <span className={`font-semibold ${getProficiencyColor(score)}`}>
                      {score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        score >= 80 ? 'bg-green-500' :
                        score >= 60 ? 'bg-yellow-500' :
                        score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              ⚙️ Preferences
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weekly Study Time
                </label>
                {isEditing ? (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="180">Casual (2-3 hours)</option>
                    <option value="360" selected>Standard (4-6 hours)</option>
                    <option value="600">Intensive (7-10 hours)</option>
                    <option value="720">Immersive (10+ hours)</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    {formatTime(studentProfile.available_time_week)} per week
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Pace
                </label>
                {isEditing ? (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="slow">Slow & Steady</option>
                    <option value="medium" selected>Medium Pace</option>
                    <option value="fast">Fast Pace</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    {studentProfile.preferred_difficulty_pace === 'slow' && 'Slow & Steady'}
                    {studentProfile.preferred_difficulty_pace === 'medium' && 'Medium Pace'}
                    {studentProfile.preferred_difficulty_pace === 'fast' && 'Fast Pace'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Style
                </label>
                {isEditing ? (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="visual" selected>Visual</option>
                    <option value="reading_writing">Reading/Writing</option>
                    <option value="balanced">Balanced</option>
                    <option value="kinesthetic">Kinesthetic</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    {studentProfile.learning_style === 'visual' && 'Visual'}
                    {studentProfile.learning_style === 'reading_writing' && 'Reading/Writing'}
                    {studentProfile.learning_style === 'balanced' && 'Balanced'}
                    {studentProfile.learning_style === 'kinesthetic' && 'Kinesthetic'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Performance Analytics */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              📈 Performance Analytics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {studentProfile.performance.avg_completion_rate}%
                </div>
                <div className="text-sm text-blue-800">Avg. Completion Rate</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {studentProfile.performance.modules_completed}
                </div>
                <div className="text-sm text-green-800">Modules Completed</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">
                  {formatTime(studentProfile.performance.total_study_time)}
                </div>
                <div className="text-sm text-purple-800">Total Study Time</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  {studentProfile.performance.current_streak} days
                </div>
                <div className="text-sm text-orange-800">Current Streak</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🎯 Strong Areas</h3>
                <div className="space-y-2">
                  {studentProfile.performance.strong_areas.map((area) => (
                    <div key={area} className="flex items-center space-x-2 text-green-700">
                      <span>✓</span>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📚 Areas Needing Improvement</h3>
                <div className="space-y-2">
                  {studentProfile.performance.weak_areas.map((area) => (
                    <div key={area} className="flex items-center space-x-2 text-red-700">
                      <span>⚠️</span>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Retake Assessment
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Download Progress Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;