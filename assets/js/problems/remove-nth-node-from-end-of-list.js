/* Remove Nth Node From End of List — Linked List */
BLIND75.register("remove-nth-node-from-end-of-list", {
  kidPitch: `
    <p>Given a linked list, remove the node that is <b>n-th from the end</b> — in one pass, without
    first counting the whole list.</p>
    <p>The trick is <b>two pointers with a gap</b>. Send a <b>fast</b> pointer <code>n</code> steps
    ahead. Then move <b>fast</b> and <b>slow</b> together. When fast reaches the end, slow is sitting
    exactly one step <b>before</b> the node we must remove — perfect for snipping it out.</p>`,
  example: `<p><code>1 → 2 → 3 → 4 → 5</code>, <code>n = 2</code> → remove <code>4</code> →
    <code>1 → 2 → 3 → 5</code>.</p>`,
  concepts: [
    {
      name: "The gap idea",
      html: `If fast is <code>n</code> nodes ahead of slow, then when fast hits the last node, slow
        is <code>n</code> nodes from the end — right before the one to delete.`,
    },
    {
      name: "Dummy (guard) node",
      html: `We put a throwaway <b>dummy</b> node before the head so that even removing the very
        first node works smoothly. We return <code>dummy.next</code> at the end.`,
    },
  ],
  idea: `<b>The plan:</b> Start fast and slow at a dummy. Move fast <code>n</code> steps ahead. Then
    move both until fast reaches the last node. Now <code>slow.next</code> is the node to remove —
    skip over it.`,
  code: {
    lang: "python",
    lines: [
      "def removeNthFromEnd(head, n):",
      "    dummy = ListNode(0, head)",
      "    fast = slow = dummy",
      "    for _ in range(n):",
      "        fast = fast.next",
      "    while fast.next:",
      "        slow = slow.next",
      "        fast = fast.next",
      "    slow.next = slow.next.next",
      "    return dummy.next",
    ],
  },
  complexity: {
    time: "O(L)",
    space: "O(1)",
    html: `<p><b>Time O(L):</b> a single pass over the <code>L</code> nodes.</p>
      <p><b>Space O(1):</b> just two pointers, no extra list.</p>`,
  },
  steps: [
    {
      narration: `List <b>1 → 2 → 3 → 4 → 5</b>, and <b>n = 2</b> (remove the 2nd from the end). A
        dummy <b>•</b> guards the front. fast and slow both start at •.`,
      codeLine: 3,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: "•" }, { v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5, arrow: "none" }], pointers: [{ name: "slow", index: 0, color: "blue" }, { name: "fast", index: 0, color: "pink" }] },
      ],
    },
    {
      narration: `Move <b>fast</b> ahead by n = 2 steps. Now fast leads slow by a gap of 2 nodes.`,
      codeLine: 5,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: "•" }, { v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5, arrow: "none" }], pointers: [{ name: "slow", index: 0, color: "blue" }, { name: "fast", index: 2, color: "pink" }] },
      ],
    },
    {
      narration: `Now slide both together, keeping the gap, until <b>fast</b> reaches the last node
        (5). <b>slow</b> lands on node <b>3</b> — right before the node to remove.`,
      codeLine: 7,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: "•" }, { v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5, arrow: "none" }], pointers: [{ name: "slow", index: 3, color: "blue" }, { name: "fast", index: 5, color: "pink" }], highlight: { 4: "cur" } },
      ],
    },
    {
      narration: `Snip! <b>slow.next = slow.next.next</b> skips over node <b>4</b>, unhooking it from
        the chain.`,
      codeLine: 9,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: "•" }, { v: 1 }, { v: 2 }, { v: 3 }, { v: 5, arrow: "none" }], pointers: [{ name: "slow", index: 3, color: "blue" }], highlight: { 3: "done" } },
      ],
    },
    {
      narration: `Return dummy.next. The list is now <b>1 → 2 → 3 → 5</b>. 🎉`,
      codeLine: 10,
      panels: [
        { type: "linkedlist", title: "result", nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 5, arrow: "none" }], highlight: { 0: "done", 1: "done", 2: "done", 3: "done" } },
        { type: "note", tone: "good", title: "answer", html: "1 → 2 → 3 → 5" },
      ],
    },
  ],
});
