import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LearningPath: React.FC = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const learningPath = {
    student_name: "John Doe",
    target_score: 160,
    total_modules: 55,
    total_time: 2700, // 45 hours in minutes
    fitness_score: 0.89,
    weak_areas_covered: "12/15",
    estimated_weeks: 8,
    modules: [
      {
        phase: "Foundation",
        description: "Build fundamental math skills",
        estimated_time: 900, // 15 hours
        modules: [
          { id: 1, name: "Integer Properties", time: 25, status: "completed", difficulty: 1 },
          { id: 2, name: "Arithmetic Operations", time: 30, status: "completed", difficulty: 1 },
          { id: 3, name: "Fractions", time: 45, status: "in-progress", difficulty: 2 },
          { id: 4, name: "Decimals", time: 30, status: "upcoming", difficulty: 2 },
          { id: 5, name: "Percentages", time: 35, status: "upcoming", difficulty: 2 }
        ]
      },
      {
        phase: "Core Algebra",
        description: "Master algebraic concepts and equations",
        estimated_time: 1200, // 20 hours
        modules: [
          { id: 6, name: "Algebraic Expressions", time: 40, status: "upcoming", difficulty: 3 },
          { id: 7, name: "Linear Equations", time: 50, status: "upcoming", difficulty: 3 },
          { id: 8, name: "Quadratic Equations", time: 60, status: "upcoming", difficulty: 4 }
        ]
      },
      {
        phase: "Advanced Topics",
        description: "Advanced math concepts and applications",
        estimated_time: 600, // 10 hours
        modules: [
          { id: 9, name: "Geometry Fundamentals", time: 55, status: "upcoming", difficulty: 3 },
          { id: 10, name: "Data Analysis", time: 45, status: "upcoming", difficulty: 3 }
        ]
      }
    ]
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🟡';
      case 'upcoming': return '◯';
      default: return '◯';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-yellow-600';
      case 'upcoming': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const formatTime = (minutes: number) => {
    return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🗺️ Your Personalized Learning Path
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Estimated: {formatTime(learningPath.total_time)}</span>
                <span>•</span>
                <span>{learningPath.total_modules} modules</span>
                <span>•</span>
                <span>Fitness: {learningPath.fitness_score}</span>
                <span>•</span>
                <span>Weak areas covered: {learningPath.weak_areas_covered}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Regenerate Path
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Export Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Learning Path Sections */}
        <div className="space-y-4">
          {learningPath.modules.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    PHASE {sectionIndex + 1}: {section.phase}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {section.description} • {formatTime(section.estimated_time)}
                  </p>
                </div>
                <span className="text-gray-400 transform transition-transform duration-200">
                  {expandedSections.includes(sectionIndex) ? '▼' : '▶'}
                </span>
              </button>

              {/* Section Content */}
              {expandedSections.includes(sectionIndex) && (
                <div className="px-6 pb-4">
                  <div className="space-y-3">
                    {section.modules.map((module, moduleIndex) => (
                      <div
                        key={module.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <span className={`text-lg ${getStatusColor(module.status)}`}>
                            {getStatusIcon(module.status)}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {module.id}. {module.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatTime(module.time)} • {'⭐'.repeat(module.difficulty)}
                            </div>
                          </div>
                        </div>
                        {module.status === 'in-progress' && (
                          <button
                            onClick={() => navigate('/module')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-3 rounded transition-colors duration-200"
                          >
                            Continue
                          </button>
                        )}
                        {module.status === 'upcoming' && (
                          <span className="text-sm text-gray-400">Locked</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Path Progress Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">51</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">25%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;