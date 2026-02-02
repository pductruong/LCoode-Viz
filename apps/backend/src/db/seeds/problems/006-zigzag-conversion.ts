import { ProblemSeedData } from '../types';
import { createGridItem, createRow, createVariable } from '../helpers';

export const zigzagConversionProblem: ProblemSeedData = {
  id: 'zigzag-conversion',
  title: '6. Zigzag Conversion',
  difficulty: 'Medium',
  categories: ['String', 'Pattern'],
  description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows.',
  visualizationType: 'zigzag',
  examples: [
    {
      input: { s: 'PAYPALISHIRING', numRows: 3 },
      output: 'PAHNAPLSIIGYIR',
    },
  ],
  constraints: ['1 <= s.length <= 1000', 's consists of English letters'],
  solutions: [
    {
      name: 'Row-by-Row Approach',
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
      steps: [
        {
          stepNumber: 1,
          description: 'Initialize 3 empty rows for zigzag pattern',
          rows: [
            createRow(0, '', 'waiting'),
            createRow(1, '', 'waiting'),
            createRow(2, '', 'waiting'),
          ],
          grid: [],
          variables: [
            createVariable('currentRow', 0),
            createVariable('goingDown', false),
            createVariable('processed', 0),
          ],
        },
        {
          stepNumber: 2,
          description: 'Add "P" to row 0, change direction (now going down)',
          rows: [
            createRow(0, 'P', 'active'),
            createRow(1, '', 'waiting'),
            createRow(2, '', 'waiting'),
          ],
          grid: [createGridItem('P', 0, 0, 'added')],
          position: { row: 0, col: 0 },
          variables: [
            createVariable('currentRow', 0),
            createVariable('goingDown', true),
            createVariable('processed', 1),
          ],
        },
        {
          stepNumber: 3,
          description: 'Add "A" to row 1',
          rows: [
            createRow(0, 'P', 'complete'),
            createRow(1, 'A', 'active'),
            createRow(2, '', 'waiting'),
          ],
          grid: [
            createGridItem('P', 0, 0, 'placed'),
            createGridItem('A', 1, 1, 'added'),
          ],
          position: { row: 1, col: 1 },
          variables: [
            createVariable('currentRow', 1),
            createVariable('goingDown', true),
            createVariable('processed', 2),
          ],
        },
        {
          stepNumber: 4,
          description: 'Add "Y" to row 2, change direction (now going up)',
          rows: [
            createRow(0, 'P', 'complete'),
            createRow(1, 'A', 'complete'),
            createRow(2, 'Y', 'active'),
          ],
          grid: [
            createGridItem('P', 0, 0, 'placed'),
            createGridItem('A', 1, 1, 'placed'),
            createGridItem('Y', 2, 2, 'added'),
          ],
          position: { row: 2, col: 2 },
          variables: [
            createVariable('currentRow', 2),
            createVariable('goingDown', false),
            createVariable('processed', 3),
          ],
        },
        {
          stepNumber: 5,
          description: 'Continue pattern: "PAYP" → "APLS" → "YI"',
          rows: [
            createRow(0, 'PAYP', 'complete'),
            createRow(1, 'APLS', 'complete'),
            createRow(2, 'YI', 'active'),
          ],
          grid: [
            createGridItem('P', 0, 0, 'placed'),
            createGridItem('A', 1, 1, 'placed'),
            createGridItem('Y', 2, 2, 'placed'),
            createGridItem('P', 1, 3, 'placed'),
            createGridItem('A', 0, 4, 'placed'),
            createGridItem('L', 1, 5, 'placed'),
            createGridItem('I', 2, 6, 'added'),
            createGridItem('S', 1, 7, 'placed'),
          ],
          position: { row: 2, col: 6 },
          variables: [
            createVariable('currentRow', 2),
            createVariable('processed', 8),
          ],
        },
        {
          stepNumber: 6,
          description: 'All characters placed in zigzag pattern',
          rows: [
            createRow(0, 'PAHN', 'complete'),
            createRow(1, 'APLSIIG', 'complete'),
            createRow(2, 'YIR', 'complete'),
          ],
          grid: [
            createGridItem('P', 0, 0, 'placed'),
            createGridItem('A', 1, 1, 'placed'),
            createGridItem('Y', 2, 2, 'placed'),
            createGridItem('P', 1, 3, 'placed'),
            createGridItem('A', 0, 4, 'placed'),
            createGridItem('L', 1, 5, 'placed'),
            createGridItem('I', 2, 6, 'placed'),
            createGridItem('S', 1, 7, 'placed'),
            createGridItem('H', 0, 8, 'placed'),
            createGridItem('I', 1, 9, 'placed'),
            createGridItem('R', 2, 10, 'placed'),
            createGridItem('I', 1, 11, 'placed'),
            createGridItem('N', 0, 12, 'placed'),
            createGridItem('G', 1, 13, 'placed'),
          ],
          variables: [createVariable('processed', 14)],
        },
        {
          stepNumber: 7,
          description: 'Read row 0: "PAHN"',
          rows: [
            createRow(0, 'PAHN', 'reading'),
            createRow(1, 'APLSIIG', 'waiting'),
            createRow(2, 'YIR', 'waiting'),
          ],
          grid: [
            createGridItem('P', 0, 0, 'reading'),
            createGridItem('A', 1, 1, 'placed'),
            createGridItem('Y', 2, 2, 'placed'),
            createGridItem('P', 1, 3, 'placed'),
            createGridItem('A', 0, 4, 'reading'),
            createGridItem('L', 1, 5, 'placed'),
            createGridItem('I', 2, 6, 'placed'),
            createGridItem('S', 1, 7, 'placed'),
            createGridItem('H', 0, 8, 'reading'),
            createGridItem('I', 1, 9, 'placed'),
            createGridItem('R', 2, 10, 'placed'),
            createGridItem('I', 1, 11, 'placed'),
            createGridItem('N', 0, 12, 'reading'),
            createGridItem('G', 1, 13, 'placed'),
          ],
          readingRow: 0,
          variables: [createVariable('result', 'PAHN')],
        },
        {
          stepNumber: 8,
          description: 'Read row 1: "APLSIIG"',
          rows: [
            createRow(0, 'PAHN', 'complete'),
            createRow(1, 'APLSIIG', 'reading'),
            createRow(2, 'YIR', 'waiting'),
          ],
          grid: [
            createGridItem('P', 0, 0, 'complete'),
            createGridItem('A', 1, 1, 'reading'),
            createGridItem('Y', 2, 2, 'placed'),
            createGridItem('P', 1, 3, 'reading'),
            createGridItem('A', 0, 4, 'complete'),
            createGridItem('L', 1, 5, 'reading'),
            createGridItem('I', 2, 6, 'placed'),
            createGridItem('S', 1, 7, 'reading'),
            createGridItem('H', 0, 8, 'complete'),
            createGridItem('I', 1, 9, 'reading'),
            createGridItem('R', 2, 10, 'placed'),
            createGridItem('I', 1, 11, 'reading'),
            createGridItem('N', 0, 12, 'complete'),
            createGridItem('G', 1, 13, 'reading'),
          ],
          readingRow: 1,
          variables: [createVariable('result', 'PAHNAPLSIIG')],
        },
        {
          stepNumber: 9,
          description: 'Read row 2: "YIR" - Complete!',
          rows: [
            createRow(0, 'PAHN', 'complete'),
            createRow(1, 'APLSIIG', 'complete'),
            createRow(2, 'YIR', 'reading'),
          ],
          grid: [
            createGridItem('P', 0, 0, 'complete'),
            createGridItem('A', 1, 1, 'complete'),
            createGridItem('Y', 2, 2, 'reading'),
            createGridItem('P', 1, 3, 'complete'),
            createGridItem('A', 0, 4, 'complete'),
            createGridItem('L', 1, 5, 'complete'),
            createGridItem('I', 2, 6, 'reading'),
            createGridItem('S', 1, 7, 'complete'),
            createGridItem('H', 0, 8, 'complete'),
            createGridItem('I', 1, 9, 'complete'),
            createGridItem('R', 2, 10, 'reading'),
            createGridItem('I', 1, 11, 'complete'),
            createGridItem('N', 0, 12, 'complete'),
            createGridItem('G', 1, 13, 'complete'),
          ],
          readingRow: 2,
          finalResult: 'PAHNAPLSIIGYIR',
          variables: [createVariable('result', 'PAHNAPLSIIGYIR')],
        },
      ],
      explanation: 'Visit characters in zigzag order and append to respective rows',
    },
  ],
};
