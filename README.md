# 🧠 Blind 75 Visual Trainer

Learn every **NeetCode Blind 75** coding-interview problem the way you'd explain it to a
curious 10-year-old: friendly cartoons, ideas built from zero, time complexity in plain
words, and a chat box to ask any doubt.

No build step. No frameworks. Just open `index.html` (or serve the folder) and learn.

## ✨ Features

- **All 75 problems** organized into the 18 NeetCode categories, with progress tracking.
- **Animated "cartoon" walkthroughs** — watch the algorithm move step by step (arrays,
  hash maps, stacks, linked lists, trees, grids, DP tables, bits) with **play / pause /
  step / speed** controls.
- **Live code spotlight** — the exact line of code lights up as each step runs.
- **The Story** tab: a plain-language, analogy-first problem description.
- **Concepts** tab: every prerequisite idea explained from scratch, assuming nothing.
- **Time & Space** tab: complexity explained simply, not just stated.
- **💬 Ask any doubt** chat box, powered by the **free** Google Gemini API and aware of the
  problem you're currently viewing.

## 🚀 Run it locally

Any static file server works. For example:

```bash
python3 -m http.server 8099
# then open http://localhost:8099
```

Or just double-click `index.html`.

## 💬 Enabling the chat box (free)

The chat uses the free Google Gemini API. Because this is a static site (no server), you
paste your **own** free key, which is stored only in your browser's `localStorage` and sent
directly to Google — never anywhere else.

1. Get a free key at <https://aistudio.google.com/apikey>.
2. Click the 💬 button (bottom-right) → ⚙️ → paste the key → **Save**.
3. Open any problem and ask away (e.g. *"why a hash map here?"*, *"explain step 3 again"*).

## 🗂️ Project structure

```
index.html                 App shell + ordered <script> includes
assets/css/style.css       All styles (incl. every animation panel)
assets/js/
  core.js                  Global registry, progress tracking, helpers
  catalog.js               The 75 problems: categories, difficulty, links
  engine.js                Panel renderers + the play/pause step Player
  ui.js                    Sidebar, routing, problem tabs
  chat.js                  Gemini-powered chat box
  problems/<id>.js         One file per authored walkthrough
```

## ➕ Adding a new problem walkthrough

Create `assets/js/problems/<slug>.js` and register it:

```js
BLIND75.register("two-sum", {
  kidPitch: "<p>friendly story…</p>",
  example: "<p>…</p>",
  concepts: [{ name: "Hash map", html: "…" }],
  idea: "<p>the plan…</p>",
  code: { lang: "python", lines: ["def twoSum(...):", "    ..."] },
  complexity: { time: "O(n)", space: "O(n)", html: "<p>why…</p>" },
  steps: [
    {
      narration: "what happens now (kid-friendly HTML)",
      codeLine: 2,                       // 1-based line to spotlight
      panels: [
        { type: "array", title: "nums", values: [2,7,11,15],
          pointers: [{ name: "i", index: 0 }], highlight: { 0: "cur" } },
        { type: "map", title: "seen", entries: [[2,0]], highlightKey: 2 },
      ],
    },
    // …more steps
  ],
});
```

Then add a `<script src="assets/js/problems/<slug>.js"></script>` line in `index.html`.
The `<slug>` must match the problem title slug (e.g. "Two Sum" → `two-sum`).

### Panel types available

`array` · `string` · `map` · `set` · `vars` · `stack` · `linkedlist` · `tree` · `grid` ·
`dp` · `bits` · `note`

## ✅ Status

Framework + **46 fully-animated problems** across every visualization type; the remaining
problems are in the catalog with links and chat support, ready to be authored one file at a
time.
