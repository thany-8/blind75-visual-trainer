/* Alien Dictionary — Advanced Graphs (Hard) */
BLIND75.register("alien-dictionary", {
  kidPitch: `
    <p>Aliens use our letters but in a <b>different order</b>. You're given a list of their words,
    sorted by their alien alphabet. Figure out that alphabet's letter order.</p>
    <p>The trick: compare each pair of <b>neighboring</b> words. The first spot where they differ
    tells you which letter comes first (like how "apple" &lt; "apricot" tells you p &lt; r). Turn
    those "before" facts into arrows in a graph, then <b>topologically sort</b> the letters into one
    valid order.</p>`,
  example: `<p><code>["wrt","wrf","er","ett","rftt"]</code> → the order is <code>"wertf"</code>.</p>`,
  concepts: [
    {
      name: "Ordering from neighbors",
      html: `Because the words are sorted, comparing two adjacent words at their first differing
        letter reveals one ordering fact: that earlier letter comes before the other.`,
    },
    {
      name: "Topological sort",
      html: `Collect all the "X before Y" facts as arrows. A <b>topological sort</b> lays the letters
        in a line so every arrow points forward — that line is the alien alphabet.`,
    },
  ],
  idea: `<b>The plan:</b> For each adjacent word pair, find the first differing character to get an
    edge <code>c1 → c2</code>. Build the graph of letters and topologically sort it (repeatedly take
    a letter with no remaining "must come before it").`,
  code: {
    lang: "python",
    lines: [
      "def alienOrder(words):",
      "    graph = {c: set() for w in words for c in w}",
      "    for a, b in zip(words, words[1:]):",
      "        for x, y in zip(a, b):",
      "            if x != y:",
      "                graph[x].add(y)   # x comes before y",
      "                break",
      "    # topological sort of the letters",
      "    return topo_sort(graph)",
    ],
  },
  complexity: {
    time: "O(total letters)",
    space: "O(unique letters)",
    html: `<p><b>Time O(C):</b> comparing adjacent words scans the total characters; the topo sort is
      linear in letters and edges.</p>
      <p><b>Space:</b> the graph over the unique letters.</p>`,
  },
  steps: [
    {
      narration: `Alien words, already sorted in their language:
        <b>wrt, wrf, er, ett, rftt</b>. Deduce the letter order.`,
      codeLine: 1,
      panels: [
        { type: "array", title: "words (sorted)", values: ["wrt", "wrf", "er", "ett", "rftt"], labelsBelow: false },
      ],
    },
    {
      narration: `Compare neighbors at their first difference: wrt vs wrf → <b>t before f</b>. wrf vs
        er → <b>w before e</b>. er vs ett → <b>r before t</b>. ett vs rftt → <b>e before r</b>.`,
      codeLine: 6,
      panels: [
        { type: "vars", title: "ordering facts", items: [["t → f", ""], ["w → e", ""], ["r → t", ""], ["e → r", ""]] },
      ],
    },
    {
      narration: `Turn the facts into arrows: <b>w → e → r → t → f</b>.`,
      codeLine: 6,
      panels: [
        { type: "graph", title: "letter order graph", directed: true, nodes: [{ id: "w" }, { id: "e" }, { id: "r" }, { id: "t" }, { id: "f" }], edges: [["w", "e"], ["e", "r"], ["r", "t"], ["t", "f"]] },
      ],
    },
    {
      narration: `Topologically sort the letters so every arrow points forward: <b>w, e, r, t,
        f</b>. 🎉`,
      codeLine: 9,
      panels: [
        { type: "array", title: "alien alphabet", values: ["w", "e", "r", "t", "f"], labelsBelow: false, highlight: { 0: "good", 1: "good", 2: "good", 3: "good", 4: "good" } },
        { type: "note", tone: "good", title: "answer", html: 'return <b>"wertf"</b>' },
      ],
    },
  ],
});
