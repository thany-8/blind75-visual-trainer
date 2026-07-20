/* Climbing Stairs — 1-D Dynamic Programming */
BLIND75.register("climbing-stairs", {
  kidPitch: `
    <p>You're climbing a staircase with <b>n</b> steps. Each move you can go up <b>1</b> step or
    <b>2</b> steps. How many <b>different ways</b> can you reach the top?</p>
    <p>The trick: to land on step <code>i</code>, your very last move came either from step
    <code>i−1</code> (a 1-step) or from step <code>i−2</code> (a 2-step). So the ways to reach
    <code>i</code> is just <b>ways(i−1) + ways(i−2)</b>. That's the Fibonacci pattern!</p>`,
  example: `<p><code>n = 5</code> → <code>8</code> different ways to climb.</p>`,
  concepts: [
    {
      name: "Dynamic programming (DP)",
      html: `<b>DP</b> means solving a big problem by solving smaller versions first and
        <b>remembering</b> their answers (so you never redo work). We store answers in an array
        called <code>dp</code>.`,
    },
    {
      name: "Why dp[i] = dp[i-1] + dp[i-2]?",
      html: `Every path to step <code>i</code> ends with one final hop. If that hop was a single
        step, you were on <code>i−1</code> before. If it was a double, you were on <code>i−2</code>.
        Those groups don't overlap and cover all paths, so you add them.`,
    },
  ],
  idea: `<b>The plan:</b> There's <b>1</b> way to be at the ground (<code>dp[0]=1</code>) and 1 way
    to reach step 1 (<code>dp[1]=1</code>). Then each higher step is the sum of the two below it.
    Build up to <code>dp[n]</code>.`,
  code: {
    lang: "python",
    lines: [
      "def climbStairs(n):",
      "    dp = [1] * (n + 1)      # dp[0] = dp[1] = 1",
      "    for i in range(2, n + 1):",
      "        dp[i] = dp[i-1] + dp[i-2]",
      "    return dp[n]",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> we fill each of the <code>n</code> steps once with a single
      addition.</p>
      <p><b>Space O(n):</b> the <code>dp</code> array. (You could shrink this to O(1) by keeping
      only the last two numbers.)</p>`,
  },
  steps: [
    {
      narration: `<b>n = 5</b> steps, hopping 1 or 2 at a time. <code>dp[i]</code> = number of ways
        to reach step <b>i</b>. Base cases: dp[0]=1 (already there) and dp[1]=1.`,
      codeLine: 2,
      panels: [
        { type: "dp", title: "dp (ways to reach step i)", values: [1, 1, "?", "?", "?", "?"], highlight: { 0: "done", 1: "done" } },
      ],
    },
    {
      narration: `Step 2: dp[2] = dp[1] + dp[0] = 1 + 1 = <b>2</b>. (Go 1+1, or one 2-step.)`,
      codeLine: 4,
      panels: [
        { type: "dp", title: "dp (ways to reach step i)", values: [1, 1, 2, "?", "?", "?"], highlight: { 0: "seen", 1: "seen", 2: "cur" } },
      ],
    },
    {
      narration: `Step 3: dp[3] = dp[2] + dp[1] = 2 + 1 = <b>3</b>.`,
      codeLine: 4,
      panels: [
        { type: "dp", title: "dp (ways to reach step i)", values: [1, 1, 2, 3, "?", "?"], highlight: { 1: "seen", 2: "seen", 3: "cur" } },
      ],
    },
    {
      narration: `Step 4: dp[4] = dp[3] + dp[2] = 3 + 2 = <b>5</b>.`,
      codeLine: 4,
      panels: [
        { type: "dp", title: "dp (ways to reach step i)", values: [1, 1, 2, 3, 5, "?"], highlight: { 2: "seen", 3: "seen", 4: "cur" } },
      ],
    },
    {
      narration: `Step 5: dp[5] = dp[4] + dp[3] = 5 + 3 = <b>8</b>. Notice the sequence 1, 1, 2, 3, 5,
        8 — that's Fibonacci!`,
      codeLine: 4,
      panels: [
        { type: "dp", title: "dp (ways to reach step i)", values: [1, 1, 2, 3, 5, 8], highlight: { 3: "seen", 4: "seen", 5: "cur" } },
      ],
    },
    {
      narration: `The answer is dp[5] = <b>8</b> ways to climb 5 steps. 🎉`,
      codeLine: 5,
      panels: [
        { type: "dp", title: "dp", values: [1, 1, 2, 3, 5, 8], highlight: { 5: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>8</b>" },
      ],
    },
  ],
});
