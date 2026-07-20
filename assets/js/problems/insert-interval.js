/* Insert Interval — Intervals */
BLIND75.register("insert-interval", {
  kidPitch: `
    <p>You have a list of <b>non-overlapping</b> intervals sorted by start, and a <b>new</b> interval
    to add. Insert it and merge anything it overlaps, keeping the list tidy and sorted.</p>
    <p>The trick: sweep left to right in three phases. First, copy over all intervals that end
    <b>before</b> the new one starts (no overlap). Next, <b>merge</b> every interval that overlaps
    the new one into a single stretched interval. Finally, copy the rest.</p>`,
  example: `<p><code>[[1,3],[6,9]]</code>, insert <code>[2,5]</code> → <code>[[1,5],[6,9]]</code>.</p>`,
  concepts: [
    {
      name: "Three clean phases",
      html: `Because the input is already sorted, everything splits into "before the new interval",
        "overlapping it", and "after it" — handle each group in order.`,
    },
    {
      name: "Merging = widen the new interval",
      html: `Each overlapping interval expands the new one: its start becomes the smaller start, its
        end the larger end. After absorbing them all, add the single merged interval.`,
    },
  ],
  idea: `<b>The plan:</b> Add all intervals ending before <code>new.start</code>. Then, while
    intervals overlap the new one, grow the new interval to cover them. Add the merged interval, then
    append the remaining intervals.`,
  code: {
    lang: "python",
    lines: [
      "def insert(intervals, newInterval):",
      "    res = []",
      "    i, n = 0, len(intervals)",
      "    while i < n and intervals[i][1] < newInterval[0]:",
      "        res.append(intervals[i]); i += 1        # ends before -> keep",
      "    while i < n and intervals[i][0] <= newInterval[1]:",
      "        newInterval[0] = min(newInterval[0], intervals[i][0])",
      "        newInterval[1] = max(newInterval[1], intervals[i][1])",
      "        i += 1                                   # overlaps -> merge",
      "    res.append(newInterval)",
      "    while i < n:",
      "        res.append(intervals[i]); i += 1        # after -> keep",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> a single pass over the intervals.</p>
      <p><b>Space O(n):</b> the output list.</p>`,
  },
  steps: [
    {
      narration: `Existing intervals <b>[1,3]</b> and <b>[6,9]</b>. We want to insert <b>[2,5]</b>
        (shown in orange).`,
      codeLine: 1,
      panels: [
        { type: "intervals", title: "intervals", range: [1, 9], items: [
          { start: 1, end: 3, cls: "a", label: "1–3" },
          { start: 6, end: 9, cls: "a", label: "6–9" },
        ] },
        { type: "intervals", title: "new interval", range: [1, 9], items: [{ start: 2, end: 5, cls: "cur", label: "2–5" }] },
      ],
    },
    {
      narration: `<b>[1,3]</b> overlaps [2,5] (3 ≥ 2), so merge: the new interval widens to
        <b>[1,5]</b>.`,
      codeLine: 6,
      panels: [
        { type: "intervals", title: "merging", range: [1, 9], items: [
          { start: 1, end: 3, cls: "dim", label: "1–3" },
          { start: 6, end: 9, cls: "a", label: "6–9" },
        ] },
        { type: "intervals", title: "new interval (widened)", range: [1, 9], items: [{ start: 1, end: 5, cls: "merged", label: "1–5" }] },
      ],
    },
    {
      narration: `<b>[6,9]</b> starts after 5 — no overlap. Add the merged <b>[1,5]</b>, then keep
        [6,9].`,
      codeLine: 10,
      panels: [
        { type: "intervals", title: "result", range: [1, 9], items: [
          { start: 1, end: 5, cls: "merged", label: "1–5" },
          { start: 6, end: 9, cls: "merged", label: "6–9" },
        ] },
      ],
    },
    {
      narration: `Final list: <b>[[1,5], [6,9]]</b>. 🎉`,
      codeLine: 13,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "[[1,5], [6,9]]" },
      ],
    },
  ],
});
