/* Same Tree — Trees */
BLIND75.register("same-tree", {
  kidPitch: `
    <p>You're given <b>two</b> trees. Are they <b>exactly the same</b> — identical shape <i>and</i>
    identical values in every matching spot?</p>
    <p>The trick: compare them <b>node by node, together</b>. Check the two roots. If they match,
    ask the same question about their left children, and about their right children. If any pair
    disagrees — different value, or one exists where the other is empty — they're not the same.</p>`,
  example: `<p>Two trees both shaped <code>1 → (2, 3)</code> with the same numbers → <code>True</code>.</p>`,
  concepts: [
    {
      name: "Two things can be 'empty' too",
      html: `A missing child counts. If <b>both</b> spots are empty, that part matches. If <b>one</b>
        is empty and the other isn't, the shapes differ → not the same.`,
    },
    {
      name: "Walk both trees in lockstep",
      html: `We move through both trees at the same time, always comparing the <b>same position</b>
        in each. This paired recursion is the whole idea.`,
    },
  ],
  idea: `<b>The plan:</b> If both nodes are empty → match. If exactly one is empty, or their values
    differ → not the same. Otherwise, recursively check left-with-left and right-with-right; both
    must match.`,
  code: {
    lang: "python",
    lines: [
      "def isSameTree(p, q):",
      "    if not p and not q:",
      "        return True",
      "    if not p or not q or p.val != q.val:",
      "        return False",
      "    return (isSameTree(p.left, q.left) and",
      "            isSameTree(p.right, q.right))",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(h)",
    html: `<p><b>Time O(n):</b> we compare each matching pair of nodes once.</p>
      <p><b>Space O(h):</b> recursion depth equals the height of the trees.</p>`,
  },
  steps: [
    {
      narration: `Two trees, <b>p</b> and <b>q</b>. We'll compare them position by position.`,
      codeLine: 1,
      panels: [
        { type: "tree", title: "p", root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
        { type: "tree", title: "q", root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
      ],
    },
    {
      narration: `Compare the roots: <b>1</b> vs <b>1</b>. Equal ✅. Now check their children.`,
      codeLine: 4,
      panels: [
        { type: "tree", title: "p", highlight: { 1: "visit" }, root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
        { type: "tree", title: "q", highlight: { 1: "visit" }, root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
      ],
    },
    {
      narration: `Left children: <b>2</b> vs <b>2</b>. Equal ✅.`,
      codeLine: 4,
      panels: [
        { type: "tree", title: "p", highlight: { 1: "done", 2: "visit" }, root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
        { type: "tree", title: "q", highlight: { 1: "done", 2: "visit" }, root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
      ],
    },
    {
      narration: `Right children: <b>3</b> vs <b>3</b>. Equal ✅. Every pair matched.`,
      codeLine: 4,
      panels: [
        { type: "tree", title: "p", highlight: { 1: "done", 2: "done", 3: "visit" }, root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
        { type: "tree", title: "q", highlight: { 1: "done", 2: "done", 3: "visit" }, root: { v: 1, left: { v: 2 }, right: { v: 3 } } },
      ],
    },
    {
      narration: `Same shape, same values everywhere. Return <b>True</b>. 🎉`,
      codeLine: 6,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — identical trees" },
      ],
    },
  ],
});
