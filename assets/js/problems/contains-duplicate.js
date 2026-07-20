/* Contains Duplicate — Arrays & Hashing */
BLIND75.register("contains-duplicate", {
  kidPitch: `
    <p>You have a handful of number cards. Question: does <b>any number show up more than
    once</b>? Like spotting if two kids in class share the exact same name.</p>
    <p>The trick: keep a <b>bag of numbers we've already seen</b> (a <i>hash set</i>). Each new
    card, we peek in the bag. Already there? Duplicate found! Not there? Drop it in and continue.</p>`,
  example: `<p><code>nums = [1, 2, 3, 1]</code> → the number <code>1</code> appears twice, so the
    answer is <code>True</code>.</p>`,
  concepts: [
    {
      name: "What is a hash set?",
      html: `A <b>set</b> is a bag that holds items with <b>no duplicates</b> and can tell you
        <i>"is this already inside?"</i> <b>instantly</b>. It's like a hash map that only cares
        about keys, not values.`,
    },
    {
      name: "Why is this fast?",
      html: `Peeking in a set is instant (about <code>O(1)</code>), so checking all
        <code>n</code> cards takes just <code>n</code> quick peeks — one clean walk through the list.`,
    },
  ],
  idea: `<b>The plan:</b> Keep a set of numbers already seen. For each number, if it's already in
    the set → we found a duplicate, return <code>True</code>. Otherwise add it and keep going. If we
    finish with no repeats, return <code>False</code>.`,
  code: {
    lang: "python",
    lines: [
      "def hasDuplicate(nums):",
      "    seen = set()",
      "    for n in nums:",
      "        if n in seen:",
      "            return True",
      "        seen.add(n)",
      "    return False",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> one peek + one add per card, and both are instant.</p>
      <p><b>Space O(n):</b> in the worst case (no duplicates) the bag holds every number.</p>`,
  },
  steps: [
    {
      narration: `Cards are <b>[1, 2, 3, 1]</b>. Our "seen" bag starts <b>empty</b>.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 1] },
        { type: "set", title: "seen", items: [] },
      ],
    },
    {
      narration: `First card <b>1</b>. Is 1 in the bag? The bag is empty, so <b>no</b>.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 1], pointers: [{ name: "n", index: 0 }], highlight: { 0: "cur" } },
        { type: "set", title: "seen", items: [] },
      ],
    },
    {
      narration: `Drop <b>1</b> into the bag and move on.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 1], highlight: { 0: "seen" } },
        { type: "set", title: "seen", items: [1], highlight: 1 },
      ],
    },
    {
      narration: `Card <b>2</b>. In the bag? No. Add it.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 1], pointers: [{ name: "n", index: 1 }], highlight: { 0: "seen", 1: "cur" } },
        { type: "set", title: "seen", items: [1, 2], highlight: 2 },
      ],
    },
    {
      narration: `Card <b>3</b>. In the bag? No. Add it.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 1], pointers: [{ name: "n", index: 2 }], highlight: { 0: "seen", 1: "seen", 2: "cur" } },
        { type: "set", title: "seen", items: [1, 2, 3], highlight: 3 },
      ],
    },
    {
      narration: `Last card <b>1</b>. Is 1 in the bag? <b>YES!</b> We've seen it before — that's a
        duplicate. 🎉`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 1], pointers: [{ name: "n", index: 3 }], highlight: { 0: "good", 3: "good", 1: "seen", 2: "seen" } },
        { type: "set", title: "seen", items: [1, 2, 3], highlight: 1 },
      ],
    },
    {
      narration: `Return <b>True</b> — the list has a duplicate.`,
      codeLine: 5,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b>" },
      ],
    },
  ],
});
