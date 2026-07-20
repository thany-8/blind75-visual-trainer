/* Longest Substring Without Repeating Characters — Sliding Window */
BLIND75.register("longest-substring-without-repeating-characters", {
  kidPitch: `
    <p>Find the longest run of letters in a word that has <b>no repeats</b>. In
    <code>"abcabcbb"</code> the best is <code>"abc"</code>, which is 3 letters long.</p>
    <p>The trick is a <b>sliding window</b>: a stretchy bracket over part of the word. Grow it to
    the right one letter at a time. If the new letter is already inside the window, shrink the left
    side until the duplicate is gone. The biggest the window ever gets is the answer.</p>`,
  example: `<p><code>"abcabcbb"</code> → longest no-repeat substring is <code>"abc"</code> →
    length <code>3</code>.</p>`,
  concepts: [
    {
      name: "Sliding window",
      html: `A <b>window</b> is a range <code>[l, r]</code> over the string. We slide <code>r</code>
        forward to include new letters and slide <code>l</code> forward to drop letters — the window
        stretches and shrinks but never jumps around.`,
    },
    {
      name: "A set of what's inside",
      html: `We keep a <b>set</b> of the letters currently in the window so we can instantly tell if
        a new letter is a repeat.`,
    },
  ],
  idea: `<b>The plan:</b> For each right end <code>r</code>: while <code>s[r]</code> is already in the
    window, remove <code>s[l]</code> and move <code>l</code> right. Then add <code>s[r]</code> and
    update the best length <code>r − l + 1</code>.`,
  code: {
    lang: "python",
    lines: [
      "def lengthOfLongestSubstring(s):",
      "    seen = set()",
      "    l = 0",
      "    best = 0",
      "    for r in range(len(s)):",
      "        while s[r] in seen:",
      "            seen.remove(s[l])",
      "            l += 1",
      "        seen.add(s[r])",
      "        best = max(best, r - l + 1)",
      "    return best",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(k)",
    html: `<p><b>Time O(n):</b> <code>l</code> and <code>r</code> each move forward at most
      <code>n</code> times total.</p>
      <p><b>Space O(k):</b> the set holds at most one of each distinct character (<code>k</code>
      different letters).</p>`,
  },
  steps: [
    {
      narration: `Word <b>"abcabcbb"</b>. Empty window, best = 0.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], labelsBelow: false },
        { type: "set", title: "window letters", items: [] },
        { type: "vars", title: "state", items: [["l", 0], ["best", 0]] },
      ],
    },
    {
      narration: `Grow right: add <b>a</b>, then <b>b</b>, then <b>c</b>. All new — window is
        <b>"abc"</b>, length <b>3</b>. best = 3.`,
      codeLine: 10,
      panels: [
        { type: "array", title: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], labelsBelow: false, window: { start: 0, end: 2 }, pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 2, color: "pink" }] },
        { type: "set", title: "window letters", items: ["a", "b", "c"] },
        { type: "vars", title: "state", items: [["l", 0], ["best", 3]] },
      ],
    },
    {
      narration: `Next letter (index 3) is <b>a</b> — but <b>a</b> is already in the window!
        Collision.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], labelsBelow: false, window: { start: 0, end: 2 }, pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 3, color: "pink" }], highlight: { 3: "bad" } },
        { type: "set", title: "window letters", items: ["a", "b", "c"], highlight: "a" },
      ],
    },
    {
      narration: `Shrink the left: drop <b>a</b> (the one at l), move l to 1. Now add the new
        <b>a</b>. Window is <b>"bca"</b> — still length 3. best stays 3.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], labelsBelow: false, window: { start: 1, end: 3 }, pointers: [{ name: "l", index: 1, color: "blue" }, { name: "r", index: 3, color: "pink" }] },
        { type: "set", title: "window letters", items: ["b", "c", "a"] },
        { type: "vars", title: "state", items: [["l", 1], ["best", 3]] },
      ],
    },
    {
      narration: `The window keeps sliding for the rest of the word, but it never grows past 3 (there
        are always repeats nearby). Final answer: <b>3</b>. 🎉`,
      codeLine: 11,
      panels: [
        { type: "array", title: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], labelsBelow: false, window: { start: 0, end: 2 }, highlight: { 0: "good", 1: "good", 2: "good" } },
        { type: "note", tone: "good", title: "answer", html: 'return <b>3</b> (from "abc")' },
      ],
    },
  ],
});
