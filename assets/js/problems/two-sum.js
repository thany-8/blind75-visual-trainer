/* Two Sum — Arrays & Hashing */
BLIND75.register("two-sum", {
  kidPitch: `
    <p>Imagine you have a row of number cards: <b>2, 7, 11, 15</b>. A friend whispers a
    magic number — the <b>target</b> — which is <b>9</b>. Your job: find the
    <b>two cards that add up to 9</b> and shout out <i>where</i> they are (their positions).</p>
    <p>The slow way is to try every pair of cards. The clever way uses a
    <b>notebook</b> (called a <i>hash map</i>) to remember cards you've already seen, so
    each new card can instantly check if its partner already walked by.</p>`,
  example: `
    <p><code>nums = [2, 7, 11, 15]</code>, <code>target = 9</code></p>
    <p>2 + 7 = 9, and they sit at positions 0 and 1, so the answer is <code>[0, 1]</code>.</p>`,
  concepts: [
    {
      name: "What is an array?",
      html: `An <b>array</b> is just a row of boxes in a line, numbered starting at <code>0</code>.
        <code>[2, 7, 11, 15]</code> means box 0 holds 2, box 1 holds 7, and so on. That number
        (0, 1, 2…) is called the <b>index</b> or <b>position</b>.`,
    },
    {
      name: "What is a hash map?",
      html: `A <b>hash map</b> is like a magic notebook. You write pairs like
        <code>"key → value"</code>, and later you can ask <i>"is this key in my notebook?"</i> and
        get an answer <b>instantly</b> — you don't have to read every page. Here we store
        <code>number → position</code>.`,
    },
    {
      name: "Why not just check every pair?",
      html: `You could compare card 0 with 1, 2, 3… then card 1 with 2, 3… That works but it's
        slow: for a big list it's about <code>n × n</code> comparisons. The notebook trick lets us
        finish in a single walk through the list.`,
    },
  ],
  idea: `<b>The plan:</b> Walk through the cards once. For each card <code>n</code>, its partner
    must be <code>target − n</code>. Before storing <code>n</code>, peek in the notebook: is the
    partner already there? If yes, we found the pair. If no, jot down <code>n</code> and keep going.`,
  code: {
    lang: "python",
    lines: [
      "def twoSum(nums, target):",
      "    seen = {}                       # number -> index",
      "    for i, n in enumerate(nums):",
      "        need = target - n",
      "        if need in seen:",
      "            return [seen[need], i]",
      "        seen[n] = i",
      "    return []",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> we walk through the <code>n</code> cards <b>once</b>. Checking the
      notebook is instant, so the total work grows in a straight line with the list size.</p>
      <p><b>Space O(n):</b> in the worst case the notebook ends up holding almost every number, so
      the extra memory also grows with <code>n</code>.</p>
      <p>Compare that to checking every pair, which would be <code>O(n²)</code> — for 1,000 cards
      that's a million comparisons instead of a thousand!</p>`,
  },
  steps: [
    {
      narration: `We have cards <b>[2, 7, 11, 15]</b> and target <b>9</b>. We must find two cards
        that add to 9. Our notebook (hash map) starts <b>empty</b>.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums", values: [2, 7, 11, 15] },
        { type: "vars", title: "goal", items: [["target", 9]] },
        { type: "map", title: "seen (number → index)", entries: [] },
      ],
    },
    {
      narration: `Look at the first card <b>2</b> (position 0). Its partner must be
        <b>9 − 2 = 7</b>. Is 7 already in our notebook?`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums", values: [2, 7, 11, 15], pointers: [{ name: "i", index: 0 }], highlight: { 0: "cur" } },
        { type: "vars", title: "now", items: [["n", 2], ["need", 7]] },
        { type: "map", title: "seen (number → index)", entries: [] },
      ],
    },
    {
      narration: `The notebook is empty, so <b>7 is not there</b>. No partner yet — let's write down
        where 2 lives so a future card can find it.`,
      codeLine: 5,
      panels: [
        { type: "array", title: "nums", values: [2, 7, 11, 15], pointers: [{ name: "i", index: 0 }], highlight: { 0: "cur" } },
        { type: "vars", title: "now", items: [["n", 2], ["need", 7]] },
        { type: "map", title: "seen (number → index)", entries: [] },
      ],
    },
    {
      narration: `Jot it down: <b>2 lives at position 0</b>. On to the next card.`,
      codeLine: 7,
      panels: [
        { type: "array", title: "nums", values: [2, 7, 11, 15], highlight: { 0: "seen" } },
        { type: "vars", title: "now", items: [["n", 2], ["need", 7]] },
        { type: "map", title: "seen (number → index)", entries: [[2, 0]], highlightKey: 2 },
      ],
    },
    {
      narration: `Next card <b>7</b> (position 1). Its partner must be <b>9 − 7 = 2</b>.
        Is 2 in the notebook?`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums", values: [2, 7, 11, 15], pointers: [{ name: "i", index: 1 }], highlight: { 0: "seen", 1: "cur" } },
        { type: "vars", title: "now", items: [["n", 7], ["need", 2]] },
        { type: "map", title: "seen (number → index)", entries: [[2, 0]] },
      ],
    },
    {
      narration: `Yes! <b>2 is in the notebook</b>, at position 0. So card 0 (value 2) and card 1
        (value 7) add up to 9. 🎉`,
      codeLine: 5,
      panels: [
        { type: "array", title: "nums", values: [2, 7, 11, 15], highlight: { 0: "good", 1: "good" } },
        { type: "vars", title: "now", items: [["n", 7], ["need", 2]] },
        { type: "map", title: "seen (number → index)", entries: [[2, 0]], highlightKey: 2 },
      ],
    },
    {
      narration: `Return their positions: <b>[0, 1]</b>. Done — and we only walked through the list
        <b>once</b>!`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [2, 7, 11, 15], highlight: { 0: "good", 1: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>[0, 1]</b>" },
      ],
    },
  ],
});
