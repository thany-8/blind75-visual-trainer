/* 3Sum — Two Pointers */
BLIND75.register("3sum", {
  kidPitch: `
    <p>Find every group of <b>three different numbers</b> in a list that add up to <b>zero</b>. No
    repeated groups allowed.</p>
    <p>The trick: <b>sort</b> the numbers first. Then walk a pointer <code>i</code> through the list
    and, for each <code>i</code>, use the classic <b>two-pointer squeeze</b> on the rest: a
    <code>left</code> just after <code>i</code> and a <code>right</code> at the end. If the trio is
    too small, move left up (bigger); too big, move right down (smaller); just right, save it!</p>`,
  example: `<p><code>[-1,0,1,2,-1,-4]</code> → <code>[[-1,-1,2], [-1,0,1]]</code>.</p>`,
  concepts: [
    {
      name: "Why sort first?",
      html: `Sorting lets us move pointers with confidence: to grow the sum, step the left pointer
        to a bigger number; to shrink it, step the right pointer to a smaller one. Sorting also puts
        duplicates side by side so we can skip them.`,
    },
    {
      name: "Two-pointer squeeze",
      html: `With the list sorted, fixing one number turns "find two more that sum to a target" into
        the two-pointer trick — one pass instead of checking every pair.`,
    },
  ],
  idea: `<b>The plan:</b> Sort. For each <code>i</code> (skipping duplicate values), set
    <code>l = i+1</code>, <code>r = end</code>. Move them based on the sum
    <code>nums[i]+nums[l]+nums[r]</code>: too small → l++, too big → r−−, zero → record it and skip
    duplicates.`,
  code: {
    lang: "python",
    lines: [
      "def threeSum(nums):",
      "    nums.sort()",
      "    res = []",
      "    for i in range(len(nums)):",
      "        if i > 0 and nums[i] == nums[i-1]:",
      "            continue",
      "        l, r = i + 1, len(nums) - 1",
      "        while l < r:",
      "            s = nums[i] + nums[l] + nums[r]",
      "            if s < 0:   l += 1",
      "            elif s > 0: r -= 1",
      "            else:",
      "                res.append([nums[i], nums[l], nums[r]])",
      "                l += 1",
      "                while l < r and nums[l] == nums[l-1]:",
      "                    l += 1",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n²)",
    space: "O(1)",
    html: `<p><b>Time O(n²):</b> the outer loop is <code>n</code>, and the two-pointer sweep inside
      is <code>n</code>, giving <code>n²</code>. (The sort is only <code>n log n</code>.)</p>
      <p><b>Space O(1):</b> ignoring the output list, we sort in place and use a few pointers.</p>`,
  },
  steps: [
    {
      narration: `Numbers <b>[-1, 0, 1, 2, -1, -4]</b>. First step: <b>sort</b> them.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums (unsorted)", values: [-1, 0, 1, 2, -1, -4] },
      ],
    },
    {
      narration: `Sorted: <b>[-4, -1, -1, 0, 1, 2]</b>. Now fix <b>i</b> and squeeze the rest with
        <b>l</b> and <b>r</b>.`,
      codeLine: 4,
      panels: [
        { type: "array", title: "nums (sorted)", values: [-4, -1, -1, 0, 1, 2], pointers: [{ name: "i", index: 0, color: "green" }] },
      ],
    },
    {
      narration: `i = -1 (index 1). l points at -1, r at 2. Sum = -1 + (-1) + 2 = <b>0</b> — a match!
        Save <b>[-1, -1, 2]</b>.`,
      codeLine: 12,
      panels: [
        { type: "array", title: "nums (sorted)", values: [-4, -1, -1, 0, 1, 2], pointers: [{ name: "i", index: 1, color: "green" }, { name: "l", index: 2, color: "blue" }, { name: "r", index: 5, color: "pink" }], highlight: { 1: "good", 2: "good", 5: "good" } },
        { type: "note", title: "found", html: "[-1, -1, 2]" },
      ],
    },
    {
      narration: `Keep going with the same i. Now l at 0, r at 1: sum = -1 + 0 + 1 = <b>0</b> —
        another match! Save <b>[-1, 0, 1]</b>.`,
      codeLine: 12,
      panels: [
        { type: "array", title: "nums (sorted)", values: [-4, -1, -1, 0, 1, 2], pointers: [{ name: "i", index: 1, color: "green" }, { name: "l", index: 3, color: "blue" }, { name: "r", index: 4, color: "pink" }], highlight: { 1: "good", 3: "good", 4: "good" } },
        { type: "note", title: "found", html: "[-1, -1, 2] , [-1, 0, 1]" },
      ],
    },
    {
      narration: `Other choices of i give nothing new (duplicates are skipped, and -4 or 0 as the
        smallest can't reach zero here). Final answer below. 🎉`,
      codeLine: 17,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "[[-1, -1, 2], [-1, 0, 1]]" },
      ],
    },
  ],
});
