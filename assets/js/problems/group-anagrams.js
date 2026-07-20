/* Group Anagrams — Arrays & Hashing */
BLIND75.register("group-anagrams", {
  kidPitch: `
    <p>Anagrams are words made of the <b>same letters</b> in a different order (<code>eat</code>,
    <code>tea</code>, <code>ate</code>). Sort a pile of words into groups where each group is all
    anagrams of each other.</p>
    <p>The trick: give every word a <b>fingerprint</b> by sorting its letters. <code>eat</code>,
    <code>tea</code>, and <code>ate</code> all become <code>aet</code> — the same fingerprint. Use
    that fingerprint as a map key and toss each word into its matching bucket.</p>`,
  example: `<p><code>["eat","tea","tan","ate","nat","bat"]</code> →
    <code>[["eat","tea","ate"], ["tan","nat"], ["bat"]]</code>.</p>`,
  concepts: [
    {
      name: "A canonical fingerprint",
      html: `Two words are anagrams exactly when their <b>sorted letters</b> match. So the sorted
        string is a perfect group label — all anagrams share it, non-anagrams don't.`,
    },
    {
      name: "Map from key to a list",
      html: `We use a hash map where each key maps to a <b>list</b> of words. <code>setdefault</code>
        creates an empty list the first time a key appears, then we append.`,
    },
  ],
  idea: `<b>The plan:</b> For each word, compute its sorted-letters key and append the word to that
    key's bucket in the map. The map's values are the groups.`,
  code: {
    lang: "python",
    lines: [
      "def groupAnagrams(strs):",
      "    groups = {}",
      "    for w in strs:",
      "        key = ''.join(sorted(w))",
      "        groups.setdefault(key, []).append(w)",
      "    return list(groups.values())",
    ],
  },
  complexity: {
    time: "O(n · k log k)",
    space: "O(n · k)",
    html: `<p><b>Time O(n·k log k):</b> for each of <code>n</code> words we sort its
      <code>k</code> letters.</p>
      <p><b>Space O(n·k):</b> we store every word inside the map's buckets.</p>`,
  },
  steps: [
    {
      narration: `Words <b>["eat","tea","tan","ate","nat","bat"]</b>. The bucket map starts empty.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], labelsBelow: false },
        { type: "map", title: "groups (fingerprint → words)", entries: [] },
      ],
    },
    {
      narration: `<b>"eat"</b> → sort letters → fingerprint <b>"aet"</b>. New bucket: aet → [eat].`,
      codeLine: 5,
      panels: [
        { type: "array", title: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], labelsBelow: false, highlight: { 0: "cur" } },
        { type: "map", title: "groups", entries: [["aet", "[eat]"]], highlightKey: "aet" },
      ],
    },
    {
      narration: `<b>"tea"</b> → also <b>"aet"</b>! Same bucket: aet → [eat, tea].`,
      codeLine: 5,
      panels: [
        { type: "array", title: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], labelsBelow: false, highlight: { 0: "seen", 1: "cur" } },
        { type: "map", title: "groups", entries: [["aet", "[eat, tea]"]], highlightKey: "aet" },
      ],
    },
    {
      narration: `<b>"tan"</b> → <b>"ant"</b> → new bucket ant → [tan].`,
      codeLine: 5,
      panels: [
        { type: "array", title: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], labelsBelow: false, highlight: { 2: "cur" } },
        { type: "map", title: "groups", entries: [["aet", "[eat, tea]"], ["ant", "[tan]"]], highlightKey: "ant" },
      ],
    },
    {
      narration: `The rest: <b>ate</b>→aet, <b>nat</b>→ant, <b>bat</b>→abt. Each drops into its
        fingerprint bucket.`,
      codeLine: 5,
      panels: [
        { type: "map", title: "groups", entries: [["aet", "[eat, tea, ate]"], ["ant", "[tan, nat]"], ["abt", "[bat]"]] },
      ],
    },
    {
      narration: `Return the buckets: <b>[[eat,tea,ate], [tan,nat], [bat]]</b>. 🎉`,
      codeLine: 6,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "[[eat, tea, ate], [tan, nat], [bat]]" },
      ],
    },
  ],
});
