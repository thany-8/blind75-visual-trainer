/* Palindromic Substrings — 1-D Dynamic Programming */
BLIND75.register("palindromic-substrings", {
  kidPitch: `
    <p>Count <b>how many</b> substrings of a word are palindromes (read the same both ways). Each
    single letter counts, and longer mirrors count too. In <code>"aaa"</code> there are <b>6</b>:
    three "a", two "aa", and one "aaa".</p>
    <p>The trick is the same "expand around center" idea: try every center (single letter for odd
    lengths, the gap between two letters for even), and every time the letters still match as you
    expand, that's <b>one more</b> palindrome to count.</p>`,
  example: `<p><code>"aaa"</code> → <code>6</code> palindromic substrings.</p>`,
  concepts: [
    {
      name: "Every palindrome has a center",
      html: `A palindrome grows symmetrically from a middle. There are <code>2n − 1</code> possible
        centers: <code>n</code> single letters and <code>n − 1</code> gaps between letters.`,
    },
    {
      name: "Count while expanding",
      html: `Each successful expansion step (both sides still match) reveals a new, longer
        palindrome centered there — so we add 1 for each step.`,
    },
  ],
  idea: `<b>The plan:</b> For each center, expand outward while <code>s[l] == s[r]</code>, adding 1
    to the count on every match. Do this for odd and even centers.`,
  code: {
    lang: "python",
    lines: [
      "def countSubstrings(s):",
      "    count = 0",
      "    def expand(l, r):",
      "        nonlocal count",
      "        while l >= 0 and r < len(s) and s[l] == s[r]:",
      "            count += 1",
      "            l -= 1",
      "            r += 1",
      "    for i in range(len(s)):",
      "        expand(i, i)        # odd-length centers",
      "        expand(i, i + 1)    # even-length centers",
      "    return count",
    ],
  },
  complexity: {
    time: "O(n²)",
    space: "O(1)",
    html: `<p><b>Time O(n²):</b> up to <code>2n</code> centers, each expanding up to <code>n</code>
      steps.</p>
      <p><b>Space O(1):</b> just a counter and two indices.</p>`,
  },
  steps: [
    {
      narration: `Word <b>"aaa"</b>. Count every palindromic substring. count = 0.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "s", values: ["a", "a", "a"] },
        { type: "vars", title: "state", items: [["count", 0]] },
      ],
    },
    {
      narration: `<b>Odd centers</b>: each single letter is a palindrome (+3). The middle 'a' also
        expands to <b>"aaa"</b> (+1). Odd total so far: 4.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["a", "a", "a"], highlight: { 0: "good", 1: "good", 2: "good" } },
        { type: "vars", title: "state", items: [["count", 4]] },
      ],
    },
    {
      narration: `<b>Even centers</b>: the gap between letters 0–1 gives <b>"aa"</b> (+1), and the gap
        1–2 gives another <b>"aa"</b> (+1). Even total: 2.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["a", "a", "a"], pointers: [{ name: "l", index: 1, color: "blue" }, { name: "r", index: 2, color: "pink" }] },
        { type: "vars", title: "state", items: [["count", 6]] },
      ],
    },
    {
      narration: `Total palindromic substrings: 4 + 2 = <b>6</b>. 🎉`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>6</b>" },
      ],
    },
  ],
});
