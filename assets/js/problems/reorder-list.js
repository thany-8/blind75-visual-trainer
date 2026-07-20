/* Reorder List — Linked List */
BLIND75.register("reorder-list", {
  kidPitch: `
    <p>Take a list <code>1 → 2 → 3 → 4 → 5</code> and re-weave it so the <b>first</b> and
    <b>last</b> alternate: <code>1 → 5 → 2 → 4 → 3</code>. First, last, second, second-last, and so
    on.</p>
    <p>The trick is three clean phases: <b>(1)</b> find the middle, <b>(2)</b> reverse the second
    half, <b>(3)</b> zip the two halves together, taking one node from each in turn.</p>`,
  example: `<p><code>1 → 2 → 3 → 4 → 5</code> becomes <code>1 → 5 → 2 → 4 → 3</code>.</p>`,
  concepts: [
    {
      name: "Find the middle (slow/fast)",
      html: `Send a <b>slow</b> pointer one step and a <b>fast</b> pointer two steps at a time. When
        fast reaches the end, slow is at the middle. Split the list there.`,
    },
    {
      name: "Reverse, then weave",
      html: `Reversing the back half lets us pull nodes from the end easily. Then we alternate:
        first-half node, back-half node, first-half node, … until they meet.`,
    },
  ],
  idea: `<b>The plan:</b> (1) Use slow/fast to find the middle and cut the list in two. (2) Reverse
    the second half. (3) Merge the two halves by alternating nodes.`,
  code: {
    lang: "python",
    lines: [
      "def reorderList(head):",
      "    # 1) find the middle",
      "    slow, fast = head, head.next",
      "    while fast and fast.next:",
      "        slow = slow.next",
      "        fast = fast.next.next",
      "    # 2) reverse the second half",
      "    second = slow.next",
      "    slow.next = None",
      "    prev = None",
      "    while second:",
      "        second.next, prev, second = prev, second, second.next",
      "    # 3) weave the two halves",
      "    first, second = head, prev",
      "    while second:",
      "        first.next, first = second, first.next",
      "        second.next, second = first, second.next",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> each phase (find middle, reverse, weave) is a single linear pass.</p>
      <p><b>Space O(1):</b> we only rewire existing nodes with a few pointers.</p>`,
  },
  steps: [
    {
      narration: `List <b>1 → 2 → 3 → 4 → 5</b>. Goal: <b>1 → 5 → 2 → 4 → 3</b>.`,
      codeLine: 1,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5, arrow: "none" }] },
      ],
    },
    {
      narration: `<b>Phase 1:</b> slow/fast find the middle at <b>3</b>. Split into two halves.`,
      codeLine: 3,
      panels: [
        { type: "linkedlist", title: "first half", nodes: [{ v: 1 }, { v: 2 }, { v: 3, arrow: "none" }], pointers: [{ name: "slow", index: 2, color: "blue" }] },
        { type: "linkedlist", title: "second half", nodes: [{ v: 4 }, { v: 5, arrow: "none" }] },
      ],
    },
    {
      narration: `<b>Phase 2:</b> reverse the second half → <b>5 → 4</b>.`,
      codeLine: 7,
      panels: [
        { type: "linkedlist", title: "first half", nodes: [{ v: 1 }, { v: 2 }, { v: 3, arrow: "none" }] },
        { type: "linkedlist", title: "second half (reversed)", nodes: [{ v: 5 }, { v: 4, arrow: "none" }], highlight: { 0: "done", 1: "done" } },
      ],
    },
    {
      narration: `<b>Phase 3:</b> weave them: 1, then 5, then 2, then 4, then 3.`,
      codeLine: 13,
      panels: [
        { type: "linkedlist", title: "weaving", nodes: [{ v: 1 }, { v: 5 }, { v: 2 }, { v: 4 }, { v: 3, arrow: "none" }], highlight: { 0: "done", 1: "cur", 2: "done", 3: "cur" } },
      ],
    },
    {
      narration: `The list is reordered: <b>1 → 5 → 2 → 4 → 3</b>. 🎉`,
      codeLine: 17,
      panels: [
        { type: "linkedlist", title: "result", nodes: [{ v: 1 }, { v: 5 }, { v: 2 }, { v: 4 }, { v: 3, arrow: "none" }], highlight: { 0: "done", 1: "done", 2: "done", 3: "done", 4: "done" } },
        { type: "note", tone: "good", title: "answer", html: "1 → 5 → 2 → 4 → 3" },
      ],
    },
  ],
});
