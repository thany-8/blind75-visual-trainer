/* Spiral Matrix — Math & Geometry */
BLIND75.register("spiral-matrix", {
  kidPitch: `
    <p>Read all the numbers of a grid in a <b>spiral</b> — like water swirling down a drain: across
    the top, down the right side, along the bottom, up the left, then inward and repeat.</p>
    <p>The trick: keep four walls — <b>top</b>, <b>bottom</b>, <b>left</b>, <b>right</b>. Walk one
    edge, then move that wall inward so you never re-read it. Keep spiraling until the walls cross.</p>`,
  example: `<p><code>[[1,2,3],[4,5,6],[7,8,9]]</code> → <code>[1,2,3,6,9,8,7,4,5]</code>.</p>`,
  concepts: [
    {
      name: "Four shrinking walls",
      html: `<b>top</b> and <b>bottom</b> are row limits; <b>left</b> and <b>right</b> are column
        limits. After finishing an edge we pull that wall in by one, shrinking the box we still have
        to read.`,
    },
    {
      name: "The four moves, in order",
      html: `Each loop: go <b>right</b> across the top, <b>down</b> the right, <b>left</b> across the
        bottom, <b>up</b> the left. Then repeat on the smaller inner box.`,
    },
  ],
  idea: `<b>The plan:</b> While the walls haven't crossed: read the top row (left→right) and lower the
    top wall; read the right column and pull the right wall in; if rows remain, read the bottom row
    (right→left) and raise the bottom wall; if columns remain, read the left column and push the
    left wall in.`,
  code: {
    lang: "python",
    lines: [
      "def spiralOrder(matrix):",
      "    res = []",
      "    top, bottom = 0, len(matrix) - 1",
      "    left, right = 0, len(matrix[0]) - 1",
      "    while top <= bottom and left <= right:",
      "        for j in range(left, right + 1): res.append(matrix[top][j])",
      "        top += 1",
      "        for i in range(top, bottom + 1): res.append(matrix[i][right])",
      "        right -= 1",
      "        if top <= bottom:",
      "            for j in range(right, left-1, -1): res.append(matrix[bottom][j])",
      "            bottom -= 1",
      "        if left <= right:",
      "            for i in range(bottom, top-1, -1): res.append(matrix[i][left])",
      "            left += 1",
      "    return res",
    ],
  },
  complexity: {
    time: "O(m × n)",
    space: "O(1)",
    html: `<p><b>Time O(m·n):</b> every cell is read exactly once.</p>
      <p><b>Space O(1):</b> just four wall variables (the output list aside).</p>`,
  },
  steps: [
    {
      narration: `The grid. We'll read it in a spiral, starting at the top-left.`,
      codeLine: 4,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]] },
        { type: "note", title: "result", html: "[ ]" },
      ],
    },
    {
      narration: `Across the <b>top row</b>, left→right: <b>1, 2, 3</b>. Then move the top wall down.`,
      codeLine: 6,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "visiting" } },
        { type: "note", title: "result", html: "[1, 2, 3]" },
      ],
    },
    {
      narration: `Down the <b>right column</b>: <b>6, 9</b>. Then pull the right wall in.`,
      codeLine: 8,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "sunk", "1,2": "sunk", "2,2": "visiting" } },
        { type: "note", title: "result", html: "[1, 2, 3, 6, 9]" },
      ],
    },
    {
      narration: `Along the <b>bottom row</b>, right→left: <b>8, 7</b>. Raise the bottom wall.`,
      codeLine: 11,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "sunk", "1,2": "sunk", "2,2": "sunk", "2,1": "sunk", "2,0": "visiting" } },
        { type: "note", title: "result", html: "[1, 2, 3, 6, 9, 8, 7]" },
      ],
    },
    {
      narration: `Up the <b>left column</b>: <b>4</b>. Then the only cell left in the center: <b>5</b>.`,
      codeLine: 14,
      panels: [
        { type: "grid", title: "matrix", cells: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "sunk", "1,2": "sunk", "2,2": "sunk", "2,1": "sunk", "2,0": "sunk", "1,0": "sunk", "1,1": "visiting" } },
        { type: "note", title: "result", html: "[1, 2, 3, 6, 9, 8, 7, 4, 5]" },
      ],
    },
    {
      narration: `Every cell read in spiral order: <b>[1, 2, 3, 6, 9, 8, 7, 4, 5]</b>. 🎉`,
      codeLine: 16,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "[1, 2, 3, 6, 9, 8, 7, 4, 5]" },
      ],
    },
  ],
});
