/* Number of 1 Bits — Bit Manipulation */
BLIND75.register("number-of-1-bits", {
  kidPitch: `
    <p>Every number is secretly a string of <b>1s and 0s</b> (binary). Count how many <b>1s</b> a
    number has. This count is nicknamed the number's "population count" or <b>Hamming weight</b>.</p>
    <p>The trick: peek at the <b>last bit</b> (is it a 1?), add it to a tally, then <b>chop it off</b>
    by sliding all bits one place to the right. Repeat until the number becomes 0.</p>`,
  example: `<p><code>11</code> in binary is <code>1011</code> → three 1s → answer <code>3</code>.</p>`,
  concepts: [
    {
      name: "Reading binary",
      html: `Right to left, the columns are worth 1, 2, 4, 8… So <code>1011</code> = 8 + 0 + 2 + 1 =
        11. Each column is a "bit."`,
    },
    {
      name: "Two bit tools",
      html: `<code>n &amp; 1</code> reveals just the last bit (1 if odd, 0 if even).
        <code>n &gt;&gt; 1</code> shifts every bit one step right — throwing away that last bit,
        like dividing by 2.`,
    },
  ],
  idea: `<b>The plan:</b> While <code>n</code> isn't 0: add <code>n &amp; 1</code> (the last bit) to
    <code>count</code>, then do <code>n &gt;&gt;= 1</code> to drop that bit. When <code>n</code>
    reaches 0, <code>count</code> is the number of 1s.`,
  code: {
    lang: "python",
    lines: [
      "def hammingWeight(n):",
      "    count = 0",
      "    while n:",
      "        count += n & 1",
      "        n >>= 1",
      "    return count",
    ],
  },
  complexity: {
    time: "O(bits)",
    space: "O(1)",
    html: `<p><b>Time O(number of bits):</b> for a 32-bit integer that's at most 32 steps — constant
      time in practice.</p>
      <p><b>Space O(1):</b> just a counter.</p>`,
  },
  steps: [
    {
      narration: `Start with <b>n = 11</b> = <code>1011</code> in binary. count = 0.`,
      codeLine: 2,
      panels: [
        { type: "bits", title: "n = 11", value: 11, width: 4 },
        { type: "vars", title: "state", items: [["count", 0]] },
      ],
    },
    {
      narration: `Last bit is <b>1</b> → count = 1. Shift right: <code>1011</code> becomes
        <code>101</code> (which is 5).`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "n = 11", value: 11, width: 4, highlight: { 0: "one" } },
        { type: "vars", title: "state", items: [["count", 1]] },
      ],
    },
    {
      narration: `Now n = 5 = <code>101</code>. Last bit is <b>1</b> → count = 2. Shift right → 
        <code>10</code> (which is 2).`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "n = 5", value: 5, width: 4, highlight: { 0: "one" } },
        { type: "vars", title: "state", items: [["count", 2]] },
      ],
    },
    {
      narration: `Now n = 2 = <code>10</code>. Last bit is <b>0</b> → count stays 2. Shift right →
        <code>1</code>.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "n = 2", value: 2, width: 4, highlight: { 1: "one" } },
        { type: "vars", title: "state", items: [["count", 2]] },
      ],
    },
    {
      narration: `Now n = 1. Last bit is <b>1</b> → count = 3. Shift right → 0, so we stop.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "n = 1", value: 1, width: 4, highlight: { 0: "one" } },
        { type: "vars", title: "state", items: [["count", 3]] },
      ],
    },
    {
      narration: `n reached 0. The number of 1-bits is <b>3</b>. 🎉`,
      codeLine: 6,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>3</b>" },
      ],
    },
  ],
});
