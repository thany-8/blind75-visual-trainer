/* Top K Frequent Elements — Arrays & Hashing */
BLIND75.register("top-k-frequent-elements", {
  kidPitch: `
    <p>Find the <b>k numbers that appear most often</b> in a list. In
    <code>[1,1,1,2,2,3]</code> with k = 2, the answer is <code>[1, 2]</code> (1 appears 3 times,
    2 appears twice).</p>
    <p>The clever trick is <b>bucket sort by frequency</b>: make one bucket for "appears once", one
    for "appears twice", and so on. Drop each number into the bucket matching its count. Then read
    buckets from the busiest end until you have k numbers — no full sorting needed!</p>`,
  example: `<p><code>nums = [1,1,1,2,2,3]</code>, <code>k = 2</code> → <code>[1, 2]</code>.</p>`,
  concepts: [
    {
      name: "Frequency count",
      html: `First tally how many times each number shows up, using a hash map
        <code>number → count</code>.`,
    },
    {
      name: "Bucket sort by count",
      html: `A number can appear at most <code>n</code> times, so we make buckets 1…n. Bucket
        <code>c</code> holds every number that appears exactly <code>c</code> times. Reading from the
        highest bucket down gives most-frequent first — in <code>O(n)</code>, no comparisons.`,
    },
  ],
  idea: `<b>The plan:</b> Count frequencies. Put each number in the bucket indexed by its frequency.
    Walk buckets from highest frequency down, collecting numbers until you have <code>k</code>.`,
  code: {
    lang: "python",
    lines: [
      "def topKFrequent(nums, k):",
      "    count = {}",
      "    for n in nums:",
      "        count[n] = count.get(n, 0) + 1",
      "    buckets = [[] for _ in range(len(nums) + 1)]",
      "    for n, c in count.items():",
      "        buckets[c].append(n)",
      "    res = []",
      "    for c in range(len(buckets) - 1, 0, -1):",
      "        for n in buckets[c]:",
      "            res.append(n)",
      "            if len(res) == k:",
      "                return res",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> counting is one pass, filling buckets is one pass, and reading them
      is one pass — no <code>O(n log n)</code> sort.</p>
      <p><b>Space O(n):</b> the count map and the buckets.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[1,1,1,2,2,3]</b>, want the top <b>k = 2</b> most frequent.`,
      codeLine: 1,
      panels: [
        { type: "array", title: "nums", values: [1, 1, 1, 2, 2, 3] },
      ],
    },
    {
      narration: `Count how often each appears: <b>1 → 3 times, 2 → 2 times, 3 → 1 time</b>.`,
      codeLine: 4,
      panels: [
        { type: "map", title: "count (number → times)", entries: [[1, 3], [2, 2], [3, 1]] },
      ],
    },
    {
      narration: `Drop each number into the bucket for its frequency: bucket 3 gets 1, bucket 2 gets
        2, bucket 1 gets 3.`,
      codeLine: 7,
      panels: [
        { type: "map", title: "buckets (frequency → numbers)", entries: [[3, "[1]"], [2, "[2]"], [1, "[3]"]] },
      ],
    },
    {
      narration: `Read from the <b>highest</b> frequency down. Bucket 3 → take <b>1</b>. Bucket 2 →
        take <b>2</b>. Now we have k = 2 numbers, so stop.`,
      codeLine: 11,
      panels: [
        { type: "map", title: "buckets (frequency → numbers)", entries: [[3, "[1]"], [2, "[2]"], [1, "[3]"]], highlightKey: 3 },
        { type: "array", title: "res", values: [1, 2], highlight: { 0: "good", 1: "good" } },
      ],
    },
    {
      narration: `The two most frequent numbers are <b>[1, 2]</b>. 🎉`,
      codeLine: 13,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>[1, 2]</b>" },
      ],
    },
  ],
});
