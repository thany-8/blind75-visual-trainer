/* Binary Tree Maximum Path Sum — Trees (Hard) */
BLIND75.register("binary-tree-maximum-path-sum", {
  kidPitch: `
    <p>A <b>path</b> is any connected chain of nodes (it can bend at the top of a hill, but can't
    branch). Find the path whose values add up to the <b>biggest total</b>. The path can start and
    end anywhere.</p>
    <p>The trick: at each node, figure out the best "straight down" total it can offer a parent —
    the node plus the better of its two children's gains (but never negative, since we can skip a
    bad branch). Meanwhile, the best path that <b>bends</b> at a node is node + left gain + right
    gain. Track the biggest bend seen anywhere.</p>`,
  example: `<p>Tree -10 → (9, 20 → (15, 7)): the best path is 15 → 20 → 7 = <b>42</b>.</p>`,
  concepts: [
    {
      name: "Gain vs bending path",
      html: `A node hands its parent a <b>gain</b>: <code>node + max(leftGain, rightGain, 0)</code> —
        a single downward branch. But the <b>answer</b> may bend through a node using
        <b>both</b> branches: <code>node + leftGain + rightGain</code>.`,
    },
    {
      name: "Drop negative branches",
      html: `If a child's gain is negative it only hurts, so we treat it as <b>0</b> — i.e., we just
        don't include that branch.`,
    },
  ],
  idea: `<b>The plan:</b> Recurse. Each node computes leftGain and rightGain (clamped at 0). Update a
    global best with <code>node + leftGain + rightGain</code>, and return <code>node +
    max(leftGain, rightGain)</code> upward.`,
  code: {
    lang: "python",
    lines: [
      "def maxPathSum(root):",
      "    best = float('-inf')",
      "    def gain(node):",
      "        nonlocal best",
      "        if not node:",
      "            return 0",
      "        left = max(gain(node.left), 0)",
      "        right = max(gain(node.right), 0)",
      "        best = max(best, node.val + left + right)",
      "        return node.val + max(left, right)",
      "    gain(root)",
      "    return best",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(h)",
    html: `<p><b>Time O(n):</b> each node is visited once.</p>
      <p><b>Space O(h):</b> recursion stack up to the tree height.</p>`,
  },
  steps: [
    {
      narration: `Find the heaviest connected path. It may bend at a node but can't split into two
        branches going down.`,
      codeLine: 1,
      panels: [
        { type: "tree", title: "tree", root: { v: -10, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
      ],
    },
    {
      narration: `Leaves 15 and 7 each offer a gain of themselves. At node <b>20</b>, the bending
        path uses both: 15 + 20 + 7 = <b>42</b>. Record best = 42.`,
      codeLine: 9,
      panels: [
        { type: "tree", title: "tree", highlight: { 20: "visit", 15: "done", 7: "done" }, root: { v: -10, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "vars", title: "state", items: [["bend@20", 42], ["best", 42]] },
      ],
    },
    {
      narration: `Node 20 hands its parent a gain of 20 + max(15, 7) = <b>27</b> (a single branch,
        not both).`,
      codeLine: 11,
      panels: [
        { type: "tree", title: "tree", highlight: { 20: "done", 15: "done", 7: "done" }, root: { v: -10, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "vars", title: "state", items: [["gain(20)", 27], ["best", 42]] },
      ],
    },
    {
      narration: `At the root <b>-10</b>: even with gains 9 and 27, a path through -10 totals
        9 + (-10) + 27 = 26 — worse than 42. best stays <b>42</b>.`,
      codeLine: 9,
      panels: [
        { type: "tree", title: "tree", highlight: { "-10": "visit", 9: "done", 20: "done" }, root: { v: -10, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "vars", title: "state", items: [["bend@-10", 26], ["best", 42]] },
      ],
    },
    {
      narration: `The maximum path sum is <b>42</b> (15 → 20 → 7). 🎉`,
      codeLine: 12,
      panels: [
        { type: "tree", title: "best path highlighted", highlight: { 20: "done", 15: "done", 7: "done" }, root: { v: -10, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "note", tone: "good", title: "answer", html: "return <b>42</b>" },
      ],
    },
  ],
});
