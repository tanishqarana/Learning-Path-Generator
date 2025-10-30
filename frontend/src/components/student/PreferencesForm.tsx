import React, { useState } from 'react';
import { Student } from '../../types/student';

interface PreferencesFormProps {
  student?: Partial<Student>;
  onSubmit?: (preferences: Partial<Student>) => void;
  onCancel?: () => void;
  mode?: 'create' | 'edit';
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({
  student = {},
  onSubmit,
  onCancel,
  mode = 'create'
}) => {
  const [formData, setFormData] = useState({
    name: student.name || '',
    target_score: student.target_score || 160,
    available_time_week: student.available_time_week || 360,
    preferred_difficulty_pace: student.preferred_difficulty_pace || 'medium',
    learning_style: student.learning_style || 'balanced',
    goal: student.goal || 'gre_quantitative'
  });

  const availabilityOptions = [
    { label: 'Casual (2-3 hours)', value: 180, description: 'Perfect for busy schedules' },
    { label: 'Standard (4-6 hours)', value: 360, description: 'Balanced learning pace' },
    { label: 'Intensive (7-10 hours)', value: 600, description: 'Accelerated progress' },
    { label: 'Immersive (10+ hours)', value: 720, description: 'Full-time dedication' }
  ];

  const paceOptions = [
    { 
      value: 'slow', 
      label: 'Slow & Steady', 
      description: 'Master each concept thoroughly before moving on',
      icon: '🐢'
    },
    { 
      value: 'medium', 
      label: 'Medium Pace', 
      description: 'Balanced approach between depth and progress',
      icon: '🚶‍♂️'
    },
    { 
      value: 'fast', 
      label: 'Fast Pace', 
      description: 'Cover more material quickly, review as needed',
      icon: '🚀'
    }
  ];

  const styleOptions = [
    { 
      value: 'visual', 
      label: 'Visual', 
      description: 'Diagrams, charts, videos, spatial understanding',
      icon: '🎨'
    },
    { 
      value: 'reading_writing', 
      label: 'Reading/Writing', 
      description: 'Text explanations, examples, written practice',
      icon: '📚'
    },
    { 
      value: 'balanced', 
      label: 'Balanced', 
      description: 'Mix of different approaches',
      icon: '⚖️'
    },
    { 
      value: 'kinesthetic', 
      label: 'Kinesthetic', 
      description: 'Hands-on practice, interactive exercises',
      icon: '🔧'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatTime = (minutes: number) => {
    const hours = minutes / 60;
    return hours >= 1 ? `${hours} hours` : `${minutes} minutes`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {mode === 'create' ? '👤 Student Profile Setup' : '⚙️ Edit Preferences'}
        </h2>
        <p className="text-gray-600">
          {mode === 'create' 
            ? 'Tell us about your goals and preferences to create your personalized learning path'
            : 'Update your learning preferences and goals'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Target GRE Quantitative Score
            </label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">130</span>
                <span className="text-lg font-bold text-blue-600">{formData.target_score}</span>
                <span className="text-sm text-gray-500">170</span>
              </div>
              <input
                type="range"
                min="130"
                max="170"
                value={formData.target_score}
                onChange={(e) => handleChange('target_score', parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {formData.target_score >= 165 ? 'Excellent target! 🎯' :
                   formData.target_score >= 155 ? 'Great goal! 💪' :
                   'Good starting point! 👍'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Study Availability */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            ⏰ Weekly Study Time
          </h3>
          <p className="text-gray-600 mb-4">How much time can you dedicate to studying per week?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availabilityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('available_time_week', option.value)}
                className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                  formData.available_time_week === option.value
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
                <div className="text-xs text-blue-600 mt-2 font-medium">
                  {formatTime(option.value)} per week
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Pace */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            🚀 Learning Pace
          </h3>
          <p className="text-gray-600 mb-4">How quickly do you prefer to learn new material?</p>
          
          <div className="space-y-3">
            {paceOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.preferred_difficulty_pace === option.value
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="pace"
                  value={option.value}
                  checked={formData.preferred_difficulty_pace === option.value}
                  onChange={(e) => handleChange('preferred_difficulty_pace', e.target.value)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-semibold text-gray-900">{option.label}</span>
                  </div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Learning Style */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            🎨 Learning Style
          </h3>
          <p className="text-gray-600 mb-4">How do you learn best?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {styleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('learning_style', option.value)}
                className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                  formData.learning_style === option.value
                    ? 'border-purple-500 bg-purple-50 scale-105 shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">📋 Your Learning Profile Summary</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div><strong>Name:</strong> {formData.name || 'Not provided'}</div>
            <div><strong>Target Score:</strong> GRE Quantitative {formData.target_score}</div>
            <div><strong>Study Time:</strong> {formatTime(formData.available_time_week)} per week</div>
            <div><strong>Learning Pace:</strong> {paceOptions.find(p => p.value === formData.preferred_difficulty_pace)?.label}</div>
            <div><strong>Learning Style:</strong> {styleOptions.find(s => s.value === formData.learning_style)?.label}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={!formData.name}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {mode === 'create' ? 'Continue to Knowledge Assessment' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;