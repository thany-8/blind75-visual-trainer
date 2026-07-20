/* Longest Common Subsequence — 2-D Dynamic Programming */
BLIND75.register("longest-common-subsequence", {
  kidPitch: `
    <p>Given two strings, find the length of the longest sequence of characters that appears in
    <b>both</b>, in the same order (but not necessarily next to each other). For "ace" and "abcde"
    it's "ace", length 3.</p>
    <p>The trick is a <b>grid</b>: <code>dp[i][j]</code> is the LCS length of the first
    <code>i</code> letters of one string and first <code>j</code> of the other. If the two current
    letters <b>match</b>, take the diagonal answer plus one; if not, take the better of "drop a
    letter from string A" or "drop one from string B."</p>`,
  example: `<p><code>"ace"</code> vs <code>"abcde"</code> → LCS is <code>"ace"</code>, length
    <code>3</code>.</p>`,
  concepts: [
    {
      name: "Match → go diagonal + 1",
      html: `When <code>A[i] == B[j]</code>, that shared letter extends the LCS of the smaller
        prefixes: <code>dp[i][j] = dp[i-1][j-1] + 1</code>.`,
    },
    {
      name: "Mismatch → drop one letter",
      html: `When they differ, the LCS must skip a letter from one string: take the larger of
        <code>dp[i-1][j]</code> (skip A's letter) and <code>dp[i][j-1]</code> (skip B's).`,
    },
  ],
  idea: `<b>The plan:</b> Fill a <code>(m+1)×(n+1)</code> grid, with the empty row/column all zeros.
    Matching letters copy the diagonal + 1; mismatches take the max of the cell above or to the left.
    The bottom-right cell is the answer.`,
  code: {
    lang: "python",
    lines: [
      "def longestCommonSubsequence(t1, t2):",
      "    m, n = len(t1), len(t2)",
      "    dp = [[0]*(n+1) for _ in range(m+1)]",
      "    for i in range(1, m+1):",
      "        for j in range(1, n+1):",
      "            if t1[i-1] == t2[j-1]:",
      "                dp[i][j] = dp[i-1][j-1] + 1",
      "            else:",
      "                dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
      "    return dp[m][n]",
    ],
  },
  complexity: {
    time: "O(m·n)",
    space: "O(m·n)",
    html: `<p><b>Time O(m·n):</b> we fill every cell of the grid once.</p>
      <p><b>Space O(m·n):</b> the grid (reducible to two rows, O(n)).</p>`,
  },
  steps: [
    {
      narration: `Compare <b>"ace"</b> (rows) with <b>"abcde"</b> (columns). The empty row and column
        are all 0.`,
      codeLine: 3,
      panels: [
        { type: "grid", title: "dp   (cols: a b c d e)", cells: [["0", "0", "0", "0", "0", "0"], ["0", "?", "?", "?", "?", "?"], ["0", "?", "?", "?", "?", "?"], ["0", "?", "?", "?", "?", "?"]] },
        { type: "note", title: "rows / cols", html: "rows = a, c, e &nbsp;·&nbsp; cols = a, b, c, d, e" },
      ],
    },
    {
      narration: `Row 'a': it matches column 'a' → diagonal(0) + 1 = <b>1</b>, and that 1 carries
        across the rest of the row.`,
      codeLine: 7,
      panels: [
        { type: "grid", title: "dp", cells: [["0", "0", "0", "0", "0", "0"], ["0", "1", "1", "1", "1", "1"], ["0", "?", "?", "?", "?", "?"], ["0", "?", "?", "?", "?", "?"]], highlight: { "1,1": "sunk" } },
      ],
    },
    {
      narration: `Row 'c': it matches column 'c' → that cell becomes diagonal(1) + 1 = <b>2</b>.`,
      codeLine: 7,
      panels: [
        { type: "grid", title: "dp", cells: [["0", "0", "0", "0", "0", "0"], ["0", "1", "1", "1", "1", "1"], ["0", "1", "1", "2", "2", "2"], ["0", "?", "?", "?", "?", "?"]], highlight: { "2,3": "sunk" } },
      ],
    },
    {
      narration: `Row 'e': it matches column 'e' → diagonal(2) + 1 = <b>3</b> in the bottom-right
        corner.`,
      codeLine: 7,
      panels: [
        { type: "grid", title: "dp", cells: [["0", "0", "0", "0", "0", "0"], ["0", "1", "1", "1", "1", "1"], ["0", "1", "1", "2", "2", "2"], ["0", "1", "1", "2", "2", "3"]], highlight: { "3,5": "visiting" } },
      ],
    },
    {
      narration: `The bottom-right cell is <b>3</b> — the length of the LCS "ace". 🎉`,
      codeLine: 10,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>3</b>" },
      ],
    },
  ],
});
