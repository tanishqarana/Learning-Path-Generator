import React from 'react';
import ProgressBar from '../common/ProgressBar';

interface ProgressTrackerProps {
  completedModules: number;
  totalModules: number;
  timeSpent: number; // in minutes
  totalTime: number; // in minutes
  conceptsMastered: number;
  totalConcepts: number;
  currentStreak: number;
  weeklyGoal?: number;
  weeklyProgress?: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  completedModules,
  totalModules,
  timeSpent,
  totalTime,
  conceptsMastered,
  totalConcepts,
  currentStreak,
  weeklyGoal = 300, // 5 hours default
  weeklyProgress = 180 // 3 hours default
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculatePercentage = (current: number, total: number) => {
    return total > 0 ? Math.round((current / total) * 100) : 0;
  };

  const modulesPercentage = calculatePercentage(completedModules, totalModules);
  const timePercentage = calculatePercentage(timeSpent, totalTime);
  const conceptsPercentage = calculatePercentage(conceptsMastered, totalConcepts);
  const weeklyPercentage = calculatePercentage(weeklyProgress, weeklyGoal);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Progress Metrics */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Module Completion</span>
              <span className="text-sm text-gray-500">{completedModules}/{totalModules}</span>
            </div>
            <ProgressBar 
              progress={modulesPercentage} 
              color="blue" 
              size="lg"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Time Invested</span>
              <span className="text-sm text-gray-500">{formatTime(timeSpent)}/{formatTime(totalTime)}</span>
            </div>
            <ProgressBar 
              progress={timePercentage} 
              color="green" 
              size="lg"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Concepts Mastered</span>
              <span className="text-sm text-gray-500">{conceptsMastered}/{totalConcepts}</span>
            </div>
            <ProgressBar 
              progress={conceptsPercentage} 
              color="purple" 
              size="lg"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
              <span className="text-sm text-gray-500">{formatTime(weeklyProgress)}/{formatTime(weeklyGoal)}</span>
            </div>
            <ProgressBar 
              progress={weeklyPercentage} 
              color="yellow" 
              size="lg"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{currentStreak}</div>
            <div className="text-sm text-blue-800">Day Streak 🔥</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{modulesPercentage}%</div>
            <div className="text-sm text-green-800">Overall Progress</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round(completedModules / (timeSpent / 60) * 10) / 10 || 0}
            </div>
            <div className="text-sm text-purple-800">Modules/Hour</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {Math.round((completedModules / totalModules) * 100)}%
            </div>
            <div className="text-sm text-orange-800">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <div className="flex items-end justify-between h-20">
          {[
            { day: 'Mon', minutes: 45 },
            { day: 'Tue', minutes: 60 },
            { day: 'Wed', minutes: 30 },
            { day: 'Thu', minutes: 75 },
            { day: 'Fri', minutes: 0 },
            { day: 'Sat', minutes: 90 },
            { day: 'Sun', minutes: 40 }
          ].map((dayData, index) => (
            <div key={dayData.day} className="flex flex-col items-center flex-1">
              <div 
                className="bg-blue-500 rounded-t w-3/4 transition-all duration-500 hover:bg-blue-600"
                style={{ height: `${(dayData.minutes / 120) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-600 mt-1">{dayData.day}</span>
              <span className="text-xs text-gray-500">{dayData.minutes}m</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Recommendations</h3>
        <div className="space-y-2 text-sm text-gray-600">
          {weeklyPercentage < 50 && (
            <p>• You're behind your weekly goal. Try to study for {formatTime(weeklyGoal - weeklyProgress)} more this week.</p>
          )}
          {modulesPercentage < 30 && (
            <p>• Focus on completing foundational modules to build momentum.</p>
          )}
          {currentStreak >= 7 && (
            <p>• Great streak! Keep up the consistent learning habit.</p>
          )}
          <p>• Based on your pace, you'll complete the path in approximately {Math.ceil((totalModules - completedModules) / (completedModules / (timeSpent / 60)))} days.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;