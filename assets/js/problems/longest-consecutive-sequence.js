/* Longest Consecutive Sequence — Arrays & Hashing */
BLIND75.register("longest-consecutive-sequence", {
  kidPitch: `
    <p>Given a jumbled pile of numbers, find the length of the longest run of <b>consecutive</b>
    numbers (like 1, 2, 3, 4) — even though they're scattered and out of order. And do it fast,
    without sorting.</p>
    <p>The trick: dump everything into a <b>set</b> for instant lookups. A number is the
    <b>start</b> of a run only if <code>number − 1</code> is <b>not</b> in the set. From each start,
    count upward (<code>+1, +2, …</code>) as long as the next number exists.</p>`,
  example: `<p><code>[100, 4, 200, 1, 3, 2]</code> → the run <code>1, 2, 3, 4</code> has length
    <code>4</code>.</p>`,
  concepts: [
    {
      name: "Only count from a run's start",
      html: `If <code>n − 1</code> is also present, then <code>n</code> is in the <i>middle</i> of a
        run — someone else will count it. We only start counting at numbers with no left neighbor, so
        each run is measured exactly once.`,
    },
    {
      name: "Why it's O(n), not O(n²)",
      html: `Even though there's a loop inside a loop, each number is visited by an inner
        count-up at most once across the whole algorithm — so the total work is linear.`,
    },
  ],
  idea: `<b>The plan:</b> Put all numbers in a set. For each number that starts a run (no
    <code>n−1</code> present), walk <code>n+1, n+2, …</code> while they exist, measuring the run.
    Track the longest.`,
  code: {
    lang: "python",
    lines: [
      "def longestConsecutive(nums):",
      "    s = set(nums)",
      "    best = 0",
      "    for n in s:",
      "        if n - 1 not in s:          # n starts a run",
      "            length = 1",
      "            while n + length in s:",
      "                length += 1",
      "            best = max(best, length)",
      "    return best",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> each number is a run-start check once, and is stepped over by a
      count-up at most once.</p>
      <p><b>Space O(n):</b> the set holding all the numbers.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[100, 4, 200, 1, 3, 2]</b>. Drop them all into a set for instant "is it
        here?" checks.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums", values: [100, 4, 200, 1, 3, 2] },
        { type: "set", title: "set", items: [100, 4, 200, 1, 3, 2] },
      ],
    },
    {
      narration: `Is <b>100</b> a run start? Check for <b>99</b> — not in the set, so yes. Count up:
        is 101 here? No. Run length = <b>1</b>.`,
      codeLine: 5,
      panels: [
        { type: "set", title: "set", items: [100, 4, 200, 1, 3, 2], highlight: 100 },
        { type: "vars", title: "state", items: [["run from 100", 1], ["best", 1]] },
      ],
    },
    {
      narration: `Is <b>4</b> a run start? Check for <b>3</b> — it <i>is</i> in the set, so 4 is in the
        middle of a run. Skip it (someone else will count it).`,
      codeLine: 5,
      panels: [
        { type: "set", title: "set", items: [100, 4, 200, 1, 3, 2], highlight: 4 },
        { type: "vars", title: "state", items: [["best", 1]] },
      ],
    },
    {
      narration: `Is <b>1</b> a run start? Check for <b>0</b> — not present, so yes! Count up: 2? yes.
        3? yes. 4? yes. 5? no. Run length = <b>4</b>!`,
      codeLine: 7,
      panels: [
        { type: "array", title: "the run", values: [1, 2, 3, 4], highlight: { 0: "good", 1: "good", 2: "good", 3: "good" } },
        { type: "vars", title: "state", items: [["run from 1", 4], ["best", 4]] },
      ],
    },
    {
      narration: `200 starts a run of length 1. Nothing beats 4. Longest consecutive sequence =
        <b>4</b>. 🎉`,
      codeLine: 10,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>4</b> (the run 1, 2, 3, 4)" },
      ],
    },
  ],
});
