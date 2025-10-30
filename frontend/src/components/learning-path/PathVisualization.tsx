import React from 'react';
import { Module } from '../../types/module';

interface PathVisualizationProps {
  modules: Module[];
  currentModuleId?: number;
  completedModules?: number[];
  onModuleClick?: (module: Module) => void;
}

const PathVisualization: React.FC<PathVisualizationProps> = ({
  modules,
  currentModuleId,
  completedModules = [],
  onModuleClick
}) => {
  const getModuleStatus = (moduleId: number) => {
    if (currentModuleId === moduleId) return 'current';
    if (completedModules.includes(moduleId)) return 'completed';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-500';
      case 'current': return 'bg-blue-500 border-blue-500 animate-pulse';
      case 'upcoming': return 'bg-gray-300 border-gray-300';
      default: return 'bg-gray-300 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'current': return '→';
      case 'upcoming': return '○';
      default: return '○';
    }
  };

  // Group modules by phase (simplified grouping)
  const phases = [
    { name: 'Foundation', modules: modules.slice(0, 5) },
    { name: 'Core Concepts', modules: modules.slice(5, 10) },
    { name: 'Advanced Topics', modules: modules.slice(10, 15) }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Journey</h2>
      
      <div className="space-y-8">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="relative">
            {/* Phase Header */}
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">{phase.name}</h3>
              <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phase.modules.map((module, moduleIndex) => {
                const status = getModuleStatus(module.id);
                return (
                  <div
                    key={module.id}
                    onClick={() => onModuleClick?.(module)}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                      status === 'completed' 
                        ? 'bg-green-50 border-green-200' 
                        : status === 'current'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {/* Connection Line */}
                    {moduleIndex < phase.modules.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 right-0 w-4 h-0.5 bg-gray-300 transform translate-x-full -translate-y-1/2"></div>
                    )}

                    {/* Status Indicator */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                      </div>
                      <span className="text-sm text-gray-500">{module.time_estimate}m</span>
                    </div>

                    {/* Module Info */}
                    <h4 className="font-semibold text-gray-900 mb-1">{module.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {module.concepts.slice(0, 2).join(', ')}
                      {module.concepts.length > 2 && '...'}
                    </p>

                    {/* Difficulty */}
                    <div className="flex items-center justify-between">
                      <div className="text-yellow-500 text-sm">
                        {'⭐'.repeat(module.difficulty)}
                      </div>
                      {status === 'current' && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Progress line for current module */}
                    {status === 'current' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-200 rounded-b-lg">
                        <div 
                          className="h-full bg-blue-500 rounded-b-lg transition-all duration-1000"
                          style={{ width: '65%' }} // Simulated progress
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Phase Connector */}
            {phaseIndex < phases.length - 1 && (
              <div className="absolute left-6 top-full w-0.5 h-8 bg-purple-300 transform -translate-y-4"></div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Legend</h4>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span>Upcoming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Phase Marker</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathVisualization;