/* Maximum Product Subarray — 1-D Dynamic Programming */
BLIND75.register("maximum-product-subarray", {
  kidPitch: `
    <p>Find the connected run of numbers with the biggest <b>product</b> (multiply them). Tricky
    part: <b>negatives</b>. Two negatives multiply into a positive, so a tiny "most negative" running
    product can suddenly become the winner.</p>
    <p>The trick: at each step track <b>both</b> the biggest and the smallest running product ending
    here. When you hit a negative number, the biggest and smallest <b>swap roles</b> — so keeping the
    min around lets you bounce back to a large positive.</p>`,
  example: `<p><code>[2, 3, -2, 4]</code> → best product is <code>6</code> (from 2 × 3).</p>`,
  concepts: [
    {
      name: "Why track the minimum too",
      html: `A very negative product times another negative becomes very positive. So the current
        <b>min</b> is a candidate for a future <b>max</b> — we can't throw it away.`,
    },
    {
      name: "Reset on the number itself",
      html: `Sometimes the best move is to start fresh at the current number (e.g. after a zero). So
        each step considers <code>n</code> alone as well as <code>n × prevMax</code> and
        <code>n × prevMin</code>.`,
    },
  ],
  idea: `<b>The plan:</b> Keep <code>cur_max</code> and <code>cur_min</code>. For each number, the new
    max/min come from <code>{n, cur_max·n, cur_min·n}</code>. Update a global best with each
    <code>cur_max</code>.`,
  code: {
    lang: "python",
    lines: [
      "def maxProduct(nums):",
      "    res = nums[0]",
      "    cur_max = cur_min = nums[0]",
      "    for n in nums[1:]:",
      "        cands = (n, cur_max * n, cur_min * n)",
      "        cur_max = max(cands)",
      "        cur_min = min(cands)",
      "        res = max(res, cur_max)",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> a single pass.</p>
      <p><b>Space O(1):</b> just the running max, min, and best.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[2, 3, -2, 4]</b>. Start max = min = res = <b>2</b>.`,
      codeLine: 3,
      panels: [
        { type: "array", title: "nums", values: [2, 3, -2, 4], pointers: [{ name: "i", index: 0 }], highlight: { 0: "cur" } },
        { type: "vars", title: "state", items: [["cur_max", 2], ["cur_min", 2], ["res", 2]] },
      ],
    },
    {
      narration: `At <b>3</b>: candidates {3, 2·3=6, 2·3=6} → max 6, min 3. res climbs to <b>6</b>.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [2, 3, -2, 4], pointers: [{ name: "i", index: 1 }], highlight: { 0: "good", 1: "cur" } },
        { type: "vars", title: "state", items: [["cur_max", 6], ["cur_min", 3], ["res", 6]] },
      ],
    },
    {
      narration: `At <b>-2</b>: everything flips. Candidates {-2, 6·-2=-12, 3·-2=-6} → max -2, min
        -12. Notice we <b>keep</b> the -12 for later. res stays 6.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [2, 3, -2, 4], pointers: [{ name: "i", index: 2 }], highlight: { 2: "cur" } },
        { type: "vars", title: "state", items: [["cur_max", -2], ["cur_min", -12], ["res", 6]] },
      ],
    },
    {
      narration: `At <b>4</b>: candidates {4, -2·4=-8, -12·4=-48} → max 4, min -48. res stays
        <b>6</b>.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "nums", values: [2, 3, -2, 4], pointers: [{ name: "i", index: 3 }], highlight: { 3: "cur" } },
        { type: "vars", title: "state", items: [["cur_max", 4], ["res", 6]] },
      ],
    },
    {
      narration: `The biggest product of a connected run is <b>6</b> (from 2 × 3). 🎉`,
      codeLine: 9,
      panels: [
        { type: "array", title: "nums", values: [2, 3, -2, 4], highlight: { 0: "good", 1: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>6</b>" },
      ],
    },
  ],
});
