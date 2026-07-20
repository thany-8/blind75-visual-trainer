/* Decode Ways — 1-D Dynamic Programming */
BLIND75.register("decode-ways", {
  kidPitch: `
    <p>Letters are coded as numbers: A = 1, B = 2, …, Z = 26. Given a string of digits, how many
    ways can it be decoded back into letters? <code>"226"</code> could be
    <b>2 2 6</b> (BBF), <b>22 6</b> (VF), or <b>2 26</b> (BZ) — 3 ways.</p>
    <p>The trick is dynamic programming: the number of ways to decode up to a position depends on the
    last <b>one</b> digit (if it's 1–9) and the last <b>two</b> digits (if they form 10–26). Add
    those up as you sweep across.</p>`,
  example: `<p><code>"226"</code> → <code>3</code> ways.</p>`,
  concepts: [
    {
      name: "Two ways to extend",
      html: `At each new digit you either decode it <b>alone</b> (valid if it's 1–9) or pair it with
        the digit before it (valid if the pair is 10–26). Each valid option contributes its earlier
        count.`,
    },
    {
      name: "Watch out for zeros",
      html: `A <code>0</code> can't stand alone (there's no letter 0), so it must be the second half
        of "10" or "20". Anything like "30" or a leading "0" decodes 0 ways.`,
    },
  ],
  idea: `<b>The plan:</b> <code>dp[i]</code> = ways to decode the first <code>i</code> digits. Add
    <code>dp[i−1]</code> if the single digit <code>s[i−1]</code> is 1–9, and add <code>dp[i−2]</code>
    if the two-digit <code>s[i−2..i−1]</code> is 10–26.`,
  code: {
    lang: "python",
    lines: [
      "def numDecodings(s):",
      "    dp = [0] * (len(s) + 1)",
      "    dp[0] = 1",
      "    dp[1] = 1 if s[0] != '0' else 0",
      "    for i in range(2, len(s) + 1):",
      "        if s[i-1] != '0':",
      "            dp[i] += dp[i-1]                 # one digit",
      "        if 10 <= int(s[i-2:i]) <= 26:",
      "            dp[i] += dp[i-2]                 # two digits",
      "    return dp[len(s)]",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> one pass with two constant-time checks per digit.</p>
      <p><b>Space O(n):</b> the dp array (shrinkable to O(1) with two variables).</p>`,
  },
  steps: [
    {
      narration: `Digits <b>"226"</b>. Base cases: dp[0] = 1 (empty), dp[1] = 1 ("2" → B).`,
      codeLine: 4,
      panels: [
        { type: "array", title: "s", values: ["2", "2", "6"], labelsBelow: false },
        { type: "dp", title: "dp (ways to decode first i)", values: [1, 1, "?", "?"], highlight: { 0: "done", 1: "done" } },
      ],
    },
    {
      narration: `i = 2: single "2" is valid → add dp[1] = 1. Two-digit "22" is 10–26 → add dp[0] = 1.
        dp[2] = <b>2</b>.`,
      codeLine: 7,
      panels: [
        { type: "array", title: "s", values: ["2", "2", "6"], labelsBelow: false, highlight: { 0: "seen", 1: "cur" } },
        { type: "dp", title: "dp", values: [1, 1, 2, "?"], highlight: { 0: "seen", 1: "seen", 2: "cur" } },
      ],
    },
    {
      narration: `i = 3: single "6" is valid → add dp[2] = 2. Two-digit "26" is 10–26 → add dp[1] = 1.
        dp[3] = <b>3</b>.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "s", values: ["2", "2", "6"], labelsBelow: false, highlight: { 1: "seen", 2: "cur" } },
        { type: "dp", title: "dp", values: [1, 1, 2, 3], highlight: { 1: "seen", 2: "seen", 3: "cur" } },
      ],
    },
    {
      narration: `dp[3] = <b>3</b> ways: BBF, VF, and BZ. 🎉`,
      codeLine: 10,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>3</b>" },
      ],
    },
  ],
});
