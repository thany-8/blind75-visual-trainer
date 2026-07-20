/* Merge k Sorted Lists — Linked List (Hard) */
BLIND75.register("merge-k-sorted-lists", {
  kidPitch: `
    <p>You have <b>k</b> sorted linked lists and want to merge them all into one big sorted list.</p>
    <p>The trick: you already know how to merge <b>two</b> sorted lists. So pair the lists up and
    merge each pair, which halves how many lists remain. Repeat — merge pairs, halve, merge pairs,
    halve — until only one list is left. (This "divide and conquer" is much faster than merging them
    one at a time.)</p>`,
  example: `<p><code>[1→4→5], [1→3→4], [2→6]</code> → <code>1→1→2→3→4→4→5→6</code>.</p>`,
  concepts: [
    {
      name: "Reuse merge-two",
      html: `The heart of this is the "merge two sorted lists" routine: compare the two fronts, take
        the smaller, repeat. We just apply it many times.`,
    },
    {
      name: "Why pair up (divide & conquer)?",
      html: `Merging one list into a growing result over and over is slow. Merging in pairs cuts the
        number of lists in half each round, so it finishes in about <code>log k</code> rounds.`,
    },
  ],
  idea: `<b>The plan:</b> While more than one list remains, merge them two-at-a-time into a new,
    roughly-half-as-long collection. When a single list is left, that's the answer.`,
  code: {
    lang: "python",
    lines: [
      "def mergeKLists(lists):",
      "    if not lists: return None",
      "    while len(lists) > 1:",
      "        merged = []",
      "        for i in range(0, len(lists), 2):",
      "            l1 = lists[i]",
      "            l2 = lists[i+1] if i+1 < len(lists) else None",
      "            merged.append(mergeTwo(l1, l2))",
      "        lists = merged",
      "    return lists[0]",
    ],
  },
  complexity: {
    time: "O(N log k)",
    space: "O(1)",
    html: `<p><b>Time O(N log k):</b> there are <code>log k</code> merging rounds, and each round
      touches all <code>N</code> nodes once.</p>
      <p><b>Space O(1):</b> we just relink existing nodes (ignoring recursion in merge-two).</p>`,
  },
  steps: [
    {
      narration: `Three sorted lists to merge into one.`,
      codeLine: 1,
      panels: [
        { type: "linkedlist", title: "list A", nodes: [{ v: 1 }, { v: 4 }, { v: 5, arrow: "none" }] },
        { type: "linkedlist", title: "list B", nodes: [{ v: 1 }, { v: 3 }, { v: 4, arrow: "none" }] },
        { type: "linkedlist", title: "list C", nodes: [{ v: 2 }, { v: 6, arrow: "none" }] },
      ],
    },
    {
      narration: `<b>Round 1:</b> merge in pairs. A + B → one sorted list; C has no partner, so it
        carries over.`,
      codeLine: 8,
      panels: [
        { type: "linkedlist", title: "A+B merged", nodes: [{ v: 1 }, { v: 1 }, { v: 3 }, { v: 4 }, { v: 4 }, { v: 5, arrow: "none" }], highlight: { 0: "done", 1: "done" } },
        { type: "linkedlist", title: "C", nodes: [{ v: 2 }, { v: 6, arrow: "none" }] },
      ],
    },
    {
      narration: `<b>Round 2:</b> merge the two remaining lists together.`,
      codeLine: 8,
      panels: [
        { type: "linkedlist", title: "result", nodes: [{ v: 1 }, { v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 4 }, { v: 5 }, { v: 6, arrow: "none" }], highlight: { 0: "done", 1: "done", 2: "done", 3: "done", 4: "done", 5: "done", 6: "done", 7: "done" } },
      ],
    },
    {
      narration: `One list remains — fully merged and sorted: <b>1→1→2→3→4→4→5→6</b>. 🎉`,
      codeLine: 10,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "1 → 1 → 2 → 3 → 4 → 4 → 5 → 6" },
      ],
    },
  ],
});
