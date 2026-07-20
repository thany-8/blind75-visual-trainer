/* Combination Sum — Backtracking */
BLIND75.register("combination-sum", {
  kidPitch: `
    <p>Given some numbers and a target, find <b>every</b> combination that adds up to the target. You
    may <b>reuse</b> a number as many times as you want. Order doesn't matter, so [2,2,3] and [2,3,2]
    count as the same.</p>
    <p>The trick is <b>backtracking</b>: build a combination step by step. At each point, either
    <b>use the current number again</b> or <b>move on</b> to the next one. If the running total hits
    the target, save it; if it overshoots, back up and try something else.</p>`,
  example: `<p><code>candidates = [2,3,6,7]</code>, <code>target = 7</code> →
    <code>[[2,2,3], [7]]</code>.</p>`,
  concepts: [
    {
      name: "Backtracking",
      html: `Explore choices like a maze: go down a path, and if it fails (overshoots or runs out),
        <b>undo the last step</b> and try a different branch. Every leaf of this choice-tree is one
        combination.`,
    },
    {
      name: "Avoiding duplicate sets",
      html: `To not count [2,3] and [3,2] twice, we never go back to earlier numbers — each step may
        reuse the current number or advance, but never rewind.`,
    },
  ],
  idea: `<b>The plan:</b> DFS carrying the current combo and total. If total == target, record it. If
    it exceeds target or we run out of numbers, stop. Otherwise branch: (1) use
    <code>candidates[i]</code> again, or (2) skip to <code>i+1</code>.`,
  code: {
    lang: "python",
    lines: [
      "def combinationSum(candidates, target):",
      "    res = []",
      "    def dfs(i, cur, total):",
      "        if total == target:",
      "            res.append(cur[:]); return",
      "        if total > target or i == len(candidates):",
      "            return",
      "        cur.append(candidates[i])          # choice 1: reuse i",
      "        dfs(i, cur, total + candidates[i])",
      "        cur.pop()                          # undo",
      "        dfs(i + 1, cur, total)             # choice 2: skip to i+1",
      "    dfs(0, [], 0)",
      "    return res",
    ],
  },
  complexity: {
    time: "O(2^t)",
    space: "O(t)",
    html: `<p><b>Time:</b> exponential in the target (up to <code>2^t</code>-ish branches), because
      we explore the whole choice-tree — but overshoot-pruning cuts it down a lot.</p>
      <p><b>Space O(t):</b> the recursion depth and current combination.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[2, 3, 6, 7]</b>, target <b>7</b>. Build combinations that sum to 7;
        numbers can repeat.`,
      codeLine: 1,
      panels: [
        { type: "array", title: "candidates", values: [2, 3, 6, 7], labelsBelow: false },
        { type: "vars", title: "state", items: [["target", 7], ["current", "[]"], ["total", 0]] },
      ],
    },
    {
      narration: `Keep grabbing <b>2</b>: [2] → [2,2] → [2,2,2] (total 6). One more 2 makes 8 —
        <b>overshoot!</b> Back up.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "current combo", values: [2, 2, 2], labelsBelow: false, highlight: { 0: "cur", 1: "cur", 2: "cur" } },
        { type: "vars", title: "state", items: [["total", 6], ["next 2 →", 8] ] },
      ],
    },
    {
      narration: `From [2,2] (total 4), try the next number <b>3</b>: [2,2,3] = <b>7</b> — a match!
        Save it. 🎉`,
      codeLine: 5,
      panels: [
        { type: "array", title: "current combo", values: [2, 2, 3], labelsBelow: false, highlight: { 0: "good", 1: "good", 2: "good" } },
        { type: "note", title: "found", html: "[2, 2, 3]" },
      ],
    },
    {
      narration: `Backtrack all the way and skip ahead. Starting fresh with <b>7</b>: [7] = 7 —
        another match!`,
      codeLine: 5,
      panels: [
        { type: "array", title: "current combo", values: [7], labelsBelow: false, highlight: { 0: "good" } },
        { type: "note", title: "found", html: "[2, 2, 3] , [7]" },
      ],
    },
    {
      narration: `All combinations that sum to 7: <b>[[2, 2, 3], [7]]</b>. 🎉`,
      codeLine: 13,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "[[2, 2, 3], [7]]" },
      ],
    },
  ],
});
