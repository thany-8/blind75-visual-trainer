/* House Robber II — 1-D Dynamic Programming */
BLIND75.register("house-robber-ii", {
  kidPitch: `
    <p>Same robber, same "no two adjacent houses" rule — but now the houses are in a <b>circle</b>,
    so the <b>first</b> and <b>last</b> houses are neighbors too. You can't rob both ends.</p>
    <p>The trick: turn the circle into two straight-line problems you already know how to solve.
    Either you <b>skip the last house</b> (rob houses <code>0 … n−2</code>) or you <b>skip the first
    house</b> (rob houses <code>1 … n−1</code>). Run the normal House Robber on each and take the
    bigger result.</p>`,
  example: `<p><code>nums = [1, 2, 3, 1]</code> (in a circle) → best is <code>4</code>.</p>`,
  concepts: [
    {
      name: "Break the circle",
      html: `The only new twist is that house 0 and house n−1 touch. If we simply forbid one of them,
        the circle becomes a plain line — and plain House Robber handles lines perfectly.`,
    },
    {
      name: "Two lines, take the max",
      html: `The best plan either excludes the first house or excludes the last (it can't need both
        ends). So the answer is <code>max(robLine(without last), robLine(without first))</code>.`,
    },
  ],
  idea: `<b>The plan:</b> Handle the 1-house edge case. Otherwise compute the classic linear
    House-Robber answer on <code>nums[:-1]</code> and on <code>nums[1:]</code>, and return the larger.`,
  code: {
    lang: "python",
    lines: [
      "def rob(nums):",
      "    if len(nums) == 1: return nums[0]",
      "    def rob_line(houses):",
      "        prev, cur = 0, 0",
      "        for n in houses:",
      "            prev, cur = cur, max(cur, prev + n)",
      "        return cur",
      "    return max(rob_line(nums[:-1]), rob_line(nums[1:]))",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> two linear sweeps over the houses.</p>
      <p><b>Space O(1):</b> each sweep keeps just two running values.</p>`,
  },
  steps: [
    {
      narration: `Houses <b>[1, 2, 3, 1]</b> arranged in a <b>circle</b> — house 0 and house 3 are
        neighbors, so we can't rob both.`,
      codeLine: 1,
      panels: [
        { type: "array", title: "money (circular)", values: [1, 2, 3, 1] },
      ],
    },
    {
      narration: `<b>Case A:</b> skip the last house → rob the line <b>[1, 2, 3]</b>. Classic House
        Robber gives best = <b>4</b> (rob 1 and 3).`,
      codeLine: 8,
      panels: [
        { type: "array", title: "case A: nums[:-1]", values: [1, 2, 3], highlight: { 0: "good", 2: "good" } },
        { type: "vars", title: "result", items: [["robLine(A)", 4]] },
      ],
    },
    {
      narration: `<b>Case B:</b> skip the first house → rob the line <b>[2, 3, 1]</b>. Best = <b>4</b>
        (rob 3 and 1).`,
      codeLine: 8,
      panels: [
        { type: "array", title: "case B: nums[1:]", values: [2, 3, 1], highlight: { 1: "good", 2: "good" } },
        { type: "vars", title: "result", items: [["robLine(B)", 4]] },
      ],
    },
    {
      narration: `Take the bigger: max(4, 4) = <b>4</b>. 🎉`,
      codeLine: 8,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>4</b>" },
      ],
    },
  ],
});
