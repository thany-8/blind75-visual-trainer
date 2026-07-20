/* Non-overlapping Intervals — Intervals */
BLIND75.register("non-overlapping-intervals", {
  kidPitch: `
    <p>Given a set of intervals, remove the <b>fewest</b> of them so that none of the survivors
    overlap. Return how many you had to remove.</p>
    <p>The trick is greedy: <b>sort by end time</b>. Then sweep through, always keeping the interval
    that <b>finishes earliest</b> (it leaves the most room for others). Whenever the next interval
    starts before the last kept one ends, it overlaps — remove it.</p>`,
  example: `<p><code>[[1,2],[2,3],[3,4],[1,3]]</code> → remove <code>1</code> interval ([1,3]).</p>`,
  concepts: [
    {
      name: "Why sort by end?",
      html: `The interval that ends earliest blocks the least future space, so keeping it is always
        at least as good as keeping one that ends later. This greedy choice is provably optimal.`,
    },
    {
      name: "Overlap test",
      html: `After sorting, if the next interval's <b>start</b> is less than the last kept interval's
        <b>end</b>, they overlap — so we count that as a removal and skip it.`,
    },
  ],
  idea: `<b>The plan:</b> Sort by end. Track <code>prev_end</code>. For each interval: if its start ≥
    <code>prev_end</code>, keep it and update <code>prev_end</code>; otherwise it overlaps, so add one
    to the removal count.`,
  code: {
    lang: "python",
    lines: [
      "def eraseOverlapIntervals(intervals):",
      "    intervals.sort(key=lambda x: x[1])   # sort by end",
      "    count = 0",
      "    prev_end = float('-inf')",
      "    for start, end in intervals:",
      "        if start >= prev_end:",
      "            prev_end = end               # keep it",
      "        else:",
      "            count += 1                   # overlaps -> remove",
      "    return count",
    ],
  },
  complexity: {
    time: "O(n log n)",
    space: "O(1)",
    html: `<p><b>Time O(n log n):</b> dominated by the sort; the sweep is O(n).</p>
      <p><b>Space O(1):</b> just a counter and the last end.</p>`,
  },
  steps: [
    {
      narration: `Intervals sorted by <b>end</b> time: [1,2], [2,3], [1,3], [3,4]. Keep the ones that
        finish early; count the overlaps we must drop.`,
      codeLine: 2,
      panels: [
        { type: "intervals", title: "sorted by end", range: [1, 4], items: [
          { start: 1, end: 2, cls: "a", label: "1–2" },
          { start: 2, end: 3, cls: "a", label: "2–3" },
          { start: 1, end: 3, cls: "a", label: "1–3" },
          { start: 3, end: 4, cls: "a", label: "3–4" },
        ] },
        { type: "vars", title: "state", items: [["count", 0]] },
      ],
    },
    {
      narration: `Keep <b>[1,2]</b> (prev_end = 2). Then <b>[2,3]</b>: its start 2 ≥ 2, no overlap →
        keep (prev_end = 3).`,
      codeLine: 7,
      panels: [
        { type: "intervals", title: "kept so far", range: [1, 4], items: [
          { start: 1, end: 2, cls: "merged", label: "1–2" },
          { start: 2, end: 3, cls: "merged", label: "2–3" },
          { start: 1, end: 3, cls: "a", label: "1–3" },
          { start: 3, end: 4, cls: "a", label: "3–4" },
        ] },
        { type: "vars", title: "state", items: [["prev_end", 3], ["count", 0]] },
      ],
    },
    {
      narration: `Next <b>[1,3]</b>: its start 1 < prev_end 3 → it overlaps! Remove it (count = 1).`,
      codeLine: 9,
      panels: [
        { type: "intervals", title: "remove overlap", range: [1, 4], items: [
          { start: 1, end: 2, cls: "merged", label: "1–2" },
          { start: 2, end: 3, cls: "merged", label: "2–3" },
          { start: 1, end: 3, cls: "cur", label: "1–3 ✗" },
          { start: 3, end: 4, cls: "a", label: "3–4" },
        ] },
        { type: "vars", title: "state", items: [["count", 1]] },
      ],
    },
    {
      narration: `<b>[3,4]</b>: start 3 ≥ prev_end 3 → keep. We removed just <b>1</b> interval. 🎉`,
      codeLine: 10,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>1</b>" },
      ],
    },
  ],
});
