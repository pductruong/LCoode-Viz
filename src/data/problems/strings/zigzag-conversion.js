/**
 * LeetCode 6. Zigzag Conversion
 *
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows
 * like this: (you may want to display this pattern in a fixed-width font for better legibility)
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * And then read line by line: "PAHNAPLSIIGYIR"
 */

export const zigzagConversion = {
  id: 'zigzag-conversion',
  number: 6,
  title: '6. Zigzag Conversion',
  difficulty: 'Medium',
  categories: ['String'],
  visualizationType: 'zigzag',

  description: `
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:

\`\`\`
P   A   H   N
A P L S I I G
Y   I   R
\`\`\`

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows.
  `.trim(),

  examples: [
    {
      input: { s: 'PAYPALISHIRING', numRows: 3 },
      output: 'PAHNAPLSIIGYIR',
      explanation: `
P   A   H   N
A P L S I I G
Y   I   R

Read row by row: "PAHNAPLSIIGYIR"
      `.trim()
    },
    {
      input: { s: 'PAYPALISHIRING', numRows: 4 },
      output: 'PINALSIGYAHRPI',
      explanation: `
P     I    N
A   L S  I G
Y A   H R
P     I

Read row by row: "PINALSIGYAHRPI"
      `.trim()
    },
    {
      input: { s: 'A', numRows: 1 },
      output: 'A'
    }
  ],

  constraints: [
    '1 <= s.length <= 1000',
    's consists of English letters (lower-case and upper-case), \',\' and \'.\'',
    '1 <= numRows <= 1000'
  ],

  solutions: [
    {
      id: 'row-by-row',
      language: 'javascript',
      title: 'Row-by-Row Approach',
      code: `function convert(s, numRows) {
  if (numRows === 1) return s;

  const rows = Array(numRows).fill('');
  let currentRow = 0;
  let goingDown = false;

  for (const char of s) {
    rows[currentRow] += char;

    // Change direction at top and bottom rows
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  return rows.join('');
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      explanation: 'n is the length of the string. We visit each character once and store them in rows.',

      // Animation steps for example: "PAYPALISHIRING", numRows = 3
      steps: [
        {
          stepNumber: 0,
          description: 'Initialize: Create 3 empty rows, start at row 0, direction is down',
          operation: 'Initialize',
          highlight: { line: 3 },
          variables: [
            { name: 's', value: 'PAYPALISHIRING' },
            { name: 'numRows', value: 3 },
            { name: 'currentRow', value: 0 },
            { name: 'goingDown', value: false },
          ],
          rows: [
            { rowIndex: 0, content: '', state: 'current' },
            { rowIndex: 1, content: '', state: 'default' },
            { rowIndex: 2, content: '', state: 'default' },
          ],
          grid: [],
          position: { row: 0, col: 0 }
        },
        {
          stepNumber: 1,
          description: 'Process "P" (index 0): Add to row 0. At top, change direction to down',
          operation: 'Add character',
          highlight: { line: 7 },
          variables: [
            { name: 'char', value: 'P' },
            { name: 'currentRow', value: 0 },
            { name: 'goingDown', value: true },
          ],
          rows: [
            { rowIndex: 0, content: 'P', state: 'active' },
            { rowIndex: 1, content: '', state: 'default' },
            { rowIndex: 2, content: '', state: 'default' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'added' }
          ],
          position: { row: 0, col: 0 }
        },
        {
          stepNumber: 2,
          description: 'Process "A" (index 1): Add to row 1. Going down, move to next row',
          operation: 'Add character',
          highlight: { line: 7 },
          variables: [
            { name: 'char', value: 'A' },
            { name: 'currentRow', value: 1 },
            { name: 'goingDown', value: true },
          ],
          rows: [
            { rowIndex: 0, content: 'P', state: 'default' },
            { rowIndex: 1, content: 'A', state: 'active' },
            { rowIndex: 2, content: '', state: 'default' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'placed' },
            { char: 'A', row: 1, col: 0, state: 'added' }
          ],
          position: { row: 1, col: 0 }
        },
        {
          stepNumber: 3,
          description: 'Process "Y" (index 2): Add to row 2. At bottom, change direction to up',
          operation: 'Add character',
          highlight: { line: 10 },
          variables: [
            { name: 'char', value: 'Y' },
            { name: 'currentRow', value: 2 },
            { name: 'goingDown', value: false },
          ],
          rows: [
            { rowIndex: 0, content: 'P', state: 'default' },
            { rowIndex: 1, content: 'A', state: 'default' },
            { rowIndex: 2, content: 'Y', state: 'active' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'placed' },
            { char: 'A', row: 1, col: 0, state: 'placed' },
            { char: 'Y', row: 2, col: 0, state: 'added' }
          ],
          position: { row: 2, col: 0 }
        },
        {
          stepNumber: 4,
          description: 'Process "P" (index 3): Add to row 1. Going up, move to previous row',
          operation: 'Add character',
          highlight: { line: 7 },
          variables: [
            { name: 'char', value: 'P' },
            { name: 'currentRow', value: 1 },
            { name: 'goingDown', value: false },
          ],
          rows: [
            { rowIndex: 0, content: 'P', state: 'default' },
            { rowIndex: 1, content: 'AP', state: 'active' },
            { rowIndex: 2, content: 'Y', state: 'default' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'placed' },
            { char: 'A', row: 1, col: 0, state: 'placed' },
            { char: 'Y', row: 2, col: 0, state: 'placed' },
            { char: 'P', row: 1, col: 1, state: 'added' }
          ],
          position: { row: 1, col: 1 }
        },
        {
          stepNumber: 5,
          description: 'Process "A" (index 4): Add to row 0. At top, change direction to down',
          operation: 'Add character',
          highlight: { line: 10 },
          variables: [
            { name: 'char', value: 'A' },
            { name: 'currentRow', value: 0 },
            { name: 'goingDown', value: true },
          ],
          rows: [
            { rowIndex: 0, content: 'PA', state: 'active' },
            { rowIndex: 1, content: 'AP', state: 'default' },
            { rowIndex: 2, content: 'Y', state: 'default' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'placed' },
            { char: 'A', row: 1, col: 0, state: 'placed' },
            { char: 'Y', row: 2, col: 0, state: 'placed' },
            { char: 'P', row: 1, col: 1, state: 'placed' },
            { char: 'A', row: 0, col: 2, state: 'added' }
          ],
          position: { row: 0, col: 2 }
        },
        {
          stepNumber: 6,
          description: 'Process "L" (index 5): Add to row 1. Going down',
          operation: 'Add character',
          highlight: { line: 7 },
          variables: [
            { name: 'char', value: 'L' },
            { name: 'currentRow', value: 1 },
            { name: 'goingDown', value: true },
          ],
          rows: [
            { rowIndex: 0, content: 'PA', state: 'default' },
            { rowIndex: 1, content: 'APL', state: 'active' },
            { rowIndex: 2, content: 'Y', state: 'default' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'placed' },
            { char: 'A', row: 1, col: 0, state: 'placed' },
            { char: 'Y', row: 2, col: 0, state: 'placed' },
            { char: 'P', row: 1, col: 1, state: 'placed' },
            { char: 'A', row: 0, col: 2, state: 'placed' },
            { char: 'L', row: 1, col: 2, state: 'added' }
          ],
          position: { row: 1, col: 2 }
        },
        {
          stepNumber: 7,
          description: 'Process "I" (index 6): Add to row 2. At bottom, change direction to up',
          operation: 'Add character',
          highlight: { line: 10 },
          variables: [
            { name: 'char', value: 'I' },
            { name: 'currentRow', value: 2 },
            { name: 'goingDown', value: false },
          ],
          rows: [
            { rowIndex: 0, content: 'PA', state: 'default' },
            { rowIndex: 1, content: 'APL', state: 'default' },
            { rowIndex: 2, content: 'YI', state: 'active' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'placed' },
            { char: 'A', row: 1, col: 0, state: 'placed' },
            { char: 'Y', row: 2, col: 0, state: 'placed' },
            { char: 'P', row: 1, col: 1, state: 'placed' },
            { char: 'A', row: 0, col: 2, state: 'placed' },
            { char: 'L', row: 1, col: 2, state: 'placed' },
            { char: 'I', row: 2, col: 2, state: 'added' }
          ],
          position: { row: 2, col: 2 }
        },
        {
          stepNumber: 8,
          description: 'Continue pattern: S→row1, H→row0, I→row1, R→row2, I→row1, N→row0',
          operation: 'Add remaining characters',
          highlight: { line: 7 },
          variables: [
            { name: 'processed', value: 'PAYPALISHIRING' },
            { name: 'remaining', value: 6 },
          ],
          rows: [
            { rowIndex: 0, content: 'PAHN', state: 'default' },
            { rowIndex: 1, content: 'APLSIIG', state: 'default' },
            { rowIndex: 2, content: 'YIR', state: 'default' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'placed' },
            { char: 'A', row: 1, col: 0, state: 'placed' },
            { char: 'Y', row: 2, col: 0, state: 'placed' },
            { char: 'P', row: 1, col: 1, state: 'placed' },
            { char: 'A', row: 0, col: 2, state: 'placed' },
            { char: 'L', row: 1, col: 2, state: 'placed' },
            { char: 'I', row: 2, col: 2, state: 'placed' },
            { char: 'S', row: 1, col: 3, state: 'placed' },
            { char: 'H', row: 0, col: 4, state: 'placed' },
            { char: 'I', row: 1, col: 4, state: 'placed' },
            { char: 'R', row: 2, col: 4, state: 'placed' },
            { char: 'I', row: 1, col: 5, state: 'placed' },
            { char: 'N', row: 0, col: 6, state: 'placed' },
            { char: 'G', row: 1, col: 6, state: 'added' }
          ],
          position: { row: 1, col: 6 }
        },
        {
          stepNumber: 9,
          description: 'All characters placed in zigzag pattern. Now read row by row',
          operation: 'Pattern complete',
          highlight: { line: 16 },
          variables: [
            { name: 'rows[0]', value: 'PAHN' },
            { name: 'rows[1]', value: 'APLSIIG' },
            { name: 'rows[2]', value: 'YIR' },
          ],
          rows: [
            { rowIndex: 0, content: 'PAHN', state: 'complete' },
            { rowIndex: 1, content: 'APLSIIG', state: 'complete' },
            { rowIndex: 2, content: 'YIR', state: 'complete' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'complete' },
            { char: 'A', row: 1, col: 0, state: 'complete' },
            { char: 'Y', row: 2, col: 0, state: 'complete' },
            { char: 'P', row: 1, col: 1, state: 'complete' },
            { char: 'A', row: 0, col: 2, state: 'complete' },
            { char: 'L', row: 1, col: 2, state: 'complete' },
            { char: 'I', row: 2, col: 2, state: 'complete' },
            { char: 'S', row: 1, col: 3, state: 'complete' },
            { char: 'H', row: 0, col: 4, state: 'complete' },
            { char: 'I', row: 1, col: 4, state: 'complete' },
            { char: 'R', row: 2, col: 4, state: 'complete' },
            { char: 'I', row: 1, col: 5, state: 'complete' },
            { char: 'N', row: 0, col: 6, state: 'complete' },
            { char: 'G', row: 1, col: 6, state: 'complete' }
          ],
          position: null
        },
        {
          stepNumber: 10,
          description: 'Read row 0: "PAHN"',
          operation: 'Read row 0',
          highlight: { line: 16 },
          variables: [
            { name: 'result', value: 'PAHN' },
          ],
          rows: [
            { rowIndex: 0, content: 'PAHN', state: 'reading' },
            { rowIndex: 1, content: 'APLSIIG', state: 'waiting' },
            { rowIndex: 2, content: 'YIR', state: 'waiting' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'reading' },
            { char: 'A', row: 1, col: 0, state: 'complete' },
            { char: 'Y', row: 2, col: 0, state: 'complete' },
            { char: 'P', row: 1, col: 1, state: 'complete' },
            { char: 'A', row: 0, col: 2, state: 'reading' },
            { char: 'L', row: 1, col: 2, state: 'complete' },
            { char: 'I', row: 2, col: 2, state: 'complete' },
            { char: 'S', row: 1, col: 3, state: 'complete' },
            { char: 'H', row: 0, col: 4, state: 'reading' },
            { char: 'I', row: 1, col: 4, state: 'complete' },
            { char: 'R', row: 2, col: 4, state: 'complete' },
            { char: 'I', row: 1, col: 5, state: 'complete' },
            { char: 'N', row: 0, col: 6, state: 'reading' },
            { char: 'G', row: 1, col: 6, state: 'complete' }
          ],
          readingRow: 0
        },
        {
          stepNumber: 11,
          description: 'Read row 1: "APLSIIG"',
          operation: 'Read row 1',
          highlight: { line: 16 },
          variables: [
            { name: 'result', value: 'PAHNAPLSIIG' },
          ],
          rows: [
            { rowIndex: 0, content: 'PAHN', state: 'complete' },
            { rowIndex: 1, content: 'APLSIIG', state: 'reading' },
            { rowIndex: 2, content: 'YIR', state: 'waiting' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'complete' },
            { char: 'A', row: 1, col: 0, state: 'reading' },
            { char: 'Y', row: 2, col: 0, state: 'complete' },
            { char: 'P', row: 1, col: 1, state: 'reading' },
            { char: 'A', row: 0, col: 2, state: 'complete' },
            { char: 'L', row: 1, col: 2, state: 'reading' },
            { char: 'I', row: 2, col: 2, state: 'complete' },
            { char: 'S', row: 1, col: 3, state: 'reading' },
            { char: 'H', row: 0, col: 4, state: 'complete' },
            { char: 'I', row: 1, col: 4, state: 'reading' },
            { char: 'R', row: 2, col: 4, state: 'complete' },
            { char: 'I', row: 1, col: 5, state: 'reading' },
            { char: 'N', row: 0, col: 6, state: 'complete' },
            { char: 'G', row: 1, col: 6, state: 'reading' }
          ],
          readingRow: 1
        },
        {
          stepNumber: 12,
          description: 'Read row 2: "YIR". Complete! Result: "PAHNAPLSIIGYIR"',
          operation: 'Complete',
          highlight: { line: 16 },
          variables: [
            { name: 'result', value: 'PAHNAPLSIIGYIR' },
          ],
          rows: [
            { rowIndex: 0, content: 'PAHN', state: 'complete' },
            { rowIndex: 1, content: 'APLSIIG', state: 'complete' },
            { rowIndex: 2, content: 'YIR', state: 'reading' },
          ],
          grid: [
            { char: 'P', row: 0, col: 0, state: 'result' },
            { char: 'A', row: 1, col: 0, state: 'result' },
            { char: 'Y', row: 2, col: 0, state: 'reading' },
            { char: 'P', row: 1, col: 1, state: 'result' },
            { char: 'A', row: 0, col: 2, state: 'result' },
            { char: 'L', row: 1, col: 2, state: 'result' },
            { char: 'I', row: 2, col: 2, state: 'reading' },
            { char: 'S', row: 1, col: 3, state: 'result' },
            { char: 'H', row: 0, col: 4, state: 'result' },
            { char: 'I', row: 1, col: 4, state: 'result' },
            { char: 'R', row: 2, col: 4, state: 'reading' },
            { char: 'I', row: 1, col: 5, state: 'result' },
            { char: 'N', row: 0, col: 6, state: 'result' },
            { char: 'G', row: 1, col: 6, state: 'result' }
          ],
          readingRow: 2,
          finalResult: 'PAHNAPLSIIGYIR'
        }
      ]
    }
  ]
};

export default zigzagConversion;
