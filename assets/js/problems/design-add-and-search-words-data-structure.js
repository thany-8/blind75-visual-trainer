/* Design Add and Search Words Data Structure — Tries */
BLIND75.register("design-add-and-search-words-data-structure", {
  kidPitch: `
    <p>Build a word dictionary that can <b>add</b> words and <b>search</b> them — but search allows a
    wildcard <b>.</b> that matches <b>any single letter</b>. So <code>".ad"</code> should match
    "bad", "dad", or "mad".</p>
    <p>The trick: store words in a <b>trie</b> (prefix tree). Normal letters follow one path. When
    search hits a <code>.</code>, it must <b>try every child</b> at that spot — a little branching
    search (DFS) through the trie.</p>`,
  example: `<p>Add "bad", "mad". <code>search("bad")</code> → true; <code>search(".ad")</code> →
    true; <code>search("pad")</code> → false.</p>`,
  concepts: [
    {
      name: "Trie recap",
      html: `A tree where each edge is a letter and shared prefixes share branches, with an
        end-of-word flag on the last node of each word.`,
    },
    {
      name: "Wildcard = branch out",
      html: `A normal letter follows one child. A <code>.</code> could be anything, so the search
        <b>forks</b> into all children and succeeds if <b>any</b> branch completes the word.`,
    },
  ],
  idea: `<b>Add:</b> like a trie insert. <b>Search:</b> recurse letter by letter. For a real letter,
    descend that one child. For <code>.</code>, try <b>all</b> children; succeed if any recursive
    search reaches an end-of-word.`,
  code: {
    lang: "python",
    lines: [
      "class WordDictionary:",
      "    def __init__(self):",
      "        self.root = {}",
      "    def addWord(self, word):",
      "        node = self.root",
      "        for c in word:",
      "            node = node.setdefault(c, {})",
      "        node['#'] = True",
      "    def search(self, word):",
      "        def dfs(node, i):",
      "            if i == len(word): return '#' in node",
      "            c = word[i]",
      "            if c == '.':",
      "                return any(dfs(ch, i+1) for k, ch in node.items() if k != '#')",
      "            return c in node and dfs(node[c], i+1)",
      "        return dfs(self.root, 0)",
    ],
  },
  complexity: {
    time: "O(L) / O(26^d · L)",
    space: "O(total letters)",
    html: `<p><b>Time:</b> a plain search is <code>O(L)</code>. Each <code>.</code> can branch to up
      to 26 children, so worst case grows with the number of dots <code>d</code>.</p>
      <p><b>Space O(total letters):</b> the trie, plus recursion depth for the search.</p>`,
  },
  steps: [
    {
      narration: `Add <b>"bad"</b> and <b>"mad"</b>. They share the suffix "ad" but start
        differently, so the root branches into <b>b</b> and <b>m</b>.`,
      codeLine: 8,
      panels: [
        { type: "tree", title: "trie", highlight: { bad: "done", mad: "done" }, root: { v: "•", id: "r", left: { v: "b", id: "b", left: { v: "a", id: "ba", left: { v: "d", id: "bad" } } }, right: { v: "m", id: "m", left: { v: "a", id: "ma", left: { v: "d", id: "mad" } } } } },
      ],
    },
    {
      narration: `<b>search("bad"):</b> real letters, one path: •→b→a→d, end flag present → <b>True</b>.`,
      codeLine: 15,
      panels: [
        { type: "tree", title: "trie", highlight: { b: "visit", ba: "visit", bad: "cur", mad: "done" }, root: { v: "•", id: "r", left: { v: "b", id: "b", left: { v: "a", id: "ba", left: { v: "d", id: "bad" } } }, right: { v: "m", id: "m", left: { v: "a", id: "ma", left: { v: "d", id: "mad" } } } } },
        { type: "note", tone: "good", title: "search(\"bad\")", html: "→ <b>True</b>" },
      ],
    },
    {
      narration: `<b>search(".ad"):</b> the <b>.</b> tries every child of the root — both <b>b</b> and
        <b>m</b> branches. Follow each with "ad".`,
      codeLine: 14,
      panels: [
        { type: "tree", title: "trie", highlight: { b: "visit", m: "visit" }, root: { v: "•", id: "r", left: { v: "b", id: "b", left: { v: "a", id: "ba", left: { v: "d", id: "bad" } } }, right: { v: "m", id: "m", left: { v: "a", id: "ma", left: { v: "d", id: "mad" } } } } },
        { type: "vars", title: "wildcard", items: [["'.' tries", "b, m"]] },
      ],
    },
    {
      narration: `The <b>m</b> branch completes: m→a→d has an end flag. Since one branch matched,
        <b>".ad" → True</b>. 🎉`,
      codeLine: 14,
      panels: [
        { type: "tree", title: "trie", highlight: { m: "visit", ma: "visit", mad: "cur", bad: "done" }, root: { v: "•", id: "r", left: { v: "b", id: "b", left: { v: "a", id: "ba", left: { v: "d", id: "bad" } } }, right: { v: "m", id: "m", left: { v: "a", id: "ma", left: { v: "d", id: "mad" } } } } },
        { type: "note", tone: "good", title: "search(\".ad\")", html: "→ <b>True</b>" },
      ],
    },
  ],
});
