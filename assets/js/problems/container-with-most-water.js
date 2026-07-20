/* Container With Most Water — Two Pointers */
BLIND75.register("container-with-most-water", {
  kidPitch: `
    <p>Imagine a row of vertical walls of different heights. Pick <b>two walls</b> and pour water
    between them. How much water can they hold? That's the <b>width between them × the shorter
    wall's height</b> (water spills over the shorter one).</p>
    <p>We want the <b>most water possible</b>. The trick: start with the two <b>farthest-apart</b>
    walls and cleverly move inward, always leaving the taller wall in place.</p>`,
  example: `<p><code>height = [1,8,6,2,5,4,8,3,7]</code> → best container holds <code>49</code>
    (walls of height 8 and 7, seven steps apart: 7 × 7).</p>`,
  concepts: [
    {
      name: "Area = width × shorter height",
      html: `Water level can't be higher than the shorter wall, or it spills. So area between wall
        <code>l</code> and wall <code>r</code> is <code>(r − l) × min(height[l], height[r])</code>.`,
    },
    {
      name: "Why move the shorter wall?",
      html: `Moving inward always <b>shrinks the width</b>. The only way to possibly gain is a
        <b>taller</b> shorter-wall — so we discard the shorter wall and hope the next one is
        taller. Moving the taller wall could never help.`,
    },
  ],
  idea: `<b>The plan:</b> Two pointers at the far ends. Measure the area, remember the best, then move
    the pointer at the <b>shorter</b> wall inward. Repeat until they meet.`,
  code: {
    lang: "python",
    lines: [
      "def maxArea(height):",
      "    l, r = 0, len(height) - 1",
      "    best = 0",
      "    while l < r:",
      "        area = (r - l) * min(height[l], height[r])",
      "        best = max(best, area)",
      "        if height[l] < height[r]:",
      "            l += 1",
      "        else:",
      "            r -= 1",
      "    return best",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> the two pointers only move inward, so together they take at most
      <code>n</code> steps.</p>
      <p><b>Space O(1):</b> just a couple of numbers (pointers and best).</p>`,
  },
  steps: [
    {
      narration: `Walls <b>[1,8,6,2,5,4,8,3,7]</b>. Start <b>l</b> at the far left (height 1) and
        <b>r</b> at the far right (height 7).`,
      codeLine: 2,
      panels: [
        { type: "array", title: "height", values: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 8, color: "pink" }] },
        { type: "vars", title: "best", items: [["best", 0]] },
      ],
    },
    {
      narration: `Area = width 8 × shorter wall min(1,7)=1 = <b>8</b>. Best is 8. The left wall (1) is
        shorter, so move <b>l</b> inward.`,
      codeLine: 5,
      panels: [
        { type: "array", title: "height", values: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 8, color: "pink" }], highlight: { 0: "cur", 8: "seen" } },
        { type: "vars", title: "best", items: [["area", 8], ["best", 8]] },
      ],
    },
    {
      narration: `Now l is height <b>8</b>, r is height <b>7</b>. Area = width 7 × min(8,7)=7 =
        <b>49</b>! New best. The right wall (7) is shorter, so move <b>r</b> inward.`,
      codeLine: 6,
      panels: [
        { type: "array", title: "height", values: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: "l", index: 1, color: "blue" }, { name: "r", index: 8, color: "pink" }], highlight: { 1: "good", 8: "good" } },
        { type: "vars", title: "best", items: [["area", 49], ["best", 49]] },
      ],
    },
    {
      narration: `l=8, r=height 3. Area = width 6 × min(8,3)=3 = <b>18</b>. Smaller than 49, best
        stays. Move <b>r</b> (3 is shorter).`,
      codeLine: 6,
      panels: [
        { type: "array", title: "height", values: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: "l", index: 1, color: "blue" }, { name: "r", index: 7, color: "pink" }], highlight: { 1: "seen", 7: "cur" } },
        { type: "vars", title: "best", items: [["area", 18], ["best", 49]] },
      ],
    },
    {
      narration: `The pointers keep closing in, but every remaining container is narrower and never
        beats 49. Eventually <b>l</b> and <b>r</b> meet.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "height", values: [1, 8, 6, 2, 5, 4, 8, 3, 7], pointers: [{ name: "l", index: 4, color: "blue" }, { name: "r", index: 5, color: "pink" }], highlight: { 1: "seen", 8: "seen" } },
        { type: "vars", title: "best", items: [["best", 49]] },
      ],
    },
    {
      narration: `The most water any two walls can hold is <b>49</b>. 🎉`,
      codeLine: 11,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>49</b>" },
      ],
    },
  ],
});
