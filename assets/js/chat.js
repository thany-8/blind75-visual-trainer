/*
 * chat.js — the "ask any doubt" chat box, powered by the free Google Gemini API.
 *
 * Privacy/cost: this is a static site, so there is no server. The student pastes
 * their own free Gemini API key (aistudio.google.com/apikey). It is stored only in
 * this browser's localStorage and sent straight to Google's API — never anywhere else.
 */
(function () {
  "use strict";
  const esc = BLIND75.esc;
  const KEY_LS = "blind75.gemini.key";
  const MODEL_LS = "blind75.gemini.model";
  const DEFAULT_MODEL = "gemini-2.0-flash";

  const state = {
    problem: null,
    history: [], // {role:'user'|'model', text}
    open: false,
  };

  function getKey() {
    return localStorage.getItem(KEY_LS) || "";
  }
  function getModel() {
    return localStorage.getItem(MODEL_LS) || DEFAULT_MODEL;
  }

  function systemPrompt() {
    const p = state.problem;
    let ctx =
      "You are a warm, patient coding tutor for the 'Blind 75 Visual Trainer' app. " +
      "Explain everything as if teaching a curious 10-year-old: short sentences, friendly " +
      "analogies, no jargon without explaining it first. Use tiny concrete examples. " +
      "When helpful, use simple step-by-step lists. Keep answers focused and not too long.";
    if (p) {
      ctx += `\n\nThe student is currently looking at Blind 75 problem #${p.num}: "${p.title}" ` +
        `(category: ${p.category}, difficulty: ${p.difficulty}).`;
      const c = BLIND75.get(p.id);
      if (c && c.code && c.code.lines) {
        ctx += `\nThe reference solution shown in the app is:\n\`\`\`${c.code.lang || ""}\n` +
          c.code.lines.join("\n") + "\n```";
      }
      if (c && c.complexity) {
        ctx += `\nIts time complexity is ${c.complexity.time}, space ${c.complexity.space}.`;
      }
    }
    return ctx;
  }

  async function callGemini(userText) {
    const key = getKey();
    if (!key) throw new Error("NO_KEY");
    const model = getModel();
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(model) +
      ":generateContent?key=" +
      encodeURIComponent(key);
    const contents = state.history
      .concat([{ role: "user", text: userText }])
      .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
    const body = {
      system_instruction: { parts: [{ text: systemPrompt() }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let msg = "HTTP " + res.status;
      try {
        const j = await res.json();
        if (j.error && j.error.message) msg = j.error.message;
      } catch (e) {}
      throw new Error(msg);
    }
    const data = await res.json();
    const cand = data.candidates && data.candidates[0];
    const text =
      cand && cand.content && cand.content.parts
        ? cand.content.parts.map((p) => p.text || "").join("")
        : "";
    return text || "(No answer came back — try rephrasing?)";
  }

  // Very small, safe markdown-ish formatter (bold, code, line breaks).
  function fmt(t) {
    let s = esc(t);
    s = s.replace(/```([\s\S]*?)```/g, (_, code) => `<pre>${code.replace(/^\n/, "")}</pre>`);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/\n/g, "<br>");
    return s;
  }

  function el(id) {
    return document.getElementById(id);
  }

  function pushMsg(role, text, thinking) {
    const log = el("chat-log");
    const div = document.createElement("div");
    div.className = "msg " + role + (thinking ? " thinking" : "");
    div.innerHTML =
      `<div class="who">${role === "user" ? "🧑 You" : "🤖 Tutor"}</div>` +
      `<div class="bubble">${thinking ? "typing…" : fmt(text)}</div>`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  async function send() {
    const input = el("chat-input");
    const text = input.value.trim();
    if (!text) return;
    if (!getKey()) {
      openSettings(true);
      return;
    }
    input.value = "";
    input.style.height = "auto";
    pushMsg("user", text);
    const thinking = pushMsg("model", "", true);
    try {
      const answer = await callGemini(text);
      thinking.remove();
      pushMsg("model", answer);
      state.history.push({ role: "user", text });
      state.history.push({ role: "model", text: answer });
      if (state.history.length > 20) state.history = state.history.slice(-20);
    } catch (e) {
      thinking.remove();
      if (e.message === "NO_KEY") {
        openSettings(true);
      } else {
        pushMsg(
          "model",
          "⚠️ " +
            fmt(e.message) +
            "\n\nCheck your key in ⚙️ settings. Get a free key at aistudio.google.com/apikey."
        );
      }
    }
  }

  function openSettings(force) {
    const box = el("chat-settings");
    box.classList.toggle("open", force ? true : !box.classList.contains("open"));
    if (box.classList.contains("open")) {
      el("key-input").value = getKey();
      el("model-input").value = getModel();
    }
  }

  function saveSettings() {
    localStorage.setItem(KEY_LS, el("key-input").value.trim());
    localStorage.setItem(MODEL_LS, el("model-input").value.trim() || DEFAULT_MODEL);
    el("chat-settings").classList.remove("open");
    updateKeyState();
  }

  function updateKeyState() {
    const hint = el("chat-keyhint");
    if (getKey()) hint.classList.add("hidden");
    else hint.classList.remove("hidden");
  }

  function toggle(force) {
    state.open = force != null ? force : !state.open;
    document.body.classList.toggle("chat-open", state.open);
  }

  function build() {
    const wrap = document.createElement("div");
    wrap.id = "chat";
    wrap.innerHTML = `
      <div class="chat-head">
        <span>💬 Ask any doubt</span>
        <div class="chat-head-btns">
          <button id="chat-gear" title="Settings">⚙️</button>
          <button id="chat-close" title="Close">✕</button>
        </div>
      </div>
      <div id="chat-settings">
        <label>Free Gemini API key
          <input id="key-input" type="password" placeholder="paste key from aistudio.google.com/apikey"/></label>
        <label>Model
          <input id="model-input" type="text" placeholder="${DEFAULT_MODEL}"/></label>
        <div class="settings-row">
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Get a free key ↗</a>
          <button id="key-save">Save</button>
        </div>
        <p class="settings-note">Stored only in this browser. Sent directly to Google.</p>
      </div>
      <div id="chat-keyhint" class="hidden">
        👋 To ask questions, paste a <b>free</b> Gemini API key in ⚙️ settings.
      </div>
      <div id="chat-log">
        <div class="msg model"><div class="who">🤖 Tutor</div>
          <div class="bubble">Hi! I'm your tutor. Open any problem and ask me things like
          <i>"why do we use a hash map here?"</i> or <i>"explain step 3 again"</i>. I'll keep it simple. 🙂</div></div>
      </div>
      <div class="chat-input-row">
        <textarea id="chat-input" rows="1" placeholder="Ask anything… (Enter to send)"></textarea>
        <button id="chat-send">Send</button>
      </div>`;
    document.body.appendChild(wrap);

    const fab = document.createElement("button");
    fab.id = "chat-fab";
    fab.title = "Ask a doubt";
    fab.innerHTML = "💬";
    document.body.appendChild(fab);

    fab.addEventListener("click", () => toggle());
    el("chat-close").addEventListener("click", () => toggle(false));
    el("chat-gear").addEventListener("click", () => openSettings());
    el("key-save").addEventListener("click", saveSettings);
    el("chat-send").addEventListener("click", send);
    const input = el("chat-input");
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 120) + "px";
    });
    updateKeyState();
  }

  window.BLIND75_CHAT = {
    setProblem(p) {
      state.problem = p;
      state.history = []; // fresh context per problem
    },
    open: () => toggle(true),
  };

  window.addEventListener("DOMContentLoaded", build);
})();
