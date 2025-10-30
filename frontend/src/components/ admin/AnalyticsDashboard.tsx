import React from 'react';

interface AnalyticsDashboardProps {
  data?: {
    totalStudents: number;
    activeStudents: number;
    averageProgress: number;
    completionRate: number;
    popularModules: Array<{ name: string; completions: number }>;
    studentProgress: Array<{ range: string; count: number }>;
  };
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  data = {
    totalStudents: 1247,
    activeStudents: 892,
    averageProgress: 68,
    completionRate: 72,
    popularModules: [
      { name: "Arithmetic Operations", completions: 845 },
      { name: "Fractions", completions: 723 },
      { name: "Algebra Fundamentals", completions: 612 },
      { name: "Word Problems", completions: 589 },
      { name: "Data Interpretation", completions: 521 }
    ],
    studentProgress: [
      { range: "0-20%", count: 156 },
      { range: "21-40%", count: 234 },
      { range: "41-60%", count: 312 },
      { range: "61-80%", count: 278 },
      { range: "81-100%", count: 189 }
    ]
  }
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Total Students</div>
              <div className="text-2xl font-bold text-gray-900">{data.totalStudents.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🔥</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Active Students</div>
              <div className="text-2xl font-bold text-gray-900">{data.activeStudents.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">📈</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Avg. Progress</div>
              <div className="text-2xl font-bold text-gray-900">{data.averageProgress}%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Completion Rate</div>
              <div className="text-2xl font-bold text-gray-900">{data.completionRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Modules */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Popular Modules</h3>
          <div className="space-y-3">
            {data.popularModules.map((module, index) => (
              <div key={module.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{module.name}</span>
                </div>
                <span className="text-gray-500 font-medium">{module.completions.toLocaleString()} completions</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Student Progress Distribution</h3>
          <div className="space-y-2">
            {data.studentProgress.map((item) => (
              <div key={item.range} className="flex items-center justify-between">
                <span className="text-gray-600 w-16">{item.range}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / data.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-500 w-12 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {Math.round((data.activeStudents / data.totalStudents) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Active Rate</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {Math.round(data.popularModules[0].completions / data.totalStudents * 100)}%
          </div>
          <div className="text-sm text-gray-600">Most Popular Module Engagement</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {Math.round(data.studentProgress[4].count / data.totalStudents * 100)}%
          </div>
          <div className="text-sm text-gray-600">High Achievers</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;