/* Pacific Atlantic Water Flow — Graphs */
BLIND75.register("pacific-atlantic-water-flow", {
  kidPitch: `
    <p>A grid of heights is an island. The <b>Pacific</b> ocean touches the top and left edges; the
    <b>Atlantic</b> touches the bottom and right edges. Rain flows from a cell to neighbors of
    <b>equal or lower</b> height. Find the cells from which water can reach <b>both</b> oceans.</p>
    <p>The trick: don't simulate flowing <i>down</i> from every cell (slow). Instead, start at each
    ocean's edge and flow <b>uphill</b> (to equal-or-higher neighbors), marking every cell that ocean
    can reach. The answer is the cells reachable by <b>both</b> floods.</p>`,
  example: `<p>Cells that can drain to the Pacific and the Atlantic at the same time — usually along
    a ridge — are the answer.</p>`,
  concepts: [
    {
      name: "Reverse the flow",
      html: `Water flows downhill, but it's easier to ask "which cells can the ocean climb up to?"
        Starting from the borders and moving to <b>higher-or-equal</b> cells reaches exactly the
        cells that could drain back to that ocean.`,
    },
    {
      name: "Intersection of two floods",
      html: `Run one flood inward from the Pacific edges and another from the Atlantic edges. Cells
        touched by <b>both</b> floods can send water to both oceans.`,
    },
  ],
  idea: `<b>The plan:</b> DFS/BFS inward from the Pacific border cells (moving to ≥ height neighbors)
    and mark them. Do the same from the Atlantic border. Return every cell marked by both.`,
  code: {
    lang: "python",
    lines: [
      "def pacificAtlantic(heights):",
      "    R, C = len(heights), len(heights[0])",
      "    pac, atl = set(), set()",
      "    def dfs(r, c, seen, prev):",
      "        if ((r, c) in seen or r < 0 or c < 0 or r >= R",
      "                or c >= C or heights[r][c] < prev):",
      "            return",
      "        seen.add((r, c))",
      "        for nr, nc in neighbors(r, c):",
      "            dfs(nr, nc, seen, heights[r][c])",
      "    for c in range(C):",
      "        dfs(0, c, pac, 0); dfs(R-1, c, atl, 0)",
      "    for r in range(R):",
      "        dfs(r, 0, pac, 0); dfs(r, C-1, atl, 0)",
      "    return [list(x) for x in pac & atl]",
    ],
  },
  complexity: {
    time: "O(R·C)",
    space: "O(R·C)",
    html: `<p><b>Time O(R·C):</b> each cell is visited at most twice (once per ocean flood).</p>
      <p><b>Space O(R·C):</b> the two sets of reachable cells.</p>`,
  },
  steps: [
    {
      narration: `Heights grid. Pacific hugs the top & left; Atlantic hugs the bottom & right.`,
      codeLine: 1,
      panels: [
        { type: "grid", title: "heights", cells: [["1", "2", "2", "3", "5"], ["3", "2", "3", "4", "4"], ["2", "4", "5", "3", "1"], ["6", "7", "1", "4", "5"], ["5", "1", "1", "2", "4"]] },
      ],
    },
    {
      narration: `Flood <b>uphill</b> from the Pacific edges (top row + left column), marking every
        cell it can climb to.`,
      codeLine: 12,
      panels: [
        { type: "grid", title: "reaches Pacific", cells: [["1", "2", "2", "3", "5"], ["3", "2", "3", "4", "4"], ["2", "4", "5", "3", "1"], ["6", "7", "1", "4", "5"], ["5", "1", "1", "2", "4"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "sunk", "0,3": "sunk", "0,4": "sunk", "1,0": "sunk", "2,0": "sunk", "3,0": "sunk", "3,1": "sunk", "4,0": "sunk" } },
      ],
    },
    {
      narration: `Flood uphill from the Atlantic edges (bottom row + right column) too, marking its
        reachable cells.`,
      codeLine: 14,
      panels: [
        { type: "grid", title: "reaches Atlantic", cells: [["1", "2", "2", "3", "5"], ["3", "2", "3", "4", "4"], ["2", "4", "5", "3", "1"], ["6", "7", "1", "4", "5"], ["5", "1", "1", "2", "4"]], highlight: { "0,4": "sunk", "1,3": "sunk", "1,4": "sunk", "2,2": "sunk", "3,0": "sunk", "3,1": "sunk", "3,4": "sunk", "4,0": "sunk", "4,3": "sunk", "4,4": "sunk" } },
      ],
    },
    {
      narration: `The answer is the cells touched by <b>both</b> floods — they can drain to either
        ocean. 🎉`,
      codeLine: 15,
      panels: [
        { type: "grid", title: "reaches BOTH", cells: [["1", "2", "2", "3", "5"], ["3", "2", "3", "4", "4"], ["2", "4", "5", "3", "1"], ["6", "7", "1", "4", "5"], ["5", "1", "1", "2", "4"]], highlight: { "0,4": "visiting", "1,3": "visiting", "1,4": "visiting", "2,2": "visiting", "3,0": "visiting", "3,1": "visiting", "4,0": "visiting" } },
        { type: "note", tone: "good", title: "answer", html: "the highlighted ridge cells reach both oceans" },
      ],
    },
  ],
});
