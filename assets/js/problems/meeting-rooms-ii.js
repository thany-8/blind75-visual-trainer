/* Meeting Rooms II — Intervals */
BLIND75.register("meeting-rooms-ii", {
  kidPitch: `
    <p>Given many meetings, what's the <b>minimum number of rooms</b> you need so none of them clash?
    That's exactly the <b>most meetings happening at the same time</b>.</p>
    <p>The trick: separate all the <b>start</b> times and all the <b>end</b> times, each sorted. Sweep
    through time: every start needs a room (rooms go up), every end frees one (rooms go down). The
    highest the room count ever reaches is your answer.</p>`,
  example: `<p><code>[[0,30],[5,10],[15,20]]</code> → at one point three… no, at most <b>2</b>
    meetings overlap → <code>2</code> rooms.</p>`,
  concepts: [
    {
      name: "Answer = peak concurrency",
      html: `You need a room for every meeting occurring simultaneously. So the fewest rooms equals
        the <b>maximum number overlapping</b> at any instant.`,
    },
    {
      name: "Sweep starts vs ends",
      html: `Walk two sorted lists together. If the next <b>start</b> comes before the next
        <b>end</b>, a meeting begins (need a room); otherwise one finishes (free a room). Track the
        peak.`,
    },
  ],
  idea: `<b>The plan:</b> Sort start times and end times separately. Move a start pointer and end
    pointer forward: a start before an end means +1 room; otherwise −1. Record the maximum room count
    reached.`,
  code: {
    lang: "python",
    lines: [
      "def minMeetingRooms(intervals):",
      "    starts = sorted(i[0] for i in intervals)",
      "    ends = sorted(i[1] for i in intervals)",
      "    rooms = max_rooms = 0",
      "    s = e = 0",
      "    while s < len(starts):",
      "        if starts[s] < ends[e]:",
      "            rooms += 1; s += 1        # a meeting begins",
      "            max_rooms = max(max_rooms, rooms)",
      "        else:",
      "            rooms -= 1; e += 1        # a meeting ends",
      "    return max_rooms",
    ],
  },
  complexity: {
    time: "O(n log n)",
    space: "O(n)",
    html: `<p><b>Time O(n log n):</b> sorting the start and end lists.</p>
      <p><b>Space O(n):</b> the two sorted lists.</p>`,
  },
  steps: [
    {
      narration: `Meetings <b>[0,30], [5,10], [15,20]</b>. Split into sorted starts and ends.`,
      codeLine: 3,
      panels: [
        { type: "array", title: "starts", values: [0, 5, 15], labelsBelow: false },
        { type: "array", title: "ends", values: [10, 20, 30], labelsBelow: false },
        { type: "vars", title: "state", items: [["rooms", 0], ["max", 0]] },
      ],
    },
    {
      narration: `start 0 < end 10 → a meeting begins: rooms = 1. Next start 5 < end 10 → another
        begins: rooms = <b>2</b> (peak so far).`,
      codeLine: 8,
      panels: [
        { type: "array", title: "starts", values: [0, 5, 15], labelsBelow: false, highlight: { 0: "seen", 1: "cur" } },
        { type: "array", title: "ends", values: [10, 20, 30], labelsBelow: false, highlight: { 0: "cur" } },
        { type: "vars", title: "state", items: [["rooms", 2], ["max", 2]] },
      ],
    },
    {
      narration: `Next start 15 is <b>not</b> before end 10 → a meeting ends first: rooms drops to 1.
        Then start 15 < end 20 → begins again: rooms = 2 (ties the peak).`,
      codeLine: 12,
      panels: [
        { type: "array", title: "starts", values: [0, 5, 15], labelsBelow: false, highlight: { 2: "cur" } },
        { type: "array", title: "ends", values: [10, 20, 30], labelsBelow: false, highlight: { 0: "seen", 1: "cur" } },
        { type: "vars", title: "state", items: [["rooms", 2], ["max", 2]] },
      ],
    },
    {
      narration: `The most meetings overlapping at once was <b>2</b>, so we need <b>2</b> rooms. 🎉`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>2</b>" },
      ],
    },
  ],
});
