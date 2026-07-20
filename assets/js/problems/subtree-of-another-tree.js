/* Subtree of Another Tree — Trees */
BLIND75.register("subtree-of-another-tree", {
  kidPitch: `
    <p>Given a big tree <b>s</b> and a small tree <b>t</b>, is <b>t</b> tucked inside <b>s</b> as a
    <b>subtree</b> — the exact same shape and values, hanging off one of s's nodes?</p>
    <p>The trick: walk through every node of <b>s</b> and, at each one, ask "is the tree starting
    <i>here</i> identical to t?" (that's the "same tree" check). If any node says yes, t is a
    subtree.</p>`,
  example: `<p>s = 3 → (4 → (1, 2), 5), t = 4 → (1, 2). t matches the subtree at node 4 →
    <code>True</code>.</p>`,
  concepts: [
    {
      name: "Reuse 'same tree'",
      html: `We already know how to check if two trees are <b>identical</b> (compare roots, then
        left-with-left and right-with-right). Here we run that check starting from every node of s.`,
    },
    {
      name: "Try every node as the root",
      html: `t could match anywhere, so we recurse through all of s. The first node whose subtree
        equals t proves the answer.`,
    },
  ],
  idea: `<b>The plan:</b> For each node of s, if <code>sameTree(node, t)</code> is true, return true.
    Otherwise keep searching the left and right children.`,
  code: {
    lang: "python",
    lines: [
      "def isSubtree(s, t):",
      "    if not s:",
      "        return False",
      "    if sameTree(s, t):",
      "        return True",
      "    return isSubtree(s.left, t) or isSubtree(s.right, t)",
      "# sameTree: roots equal AND left==left AND right==right",
    ],
  },
  complexity: {
    time: "O(n · m)",
    space: "O(h)",
    html: `<p><b>Time O(n·m):</b> at each of s's <code>n</code> nodes we may compare against t's
      <code>m</code> nodes.</p>
      <p><b>Space O(h):</b> recursion depth up to the height of s.</p>`,
  },
  steps: [
    {
      narration: `Big tree <b>s</b> on the left, target <b>t</b> on the right. Is t a subtree of s?`,
      codeLine: 1,
      panels: [
        { type: "tree", title: "s", root: { v: 3, left: { v: 4, left: { v: 1 }, right: { v: 2 } }, right: { v: 5 } } },
        { type: "tree", title: "t", root: { v: 4, left: { v: 1 }, right: { v: 2 } } },
      ],
    },
    {
      narration: `Start at s's root <b>3</b>. Is the tree here identical to t (whose root is 4)? Roots
        3 ≠ 4 — no. Search deeper.`,
      codeLine: 4,
      panels: [
        { type: "tree", title: "s", highlight: { 3: "visit" }, root: { v: 3, left: { v: 4, left: { v: 1 }, right: { v: 2 } }, right: { v: 5 } } },
        { type: "tree", title: "t", root: { v: 4, left: { v: 1 }, right: { v: 2 } } },
      ],
    },
    {
      narration: `Try node <b>4</b>: is <b>4 → (1, 2)</b> identical to t? Roots match, left 1 = 1,
        right 2 = 2 — <b>yes!</b> 🎉`,
      codeLine: 5,
      panels: [
        { type: "tree", title: "s", highlight: { 4: "done", 1: "done", 2: "done" }, root: { v: 3, left: { v: 4, left: { v: 1 }, right: { v: 2 } }, right: { v: 5 } } },
        { type: "tree", title: "t", highlight: { 4: "done", 1: "done", 2: "done" }, root: { v: 4, left: { v: 1 }, right: { v: 2 } } },
      ],
    },
    {
      narration: `We found t sitting inside s at node 4. Return <b>True</b>.`,
      codeLine: 5,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — t is a subtree of s" },
      ],
    },
  ],
});
