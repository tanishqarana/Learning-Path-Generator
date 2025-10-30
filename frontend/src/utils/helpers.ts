export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const calculateProgress = (completed: number, total: number): number => {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};

export const getDifficultyStars = (difficulty: number): string => {
  return '⭐'.repeat(difficulty);
};

export const getReadinessColor = (readiness: number): string => {
  if (readiness >= 80) return 'text-green-600';
  if (readiness >= 60) return 'text-yellow-600';
  if (readiness >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const getReadinessLabel = (readiness: number): string => {
  if (readiness >= 80) return 'Ready';
  if (readiness >= 60) return 'Mostly Ready';
  if (readiness >= 40) return 'Partially Ready';
  return 'Not Ready';
};