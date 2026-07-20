/* Minimum Window Substring — Sliding Window (Hard) */
BLIND75.register("minimum-window-substring", {
  kidPitch: `
    <p>Given a big string <b>s</b> and a small string <b>t</b>, find the <b>shortest piece</b> of s
    that contains <b>all</b> of t's letters (including repeats). It's like finding the tightest
    highlight over a paragraph that still covers every letter on your checklist.</p>
    <p>The trick: a sliding window that <b>grows right until it has everything</b>, then
    <b>shrinks from the left</b> to get as tight as possible — remembering the smallest valid window
    seen.</p>`,
  example: `<p><code>s = "ADOBECODEBANC"</code>, <code>t = "ABC"</code> → the answer is
    <code>"BANC"</code>.</p>`,
  concepts: [
    {
      name: "Need vs have",
      html: `Keep a checklist of how many of each letter <code>t</code> requires. A counter
        <code>missing</code> tracks how many still aren't covered. When <code>missing = 0</code>, the
        window has everything.`,
    },
    {
      name: "Expand then contract",
      html: `Grow the right edge to <b>find</b> a valid window, then push the left edge in to
        <b>tighten</b> it. Every time it's valid, compare its length to the best so far.`,
    },
  ],
  idea: `<b>The plan:</b> Move the right edge, checking off letters. Whenever the window covers all of
    t, record it if it's the smallest yet, then move the left edge inward (un-checking letters) until
    the window is no longer valid, and continue.`,
  code: {
    lang: "python",
    lines: [
      "def minWindow(s, t):",
      "    need = Counter(t)",
      "    missing = len(t)",
      "    l = 0",
      "    best = ''",
      "    for r in range(len(s)):",
      "        if need[s[r]] > 0:",
      "            missing -= 1",
      "        need[s[r]] -= 1",
      "        while missing == 0:          # window has all of t",
      "            if best == '' or r - l + 1 < len(best):",
      "                best = s[l : r + 1]",
      "            need[s[l]] += 1",
      "            if need[s[l]] > 0:",
      "                missing += 1",
      "            l += 1",
      "    return best",
    ],
  },
  complexity: {
    time: "O(|s| + |t|)",
    space: "O(|t|)",
    html: `<p><b>Time O(|s| + |t|):</b> each character of <code>s</code> is entered and left by the
      window at most once.</p>
      <p><b>Space O(|t|):</b> the "need" checklist holds the distinct letters of <code>t</code>.</p>`,
  },
  steps: [
    {
      narration: `Big string <b>"ADOBECODEBANC"</b>, checklist <b>t = "ABC"</b>. Find the shortest
        piece covering A, B, and C.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], labelsBelow: false },
        { type: "vars", title: "checklist", items: [["need", "A,B,C"]] },
      ],
    },
    {
      narration: `Grow the right edge until the window first contains all three: <b>"ADOBEC"</b>
        (indices 0–5). It's valid but long (6).`,
      codeLine: 10,
      panels: [
        { type: "array", title: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], labelsBelow: false, window: { start: 0, end: 5 }, pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 5, color: "pink" }] },
        { type: "vars", title: "best so far", items: [["best", "ADOBEC (6)"]] },
      ],
    },
    {
      narration: `Shrink from the left while still valid, then keep sliding right. A tighter valid
        window appears later around the end of the string.`,
      codeLine: 13,
      panels: [
        { type: "array", title: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], labelsBelow: false, window: { start: 5, end: 10 }, pointers: [{ name: "l", index: 5, color: "blue" }, { name: "r", index: 10, color: "pink" }] },
        { type: "vars", title: "best so far", items: [["best", "ADOBEC (6)"]] },
      ],
    },
    {
      narration: `The window <b>"BANC"</b> (indices 9–12) covers A, B, C and is only length <b>4</b> —
        a new smallest!`,
      codeLine: 12,
      panels: [
        { type: "array", title: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], labelsBelow: false, window: { start: 9, end: 12 }, highlight: { 9: "good", 10: "good", 11: "good", 12: "good" } },
        { type: "vars", title: "best so far", items: [["best", "BANC (4)"]] },
      ],
    },
    {
      narration: `No shorter window covers all of t. The minimum window is <b>"BANC"</b>. 🎉`,
      codeLine: 17,
      panels: [
        { type: "note", tone: "good", title: "answer", html: 'return <b>"BANC"</b>' },
      ],
    },
  ],
});
