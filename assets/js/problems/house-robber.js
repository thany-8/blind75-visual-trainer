/* House Robber — 1-D Dynamic Programming */
BLIND75.register("house-robber", {
  kidPitch: `
    <p>A row of houses each hides some money. You're a (cartoon!) robber, but there's a rule: the
    alarm goes off if you rob <b>two houses right next to each other</b>. What's the most money you
    can grab?</p>
    <p>The trick: stand at each house and ask, "what's my best total <i>up to here</i>?" You either
    <b>skip</b> this house (keep the best from the previous house) or <b>rob</b> it (its money plus
    the best from <b>two</b> houses back). Take whichever is bigger.</p>`,
  example: `<p><code>nums = [2, 7, 9, 3, 1]</code> → rob houses 2, 9, and 1 → <code>12</code>.</p>`,
  concepts: [
    {
      name: "The no-adjacent rule",
      html: `If you rob house <code>i</code>, you can't have robbed house <code>i−1</code>. So the
        best you could've had before is from house <code>i−2</code> — that's why we look
        <b>two</b> back.`,
    },
    {
      name: "Building the answer up",
      html: `<code>dp[i]</code> = the most money using houses <code>0..i</code>. Each one depends
        only on the two before it, so we sweep left to right filling the table.`,
    },
  ],
  idea: `<b>The plan:</b> <code>dp[i] = max(dp[i-1], dp[i-2] + money[i])</code> — the better of
    "skip house i" versus "rob house i plus the best from two back." The last entry is the answer.`,
  code: {
    lang: "python",
    lines: [
      "def rob(nums):",
      "    n = len(nums)",
      "    if n == 1: return nums[0]",
      "    dp = [0] * n",
      "    dp[0] = nums[0]",
      "    dp[1] = max(nums[0], nums[1])",
      "    for i in range(2, n):",
      "        dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
      "    return dp[-1]",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> one pass, one comparison per house.</p>
      <p><b>Space O(n):</b> the dp table (shrinkable to O(1) by keeping just the last two values).</p>`,
  },
  steps: [
    {
      narration: `Houses hold <b>[2, 7, 9, 3, 1]</b>. Base cases: dp[0]=2 (only one house), and
        dp[1]=max(2,7)=<b>7</b> (rob the better of the first two).`,
      codeLine: 6,
      panels: [
        { type: "array", title: "money", values: [2, 7, 9, 3, 1] },
        { type: "dp", title: "dp (best so far)", values: [2, 7, "?", "?", "?"], highlight: { 0: "done", 1: "done" } },
      ],
    },
    {
      narration: `House 2 holds <b>9</b>. Skip → dp[1]=7. Rob → 9 + dp[0]=2 = <b>11</b>. Bigger is
        11, so dp[2]=<b>11</b>.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "money", values: [2, 7, 9, 3, 1], pointers: [{ name: "i", index: 2 }], highlight: { 2: "cur", 0: "seen" } },
        { type: "dp", title: "dp (best so far)", values: [2, 7, 11, "?", "?"], highlight: { 2: "cur", 0: "seen", 1: "seen" } },
      ],
    },
    {
      narration: `House 3 holds <b>3</b>. Skip → dp[2]=11. Rob → 3 + dp[1]=7 = 10. Bigger is 11, so
        dp[3]=<b>11</b> (we don't rob this one).`,
      codeLine: 8,
      panels: [
        { type: "array", title: "money", values: [2, 7, 9, 3, 1], pointers: [{ name: "i", index: 3 }], highlight: { 3: "cur", 1: "seen" } },
        { type: "dp", title: "dp (best so far)", values: [2, 7, 11, 11, "?"], highlight: { 3: "cur", 1: "seen", 2: "seen" } },
      ],
    },
    {
      narration: `House 4 holds <b>1</b>. Skip → dp[3]=11. Rob → 1 + dp[2]=11 = <b>12</b>. Bigger is
        12, so dp[4]=<b>12</b>.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "money", values: [2, 7, 9, 3, 1], pointers: [{ name: "i", index: 4 }], highlight: { 4: "cur", 2: "seen" } },
        { type: "dp", title: "dp (best so far)", values: [2, 7, 11, 11, 12], highlight: { 4: "cur", 2: "seen", 3: "seen" } },
      ],
    },
    {
      narration: `The last entry wins: <b>12</b> (that's houses 2 + 9 + 1). 🎉`,
      codeLine: 9,
      panels: [
        { type: "array", title: "money", values: [2, 7, 9, 3, 1], highlight: { 0: "good", 2: "good", 4: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>12</b>" },
      ],
    },
  ],
});
