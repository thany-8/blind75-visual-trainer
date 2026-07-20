/* Invert Binary Tree — Trees */
BLIND75.register("invert-binary-tree", {
  kidPitch: `
    <p>A <b>binary tree</b> is like an upside-down family tree: a top node (the <b>root</b>), and
    each node can have a <b>left</b> child and a <b>right</b> child. "Inverting" it means holding it
    up to a <b>mirror</b> — every left child swaps places with its right child, all the way down.</p>
    <p>The trick is beautifully simple: at each node, <b>swap its two children</b>, then do the
    exact same thing to each child. That "do the same thing to each child" is called
    <b>recursion</b>.</p>`,
  example: `<p>Root 4 with children (2, 7) becomes (7, 2), and so on down every branch.</p>`,
  concepts: [
    {
      name: "Binary tree words",
      html: `The top node is the <b>root</b>. Each node points to a <b>left</b> and <b>right</b>
        child (either can be empty). A node with no children is a <b>leaf</b>.`,
    },
    {
      name: "Recursion",
      html: `<b>Recursion</b> is when a function calls <i>itself</i> on a smaller piece. "Invert this
        tree" = "swap the root's kids, then invert the left subtree, then invert the right subtree."
        Each subtree is just a smaller tree, so the same rule works.`,
    },
  ],
  idea: `<b>The plan:</b> If the node is empty, do nothing. Otherwise swap its left and right
    children, then recursively invert the left child and the right child. When every node has
    swapped, the whole tree is mirrored.`,
  code: {
    lang: "python",
    lines: [
      "def invertTree(root):",
      "    if not root:",
      "        return None",
      "    root.left, root.right = root.right, root.left",
      "    invertTree(root.left)",
      "    invertTree(root.right)",
      "    return root",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(h)",
    html: `<p><b>Time O(n):</b> we visit every one of the <code>n</code> nodes once to swap it.</p>
      <p><b>Space O(h):</b> recursion stacks up as deep as the tree is tall (<code>h</code>). For a
      balanced tree that's about <code>log n</code>; for a skinny tree it can be <code>n</code>.</p>`,
  },
  steps: [
    {
      narration: `Here's our tree. Root <b>4</b> has children <b>2</b> (left) and <b>7</b> (right).
        We'll mirror the whole thing.`,
      codeLine: 1,
      panels: [
        { type: "tree", title: "tree", root: { v: 4, left: { v: 2, left: { v: 1 }, right: { v: 3 } }, right: { v: 7, left: { v: 6 }, right: { v: 9 } } } },
      ],
    },
    {
      narration: `At the root <b>4</b>: swap its children. Now <b>7</b> is on the left and <b>2</b>
        is on the right.`,
      codeLine: 4,
      panels: [
        { type: "tree", title: "tree", highlight: { 4: "swap" }, root: { v: 4, left: { v: 7, left: { v: 6 }, right: { v: 9 } }, right: { v: 2, left: { v: 1 }, right: { v: 3 } } } },
      ],
    },
    {
      narration: `Recurse into the left child <b>7</b>: swap <i>its</i> children. <b>6</b> and
        <b>9</b> trade places → 9 on the left, 6 on the right.`,
      codeLine: 4,
      panels: [
        { type: "tree", title: "tree", highlight: { 7: "swap", 4: "done" }, root: { v: 4, left: { v: 7, left: { v: 9 }, right: { v: 6 } }, right: { v: 2, left: { v: 1 }, right: { v: 3 } } } },
      ],
    },
    {
      narration: `Now recurse into the right child <b>2</b>: swap its children. <b>1</b> and <b>3</b>
        trade places → 3 on the left, 1 on the right.`,
      codeLine: 4,
      panels: [
        { type: "tree", title: "tree", highlight: { 2: "swap", 4: "done", 7: "done" }, root: { v: 4, left: { v: 7, left: { v: 9 }, right: { v: 6 } }, right: { v: 2, left: { v: 3 }, right: { v: 1 } } } },
      ],
    },
    {
      narration: `The leaves (9, 6, 3, 1) have no children, so there's nothing left to swap. The
        whole tree is now a perfect mirror image. 🎉`,
      codeLine: 7,
      panels: [
        { type: "tree", title: "inverted tree", highlight: { 4: "done", 7: "done", 2: "done", 9: "done", 6: "done", 3: "done", 1: "done" }, root: { v: 4, left: { v: 7, left: { v: 9 }, right: { v: 6 } }, right: { v: 2, left: { v: 3 }, right: { v: 1 } } } },
      ],
    },
  ],
});
