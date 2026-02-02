import {
  PLAYBACK_SPEEDS,
  calculateStepDelay,
} from './animationTypes';

/**
 * AnimationController - Core class for managing animation playback
 *
 * This class handles:
 * - Step navigation (next, previous, goto)
 * - Playback control (play, pause, reset)
 * - Speed control
 * - State management
 */
class AnimationController {
  /**
   * @param {AnimationStep[]} steps - Array of animation steps
   * @param {Object} options - Configuration options
   */
  constructor(steps = [], options = {}) {
    this.steps = steps;
    this.currentStepIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.speed = options.speed || PLAYBACK_SPEEDS.NORMAL;
    this.autoPlay = options.autoPlay || false;
    this.loop = options.loop || false;

    // Callbacks
    this.onStepChange = options.onStepChange || null;
    this.onPlayStateChange = options.onPlayStateChange || null;
    this.onComplete = options.onComplete || null;

    // Animation timer
    this.animationTimer = null;

    // Auto-play if enabled
    if (this.autoPlay && this.steps.length > 0) {
      this.play();
    }
  }

  /**
   * Get current step
   * @returns {AnimationStep|null}
   */
  getCurrentStep() {
    return this.steps[this.currentStepIndex] || null;
  }

  /**
   * Get total number of steps
   * @returns {number}
   */
  getTotalSteps() {
    return this.steps.length;
  }

  /**
   * Check if at the first step
   * @returns {boolean}
   */
  isAtStart() {
    return this.currentStepIndex === 0;
  }

  /**
   * Check if at the last step
   * @returns {boolean}
   */
  isAtEnd() {
    return this.currentStepIndex >= this.steps.length - 1;
  }

  /**
   * Get progress percentage
   * @returns {number} Progress from 0 to 100
   */
  getProgress() {
    if (this.steps.length === 0) return 0;
    return (this.currentStepIndex / (this.steps.length - 1)) * 100;
  }

  /**
   * Go to specific step
   * @param {number} stepIndex - Target step index
   * @returns {boolean} Success
   */
  goToStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) {
      return false;
    }

    this.currentStepIndex = stepIndex;
    this._notifyStepChange();
    return true;
  }

  /**
   * Go to next step
   * @returns {boolean} Success
   */
  nextStep() {
    if (this.isAtEnd()) {
      return false;
    }

    this.currentStepIndex++;
    this._notifyStepChange();
    return true;
  }

  /**
   * Go to previous step
   * @returns {boolean} Success
   */
  previousStep() {
    if (this.isAtStart()) {
      return false;
    }

    this.currentStepIndex--;
    this._notifyStepChange();
    return true;
  }

  /**
   * Play animation
   */
  play() {
    if (this.isPlaying) return;

    // If at end, reset to beginning
    if (this.isAtEnd()) {
      this.reset();
    }

    this.isPlaying = true;
    this.isPaused = false;
    this._notifyPlayStateChange();
    this._startAnimation();
  }

  /**
   * Pause animation
   */
  pause() {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    this.isPaused = true;
    this._stopAnimation();
    this._notifyPlayStateChange();
  }

  /**
   * Toggle play/pause
   */
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Reset to beginning
   */
  reset() {
    this.pause();
    this.currentStepIndex = 0;
    this.isPaused = false;
    this._notifyStepChange();
  }

  /**
   * Set playback speed
   * @param {number} speed - Speed multiplier
   */
  setSpeed(speed) {
    this.speed = speed;

    // Restart animation if playing to apply new speed
    if (this.isPlaying) {
      this._stopAnimation();
      this._startAnimation();
    }
  }

  /**
   * Load new steps
   * @param {AnimationStep[]} steps - New animation steps
   */
  loadSteps(steps) {
    this.pause();
    this.steps = steps;
    this.reset();
  }

  /**
   * Destroy controller and clean up
   */
  destroy() {
    this._stopAnimation();
    this.steps = [];
    this.currentStepIndex = 0;
    this.onStepChange = null;
    this.onPlayStateChange = null;
    this.onComplete = null;
  }

  // Private methods

  /**
   * Start animation timer
   * @private
   */
  _startAnimation() {
    const delay = calculateStepDelay(this.speed);

    this.animationTimer = setInterval(() => {
      const hasNext = this.nextStep();

      // Check if animation is complete
      if (!hasNext) {
        this._handleAnimationComplete();
      }
    }, delay);
  }

  /**
   * Stop animation timer
   * @private
   */
  _stopAnimation() {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
  }

  /**
   * Handle animation completion
   * @private
   */
  _handleAnimationComplete() {
    this._stopAnimation();

    if (this.loop) {
      // Restart from beginning
      this.reset();
      this.play();
    } else {
      // Stop at end
      this.isPlaying = false;
      this._notifyPlayStateChange();

      if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  /**
   * Notify step change
   * @private
   */
  _notifyStepChange() {
    if (this.onStepChange) {
      this.onStepChange(this.getCurrentStep(), this.currentStepIndex);
    }
  }

  /**
   * Notify play state change
   * @private
   */
  _notifyPlayStateChange() {
    if (this.onPlayStateChange) {
      this.onPlayStateChange(this.isPlaying, this.isPaused);
    }
  }
}

export default AnimationController;
