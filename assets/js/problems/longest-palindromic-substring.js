/* Longest Palindromic Substring — 1-D Dynamic Programming */
BLIND75.register("longest-palindromic-substring", {
  kidPitch: `
    <p>Find the longest stretch inside a word that reads the same forwards and backwards (a
    <b>palindrome</b>). In <code>"babad"</code>, that's <code>"bab"</code> (or "aba").</p>
    <p>The trick: every palindrome has a <b>center</b> and grows outward symmetrically. So try each
    position as a center and <b>expand</b> left and right while the letters match. Do this for
    odd-length centers (a single letter) and even-length centers (between two letters), keeping the
    longest you find.</p>`,
  example: `<p><code>"babad"</code> → <code>"bab"</code> (length 3).</p>`,
  concepts: [
    {
      name: "Palindromes have a center",
      html: `A palindrome is a mirror. Its middle is either one letter (odd length, like "aba") or the
        gap between two letters (even length, like "abba").`,
    },
    {
      name: "Expand around center",
      html: `From a center, step outward one pair at a time; as long as the two sides match, the
        palindrome grows. Stop when they differ or you hit an edge.`,
    },
  ],
  idea: `<b>The plan:</b> For each index, expand around it as an odd center and as an even center,
    measuring how far the palindrome reaches. Track the longest substring seen.`,
  code: {
    lang: "python",
    lines: [
      "def longestPalindrome(s):",
      "    res = ''",
      "    def expand(l, r):",
      "        while l >= 0 and r < len(s) and s[l] == s[r]:",
      "            l -= 1",
      "            r += 1",
      "        return s[l+1 : r]",
      "    for i in range(len(s)):",
      "        odd = expand(i, i)        # center on one letter",
      "        even = expand(i, i+1)     # center between two letters",
      "        res = max(res, odd, even, key=len)",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n²)",
    space: "O(1)",
    html: `<p><b>Time O(n²):</b> there are <code>n</code> centers and each expansion can take up to
      <code>n</code> steps.</p>
      <p><b>Space O(1):</b> we only track indices and the best substring.</p>`,
  },
  steps: [
    {
      narration: `Word <b>"babad"</b>. We'll expand around each center to find the longest mirror.`,
      codeLine: 1,
      panels: [
        { type: "array", title: "s", values: ["b", "a", "b", "a", "d"] },
      ],
    },
    {
      narration: `Center on index 1 (<b>a</b>): compare the neighbors b…b — they match! Expand.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "s", values: ["b", "a", "b", "a", "d"], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 2, color: "pink" }], highlight: { 1: "cur" } },
        { type: "vars", title: "found", items: [["palindrome", "bab"]] },
      ],
    },
    {
      narration: `The sides are now off the ends (or would mismatch), so this palindrome is
        <b>"bab"</b>, length <b>3</b>.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["b", "a", "b", "a", "d"], highlight: { 0: "good", 1: "good", 2: "good" } },
        { type: "vars", title: "best", items: [["res", "bab"]] },
      ],
    },
    {
      narration: `Other centers ("aba" also length 3) don't beat it. Longest palindromic substring =
        <b>"bab"</b>. 🎉`,
      codeLine: 11,
      panels: [
        { type: "note", tone: "good", title: "answer", html: 'return <b>"bab"</b>' },
      ],
    },
  ],
});
