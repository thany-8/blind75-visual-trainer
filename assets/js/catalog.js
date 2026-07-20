/*
 * catalog.js — the canonical NeetCode "Blind 75" list.
 * 18 categories, 75 problems, in NeetCode's ordering.
 * Each entry: { id, num, title, difficulty, lc (leetcode slug) }.
 * Full teaching content lives in assets/js/problems/<id>.js and is looked
 * up by id via BLIND75.get(id); catalog entries always exist even before
 * their walkthrough is authored.
 */
(function () {
  "use strict";

  const D = { E: "Easy", M: "Medium", H: "Hard" };

  const CATEGORIES = [
    {
      name: "Arrays & Hashing",
      icon: "🗃️",
      blurb: "Store and look things up instantly using boxes with labels (hash maps/sets).",
      problems: [
        { num: 1, title: "Contains Duplicate", difficulty: D.E, lc: "contains-duplicate" },
        { num: 2, title: "Valid Anagram", difficulty: D.E, lc: "valid-anagram" },
        { num: 3, title: "Two Sum", difficulty: D.E, lc: "two-sum" },
        { num: 4, title: "Group Anagrams", difficulty: D.M, lc: "group-anagrams" },
        { num: 5, title: "Top K Frequent Elements", difficulty: D.M, lc: "top-k-frequent-elements" },
        { num: 6, title: "Encode and Decode Strings", difficulty: D.M, lc: "encode-and-decode-strings" },
        { num: 7, title: "Product of Array Except Self", difficulty: D.M, lc: "product-of-array-except-self" },
        { num: 8, title: "Longest Consecutive Sequence", difficulty: D.M, lc: "longest-consecutive-sequence" },
      ],
    },
    {
      name: "Two Pointers",
      icon: "👉👈",
      blurb: "Two fingers walking through a list, often from both ends toward the middle.",
      problems: [
        { num: 9, title: "Valid Palindrome", difficulty: D.E, lc: "valid-palindrome" },
        { num: 10, title: "3Sum", difficulty: D.M, lc: "3sum" },
        { num: 11, title: "Container With Most Water", difficulty: D.M, lc: "container-with-most-water" },
      ],
    },
    {
      name: "Sliding Window",
      icon: "🪟",
      blurb: "A stretchy window that slides across a list to look at a chunk at a time.",
      problems: [
        { num: 12, title: "Best Time to Buy and Sell Stock", difficulty: D.E, lc: "best-time-to-buy-and-sell-stock" },
        { num: 13, title: "Longest Substring Without Repeating Characters", difficulty: D.M, lc: "longest-substring-without-repeating-characters" },
        { num: 14, title: "Longest Repeating Character Replacement", difficulty: D.M, lc: "longest-repeating-character-replacement" },
        { num: 15, title: "Minimum Window Substring", difficulty: D.H, lc: "minimum-window-substring" },
      ],
    },
    {
      name: "Stack",
      icon: "🥞",
      blurb: "A pile of plates: the last thing you put on is the first thing you take off.",
      problems: [
        { num: 16, title: "Valid Parentheses", difficulty: D.E, lc: "valid-parentheses" },
      ],
    },
    {
      name: "Binary Search",
      icon: "🔎",
      blurb: "Guess the middle of a sorted list and throw away half every time.",
      problems: [
        { num: 17, title: "Find Minimum in Rotated Sorted Array", difficulty: D.M, lc: "find-minimum-in-rotated-sorted-array" },
        { num: 18, title: "Search in Rotated Sorted Array", difficulty: D.M, lc: "search-in-rotated-sorted-array" },
      ],
    },
    {
      name: "Linked List",
      icon: "🔗",
      blurb: "A treasure hunt where each node holds a value and points to the next node.",
      problems: [
        { num: 19, title: "Reverse Linked List", difficulty: D.E, lc: "reverse-linked-list" },
        { num: 20, title: "Merge Two Sorted Lists", difficulty: D.E, lc: "merge-two-sorted-lists" },
        { num: 21, title: "Reorder List", difficulty: D.M, lc: "reorder-list" },
        { num: 22, title: "Remove Nth Node From End of List", difficulty: D.M, lc: "remove-nth-node-from-end-of-list" },
        { num: 23, title: "Linked List Cycle", difficulty: D.E, lc: "linked-list-cycle" },
        { num: 24, title: "Merge k Sorted Lists", difficulty: D.H, lc: "merge-k-sorted-lists" },
      ],
    },
    {
      name: "Trees",
      icon: "🌳",
      blurb: "Upside-down family trees where each node can have a left and right child.",
      problems: [
        { num: 25, title: "Invert Binary Tree", difficulty: D.E, lc: "invert-binary-tree" },
        { num: 26, title: "Maximum Depth of Binary Tree", difficulty: D.E, lc: "maximum-depth-of-binary-tree" },
        { num: 27, title: "Same Tree", difficulty: D.E, lc: "same-tree" },
        { num: 28, title: "Subtree of Another Tree", difficulty: D.E, lc: "subtree-of-another-tree" },
        { num: 29, title: "Lowest Common Ancestor of a BST", difficulty: D.M, lc: "lowest-common-ancestor-of-a-binary-search-tree" },
        { num: 30, title: "Binary Tree Level Order Traversal", difficulty: D.M, lc: "binary-tree-level-order-traversal" },
        { num: 31, title: "Validate Binary Search Tree", difficulty: D.M, lc: "validate-binary-search-tree" },
        { num: 32, title: "Kth Smallest Element in a BST", difficulty: D.M, lc: "kth-smallest-element-in-a-bst" },
        { num: 33, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: D.M, lc: "construct-binary-tree-from-preorder-and-inorder-traversal" },
        { num: 34, title: "Binary Tree Maximum Path Sum", difficulty: D.H, lc: "binary-tree-maximum-path-sum" },
        { num: 35, title: "Serialize and Deserialize Binary Tree", difficulty: D.H, lc: "serialize-and-deserialize-binary-tree" },
      ],
    },
    {
      name: "Tries",
      icon: "🌲",
      blurb: "A word tree where shared beginnings of words share the same branches.",
      problems: [
        { num: 36, title: "Implement Trie (Prefix Tree)", difficulty: D.M, lc: "implement-trie-prefix-tree" },
        { num: 37, title: "Design Add and Search Words Data Structure", difficulty: D.M, lc: "design-add-and-search-words-data-structure" },
        { num: 38, title: "Word Search II", difficulty: D.H, lc: "word-search-ii" },
      ],
    },
    {
      name: "Heap / Priority Queue",
      icon: "⛰️",
      blurb: "A magic bag that always hands you the smallest (or biggest) item first.",
      problems: [
        { num: 39, title: "Find Median from Data Stream", difficulty: D.H, lc: "find-median-from-data-stream" },
      ],
    },
    {
      name: "Backtracking",
      icon: "🧭",
      blurb: "Try a path; if it fails, walk back and try another. Explore every possibility.",
      problems: [
        { num: 40, title: "Combination Sum", difficulty: D.M, lc: "combination-sum" },
        { num: 41, title: "Word Search", difficulty: D.M, lc: "word-search" },
      ],
    },
    {
      name: "Graphs",
      icon: "🕸️",
      blurb: "Dots (nodes) connected by lines (edges): maps, friends, road networks.",
      problems: [
        { num: 42, title: "Number of Islands", difficulty: D.M, lc: "number-of-islands" },
        { num: 43, title: "Clone Graph", difficulty: D.M, lc: "clone-graph" },
        { num: 44, title: "Pacific Atlantic Water Flow", difficulty: D.M, lc: "pacific-atlantic-water-flow" },
        { num: 45, title: "Course Schedule", difficulty: D.M, lc: "course-schedule" },
        { num: 46, title: "Number of Connected Components in an Undirected Graph", difficulty: D.M, lc: "number-of-connected-components-in-an-undirected-graph" },
        { num: 47, title: "Graph Valid Tree", difficulty: D.M, lc: "graph-valid-tree" },
      ],
    },
    {
      name: "Advanced Graphs",
      icon: "🛰️",
      blurb: "Trickier graph puzzles: ordering, shortest paths, and topological sorts.",
      problems: [
        { num: 48, title: "Alien Dictionary", difficulty: D.H, lc: "alien-dictionary" },
      ],
    },
    {
      name: "1-D Dynamic Programming",
      icon: "📈",
      blurb: "Break a big problem into small ones and remember the answers you already found.",
      problems: [
        { num: 49, title: "Climbing Stairs", difficulty: D.E, lc: "climbing-stairs" },
        { num: 50, title: "House Robber", difficulty: D.M, lc: "house-robber" },
        { num: 51, title: "House Robber II", difficulty: D.M, lc: "house-robber-ii" },
        { num: 52, title: "Longest Palindromic Substring", difficulty: D.M, lc: "longest-palindromic-substring" },
        { num: 53, title: "Palindromic Substrings", difficulty: D.M, lc: "palindromic-substrings" },
        { num: 54, title: "Decode Ways", difficulty: D.M, lc: "decode-ways" },
        { num: 55, title: "Coin Change", difficulty: D.M, lc: "coin-change" },
        { num: 56, title: "Maximum Product Subarray", difficulty: D.M, lc: "maximum-product-subarray" },
        { num: 57, title: "Word Break", difficulty: D.M, lc: "word-break" },
        { num: 58, title: "Longest Increasing Subsequence", difficulty: D.M, lc: "longest-increasing-subsequence" },
      ],
    },
    {
      name: "2-D Dynamic Programming",
      icon: "🧮",
      blurb: "Same idea as 1-D DP, but the memory of answers is a grid (a table).",
      problems: [
        { num: 59, title: "Unique Paths", difficulty: D.M, lc: "unique-paths" },
        { num: 60, title: "Longest Common Subsequence", difficulty: D.M, lc: "longest-common-subsequence" },
      ],
    },
    {
      name: "Greedy",
      icon: "🤑",
      blurb: "Always grab the best-looking choice right now and never look back.",
      problems: [
        { num: 61, title: "Maximum Subarray", difficulty: D.M, lc: "maximum-subarray" },
        { num: 62, title: "Jump Game", difficulty: D.M, lc: "jump-game" },
      ],
    },
    {
      name: "Intervals",
      icon: "📅",
      blurb: "Ranges with a start and end, like meetings on a calendar that may overlap.",
      problems: [
        { num: 63, title: "Insert Interval", difficulty: D.M, lc: "insert-interval" },
        { num: 64, title: "Merge Intervals", difficulty: D.M, lc: "merge-intervals" },
        { num: 65, title: "Non-overlapping Intervals", difficulty: D.M, lc: "non-overlapping-intervals" },
        { num: 66, title: "Meeting Rooms", difficulty: D.E, lc: "meeting-rooms" },
        { num: 67, title: "Meeting Rooms II", difficulty: D.M, lc: "meeting-rooms-ii" },
      ],
    },
    {
      name: "Math & Geometry",
      icon: "📐",
      blurb: "Number and grid tricks: rotating, spiraling, and clever counting.",
      problems: [
        { num: 68, title: "Rotate Image", difficulty: D.M, lc: "rotate-image" },
        { num: 69, title: "Spiral Matrix", difficulty: D.M, lc: "spiral-matrix" },
        { num: 70, title: "Set Matrix Zeroes", difficulty: D.M, lc: "set-matrix-zeroes" },
      ],
    },
    {
      name: "Bit Manipulation",
      icon: "💡",
      blurb: "Play with the 1s and 0s that every number is secretly made of.",
      problems: [
        { num: 71, title: "Number of 1 Bits", difficulty: D.E, lc: "number-of-1-bits" },
        { num: 72, title: "Counting Bits", difficulty: D.E, lc: "counting-bits" },
        { num: 73, title: "Reverse Bits", difficulty: D.E, lc: "reverse-bits" },
        { num: 74, title: "Missing Number", difficulty: D.E, lc: "missing-number" },
        { num: 75, title: "Sum of Two Integers", difficulty: D.M, lc: "sum-of-two-integers" },
      ],
    },
  ];

  // Flatten + attach ids and back-references to the category.
  const ALL = [];
  CATEGORIES.forEach((cat) => {
    cat.problems.forEach((p) => {
      p.id = BLIND75.slug(p.title);
      p.category = cat.name;
      p.categoryIcon = cat.icon;
      p.leetcodeUrl = "https://leetcode.com/problems/" + p.lc + "/";
      p.neetcodeUrl = "https://neetcode.io/problems/" + p.lc;
      ALL.push(p);
    });
  });

  BLIND75.categories = CATEGORIES;
  BLIND75.catalog = ALL; // ordered list of 75
  BLIND75.catalogById = ALL.reduce((m, p) => ((m[p.id] = p), m), {});
})();
