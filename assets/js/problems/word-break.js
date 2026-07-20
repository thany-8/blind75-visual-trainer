/* Word Break — 1-D Dynamic Programming */
BLIND75.register("word-break", {
  kidPitch: `
    <p>Given a string and a dictionary of words, can the string be chopped into a sequence of
    dictionary words (reusing words freely)? <code>"leetcode"</code> with {"leet", "code"} → yes.</p>
    <p>The trick: <code>dp[i]</code> answers "can the first <code>i</code> characters be fully broken
    into words?" It's true if there's some earlier point <code>j</code> where <code>dp[j]</code> is
    true <b>and</b> the chunk <code>s[j…i]</code> is a dictionary word.</p>`,
  example: `<p><code>s = "leetcode"</code>, dict = ["leet", "code"] → <code>True</code>
    ("leet" + "code").</p>`,
  concepts: [
    {
      name: "Break the string into a prefix + last word",
      html: `If <code>s[:i]</code> is breakable, then some <code>s[:j]</code> is breakable and the
        remaining piece <code>s[j:i]</code> is a single dictionary word.`,
    },
    {
      name: "A boolean DP",
      html: `Each <code>dp[i]</code> is just true/false. <code>dp[0]</code> is true (an empty string
        is trivially breakable), and we build up to <code>dp[len(s)]</code>.`,
    },
  ],
  idea: `<b>The plan:</b> Set <code>dp[0] = True</code>. For each end <code>i</code>, look for a split
    point <code>j</code> where <code>dp[j]</code> is true and <code>s[j:i]</code> is in the
    dictionary; if found, <code>dp[i] = True</code>.`,
  code: {
    lang: "python",
    lines: [
      "def wordBreak(s, wordDict):",
      "    words = set(wordDict)",
      "    dp = [False] * (len(s) + 1)",
      "    dp[0] = True",
      "    for i in range(1, len(s) + 1):",
      "        for j in range(i):",
      "            if dp[j] and s[j:i] in words:",
      "                dp[i] = True",
      "                break",
      "    return dp[len(s)]",
    ],
  },
  complexity: {
    time: "O(n²·k)",
    space: "O(n)",
    html: `<p><b>Time O(n²·k):</b> for each end we try each split, checking a substring (length up to
      <code>k</code>) against the dictionary.</p>
      <p><b>Space O(n):</b> the boolean dp array plus the word set.</p>`,
  },
  steps: [
    {
      narration: `String <b>"leetcode"</b>, dictionary {leet, code}. dp[0] = True (empty prefix is
        always breakable).`,
      codeLine: 4,
      panels: [
        { type: "array", title: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"], labelsBelow: false },
        { type: "note", title: "dictionary", html: "leet, code" },
      ],
    },
    {
      narration: `At i = 4: split at j = 0. dp[0] is True and <b>s[0:4] = "leet"</b> is a word →
        dp[4] = <b>True</b>.`,
      codeLine: 7,
      panels: [
        { type: "array", title: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"], labelsBelow: false, highlight: { 0: "good", 1: "good", 2: "good", 3: "good" } },
        { type: "vars", title: "dp", items: [["dp[0]", "True"], ["dp[4]", "True"]] },
      ],
    },
    {
      narration: `At i = 8: split at j = 4. dp[4] is True and <b>s[4:8] = "code"</b> is a word →
        dp[8] = <b>True</b>.`,
      codeLine: 7,
      panels: [
        { type: "array", title: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"], labelsBelow: false, highlight: { 4: "good", 5: "good", 6: "good", 7: "good" } },
        { type: "vars", title: "dp", items: [["dp[4]", "True"], ["dp[8]", "True"]] },
      ],
    },
    {
      narration: `dp[8] (the whole string) is True → <b>"leetcode" = "leet" + "code"</b>. 🎉`,
      codeLine: 10,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b>" },
      ],
    },
  ],
});
