/* Lowest Common Ancestor of a BST — Trees */
BLIND75.register("lowest-common-ancestor-of-a-bst", {
  kidPitch: `
    <p>In a <b>Binary Search Tree</b> (smaller values left, bigger values right), find the
    <b>lowest common ancestor</b> of two nodes — the deepest node that has both of them somewhere
    below it (a node counts as its own ancestor).</p>
    <p>The trick uses the BST order: start at the root. If <b>both</b> targets are smaller, the
    answer is to the left. If both are bigger, go right. The moment they'd split — one left, one
    right (or you're standing on one of them) — <b>that node is the meeting point</b>.</p>`,
  example: `<p>In the BST rooted at 6, the LCA of <b>3</b> and <b>5</b> is <b>4</b>.</p>`,
  concepts: [
    {
      name: "BST ordering",
      html: `Every node's left subtree holds only smaller values, its right subtree only bigger
        ones. That lets us decide which way to go with a single comparison.`,
    },
    {
      name: "The split point is the LCA",
      html: `As long as both targets are on the same side, we descend that way. When they fall on
        different sides (or we land on one of them), we've found the lowest node that contains both.`,
    },
  ],
  idea: `<b>The plan:</b> Walk down from the root. Both targets smaller → go left. Both bigger → go
    right. Otherwise this node is the lowest common ancestor.`,
  code: {
    lang: "python",
    lines: [
      "def lowestCommonAncestor(root, p, q):",
      "    node = root",
      "    while node:",
      "        if p.val < node.val and q.val < node.val:",
      "            node = node.left",
      "        elif p.val > node.val and q.val > node.val:",
      "            node = node.right",
      "        else:",
      "            return node",
    ],
  },
  complexity: {
    time: "O(h)",
    space: "O(1)",
    html: `<p><b>Time O(h):</b> we take one path down the tree, so at most its height
      <code>h</code> steps (about <code>log n</code> for a balanced BST).</p>
      <p><b>Space O(1):</b> just a single moving pointer.</p>`,
  },
  steps: [
    {
      narration: `BST rooted at <b>6</b>. Find the lowest common ancestor of <b>3</b> and <b>5</b>.`,
      codeLine: 2,
      panels: [
        { type: "tree", title: "BST", highlight: { 3: "cur", 5: "cur" }, root: { v: 6, left: { v: 2, left: { v: 0 }, right: { v: 4, left: { v: 3 }, right: { v: 5 } } }, right: { v: 8, left: { v: 7 }, right: { v: 9 } } } },
      ],
    },
    {
      narration: `At <b>6</b>: both 3 and 5 are smaller than 6, so both are on the left. Go left.`,
      codeLine: 5,
      panels: [
        { type: "tree", title: "BST", highlight: { 6: "visit", 3: "cur", 5: "cur" }, root: { v: 6, left: { v: 2, left: { v: 0 }, right: { v: 4, left: { v: 3 }, right: { v: 5 } } }, right: { v: 8, left: { v: 7 }, right: { v: 9 } } } },
      ],
    },
    {
      narration: `At <b>2</b>: both 3 and 5 are bigger than 2. Go right.`,
      codeLine: 7,
      panels: [
        { type: "tree", title: "BST", highlight: { 2: "visit", 3: "cur", 5: "cur" }, root: { v: 6, left: { v: 2, left: { v: 0 }, right: { v: 4, left: { v: 3 }, right: { v: 5 } } }, right: { v: 8, left: { v: 7 }, right: { v: 9 } } } },
      ],
    },
    {
      narration: `At <b>4</b>: 3 is smaller and 5 is bigger — they split here! So <b>4</b> is the lowest
        common ancestor. 🎉`,
      codeLine: 9,
      panels: [
        { type: "tree", title: "BST", highlight: { 4: "done", 3: "cur", 5: "cur" }, root: { v: 6, left: { v: 2, left: { v: 0 }, right: { v: 4, left: { v: 3 }, right: { v: 5 } } }, right: { v: 8, left: { v: 7 }, right: { v: 9 } } } },
        { type: "note", tone: "good", title: "answer", html: "LCA = <b>4</b>" },
      ],
    },
  ],
});
