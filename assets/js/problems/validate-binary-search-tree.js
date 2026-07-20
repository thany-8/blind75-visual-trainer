/* Validate Binary Search Tree — Trees */
BLIND75.register("validate-binary-search-tree", {
  kidPitch: `
    <p>Is a tree a proper <b>Binary Search Tree</b>? The rule: for <b>every</b> node, everything in
    its left subtree must be smaller and everything in its right subtree must be bigger — not just
    its direct children, but <i>all</i> descendants.</p>
    <p>The trick: carry a valid range <b>(low, high)</b> as you go down. The root can be anything.
    Going left tightens the ceiling to the parent's value; going right raises the floor. If a node
    ever falls outside its allowed range, it's not a valid BST.</p>`,
  example: `<p>Tree 5 → (4, 6 → (3, 7)): the <b>3</b> sits in 5's right subtree but 3 &lt; 5 →
    <b>not</b> a valid BST.</p>`,
  concepts: [
    {
      name: "Why comparing to the parent isn't enough",
      html: `A node can be valid next to its parent yet break the rule against a grandparent. So we
        track the full <b>(low, high)</b> window a node must fit in, not just one comparison.`,
    },
    {
      name: "How the window narrows",
      html: `Start with <code>(−∞, +∞)</code>. Going into a left child, the high bound becomes the
        parent's value. Going right, the low bound becomes the parent's value.`,
    },
  ],
  idea: `<b>The plan:</b> Recurse with a range. A node must satisfy <code>low &lt; val &lt;
    high</code>. Recurse left with range <code>(low, val)</code> and right with <code>(val,
    high)</code>. Any violation → invalid.`,
  code: {
    lang: "python",
    lines: [
      "def isValidBST(root):",
      "    def valid(node, low, high):",
      "        if not node:",
      "            return True",
      "        if not (low < node.val < high):",
      "            return False",
      "        return (valid(node.left, low, node.val) and",
      "                valid(node.right, node.val, high))",
      "    return valid(root, float('-inf'), float('inf'))",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(h)",
    html: `<p><b>Time O(n):</b> each node is checked once against its range.</p>
      <p><b>Space O(h):</b> recursion depth equals the tree height.</p>`,
  },
  steps: [
    {
      narration: `Is this a valid BST? Start at root <b>5</b> with the widest range
        <b>(−∞, +∞)</b>.`,
      codeLine: 8,
      panels: [
        { type: "tree", title: "tree", highlight: { 5: "visit" }, root: { v: 5, left: { v: 4 }, right: { v: 6, left: { v: 3 }, right: { v: 7 } } } },
        { type: "vars", title: "range for node", items: [["node", 5], ["low", "−∞"], ["high", "+∞"]] },
      ],
    },
    {
      narration: `Left child <b>4</b> must be in <b>(−∞, 5)</b> — yes. Right child <b>6</b> must be in
        <b>(5, +∞)</b> — yes so far.`,
      codeLine: 5,
      panels: [
        { type: "tree", title: "tree", highlight: { 5: "done", 4: "done", 6: "visit" }, root: { v: 5, left: { v: 4 }, right: { v: 6, left: { v: 3 }, right: { v: 7 } } } },
        { type: "vars", title: "range for node", items: [["node", 6], ["low", 5], ["high", "+∞"]] },
      ],
    },
    {
      narration: `Now node <b>6</b>'s left child must be in <b>(5, 6)</b>. But the child is
        <b>3</b> — and 3 is not greater than 5! Rule broken. ✗`,
      codeLine: 6,
      panels: [
        { type: "tree", title: "tree", highlight: { 6: "done", 3: "swap" }, root: { v: 5, left: { v: 4 }, right: { v: 6, left: { v: 3 }, right: { v: 7 } } } },
        { type: "vars", title: "range for node", items: [["node", 3], ["low", 5], ["high", 6]] },
      ],
    },
    {
      narration: `A node fell outside its allowed range, so this is <b>not</b> a valid BST. Return
        <b>False</b>.`,
      codeLine: 6,
      panels: [
        { type: "note", tone: "bad", title: "answer", html: "return <b>False</b> — 3 belongs left of 5, not right" },
      ],
    },
  ],
});
