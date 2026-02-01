import { create } from 'zustand';
import AnimationController from '../engine/AnimationController';
import { PLAYBACK_SPEEDS } from '../engine/animationTypes';

/**
 * Animation Store - Manages animation state using Zustand
 *
 * This store integrates with AnimationController to provide
 * reactive state management for the animation system.
 */
const useAnimationStore = create((set, get) => ({
  // State
  controller: null,
  steps: [],
  currentStepIndex: 0,
  currentStep: null,
  isPlaying: false,
  isPaused: false,
  isComplete: false,
  speed: PLAYBACK_SPEEDS.NORMAL,
  progress: 0,
  metadata: null,

  // Actions

  /**
   * Initialize animation with steps
   * @param {AnimationStep[]} steps - Animation steps
   * @param {Object} metadata - Animation metadata
   */
  initializeAnimation: (steps, metadata = null) => {
    // Destroy existing controller
    const { controller } = get();
    if (controller) {
      controller.destroy();
    }

    // Create new controller
    const newController = new AnimationController(steps, {
      speed: get().speed,
      onStepChange: (step, index) => {
        set({
          currentStep: step,
          currentStepIndex: index,
          progress: newController.getProgress(),
          isComplete: newController.isAtEnd(),
        });
      },
      onPlayStateChange: (playing, paused) => {
        set({
          isPlaying: playing,
          isPaused: paused,
        });
      },
      onComplete: () => {
        set({
          isComplete: true,
          isPlaying: false,
        });
      },
    });

    set({
      controller: newController,
      steps,
      currentStepIndex: 0,
      currentStep: steps[0] || null,
      isComplete: false,
      metadata,
      progress: 0,
    });
  },

  /**
   * Play animation
   */
  play: () => {
    const { controller } = get();
    if (controller) {
      controller.play();
    }
  },

  /**
   * Pause animation
   */
  pause: () => {
    const { controller } = get();
    if (controller) {
      controller.pause();
    }
  },

  /**
   * Toggle play/pause
   */
  togglePlayPause: () => {
    const { controller } = get();
    if (controller) {
      controller.togglePlayPause();
    }
  },

  /**
   * Go to next step
   */
  nextStep: () => {
    const { controller } = get();
    if (controller) {
      controller.nextStep();
    }
  },

  /**
   * Go to previous step
   */
  previousStep: () => {
    const { controller } = get();
    if (controller) {
      controller.previousStep();
    }
  },

  /**
   * Go to specific step
   * @param {number} stepIndex - Target step index
   */
  goToStep: (stepIndex) => {
    const { controller } = get();
    if (controller) {
      controller.goToStep(stepIndex);
    }
  },

  /**
   * Reset animation to beginning
   */
  reset: () => {
    const { controller } = get();
    if (controller) {
      controller.reset();
    }
  },

  /**
   * Set playback speed
   * @param {number} speed - Speed multiplier
   */
  setSpeed: (speed) => {
    const { controller } = get();
    set({ speed });
    if (controller) {
      controller.setSpeed(speed);
    }
  },

  /**
   * Clear animation
   */
  clearAnimation: () => {
    const { controller } = get();
    if (controller) {
      controller.destroy();
    }

    set({
      controller: null,
      steps: [],
      currentStepIndex: 0,
      currentStep: null,
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      progress: 0,
      metadata: null,
    });
  },

  // Getters

  /**
   * Check if at start
   */
  isAtStart: () => {
    const { controller } = get();
    return controller ? controller.isAtStart() : true;
  },

  /**
   * Check if at end
   */
  isAtEnd: () => {
    const { controller } = get();
    return controller ? controller.isAtEnd() : false;
  },

  /**
   * Get total steps
   */
  getTotalSteps: () => {
    const { steps } = get();
    return steps.length;
  },
}));

export default useAnimationStore;
