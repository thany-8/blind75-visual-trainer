/* Coin Change — 1-D Dynamic Programming */
BLIND75.register("coin-change", {
  kidPitch: `
    <p>You have coins of certain values (say <b>1, 2, 5</b>) and want to make an <b>amount</b> (say
    11) using the <b>fewest coins</b>. You can reuse a coin as many times as you like.</p>
    <p>The trick: build the answers for every amount from <b>0 up to the target</b>. To make amount
    <code>a</code>, try each coin: using it leaves <code>a − coin</code>, whose best answer you
    <b>already know</b>. Add 1 for the coin you just used, and keep the smallest.</p>`,
  example: `<p><code>coins = [1,2,5]</code>, <code>amount = 11</code> → <code>3</code> coins
    (5 + 5 + 1).</p>`,
  concepts: [
    {
      name: "Build small answers first",
      html: `<code>dp[a]</code> = fewest coins to make amount <code>a</code>. We compute
        <code>dp[0], dp[1], dp[2] …</code> in order, so every value we need is already solved.`,
    },
    {
      name: "Try each coin",
      html: `For amount <code>a</code>, using coin <code>c</code> costs <code>dp[a − c] + 1</code>.
        We take the minimum over all coins that fit. If no coin can build it, it stays
        "impossible."`,
    },
  ],
  idea: `<b>The plan:</b> Start <code>dp[0] = 0</code>. For each amount <code>a</code> from 1 to the
    target, set <code>dp[a] = min(dp[a − c] + 1)</code> over every coin <code>c ≤ a</code>. The
    answer is <code>dp[amount]</code>.`,
  code: {
    lang: "python",
    lines: [
      "def coinChange(coins, amount):",
      "    dp = [amount + 1] * (amount + 1)   # 'infinity'",
      "    dp[0] = 0",
      "    for a in range(1, amount + 1):",
      "        for c in coins:",
      "            if c <= a:",
      "                dp[a] = min(dp[a], dp[a - c] + 1)",
      "    return dp[amount] if dp[amount] <= amount else -1",
    ],
  },
  complexity: {
    time: "O(amount × coins)",
    space: "O(amount)",
    html: `<p><b>Time O(amount × #coins):</b> for each amount we try every coin.</p>
      <p><b>Space O(amount):</b> the <code>dp</code> table with one slot per amount.</p>`,
  },
  steps: [
    {
      narration: `Coins <b>[1, 2, 5]</b>, target <b>11</b>. dp[a] = fewest coins for amount a. Base:
        dp[0] = <b>0</b> (zero coins make zero).`,
      codeLine: 3,
      panels: [
        { type: "dp", title: "dp (fewest coins)", values: [0, "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"] },
      ],
    },
    {
      narration: `dp[1]: only coin 1 fits → dp[0] + 1 = <b>1</b>. dp[2]: coin 2 gives dp[0] + 1 =
        <b>1</b> (better than two 1-coins).`,
      codeLine: 7,
      panels: [
        { type: "dp", title: "dp (fewest coins)", values: [0, 1, 1, "?", "?", "?", "?", "?", "?", "?", "?", "?"], highlight: { 0: "seen", 2: "cur" } },
      ],
    },
    {
      narration: `Continue up to dp[5]: coin 5 gives dp[0] + 1 = <b>1</b>. So far the table looks like
        this.`,
      codeLine: 7,
      panels: [
        { type: "dp", title: "dp (fewest coins)", values: [0, 1, 1, 2, 2, 1, "?", "?", "?", "?", "?", "?"], highlight: { 0: "seen", 5: "cur" } },
      ],
    },
    {
      narration: `Filling onward… dp[6]=2 (5+1), dp[10]=2 (5+5). Finally dp[11]: best is coin 5 →
        dp[6] + 1 = 2 + 1 = <b>3</b>.`,
      codeLine: 7,
      panels: [
        { type: "dp", title: "dp (fewest coins)", values: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3], highlight: { 6: "seen", 11: "cur" } },
      ],
    },
    {
      narration: `dp[11] = <b>3</b> coins (5 + 5 + 1). 🎉`,
      codeLine: 8,
      panels: [
        { type: "dp", title: "dp", values: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3], highlight: { 11: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>3</b>" },
      ],
    },
  ],
});
