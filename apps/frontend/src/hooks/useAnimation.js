import { useEffect } from 'react';
import useAnimationStore from '../store/animationStore';

/**
 * useAnimation - Custom hook for animation control
 *
 * Provides easy access to animation state and controls.
 * Automatically initializes animation with provided steps.
 *
 * @param {AnimationStep[]} steps - Animation steps (optional)
 * @param {Object} metadata - Animation metadata (optional)
 * @returns {Object} Animation state and controls
 */
function useAnimation(steps = null, metadata = null) {
  const {
    // State
    currentStep,
    currentStepIndex,
    isPlaying,
    isPaused,
    isComplete,
    speed,
    progress,
    steps: storeSteps,
    metadata: storeMetadata,

    // Actions
    initializeAnimation,
    play,
    pause,
    togglePlayPause,
    nextStep,
    previousStep,
    goToStep,
    reset,
    setSpeed,
    clearAnimation,

    // Getters
    isAtStart,
    isAtEnd,
    getTotalSteps,
  } = useAnimationStore();

  // Initialize animation when steps are provided
  useEffect(() => {
    if (steps && steps.length > 0) {
      initializeAnimation(steps, metadata);
    }

    // Cleanup on unmount
    return () => {
      if (steps && steps.length > 0) {
        clearAnimation();
      }
    };
  }, [steps, metadata]); // Re-initialize if steps change

  return {
    // Current state
    currentStep,
    currentStepIndex,
    isPlaying,
    isPaused,
    isComplete,
    speed,
    progress,
    steps: storeSteps,
    metadata: storeMetadata,

    // Playback controls
    play,
    pause,
    togglePlayPause,

    // Step navigation
    nextStep,
    previousStep,
    goToStep,
    reset,

    // Configuration
    setSpeed,

    // Utilities
    isAtStart: isAtStart(),
    isAtEnd: isAtEnd(),
    totalSteps: getTotalSteps(),
    hasSteps: getTotalSteps() > 0,
  };
}

export default useAnimation;
