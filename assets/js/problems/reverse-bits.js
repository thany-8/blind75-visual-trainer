/* Reverse Bits — Bit Manipulation */
BLIND75.register("reverse-bits", {
  kidPitch: `
    <p>Take a number's binary form and <b>flip the order of its bits</b> — the first bit becomes the
    last, the last becomes the first, like reading the 1s and 0s backwards.</p>
    <p>The trick: peel bits off the <b>right</b> end of the input one at a time, and stack them onto
    the <b>left</b> end of the result. Each round, shift the result left to make room, then drop in
    the input's last bit. Do this for all the bits (32 in the real problem).</p>`,
  example: `<p>Reversing the 8-bit number <code>00000101</code> (5) gives <code>10100000</code>
    (160).</p>`,
  concepts: [
    {
      name: "Read right, write left",
      html: `<code>n &amp; 1</code> grabs the input's rightmost bit; <code>result &lt;&lt; 1</code>
        shifts the answer left to open a new slot. Combining them moves bits into reversed
        positions.`,
    },
    {
      name: "It's exactly 32 rounds",
      html: `The real problem uses 32-bit integers, so we repeat 32 times regardless of the value —
        a fixed, constant amount of work.`,
    },
  ],
  idea: `<b>The plan:</b> Start <code>result = 0</code>. Repeat for every bit: shift
    <code>result</code> left by 1 and OR in <code>n &amp; 1</code> (the current last bit of n), then
    shift <code>n</code> right. After all bits, <code>result</code> is the reversal.`,
  code: {
    lang: "python",
    lines: [
      "def reverseBits(n):",
      "    result = 0",
      "    for i in range(32):",
      "        result = (result << 1) | (n & 1)",
      "        n >>= 1",
      "    return result",
    ],
  },
  complexity: {
    time: "O(1)",
    space: "O(1)",
    html: `<p><b>Time O(1):</b> always exactly 32 iterations, no matter the input.</p>
      <p><b>Space O(1):</b> just the running result.</p>`,
  },
  steps: [
    {
      narration: `Using 8 bits to visualize: <b>n = 00000101</b> (5). result starts at
        <b>00000000</b>.`,
      codeLine: 2,
      panels: [
        { type: "bits", title: "n", value: 5, width: 8, highlight: { 0: "one" } },
        { type: "bits", title: "result", value: 0, width: 8 },
      ],
    },
    {
      narration: `Peel n's last bit (<b>1</b>) and drop it into result's low slot; shift n right. Then
        peel the next bit (0), and so on — each input bit lands in the mirror-image position.`,
      codeLine: 4,
      panels: [
        { type: "bits", title: "n (shifting right)", value: 2, width: 8 },
        { type: "bits", title: "result (filling from the left)", value: 128, width: 8, highlight: { 7: "one" } },
      ],
    },
    {
      narration: `After all 8 bits are moved, the order is fully flipped: result =
        <b>10100000</b> (160).`,
      codeLine: 6,
      panels: [
        { type: "bits", title: "n", value: 5, width: 8, highlight: { 0: "one", 2: "one" } },
        { type: "bits", title: "result (reversed)", value: 160, width: 8, highlight: { 5: "one", 7: "one" } },
      ],
    },
    {
      narration: `The bits are reversed: <b>00000101 → 10100000</b> = 160. 🎉`,
      codeLine: 6,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "reverse(00000101) = <b>10100000</b> (160)" },
      ],
    },
  ],
});
