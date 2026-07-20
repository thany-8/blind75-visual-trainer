/* Word Search — Backtracking */
BLIND75.register("word-search", {
  kidPitch: `
    <p>Given a grid of letters, can you spell a target word by walking from cell to cell
    (up/down/left/right)? You can't reuse the same cell twice in one word.</p>
    <p>The trick is <b>backtracking</b>: from every cell that matches the first letter, try to walk
    the word. Mark cells as "used" as you go so you don't step on them again, and <b>un-mark</b> them
    when you back out to try a different route.</p>`,
  example: `<p>Board with rows "ABCE / SFCS / ADEE", word <code>"ABCCED"</code> → <code>True</code>.</p>`,
  concepts: [
    {
      name: "DFS with marking",
      html: `From a matching cell, recurse into neighbors looking for the next letter. Temporarily
        blank out the current cell (mark it used) so the same square isn't reused within this path.`,
    },
    {
      name: "Undo on the way back",
      html: `If a path dead-ends, we restore the cell we blanked and try another direction — classic
        backtracking, exploring then undoing.`,
    },
  ],
  idea: `<b>The plan:</b> For each cell, DFS matching the word letter by letter. Mark the cell used,
    recurse to the 4 neighbors for the next letter, then restore the cell. Success when we've matched
    the whole word.`,
  code: {
    lang: "python",
    lines: [
      "def exist(board, word):",
      "    R, C = len(board), len(board[0])",
      "    def dfs(r, c, i):",
      "        if i == len(word): return True",
      "        if (r < 0 or c < 0 or r >= R or c >= C",
      "                or board[r][c] != word[i]):",
      "            return False",
      "        board[r][c] = '#'                 # mark used",
      "        found = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or",
      "                 dfs(r,c+1,i+1) or dfs(r,c-1,i+1))",
      "        board[r][c] = word[i]             # un-mark",
      "        return found",
      "    return any(dfs(r, c, 0) for r in range(R) for c in range(C))",
    ],
  },
  complexity: {
    time: "O(R·C·4^L)",
    space: "O(L)",
    html: `<p><b>Time O(R·C·4^L):</b> we may start at any of R·C cells and branch up to 4 ways to
      depth <code>L</code> (the word length).</p>
      <p><b>Space O(L):</b> the recursion depth follows the word length.</p>`,
  },
  steps: [
    {
      narration: `Board of letters; target word <b>"ABCCED"</b>. Can we trace it by walking
        neighbors?`,
      codeLine: 1,
      panels: [
        { type: "grid", title: "board", cells: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]] },
        { type: "note", title: "word", html: "A B C C E D" },
      ],
    },
    {
      narration: `Find the first letter <b>A</b> at (0,0). Mark it used and look for <b>B</b> next.`,
      codeLine: 8,
      panels: [
        { type: "grid", title: "board", cells: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], highlight: { "0,0": "visiting" } },
        { type: "vars", title: "matching", items: [["word[0]", "A ✓"]] },
      ],
    },
    {
      narration: `<b>B</b>(0,1) → <b>C</b>(0,2) match the next letters. Keep walking.`,
      codeLine: 8,
      panels: [
        { type: "grid", title: "board", cells: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "visiting" } },
        { type: "vars", title: "matching", items: [["so far", "A B C"]] },
      ],
    },
    {
      narration: `Turn down: <b>C</b>(1,2) → <b>E</b>(2,2) → <b>D</b>(2,1). That completes
        <b>ABCCED</b>! 🎉`,
      codeLine: 4,
      panels: [
        { type: "grid", title: "board", cells: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], highlight: { "0,0": "sunk", "0,1": "sunk", "0,2": "sunk", "1,2": "sunk", "2,2": "sunk", "2,1": "visiting" } },
        { type: "vars", title: "matching", items: [["so far", "A B C C E D"]] },
      ],
    },
    {
      narration: `The whole word was traced along a connected path. Return <b>True</b>.`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b>" },
      ],
    },
  ],
});
