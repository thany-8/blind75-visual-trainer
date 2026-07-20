/* Search in Rotated Sorted Array — Binary Search */
BLIND75.register("search-in-rotated-sorted-array", {
  kidPitch: `
    <p>A sorted list was rotated (cut and swapped), like <code>[4,5,6,7,0,1,2]</code>. Find the
    <b>position</b> of a target number — and do it fast, in <code>O(log n)</code>.</p>
    <p>The trick: even after rotating, at any midpoint <b>one half is still perfectly sorted</b>.
    Figure out which half is sorted, check whether the target falls inside that neat half, and throw
    away the half that can't contain it — classic binary search.</p>`,
  example: `<p><code>nums = [4,5,6,7,0,1,2]</code>, <code>target = 0</code> → found at index
    <code>4</code>.</p>`,
  concepts: [
    {
      name: "One half is always sorted",
      html: `Compare the middle to the left edge. If <code>nums[l] ≤ nums[m]</code>, the left half is
        cleanly sorted; otherwise the right half is. That sorted half is easy to reason about.`,
    },
    {
      name: "Is the target in the sorted half?",
      html: `If the target sits between the sorted half's ends, search there. If not, it must be in
        the other half. Either way we drop half the array each step.`,
    },
  ],
  idea: `<b>The plan:</b> Binary search. At each midpoint, decide which side is sorted. If the target
    lies within that sorted side's range, keep it; otherwise search the other side.`,
  code: {
    lang: "python",
    lines: [
      "def search(nums, target):",
      "    l, r = 0, len(nums) - 1",
      "    while l <= r:",
      "        m = (l + r) // 2",
      "        if nums[m] == target:",
      "            return m",
      "        if nums[l] <= nums[m]:            # left half sorted",
      "            if nums[l] <= target < nums[m]:",
      "                r = m - 1",
      "            else:",
      "                l = m + 1",
      "        else:                             # right half sorted",
      "            if nums[m] < target <= nums[r]:",
      "                l = m + 1",
      "            else:",
      "                r = m - 1",
      "    return -1",
    ],
  },
  complexity: {
    time: "O(log n)",
    space: "O(1)",
    html: `<p><b>Time O(log n):</b> each step halves the search range.</p>
      <p><b>Space O(1):</b> just the three pointers l, m, r.</p>`,
  },
  steps: [
    {
      narration: `List <b>[4,5,6,7,0,1,2]</b>, looking for <b>0</b>. Window l=0, r=6.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 6, color: "pink" }] },
      ],
    },
    {
      narration: `Middle m=3 (value 7), not 0. Left half [4,5,6,7] is sorted. Is 0 between 4 and 7?
        No → the target must be on the right. Move l = m+1 = 4.`,
      codeLine: 11,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "m", index: 3, color: "green" }, { name: "r", index: 6, color: "pink" }], highlight: { 0: "dim", 1: "dim", 2: "dim", 3: "dim" } },
      ],
    },
    {
      narration: `Window [4..6]. Middle m=5 (value 1), not 0. Left part [0,1] is sorted. Is 0 between
        0 and 1? Yes! Search left: r = m−1 = 4.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "l", index: 4, color: "blue" }, { name: "m", index: 5, color: "green" }, { name: "r", index: 6, color: "pink" }], highlight: { 5: "dim", 6: "dim" } },
      ],
    },
    {
      narration: `Window [4..4]. Middle m=4 (value <b>0</b>) — that's our target! Return index
        <b>4</b>. 🎉`,
      codeLine: 6,
      panels: [
        { type: "array", title: "nums", values: [4, 5, 6, 7, 0, 1, 2], pointers: [{ name: "m", index: 4, color: "green" }], highlight: { 4: "good" } },
        { type: "note", tone: "good", title: "answer", html: "return <b>4</b>" },
      ],
    },
  ],
});
