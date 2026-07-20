/*
 * ui.js — app shell: sidebar, routing, and the problem view with tabs.
 */
(function () {
  "use strict";
  const esc = BLIND75.esc;
  let activePlayer = null;

  // ---------------------------------------------------------------- sidebar
  function difficultyClass(d) {
    return d === "Easy" ? "d-e" : d === "Medium" ? "d-m" : "d-h";
  }

  function renderSidebar(filter) {
    const q = (filter || "").trim().toLowerCase();
    const prog = BLIND75.loadProgress();
    const done = Object.keys(prog).length;
    let html = `<div class="progress-wrap">
        <div class="progress-top"><span>${done} / 75 solved</span><span>${Math.round(
      (done / 75) * 100
    )}%</span></div>
        <div class="progressbar"><div class="fill" style="width:${(done / 75) *
      100}%"></div></div>
      </div>`;

    BLIND75.categories.forEach((cat) => {
      const probs = cat.problems.filter(
        (p) => !q || p.title.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q)
      );
      if (!probs.length) return;
      const catDone = cat.problems.filter((p) => BLIND75.isDone(p.id)).length;
      html += `<div class="cat">
        <div class="cat-h"><span class="cat-ic">${cat.icon}</span>
          <span class="cat-name">${esc(cat.name)}</span>
          <span class="cat-count">${catDone}/${cat.problems.length}</span></div>
        <div class="cat-list">`;
      probs.forEach((p) => {
        const authored = !!BLIND75.get(p.id);
        html += `<a class="pitem ${BLIND75.isDone(p.id) ? "done" : ""}" href="#/p/${
          p.id
        }" data-id="${p.id}">
            <span class="pnum">${p.num}</span>
            <span class="ptitle-s">${esc(p.title)}</span>
            ${authored ? '<span class="badge-anim" title="Animated walkthrough">▶</span>' : ""}
            <span class="pdiff ${difficultyClass(p.difficulty)}">${p.difficulty[0]}</span>
          </a>`;
      });
      html += `</div></div>`;
    });
    return html;
  }

  // ------------------------------------------------------------------- home
  function renderHome() {
    const prog = BLIND75.loadProgress();
    const done = Object.keys(prog).length;
    const animated = BLIND75.catalog.filter((p) => BLIND75.get(p.id)).length;
    let cards = "";
    BLIND75.categories.forEach((cat) => {
      const catDone = cat.problems.filter((p) => BLIND75.isDone(p.id)).length;
      const anim = cat.problems.filter((p) => BLIND75.get(p.id)).length;
      cards += `<a class="home-card" href="#/p/${cat.problems[0].id}">
        <div class="hc-ic">${cat.icon}</div>
        <div class="hc-body">
          <div class="hc-name">${esc(cat.name)}</div>
          <div class="hc-blurb">${esc(cat.blurb)}</div>
          <div class="hc-meta">${cat.problems.length} problems · ${anim} animated · ${catDone} solved</div>
        </div></a>`;
    });
    return `<div class="home">
      <div class="hero">
        <h1>Blind 75, explained like you're 10 🧒</h1>
        <p>Every famous coding-interview problem, broken into a friendly cartoon.
        Watch the algorithm move step by step, learn every idea from scratch, see the
        time complexity, and ask the chat box anything you don't understand.</p>
        <div class="hero-stats">
          <div><b>75</b> problems</div>
          <div><b>${animated}</b> animated so far</div>
          <div><b>${done}</b> solved by you</div>
          <div><b>18</b> topics</div>
        </div>
        <p class="hero-hint">👈 Pick a topic on the left, or start with
          <a href="#/p/two-sum">Two Sum</a>. New here? Click the 💬 chat button (top right) and
          paste a free Gemini key to ask questions.</p>
      </div>
      <h2 class="home-h2">Pick a topic</h2>
      <div class="home-grid">${cards}</div>
    </div>`;
  }

  // --------------------------------------------------------------- problem
  function renderProblemShell(p) {
    const c = BLIND75.get(p.id);
    const tabs = [
      ["story", "📖 The Story"],
      ["concepts", "🧠 Concepts"],
      ["walk", "🎬 Visual Walkthrough"],
      ["code", "💻 The Code"],
      ["complexity", "⏱️ Time & Space"],
    ];
    const idx = BLIND75.catalog.findIndex((x) => x.id === p.id);
    const prev = BLIND75.catalog[idx - 1];
    const next = BLIND75.catalog[idx + 1];
    return `<div class="problem">
      <div class="p-head">
        <div class="p-crumbs">${esc(p.categoryIcon)} ${esc(p.category)}</div>
        <h1><span class="p-n">#${p.num}</span> ${esc(p.title)}
          <span class="pdiff ${difficultyClass(p.difficulty)}">${esc(p.difficulty)}</span></h1>
        <div class="p-links">
          <a href="${p.leetcodeUrl}" target="_blank" rel="noopener">LeetCode ↗</a>
          <a href="${p.neetcodeUrl}" target="_blank" rel="noopener">NeetCode ↗</a>
          <button class="donebtn ${BLIND75.isDone(p.id) ? "on" : ""}" data-done="${p.id}">
            ${BLIND75.isDone(p.id) ? "✓ Solved" : "Mark solved"}</button>
        </div>
      </div>
      ${
        c
          ? `<div class="tabs">${tabs
              .map(
                (t, i) =>
                  `<button class="tab ${i === 0 ? "active" : ""}" data-tab="${t[0]}">${t[1]}</button>`
              )
              .join("")}</div>
      <div class="tabbody"></div>`
          : renderStub(p)
      }
      <div class="p-nav">
        ${prev ? `<a href="#/p/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a href="#/p/${next.id}">${esc(next.title)} →</a>` : "<span></span>"}
      </div>
    </div>`;
  }

  function renderStub(p) {
    return `<div class="stub">
      <div class="stub-ic">🚧</div>
      <h3>Animated walkthrough coming soon</h3>
      <p>This problem is in the catalog and next in line to get the full cartoon
      treatment. In the meantime, open it on
      <a href="${p.neetcodeUrl}" target="_blank" rel="noopener">NeetCode</a> or ask the
      💬 chat box on the right to walk you through it — it knows which problem you're on.</p>
    </div>`;
  }

  function renderCode(code, withActive) {
    if (!code || !code.lines) return "";
    const lines = code.lines
      .map(
        (ln, i) =>
          `<div class="cline" data-line="${i + 1}"><span class="ln">${i + 1}</span><code>${esc(
            ln
          ) || "&nbsp;"}</code></div>`
      )
      .join("");
    return `<div class="code ${withActive ? "livecode" : ""}"><div class="code-lang">${esc(
      (code.lang || "python").toUpperCase()
    )}</div>${lines}</div>`;
  }

  function highlightLine(scope, line) {
    scope.querySelectorAll(".cline.active").forEach((e) => e.classList.remove("active"));
    if (line) {
      const el = scope.querySelector(`.cline[data-line="${line}"]`);
      if (el) {
        el.classList.add("active");
        el.scrollIntoView({ block: "nearest" });
      }
    }
  }

  function renderTab(tab, p) {
    const c = BLIND75.get(p.id);
    if (tab === "story") {
      return `<div class="pane story">
        <div class="kidcard">${c.kidPitch || ""}</div>
        ${c.example ? `<div class="examplebox"><div class="ex-h">Example</div>${c.example}</div>` : ""}
      </div>`;
    }
    if (tab === "concepts") {
      const items = (c.concepts || [])
        .map(
          (co) =>
            `<div class="concept"><h4>${esc(co.name)}</h4><div>${co.html}</div></div>`
        )
        .join("");
      return `<div class="pane concepts"><p class="pane-lead">Everything you need to
        know first — explained from zero, assuming nothing.</p>${items ||
        "<p>No extra concepts needed for this one!</p>"}</div>`;
    }
    if (tab === "walk") {
      if (!c.steps || !c.steps.length)
        return `<div class="pane"><p>Walkthrough being drawn ✏️</p></div>`;
      return `<div class="pane walk">
        <div class="walk-idea">${c.idea || ""}</div>
        <div class="walk-grid">
          <div class="walk-viz"></div>
          <div class="walk-code">${renderCode(c.code, true)}</div>
        </div>
      </div>`;
    }
    if (tab === "code") {
      return `<div class="pane"><p class="pane-lead">Here's the full solution. In the
        Visual Walkthrough tab you can watch each of these lines light up as it runs.</p>
        ${renderCode(c.code, false)}</div>`;
    }
    if (tab === "complexity") {
      const cx = c.complexity || {};
      return `<div class="pane complexity">
        <div class="cx-row">
          <div class="cx-badge time"><span>Time</span><b>${esc(cx.time || "?")}</b></div>
          <div class="cx-badge space"><span>Space</span><b>${esc(cx.space || "?")}</b></div>
        </div>
        <div class="cx-body">${cx.html || ""}</div>
      </div>`;
    }
    return "";
  }

  function mountWalk(root, p) {
    const c = BLIND75.get(p.id);
    const viz = root.querySelector(".walk-viz");
    const codeScope = root.querySelector(".walk-code");
    if (!viz) return;
    if (activePlayer) activePlayer.destroy();
    activePlayer = new BLIND75.Player(viz, c.steps, {
      onStep: (step) => highlightLine(codeScope, step.codeLine),
    });
    activePlayer.render();
  }

  // ---------------------------------------------------------------- router
  function setActiveSidebar(id) {
    document.querySelectorAll(".pitem").forEach((a) => a.classList.toggle("active", a.dataset.id === id));
  }

  function route() {
    const content = document.getElementById("content");
    const hash = location.hash || "";
    const m = hash.match(/^#\/p\/(.+)$/);
    if (activePlayer) {
      activePlayer.destroy();
      activePlayer = null;
    }
    if (!m) {
      content.innerHTML = renderHome();
      setActiveSidebar(null);
      content.scrollTop = 0;
      return;
    }
    const p = BLIND75.catalogById[m[1]];
    if (!p) {
      content.innerHTML = renderHome();
      return;
    }
    content.innerHTML = renderProblemShell(p);
    content.scrollTop = 0;
    setActiveSidebar(p.id);
    if (window.BLIND75_CHAT) window.BLIND75_CHAT.setProblem(p);

    const c = BLIND75.get(p.id);
    if (c) {
      const body = content.querySelector(".tabbody");
      const showTab = (t) => {
        content.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === t));
        body.innerHTML = renderTab(t, p);
        if (t === "walk") mountWalk(body, p);
      };
      content.querySelectorAll(".tab").forEach((b) =>
        b.addEventListener("click", () => showTab(b.dataset.tab))
      );
      showTab("story");
    }

    const dbtn = content.querySelector("[data-done]");
    if (dbtn)
      dbtn.addEventListener("click", () => {
        const on = BLIND75.toggleDone(p.id);
        dbtn.classList.toggle("on", on);
        dbtn.textContent = on ? "✓ Solved" : "Mark solved";
        refreshSidebar();
      });
  }

  function refreshSidebar() {
    const sb = document.getElementById("sidebar");
    const search = document.getElementById("search");
    sb.innerHTML = renderSidebar(search ? search.value : "");
    setActiveSidebar((location.hash.match(/^#\/p\/(.+)$/) || [])[1]);
  }

  // ------------------------------------------------------------------ init
  function init() {
    refreshSidebar();
    const search = document.getElementById("search");
    if (search) search.addEventListener("input", () => refreshSidebar());
    window.addEventListener("hashchange", route);
    route();
  }

  BLIND75.refreshSidebar = refreshSidebar;
  window.addEventListener("DOMContentLoaded", init);
})();
