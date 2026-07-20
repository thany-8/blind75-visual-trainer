/* Clone Graph — Graphs */
BLIND75.register("clone-graph", {
  kidPitch: `
    <p>Make a <b>deep copy</b> of a graph: brand-new nodes that mirror the original's values and
    connections exactly. Changing the copy must never touch the original.</p>
    <p>The trick: walk the graph (DFS) and keep a <b>map from each original node to its copy</b>. The
    map does double duty — it stores the copies <i>and</i> remembers which nodes you've already
    cloned, so cycles (A links to B links back to A) don't send you looping forever.</p>`,
  example: `<p>A 4-node ring 1–2–3–4–1 clones to an identical, separate 4-node ring.</p>`,
  concepts: [
    {
      name: "Deep vs shallow copy",
      html: `A <b>shallow</b> copy would share the same node objects. A <b>deep</b> copy makes new
        objects for every node and re-links them among the copies.`,
    },
    {
      name: "The visited map stops loops",
      html: `Graphs can have cycles, so before cloning a node we check the map. If it's already
        there, we return the existing copy instead of cloning again — no infinite recursion.`,
    },
  ],
  idea: `<b>The plan:</b> DFS from the start node. For each node: if it's already in the map, return
    its copy. Otherwise make a copy, store it in the map, then recursively clone each neighbor and
    attach the clones.`,
  code: {
    lang: "python",
    lines: [
      "def cloneGraph(node):",
      "    if not node: return None",
      "    clones = {}",
      "    def dfs(n):",
      "        if n in clones:",
      "            return clones[n]",
      "        copy = Node(n.val)",
      "        clones[n] = copy",
      "        for nei in n.neighbors:",
      "            copy.neighbors.append(dfs(nei))",
      "        return copy",
      "    return dfs(node)",
    ],
  },
  complexity: {
    time: "O(V + E)",
    space: "O(V)",
    html: `<p><b>Time O(V + E):</b> we visit every node once and walk every edge once.</p>
      <p><b>Space O(V):</b> the map of clones plus the recursion stack.</p>`,
  },
  steps: [
    {
      narration: `The original graph: a ring <b>1 – 2 – 3 – 4 – 1</b>. We'll build a separate, identical
        copy.`,
      codeLine: 1,
      panels: [
        { type: "graph", title: "original", nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], edges: [["1", "2"], ["2", "3"], ["3", "4"], ["4", "1"]] },
        { type: "map", title: "clones (original → copy)", entries: [] },
      ],
    },
    {
      narration: `DFS starts at <b>1</b>: it's not in the map, so make a copy <b>1'</b> and record
        it. Then clone its neighbors.`,
      codeLine: 7,
      panels: [
        { type: "graph", title: "original", nodes: [{ id: "1", cls: "visit" }, { id: "2" }, { id: "3" }, { id: "4" }], edges: [["1", "2"], ["2", "3"], ["3", "4"], ["4", "1"]] },
        { type: "map", title: "clones (original → copy)", entries: [["1", "1'"]], highlightKey: "1" },
      ],
    },
    {
      narration: `Recurse to <b>2</b>, then <b>3</b>, then <b>4</b> — copying each and storing it the
        first time it's seen.`,
      codeLine: 7,
      panels: [
        { type: "graph", title: "original", nodes: [{ id: "1", cls: "done" }, { id: "2", cls: "done" }, { id: "3", cls: "visit" }, { id: "4" }], edges: [["1", "2"], ["2", "3"], ["3", "4"], ["4", "1"]] },
        { type: "map", title: "clones (original → copy)", entries: [["1", "1'"], ["2", "2'"], ["3", "3'"]] },
      ],
    },
    {
      narration: `When 4 links back to <b>1</b>, the map already has 1' — so we reuse it instead of
        looping forever. The copies get wired up to mirror the original.`,
      codeLine: 5,
      panels: [
        { type: "graph", title: "clone", nodes: [{ id: "1", label: "1'", cls: "done" }, { id: "2", label: "2'", cls: "done" }, { id: "3", label: "3'", cls: "done" }, { id: "4", label: "4'", cls: "done" }], edges: [["1", "2"], ["2", "3"], ["3", "4"], ["4", "1"]] },
        { type: "map", title: "clones (original → copy)", entries: [["1", "1'"], ["2", "2'"], ["3", "3'"], ["4", "4'"]] },
      ],
    },
    {
      narration: `We now have a fully separate, identical graph. 🎉`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "a deep copy of the graph (new nodes, same shape)" },
      ],
    },
  ],
});
