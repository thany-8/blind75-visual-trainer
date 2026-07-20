/* Maximum Depth of Binary Tree — Trees */
BLIND75.register("maximum-depth-of-binary-tree", {
  kidPitch: `
    <p>A binary tree has a top node (the <b>root</b>) and branches going down. The <b>depth</b> (or
    height) is how many levels there are — the length of the <b>longest path</b> from the root down
    to a leaf.</p>
    <p>The trick uses <b>recursion</b>: the depth of any tree is <b>1 (for the current node) + the
    deeper of its two children's depths</b>. An empty spot has depth 0. Ask each child the same
    question and combine.</p>`,
  example: `<p>Root 3 → children 9 and 20 → 20 has children 15 and 7. The longest path is
    3 → 20 → 15 (or 7), which is <code>3</code> levels deep.</p>`,
  concepts: [
    {
      name: "Leaf, level, depth",
      html: `A <b>leaf</b> is a node with no children. A tree's <b>depth</b> is the number of nodes
        on the longest root-to-leaf path. A single node has depth 1; nothing (empty) has depth 0.`,
    },
    {
      name: "Recursion on trees",
      html: `The same question — "how deep are you?" — is asked of every node. Because each child is
        itself the root of a smaller tree, the same rule solves it. The answers bubble back up from
        the leaves.`,
    },
  ],
  idea: `<b>The plan:</b> If the node is empty, its depth is 0. Otherwise, find the depth of the left
    subtree and the right subtree, take the bigger one, and add 1 for the current node.`,
  code: {
    lang: "python",
    lines: [
      "def maxDepth(root):",
      "    if not root:",
      "        return 0",
      "    left = maxDepth(root.left)",
      "    right = maxDepth(root.right)",
      "    return 1 + max(left, right)",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(h)",
    html: `<p><b>Time O(n):</b> we ask the depth question at each of the <code>n</code> nodes once.</p>
      <p><b>Space O(h):</b> the recursion goes as deep as the tree is tall (<code>h</code>).</p>`,
  },
  steps: [
    {
      narration: `Our tree. We want the longest path from the root <b>3</b> down to a leaf.`,
      codeLine: 1,
      panels: [
        { type: "tree", title: "tree", root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
      ],
    },
    {
      narration: `Start at the bottom. The leaves <b>9</b>, <b>15</b>, and <b>7</b> have no children,
        so each has depth <b>1</b> (just themselves).`,
      codeLine: 6,
      panels: [
        { type: "tree", title: "tree", highlight: { 9: "done", 15: "done", 7: "done" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "vars", title: "depths", items: [["node 9", 1], ["node 15", 1], ["node 7", 1]] },
      ],
    },
    {
      narration: `Node <b>20</b>: deeper child is max(1, 1) = 1, plus 1 for itself = <b>2</b>.`,
      codeLine: 6,
      panels: [
        { type: "tree", title: "tree", highlight: { 20: "visit", 15: "done", 7: "done" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "vars", title: "depths", items: [["node 20", 2], ["node 9", 1]] },
      ],
    },
    {
      narration: `Now the root <b>3</b>: its left child (9) is depth 1, its right child (20) is depth
        2. Take the bigger, 2, plus 1 for the root = <b>3</b>.`,
      codeLine: 6,
      panels: [
        { type: "tree", title: "tree", highlight: { 3: "visit", 20: "done", 9: "done", 15: "done", 7: "done" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
        { type: "vars", title: "depths", items: [["left (9)", 1], ["right (20)", 2], ["root (3)", 3]] },
      ],
    },
    {
      narration: `The maximum depth is <b>3</b>. 🎉`,
      codeLine: 6,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>3</b>" },
      ],
    },
  ],
});
