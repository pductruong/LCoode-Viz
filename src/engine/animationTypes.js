/**
 * Animation Types and Interfaces
 *
 * This file defines the core data structures for the animation engine.
 * All animation-related types are defined here for consistency.
 */

/**
 * @typedef {Object} ArrayElement
 * @property {*} value - The actual value of the array element
 * @property {number} index - The index in the array
 * @property {string} [state] - Visual state: 'default', 'active', 'comparing', 'sorted', 'target'
 * @property {string} [label] - Optional label to display
 */

/**
 * @typedef {Object} Pointer
 * @property {number} index - Index the pointer is pointing to
 * @property {string} name - Name of the pointer (e.g., 'i', 'j', 'left', 'right')
 * @property {string} [color] - Color of the pointer (hex or Tailwind class)
 */

/**
 * @typedef {Object} Variable
 * @property {string} name - Variable name
 * @property {*} value - Current value
 * @property {string} [type] - Data type
 */

/**
 * @typedef {Object} CodeHighlight
 * @property {number} line - Line number to highlight (1-based)
 * @property {number} [startCol] - Starting column (optional)
 * @property {number} [endCol] - Ending column (optional)
 */

/**
 * @typedef {Object} AnimationStep
 * @property {number} stepNumber - Step number (0-based)
 * @property {string} description - Human-readable description of what's happening
 * @property {ArrayElement[]} [array] - Array state at this step
 * @property {Pointer[]} [pointers] - Active pointers at this step
 * @property {Variable[]} [variables] - Variables and their values
 * @property {CodeHighlight} [highlight] - Code line to highlight
 * @property {string} [operation] - Operation being performed
 * @property {Object} [customData] - Any additional data specific to the visualization
 */

/**
 * @typedef {Object} AnimationMetadata
 * @property {string} problemId - ID of the problem being visualized
 * @property {string} title - Title of the animation
 * @property {string} algorithm - Algorithm name
 * @property {string} [complexity] - Time/space complexity
 * @property {number} totalSteps - Total number of steps
 */

/**
 * @typedef {Object} AnimationConfig
 * @property {number} speed - Playback speed (1 = normal, 2 = 2x, 0.5 = half speed)
 * @property {boolean} autoPlay - Whether to auto-play on load
 * @property {boolean} loop - Whether to loop the animation
 * @property {number} stepDelay - Delay between steps in milliseconds (calculated from speed)
 */

/**
 * @typedef {Object} AnimationState
 * @property {AnimationStep[]} steps - All animation steps
 * @property {number} currentStepIndex - Current step index (0-based)
 * @property {boolean} isPlaying - Whether animation is currently playing
 * @property {boolean} isPaused - Whether animation is paused
 * @property {boolean} isComplete - Whether animation has completed
 * @property {AnimationConfig} config - Animation configuration
 * @property {AnimationMetadata} metadata - Animation metadata
 */

/**
 * Playback speeds available
 */
export const PLAYBACK_SPEEDS = {
  VERY_SLOW: 0.25,
  SLOW: 0.5,
  NORMAL: 1,
  FAST: 1.5,
  VERY_FAST: 2,
};

/**
 * Default step delay in milliseconds (for normal speed)
 */
export const DEFAULT_STEP_DELAY = 1000;

/**
 * Element states for visualization
 */
export const ELEMENT_STATES = {
  DEFAULT: 'default',
  ACTIVE: 'active',
  COMPARING: 'comparing',
  SORTED: 'sorted',
  TARGET: 'target',
  SWAPPING: 'swapping',
  PIVOT: 'pivot',
  FOUND: 'found',
};

/**
 * Pointer colors (Tailwind classes)
 */
export const POINTER_COLORS = {
  PRIMARY: 'text-blue-500',
  SECONDARY: 'text-green-500',
  TERTIARY: 'text-purple-500',
  WARNING: 'text-yellow-500',
  DANGER: 'text-red-500',
};

/**
 * Create a new array element
 * @param {*} value - Element value
 * @param {number} index - Element index
 * @param {string} [state] - Element state
 * @returns {ArrayElement}
 */
export function createArrayElement(value, index, state = ELEMENT_STATES.DEFAULT) {
  return {
    value,
    index,
    state,
  };
}

/**
 * Create a new pointer
 * @param {string} name - Pointer name
 * @param {number} index - Index position
 * @param {string} [color] - Pointer color
 * @returns {Pointer}
 */
export function createPointer(name, index, color = POINTER_COLORS.PRIMARY) {
  return {
    name,
    index,
    color,
  };
}

/**
 * Create a new variable
 * @param {string} name - Variable name
 * @param {*} value - Variable value
 * @param {string} [type] - Variable type
 * @returns {Variable}
 */
export function createVariable(name, value, type = 'auto') {
  return {
    name,
    value,
    type,
  };
}

/**
 * Create a new animation step
 * @param {number} stepNumber - Step number
 * @param {string} description - Step description
 * @param {Object} [data] - Additional step data
 * @returns {AnimationStep}
 */
export function createAnimationStep(stepNumber, description, data = {}) {
  return {
    stepNumber,
    description,
    ...data,
  };
}

/**
 * Create animation metadata
 * @param {string} problemId - Problem ID
 * @param {string} title - Animation title
 * @param {string} algorithm - Algorithm name
 * @param {number} totalSteps - Total steps
 * @returns {AnimationMetadata}
 */
export function createAnimationMetadata(problemId, title, algorithm, totalSteps) {
  return {
    problemId,
    title,
    algorithm,
    totalSteps,
  };
}

/**
 * Calculate step delay from speed
 * @param {number} speed - Playback speed
 * @returns {number} Delay in milliseconds
 */
export function calculateStepDelay(speed) {
  return DEFAULT_STEP_DELAY / speed;
}
