/* Linked List Cycle — Linked List */
BLIND75.register("linked-list-cycle", {
  kidPitch: `
    <p>Does a linked list have a <b>loop</b>? That is, does some node's arrow point back to an
    earlier node, so if you kept walking you'd go around forever?</p>
    <p>The trick is <b>Floyd's Tortoise and Hare</b>: two walkers on the same track. The
    <b>slow</b> one steps 1 node at a time, the <b>fast</b> one steps 2. If there's no loop, fast
    runs off the end. If there IS a loop, fast keeps lapping the track and eventually <b>bumps into
    slow</b> from behind — proof of a cycle.</p>`,
  example: `<p><code>3 → 2 → 0 → -4</code>, where <code>-4</code> points back to <code>2</code>, has
    a cycle → <code>True</code>.</p>`,
  concepts: [
    {
      name: "Two speeds on one track",
      html: `Because fast gains one step on slow every round, the gap between them shrinks by 1 each
        time inside a loop — so they're guaranteed to land on the same node eventually.`,
    },
    {
      name: "No extra memory needed",
      html: `A simpler idea is to remember every node you've seen in a set, but that needs
        <code>O(n)</code> space. The two-pointer trick detects the loop with just two pointers,
        <code>O(1)</code> space.`,
    },
  ],
  idea: `<b>The plan:</b> Start slow and fast at the head. Each step: slow moves 1, fast moves 2. If
    fast (or fast.next) falls off the end → no cycle. If slow ever equals fast → cycle found.`,
  code: {
    lang: "python",
    lines: [
      "def hasCycle(head):",
      "    slow = fast = head",
      "    while fast and fast.next:",
      "        slow = slow.next",
      "        fast = fast.next.next",
      "        if slow == fast:",
      "            return True",
      "    return False",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> if there's a loop, the two pointers meet within one lap of it.</p>
      <p><b>Space O(1):</b> just two pointers — no set of visited nodes.</p>`,
  },
  steps: [
    {
      narration: `List <b>3 → 2 → 0 → -4</b>, and the tail <b>-4 loops back to 2</b> — a cycle! Both
        slow and fast start at the head (3).`,
      codeLine: 2,
      panels: [
        { type: "linkedlist", title: "list (−4 links back to 2)", nodes: [{ v: 3 }, { v: 2 }, { v: 0 }, { v: -4, arrow: "left" }], pointers: [{ name: "slow", index: 0, color: "blue" }, { name: "fast", index: 0, color: "pink" }] },
      ],
    },
    {
      narration: `Step 1: slow moves to <b>2</b>, fast leaps two to <b>0</b>. Not together yet.`,
      codeLine: 5,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 3 }, { v: 2 }, { v: 0 }, { v: -4, arrow: "left" }], pointers: [{ name: "slow", index: 1, color: "blue" }, { name: "fast", index: 2, color: "pink" }] },
      ],
    },
    {
      narration: `Step 2: slow → <b>0</b>. fast leaps two, wrapping through the loop, back to
        <b>2</b>. Still not together.`,
      codeLine: 5,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 3 }, { v: 2 }, { v: 0 }, { v: -4, arrow: "left" }], pointers: [{ name: "slow", index: 2, color: "blue" }, { name: "fast", index: 1, color: "pink" }] },
      ],
    },
    {
      narration: `Step 3: slow → <b>-4</b>, fast leaps two → also <b>-4</b>. They meet! 🎉`,
      codeLine: 6,
      panels: [
        { type: "linkedlist", title: "list", nodes: [{ v: 3 }, { v: 2 }, { v: 0 }, { v: -4, arrow: "left" }], pointers: [{ name: "slow", index: 3, color: "blue" }, { name: "fast", index: 3, color: "pink" }], highlight: { 3: "cur" } },
      ],
    },
    {
      narration: `slow == fast, so there's definitely a loop. Return <b>True</b>.`,
      codeLine: 7,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — the list has a cycle" },
      ],
    },
  ],
});
