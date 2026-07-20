/* Binary Tree Level Order Traversal — Trees (BFS) */
BLIND75.register("binary-tree-level-order-traversal", {
  kidPitch: `
    <p>Read a tree <b>level by level</b>, top to bottom, left to right — like reading rows of a
    theater. The result is a list of rows: <code>[[3], [9, 20], [15, 7]]</code>.</p>
    <p>The trick is a <b>queue</b> — a waiting line. Put the root in line. Then repeatedly: take
    everyone currently in line (that's one whole level), read them, and add their children to the
    back of the line for the next round.</p>`,
  example: `<p>Tree 3 → (9, 20) → 20 → (15, 7) gives <code>[[3], [9, 20], [15, 7]]</code>.</p>`,
  concepts: [
    {
      name: "What is a queue?",
      html: `A <b>queue</b> is a line at a shop: First In, First Out (FIFO). You join at the
        <b>back</b> and get served from the <b>front</b> — the opposite of a stack.`,
    },
    {
      name: "Breadth-First Search (BFS)",
      html: `Exploring a tree/graph level by level (nearest first) is <b>BFS</b>. A queue makes it
        work: children you discover wait their turn behind the current level.`,
    },
    {
      name: "One level at a time",
      html: `Before starting a level, we note <b>how many</b> nodes are in line right now. We pop
        exactly that many — they form the current row — and their kids become the next row.`,
    },
  ],
  idea: `<b>The plan:</b> Start with the root in the queue. While the queue isn't empty: record its
    current size <code>k</code>, pop <code>k</code> nodes into one level list (adding each node's
    children to the back), then save that level.`,
  code: {
    lang: "python",
    lines: [
      "def levelOrder(root):",
      "    if not root: return []",
      "    res, queue = [], deque([root])",
      "    while queue:",
      "        level = []",
      "        for _ in range(len(queue)):",
      "            node = queue.popleft()",
      "            level.append(node.val)",
      "            if node.left: queue.append(node.left)",
      "            if node.right: queue.append(node.right)",
      "        res.append(level)",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> every node is enqueued and dequeued exactly once.</p>
      <p><b>Space O(n):</b> the queue can hold up to a whole level, which for the bottom of a full
      tree is about half the nodes.</p>`,
  },
  steps: [
    {
      narration: `Put the root <b>3</b> in the queue (the waiting line). Result starts empty.`,
      codeLine: 3,
      panels: [
        { type: "tree", title: "tree", highlight: { 3: "visit" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "array", title: "queue (front → back)", values: [3], labelsBelow: false },
        { type: "note", title: "result", html: "[ ]" },
      ],
    },
    {
      narration: `The line has 1 node — that's this level. Pop <b>3</b>, read it, and add its children
        <b>9</b> and <b>20</b> to the back. Level = [3].`,
      codeLine: 7,
      panels: [
        { type: "tree", title: "tree", highlight: { 3: "done", 9: "visit", 20: "visit" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "array", title: "queue (front → back)", values: [9, 20], labelsBelow: false },
        { type: "note", title: "result", html: "[ <b>[3]</b> ]" },
      ],
    },
    {
      narration: `Line now has 2 nodes — the next level. Pop <b>9</b> (no children), then <b>20</b>
        (add its kids 15 and 7). Level = [9, 20].`,
      codeLine: 7,
      panels: [
        { type: "tree", title: "tree", highlight: { 3: "done", 9: "done", 20: "done", 15: "visit", 7: "visit" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "array", title: "queue (front → back)", values: [15, 7], labelsBelow: false },
        { type: "note", title: "result", html: "[ [3], <b>[9, 20]</b> ]" },
      ],
    },
    {
      narration: `Line has 2 nodes. Pop <b>15</b> and <b>7</b> — both leaves, no children to add.
        Level = [15, 7]. The queue is now empty.`,
      codeLine: 11,
      panels: [
        { type: "tree", title: "tree", highlight: { 3: "done", 9: "done", 20: "done", 15: "done", 7: "done" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "array", title: "queue (front → back)", values: [], labelsBelow: false },
        { type: "note", title: "result", html: "[ [3], [9, 20], <b>[15, 7]</b> ]" },
      ],
    },
    {
      narration: `Queue empty → done. The level-order reading is <b>[[3], [9, 20], [15, 7]]</b>. 🎉`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>[[3], [9, 20], [15, 7]]</b>" },
      ],
    },
  ],
});
