/* Counting Bits — Bit Manipulation + DP */
BLIND75.register("counting-bits", {
  kidPitch: `
    <p>Every whole number is secretly written in <b>binary</b> — a string of 1s and 0s. For every
    number from 0 to <b>n</b>, count how many <b>1s</b> it has. For <code>n = 5</code> the answer is
    <code>[0, 1, 1, 2, 1, 2]</code>.</p>
    <p>The clever trick: chop off a number's <b>last bit</b>. What's left is the number cut in half
    (<code>i &gt;&gt; 1</code>), whose 1-count we <b>already computed</b>! So 1s in <code>i</code> =
    1s in <code>i/2</code> + that last bit we chopped.</p>`,
  example: `<p>5 is <code>101</code> in binary → two 1s. And 5÷2 = 2 (<code>10</code>, one 1) plus
    5's last bit (1) = 1 + 1 = 2. ✔</p>`,
  concepts: [
    {
      name: "Binary numbers",
      html: `Instead of ten digits, binary uses just <b>0 and 1</b>. Reading right to left the
        columns are worth 1, 2, 4, 8… So <code>101</code> = 4 + 0 + 1 = 5.`,
    },
    {
      name: "Two handy bit tricks",
      html: `<code>i &gt;&gt; 1</code> (right shift) drops the last bit — same as integer-dividing by
        2. <code>i &amp; 1</code> (bitwise AND) grabs just the last bit: 1 if <code>i</code> is odd,
        0 if even.`,
    },
    {
      name: "Reusing earlier answers (DP)",
      html: `Because <code>i &gt;&gt; 1</code> is always a <b>smaller</b> number, we already stored
        its 1-count in <code>dp</code>. Looking it up is instant — no recounting.`,
    },
  ],
  idea: `<b>The plan:</b> <code>dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1)</code>. Take the already-known
    count for "i with its last bit removed," then add 1 if i's last bit is a 1.`,
  code: {
    lang: "python",
    lines: [
      "def countBits(n):",
      "    dp = [0] * (n + 1)",
      "    for i in range(1, n + 1):",
      "        dp[i] = dp[i >> 1] + (i & 1)",
      "    return dp",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> each number's count is one lookup plus one addition.</p>
      <p><b>Space O(n):</b> the <code>dp</code> array holding all <code>n+1</code> answers (which is
      also the output).</p>`,
  },
  steps: [
    {
      narration: `We want the 1-counts for 0…5. Start with <b>dp[0] = 0</b> (zero has no 1s).`,
      codeLine: 2,
      panels: [
        { type: "dp", title: "dp (number of 1-bits)", values: [0, "?", "?", "?", "?", "?"], highlight: { 0: "done" } },
      ],
    },
    {
      narration: `<b>i = 1</b> = <code>001</code>. Drop the last bit → 0 (dp[0]=0). Last bit is 1.
        dp[1] = 0 + 1 = <b>1</b>.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "i = 1", value: 1, width: 3, highlight: { 0: "one" } },
        { type: "dp", title: "dp (number of 1-bits)", values: [0, 1, "?", "?", "?", "?"], highlight: { 0: "seen", 1: "cur" } },
      ],
    },
    {
      narration: `<b>i = 2</b> = <code>010</code>. Drop last bit → 1 (dp[1]=1). Last bit is 0.
        dp[2] = 1 + 0 = <b>1</b>.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "i = 2", value: 2, width: 3, highlight: { 1: "one" } },
        { type: "dp", title: "dp (number of 1-bits)", values: [0, 1, 1, "?", "?", "?"], highlight: { 1: "seen", 2: "cur" } },
      ],
    },
    {
      narration: `<b>i = 3</b> = <code>011</code>. Drop last bit → 1 (dp[1]=1). Last bit is 1.
        dp[3] = 1 + 1 = <b>2</b>.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "i = 3", value: 3, width: 3, highlight: { 0: "one", 1: "one" } },
        { type: "dp", title: "dp (number of 1-bits)", values: [0, 1, 1, 2, "?", "?"], highlight: { 1: "seen", 3: "cur" } },
      ],
    },
    {
      narration: `<b>i = 4</b> = <code>100</code>. Drop last bit → 2 (dp[2]=1). Last bit 0. dp[4]=1+0=
        <b>1</b>. <b>i = 5</b> = <code>101</code> → dp[2]=1, last bit 1 → dp[5]=<b>2</b>.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "i = 5", value: 5, width: 3, highlight: { 0: "one", 2: "one" } },
        { type: "dp", title: "dp (number of 1-bits)", values: [0, 1, 1, 2, 1, 2], highlight: { 2: "seen", 4: "done", 5: "cur" } },
      ],
    },
    {
      narration: `Final answer: <b>[0, 1, 1, 2, 1, 2]</b>. 🎉`,
      codeLine: 5,
      panels: [
        { type: "dp", title: "dp", values: [0, 1, 1, 2, 1, 2], highlight: { 0: "good", 1: "good", 2: "good", 3: "good", 4: "good", 5: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>[0, 1, 1, 2, 1, 2]</b>" },
      ],
    },
  ],
});
