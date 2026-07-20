/* Merge Intervals — Intervals */
BLIND75.register("merge-intervals", {
  kidPitch: `
    <p>You have a bunch of time ranges (intervals), like meetings on a calendar:
    <code>[1,3]</code>, <code>[2,6]</code>… Some <b>overlap</b>. Squish all the overlapping ones
    together into single bigger ranges.</p>
    <p>The trick: <b>sort by start time</b> so overlaps sit next to each other. Then sweep left to
    right. If the next range starts before the current one ends, they touch — stretch the current
    range to cover both. Otherwise, start a fresh range.</p>`,
  example: `<p><code>[[1,3],[2,6],[8,10],[15,18]]</code> → <code>[[1,6],[8,10],[15,18]]</code>
    ([1,3] and [2,6] overlap and merge into [1,6]).</p>`,
  concepts: [
    {
      name: "When do two intervals overlap?",
      html: `Once sorted by start, interval B overlaps the current one if <code>B.start ≤
        current.end</code> — B begins before (or exactly when) the current range finishes.`,
    },
    {
      name: "Why sort first?",
      html: `Sorting by start time guarantees that any overlaps are <b>adjacent</b>, so a single
        left-to-right sweep is enough — we never have to look backward.`,
    },
  ],
  idea: `<b>The plan:</b> Sort by start. Keep a result list. For each interval: if it overlaps the
    last result interval, extend that one's end to the max of the two. Otherwise append it as a new
    interval.`,
  code: {
    lang: "python",
    lines: [
      "def merge(intervals):",
      "    intervals.sort()",
      "    res = []",
      "    for start, end in intervals:",
      "        if res and start <= res[-1][1]:",
      "            res[-1][1] = max(res[-1][1], end)",
      "        else:",
      "            res.append([start, end])",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n log n)",
    space: "O(n)",
    html: `<p><b>Time O(n log n):</b> dominated by the sort; the sweep afterward is just
      <code>O(n)</code>.</p>
      <p><b>Space O(n):</b> the result list of merged intervals.</p>`,
  },
  steps: [
    {
      narration: `Intervals sorted by start: <b>[1,3], [2,6], [8,10], [15,18]</b>. Watch how the first
        two overlap.`,
      codeLine: 2,
      panels: [
        { type: "intervals", title: "input (sorted by start)", range: [1, 18], items: [
          { start: 1, end: 3, cls: "a", label: "1–3" },
          { start: 2, end: 6, cls: "a", label: "2–6" },
          { start: 8, end: 10, cls: "a", label: "8–10" },
          { start: 15, end: 18, cls: "a", label: "15–18" },
        ] },
      ],
    },
    {
      narration: `Take <b>[1,3]</b> as the first result interval.`,
      codeLine: 8,
      panels: [
        { type: "intervals", title: "input", range: [1, 18], items: [
          { start: 1, end: 3, cls: "cur", label: "1–3" },
          { start: 2, end: 6, cls: "a", label: "2–6" },
          { start: 8, end: 10, cls: "a", label: "8–10" },
          { start: 15, end: 18, cls: "a", label: "15–18" },
        ] },
        { type: "intervals", title: "result", range: [1, 18], items: [{ start: 1, end: 3, cls: "merged", label: "1–3" }] },
      ],
    },
    {
      narration: `Next is <b>[2,6]</b>. Its start (2) ≤ current end (3), so they overlap! Stretch the
        result to <b>[1,6]</b>.`,
      codeLine: 6,
      panels: [
        { type: "intervals", title: "input", range: [1, 18], items: [
          { start: 1, end: 3, cls: "dim", label: "1–3" },
          { start: 2, end: 6, cls: "cur", label: "2–6" },
          { start: 8, end: 10, cls: "a", label: "8–10" },
          { start: 15, end: 18, cls: "a", label: "15–18" },
        ] },
        { type: "intervals", title: "result", range: [1, 18], items: [{ start: 1, end: 6, cls: "merged", label: "1–6" }] },
      ],
    },
    {
      narration: `Next is <b>[8,10]</b>. Its start (8) > current end (6) — no overlap. Start a new
        result interval.`,
      codeLine: 8,
      panels: [
        { type: "intervals", title: "input", range: [1, 18], items: [
          { start: 1, end: 6, cls: "dim", label: "1–6" },
          { start: 8, end: 10, cls: "cur", label: "8–10" },
          { start: 15, end: 18, cls: "a", label: "15–18" },
        ] },
        { type: "intervals", title: "result", range: [1, 18], items: [
          { start: 1, end: 6, cls: "merged", label: "1–6" },
          { start: 8, end: 10, cls: "merged", label: "8–10" },
        ] },
      ],
    },
    {
      narration: `Last is <b>[15,18]</b>. 15 > 10, no overlap → another new interval. Done! Result:
        <b>[1,6], [8,10], [15,18]</b>. 🎉`,
      codeLine: 9,
      panels: [
        { type: "intervals", title: "result", range: [1, 18], items: [
          { start: 1, end: 6, cls: "merged", label: "1–6" },
          { start: 8, end: 10, cls: "merged", label: "8–10" },
          { start: 15, end: 18, cls: "merged", label: "15–18" },
        ] },
        { type: "note", tone: "good", title: "answer", html: "[[1,6], [8,10], [15,18]]" },
      ],
    },
  ],
});
