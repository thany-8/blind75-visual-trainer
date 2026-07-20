/* Jump Game — Greedy */
BLIND75.register("jump-game", {
  kidPitch: `
    <p>You start on the first square of a row. Each square's number says the <b>maximum</b> steps
    you may jump forward from it. Can you reach the <b>last</b> square?</p>
    <p>The trick: keep track of the <b>farthest square you can reach so far</b>. Walk forward; at
    each square (as long as it's within reach) update how far you can now get. If your reach ever
    covers the last square, you win. If you land on a square you can't even reach, you're stuck.</p>`,
  example: `<p><code>nums = [2, 3, 1, 1, 4]</code> → yes, you can reach the end → <code>True</code>.</p>`,
  concepts: [
    {
      name: "Greedy = best-so-far",
      html: `A <b>greedy</b> approach keeps one simple running fact — here, the <b>farthest reach</b>
        — and updates it as it goes, never needing to try every possible path.`,
    },
    {
      name: "Why tracking reach is enough",
      html: `If you can reach square <code>i</code>, you can reach anything up to
        <code>i + nums[i]</code>. Extending the max reach at each step covers every square you could
        possibly stand on.`,
    },
  ],
  idea: `<b>The plan:</b> Start with <code>reach = 0</code>. For each index <code>i</code>: if
    <code>i</code> is beyond <code>reach</code>, you're stuck → <code>False</code>. Otherwise update
    <code>reach = max(reach, i + nums[i])</code>. Survive to the end → <code>True</code>.`,
  code: {
    lang: "python",
    lines: [
      "def canJump(nums):",
      "    reach = 0",
      "    for i in range(len(nums)):",
      "        if i > reach:",
      "            return False",
      "        reach = max(reach, i + nums[i])",
      "    return True",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> a single walk across the squares.</p>
      <p><b>Space O(1):</b> we only remember one number, <code>reach</code>.</p>`,
  },
  steps: [
    {
      narration: `Squares <b>[2, 3, 1, 1, 4]</b>. We start on square 0, so our reach is <b>0</b> so
        far. Goal: touch the last square (index 4).`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums", values: [2, 3, 1, 1, 4], window: { start: 0, end: 0 } },
        { type: "vars", title: "state", items: [["reach", 0]] },
      ],
    },
    {
      narration: `Square 0 holds <b>2</b>: from here we can jump up to index 0+2 = <b>2</b>. Reach
        grows to 2.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [2, 3, 1, 1, 4], pointers: [{ name: "i", index: 0 }], window: { start: 0, end: 2 }, highlight: { 0: "cur" } },
        { type: "vars", title: "state", items: [["reach", 2]] },
      ],
    },
    {
      narration: `Square 1 (within reach) holds <b>3</b>: 1+3 = <b>4</b>. Reach jumps to 4 — that's
        the last square already!`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [2, 3, 1, 1, 4], pointers: [{ name: "i", index: 1 }], window: { start: 0, end: 4 }, highlight: { 1: "cur", 4: "good" } },
        { type: "vars", title: "state", items: [["reach", 4]] },
      ],
    },
    {
      narration: `Squares 2 and 3 are within reach, but they don't extend it further (reach stays
        4). That's fine — the end is already covered.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums", values: [2, 3, 1, 1, 4], pointers: [{ name: "i", index: 3 }], window: { start: 0, end: 4 }, highlight: { 3: "cur", 4: "good" } },
        { type: "vars", title: "state", items: [["reach", 4]] },
      ],
    },
    {
      narration: `We reach index 4 (within reach) — the last square. Return <b>True</b>. 🎉`,
      codeLine: 7,
      panels: [
        { type: "array", title: "nums", values: [2, 3, 1, 1, 4], highlight: { 0: "good", 4: "good" }, window: { start: 0, end: 4 } },
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — the end is reachable" },
      ],
    },
  ],
});
