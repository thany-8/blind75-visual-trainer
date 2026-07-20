/* Find Median from Data Stream — Heap / Priority Queue (Hard) */
BLIND75.register("find-median-from-data-stream", {
  kidPitch: `
    <p>Numbers arrive one at a time forever, and at any moment you must be able to report the
    <b>median</b> (the middle value). Re-sorting everything each time would be far too slow.</p>
    <p>The trick: keep the numbers split into two piles — a <b>low half</b> and a <b>high half</b> —
    that stay balanced in size. The low half is a <b>max-heap</b> (its biggest is on top) and the
    high half is a <b>min-heap</b> (its smallest on top). The median is always sitting right at those
    two tops.</p>`,
  example: `<p>Add 1, 2, 3 → after each, the median is 1, then 1.5, then 2.</p>`,
  concepts: [
    {
      name: "What is a heap?",
      html: `A <b>heap</b> is a structure that always hands you its smallest (min-heap) or largest
        (max-heap) item instantly, and lets you add items cheaply — perfect for "keep an eye on the
        extreme."`,
    },
    {
      name: "Two heaps hug the middle",
      html: `The low half's <b>max</b> and the high half's <b>min</b> are the two values closest to
        the center. Keep the halves' sizes within 1 of each other and the median is right there.`,
    },
  ],
  idea: `<b>The plan:</b> Add each number to the low max-heap, shuffle the top over to the high
    min-heap if it belongs there, and rebalance sizes. Median = the larger heap's top (odd count) or
    the average of both tops (even count).`,
  code: {
    lang: "python",
    lines: [
      "class MedianFinder:",
      "    def __init__(self):",
      "        self.low = []   # max-heap (store negatives)",
      "        self.high = []  # min-heap",
      "    def addNum(self, num):",
      "        heappush(self.low, -num)",
      "        if self.low and self.high and -self.low[0] > self.high[0]:",
      "            heappush(self.high, -heappop(self.low))",
      "        if len(self.low) > len(self.high) + 1:",
      "            heappush(self.high, -heappop(self.low))",
      "        if len(self.high) > len(self.low) + 1:",
      "            heappush(self.low, -heappop(self.high))",
      "    def findMedian(self):",
      "        if len(self.low) > len(self.high): return -self.low[0]",
      "        if len(self.high) > len(self.low): return self.high[0]",
      "        return (-self.low[0] + self.high[0]) / 2",
    ],
  },
  complexity: {
    time: "O(log n) add, O(1) median",
    space: "O(n)",
    html: `<p><b>Time:</b> each add pushes/pops a heap in <code>O(log n)</code>; reading the median is
      just peeking two tops, <code>O(1)</code>.</p>
      <p><b>Space O(n):</b> the two heaps together hold every number seen.</p>`,
  },
  steps: [
    {
      narration: `Numbers stream in. We keep a <b>low half</b> (max-heap) and a <b>high half</b>
        (min-heap). Both start empty.`,
      codeLine: 3,
      panels: [
        { type: "array", title: "low half (max on top)", values: [], labelsBelow: false },
        { type: "array", title: "high half (min on top)", values: [], labelsBelow: false },
      ],
    },
    {
      narration: `Add <b>1</b>. It goes to the low half. Only one number, so the median is <b>1</b>.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "low half (max on top)", values: [1], labelsBelow: false, highlight: { 0: "cur" } },
        { type: "array", title: "high half (min on top)", values: [], labelsBelow: false },
        { type: "vars", title: "median", items: [["median", 1]] },
      ],
    },
    {
      narration: `Add <b>2</b>. It belongs in the high half. Now low = [1], high = [2]. Even count, so
        median = (1 + 2) / 2 = <b>1.5</b>.`,
      codeLine: 7,
      panels: [
        { type: "array", title: "low half (max on top)", values: [1], labelsBelow: false, highlight: { 0: "cur" } },
        { type: "array", title: "high half (min on top)", values: [2], labelsBelow: false, highlight: { 0: "cur" } },
        { type: "vars", title: "median", items: [["median", 1.5]] },
      ],
    },
    {
      narration: `Add <b>3</b>. It joins the high half; after rebalancing, high = [2, 3] (min 2 on
        top), low = [1]. High is bigger, so median = its top = <b>2</b>.`,
      codeLine: 15,
      panels: [
        { type: "array", title: "low half (max on top)", values: [1], labelsBelow: false },
        { type: "array", title: "high half (min on top)", values: [2, 3], labelsBelow: false, highlight: { 0: "cur" } },
        { type: "vars", title: "median", items: [["median", 2]] },
      ],
    },
    {
      narration: `The median is always ready at the heap tops — <b>O(1)</b> to read, <b>O(log n)</b>
        to add. 🎉`,
      codeLine: 13,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "medians so far: 1 → 1.5 → 2" },
      ],
    },
  ],
});
