import React, { useState } from 'react';
import ProgressBar from '../common/ProgressBar';

interface KnowledgeAssessmentProps {
  onComplete?: (scores: Record<string, number>) => void;
  onCancel?: () => void;
}

const KnowledgeAssessment: React.FC<KnowledgeAssessmentProps> = ({
  onComplete,
  onCancel
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const assessmentSections = [
    {
      title: "Arithmetic & Numbers",
      concepts: [
        { id: 'arithmetic_operations', name: 'Basic Operations (+, -, ×, ÷)', description: 'Addition, subtraction, multiplication, division' },
        { id: 'integers', name: 'Integers & Number Properties', description: 'Whole numbers, positive/negative, number lines' },
        { id: 'fractions', name: 'Fractions & Decimals', description: 'Fraction operations, decimal conversions' },
        { id: 'percentages', name: 'Percentages & Ratios', description: 'Percentage calculations, ratio problems' }
      ]
    },
    {
      title: "Algebra & Equations",
      concepts: [
        { id: 'algebraic_expressions', name: 'Algebraic Expressions', description: 'Variables, expressions, simplification' },
        { id: 'linear_equations', name: 'Linear Equations', description: 'Solving equations, word problems' },
        { id: 'quadratic_equations', name: 'Quadratic Equations', description: 'Factoring, quadratic formula' },
        { id: 'inequalities', name: 'Inequalities', description: 'Solving inequalities, graphing' }
      ]
    },
    {
      title: "Geometry & Data",
      concepts: [
        { id: 'geometry', name: 'Geometry Fundamentals', description: 'Shapes, angles, area, perimeter' },
        { id: 'coordinate_geometry', name: 'Coordinate Geometry', description: 'Graphing, slopes, distances' },
        { id: 'data_interpretation', name: 'Data Interpretation', description: 'Charts, graphs, statistics' },
        { id: 'probability', name: 'Probability & Statistics', description: 'Basic probability, mean, median, mode' }
      ]
    }
  ];

  const currentConcepts = assessmentSections[currentSection].concepts;

  const handleScoreChange = (conceptId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [conceptId]: score
    }));
  };

  const handleNext = () => {
    if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete?.(scores);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      onCancel?.();
    }
  };

  const progress = ((currentSection + 1) / assessmentSections.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          📊 Knowledge Assessment
        </h2>
        <p className="text-gray-600">
          Rate your familiarity with each concept to personalize your learning path
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Section {currentSection + 1} of {assessmentSections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <ProgressBar progress={progress} color="blue" size="lg" />
      </div>

      {/* Current Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          {assessmentSections[currentSection].title}
        </h3>

        <div className="space-y-6">
          {currentConcepts.map((concept) => (
            <div key={concept.id} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-lg">{concept.name}</h4>
                <p className="text-gray-600 text-sm">{concept.description}</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  How comfortable are you with this concept?
                </label>
                
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { value: 20, label: 'Beginner', emoji: '😕' },
                    { value: 40, label: 'Basic', emoji: '😐' },
                    { value: 60, label: 'Intermediate', emoji: '😊' },
                    { value: 80, label: 'Advanced', emoji: '😎' },
                    { value: 100, label: 'Expert', emoji: '🔥' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => handleScoreChange(concept.id, level.value)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                        scores[concept.id] === level.value
                          ? 'border-blue-500 bg-blue-50 scale-105'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl mb-1">{level.emoji}</span>
                      <span className="text-xs font-medium text-gray-700 text-center">
                        {level.label}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">{level.value}%</span>
                    </button>
                  ))}
                </div>

                {scores[concept.id] && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">
                        Selected: {
                          [{20: 'Beginner'}, {40: 'Basic'}, {60: 'Intermediate'}, {80: 'Advanced'}, {100: 'Expert'}]
                          .find(level => level[scores[concept.id] as keyof typeof level])
                          ?.[scores[concept.id] as keyof object]
                        }
                      </span>
                      <ProgressBar 
                        progress={scores[concept.id]} 
                        size="sm" 
                        color="blue"
                        showLabel={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={handleBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          {currentSection === 0 ? 'Cancel' : 'Back'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentConcepts.some(concept => !scores[concept.id])}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {currentSection === assessmentSections.length - 1 ? 'Complete Assessment' : 'Next Section'}
        </button>
      </div>
    </div>
  );
};

export default KnowledgeAssessment;