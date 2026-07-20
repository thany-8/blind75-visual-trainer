/*
 * engine.js — the visual "cartoon" engine.
 *
 * A walkthrough is an array of STEPS. Each step is one frame of the cartoon:
 *   {
 *     narration: "kid-friendly HTML explaining what happens now",
 *     codeLine: 3,               // optional 1-based line to spotlight in code
 *     panels: [ {type:'array', ...}, {type:'map', ...} ]
 *   }
 *
 * Panels are little visual widgets. Supported types:
 *   array | string | map | set | vars | stack | linkedlist | tree | grid |
 *   dp | bits | note
 *
 * BLIND75.Player(sceneEl, steps, {onStep}) renders the frames with
 * play / pause / next / prev / restart / speed controls.
 */
(function () {
  "use strict";
  const esc = BLIND75.esc;

  // ---------------------------------------------------------------- panels
  const Panels = {
    array(p) {
      const cls = p.variant === "dp" ? "cells dp" : "cells";
      const cells = p.values
        .map((v, i) => {
          const h = (p.highlight && p.highlight[i]) || "";
          const inWin =
            p.window && i >= p.window.start && i <= p.window.end ? " inwindow" : "";
          const ptrs = (p.pointers || [])
            .filter((pt) => pt.index === i)
            .map(
              (pt) =>
                `<span class="ptr ${pt.color || ""}">${esc(pt.name)}<b>↓</b></span>`
            )
            .join("");
          const idx = p.labelsBelow === false ? "" : `<span class="idx">${i}</span>`;
          return `<div class="cellwrap"><div class="ptrslot">${ptrs}</div><div class="cell ${h}${inWin}">${esc(
            v
          )}</div>${idx}</div>`;
        })
        .join("");
      return panelShell(p, `<div class="${cls}">${cells}</div>`);
    },

    string(p) {
      return Panels.array(Object.assign({}, p, { chars: true }));
    },

    map(p) {
      const entries = p.entries || [];
      const rows = entries.length
        ? entries
            .map(([k, v]) => {
              const hl = p.highlightKey != null && String(p.highlightKey) === String(k)
                ? " hit"
                : "";
              return `<div class="kv${hl}"><span class="k">${esc(k)}</span><span class="arrow">→</span><span class="v">${esc(
                v
              )}</span></div>`;
            })
            .join("")
        : `<div class="empty">empty</div>`;
      return panelShell(p, `<div class="map">${rows}</div>`);
    },

    set(p) {
      const items = p.items || [];
      const body = items.length
        ? items
            .map(
              (x) =>
                `<span class="chip${
                  p.highlight != null && String(p.highlight) === String(x) ? " hit" : ""
                }">${esc(x)}</span>`
            )
            .join("")
        : `<div class="empty">empty</div>`;
      return panelShell(p, `<div class="set">${body}</div>`);
    },

    vars(p) {
      const body = (p.items || [])
        .map(
          ([k, v]) =>
            `<div class="var"><span class="vk">${esc(k)}</span><span class="vv ${
              (p.highlight && p.highlight[k]) || ""
            }">${esc(v)}</span></div>`
        )
        .join("");
      return panelShell(p, `<div class="vars">${body}</div>`);
    },

    stack(p) {
      const vals = (p.values || []).slice();
      const items = vals
        .map((v, i) => {
          const top = i === vals.length - 1 && p.highlightTop !== false ? " top" : "";
          return `<div class="splate${top}">${esc(v)}</div>`;
        })
        .reverse()
        .join("");
      const inner = `<div class="stack">${items || '<div class="empty">empty</div>'}<div class="sbase">stack</div></div>`;
      return panelShell(p, inner);
    },

    linkedlist(p) {
      const nodes = p.nodes || [];
      const parts = nodes
        .map((n, i) => {
          const ptrs = (p.pointers || [])
            .filter((pt) => pt.index === i)
            .map((pt) => `<span class="ptr ${pt.color || ""}">${esc(pt.name)}<b>↓</b></span>`)
            .join("");
          const arrow =
            n.arrow === "none"
              ? "<span class='llnull'>∅</span>"
              : n.arrow === "left"
              ? "<span class='llarrow rev'>←</span>"
              : i < nodes.length - 1
              ? "<span class='llarrow'>→</span>"
              : "<span class='llnull'>∅</span>";
          return `<div class="llgroup"><div class="ptrslot">${ptrs}</div><div class="llnode ${
            (p.highlight && p.highlight[i]) || ""
          }">${esc(n.v)}</div></div>${arrow}`;
        })
        .join("");
      return panelShell(p, `<div class="llist">${parts}</div>`);
    },

    tree(p) {
      if (!p.root) return panelShell(p, `<div class="empty">empty tree</div>`);
      // assign x by in-order index, y by depth
      const nodes = [];
      let counter = 0;
      let maxDepth = 0;
      (function walk(n, depth) {
        if (!n) return;
        walk(n.left, depth + 1);
        n._x = counter++;
        n._y = depth;
        maxDepth = Math.max(maxDepth, depth);
        nodes.push(n);
        walk(n.right, depth + 1);
      })(p.root, 0);
      const cols = counter;
      const W = Math.max(cols * 62, 120);
      const H = (maxDepth + 1) * 74;
      const px = (n) => (n._x + 0.5) * (W / cols);
      const py = (n) => n._y * 74 + 26;
      let svg = "";
      nodes.forEach((n) => {
        [n.left, n.right].forEach((c) => {
          if (c)
            svg += `<line x1="${px(n)}" y1="${py(n)}" x2="${px(c)}" y2="${py(
              c
            )}" class="edge"/>`;
        });
      });
      let circles = "";
      nodes.forEach((n) => {
        const key = n.id != null ? n.id : n.v;
        const h = (p.highlight && p.highlight[key]) || "";
        circles += `<g class="tnode ${h}"><circle cx="${px(n)}" cy="${py(
          n
        )}" r="18"/><text x="${px(n)}" y="${py(n) + 5}">${esc(n.v)}</text></g>`;
      });
      return panelShell(
        p,
        `<svg class="tree" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${svg}${circles}</svg>`
      );
    },

    grid(p) {
      const cells = p.cells || [];
      const rows = cells
        .map((row, r) =>
          `<div class="grow">${row
            .map((val, c) => {
              const h = (p.highlight && p.highlight[r + "," + c]) || "";
              return `<div class="gcell ${h}">${esc(val)}</div>`;
            })
            .join("")}</div>`
        )
        .join("");
      return panelShell(p, `<div class="grid">${rows}</div>`);
    },

    dp(p) {
      return Panels.array(Object.assign({ variant: "dp" }, p));
    },

    bits(p) {
      const width = p.width || 8;
      const val = p.value >>> 0;
      let boxes = "";
      for (let i = width - 1; i >= 0; i--) {
        const bit = (val >> i) & 1;
        const h = (p.highlight && p.highlight[i]) || "";
        boxes += `<div class="bitwrap"><div class="bit ${h} b${bit}">${bit}</div><span class="idx">${i}</span></div>`;
      }
      return panelShell(p, `<div class="bits">${boxes}</div>`);
    },

    note(p) {
      return `<div class="panel note ${p.tone || ""}">${
        p.title ? `<div class="ptitle">${esc(p.title)}</div>` : ""
      }<div class="notebody">${p.html || esc(p.text || "")}</div></div>`;
    },
  };

  function panelShell(p, inner) {
    return `<div class="panel">${
      p.title ? `<div class="ptitle">${esc(p.title)}</div>` : ""
    }${inner}${p.note ? `<div class="pnote">${p.note}</div>` : ""}</div>`;
  }

  function renderPanels(panels) {
    return (panels || [])
      .map((p) => (Panels[p.type] ? Panels[p.type](p) : ""))
      .join("");
  }

  BLIND75.renderPanels = renderPanels;

  // ---------------------------------------------------------------- player
  class Player {
    constructor(el, steps, opts) {
      this.el = el;
      this.steps = steps || [];
      this.opts = opts || {};
      this.i = 0;
      this.playing = false;
      this.timer = null;
      this.speed = 1;
    }

    render() {
      this.el.innerHTML = `
        <div class="stage"></div>
        <div class="narration"></div>
        <div class="controls">
          <button class="ctl" data-a="restart" title="Restart">⏮</button>
          <button class="ctl" data-a="prev" title="Previous step">◀</button>
          <button class="ctl play" data-a="play" title="Play/Pause">▶ Play</button>
          <button class="ctl" data-a="next" title="Next step">▶</button>
          <span class="counter"></span>
          <label class="speed">Speed
            <select data-a="speed">
              <option value="0.5">0.5×</option>
              <option value="1" selected>1×</option>
              <option value="1.5">1.5×</option>
              <option value="2">2×</option>
            </select>
          </label>
          <input class="scrub" type="range" min="0" value="0" step="1"/>
        </div>`;
      this.stage = this.el.querySelector(".stage");
      this.narr = this.el.querySelector(".narration");
      this.counter = this.el.querySelector(".counter");
      this.scrub = this.el.querySelector(".scrub");
      this.playBtn = this.el.querySelector(".play");
      this.scrub.max = Math.max(0, this.steps.length - 1);

      this.el.querySelectorAll(".ctl").forEach((b) =>
        b.addEventListener("click", () => this.action(b.dataset.a))
      );
      this.el.querySelector('[data-a="speed"]').addEventListener("change", (e) => {
        this.speed = parseFloat(e.target.value);
        if (this.playing) this.schedule();
      });
      this.scrub.addEventListener("input", (e) => {
        this.pause();
        this.go(parseInt(e.target.value, 10));
      });
      this.go(0);
    }

    action(a) {
      if (a === "restart") {
        this.pause();
        this.go(0);
      } else if (a === "prev") {
        this.pause();
        this.go(this.i - 1);
      } else if (a === "next") {
        this.pause();
        this.go(this.i + 1);
      } else if (a === "play") {
        this.playing ? this.pause() : this.play();
      }
    }

    play() {
      if (this.i >= this.steps.length - 1) this.go(0);
      this.playing = true;
      this.playBtn.innerHTML = "⏸ Pause";
      this.playBtn.classList.add("on");
      this.schedule();
    }

    pause() {
      this.playing = false;
      this.playBtn.innerHTML = "▶ Play";
      this.playBtn.classList.remove("on");
      clearTimeout(this.timer);
    }

    schedule() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (!this.playing) return;
        if (this.i < this.steps.length - 1) {
          this.go(this.i + 1);
          this.schedule();
        } else {
          this.pause();
        }
      }, 2600 / this.speed);
    }

    go(i) {
      if (i < 0) i = 0;
      if (i > this.steps.length - 1) i = this.steps.length - 1;
      this.i = i;
      const step = this.steps[i] || {};
      this.stage.classList.remove("flash");
      void this.stage.offsetWidth; // restart CSS animation
      this.stage.classList.add("flash");
      this.stage.innerHTML = renderPanels(step.panels);
      this.narr.innerHTML =
        `<span class="stepno">Step ${i + 1}</span> ` + (step.narration || "");
      this.counter.textContent = `${i + 1} / ${this.steps.length}`;
      this.scrub.value = i;
      if (this.opts.onStep) this.opts.onStep(step, i);
    }

    destroy() {
      this.pause();
    }
  }

  BLIND75.Player = Player;
})();
