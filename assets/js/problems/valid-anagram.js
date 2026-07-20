/* Valid Anagram — Arrays & Hashing */
BLIND75.register("valid-anagram", {
  kidPitch: `
    <p>Two words are <b>anagrams</b> if you can shuffle the letters of one to make the other —
    same letters, same amounts, different order. <code>"cat"</code> and <code>"act"</code> are
    anagrams. <code>"cat"</code> and <code>"car"</code> are not.</p>
    <p>The trick: <b>count the letters</b> in the first word, then <b>un-count</b> them using the
    second word. If everything cancels out perfectly to zero, they match!</p>`,
  example: `<p><code>s = "cat"</code>, <code>t = "act"</code> → same letters (one c, one a, one t)
    → <code>True</code>.</p>`,
  concepts: [
    {
      name: "Counting with a hash map",
      html: `We use a map like <code>letter → how many times it appears</code>. For
        <code>"cat"</code> that's <code>{c:1, a:1, t:1}</code>. This is called a
        <b>frequency count</b>.`,
    },
    {
      name: "Why check lengths first?",
      html: `If the two words have different lengths, they <b>can't</b> be anagrams — so we return
        <code>False</code> immediately and save work.`,
    },
  ],
  idea: `<b>The plan:</b> Count every letter in <code>s</code>. Then walk through <code>t</code>,
    subtracting one from each letter's count. If a count ever goes below zero (a letter we don't
    have), they're not anagrams. If we survive to the end, they are.`,
  code: {
    lang: "python",
    lines: [
      "def isAnagram(s, t):",
      "    if len(s) != len(t):",
      "        return False",
      "    count = {}",
      "    for c in s:",
      "        count[c] = count.get(c, 0) + 1",
      "    for c in t:",
      "        if count.get(c, 0) == 0:",
      "            return False",
      "        count[c] -= 1",
      "    return True",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> we walk through each word once to count and un-count.</p>
      <p><b>Space O(1):</b> there are only 26 lowercase letters, so the count map never grows past a
      fixed size no matter how long the words are.</p>`,
  },
  steps: [
    {
      narration: `Words <b>s = "cat"</b> and <b>t = "act"</b>. Same length (3), so far so good.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "s", values: ["c", "a", "t"] },
        { type: "array", title: "t", values: ["a", "c", "t"] },
        { type: "map", title: "count", entries: [] },
      ],
    },
    {
      narration: `Count the letters of <b>s</b>. See <b>c</b> → count c = 1.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["c", "a", "t"], pointers: [{ name: "c", index: 0 }], highlight: { 0: "cur" } },
        { type: "map", title: "count", entries: [["c", 1]], highlightKey: "c" },
      ],
    },
    {
      narration: `See <b>a</b> → count a = 1. Then <b>t</b> → count t = 1. Now we know exactly what
        letters "cat" is made of.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["c", "a", "t"], highlight: { 0: "seen", 1: "seen", 2: "cur" } },
        { type: "map", title: "count", entries: [["c", 1], ["a", 1], ["t", 1]], highlightKey: "t" },
      ],
    },
    {
      narration: `Now walk through <b>t</b>. First letter <b>a</b> — do we have an <b>a</b>? Count is
        1, yes. Subtract one → a = 0.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "t", values: ["a", "c", "t"], pointers: [{ name: "c", index: 0 }], highlight: { 0: "cur" } },
        { type: "map", title: "count", entries: [["c", 1], ["a", 0], ["t", 1]], highlightKey: "a" },
      ],
    },
    {
      narration: `Next <b>c</b> — have one? Yes → c = 0. Next <b>t</b> — have one? Yes → t = 0.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "t", values: ["a", "c", "t"], highlight: { 0: "seen", 1: "seen", 2: "cur" } },
        { type: "map", title: "count", entries: [["c", 0], ["a", 0], ["t", 0]], highlightKey: "t" },
      ],
    },
    {
      narration: `Every count cancelled to <b>zero</b> — the words used the exact same letters.
        Return <b>True</b>. 🎉`,
      codeLine: 11,
      panels: [
        { type: "map", title: "count", entries: [["c", 0], ["a", 0], ["t", 0]] },
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — they're anagrams!" },
      ],
    },
  ],
});
