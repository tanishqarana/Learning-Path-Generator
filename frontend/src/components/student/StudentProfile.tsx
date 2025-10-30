import React from 'react';
import { Student } from '../../types/student';
import ProgressBar from '../common/ProgressBar';

interface StudentProfileProps {
  student: Student;
  onEdit?: () => void;
  onRetakeAssessment?: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({
  student,
  onEdit,
  onRetakeAssessment
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours} hours` : `${minutes} minutes`;
  };

  const getProficiencyLevel = (score: number) => {
    if (score >= 90) return { level: 'Expert', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { level: 'Advanced', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 50) return { level: 'Intermediate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 30) return { level: 'Basic', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Beginner', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const strongAreas = Object.entries(student.known_concepts)
    .filter(([_, score]) => score >= 70)
    .map(([concept]) => concept);

  const weakAreas = Object.entries(student.known_concepts)
    .filter(([_, score]) => score < 50)
    .map(([concept]) => concept);

  const overallProficiency = Object.values(student.known_concepts).length > 0
    ? Math.round(Object.values(student.known_concepts).reduce((a, b) => a + b, 0) / Object.values(student.known_concepts).length)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Profile</h2>
          <p className="text-gray-600">Your learning preferences and progress</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Edit Profile
          </button>
          <button
            onClick={onRetakeAssessment}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Retake Assessment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Knowledge Map */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Map</h3>
          <div className="space-y-4">
            {Object.entries(student.known_concepts).map(([concept, score]) => {
              const proficiency = getProficiencyLevel(score);
              return (
                <div key={concept}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 capitalize">
                      {concept.replace('_', ' ')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${proficiency.color}`}>
                        {score}%
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${proficiency.bg} ${proficiency.color}`}>
                        {proficiency.level}
                      </span>
                    </div>
                  </div>
                  <ProgressBar 
                    progress={score} 
                    color={
                      score >= 70 ? 'green' :
                      score >= 50 ? 'blue' :
                      score >= 30 ? 'yellow' : 'red'
                    }
                    size="md"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Preferences & Stats */}
        <div className="space-y-6">
          {/* Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Preferences</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Weekly Time</div>
                <div className="font-semibold text-gray-900">
                  {formatTime(student.available_time_week)}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Learning Pace</div>
                <div className="font-semibold text-gray-900 capitalize">
                  {student.preferred_difficulty_pace}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Learning Style</div>
                <div className="font-semibold text-gray-900 capitalize">
                  {student.learning_style.replace('_', ' ')}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Target Score</div>
                <div className="font-semibold text-gray-900">
                  GRE {student.target_score}
                </div>
              </div>
            </div>
          </div>

          {/* Strong & Weak Areas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Strong Areas</h4>
              <div className="space-y-1">
                {strongAreas.length > 0 ? (
                  strongAreas.map(area => (
                    <div key={area} className="flex items-center text-sm text-green-700">
                      <span className="mr-2">✓</span>
                      <span className="capitalize">{area.replace('_', ' ')}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-green-600">Complete assessment to see strong areas</p>
                )}
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Areas to Improve</h4>
              <div className="space-y-1">
                {weakAreas.length > 0 ? (
                  weakAreas.map(area => (
                    <div key={area} className="flex items-center text-sm text-red-700">
                      <span className="mr-2">⚠️</span>
                      <span className="capitalize">{area.replace('_', ' ')}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-red-600">Complete assessment to see areas for improvement</p>
                )}
              </div>
            </div>
          </div>

          {/* Overall Proficiency */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Overall Proficiency</h4>
            <div className="flex items-center justify-between">
              <ProgressBar 
                progress={overallProficiency} 
                color="blue" 
                size="lg"
                label="Overall Mastery"
              />
              <span className="text-2xl font-bold text-blue-600 ml-4">
                {overallProficiency}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;