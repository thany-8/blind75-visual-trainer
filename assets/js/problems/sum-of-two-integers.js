/* Sum of Two Integers — Bit Manipulation */
BLIND75.register("sum-of-two-integers", {
  kidPitch: `
    <p>Add two numbers <b>without using</b> the <code>+</code> or <code>−</code> operators. You're
    only allowed bit operations. Sounds impossible — until you remember how addition really works
    underneath!</p>
    <p>The trick: split addition into two parts. <b>XOR</b> (<code>^</code>) adds the bits but
    "forgets" to carry. <b>AND then shift left</b> (<code>(a &amp; b) &lt;&lt; 1</code>) computes
    exactly the carries. Keep folding the carry back in until there's no carry left.</p>`,
  example: `<p><code>2 + 3</code>: XOR handles the digits, carries get shifted in, and after a couple
    rounds the result is <code>5</code>.</p>`,
  concepts: [
    {
      name: "XOR = add without carry",
      html: `Bit by bit, <code>0+0=0, 1+0=1, 1+1=0</code> (carry ignored). That's exactly what
        <b>XOR</b> does — the sum if you never carried.`,
    },
    {
      name: "AND << 1 = the carries",
      html: `A carry happens only where <b>both</b> bits are 1 (that's <code>a &amp; b</code>), and a
        carry moves one place to the left (that's <code>&lt;&lt; 1</code>). Add it back and repeat
        until no carry remains.`,
    },
  ],
  idea: `<b>The plan:</b> While there's a carry: compute <code>carry = (a &amp; b) &lt;&lt; 1</code>,
    set <code>a = a ^ b</code> (sum so far), and <code>b = carry</code>. When <code>b</code> becomes
    0, <code>a</code> holds the total.`,
  code: {
    lang: "python",
    lines: [
      "def getSum(a, b):",
      "    while b != 0:",
      "        carry = (a & b) << 1",
      "        a = a ^ b            # sum without carrying",
      "        b = carry           # carry still to add",
      "    return a",
    ],
  },
  complexity: {
    time: "O(1)",
    space: "O(1)",
    html: `<p><b>Time O(1):</b> at most a fixed number of rounds (bounded by the bit-width, ~32).</p>
      <p><b>Space O(1):</b> just a couple of integers.</p>`,
  },
  steps: [
    {
      narration: `Add <b>a = 2</b> (<code>010</code>) and <b>b = 3</b> (<code>011</code>) using only
        bit tricks.`,
      codeLine: 1,
      panels: [
        { type: "bits", title: "a = 2", value: 2, width: 4 },
        { type: "bits", title: "b = 3", value: 3, width: 4 },
      ],
    },
    {
      narration: `<b>Sum without carry</b> = a ^ b = 010 ^ 011 = <b>001</b> (1). <b>Carry</b> =
        (a &amp; b) &lt;&lt; 1 = (010) &lt;&lt; 1 = <b>100</b> (4). Set a = 1, b = 4.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "a = a ^ b = 1", value: 1, width: 4, highlight: { 0: "one" } },
        { type: "bits", title: "b = carry = 4", value: 4, width: 4, highlight: { 2: "one" } },
      ],
    },
    {
      narration: `Round 2: a ^ b = 001 ^ 100 = <b>101</b> (5). Carry = (001 &amp; 100) &lt;&lt; 1 =
        <b>0</b>. Now b = 0, so we stop.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "a = a ^ b = 5", value: 5, width: 4, highlight: { 0: "one", 2: "one" } },
        { type: "bits", title: "b = carry = 0", value: 0, width: 4 },
      ],
    },
    {
      narration: `No carry left, so a is the answer: <b>2 + 3 = 5</b> — no + sign used! 🎉`,
      codeLine: 6,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>5</b>" },
      ],
    },
  ],
});
