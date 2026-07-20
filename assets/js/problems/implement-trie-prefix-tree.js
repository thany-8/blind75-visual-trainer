/* Implement Trie (Prefix Tree) — Tries */
BLIND75.register("implement-trie-prefix-tree", {
  kidPitch: `
    <p>A <b>trie</b> (say "try") is a word tree. Words that start the same <b>share the same
    branches</b>, so "app" and "ape" share the path <code>a → p</code> before splitting. It makes
    "is this a word?" and "does any word start with this?" super fast.</p>
    <p>The trick: each node is a letter. To <b>insert</b>, walk/create the path letter by letter and
    put an "end-of-word" flag on the last node. To <b>search</b>, follow the path — if you fall off,
    it's not there; if you land on an end flag, it's a full word.</p>`,
  example: `<p>Insert "app" and "ape". <code>search("app")</code> → true;
    <code>search("ap")</code> → false (it's only a prefix); <code>startsWith("ap")</code> → true.</p>`,
  concepts: [
    {
      name: "Shared prefixes",
      html: `Every node represents one letter along a path from the root. Common beginnings reuse
        the same nodes, saving space and making lookups quick.`,
    },
    {
      name: "End-of-word marker",
      html: `A node needs a flag (here the key <code>#</code>) saying "a word ends here." Without it
        you couldn't tell a real word from a mere prefix.`,
    },
  ],
  idea: `<b>Insert:</b> from the root, for each letter move into that child (creating it if missing),
    then mark the final node as a word end. <b>Search:</b> follow letters from the root; a full word
    requires the end marker, a prefix just requires the path to exist.`,
  code: {
    lang: "python",
    lines: [
      "class Trie:",
      "    def __init__(self):",
      "        self.root = {}",
      "    def insert(self, word):",
      "        node = self.root",
      "        for c in word:",
      "            node = node.setdefault(c, {})",
      "        node['#'] = True          # mark end of word",
      "    def search(self, word):",
      "        node = self.root",
      "        for c in word:",
      "            if c not in node: return False",
      "            node = node[c]",
      "        return '#' in node",
    ],
  },
  complexity: {
    time: "O(L)",
    space: "O(total letters)",
    html: `<p><b>Time O(L):</b> insert and search each take steps equal to the word length
      <code>L</code>.</p>
      <p><b>Space O(total letters):</b> shared prefixes are stored once, so the trie holds at most
      the sum of all word lengths.</p>`,
  },
  steps: [
    {
      narration: `Start with an empty trie — just the root <b>•</b>.`,
      codeLine: 3,
      panels: [
        { type: "tree", title: "trie", root: { v: "•", id: "r" } },
      ],
    },
    {
      narration: `<b>Insert "app":</b> walk/create <b>a → p → p</b>, then flag the last node as an
        end-of-word.`,
      codeLine: 8,
      panels: [
        { type: "tree", title: "trie", highlight: { p2: "done" }, root: { v: "•", id: "r", left: { v: "a", id: "a", left: { v: "p", id: "p1", left: { v: "p", id: "p2" } } } } },
      ],
    },
    {
      narration: `<b>Insert "ape":</b> reuse the shared prefix <b>a → p</b>, then add a new branch
        <b>e</b> and flag it. See how "ap" is stored only once!`,
      codeLine: 8,
      panels: [
        { type: "tree", title: "trie", highlight: { p2: "done", e: "done" }, root: { v: "•", id: "r", left: { v: "a", id: "a", left: { v: "p", id: "p1", left: { v: "p", id: "p2" }, right: { v: "e", id: "e" } } } } },
      ],
    },
    {
      narration: `<b>search("app"):</b> follow •→a→p→p. The last node has the end flag → <b>True</b>.`,
      codeLine: 14,
      panels: [
        { type: "tree", title: "trie", highlight: { a: "visit", p1: "visit", p2: "cur", e: "done" }, root: { v: "•", id: "r", left: { v: "a", id: "a", left: { v: "p", id: "p1", left: { v: "p", id: "p2" }, right: { v: "e", id: "e" } } } } },
        { type: "note", tone: "good", title: "search(\"app\")", html: "→ <b>True</b>" },
      ],
    },
    {
      narration: `<b>search("ap"):</b> the path •→a→p exists, but that node has <b>no end flag</b>, so
        "ap" isn't a full word → <b>False</b> (though <code>startsWith("ap")</code> would be true).`,
      codeLine: 14,
      panels: [
        { type: "tree", title: "trie", highlight: { a: "visit", p1: "cur", p2: "done", e: "done" }, root: { v: "•", id: "r", left: { v: "a", id: "a", left: { v: "p", id: "p1", left: { v: "p", id: "p2" }, right: { v: "e", id: "e" } } } } },
        { type: "note", tone: "bad", title: "search(\"ap\")", html: "→ <b>False</b> (only a prefix)" },
      ],
    },
  ],
});
