/**
 * Animation Types and Interfaces
 *
 * This file defines the core data structures for the animation engine.
 * All animation-related types are defined here for consistency.
 */

export interface ArrayElement {
  value: any;
  index: number;
  state?: string;
  label?: string;
}

export interface Pointer {
  index: number;
  name: string;
  color?: string;
}

export interface Variable {
  name: string;
  value: any;
  type?: string;
}

export interface CodeHighlight {
  line: number;
  startCol?: number;
  endCol?: number;
}

export interface AnimationStep {
  stepNumber: number;
  description: string;
  array?: ArrayElement[];
  pointers?: Pointer[];
  variables?: Variable[];
  highlight?: CodeHighlight;
  operation?: string;
  customData?: Record<string, any>;
  // Additional properties for different visualizations
  queue?: any[];
  visited?: any[];
  wordList?: string[];
  graph?: any;
  pathFound?: any[];
  grid?: any[][];
  rows?: any[][];
  position?: any;
  readingRow?: number;
  finalResult?: string;
}

export interface AnimationMetadata {
  problemId: string;
  title: string;
  algorithm: string;
  complexity?: string;
  totalSteps: number;
}

export interface AnimationConfig {
  speed: number;
  autoPlay?: boolean;
  loop?: boolean;
  stepDelay?: number;
}

export interface AnimationState {
  steps: AnimationStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  config: AnimationConfig;
  metadata?: AnimationMetadata;
}

/**
 * Playback speeds available
 */
export const PLAYBACK_SPEEDS = {
  VERY_SLOW: 0.25,
  SLOW: 0.5,
  NORMAL: 1,
  FAST: 1.5,
  VERY_FAST: 2,
} as const;

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
} as const;

/**
 * Pointer colors (Tailwind classes)
 */
export const POINTER_COLORS = {
  PRIMARY: 'text-blue-500',
  SECONDARY: 'text-green-500',
  TERTIARY: 'text-purple-500',
  WARNING: 'text-yellow-500',
  DANGER: 'text-red-500',
} as const;

/**
 * Create a new array element
 */
export function createArrayElement(
  value: any,
  index: number,
  state: string = ELEMENT_STATES.DEFAULT
): ArrayElement {
  return {
    value,
    index,
    state,
  };
}

/**
 * Create a new pointer
 */
export function createPointer(
  name: string,
  index: number,
  color: string = POINTER_COLORS.PRIMARY
): Pointer {
  return {
    name,
    index,
    color,
  };
}

/**
 * Create a new variable
 */
export function createVariable(
  name: string,
  value: any,
  type: string = 'auto'
): Variable {
  return {
    name,
    value,
    type,
  };
}

/**
 * Create a new animation step
 */
export function createAnimationStep(
  stepNumber: number,
  description: string,
  data: Partial<AnimationStep> = {}
): AnimationStep {
  return {
    stepNumber,
    description,
    ...data,
  };
}

/**
 * Create animation metadata
 */
export function createAnimationMetadata(
  problemId: string,
  title: string,
  algorithm: string,
  totalSteps: number
): AnimationMetadata {
  return {
    problemId,
    title,
    algorithm,
    totalSteps,
  };
}

/**
 * Calculate step delay from speed
 */
export function calculateStepDelay(speed: number): number {
  return DEFAULT_STEP_DELAY / speed;
}
