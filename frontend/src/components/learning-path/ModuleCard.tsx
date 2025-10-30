import React from 'react';
import { Module } from '../../types/module';
import ProgressBar from '../common/ProgressBar';

interface ModuleCardProps {
  module: Module;
  status?: 'completed' | 'in-progress' | 'upcoming' | 'locked';
  progress?: number;
  onStart?: (module: Module) => void;
  onContinue?: (module: Module) => void;
  onReview?: (module: Module) => void;
  showProgress?: boolean;
  compact?: boolean;
  interactive?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  status = 'upcoming',
  progress = 0,
  onStart,
  onContinue,
  onReview,
  showProgress = false,
  compact = false,
  interactive = true
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🟡';
      case 'upcoming': return '◯';
      case 'locked': return '🔒';
      default: return '◯';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'upcoming': return 'text-gray-400 bg-gray-50 border-gray-200';
      case 'locked': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-gray-400 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'upcoming': return 'Up Next';
      case 'locked': return 'Locked';
      default: return 'Available';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Easy';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Unknown';
    }
  };

  const formatTime = (minutes: number) => {
    return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const getActionButton = () => {
    if (!interactive) return null;

    switch (status) {
      case 'completed':
        return (
          <button
            onClick={() => onReview?.(module)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span>📚</span>
            <span>Review</span>
          </button>
        );
      case 'in-progress':
        return (
          <button
            onClick={() => onContinue?.(module)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span>🚀</span>
            <span>Continue</span>
          </button>
        );
      case 'upcoming':
        return (
          <button
            onClick={() => onStart?.(module)}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span>🎯</span>
            <span>Start</span>
          </button>
        );
      case 'locked':
        return (
          <button
            disabled
            className="bg-gray-400 text-white text-sm font-semibold py-2 px-4 rounded-lg cursor-not-allowed flex items-center space-x-2"
          >
            <span>🔒</span>
            <span>Locked</span>
          </button>
        );
      default:
        return null;
    }
  };

  if (compact) {
    return (
      <div className={`bg-white rounded-lg border-2 p-3 transition-all duration-200 ${
        interactive ? 'hover:shadow-md cursor-pointer' : ''
      } ${getStatusColor()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <span className="text-lg flex-shrink-0">{getStatusIcon()}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {module.name}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{formatTime(module.time_estimate)}</span>
                <span>•</span>
                <span className="text-yellow-500">{getDifficultyStars(module.difficulty)}</span>
              </div>
            </div>
          </div>
          {interactive && (
            <div className="flex-shrink-0 ml-2">
              {getActionButton()}
            </div>
          )}
        </div>

        {showProgress && status === 'in-progress' && (
          <div className="mt-2">
            <ProgressBar progress={progress} size="sm" color="blue" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border-2 p-6 transition-all duration-200 ${
      interactive ? 'hover:shadow-lg cursor-pointer hover:scale-105' : ''
    } ${getStatusColor()}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <span className="text-2xl mt-1 flex-shrink-0">{getStatusIcon()}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-xl mb-2">
              {module.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{formatTime(module.time_estimate)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span className="text-yellow-500">{getDifficultyStars(module.difficulty)}</span>
                <span>({getDifficultyText(module.difficulty)})</span>
              </span>
              <span>•</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'completed' ? 'bg-green-100 text-green-800' :
                status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                status === 'locked' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {getStatusText()}
              </span>
            </div>
          </div>
        </div>
        
        {interactive && (
          <div className="flex-shrink-0">
            {getActionButton()}
          </div>
        )}
      </div>

      {/* Description */}
      {module.description && (
        <p className="text-gray-600 mb-4 leading-relaxed">
          {module.description}
        </p>
      )}

      {/* Concepts */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
          <span>📚</span>
          <span>Concepts Covered</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {module.concepts.map((concept, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
            >
              {concept.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      {module.prerequisites && module.prerequisites.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
            <span>⚡</span>
            <span>Prerequisites</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {module.prerequisites.map((prereq, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium"
              >
                {prereq.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      {showProgress && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <ProgressBar 
            progress={progress} 
            color={
              status === 'completed' ? 'green' :
              status === 'in-progress' ? 'blue' : 'gray'
            }
            size="lg"
          />
        </div>
      )}

      {/* Topics */}
      {module.topics && module.topics.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
            <span>🎯</span>
            <span>Related Topics</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {module.topics.map((topic, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Learning Materials Preview */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <span>📖</span>
          <span>Learning Materials</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>🎥</span>
            <span>Video</span>
          </button>
          <button className="bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>📝</span>
            <span>Practice</span>
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>📚</span>
            <span>Notes</span>
          </button>
          <button className="bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>🧩</span>
            <span>Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;