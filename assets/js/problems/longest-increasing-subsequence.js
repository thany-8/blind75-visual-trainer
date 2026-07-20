/* Longest Increasing Subsequence — 1-D Dynamic Programming */
BLIND75.register("longest-increasing-subsequence", {
  kidPitch: `
    <p>Find the length of the longest <b>increasing</b> run you can pick out of a list — the numbers
    must go up, but they don't have to be next to each other (you can skip around, keeping order).</p>
    <p>The trick: <code>dp[i]</code> = the length of the longest increasing pick that <b>ends</b> at
    position <code>i</code>. To fill it, look back at every earlier number that's smaller than
    <code>nums[i]</code> and extend the best of those by one.</p>`,
  example: `<p><code>[10,9,2,5,3,7,101,18]</code> → longest increasing subsequence has length
    <code>4</code> (e.g. 2, 3, 7, 101).</p>`,
  concepts: [
    {
      name: "Subsequence vs subarray",
      html: `A <b>subsequence</b> keeps order but may skip elements (2, 3, 7, 101). It's <i>not</i>
        required to be consecutive like a subarray.`,
    },
    {
      name: "Build on smaller earlier numbers",
      html: `Any increasing pick ending at <code>i</code> must come from some earlier
        <code>j</code> with <code>nums[j] &lt; nums[i]</code>. So <code>dp[i]</code> = 1 + the best
        such <code>dp[j]</code>.`,
    },
  ],
  idea: `<b>The plan:</b> Start every <code>dp[i]</code> at 1 (the number itself). For each
    <code>i</code>, scan earlier <code>j</code>; if <code>nums[j] &lt; nums[i]</code>, try
    <code>dp[i] = max(dp[i], dp[j] + 1)</code>. The answer is the largest <code>dp</code> value.`,
  code: {
    lang: "python",
    lines: [
      "def lengthOfLIS(nums):",
      "    dp = [1] * len(nums)",
      "    for i in range(len(nums)):",
      "        for j in range(i):",
      "            if nums[j] < nums[i]:",
      "                dp[i] = max(dp[i], dp[j] + 1)",
      "    return max(dp)",
    ],
  },
  complexity: {
    time: "O(n²)",
    space: "O(n)",
    html: `<p><b>Time O(n²):</b> each element looks back at all earlier ones. (A clever binary-search
      version reaches <code>O(n log n)</code>.)</p>
      <p><b>Space O(n):</b> the dp array.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[10,9,2,5,3,7,101,18]</b>. Every dp starts at <b>1</b> (each number alone
        is an increasing run of length 1).`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18] },
        { type: "dp", title: "dp (LIS ending at i)", values: [1, 1, 1, 1, 1, 1, 1, 1] },
      ],
    },
    {
      narration: `At <b>5</b> (index 3): the earlier <b>2</b> is smaller, so extend: dp[3] = dp[2] + 1
        = <b>2</b>. Similarly dp for 3 becomes 2.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], pointers: [{ name: "i", index: 3 }], highlight: { 2: "seen", 3: "cur" } },
        { type: "dp", title: "dp", values: [1, 1, 1, 2, 2, 1, 1, 1], highlight: { 3: "cur" } },
      ],
    },
    {
      narration: `At <b>7</b> (index 5): it beats 2, 5, and 3, so dp[5] = 3 (e.g. 2 → 3 → 7 or 2 → 5 →
        7). At <b>101</b>: dp = 4.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], pointers: [{ name: "i", index: 6 }], highlight: { 2: "seen", 4: "seen", 5: "seen", 6: "cur" } },
        { type: "dp", title: "dp", values: [1, 1, 1, 2, 2, 3, 4, 1], highlight: { 5: "seen", 6: "cur" } },
      ],
    },
    {
      narration: `The biggest dp value is <b>4</b> — the longest increasing subsequence (2, 3, 7,
        101). 🎉`,
      codeLine: 7,
      panels: [
        { type: "dp", title: "dp", values: [1, 1, 1, 2, 2, 3, 4, 4], highlight: { 6: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>4</b>" },
      ],
    },
  ],
});
