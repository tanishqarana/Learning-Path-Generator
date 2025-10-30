import React, { useState } from 'react';

interface FeedbackFormProps {
  moduleId?: number;
  moduleName?: string;
  onSubmit?: (feedback: {
    rating: number;
    difficulty: number;
    comments: string;
    suggestions: string;
  }) => void;
  onCancel?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  moduleId,
  moduleName,
  onSubmit,
  onCancel 
}) => {
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [comments, setComments] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      rating,
      difficulty,
      comments,
      suggestions
    });
    
    // Reset form
    setRating(0);
    setDifficulty(3);
    setComments('');
    setSuggestions('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📝 Module Feedback
      </h3>
      {moduleName && (
        <p className="text-gray-600 mb-6">
          How was your experience with <span className="font-semibold">{moduleName}</span>?
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you rate this module?
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none transition-transform duration-200 hover:scale-110"
              >
                {star <= rating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How difficult was this module?
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Too Easy</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    level === difficulty
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500">Too Hard</span>
          </div>
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
            What did you find most helpful?
          </label>
          <textarea
            id="comments"
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Share what worked well for you..."
          />
        </div>

        {/* Suggestions */}
        <div>
          <label htmlFor="suggestions" className="block text-sm font-medium text-gray-700 mb-2">
            Any suggestions for improvement?
          </label>
          <textarea
            id="suggestions"
            rows={3}
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="What could make this module better?"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={rating === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;