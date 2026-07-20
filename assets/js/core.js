/*
 * core.js — global registry + app state for the Blind 75 Visual Trainer.
 * No build step: every script attaches to the global BLIND75 namespace.
 */
(function () {
  "use strict";

  const REGISTRY = {}; // id -> full problem content object

  const BLIND75 = {
    // --- content registry -------------------------------------------------
    problems: REGISTRY,

    /** Register a problem's full teaching content. Called by files in problems/. */
    register(id, data) {
      REGISTRY[id] = Object.assign({ id }, data);
    },

    /** Get full content for a problem id (or undefined if not authored yet). */
    get(id) {
      return REGISTRY[id];
    },

    // --- progress tracking (localStorage) --------------------------------
    _progressKey: "blind75.progress.v1",

    loadProgress() {
      try {
        return JSON.parse(localStorage.getItem(this._progressKey)) || {};
      } catch (e) {
        return {};
      }
    },

    isDone(id) {
      return !!this.loadProgress()[id];
    },

    toggleDone(id) {
      const p = this.loadProgress();
      if (p[id]) delete p[id];
      else p[id] = Date.now();
      localStorage.setItem(this._progressKey, JSON.stringify(p));
      return !!p[id];
    },

    // --- tiny helpers -----------------------------------------------------
    /** Escape text for safe insertion into HTML. */
    esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    },

    /** Slugify a title into an id. */
    slug(s) {
      return String(s)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    },
  };

  window.BLIND75 = BLIND75;
})();
