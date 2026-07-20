/* Longest Repeating Character Replacement — Sliding Window */
BLIND75.register("longest-repeating-character-replacement", {
  kidPitch: `
    <p>Given a string and up to <b>k</b> letter-swaps you're allowed to make, find the longest run
    you can turn into <b>all the same letter</b>.</p>
    <p>The trick is a sliding window plus one insight: a window is "fixable" if the number of
    letters you'd need to change — that's <b>(window length) − (count of the most common letter in
    it)</b> — is at most <b>k</b>. Grow the window while it's fixable; if it isn't, slide the left
    side in.</p>`,
  example: `<p><code>s = "AABABBA"</code>, <code>k = 1</code> → longest fixable run is length
    <code>4</code> (e.g. "AABA" → change the B → "AAAA").</p>`,
  concepts: [
    {
      name: "How many changes a window needs",
      html: `Keep every other letter as the majority letter and change the rest. So changes needed =
        <code>windowLen − maxCount</code>, where <code>maxCount</code> is how often the most common
        letter appears in the window.`,
    },
    {
      name: "Grow, and only slide when broken",
      html: `We expand the right edge each step. If changes-needed exceeds <code>k</code>, we nudge
        the left edge forward until the window is fixable again.`,
    },
  ],
  idea: `<b>The plan:</b> Track letter counts in the window and the biggest count <code>maxf</code>.
    For each right end, if <code>(r − l + 1) − maxf > k</code>, move <code>l</code> right. Record the
    largest window length seen.`,
  code: {
    lang: "python",
    lines: [
      "def characterReplacement(s, k):",
      "    count = {}",
      "    l = 0",
      "    best = 0",
      "    maxf = 0",
      "    for r in range(len(s)):",
      "        count[s[r]] = count.get(s[r], 0) + 1",
      "        maxf = max(maxf, count[s[r]])",
      "        while (r - l + 1) - maxf > k:",
      "            count[s[l]] -= 1",
      "            l += 1",
      "        best = max(best, r - l + 1)",
      "    return best",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> each edge moves forward at most <code>n</code> times.</p>
      <p><b>Space O(1):</b> the count map holds at most 26 letters.</p>`,
  },
  steps: [
    {
      narration: `String <b>"AABABBA"</b>, k = 1. Window starts empty; we look for the longest fixable
        stretch.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "s", values: ["A", "A", "B", "A", "B", "B", "A"], labelsBelow: false },
        { type: "vars", title: "state", items: [["k", 1], ["best", 0]] },
      ],
    },
    {
      narration: `Window <b>"AAB"</b>: A appears 2, B appears 1, so maxf = 2. Changes needed =
        3 − 2 = 1 ≤ k. Fixable! best = 3.`,
      codeLine: 12,
      panels: [
        { type: "array", title: "s", values: ["A", "A", "B", "A", "B", "B", "A"], labelsBelow: false, window: { start: 0, end: 2 }, pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 2, color: "pink" }] },
        { type: "vars", title: "state", items: [["maxf", 2], ["need", 1], ["best", 3]] },
      ],
    },
    {
      narration: `Window <b>"AABA"</b>: A = 3, maxf = 3. Changes needed = 4 − 3 = 1 ≤ k. Still
        fixable! best = 4.`,
      codeLine: 12,
      panels: [
        { type: "array", title: "s", values: ["A", "A", "B", "A", "B", "B", "A"], labelsBelow: false, window: { start: 0, end: 3 }, pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 3, color: "pink" }], highlight: { 0: "good", 1: "good", 3: "good" } },
        { type: "vars", title: "state", items: [["maxf", 3], ["need", 1], ["best", 4]] },
      ],
    },
    {
      narration: `Window <b>"AABAB"</b>: A = 3, B = 2, maxf = 3. Changes needed = 5 − 3 = 2 > k —
        too many! Slide <b>l</b> right to shrink back to fixable. best stays 4.`,
      codeLine: 10,
      panels: [
        { type: "array", title: "s", values: ["A", "A", "B", "A", "B", "B", "A"], labelsBelow: false, window: { start: 1, end: 4 }, pointers: [{ name: "l", index: 1, color: "blue" }, { name: "r", index: 4, color: "pink" }] },
        { type: "vars", title: "state", items: [["maxf", 3], ["best", 4]] },
      ],
    },
    {
      narration: `No later window beats it. The longest fixable run has length <b>4</b>. 🎉`,
      codeLine: 13,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>4</b>" },
      ],
    },
  ],
});
