/* Missing Number — Bit Manipulation / Math */
BLIND75.register("missing-number", {
  kidPitch: `
    <p>You're given the numbers <code>0, 1, 2, …, n</code> but <b>one is missing</b> from the bag.
    Find the missing one.</p>
    <p>The trick uses a little math magic: we <b>know</b> what all those numbers <i>should</i> add up
    to (there's a formula). Add up what we actually have, and the difference is exactly the missing
    number!</p>`,
  example: `<p><code>nums = [3, 0, 1]</code> → the numbers 0..3 should be there, but <code>2</code>
    is missing.</p>`,
  concepts: [
    {
      name: "Sum of 0…n (Gauss's formula)",
      html: `The numbers <code>0 + 1 + 2 + … + n</code> add up to <code>n·(n+1)/2</code>. For n = 3
        that's <code>3·4/2 = 6</code>. This shortcut means we don't have to add them one by one.`,
    },
    {
      name: "Why the difference works",
      html: `The full set sums to the "expected" total. Our bag is missing exactly one number, so
        its sum is smaller by precisely that number. Expected − actual = the missing value.`,
    },
  ],
  idea: `<b>The plan:</b> Compute the expected sum of <code>0…n</code> with the formula, subtract the
    actual sum of the given numbers, and the leftover is the missing number.`,
  code: {
    lang: "python",
    lines: [
      "def missingNumber(nums):",
      "    n = len(nums)",
      "    expected = n * (n + 1) // 2",
      "    return expected - sum(nums)",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> adding up the given numbers takes one pass.</p>
      <p><b>Space O(1):</b> only a couple of running totals — no extra bag or set needed.</p>`,
  },
  steps: [
    {
      narration: `We have <b>[3, 0, 1]</b>. Since there are 3 numbers, the full set should be
        <b>0, 1, 2, 3</b> — but one is missing.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums (what we have)", values: [3, 0, 1] },
        { type: "array", title: "should be 0…3", values: [0, 1, 2, 3], highlight: { 0: "seen", 1: "seen", 3: "seen", 2: "bad" } },
      ],
    },
    {
      narration: `Expected sum of 0…3 using the formula: 3·(3+1)/2 = <b>6</b>.`,
      codeLine: 3,
      panels: [
        { type: "array", title: "should be 0…3", values: [0, 1, 2, 3] },
        { type: "vars", title: "math", items: [["expected", 6]] },
      ],
    },
    {
      narration: `Actual sum of what we have: 3 + 0 + 1 = <b>4</b>.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums", values: [3, 0, 1], highlight: { 0: "seen", 1: "seen", 2: "seen" } },
        { type: "vars", title: "math", items: [["expected", 6], ["actual", 4]] },
      ],
    },
    {
      narration: `Missing = expected − actual = 6 − 4 = <b>2</b>. 🎉`,
      codeLine: 4,
      panels: [
        { type: "array", title: "should be 0…3", values: [0, 1, 2, 3], highlight: { 2: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>2</b>" },
      ],
    },
  ],
});
