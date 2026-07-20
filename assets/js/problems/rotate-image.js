/* Rotate Image — Math & Geometry */
BLIND75.register("rotate-image", {
  kidPitch: `
    <p>Rotate a square grid <b>90° clockwise</b>, and do it <b>in place</b> (no second grid). The top
    row becomes the right column, and so on.</p>
    <p>The clever trick avoids fiddly index math: first <b>transpose</b> the grid (flip it across its
    top-left-to-bottom-right diagonal, swapping rows and columns), then <b>reverse each row</b>. Those
    two easy steps together equal a 90° clockwise turn.</p>`,
  example: `<p><code>[[1,2,3],[4,5,6],[7,8,9]]</code> → <code>[[7,4,1],[8,5,2],[9,6,3]]</code>.</p>`,
  concepts: [
    {
      name: "Transpose",
      html: `<b>Transposing</b> swaps <code>matrix[i][j]</code> with <code>matrix[j][i]</code> —
        mirroring across the main diagonal. Rows turn into columns.`,
    },
    {
      name: "Then reverse each row",
      html: `After transposing, reversing every row flips left-to-right. Transpose + row-reverse is
        exactly a 90° clockwise rotation — and both steps are done in place.`,
    },
  ],
  idea: `<b>The plan:</b> Transpose the matrix (swap across the diagonal), then reverse each row. No
    extra grid needed.`,
  code: {
    lang: "python",
    lines: [
      "def rotate(matrix):",
      "    n = len(matrix)",
      "    for i in range(n):                 # transpose",
      "        for j in range(i + 1, n):",
      "            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]",
      "    for row in matrix:                 # reverse each row",
      "        row.reverse()",
    ],
  },
  complexity: {
    time: "O(n²)",
    space: "O(1)",
    html: `<p><b>Time O(n²):</b> we touch each of the <code>n²</code> cells a constant number of
      times.</p>
      <p><b>Space O(1):</b> everything is swapped in place — no second grid.</p>`,
  },
  steps: [
    {
      narration: `Start grid. We'll turn it 90° clockwise using two simple steps.`,
      codeLine: 1,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]] },
      ],
    },
    {
      narration: `<b>Step 1 — transpose:</b> mirror across the diagonal, swapping matrix[i][j] with
        matrix[j][i]. Rows become columns.`,
      codeLine: 5,
      panels: [
        { type: "grid", title: "after transpose", cells: [["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"]], highlight: { "0,0": "sunk", "1,1": "sunk", "2,2": "sunk" } },
      ],
    },
    {
      narration: `<b>Step 2 — reverse each row:</b> flip every row left-to-right.`,
      codeLine: 6,
      panels: [
        { type: "grid", title: "after reversing rows", cells: [["7", "4", "1"], ["8", "5", "2"], ["9", "6", "3"]], highlight: { "0,0": "visiting", "0,2": "visiting" } },
      ],
    },
    {
      narration: `The grid is now rotated 90° clockwise: <b>[[7,4,1],[8,5,2],[9,6,3]]</b>. 🎉`,
      codeLine: 7,
      panels: [
        { type: "grid", title: "result", cells: [["7", "4", "1"], ["8", "5", "2"], ["9", "6", "3"]] },
        { type: "note", tone: "good", title: "answer", html: "rotated 90° clockwise, in place" },
      ],
    },
  ],
});
