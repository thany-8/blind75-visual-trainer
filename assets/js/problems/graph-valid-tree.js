/* Graph Valid Tree — Graphs */
BLIND75.register("graph-valid-tree", {
  kidPitch: `
    <p>Given <b>n</b> dots and some connecting lines, is the graph a valid <b>tree</b>? A tree is a
    graph that is <b>fully connected</b> (you can reach every dot) and has <b>no cycles</b> (no loops).</p>
    <p>The trick uses a neat fact: a valid tree on <code>n</code> dots has <b>exactly n − 1</b> lines.
    So first check the count. Then, using Union-Find, make sure no line ever connects two dots that
    are <b>already</b> in the same group — that would be a cycle.</p>`,
  example: `<p>n = 5, edges <code>[[0,1],[0,2],[0,3],[1,4]]</code> → connected, no cycle →
    <code>True</code>.</p>`,
  concepts: [
    {
      name: "The n − 1 edge rule",
      html: `Fewer than <code>n − 1</code> edges can't connect everything; more than <code>n − 1</code>
        guarantees a cycle. So a tree has <b>exactly</b> <code>n − 1</code> edges — a quick first
        test.`,
    },
    {
      name: "No repeated union = no cycle",
      html: `With Union-Find, if an edge's two endpoints already share a leader, joining them would
        form a loop. With exactly <code>n − 1</code> edges and no such loop, the graph must also be
        connected.`,
    },
  ],
  idea: `<b>The plan:</b> If the edge count isn't <code>n − 1</code>, return False. Otherwise union
    each edge; if any edge connects two nodes already in the same set, there's a cycle → False. Survive
    all edges → it's a tree.`,
  code: {
    lang: "python",
    lines: [
      "def validTree(n, edges):",
      "    if len(edges) != n - 1:",
      "        return False        # tree needs exactly n-1 edges",
      "    parent = list(range(n))",
      "    def find(x):",
      "        while parent[x] != x: x = parent[x]",
      "        return x",
      "    for a, b in edges:",
      "        ra, rb = find(a), find(b)",
      "        if ra == rb: return False   # cycle!",
      "        parent[ra] = rb",
      "    return True             # n-1 edges + no cycle = connected tree",
    ],
  },
  complexity: {
    time: "O(V + E·α)",
    space: "O(V)",
    html: `<p><b>Time:</b> near-linear with Union-Find (path compression makes find/union almost
      constant).</p>
      <p><b>Space O(V):</b> the parent array.</p>`,
  },
  steps: [
    {
      narration: `n = 5 dots, 4 edges. Is this a tree (connected, no loops)?`,
      codeLine: 1,
      panels: [
        { type: "graph", title: "graph", nodes: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], edges: [["0", "1"], ["0", "2"], ["0", "3"], ["1", "4"]] },
      ],
    },
    {
      narration: `First test: edge count = 4 = n − 1 = 4. ✅ Passes the quick count check.`,
      codeLine: 2,
      panels: [
        { type: "graph", title: "graph", nodes: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], edges: [["0", "1"], ["0", "2"], ["0", "3"], ["1", "4"]] },
        { type: "vars", title: "check", items: [["edges", 4], ["n − 1", 4]] },
      ],
    },
    {
      narration: `Union each edge. Every edge joins two <b>different</b> groups — no edge ever links
        two dots already connected, so there's <b>no cycle</b>.`,
      codeLine: 10,
      panels: [
        { type: "graph", title: "graph", nodes: [{ id: "0", cls: "done" }, { id: "1", cls: "done" }, { id: "2", cls: "done" }, { id: "3", cls: "done" }, { id: "4", cls: "done" }], edges: [["0", "1"], ["0", "2"], ["0", "3"], ["1", "4"]] },
      ],
    },
    {
      narration: `Exactly n − 1 edges and no cycle → everything is connected in one piece. It's a
        valid tree → <b>True</b>. 🎉`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b>" },
      ],
    },
  ],
});
