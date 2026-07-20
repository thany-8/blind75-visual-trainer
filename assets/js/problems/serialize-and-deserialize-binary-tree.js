/* Serialize and Deserialize Binary Tree — Trees (Hard) */
BLIND75.register("serialize-and-deserialize-binary-tree", {
  kidPitch: `
    <p>Turn a whole tree into a single <b>string</b> (so you can save or send it), then turn that
    string back into the <b>exact same tree</b>.</p>
    <p>The trick: walk the tree in <b>preorder</b> (node, left, right) and write each value down —
    and crucially, write a marker like <code>#</code> whenever a child is <b>empty</b>. Those empty
    markers record the shape, so reading the string back in the same order rebuilds the tree
    perfectly.</p>`,
  example: `<p>Tree 1 → (2, 3 → (4, 5)) serializes to <code>"1,2,#,#,3,4,#,#,5,#,#"</code>.</p>`,
  concepts: [
    {
      name: "Why record the empties",
      html: `Values alone don't capture <b>shape</b> — you can't tell where branches stop. Writing a
        <code>#</code> for every missing child pins down the structure exactly.`,
    },
    {
      name: "Same order in, same order out",
      html: `Serialize and deserialize both use preorder. Reading tokens left to right, the first is
        the root; then we rebuild its left subtree (consuming tokens), then its right.`,
    },
  ],
  idea: `<b>Serialize:</b> preorder DFS, appending each value and a <code>#</code> for null children.
    <b>Deserialize:</b> read tokens in order — a value becomes a node whose left then right are built
    from the following tokens; a <code>#</code> becomes an empty spot.`,
  code: {
    lang: "python",
    lines: [
      "def serialize(root):",
      "    out = []",
      "    def dfs(node):",
      "        if not node:",
      "            out.append('#')",
      "            return",
      "        out.append(str(node.val))",
      "        dfs(node.left)",
      "        dfs(node.right)",
      "    dfs(root)",
      "    return ','.join(out)",
      "# deserialize reads the tokens back in the same order",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> each node (and each empty slot) is written and read once.</p>
      <p><b>Space O(n):</b> the string of tokens plus recursion depth.</p>`,
  },
  steps: [
    {
      narration: `Our tree. We'll flatten it into a string, then rebuild it.`,
      codeLine: 1,
      panels: [
        { type: "tree", title: "tree", root: { v: 1, left: { v: 2 }, right: { v: 3, left: { v: 4 }, right: { v: 5 } } } },
      ],
    },
    {
      narration: `<b>Serialize</b> in preorder: write 1, go left → 2, its two empty children →
        <b>#, #</b>, back up, then the right side.`,
      codeLine: 7,
      panels: [
        { type: "tree", title: "tree", highlight: { 1: "done", 2: "done" }, root: { v: 1, left: { v: 2 }, right: { v: 3, left: { v: 4 }, right: { v: 5 } } } },
        { type: "array", title: "tokens", values: ["1", "2", "#", "#"], labelsBelow: false },
      ],
    },
    {
      narration: `Continue: 3, then 4 (empties #, #), then 5 (empties #, #). Full string:
        <b>"1,2,#,#,3,4,#,#,5,#,#"</b>.`,
      codeLine: 11,
      panels: [
        { type: "tree", title: "tree", highlight: { 1: "done", 2: "done", 3: "done", 4: "done", 5: "done" }, root: { v: 1, left: { v: 2 }, right: { v: 3, left: { v: 4 }, right: { v: 5 } } } },
        { type: "array", title: "tokens", values: ["1", "2", "#", "#", "3", "4", "#", "#", "5", "#", "#"], labelsBelow: false },
      ],
    },
    {
      narration: `<b>Deserialize</b>: read tokens in order. First <b>1</b> is the root; build its left
        from the next tokens (2, then #, # → 2 is a leaf), then its right (3, 4…, 5…).`,
      codeLine: 12,
      panels: [
        { type: "array", title: "tokens (reading →)", values: ["1", "2", "#", "#", "3", "4", "#", "#", "5", "#", "#"], labelsBelow: false, highlight: { 0: "cur" } },
        { type: "tree", title: "rebuilt", highlight: { 1: "done", 2: "done" }, root: { v: 1, left: { v: 2 }, right: { v: 3, left: { v: 4 }, right: { v: 5 } } } },
      ],
    },
    {
      narration: `The string rebuilds into the <b>same tree</b> we started with. 🎉`,
      codeLine: 10,
      panels: [
        { type: "note", tone: "good", title: "answer", html: '"1,2,#,#,3,4,#,#,5,#,#" ↔ the original tree' },
      ],
    },
  ],
});
