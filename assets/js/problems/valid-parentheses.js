/* Valid Parentheses — Stack */
BLIND75.register("valid-parentheses", {
  kidPitch: `
    <p>You're given brackets like <code>( )</code>, <code>[ ]</code>, <code>{ }</code>. They're
    "valid" if every opener has a matching closer <b>in the right order</b> — like properly nested
    boxes. <code>([])</code> is good; <code>([)]</code> is not.</p>
    <p>The trick: use a <b>stack</b> — a pile of plates. Every opener you meet, put a plate on top.
    Every closer, the plate on top <b>must</b> be its matching opener; if so, take it off.</p>`,
  example: `<p><code>s = "([])"</code> → push <code>(</code>, push <code>[</code>, then
    <code>]</code> closes <code>[</code>, then <code>)</code> closes <code>(</code>. Pile empty →
    <code>True</code>.</p>`,
  concepts: [
    {
      name: "What is a stack?",
      html: `A <b>stack</b> is a pile where you add and remove only from the <b>top</b> — Last In,
        First Out (LIFO). Like a stack of plates: the last plate you put down is the first you pick
        up.`,
    },
    {
      name: "Why a stack fits perfectly",
      html: `Brackets close in <b>reverse</b> order of opening — the most recently opened one must
        close first. That's exactly how a stack behaves, so the top plate is always the bracket that
        needs closing next.`,
    },
  ],
  idea: `<b>The plan:</b> Walk the string. Opener → push it. Closer → the top of the stack must be
    its matching opener (pop it off). If it isn't, or the stack is empty, it's invalid. At the end
    the stack must be empty (nothing left unclosed).`,
  code: {
    lang: "python",
    lines: [
      "def isValid(s):",
      "    stack = []",
      "    pairs = {')': '(', ']': '[', '}': '{'}",
      "    for c in s:",
      "        if c in pairs:",
      "            if not stack or stack.pop() != pairs[c]:",
      "                return False",
      "        else:",
      "            stack.append(c)",
      "    return not stack",
    ],
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    html: `<p><b>Time O(n):</b> each bracket is pushed and popped at most once.</p>
      <p><b>Space O(n):</b> in the worst case (all openers, like <code>"((((("</code>) the whole
      string sits on the stack.</p>`,
  },
  steps: [
    {
      narration: `String <b>"([])"</b>. The plate pile (stack) starts <b>empty</b>.`,
      codeLine: 2,
      panels: [
        { type: "array", title: "s", values: ["(", "[", "]", ")"] },
        { type: "stack", title: "stack", values: [] },
      ],
    },
    {
      narration: `First char <b>(</b> — an opener. Put it on the pile.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "s", values: ["(", "[", "]", ")"], pointers: [{ name: "c", index: 0 }], highlight: { 0: "cur" } },
        { type: "stack", title: "stack", values: ["("] },
      ],
    },
    {
      narration: `Next <b>[</b> — opener. Put it on top.`,
      codeLine: 9,
      panels: [
        { type: "array", title: "s", values: ["(", "[", "]", ")"], pointers: [{ name: "c", index: 1 }], highlight: { 0: "seen", 1: "cur" } },
        { type: "stack", title: "stack", values: ["(", "["] },
      ],
    },
    {
      narration: `Now <b>]</b> — a closer. The top plate must be its match <b>[</b>. It is! Pop it
        off. ✅`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["(", "[", "]", ")"], pointers: [{ name: "c", index: 2 }], highlight: { 2: "cur" } },
        { type: "stack", title: "stack", values: ["("] },
      ],
    },
    {
      narration: `Next <b>)</b> — a closer. Top plate must be <b>(</b>. It is! Pop it off. ✅`,
      codeLine: 6,
      panels: [
        { type: "array", title: "s", values: ["(", "[", "]", ")"], pointers: [{ name: "c", index: 3 }], highlight: { 3: "cur" } },
        { type: "stack", title: "stack", values: [] },
      ],
    },
    {
      narration: `String finished and the pile is <b>empty</b> — every bracket closed neatly. Return
        <b>True</b>. 🎉`,
      codeLine: 10,
      panels: [
        { type: "stack", title: "stack", values: [] },
        { type: "note", tone: "good", title: "answer", html: "return <b>True</b> — valid!" },
      ],
    },
  ],
});
