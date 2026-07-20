/* Merge Two Sorted Lists — Linked List */
BLIND75.register("merge-two-sorted-lists", {
  kidPitch: `
    <p>You have two <b>already-sorted</b> linked lists, like two lines of kids ordered by height.
    Zip them into <b>one</b> sorted list.</p>
    <p>The trick: look at the <b>front</b> of each list. Whichever is smaller goes next into the
    merged list, and that list moves forward. Repeat until one list runs out, then attach whatever's
    left of the other (it's already sorted!).</p>`,
  example: `<p><code>1 → 3 → 5</code> merged with <code>2 → 4</code> gives
    <code>1 → 2 → 3 → 4 → 5</code>.</p>`,
  concepts: [
    {
      name: "Why compare only the fronts?",
      html: `Both lists are sorted, so the very smallest unused number is always at the <b>front</b>
        of one list or the other. We never need to look deeper.`,
    },
    {
      name: "The dummy node trick",
      html: `We start the merged list with a throwaway <b>dummy</b> node so we always have a
        "previous" to attach to. At the end we return <code>dummy.next</code> — the real head.`,
    },
  ],
  idea: `<b>The plan:</b> Keep a <code>tail</code> for the merged list. While both lists have nodes,
    attach the smaller front and advance that list. When one empties, attach the rest of the other.`,
  code: {
    lang: "python",
    lines: [
      "def mergeTwoLists(l1, l2):",
      "    dummy = tail = ListNode()",
      "    while l1 and l2:",
      "        if l1.val <= l2.val:",
      "            tail.next = l1",
      "            l1 = l1.next",
      "        else:",
      "            tail.next = l2",
      "            l2 = l2.next",
      "        tail = tail.next",
      "    tail.next = l1 or l2",
      "    return dummy.next",
    ],
  },
  complexity: {
    time: "O(n + m)",
    space: "O(1)",
    html: `<p><b>Time O(n + m):</b> each node from both lists is looked at once.</p>
      <p><b>Space O(1):</b> we re-link the existing nodes — no new list is built, just pointers
      moved.</p>`,
  },
  steps: [
    {
      narration: `Two sorted lists: <b>1 → 3 → 5</b> and <b>2 → 4</b>. Merged list starts empty.`,
      codeLine: 2,
      panels: [
        { type: "linkedlist", title: "l1", nodes: [{ v: 1 }, { v: 3 }, { v: 5, arrow: "none" }], pointers: [{ name: "l1", index: 0, color: "blue" }] },
        { type: "linkedlist", title: "l2", nodes: [{ v: 2 }, { v: 4, arrow: "none" }], pointers: [{ name: "l2", index: 0, color: "pink" }] },
        { type: "linkedlist", title: "merged", nodes: [] },
      ],
    },
    {
      narration: `Fronts are <b>1</b> and <b>2</b>. 1 ≤ 2, so take <b>1</b>. l1 moves to 3.`,
      codeLine: 4,
      panels: [
        { type: "linkedlist", title: "l1", nodes: [{ v: 1, arrow: "none" }, { v: 3 }, { v: 5, arrow: "none" }], pointers: [{ name: "l1", index: 1, color: "blue" }], highlight: { 0: "done" } },
        { type: "linkedlist", title: "l2", nodes: [{ v: 2 }, { v: 4, arrow: "none" }], pointers: [{ name: "l2", index: 0, color: "pink" }] },
        { type: "linkedlist", title: "merged", nodes: [{ v: 1, arrow: "none" }], highlight: { 0: "done" } },
      ],
    },
    {
      narration: `Fronts are <b>3</b> and <b>2</b>. 2 is smaller, so take <b>2</b>. l2 moves to 4.`,
      codeLine: 7,
      panels: [
        { type: "linkedlist", title: "l1", nodes: [{ v: 3 }, { v: 5, arrow: "none" }], pointers: [{ name: "l1", index: 0, color: "blue" }] },
        { type: "linkedlist", title: "l2", nodes: [{ v: 2, arrow: "none" }, { v: 4, arrow: "none" }], pointers: [{ name: "l2", index: 1, color: "pink" }], highlight: { 0: "done" } },
        { type: "linkedlist", title: "merged", nodes: [{ v: 1 }, { v: 2, arrow: "none" }], highlight: { 0: "done", 1: "done" } },
      ],
    },
    {
      narration: `Fronts <b>3</b> and <b>4</b>. Take <b>3</b>. l1 moves to 5.`,
      codeLine: 4,
      panels: [
        { type: "linkedlist", title: "l1", nodes: [{ v: 5, arrow: "none" }], pointers: [{ name: "l1", index: 0, color: "blue" }] },
        { type: "linkedlist", title: "l2", nodes: [{ v: 4, arrow: "none" }], pointers: [{ name: "l2", index: 0, color: "pink" }] },
        { type: "linkedlist", title: "merged", nodes: [{ v: 1 }, { v: 2 }, { v: 3, arrow: "none" }], highlight: { 2: "done" } },
      ],
    },
    {
      narration: `Fronts <b>5</b> and <b>4</b>. Take <b>4</b>. Now l2 is empty!`,
      codeLine: 7,
      panels: [
        { type: "linkedlist", title: "l1", nodes: [{ v: 5, arrow: "none" }], pointers: [{ name: "l1", index: 0, color: "blue" }] },
        { type: "linkedlist", title: "l2 (empty)", nodes: [] },
        { type: "linkedlist", title: "merged", nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4, arrow: "none" }], highlight: { 3: "done" } },
      ],
    },
    {
      narration: `One list is empty, so just attach the rest of l1 (<b>5</b>). Merged list is
        complete: <b>1 → 2 → 3 → 4 → 5</b>. 🎉`,
      codeLine: 11,
      panels: [
        { type: "linkedlist", title: "merged", nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5, arrow: "none" }], highlight: { 0: "done", 1: "done", 2: "done", 3: "done", 4: "done" } },
        { type: "note", tone: "good", title: "answer", html: "1 → 2 → 3 → 4 → 5" },
      ],
    },
  ],
});
