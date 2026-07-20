/* Number of Connected Components in an Undirected Graph — Graphs */
BLIND75.register("number-of-connected-components-in-an-undirected-graph", {
  kidPitch: `
    <p>You have <b>n</b> dots and some lines connecting them. A <b>connected component</b> is a
    cluster of dots all linked together (directly or through others). Count how many separate
    clusters there are.</p>
    <p>The trick is <b>Union-Find</b>: start with every dot in its own group. For each connecting
    line, <b>union</b> the two dots' groups. Every time two <i>different</i> groups merge, the total
    number of groups drops by one.</p>`,
  example: `<p>n = 5, edges <code>[[0,1],[1,2],[3,4]]</code> → clusters {0,1,2} and {3,4} →
    <code>2</code> components.</p>`,
  concepts: [
    {
      name: "Union-Find (Disjoint Set)",
      html: `Each group has a "leader." <b>find</b> follows parent pointers up to the leader;
        <b>union</b> makes one leader point to the other, merging the groups.`,
    },
    {
      name: "Counting down",
      html: `Start the count at <code>n</code> (everyone alone). Each successful union (joining two
        <i>different</i> groups) reduces the count by 1. Edges within the same group don't change it.`,
    },
  ],
  idea: `<b>The plan:</b> Initialize <code>count = n</code> and each node as its own parent. For every
    edge, find both endpoints' leaders; if they differ, union them and decrement <code>count</code>.
    The final count is the number of components.`,
  code: {
    lang: "python",
    lines: [
      "def countComponents(n, edges):",
      "    parent = list(range(n))",
      "    def find(x):",
      "        while parent[x] != x:",
      "            parent[x] = parent[parent[x]]",
      "            x = parent[x]",
      "        return x",
      "    count = n",
      "    for a, b in edges:",
      "        ra, rb = find(a), find(b)",
      "        if ra != rb:",
      "            parent[ra] = rb",
      "            count -= 1",
      "    return count",
    ],
  },
  complexity: {
    time: "O(V + E·α)",
    space: "O(V)",
    html: `<p><b>Time:</b> nearly linear — with path compression, each find/union is almost
      <code>O(1)</code> (the inverse-Ackermann <code>α</code> is tiny).</p>
      <p><b>Space O(V):</b> the parent array.</p>`,
  },
  steps: [
    {
      narration: `5 dots, edges [[0,1],[1,2],[3,4]]. Every dot starts alone → count = <b>5</b>.`,
      codeLine: 8,
      panels: [
        { type: "graph", title: "graph", nodes: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], edges: [["0", "1"], ["1", "2"], ["3", "4"]] },
        { type: "vars", title: "state", items: [["count", 5]] },
      ],
    },
    {
      narration: `Edge 0–1 joins two different groups → merge, count drops to <b>4</b>. Edge 1–2
        merges 2 in → count <b>3</b>.`,
      codeLine: 13,
      panels: [
        { type: "graph", title: "graph", nodes: [{ id: "0", cls: "done" }, { id: "1", cls: "done" }, { id: "2", cls: "done" }, { id: "3" }, { id: "4" }], edges: [["0", "1"], ["1", "2"], ["3", "4"]] },
        { type: "vars", title: "state", items: [["count", 3]] },
      ],
    },
    {
      narration: `Edge 3–4 joins another pair → count drops to <b>2</b>. Now clusters are {0,1,2} and
        {3,4}.`,
      codeLine: 13,
      panels: [
        { type: "graph", title: "graph", nodes: [{ id: "0", cls: "done" }, { id: "1", cls: "done" }, { id: "2", cls: "done" }, { id: "3", cls: "visit" }, { id: "4", cls: "visit" }], edges: [["0", "1"], ["1", "2"], ["3", "4"]] },
        { type: "vars", title: "state", items: [["count", 2]] },
      ],
    },
    {
      narration: `No edges left. There are <b>2</b> connected components. 🎉`,
      codeLine: 14,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>2</b>" },
      ],
    },
  ],
});
