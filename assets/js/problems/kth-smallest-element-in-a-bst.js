/* Kth Smallest Element in a BST — Trees */
BLIND75.register("kth-smallest-element-in-a-bst", {
  kidPitch: `
    <p>Find the <b>k-th smallest</b> value in a Binary Search Tree. In the BST below, the 3rd
    smallest is <b>4</b>.</p>
    <p>The trick: an <b>in-order traversal</b> of a BST visits the values in <b>sorted order</b>
    (left, then node, then right). So we just walk in-order and stop at the k-th node we visit — no
    need to sort anything.</p>`,
  example: `<p>BST with values 2,3,4,5,6 → in-order is 2,3,4,5,6 → the 3rd smallest is
    <code>4</code>.</p>`,
  concepts: [
    {
      name: "In-order traversal",
      html: `Visit the <b>left</b> subtree, then the <b>node</b>, then the <b>right</b> subtree.
        Because of BST ordering, this spits out values from smallest to largest.`,
    },
    {
      name: "Stop early",
      html: `We don't need the whole sorted list — just count nodes as we visit them and return the
        moment the count hits <code>k</code>.`,
    },
  ],
  idea: `<b>The plan:</b> Do an in-order walk (using a stack: dive left, visit, then go right).
    Decrement <code>k</code> at each visit; when it reaches 0, that node's value is the answer.`,
  code: {
    lang: "python",
    lines: [
      "def kthSmallest(root, k):",
      "    stack = []",
      "    node = root",
      "    while stack or node:",
      "        while node:",
      "            stack.append(node)",
      "            node = node.left",
      "        node = stack.pop()",
      "        k -= 1",
      "        if k == 0:",
      "            return node.val",
      "        node = node.right",
    ],
  },
  complexity: {
    time: "O(h + k)",
    space: "O(h)",
    html: `<p><b>Time O(h + k):</b> we descend the height <code>h</code> and then visit
      <code>k</code> nodes in order.</p>
      <p><b>Space O(h):</b> the stack holds at most one root-to-leaf path.</p>`,
  },
  steps: [
    {
      narration: `BST rooted at <b>5</b>. Find the <b>3rd</b> smallest. In-order will visit values in
        sorted order.`,
      codeLine: 1,
      panels: [
        { type: "tree", title: "BST", root: { v: 5, left: { v: 3, left: { v: 2 }, right: { v: 4 } }, right: { v: 6 } } },
      ],
    },
    {
      narration: `Dive as far left as possible → the smallest value <b>2</b>. That's visit #1
        (k → 2).`,
      codeLine: 9,
      panels: [
        { type: "tree", title: "BST", highlight: { 2: "done" }, root: { v: 5, left: { v: 3, left: { v: 2 }, right: { v: 4 } }, right: { v: 6 } } },
        { type: "vars", title: "state", items: [["visited", "2"], ["k left", 2]] },
      ],
    },
    {
      narration: `Back up to <b>3</b> — visit #2 (k → 1).`,
      codeLine: 9,
      panels: [
        { type: "tree", title: "BST", highlight: { 2: "done", 3: "done" }, root: { v: 5, left: { v: 3, left: { v: 2 }, right: { v: 4 } }, right: { v: 6 } } },
        { type: "vars", title: "state", items: [["visited", "2, 3"], ["k left", 1]] },
      ],
    },
    {
      narration: `Then 3's right child <b>4</b> — visit #3. k hits 0, so <b>4</b> is our answer! 🎉`,
      codeLine: 11,
      panels: [
        { type: "tree", title: "BST", highlight: { 2: "done", 3: "done", 4: "cur" }, root: { v: 5, left: { v: 3, left: { v: 2 }, right: { v: 4 } }, right: { v: 6 } } },
        { type: "note", tone: "good", title: "answer", html: "return <b>4</b>" },
      ],
    },
  ],
});
