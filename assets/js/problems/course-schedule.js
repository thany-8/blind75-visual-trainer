/* Course Schedule — Graphs */
BLIND75.register("course-schedule", {
  kidPitch: `
    <p>You have courses to take, and some have <b>prerequisites</b> ("take course 0 before course
    1"). Can you finish <b>all</b> of them? The only thing that makes it impossible is a
    <b>circular</b> dependency — A needs B which needs A.</p>
    <p>The trick: picture courses as dots and "must come before" as arrows. The question becomes: does
    this arrow-diagram have a <b>cycle</b>? If yes, impossible. If no cycle, there's a valid order.</p>`,
  example: `<p>4 courses with prereqs 0→1→2→3 (a straight chain) → <code>True</code>. Add 3→0 and
    it loops → <code>False</code>.</p>`,
  concepts: [
    {
      name: "Directed graph",
      html: `Each course is a node; a prerequisite is a one-way <b>arrow</b> (0 → 1 means "0 before
        1"). This is a <b>directed</b> graph.`,
    },
    {
      name: "Cycle = impossible; DFS states",
      html: `We DFS marking nodes <b>visiting</b> (in progress) or <b>done</b>. If we reach a node
        that's still "visiting," we've looped back on ourselves — a cycle — so the schedule can't be
        finished.`,
    },
  ],
  idea: `<b>The plan:</b> Build the prereq graph. DFS each course, coloring it "visiting" then "done."
    If DFS ever hits a "visiting" node again, there's a cycle → return False. No cycles → True.`,
  code: {
    lang: "python",
    lines: [
      "def canFinish(numCourses, prerequisites):",
      "    graph = {i: [] for i in range(numCourses)}",
      "    for course, pre in prerequisites:",
      "        graph[pre].append(course)",
      "    state = [0] * numCourses    # 0=unseen 1=visiting 2=done",
      "    def dfs(c):",
      "        if state[c] == 1: return False   # cycle!",
      "        if state[c] == 2: return True",
      "        state[c] = 1",
      "        for nxt in graph[c]:",
      "            if not dfs(nxt): return False",
      "        state[c] = 2",
      "        return True",
      "    return all(dfs(c) for c in range(numCourses))",
    ],
  },
  complexity: {
    time: "O(V + E)",
    space: "O(V + E)",
    html: `<p><b>Time O(V + E):</b> each course and each prerequisite edge is examined once.</p>
      <p><b>Space O(V + E):</b> the graph plus the recursion/state arrays.</p>`,
  },
  steps: [
    {
      narration: `4 courses. Prerequisites become arrows: 0→1, 1→2, 2→3 (do the arrow's tail before
        its head).`,
      codeLine: 4,
      panels: [
        { type: "graph", title: "prereqs", directed: true, nodes: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }], edges: [["0", "1"], ["1", "2"], ["2", "3"]] },
      ],
    },
    {
      narration: `DFS from 0, coloring nodes <b>visiting</b> as we go deeper: 0 → 1 → 2 → 3. No arrow
        ever points back to a node we're still visiting.`,
      codeLine: 8,
      panels: [
        { type: "graph", title: "prereqs", directed: true, nodes: [{ id: "0", cls: "visit" }, { id: "1", cls: "visit" }, { id: "2", cls: "visit" }, { id: "3", cls: "cur" }], edges: [["0", "1"], ["1", "2"], ["2", "3"]] },
      ],
    },
    {
      narration: `No cycle found — so a valid order exists (for example <b>0, 1, 2, 3</b>). Every
        course can be finished.`,
      codeLine: 12,
      panels: [
        { type: "graph", title: "prereqs", directed: true, nodes: [{ id: "0", cls: "done" }, { id: "1", cls: "done" }, { id: "2", cls: "done" }, { id: "3", cls: "done" }], edges: [["0", "1"], ["1", "2"], ["2", "3"]] },
        { type: "note", title: "order", html: "0 → 1 → 2 → 3" },
      ],
    },
    {
      narration: `Return <b>True</b>. (If an arrow looped back — say 3 → 0 — DFS would revisit a
        "visiting" node and return False.) 🎉`,
      codeLine: 14,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — all courses finishable" },
      ],
    },
  ],
});
