/* Find Minimum in Rotated Sorted Array — Binary Search */
BLIND75.register("find-minimum-in-rotated-sorted-array", {
  kidPitch: `
    <p>Take a sorted list like <code>[0,1,2,4,5,6,7]</code> and "rotate" it — cut it somewhere and
    swap the two halves — to get <code>[4,5,6,7,0,1,2]</code>. Find the <b>smallest number</b>.</p>
    <p>Reading every number would work but is slow. The trick is <b>binary search</b>: peek at the
    middle and, using one comparison, throw away the half that <i>can't</i> contain the minimum.</p>`,
  example: `<p><code>nums = [4,5,6,7,0,1,2]</code> → the smallest is <code>0</code>.</p>`,
  concepts: [
    {
      name: "What is binary search?",
      html: `A way to search a <b>sorted</b> list super fast: look at the middle, decide which half
        the answer is in, and repeat on just that half. Each step throws away <b>half</b> the
        remaining items.`,
    },
    {
      name: "The rotation clue",
      html: `The smallest number is the one spot where the list "drops." If the middle value is
        <b>bigger than the rightmost</b> value, the drop (and the minimum) must be to the
        <b>right</b> of the middle. Otherwise it's at the middle or to its left.`,
    },
  ],
  idea: `<b>The plan:</b> Keep a window <code>[l, r]</code>. Look at the middle <code>m</code>. If
    <code>nums[m] > nums[r]</code>, the minimum is to the right → move <code>l</code> past
    <code>m</code>. Otherwise the minimum is at <code>m</code> or left → move <code>r</code> to
    <code>m</code>. Stop when the window is a single cell — that's the minimum.`,
  code: {
    lang: "python",
    lines: [
      "def findMin(nums):",
      "    l, r = 0, len(nums) - 1",
      "    while l < r:",
      "        m = (l + r) // 2",
      "        if nums[m] > nums[r]:",
      "            l = m + 1",
      "        else:",
      "            r = m",
      "    return nums[l]",
    ],
  },
  complexity: {
    time: "O(log n)",
    space: "O(1)",
    html: `<p><b>Time O(log n):</b> every step halves the search window. For 1,000,000 numbers
      that's only about 20 steps!</p>
      <p><b>Space O(1):</b> just three pointers (l, m, r).</p>`,
  },
  steps: [
    {
      narration: `Rotated list <b>[4,5,6,7,0,1,2]</b>. Window is the whole thing: <b>l=0</b>,
        <b>r=6</b>.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 6, color: "pink" }] },
      ],
    },
    {
      narration: `Middle is <b>m=3</b> (value 7). Is nums[m]=7 > nums[r]=2? <b>Yes</b> — so the drop
        is to the right. Throw away the left half: l = m+1 = 4.`,
      codeLine: 5,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "m", index: 3, color: "green" }, { name: "r", index: 6, color: "pink" }], highlight: { 0: "dim", 1: "dim", 2: "dim", 3: "cur" } },
      ],
    },
    {
      narration: `Window is now <b>[4..6]</b>. Middle m=5 (value 1). Is 1 > nums[r]=2? <b>No</b> — so
        the minimum is at m or to its left. Move r = m = 5.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l", index: 4, color: "blue" }, { name: "m", index: 5, color: "green" }, { name: "r", index: 6, color: "pink" }], highlight: { 4: "seen", 5: "cur", 6: "dim" } },
      ],
    },
    {
      narration: `Window <b>[4..5]</b>. Middle m=4 (value 0). Is 0 > nums[r]=1? <b>No</b> → move
        r = m = 4.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l", index: 4, color: "blue" }, { name: "m", index: 4, color: "green" }, { name: "r", index: 5, color: "pink" }], highlight: { 4: "cur", 5: "dim" } },
      ],
    },
    {
      narration: `Now <b>l = r = 4</b>. The window shrank to one cell — that's our minimum:
        <b>0</b>. 🎉`,
      codeLine: 9,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l·r", index: 4, color: "green" }], highlight: { 4: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return nums[4] = <b>0</b>" },
      ],
    },
  ],
});
