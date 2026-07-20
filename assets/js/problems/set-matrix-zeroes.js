/* Set Matrix Zeroes — Math & Geometry */
BLIND75.register("set-matrix-zeroes", {
  kidPitch: `
    <p>If any cell in a grid is <b>0</b>, set its entire <b>row</b> and <b>column</b> to 0. The
    gotcha: you must use the <i>original</i> zeros, not the new ones you create — otherwise a single
    0 would cascade and wipe out the whole grid.</p>
    <p>The trick: first <b>scan</b> the grid and remember which rows and which columns contain a
    zero. Then, in a second pass, zero out every cell whose row or column was marked.</p>`,
  example: `<p><code>[[1,1,1],[1,0,1],[1,1,1]]</code> → <code>[[1,0,1],[0,0,0],[1,0,1]]</code>.</p>`,
  concepts: [
    {
      name: "Why two passes?",
      html: `If you zeroed rows/columns the moment you saw a 0, those fresh zeros would trigger
        <i>more</i> zeroing. Recording first, then applying, keeps the original zeros authoritative.`,
    },
    {
      name: "Remember rows and columns",
      html: `Store which row indices and column indices had a zero (in sets, or — for O(1) space —
        using the matrix's own first row and column as the notepad).`,
    },
  ],
  idea: `<b>The plan:</b> Pass 1: collect the set of rows and set of columns that contain a zero.
    Pass 2: for every cell, if its row or column is marked, set it to 0.`,
  code: {
    lang: "python",
    lines: [
      "def setZeroes(matrix):",
      "    rows, cols = len(matrix), len(matrix[0])",
      "    zero_rows, zero_cols = set(), set()",
      "    for r in range(rows):",
      "        for c in range(cols):",
      "            if matrix[r][c] == 0:",
      "                zero_rows.add(r); zero_cols.add(c)",
      "    for r in range(rows):",
      "        for c in range(cols):",
      "            if r in zero_rows or c in zero_cols:",
      "                matrix[r][c] = 0",
      "    return matrix",
    ],
  },
  complexity: {
    time: "O(m·n)",
    space: "O(m + n)",
    html: `<p><b>Time O(m·n):</b> two passes over the grid.</p>
      <p><b>Space O(m + n):</b> the sets of zero rows/columns. (This can be squeezed to
      <code>O(1)</code> by using the first row and column as markers.)</p>`,
  },
  steps: [
    {
      narration: `Grid with a single <b>0</b> at (1,1). We must zero its whole row and column.`,
      codeLine: 1,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "1", "1"], ["1", "0", "1"], ["1", "1", "1"]], highlight: { "1,1": "visiting" } },
      ],
    },
    {
      narration: `<b>Pass 1 — record:</b> the zero is at row 1, column 1. Remember: zero_rows = {1},
        zero_cols = {1}.`,
      codeLine: 7,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "1", "1"], ["1", "0", "1"], ["1", "1", "1"]], highlight: { "1,1": "visiting" } },
        { type: "vars", title: "recorded", items: [["zero_rows", "{1}"], ["zero_cols", "{1}"]] },
      ],
    },
    {
      narration: `<b>Pass 2 — apply:</b> any cell in row 1 or column 1 becomes 0.`,
      codeLine: 11,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "0", "1"], ["0", "0", "0"], ["1", "0", "1"]], highlight: { "1,0": "sunk", "1,1": "sunk", "1,2": "sunk", "0,1": "sunk", "2,1": "sunk" } },
      ],
    },
    {
      narration: `Done: row 1 and column 1 are zeroed, using the original 0's location. 🎉`,
      codeLine: 12,
      panels: [
        { type: "grid", title: "result", cells: [["1", "0", "1"], ["0", "0", "0"], ["1", "0", "1"]] },
        { type: "note", tone: "good", title: "answer", html: "[[1,0,1],[0,0,0],[1,0,1]]" },
      ],
    },
  ],
});
