/* Number of Islands — Graphs */
BLIND75.register("number-of-islands", {
  kidPitch: `
    <p>You're given a map made of squares. <code>1</code> means land, <code>0</code> means water.
    An <b>island</b> is a blob of land squares connected up/down/left/right. Count how many separate
    islands there are.</p>
    <p>The trick: scan the map. Every time you step on a land square you haven't visited, you've
    found a <b>new island</b> — add 1 to the count, then "sink" that entire island (flip all its
    connected land to water) so you never count it twice.</p>`,
  example: `<p>A 3×3 map with land at the top-left blob and one lonely square bottom-right has
    <code>2</code> islands.</p>`,
  concepts: [
    {
      name: "Grid as a graph",
      html: `Each land square is connected to its up/down/left/right land neighbors. Following those
        connections to explore a whole blob is a <b>graph traversal</b>.`,
    },
    {
      name: "Flood fill (DFS)",
      html: `To "sink" an island we use <b>Depth-First Search</b>: stand on a land square, turn it to
        water, then recursively do the same to each land neighbor. It spreads out like spilled paint
        until the whole blob is filled.`,
    },
  ],
  idea: `<b>The plan:</b> Loop over every square. If it's land (<code>1</code>), add one to the
    island count and run a flood fill that sinks the entire connected blob to water. Squares already
    turned to water are skipped, so each island is counted exactly once.`,
  code: {
    lang: "python",
    lines: [
      "def numIslands(grid):",
      "    rows, cols = len(grid), len(grid[0])",
      "    count = 0",
      "    def sink(r, c):",
      "        if not (0 <= r < rows and 0 <= c < cols) or grid[r][c] == '0':",
      "            return",
      "        grid[r][c] = '0'",
      "        sink(r+1, c); sink(r-1, c); sink(r, c+1); sink(r, c-1)",
      "    for r in range(rows):",
      "        for c in range(cols):",
      "            if grid[r][c] == '1':",
      "                count += 1",
      "                sink(r, c)",
      "    return count",
    ],
  },
  complexity: {
    time: "O(rows × cols)",
    space: "O(rows × cols)",
    html: `<p><b>Time O(R×C):</b> every square is looked at a constant number of times.</p>
      <p><b>Space O(R×C):</b> in the worst case (the whole map is one big island) the flood-fill
      recursion can go as deep as the number of squares.</p>`,
  },
  steps: [
    {
      narration: `Our map: yellow squares are land (1), blue are water (0). Island count starts at
        <b>0</b>.`,
      codeLine: 3,
      panels: [
        { type: "grid", title: "grid", cells: [["1", "1", "0"], ["1", "0", "0"], ["0", "0", "1"]], highlight: { "0,0": "land", "0,1": "land", "0,2": "water", "1,0": "land", "1,1": "water", "1,2": "water", "2,0": "water", "2,1": "water", "2,2": "land" } },
        { type: "vars", title: "state", items: [["count", 0]] },
      ],
    },
    {
      narration: `Scanning… the first land square is at the top-left <b>(0,0)</b>. That's a brand-new
        island — <b>count = 1</b>. Time to sink it.`,
      codeLine: 12,
      panels: [
        { type: "grid", title: "grid", cells: [["1", "1", "0"], ["1", "0", "0"], ["0", "0", "1"]], highlight: { "0,0": "visiting", "0,1": "land", "0,2": "water", "1,0": "land", "1,1": "water", "1,2": "water", "2,0": "water", "2,1": "water", "2,2": "land" } },
        { type: "vars", title: "state", items: [["count", 1]] },
      ],
    },
    {
      narration: `Flood fill spreads like paint to every connected land square — <b>(0,0)</b>,
        <b>(0,1)</b>, and <b>(1,0)</b> — turning them all to water so we can't recount them.`,
      codeLine: 8,
      panels: [
        { type: "grid", title: "grid", cells: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "1"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "water", "1,0": "sunk", "1,1": "water", "1,2": "water", "2,0": "water", "2,1": "water", "2,2": "land" } },
        { type: "vars", title: "state", items: [["count", 1]] },
      ],
    },
    {
      narration: `Keep scanning the rest of the map… the next land square is the lonely one at
        <b>(2,2)</b>. New island — <b>count = 2</b>!`,
      codeLine: 12,
      panels: [
        { type: "grid", title: "grid", cells: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "1"]], highlight: { "0,0": "sunk", "0,1": "sunk", "1,0": "sunk", "2,2": "visiting" } },
        { type: "vars", title: "state", items: [["count", 2]] },
      ],
    },
    {
      narration: `Sink it too. It has no land neighbors, so this island is just one square. The whole
        map is now water — nothing left to find.`,
      codeLine: 8,
      panels: [
        { type: "grid", title: "grid", cells: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]], highlight: { "0,0": "sunk", "0,1": "sunk", "1,0": "sunk", "2,2": "sunk" } },
        { type: "vars", title: "state", items: [["count", 2]] },
      ],
    },
    {
      narration: `We counted <b>2</b> separate islands. 🎉`,
      codeLine: 14,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>2</b> islands" },
      ],
    },
  ],
});
