/* Unique Paths — 2-D Dynamic Programming */
BLIND75.register("unique-paths", {
  kidPitch: `
    <p>A robot sits in the top-left corner of a grid and wants to reach the bottom-right corner. It
    can only move <b>right</b> or <b>down</b>. How many different paths are there?</p>
    <p>The trick: the number of ways to reach a square is <b>(ways to the square above) + (ways to
    the square to its left)</b>, because those are the only two squares the robot could have come
    from. The top row and left column each have exactly one way (straight line).</p>`,
  example: `<p>A 3×3 grid has <code>6</code> unique paths from corner to corner.</p>`,
  concepts: [
    {
      name: "Only two ways into a square",
      html: `Since the robot moves only right or down, it can enter a square <b>only</b> from above
        or from the left. So the paths into a square are the sum of the paths into those two
        neighbors.`,
    },
    {
      name: "The edges are easy",
      html: `Any square in the <b>top row</b> or <b>left column</b> has just one path to it — the
        robot goes straight along the edge. Those all start at 1.`,
    },
  ],
  idea: `<b>The plan:</b> Fill a grid where every top-row and left-column cell is 1. Then each inner
    cell <code>dp[i][j] = dp[i-1][j] + dp[i][j-1]</code>. The bottom-right cell is the answer.`,
  code: {
    lang: "python",
    lines: [
      "def uniquePaths(m, n):",
      "    dp = [[1] * n for _ in range(m)]",
      "    for i in range(1, m):",
      "        for j in range(1, n):",
      "            dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      "    return dp[m-1][n-1]",
    ],
  },
  complexity: {
    time: "O(m × n)",
    space: "O(m × n)",
    html: `<p><b>Time O(m·n):</b> we fill each cell of the grid once with a single addition.</p>
      <p><b>Space O(m·n):</b> the grid of counts. (It can be squeezed to one row, O(n).)</p>`,
  },
  steps: [
    {
      narration: `A 3×3 grid. The top row and left column are all <b>1</b> — only one straight path
        to reach each of those.`,
      codeLine: 2,
      panels: [
        { type: "grid", title: "ways to reach each cell", cells: [["1", "1", "1"], ["1", "?", "?"], ["1", "?", "?"]], highlight: { "0,0": "land", "0,1": "land", "0,2": "land", "1,0": "land", "2,0": "land" } },
      ],
    },
    {
      narration: `Middle cell: ways = above (1) + left (1) = <b>2</b>.`,
      codeLine: 5,
      panels: [
        { type: "grid", title: "ways to reach each cell", cells: [["1", "1", "1"], ["1", "2", "?"], ["1", "?", "?"]], highlight: { "0,1": "sunk", "1,0": "sunk", "1,1": "visiting" } },
      ],
    },
    {
      narration: `Next cell (row 1, col 2): above (1) + left (2) = <b>3</b>.`,
      codeLine: 5,
      panels: [
        { type: "grid", title: "ways to reach each cell", cells: [["1", "1", "1"], ["1", "2", "3"], ["1", "?", "?"]], highlight: { "0,2": "sunk", "1,1": "sunk", "1,2": "visiting" } },
      ],
    },
    {
      narration: `Bottom row: (2,1) = above(2) + left(1) = 3, then (2,2) = above(3) + left(3) =
        <b>6</b>.`,
      codeLine: 5,
      panels: [
        { type: "grid", title: "ways to reach each cell", cells: [["1", "1", "1"], ["1", "2", "3"], ["1", "3", "6"]], highlight: { "1,2": "sunk", "2,1": "sunk", "2,2": "visiting" } },
      ],
    },
    {
      narration: `The bottom-right corner shows <b>6</b> — that's the number of unique paths. 🎉`,
      codeLine: 6,
      panels: [
        { type: "grid", title: "ways to reach each cell", cells: [["1", "1", "1"], ["1", "2", "3"], ["1", "3", "6"]], highlight: { "2,2": "sunk" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>6</b>" },
      ],
    },
  ],
});
