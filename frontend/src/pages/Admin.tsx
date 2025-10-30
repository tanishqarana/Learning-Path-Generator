import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'analytics' | 'students'>('modules');
  const [editingModule, setEditingModule] = useState<any>(null);

  // Mock data
  const modulesData = [
    { id: 1, name: "Integer Properties", difficulty: 1, time_estimate: 25, concepts: ["integers"], prerequisites: [], status: "active" },
    { id: 2, name: "Arithmetic Operations", difficulty: 1, time_estimate: 30, concepts: ["arithmetic_operations"], prerequisites: ["integers"], status: "active" },
    { id: 3, name: "Fractions", difficulty: 2, time_estimate: 45, concepts: ["fractions"], prerequisites: ["arithmetic_operations"], status: "active" },
    { id: 4, name: "Algebra Fundamentals", difficulty: 3, time_estimate: 50, concepts: ["algebra"], prerequisites: ["fractions"], status: "draft" },
    { id: 5, name: "Geometry Basics", difficulty: 2, time_estimate: 40, concepts: ["geometry"], prerequisites: ["algebra"], status: "active" }
  ];

  const analyticsData = {
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
  };

  const studentsData = [
    { id: 1, name: "John Doe", email: "john@example.com", progress: 75, joined: "2024-01-15", lastActive: "2024-03-20" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", progress: 42, joined: "2024-02-01", lastActive: "2024-03-19" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", progress: 89, joined: "2024-01-20", lastActive: "2024-03-20" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", progress: 31, joined: "2024-02-15", lastActive: "2024-03-18" },
    { id: 5, name: "David Brown", email: "david@example.com", progress: 67, joined: "2024-01-30", lastActive: "2024-03-19" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const ModuleForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingModule ? 'Edit Module' : 'Create New Module'}
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Module Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={editingModule?.name || ''}
              placeholder="Enter module name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level} selected={editingModule?.difficulty === level}>
                    Level {level} ({getDifficultyStars(level)})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Estimate (minutes)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={editingModule?.time_estimate || 30}
                min="5"
                max="180"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Concepts</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={editingModule?.concepts?.join(', ') || ''}
              placeholder="Enter concepts separated by commas"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={editingModule?.prerequisites?.join(', ') || ''}
              placeholder="Enter prerequisite concepts separated by commas"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="draft">Draft</option>
              <option value="active" selected>Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            onClick={() => setEditingModule(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            {editingModule ? 'Update Module' : 'Create Module'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">👨‍💼 Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage learning content and track platform analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Live
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'modules', name: 'Module Manager', icon: '📚' },
              { id: 'analytics', name: 'Analytics', icon: '📊' },
              { id: 'students', name: 'Student Management', icon: '👥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Module Management</h2>
              <button 
                onClick={() => setEditingModule({})}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">+</span> Add New Module
              </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepts</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {modulesData.map((module) => (
                    <tr key={module.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{module.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-yellow-500">{getDifficultyStars(module.difficulty)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{module.time_estimate}m</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{module.concepts.join(', ')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(module.status)}`}>
                          {module.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setEditingModule(module)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
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
                    <div className="text-2xl font-bold text-gray-900">{analyticsData.totalStudents.toLocaleString()}</div>
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
                    <div className="text-2xl font-bold text-gray-900">{analyticsData.activeStudents.toLocaleString()}</div>
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
                    <div className="text-2xl font-bold text-gray-900">{analyticsData.averageProgress}%</div>
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
                    <div className="text-2xl font-bold text-gray-900">{analyticsData.completionRate}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Popular Modules</h3>
                <div className="space-y-3">
                  {analyticsData.popularModules.map((module, index) => (
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
                  {analyticsData.studentProgress.map((item) => (
                    <div key={item.range} className="flex items-center justify-between">
                      <span className="text-gray-600 w-16">{item.range}</span>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-500 h-3 rounded-full"
                            style={{ width: `${(item.count / analyticsData.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-gray-500 w-12 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  placeholder="Search students..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentsData.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-sm font-bold">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-700">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastActive}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Message</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Module Form Modal */}
      {editingModule && <ModuleForm />}
    </div>
  );
};

export default Admin;