/**
 * Helper functions for creating seed data
 */

/**
 * Create an array element for visualization
 */
export const createArrayElement = (value: any, index: number, state = 'default') => ({
  value,
  index,
  state,
});

/**
 * Create a pointer for visualization
 */
export const createPointer = (name: string, index: number) => ({
  name,
  index,
});

/**
 * Create a variable for display
 */
export const createVariable = (name: string, value: any) => ({
  name,
  value,
});

/**
 * Create an array of array elements from simple values
 */
export const createArray = (values: any[], states?: string[]) =>
  values.map((value, index) => createArrayElement(value, index, states?.[index] || 'default'));

/**
 * Create a graph node
 */
export const createGraphNode = (
  id: string,
  label: string,
  level: number,
  state = 'default'
) => ({
  id,
  label,
  level,
  state,
});

/**
 * Create a graph edge
 */
export const createGraphEdge = (from: string, to: string, state = 'default') => ({
  from,
  to,
  state,
});

/**
 * Create a zigzag grid item
 */
export const createGridItem = (char: string, row: number, col: number, state = 'default') => ({
  char,
  row,
  col,
  state,
});

/**
 * Create a row for zigzag visualization
 */
export const createRow = (rowIndex: number, content: string, state = 'waiting') => ({
  rowIndex,
  content,
  state,
});

/**
 * Create a queue item for BFS
 */
export const createQueueItem = (word: string, level: number, state = 'waiting') => ({
  word,
  level,
  state,
});

/**
 * Create a word list item
 */
export const createWordListItem = (word: string, state = 'available') => ({
  word,
  state,
});
