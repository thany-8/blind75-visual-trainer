/* Best Time to Buy and Sell Stock — Sliding Window */
BLIND75.register("best-time-to-buy-and-sell-stock", {
  kidPitch: `
    <p>You know a stock's price for each day. You may <b>buy on one day and sell on a later
    day</b> (just once). What's the biggest profit you can make? If prices only fall, the smart move
    is to not buy at all (profit 0).</p>
    <p>The trick: as you walk day by day, remember the <b>cheapest price seen so far</b>. At each
    day, pretend you sell today — profit is <b>today − cheapest-so-far</b>. Keep the best.</p>`,
  example: `<p><code>prices = [7,1,5,3,6,4]</code> → buy at <code>1</code>, sell at <code>6</code>,
    profit <code>5</code>.</p>`,
  concepts: [
    {
      name: "Buy low, sell high — in order",
      html: `You must <b>buy before you sell</b>. So when standing on a day, the only valid buy days
        are the ones already behind you — which is why we track the cheapest price <i>so far</i>.`,
    },
    {
      name: "One pass, remember the minimum",
      html: `We don't need to compare every pair of days. Just carry the smallest price we've seen,
        and update the best profit as we go. This is a lightweight <b>sliding window</b> idea.`,
    },
  ],
  idea: `<b>The plan:</b> Track <code>min_price</code> (cheapest day so far) and <code>best</code>
    profit. For each day: if it's cheaper than min_price, it becomes the new buy day; otherwise see
    if selling today beats our best profit.`,
  code: {
    lang: "python",
    lines: [
      "def maxProfit(prices):",
      "    min_price = float('inf')",
      "    best = 0",
      "    for p in prices:",
      "        if p < min_price:",
      "            min_price = p",
      "        else:",
      "            best = max(best, p - min_price)",
      "    return best",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> a single walk through the days.</p>
      <p><b>Space O(1):</b> we only remember two numbers — the cheapest price and the best profit.</p>`,
  },
  steps: [
    {
      narration: `Prices <b>[7,1,5,3,6,4]</b>. Start with no purchase: min_price = ∞, best = 0.`,
      codeLine: 3,
      panels: [
        { type: "array", title: "prices", values: [7, 1, 5, 3, 6, 4] },
        { type: "vars", title: "state", items: [["min_price", "∞"], ["best", 0]] },
      ],
    },
    {
      narration: `Day 0, price <b>7</b>. It's cheaper than ∞, so this is our cheapest buy day so far:
        min_price = 7.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "prices", values: [7, 1, 5, 3, 6, 4], pointers: [{ name: "p", index: 0 }], highlight: { 0: "cur" } },
        { type: "vars", title: "state", items: [["min_price", 7], ["best", 0]] },
      ],
    },
    {
      narration: `Day 1, price <b>1</b>. Even cheaper! New cheapest buy day: min_price = 1.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "prices", values: [7, 1, 5, 3, 6, 4], pointers: [{ name: "p", index: 1 }], highlight: { 1: "good" } },
        { type: "vars", title: "state", items: [["min_price", 1], ["best", 0]] },
      ],
    },
    {
      narration: `Day 2, price <b>5</b>. Not cheaper than 1, so pretend we sell today: 5 − 1 =
        <b>4</b> profit. Best is now 4.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "prices", values: [7, 1, 5, 3, 6, 4], pointers: [{ name: "p", index: 2 }], highlight: { 1: "good", 2: "cur" } },
        { type: "vars", title: "state", items: [["min_price", 1], ["profit", 4], ["best", 4]] },
      ],
    },
    {
      narration: `Day 3, price <b>3</b>: 3 − 1 = 2, not better than 4. Day 4, price <b>6</b>:
        6 − 1 = <b>5</b> — new best!`,
      codeLine: 8,
      panels: [
        { type: "array", title: "prices", values: [7, 1, 5, 3, 6, 4], pointers: [{ name: "p", index: 4 }], highlight: { 1: "good", 4: "cur" } },
        { type: "vars", title: "state", items: [["min_price", 1], ["profit", 5], ["best", 5]] },
      ],
    },
    {
      narration: `Day 5, price <b>4</b>: 4 − 1 = 3, not better. We're done — the best profit was buy
        at 1, sell at 6.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "prices", values: [7, 1, 5, 3, 6, 4], highlight: { 1: "good", 4: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>5</b>" },
      ],
    },
  ],
});
