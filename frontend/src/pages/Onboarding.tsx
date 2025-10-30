import React from 'react';

const Onboarding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              👤 Student Profile Setup
            </h1>
            <p className="text-gray-600">
              Tell us about your goals and preferences to create your personalized learning path
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target GRE Quantitative Score
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">130</span>
                <input
                  type="range"
                  min="130"
                  max="170"
                  defaultValue="160"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500">170</span>
                <span className="font-semibold text-blue-600">160</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⏰ Weekly Study Time</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '2-3 hours', value: 'casual' },
                  { label: '4-6 hours', value: 'standard' },
                  { label: '7-10 hours', value: 'intensive' },
                  { label: '10+ hours', value: 'immersive' }
                ].map((option) => (
                  <button
                    key={option.value}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Learning Pace</h3>
              <div className="space-y-3">
                {[
                  { label: 'Slow & Steady', desc: 'Master each concept thoroughly' },
                  { label: 'Medium Pace', desc: 'Balanced approach' },
                  { label: 'Fast Pace', desc: 'Cover more material quickly' }
                ].map((option) => (
                  <label key={option.label} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="pace" className="mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 Learning Style</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Visual', desc: 'Diagrams, charts' },
                  { label: 'Reading/Writing', desc: 'Text, examples' },
                  { label: 'Balanced', desc: 'Mix of approaches' },
                  { label: 'Kinesthetic', desc: 'Hands-on practice' }
                ].map((option) => (
                  <button
                    key={option.label}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
                  >
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
              Continue to Knowledge Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;