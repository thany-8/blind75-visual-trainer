/* Reverse Linked List — Linked List */
BLIND75.register("reverse-linked-list", {
  kidPitch: `
    <p>A <b>linked list</b> is a treasure hunt: each node holds a value and an arrow pointing to
    the <b>next</b> node. <code>1 → 2 → 3</code>. Reversing it means flipping every arrow so it
    becomes <code>3 → 2 → 1</code>.</p>
    <p>The trick: walk along the chain and, one node at a time, <b>flip its arrow to point
    backward</b>. We keep a <code>prev</code> finger (where we came from) and a <code>cur</code>
    finger (where we are), plus we save <code>nxt</code> before we cut the arrow so we don't lose
    the rest of the list.</p>`,
  example: `<p><code>1 → 2 → 3 → None</code> becomes <code>3 → 2 → 1 → None</code>.</p>`,
  concepts: [
    {
      name: "Node & pointer",
      html: `A <b>node</b> is a little box: <code>{value, next}</code>. <code>next</code> is an arrow
        (pointer) to the following node. The last node's <code>next</code> is <code>None</code> (the
        end).`,
    },
    {
      name: "Why save 'nxt' first?",
      html: `The moment we flip <code>cur.next</code> to point backward, we <b>lose</b> the link to
        the rest of the list. So we stash the next node in <code>nxt</code> <i>before</i> flipping —
        like holding the next stepping-stone before you let go of the current one.`,
    },
  ],
  idea: `<b>The plan:</b> Start with <code>prev = None</code>, <code>cur = head</code>. Repeat: save
    <code>nxt = cur.next</code>; flip <code>cur.next = prev</code>; slide <code>prev = cur</code> and
    <code>cur = nxt</code>. When <code>cur</code> falls off the end, <code>prev</code> is the new
    head.`,
  code: {
    lang: "python",
    lines: [
      "def reverseList(head):",
      "    prev = None",
      "    cur = head",
      "    while cur:",
      "        nxt = cur.next",
      "        cur.next = prev",
      "        prev = cur",
      "        cur = nxt",
      "    return prev",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> we touch each node exactly once.</p>
      <p><b>Space O(1):</b> we only use three little fingers (prev, cur, nxt) — no second list.</p>`,
  },
  steps: [
    {
      narration: `List <b>1 → 2 → 3</b>. Fingers: <b>cur</b> on node 1, <b>prev</b> = None (nothing
        behind us yet).`,
      codeLine: 3,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 1, arrow: "right" }, { v: 2, arrow: "right" }, { v: 3, arrow: "none" }], pointers: [{ name: "cur", index: 0, color: "blue" }] },
        { type: "vars", title: "fingers", items: [["prev", "None"], ["cur", 1]] },
      ],
    },
    {
      narration: `Save <b>nxt = 2</b> (so we don't lose it). Flip node 1's arrow to point
        <b>backward</b> to None. Then slide: prev = 1, cur = 2.`,
      codeLine: 6,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 1, arrow: "left" }, { v: 2, arrow: "right" }, { v: 3, arrow: "none" }], pointers: [{ name: "cur", index: 1, color: "blue" }], highlight: { 0: "done" } },
        { type: "vars", title: "fingers", items: [["prev", 1], ["cur", 2], ["nxt", 2]] },
      ],
    },
    {
      narration: `Save <b>nxt = 3</b>. Flip node 2's arrow backward so <b>2 → 1</b>. Slide: prev = 2,
        cur = 3.`,
      codeLine: 6,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 1, arrow: "left" }, { v: 2, arrow: "left" }, { v: 3, arrow: "none" }], pointers: [{ name: "cur", index: 2, color: "blue" }], highlight: { 0: "done", 1: "done" } },
        { type: "vars", title: "fingers", items: [["prev", 2], ["cur", 3], ["nxt", 3]] },
      ],
    },
    {
      narration: `Save <b>nxt = None</b>. Flip node 3's arrow backward so <b>3 → 2</b>. Slide: prev =
        3, cur = None.`,
      codeLine: 6,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 1, arrow: "left" }, { v: 2, arrow: "left" }, { v: 3, arrow: "left" }], pointers: [{ name: "prev", index: 2, color: "green" }], highlight: { 0: "done", 1: "done", 2: "done" } },
        { type: "vars", title: "fingers", items: [["prev", 3], ["cur", "None"]] },
      ],
    },
    {
      narration: `<b>cur</b> fell off the end (None), so we stop. <b>prev = 3</b> is the new head.
        The list is reversed: <b>3 → 2 → 1</b>. 🎉`,
      codeLine: 9,
      panels: [
        { type: "linkedlist", title: "reversed", nodes: [{ v: 1, arrow: "left" }, { v: 2, arrow: "left" }, { v: 3, arrow: "left" }], highlight: { 0: "done", 1: "done", 2: "done" } },
        { type: "note", tone: "good", title: "answer", html: "new head = <b>3</b> → 2 → 1" },
      ],
    },
  ],
});
