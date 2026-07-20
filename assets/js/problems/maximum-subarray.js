/* Maximum Subarray — Greedy (Kadane's Algorithm) */
BLIND75.register("maximum-subarray", {
  kidPitch: `
    <p>Given a row of numbers (some positive, some negative), find the <b>connected run</b> of
    numbers with the <b>biggest total</b>. You must pick numbers that sit next to each other, and
    you have to pick at least one.</p>
    <p>The trick (called <b>Kadane's algorithm</b>): walk along keeping a "current run" total. At
    each number ask: is it better to <b>extend</b> my run, or <b>start fresh</b> from here? If the
    run's total ever helps, keep it; if it's dragging you down, drop it.</p>`,
  example: `<p><code>nums = [-2,1,-3,4,-1,2,1,-5,4]</code> → the run <code>[4,-1,2,1]</code> sums to
    <code>6</code>.</p>`,
  concepts: [
    {
      name: "Subarray",
      html: `A <b>subarray</b> is a slice of consecutive elements, like <code>[4,-1,2]</code>. It's
        <b>not</b> the same as picking scattered numbers — they must be neighbors.`,
    },
    {
      name: "Extend or restart?",
      html: `At each number <code>n</code>: if your running total <code>cur</code> is negative, it's
        only hurting you, so throw it away and restart at <code>n</code>. That's
        <code>cur = max(n, cur + n)</code>.`,
    },
  ],
  idea: `<b>The plan:</b> Keep <code>cur</code> (best run ending right here) and <code>best</code>
    (best run seen anywhere). For each new number, <code>cur = max(n, cur + n)</code>, then
    <code>best = max(best, cur)</code>.`,
  code: {
    lang: "python",
    lines: [
      "def maxSubArray(nums):",
      "    best = nums[0]",
      "    cur = nums[0]",
      "    for n in nums[1:]:",
      "        cur = max(n, cur + n)",
      "        best = max(best, cur)",
      "    return best",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> one walk through the list.</p>
      <p><b>Space O(1):</b> just two running numbers, <code>cur</code> and <code>best</code>.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[-2,1,-3,4,-1,2,1,-5,4]</b>. Start both cur and best at the first number:
        <b>-2</b>.`,
      codeLine: 3,
      panels: [
        { type: "array", title: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: "i", index: 0 }], highlight: { 0: "cur" } },
        { type: "vars", title: "state", items: [["cur", -2], ["best", -2]] },
      ],
    },
    {
      narration: `At <b>1</b>: extend (-2+1=-1) or restart (1)? 1 is bigger, so <b>start fresh</b>:
        cur=1. best jumps to 1.`,
      codeLine: 5,
      panels: [
        { type: "array", title: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: "i", index: 1 }], window: { start: 1, end: 1 }, highlight: { 1: "cur" } },
        { type: "vars", title: "state", items: [["cur", 1], ["best", 1]] },
      ],
    },
    {
      narration: `At <b>-3</b>: extend (1-3=-2) or restart (-3)? -2 is bigger, so extend: cur=-2. best
        stays 1.`,
      codeLine: 5,
      panels: [
        { type: "array", title: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: "i", index: 2 }], window: { start: 1, end: 2 }, highlight: { 2: "cur" } },
        { type: "vars", title: "state", items: [["cur", -2], ["best", 1]] },
      ],
    },
    {
      narration: `At <b>4</b>: extend (-2+4=2) or restart (4)? 4 wins, so <b>restart the run here</b>:
        cur=4. best=4. This is where our winning run begins!`,
      codeLine: 5,
      panels: [
        { type: "array", title: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: "i", index: 3 }], window: { start: 3, end: 3 }, highlight: { 3: "cur" } },
        { type: "vars", title: "state", items: [["cur", 4], ["best", 4]] },
      ],
    },
    {
      narration: `Keep extending: -1 → cur=3, then 2 → cur=5, then 1 → cur=<b>6</b>. Each time cur
        stays positive so extending wins. best climbs to <b>6</b>.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: "i", index: 6 }], window: { start: 3, end: 6 }, highlight: { 3: "good", 4: "good", 5: "good", 6: "cur" } },
        { type: "vars", title: "state", items: [["cur", 6], ["best", 6]] },
      ],
    },
    {
      narration: `At <b>-5</b>: cur drops to 1. At <b>4</b>: cur=5. Neither beats <b>6</b>, so best
        stays 6.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], pointers: [{ name: "i", index: 8 }], highlight: { 3: "good", 4: "good", 5: "good", 6: "good", 8: "cur" } },
        { type: "vars", title: "state", items: [["cur", 5], ["best", 6]] },
      ],
    },
    {
      narration: `The biggest run is <b>[4, -1, 2, 1] = 6</b>. 🎉`,
      codeLine: 7,
      panels: [
        { type: "array", title: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], window: { start: 3, end: 6 }, highlight: { 3: "good", 4: "good", 5: "good", 6: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>6</b>" },
      ],
    },
  ],
});
