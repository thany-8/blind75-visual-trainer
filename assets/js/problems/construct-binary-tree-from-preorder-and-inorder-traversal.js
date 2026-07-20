/* Construct Binary Tree from Preorder and Inorder Traversal — Trees */
BLIND75.register("construct-binary-tree-from-preorder-and-inorder-traversal", {
  kidPitch: `
    <p>You're handed two "readings" of a tree and must rebuild the original tree. <b>Preorder</b>
    reads node-first (root, then left, then right). <b>Inorder</b> reads left-first (left, node,
    right).</p>
    <p>The trick: the <b>first</b> value in preorder is always the <b>root</b>. Find that root
    inside inorder — everything to its <b>left</b> is the left subtree, everything to its <b>right</b>
    is the right subtree. Then repeat the same idea on each half.</p>`,
  example: `<p>preorder = <code>[3,9,20,15,7]</code>, inorder = <code>[9,3,15,20,7]</code> rebuilds
    the tree 3 → (9, 20 → (15, 7)).</p>`,
  concepts: [
    {
      name: "Preorder gives the roots",
      html: `Reading preorder left to right hands you roots in the order you need them: the overall
        root first, then the root of the left subtree, and so on.`,
    },
    {
      name: "Inorder splits left vs right",
      html: `Once you know a subtree's root, its position in inorder cuts the remaining values into
        "everything left of the root" (left subtree) and "everything right" (right subtree).`,
    },
  ],
  idea: `<b>The plan:</b> Take preorder[0] as the root. Find it in inorder at position
    <code>mid</code>. The first <code>mid</code> inorder values form the left subtree; the rest form
    the right. Recurse on each side using the matching slices of preorder.`,
  code: {
    lang: "python",
    lines: [
      "def buildTree(preorder, inorder):",
      "    if not preorder:",
      "        return None",
      "    root = TreeNode(preorder[0])",
      "    mid = inorder.index(preorder[0])",
      "    root.left  = buildTree(preorder[1:mid+1], inorder[:mid])",
      "    root.right = buildTree(preorder[mid+1:], inorder[mid+1:])",
      "    return root",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> with a value→index map for inorder, each node is placed in constant
      time.</p>
      <p><b>Space O(n):</b> the recursion and the rebuilt tree.</p>`,
  },
  steps: [
    {
      narration: `Two readings of the same tree. Preorder's first value is the overall root.`,
      codeLine: 1,
      panels: [
        { type: "array", title: "preorder (root first)", values: [3, 9, 20, 15, 7], labelsBelow: false },
        { type: "array", title: "inorder (left, root, right)", values: [9, 3, 15, 20, 7], labelsBelow: false },
      ],
    },
    {
      narration: `Root = preorder[0] = <b>3</b>. Find 3 in inorder: everything left of it — <b>[9]</b>
        — is the left subtree; everything right — <b>[15,20,7]</b> — is the right subtree.`,
      codeLine: 5,
      panels: [
        { type: "array", title: "inorder", values: [9, 3, 15, 20, 7], labelsBelow: false, highlight: { 0: "good", 1: "cur", 2: "seen", 3: "seen", 4: "seen" } },
        { type: "tree", title: "building", highlight: { 3: "cur" }, root: { v: 3 } },
      ],
    },
    {
      narration: `Left subtree: its only inorder value is <b>[9]</b>, so 9 is a leaf on the left.`,
      codeLine: 6,
      panels: [
        { type: "tree", title: "building", highlight: { 9: "done" }, root: { v: 3, left: { v: 9 } } },
      ],
    },
    {
      narration: `Right subtree: next preorder root is <b>20</b>; in inorder <b>[15,20,7]</b> it splits
        into left <b>[15]</b> and right <b>[7]</b>.`,
      codeLine: 7,
      panels: [
        { type: "tree", title: "building", highlight: { 20: "cur", 15: "done", 7: "done" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
      ],
    },
    {
      narration: `The rebuilt tree is <b>3 → (9, 20 → (15, 7))</b>. 🎉`,
      codeLine: 8,
      panels: [
        { type: "tree", title: "result", highlight: { 3: "done", 9: "done", 20: "done", 15: "done", 7: "done" }, root: { v: 3, left: { v: 9 }, right: { v: 20, left: { v: 15 }, right: { v: 7 } } } },
      ],
    },
  ],
});
