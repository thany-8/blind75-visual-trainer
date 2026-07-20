/* Word Search II — Tries + Backtracking (Hard) */
BLIND75.register("word-search-ii", {
  kidPitch: `
    <p>Given a grid of letters and a list of words, find <b>which words</b> can be spelled by walking
    the grid up/down/left/right (no reusing a cell in one word).</p>
    <p>Searching each word separately is slow. The trick: pack all the words into a <b>trie</b>, then
    do <b>one</b> walk of the grid. As you step around, you also walk down the trie — the moment the
    current path isn't a prefix of <b>any</b> word, you stop early (prune). Hit an end-of-word marker
    and you've found a word.</p>`,
  example: `<p>Board with "oath", "eat" spellable → answer <code>["oath", "eat"]</code>
    (words like "pea", "rain" aren't on the board).</p>`,
  concepts: [
    {
      name: "Why a trie?",
      html: `A trie lets one grid walk chase <b>all</b> words at once. If the letters so far match no
        word's prefix, the trie has no matching branch and we quit immediately — huge savings.`,
    },
    {
      name: "Backtracking on the board",
      html: `From each cell we DFS to neighbors, marking cells as used and un-marking them when we
        back out, so the same letter isn't reused within a single word.`,
    },
  ],
  idea: `<b>The plan:</b> Build a trie of the words. DFS from every cell, walking the trie alongside
    the board. Prune when the path leaves the trie; when a trie node marks end-of-word, record that
    word. Un-mark cells as you backtrack.`,
  code: {
    lang: "python",
    lines: [
      "def findWords(board, words):",
      "    trie = {}",
      "    for w in words:                 # build a trie of words",
      "        node = trie",
      "        for c in w: node = node.setdefault(c, {})",
      "        node['#'] = w",
      "    res, R, C = [], len(board), len(board[0])",
      "    def dfs(r, c, node):",
      "        ch = board[r][c]",
      "        if ch not in node: return   # prune: no word has this prefix",
      "        nxt = node[ch]",
      "        if '#' in nxt: res.append(nxt.pop('#'))",
      "        board[r][c] = '*'           # mark used",
      "        for nr, nc in neighbors(r, c):",
      "            if board[nr][nc] != '*': dfs(nr, nc, nxt)",
      "        board[r][c] = ch            # un-mark (backtrack)",
      "    for r in range(R):",
      "        for c in range(C): dfs(r, c, trie)",
      "    return res",
    ],
  },
  complexity: {
    time: "O(R·C·4^L)",
    space: "O(total letters)",
    html: `<p><b>Time O(R·C·4^L):</b> from each of the R·C cells we can branch up to 4 ways to depth
      <code>L</code> (the longest word) — but the trie prunes most of that in practice.</p>
      <p><b>Space O(total letters):</b> the trie holding all the words.</p>`,
  },
  steps: [
    {
      narration: `Board of letters plus a word list. Which words are hidden inside?`,
      codeLine: 1,
      panels: [
        { type: "grid", title: "board", cells: [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]] },
        { type: "note", title: "words", html: "oath, pea, eat, rain" },
      ],
    },
    {
      narration: `First, build a <b>trie</b> of all the words so one grid walk can chase them all at
        once (and prune dead ends).`,
      codeLine: 6,
      panels: [
        { type: "tree", title: "trie (words)", highlight: { oath: "done", eat: "done" }, root: { v: "•", id: "r", left: { v: "o", id: "o", left: { v: "a", id: "oa", left: { v: "t", id: "oat", left: { v: "h", id: "oath" } } } }, right: { v: "e", id: "e", left: { v: "a", id: "ea", left: { v: "t", id: "eat" } } } } },
      ],
    },
    {
      narration: `Walk the board following the trie: <b>o(0,0) → a(0,1) → t(1,1) → h(2,1)</b> reaches
        an end-of-word → found <b>"oath"</b>!`,
      codeLine: 11,
      panels: [
        { type: "grid", title: "board", cells: [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], highlight: { "0,0": "sunk", "0,1": "sunk", "1,1": "sunk", "2,1": "visiting" } },
        { type: "note", tone: "good", title: "found", html: "oath" },
      ],
    },
    {
      narration: `Another walk: <b>e(1,0) → a(0,1)?</b> … the path <b>e → a → t</b> spells
        <b>"eat"</b> → found! "pea" and "rain" never match a trie branch, so they're pruned fast.`,
      codeLine: 11,
      panels: [
        { type: "grid", title: "board", cells: [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], highlight: { "1,0": "sunk", "0,1": "sunk", "1,1": "visiting" } },
        { type: "note", tone: "good", title: "found", html: "oath, eat" },
      ],
    },
    {
      narration: `The words present on the board are <b>["oath", "eat"]</b>. 🎉`,
      codeLine: 17,
      panels: [
        { type: "note", tone: "good", title: "answer", html: '["oath", "eat"]' },
      ],
    },
  ],
});
