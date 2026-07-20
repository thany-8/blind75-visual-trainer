/* Valid Palindrome — Two Pointers */
BLIND75.register("valid-palindrome", {
  kidPitch: `
    <p>A <b>palindrome</b> reads the same forwards and backwards, like <code>"racecar"</code> or
    <code>"mom"</code>. We ignore spaces, punctuation, and capital-vs-small letters.</p>
    <p>The trick: put one finger on the <b>first</b> letter and one on the <b>last</b>. If they
    match, step both inward and check again. If they ever disagree, it's not a palindrome.</p>`,
  example: `<p><code>"A man, a plan, a canal: Panama"</code> → ignoring symbols/case it's
    <code>"amanaplanacanalpanama"</code>, which reads the same both ways → <code>True</code>.</p>`,
  concepts: [
    {
      name: "Two pointers",
      html: `Instead of one finger, we use <b>two</b>: <code>l</code> starting at the left end and
        <code>r</code> at the right end, walking <b>toward each other</b>. Great for anything
        symmetric.`,
    },
    {
      name: "Skipping non-letters",
      html: `Only letters and digits count. If a pointer lands on a comma or space, we just slide it
        past that character before comparing (<code>isalnum</code> checks this).`,
    },
  ],
  idea: `<b>The plan:</b> With pointers at both ends, skip anything that isn't a letter/number, then
    compare (ignoring case). Match → move both inward. Mismatch → return <code>False</code>. When
    the pointers meet, it's a palindrome.`,
  code: {
    lang: "python",
    lines: [
      "def isPalindrome(s):",
      "    l, r = 0, len(s) - 1",
      "    while l < r:",
      "        while l < r and not s[l].isalnum():",
      "            l += 1",
      "        while l < r and not s[r].isalnum():",
      "            r -= 1",
      "        if s[l].lower() != s[r].lower():",
      "            return False",
      "        l += 1",
      "        r -= 1",
      "    return True",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(1)",
    html: `<p><b>Time O(n):</b> each pointer moves inward, so together they touch each character
      about once.</p>
      <p><b>Space O(1):</b> we only keep two little pointer positions — no extra copies of the
      string.</p>`,
  },
  steps: [
    {
      narration: `Word <b>"racecar"</b>. Put <b>l</b> on the first letter and <b>r</b> on the last.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "s", values: ["r", "a", "c", "e", "c", "a", "r"], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 6, color: "pink" }] },
      ],
    },
    {
      narration: `Compare <b>s[l]='r'</b> and <b>s[r]='r'</b>. They match! ✅ Step both inward.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "s", values: ["r", "a", "c", "e", "c", "a", "r"], pointers: [{ name: "l", index: 0, color: "blue" }, { name: "r", index: 6, color: "pink" }], highlight: { 0: "good", 6: "good" } },
      ],
    },
    {
      narration: `Now <b>'a'</b> vs <b>'a'</b> — match! ✅ Keep closing in.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "s", values: ["r", "a", "c", "e", "c", "a", "r"], pointers: [{ name: "l", index: 1, color: "blue" }, { name: "r", index: 5, color: "pink" }], highlight: { 0: "good", 6: "good", 1: "good", 5: "good" } },
      ],
    },
    {
      narration: `<b>'c'</b> vs <b>'c'</b> — match! ✅ One pair left.`,
      codeLine: 8,
      panels: [
        { type: "array", title: "s", values: ["r", "a", "c", "e", "c", "a", "r"], pointers: [{ name: "l", index: 2, color: "blue" }, { name: "r", index: 4, color: "pink" }], highlight: { 0: "good", 6: "good", 1: "good", 5: "good", 2: "good", 4: "good" } },
      ],
    },
    {
      narration: `Pointers now both point at the middle <b>'e'</b> (l is not less than r). We've
        checked every pair and they all matched.`,
      codeLine: 3,
      panels: [
        { type: "array", title: "s", values: ["r", "a", "c", "e", "c", "a", "r"], pointers: [{ name: "l·r", index: 3, color: "green" }], highlight: { 0: "good", 6: "good", 1: "good", 5: "good", 2: "good", 4: "good", 3: "good" } },
      ],
    },
    {
      narration: `It reads the same both ways. Return <b>True</b>. 🎉`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — it's a palindrome!" },
      ],
    },
  ],
});
