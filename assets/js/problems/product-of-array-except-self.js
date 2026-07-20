/* Product of Array Except Self — Arrays & Hashing */
BLIND75.register("product-of-array-except-self", {
  kidPitch: `
    <p>For each number in a row, multiply <b>all the other numbers</b> together (skip the one
    you're standing on). And here's the catch: <b>no division allowed</b>.</p>
    <p>The trick: for any spot, the answer is <b>(everything to its left) × (everything to its
    right)</b>. So we do one pass collecting left-products, then a second pass multiplying in the
    right-products.</p>`,
  example: `<p><code>nums = [1, 2, 3, 4]</code> → <code>[2·3·4, 1·3·4, 1·2·4, 1·2·3]</code>
    = <code>[24, 12, 8, 6]</code>.</p>`,
  concepts: [
    {
      name: "Prefix product (everything to the left)",
      html: `Walking left→right, we keep a running product of everything we've passed so far. When
        we arrive at a spot, that running product is exactly "all numbers to my left."`,
    },
    {
      name: "Suffix product (everything to the right)",
      html: `Then we walk right→left doing the same thing for the right side, and multiply it into
        what we already stored. Left × Right = the answer for that spot.`,
    },
    {
      name: "Why avoid division?",
      html: `Division would break if any number is <b>0</b> (you can't divide by zero), and the
        problem forbids it anyway. The two-pass trick never divides.`,
    },
  ],
  idea: `<b>The plan:</b> Pass 1 (left→right): store into <code>res[i]</code> the product of
    everything before <code>i</code>. Pass 2 (right→left): multiply <code>res[i]</code> by the
    product of everything after <code>i</code>.`,
  code: {
    lang: "python",
    lines: [
      "def productExceptSelf(nums):",
      "    n = len(nums)",
      "    res = [1] * n",
      "    prefix = 1",
      "    for i in range(n):",
      "        res[i] = prefix",
      "        prefix *= nums[i]",
      "    suffix = 1",
      "    for i in range(n - 1, -1, -1):",
      "        res[i] *= suffix",
      "        suffix *= nums[i]",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> two simple passes over the list.</p>
      <p><b>Space O(1) extra:</b> we only keep two running numbers (prefix and suffix). The output
      array doesn't count as extra space.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[1, 2, 3, 4]</b>. Start <b>res</b> all as 1s and a running
        <b>prefix = 1</b>.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4] },
        { type: "array", title: "res", values: [1, 1, 1, 1] },
        { type: "vars", title: "running", items: [["prefix", 1]] },
      ],
    },
    {
      narration: `<b>Left pass.</b> At spot 0, store prefix (1) into res[0]. Then grow prefix by
        nums[0]: 1×1 = <b>1</b>.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4], pointers: [{ name: "i", index: 0 }], highlight: { 0: "cur" } },
        { type: "array", title: "res", values: [1, 1, 1, 1], highlight: { 0: "done" } },
        { type: "vars", title: "running", items: [["prefix", 1]] },
      ],
    },
    {
      narration: `Spot 1: res[1] = prefix = <b>1</b> (that's just the 1 on its left). Grow prefix:
        1×2 = <b>2</b>.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4], pointers: [{ name: "i", index: 1 }], highlight: { 1: "cur" } },
        { type: "array", title: "res", values: [1, 1, 1, 1], highlight: { 0: "done", 1: "done" } },
        { type: "vars", title: "running", items: [["prefix", 2]] },
      ],
    },
    {
      narration: `Spot 2: res[2] = prefix = <b>2</b> (1×2 on its left). Grow prefix: 2×3 = <b>6</b>.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4], pointers: [{ name: "i", index: 2 }], highlight: { 2: "cur" } },
        { type: "array", title: "res", values: [1, 1, 2, 1], highlight: { 2: "done" } },
        { type: "vars", title: "running", items: [["prefix", 6]] },
      ],
    },
    {
      narration: `Spot 3: res[3] = prefix = <b>6</b> (1×2×3). Left pass done — res now holds each
        spot's left-product.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4], pointers: [{ name: "i", index: 3 }], highlight: { 3: "cur" } },
        { type: "array", title: "res", values: [1, 1, 2, 6], highlight: { 3: "done" } },
        { type: "vars", title: "running", items: [["prefix", 24]] },
      ],
    },
    {
      narration: `<b>Right pass</b> with <b>suffix = 1</b>. Spot 3: res[3] = 6×1 = <b>6</b>. Grow
        suffix: 1×4 = <b>4</b>.`,
      codeLine: 10,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4], pointers: [{ name: "i", index: 3 }], highlight: { 3: "cur" } },
        { type: "array", title: "res", values: [1, 1, 2, 6], highlight: { 3: "good" } },
        { type: "vars", title: "running", items: [["suffix", 4]] },
      ],
    },
    {
      narration: `Spot 2: res[2] = 2×suffix(4) = <b>8</b>. Grow suffix: 4×3 = <b>12</b>.`,
      codeLine: 10,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4], pointers: [{ name: "i", index: 2 }], highlight: { 2: "cur" } },
        { type: "array", title: "res", values: [1, 1, 8, 6], highlight: { 2: "good", 3: "good" } },
        { type: "vars", title: "running", items: [["suffix", 12]] },
      ],
    },
    {
      narration: `Spot 1: res[1] = 1×12 = <b>12</b>. Spot 0: res[0] = 1×24 = <b>24</b>.`,
      codeLine: 10,
      panels: [
        { type: "array", title: "nums", values: [1, 2, 3, 4], pointers: [{ name: "i", index: 0 }], highlight: { 0: "cur" } },
        { type: "array", title: "res", values: [24, 12, 8, 6], highlight: { 0: "good", 1: "good", 2: "good", 3: "good" } },
        { type: "vars", title: "running", items: [["suffix", 24]] },
      ],
    },
    {
      narration: `Answer: <b>[24, 12, 8, 6]</b> — no division needed! 🎉`,
      codeLine: 12,
      panels: [
        { type: "array", title: "res", values: [24, 12, 8, 6], highlight: { 0: "good", 1: "good", 2: "good", 3: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>[24, 12, 8, 6]</b>" },
      ],
    },
  ],
});
