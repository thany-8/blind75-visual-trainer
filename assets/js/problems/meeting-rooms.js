/* Meeting Rooms — Intervals */
BLIND75.register("meeting-rooms", {
  kidPitch: `
    <p>Given a list of meetings (each with a start and end time), can <b>one person</b> attend them
    <b>all</b>? That's only possible if <b>no two meetings overlap</b>.</p>
    <p>The trick: <b>sort the meetings by start time</b>. Then just check each meeting against the one
    before it — if a meeting starts before the previous one has ended, they clash and the answer is
    no.</p>`,
  example: `<p><code>[[0,30],[5,10],[15,20]]</code> → [5,10] starts before [0,30] ends → they
    overlap → <code>False</code>.</p>`,
  concepts: [
    {
      name: "Sort, then check neighbors",
      html: `Once sorted by start time, any overlap must be between <b>consecutive</b> meetings — so a
        single left-to-right scan comparing each to the previous is enough.`,
    },
    {
      name: "The overlap condition",
      html: `Meeting <code>i</code> clashes with the one before it when
        <code>start[i] &lt; end[i−1]</code> — it begins before the earlier one wraps up.`,
    },
  ],
  idea: `<b>The plan:</b> Sort by start time. Walk through; if any meeting starts before the previous
    one ends, return False. If none do, return True.`,
  code: {
    lang: "python",
    lines: [
      "def canAttendMeetings(intervals):",
      "    intervals.sort()",
      "    for i in range(1, len(intervals)):",
      "        if intervals[i][0] < intervals[i-1][1]:",
      "            return False        # overlap!",
      "    return True",
    ],
  },
  complexity: {
    time: "O(n log n)",
    space: "O(1)",
    html: `<p><b>Time O(n log n):</b> the sort dominates; the check is a single O(n) pass.</p>
      <p><b>Space O(1):</b> just comparing neighbors.</p>`,
  },
  steps: [
    {
      narration: `Meetings <b>[0,30], [5,10], [15,20]</b>, sorted by start time.`,
      codeLine: 2,
      panels: [
        { type: "intervals", title: "meetings (sorted by start)", range: [0, 30], items: [
          { start: 0, end: 30, cls: "a", label: "0–30" },
          { start: 5, end: 10, cls: "a", label: "5–10" },
          { start: 15, end: 20, cls: "a", label: "15–20" },
        ] },
      ],
    },
    {
      narration: `Compare <b>[5,10]</b> to the previous <b>[0,30]</b>: 5 < 30, so the second meeting
        starts while the first is still going. They <b>overlap!</b>`,
      codeLine: 4,
      panels: [
        { type: "intervals", title: "clash!", range: [0, 30], items: [
          { start: 0, end: 30, cls: "cur", label: "0–30" },
          { start: 5, end: 10, cls: "cur", label: "5–10" },
          { start: 15, end: 20, cls: "a", label: "15–20" },
        ] },
      ],
    },
    {
      narration: `Since two meetings overlap, one person can't attend them all. Return <b>False</b>.`,
      codeLine: 5,
      panels: [
        { type: "note", tone: "bad", title: "answer", html: "return <b>False</b>" },
      ],
    },
  ],
});
