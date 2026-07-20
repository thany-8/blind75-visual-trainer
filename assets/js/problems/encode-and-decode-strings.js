/* Encode and Decode Strings — Arrays & Hashing */
BLIND75.register("encode-and-decode-strings", {
  kidPitch: `
    <p>Squish a <b>list of strings</b> into one single string that can be split back apart later —
    perfectly, even if the strings contain spaces, commas, or <code>#</code> themselves.</p>
    <p>The trick is <b>length-prefixing</b>: before each word, write <b>how long it is</b> and a
    marker <code>#</code>. To decode, read the number, skip the <code>#</code>, then grab exactly
    that many characters. The length tells you precisely where each word ends — no guessing.</p>`,
  example: `<p><code>["neet","code"]</code> encodes to <code>"4#neet4#code"</code>, which decodes
    right back to <code>["neet","code"]</code>.</p>`,
  concepts: [
    {
      name: "Why a plain separator fails",
      html: `If you joined with a comma, a word that <i>contains</i> a comma would be split
        incorrectly. Any separator could appear inside the data.`,
    },
    {
      name: "Length prefix is bulletproof",
      html: `The count says exactly how many characters to read, so whatever those characters are —
        even <code>#</code> — they're taken literally. The <code>#</code> only marks where the number
        ends.`,
    },
  ],
  idea: `<b>Encode:</b> for each word write <code>len(word) + "#" + word</code>. <b>Decode:</b> read
    digits up to the <code>#</code> to get the length, then take that many characters as the next
    word, and repeat.`,
  code: {
    lang: "python",
    lines: [
      "def encode(strs):",
      "    return ''.join(f'{len(s)}#{s}' for s in strs)",
      "def decode(s):",
      "    res, i = [], 0",
      "    while i < len(s):",
      "        j = i",
      "        while s[j] != '#':",
      "            j += 1",
      "        length = int(s[i:j])",
      "        res.append(s[j+1 : j+1+length])",
      "        i = j + 1 + length",
      "    return res",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> encoding and decoding each scan the characters once (n = total
      length).</p>
      <p><b>Space O(n):</b> the encoded string / decoded list.</p>`,
  },
  steps: [
    {
      narration: `We want to pack <b>["neet", "code"]</b> into one string and get it back exactly.`,
      codeLine: 1,
      panels: [
        { type: "array", title: "strs", values: ["neet", "code"], labelsBelow: false },
      ],
    },
    {
      narration: `<b>Encode:</b> "neet" has length 4 → <b>4#neet</b>. "code" has length 4 →
        <b>4#code</b>. Glue them: <b>"4#neet4#code"</b>.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "encoded", values: ["4", "#", "n", "e", "e", "t", "4", "#", "c", "o", "d", "e"], labelsBelow: false, highlight: { 0: "seen", 1: "seen", 6: "seen", 7: "seen" } },
      ],
    },
    {
      narration: `<b>Decode:</b> start at 0. Read digits until <b>#</b> → length <b>4</b>. Take the
        next 4 characters: <b>"neet"</b>.`,
      codeLine: 10,
      panels: [
        { type: "array", title: "encoded", values: ["4", "#", "n", "e", "e", "t", "4", "#", "c", "o", "d", "e"], labelsBelow: false, highlight: { 0: "cur", 1: "seen", 2: "good", 3: "good", 4: "good", 5: "good" } },
        { type: "array", title: "res", values: ["neet"], labelsBelow: false },
      ],
    },
    {
      narration: `Jump to index 6. Read <b>4</b>, skip <b>#</b>, take the next 4: <b>"code"</b>.`,
      codeLine: 10,
      panels: [
        { type: "array", title: "encoded", values: ["4", "#", "n", "e", "e", "t", "4", "#", "c", "o", "d", "e"], labelsBelow: false, highlight: { 6: "cur", 7: "seen", 8: "good", 9: "good", 10: "good", 11: "good" } },
        { type: "array", title: "res", values: ["neet", "code"], labelsBelow: false },
      ],
    },
    {
      narration: `We recovered the original list exactly: <b>["neet", "code"]</b>. 🎉`,
      codeLine: 12,
      panels: [
        { type: "note", tone: "good", title: "answer", html: 'decode("4#neet4#code") = <b>["neet", "code"]</b>' },
      ],
    },
  ],
});
