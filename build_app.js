const fs = require('fs');
const path = require('path');

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));

console.log(`Loaded ${questions.length} questions.`);

// Construct HTML
const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بنك أسئلة ومحاكي أمن المعلومات | د. عبد الواسع العزاني</title>
  <meta name="description" content="منصة وبنك أسئلة متكامل ومحاكي اختبارات لمقرر أمن المعلومات -  (361 سؤالاً).">
  
  <style>
    /* ==========================================================================
       CSS DESIGN SYSTEM - ACADEMIC & MODERN (CLEAN, NO SLOP)
       ========================================================================== */
    :root {
      --primary: #8b1523;
      --primary-hover: #73111c;
      --primary-light: #fdf2f3;
      --primary-border: #f8c9cf;
      --accent: #0f172a;
      
      --bg: #f8fafc;
      --surface: #ffffff;
      --surface-subtle: #f1f5f9;
      --border: #e2e8f0;
      --border-focus: #8b1523;
      
      --text: #0f172a;
      --text-muted: #64748b;
      --text-light: #94a3b8;
      
      --correct: #15803d;
      --correct-bg: #f0fdf4;
      --correct-border: #86efac;
      
      --wrong: #b91c1c;
      --wrong-bg: #fef2f2;
      --wrong-border: #fca5a5;
      
      --flagged: #d97706;
      --flagged-bg: #fffbeb;
      --flagged-border: #fcd34d;
      
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Cairo", "Noto Sans Arabic", Tahoma, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    [data-theme="dark"] {
      --primary: #f43f5e;
      --primary-hover: #fb7185;
      --primary-light: #2c1219;
      --primary-border: #881337;
      --accent: #f8fafc;
      
      --bg: #0b0f19;
      --surface: #131c2e;
      --surface-subtle: #1e293b;
      --border: #283548;
      --border-focus: #f43f5e;
      
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --text-light: #64748b;
      
      --correct: #22c55e;
      --correct-bg: #052e16;
      --correct-border: #15803d;
      
      --wrong: #f43f5e;
      --wrong-bg: #450a14;
      --wrong-border: #9f1239;
      
      --flagged: #fbbf24;
      --flagged-bg: #451a03;
      --flagged-border: #b45309;
      
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-family);
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.2s ease, color 0.2s ease;
      -webkit-font-smoothing: antialiased;
    }

    /* English text blocks */
    .en-text {
      direction: ltr;
      text-align: left;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.25rem;
      width: 100%;
    }

    /* Header */
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 40;
      box-shadow: var(--shadow-sm);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 0;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .brand-badge {
      background: var(--primary);
      color: #fff;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.35rem 0.65rem;
      border-radius: var(--radius-sm);
      letter-spacing: 0.5px;
    }

    .brand-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .brand-subtitle {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 1px;
    }

    .nav-tabs {
      display: flex;
      background: var(--surface-subtle);
      padding: 0.25rem;
      border-radius: var(--radius-md);
      gap: 0.25rem;
    }

    .nav-tab-btn {
      background: transparent;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.15s ease;
    }

    .nav-tab-btn.active {
      background: var(--surface);
      color: var(--primary);
      box-shadow: var(--shadow-sm);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-btn {
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      color: var(--text);
      width: 38px;
      height: 38px;
      border-radius: var(--radius-sm);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.15s ease;
    }

    .icon-btn:hover {
      background: var(--border);
    }

    /* Common Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.55rem 1.1rem;
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--primary);
      color: #fff;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
    }

    .btn-outline {
      background: var(--surface);
      border-color: var(--border);
      color: var(--text);
    }

    .btn-outline:hover {
      background: var(--surface-subtle);
      border-color: var(--text-muted);
    }

    .btn-sm {
      padding: 0.35rem 0.75rem;
      font-size: 0.82rem;
    }

    .btn-danger {
      background: var(--wrong);
      color: #fff;
    }

    .btn-danger:hover {
      opacity: 0.9;
    }

    /* Main Area */
    main {
      flex: 1;
      padding: 1.5rem 0 3rem 0;
    }

    /* Stats Grid */
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.85rem;
      margin-bottom: 1.5rem;
    }

    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 0.9rem 1.1rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .stat-val {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text);
      margin-top: 0.2rem;
      display: flex;
      align-items: baseline;
      gap: 0.35rem;
    }

    .stat-sub {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: normal;
    }

    /* Filters Bar */
    .filter-panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 1rem 1.25rem;
      margin-bottom: 1.25rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .filter-row-top {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
    }

    .search-box {
      flex: 1;
      min-width: 250px;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 0.6rem 2.2rem 0.6rem 0.85rem;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s ease;
    }

    .search-input:focus {
      border-color: var(--border-focus);
    }

    .search-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .topic-select {
      min-width: 260px;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      cursor: pointer;
    }

    .topic-select:focus {
      border-color: var(--border-focus);
    }

    .filter-row-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border);
    }

    .status-filters {
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }

    .filter-chip {
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.15s ease;
    }

    .filter-chip.active {
      background: var(--primary-light);
      border-color: var(--primary-border);
      color: var(--primary);
    }

    .bank-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Questions List & Card */
    .questions-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .q-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .q-card:hover {
      border-color: #cbd5e1;
      box-shadow: var(--shadow-md);
    }

    [data-theme="dark"] .q-card:hover {
      border-color: #3b4d66;
    }

    .q-card-header {
      padding: 0.75rem 1.15rem;
      background: var(--surface-subtle);
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .q-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .q-badge {
      background: var(--accent);
      color: var(--surface);
      padding: 0.2rem 0.55rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 700;
      font-family: var(--font-mono);
    }

    .topic-tag {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.78rem;
      padding: 0.2rem 0.55rem;
      border-radius: var(--radius-sm);
      font-weight: 500;
    }

    .q-controls {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .star-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
      border-radius: var(--radius-sm);
      padding: 0.25rem 0.5rem;
      font-size: 0.85rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      transition: all 0.15s ease;
    }

    .star-btn.starred {
      background: var(--flagged-bg);
      border-color: var(--flagged-border);
      color: var(--flagged);
    }

    .q-card-body {
      padding: 1.15rem;
    }

    .q-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 1rem;
      line-height: 1.55;
    }

    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .opt-btn {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.7rem 0.95rem;
      text-align: left;
      font-size: 0.92rem;
      color: var(--text);
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      transition: all 0.15s ease;
      font-family: inherit;
      width: 100%;
    }

    .opt-btn:hover:not(:disabled) {
      background: var(--surface-subtle);
      border-color: #94a3b8;
    }

    .opt-letter {
      font-weight: 700;
      color: var(--text-muted);
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: 4px;
      min-width: 26px;
      height: 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.82rem;
      font-family: var(--font-mono);
      flex-shrink: 0;
      margin-top: 1px;
    }

    .opt-text {
      flex: 1;
      line-height: 1.45;
    }

    /* Option states */
    .opt-btn.user-selected {
      border-color: var(--accent);
      background: var(--surface-subtle);
    }

    .opt-btn.is-correct {
      background: var(--correct-bg) !important;
      border-color: var(--correct-border) !important;
      color: var(--correct) !important;
      font-weight: 600;
    }

    .opt-btn.is-correct .opt-letter {
      background: var(--correct);
      color: #fff;
      border-color: var(--correct);
    }

    .opt-btn.is-wrong {
      background: var(--wrong-bg) !important;
      border-color: var(--wrong-border) !important;
      color: var(--wrong) !important;
    }

    .opt-btn.is-wrong .opt-letter {
      background: var(--wrong);
      color: #fff;
      border-color: var(--wrong);
    }

    .q-explanation {
      margin-top: 0.85rem;
      padding: 0.75rem 1rem;
      background: var(--correct-bg);
      border: 1px solid var(--correct-border);
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    /* Pagination */
    .pagination-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .page-info {
      font-size: 0.88rem;
      color: var(--text-muted);
    }

    .page-controls {
      display: flex;
      gap: 0.35rem;
      align-items: center;
    }

    /* Empty state */
    .empty-state {
      background: var(--surface);
      border: 1px dashed var(--border);
      border-radius: var(--radius-md);
      padding: 3rem 1.5rem;
      text-align: center;
      color: var(--text-muted);
    }

    /* ==========================================================================
       EXAM SIMULATOR VIEWS
       ========================================================================== */
    .exam-setup-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      max-width: 800px;
      margin: 1.5rem auto;
    }

    .setup-title {
      font-size: 1.35rem;
      font-weight: 800;
      margin-bottom: 0.35rem;
      color: var(--text);
    }

    .setup-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }

    .setup-section {
      margin-bottom: 1.5rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--border);
    }

    .setup-section:last-of-type {
      border-bottom: none;
    }

    .setup-label {
      font-weight: 700;
      font-size: 0.92rem;
      color: var(--text);
      margin-bottom: 0.65rem;
      display: block;
    }

    .pill-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .pill-radio {
      border: 1px solid var(--border);
      background: var(--surface-subtle);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .pill-radio.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }

    .custom-input {
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      padding: 0.45rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      width: 100px;
      font-family: inherit;
    }

    /* Live Exam Screen */
    .exam-live-header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 30;
      padding: 0.85rem 0;
      box-shadow: var(--shadow-sm);
    }

    .exam-live-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .timer-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      padding: 0.45rem 0.85rem;
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.05rem;
      color: var(--text);
    }

    .timer-badge.warning {
      background: var(--wrong-bg);
      border-color: var(--wrong-border);
      color: var(--wrong);
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .exam-progress-outer {
      background: var(--surface-subtle);
      height: 6px;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 0.75rem;
      width: 100%;
    }

    .exam-progress-inner {
      background: var(--primary);
      height: 100%;
      width: 0%;
      transition: width 0.2s ease;
    }

    .exam-question-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      margin: 1.5rem auto;
      max-width: 850px;
    }

    .exam-nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 850px;
      margin: 1rem auto 3rem auto;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    /* Question Palette Modal / Grid */
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
      gap: 0.45rem;
      max-height: 380px;
      overflow-y: auto;
      padding: 0.5rem;
    }

    .palette-btn {
      height: 42px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 700;
      font-family: var(--font-mono);
      cursor: pointer;
      transition: all 0.15s ease;
      position: relative;
    }

    .palette-btn:hover {
      background: var(--surface-subtle);
    }

    .palette-btn.current {
      border: 2px solid var(--primary) !important;
      outline: 2px solid var(--primary-light);
    }

    .palette-btn.answered {
      background: #e0f2fe;
      border-color: #7dd3fc;
      color: #0369a1;
    }

    [data-theme="dark"] .palette-btn.answered {
      background: #082f49;
      border-color: #0369a1;
      color: #38bdf8;
    }

    .palette-btn.flagged {
      background: var(--flagged-bg);
      border-color: var(--flagged-border);
      color: var(--flagged);
    }

    .palette-btn.flagged::after {
      content: "★";
      position: absolute;
      top: 1px;
      right: 3px;
      font-size: 0.65rem;
      color: var(--flagged);
    }

    /* Modal Backdrop */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
      z-index: 100;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal-backdrop.active {
      display: flex;
    }

    .modal-dialog {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      max-width: 600px;
      width: 100%;
      overflow: hidden;
      animation: modalFadeIn 0.15s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-header {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-weight: 700;
      font-size: 1.1rem;
    }

    .modal-body {
      padding: 1.25rem;
    }

    .modal-footer {
      padding: 0.85rem 1.25rem;
      border-top: 1px solid var(--border);
      background: var(--surface-subtle);
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    /* Exam Results Screen */
    .result-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 2.5rem 1.5rem;
      box-shadow: var(--shadow-md);
      max-width: 850px;
      margin: 1.5rem auto;
      text-align: center;
    }

    .score-circle {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      margin: 0 auto 1.5rem auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 6px solid var(--primary);
      background: var(--primary-light);
    }

    .score-number {
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--primary);
      line-height: 1;
    }

    .score-total {
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .result-badge {
      display: inline-block;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .badge-pass {
      background: var(--correct-bg);
      color: var(--correct);
      border: 1px solid var(--correct-border);
    }

    .badge-fail {
      background: var(--wrong-bg);
      color: var(--wrong);
      border: 1px solid var(--wrong-border);
    }

    .result-meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
      text-align: right;
    }

    .result-meta-box {
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.75rem 1rem;
    }

    .topic-breakdown-list {
      margin-top: 1.5rem;
      text-align: right;
    }

    .topic-bar-row {
      margin-bottom: 0.85rem;
    }

    .topic-bar-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      margin-bottom: 0.25rem;
      color: var(--text);
    }

    .topic-bar-bg {
      background: var(--surface-subtle);
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .topic-bar-fill {
      height: 100%;
      background: var(--primary);
      border-radius: 4px;
    }

    /* History Table */
    .history-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    .history-table th, .history-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border);
      text-align: right;
      font-size: 0.9rem;
    }

    .history-table th {
      background: var(--surface-subtle);
      font-weight: 700;
      color: var(--text-muted);
    }

    /* Utility */
    .d-none { display: none !important; }
    .text-center { text-align: center; }

    /* Print styles */
    @media print {
      header, .filter-panel, .pagination-bar, .exam-live-header, .exam-nav-bar, .icon-btn, .nav-tabs, .bank-actions {
        display: none !important;
      }
      body {
        background: #fff !important;
        color: #000 !important;
      }
      .q-card {
        border: 1px solid #ccc !important;
        break-inside: avoid;
        margin-bottom: 1.5rem;
        box-shadow: none !important;
      }
      .q-explanation {
        background: #f0f0f0 !important;
        border: 1px solid #ccc !important;
      }
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: stretch;
      }
      .nav-tabs {
        overflow-x: auto;
      }
      .filter-row-top {
        flex-direction: column;
      }
      .topic-select, .search-box {
        width: 100%;
      }
      .filter-row-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
      .exam-nav-bar {
        flex-direction: column;
        align-items: stretch;
      }
    }
  </style>
</head>
<body>

  <!-- ========================================================================
       HEADER
       ======================================================================== -->
  <header>
    <div class="container header-content">
      <div class="brand">
        <span class="brand-badge">MCQs</span>
        <div>
          <div class="brand-title">
            <span>أمن المعلومات</span>
            <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">(361 سؤال)</span>
          </div>
        </div>
      </div>

      <div class="nav-tabs" role="tablist">
        <button class="nav-tab-btn active" id="tab-bank" onclick="App.switchView('bank')">
          <span>📚</span> بنك الأسئلة والمذاكرة
        </button>
        <button class="nav-tab-btn" id="tab-exam" onclick="App.switchView('exam-setup')">
          <span>⏱️</span> محاكاة الاختبار
        </button>
        <button class="nav-tab-btn" id="tab-history" onclick="App.switchView('history')">
          <span>📊</span> سجل الاختبارات
        </button>
      </div>

      <div class="header-actions">
        <button class="icon-btn" onclick="App.openKeyboardModal()" title="اختصارات لوحة المفاتيح">⌨️</button>
        <button class="icon-btn" id="theme-btn" onclick="App.toggleTheme()" title="تبديل المظهر">🌓</button>
      </div>
    </div>
  </header>

  <!-- ========================================================================
       MAIN CONTAINER
       ======================================================================== -->
  <main class="container">

    <!-- ======================================================================
         VIEW 1: QUESTION BANK & STUDY MODE
         ====================================================================== -->
    <section id="view-bank">
      
      <!-- Statistics summary bar -->
      <div class="stats-bar">
        <div class="stat-card">
          <span class="stat-label">إجمالي الأسئلة</span>
          <span class="stat-val" id="stat-total-q">361</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">الأسئلة المجابة</span>
          <span class="stat-val">
            <span id="stat-answered">0</span>
            <span class="stat-sub">/ 361</span>
          </span>
        </div>
        <div class="stat-card">
          <span class="stat-label">إجابات صحيحة</span>
          <span class="stat-val" style="color: var(--correct);">
            <span id="stat-correct">0</span>
            <span class="stat-sub" id="stat-accuracy">(0%)</span>
          </span>
        </div>
        <div class="stat-card">
          <span class="stat-label">بنك الأخطاء</span>
          <span class="stat-val" style="color: var(--wrong);">
            <span id="stat-wrong">0</span>
          </span>
        </div>
        <div class="stat-card">
          <span class="stat-label">المميزة بنجمة</span>
          <span class="stat-val" style="color: var(--flagged);">
            <span id="stat-starred">0</span>
          </span>
        </div>
      </div>

      <!-- Filter & Search Toolbar -->
      <div class="filter-panel">
        <div class="filter-row-top">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              id="search-input" 
              class="search-input" 
              placeholder="ابحث برقم السؤال (مثل Q45) أو كلمات من السؤال والخيارات..." 
              oninput="App.onSearchChange(this.value)"
            >
          </div>

          <select id="topic-filter" class="topic-select" onchange="App.onTopicChange(this.value)">
            <option value="ALL">جميع الأبواب والمواضيع (13 موضوعاً)</option>
          </select>
        </div>

        <div class="filter-row-bottom">
          <div class="status-filters">
            <button class="filter-chip active" data-filter="all" onclick="App.onFilterStatus('all', this)">الكل</button>
            <button class="filter-chip" data-filter="unanswered" onclick="App.onFilterStatus('unanswered', this)">لم تُجب</button>
            <button class="filter-chip" data-filter="correct" onclick="App.onFilterStatus('correct', this)">صحيحة</button>
            <button class="filter-chip" data-filter="wrong" onclick="App.onFilterStatus('wrong', this)">أخطاء</button>
            <button class="filter-chip" data-filter="starred" onclick="App.onFilterStatus('starred', this)">المميزة ★</button>
          </div>

          <div class="bank-actions">
            <button class="btn btn-outline btn-sm" id="btn-toggle-answers" onclick="App.toggleRevealAllAnswers()">
              👁️ إظهار كل الإجابات
            </button>
            <button class="btn btn-outline btn-sm" onclick="App.printBank()" title="طباعة الأسئلة المعروضة">
              🖨️ طباعة
            </button>
            <button class="btn btn-outline btn-sm" onclick="App.resetStudyProgress()" title="إعادة تعيين التقدم">
              🔄 تصفير الإجابات
            </button>
          </div>
        </div>
      </div>

      <!-- Question Cards List -->
      <div id="questions-list" class="questions-wrapper">
        <!-- Rendered dynamically -->
      </div>

      <!-- Pagination -->
      <div class="pagination-bar" id="pagination-container">
        <div class="page-info" id="pagination-info">
          عرض 1 إلى 20 من 361 سؤال
        </div>
        <div class="page-controls" id="pagination-buttons">
          <!-- Rendered dynamically -->
        </div>
      </div>

    </section>

    <!-- ======================================================================
         VIEW 2: EXAM SETUP
         ====================================================================== -->
    <section id="view-exam-setup" class="d-none">
      <div class="exam-setup-card">
        <h2 class="setup-title">إعداد محاكاة الاختبار</h2>
        <p class="setup-desc">اختر إعدادات الاختبار لبدء تجربة محاكاة واقعية لاختبار مادة أمن المعلومات.</p>

        <!-- Number of Questions -->
        <div class="setup-section">
          <label class="setup-label">عدد الأسئلة:</label>
          <div class="pill-group" id="exam-qcount-pills">
            <div class="pill-radio" data-count="15" onclick="Exam.setQuestionCount(15, this)">15 سؤال</div>
            <div class="pill-radio active" data-count="30" onclick="Exam.setQuestionCount(30, this)">30 سؤال (افتراضي)</div>
            <div class="pill-radio" data-count="50" onclick="Exam.setQuestionCount(50, this)">50 سؤال</div>
            <div class="pill-radio" data-count="100" onclick="Exam.setQuestionCount(100, this)">100 سؤال</div>
            <div class="pill-radio" data-count="ALL" onclick="Exam.setQuestionCount('ALL', this)">جميع الـ 361 سؤال</div>
            <div class="pill-radio" data-count="CUSTOM" onclick="Exam.setQuestionCount('CUSTOM', this)">مخصص</div>
          </div>
          <div id="custom-count-wrapper" class="d-none" style="margin-top: 0.65rem;">
            <input type="number" id="custom-qcount-input" class="custom-input" min="5" max="361" value="40" onchange="Exam.setCustomCount(this.value)">
            <span style="font-size: 0.85rem; color: var(--text-muted); margin-right: 0.5rem;">سؤال (بين 5 و 361)</span>
          </div>
        </div>

        <!-- Question Source / Filter -->
        <div class="setup-section">
          <label class="setup-label">نطاق ومصدر الأسئلة:</label>
          <div class="pill-group" id="exam-source-pills">
            <div class="pill-radio active" data-source="all" onclick="Exam.setSource('all', this)">كافة الأبواب (شامل)</div>
            <div class="pill-radio" data-source="topic" onclick="Exam.setSource('topic', this)">حسب موضوع محدد</div>
            <div class="pill-radio" data-source="wrong" onclick="Exam.setSource('wrong', this)">بنك الأخطاء السابقة فقط (<span id="exam-setup-wrong-count">0</span>)</div>
            <div class="pill-radio" data-source="starred" onclick="Exam.setSource('starred', this)">الأسئلة المميزة بنجمة فقط (<span id="exam-setup-starred-count">0</span>)</div>
          </div>

          <div id="exam-topic-select-wrapper" class="d-none" style="margin-top: 0.75rem;">
            <select id="exam-topic-select" class="topic-select" style="width: 100%;">
              <!-- Rendered dynamically -->
            </select>
          </div>
        </div>

        <!-- Timer Setting -->
        <div class="setup-section">
          <label class="setup-label">المؤقت الزمني:</label>
          <div class="pill-group" id="exam-timer-pills">
            <div class="pill-radio active" data-timer="auto" onclick="Exam.setTimer('auto', this)">معدل دقيقة لكل سؤال</div>
            <div class="pill-radio" data-timer="none" onclick="Exam.setTimer('none', this)">بدون وقت (غير مقيد)</div>
            <div class="pill-radio" data-timer="custom" onclick="Exam.setTimer('custom', this)">وقت محدد</div>
          </div>
          <div id="custom-timer-wrapper" class="d-none" style="margin-top: 0.65rem;">
            <input type="number" id="custom-timer-input" class="custom-input" min="1" max="240" value="30">
            <span style="font-size: 0.85rem; color: var(--text-muted); margin-right: 0.5rem;">دقيقة</span>
          </div>
        </div>

        <!-- Feedback Mode -->
        <div class="setup-section">
          <label class="setup-label">أسلوب العرض والتصحيح:</label>
          <div class="pill-group" id="exam-mode-pills">
            <div class="pill-radio active" data-mode="real" onclick="Exam.setFeedbackMode('real', this)">
              🎓 محاكاة حقيقية (النتيجة والإجابات بعد التسليم فقط)
            </div>
            <div class="pill-radio" data-mode="instant" onclick="Exam.setFeedbackMode('instant', this)">
              ⚡ تصحيح فوري (معرفة صحة الإجابة فور الاختيار)
            </div>
          </div>
        </div>

        <!-- Randomization -->
        <div class="setup-section">
          <label class="setup-label">خيارات إضافية:</label>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.9rem;">
              <input type="checkbox" id="chk-shuffle-q" checked> خلط ترتيب الأسئلة عشوائياً
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.9rem;">
              <input type="checkbox" id="chk-shuffle-opt"> خلط ترتيب الخيارات الذكي (يتجنب خلط الخيارات المحتوية على All of the above)
            </label>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
          <button class="btn btn-outline" onclick="App.switchView('bank')">إلغاء</button>
          <button class="btn btn-primary" style="padding: 0.65rem 2rem; font-size: 1rem;" onclick="Exam.start()">
            🚀 بدء الاختبار
          </button>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         VIEW 3: ACTIVE LIVE EXAM
         ====================================================================== -->
    <section id="view-exam-live" class="d-none">
      
      <!-- Sticky Exam Status Header -->
      <div class="exam-live-header">
        <div class="exam-live-bar">
          <div>
            <span style="font-weight: 800; font-size: 1.1rem;" id="live-q-counter">السؤال 1 من 30</span>
            <span style="color: var(--text-muted); font-size: 0.85rem; margin-right: 0.5rem;" id="live-answered-ratio">(أجبت على 0)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <div class="timer-badge" id="live-timer-badge">
              <span>⏱️</span> <span id="live-timer-text">30:00</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="Exam.togglePaletteModal()" title="جدول الأسئلة السريع">
              📋 لوحة الأسئلة
            </button>
            <button class="btn btn-outline btn-sm" onclick="Exam.confirmLeaveExam()" title="الخروج من الاختبار والعودة للبنك">
              🚪 خروج
            </button>
            <button class="btn btn-danger btn-sm" onclick="Exam.promptSubmitExam()">
              تسليم الاختبار
            </button>
          </div>
        </div>

        <div class="exam-progress-outer">
          <div class="exam-progress-inner" id="live-progress-fill"></div>
        </div>
      </div>

      <!-- Current Question Card -->
      <div class="exam-question-card" id="live-question-card">
        <!-- Rendered dynamically -->
      </div>

      <!-- Navigation Bar -->
      <div class="exam-nav-bar">
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-outline" id="btn-exam-prev" onclick="Exam.prevQuestion()">
            ← السابق
          </button>
          <button class="btn btn-outline" id="btn-exam-next" onclick="Exam.nextQuestion()">
            التالي →
          </button>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-outline" id="btn-exam-flag" onclick="Exam.toggleCurrentFlag()">
            ★ تمييز للمراجعة
          </button>
          <button class="btn btn-outline" onclick="Exam.clearCurrentAnswer()">
            مسح الإجابة
          </button>
        </div>
      </div>

    </section>

    <!-- ======================================================================
         VIEW 4: EXAM RESULT & DETAILED REVIEW
         ====================================================================== -->
    <section id="view-exam-result" class="d-none">
      <div class="result-card">
        <div class="score-circle" id="result-score-circle">
          <div class="score-number" id="result-percentage">0%</div>
          <div class="score-total" id="result-score-ratio">0 / 0</div>
        </div>

        <div id="result-badge-container">
          <span class="result-badge badge-pass" id="result-status-badge">ناجح ومتميز</span>
        </div>

        <h2 id="result-headline" style="font-weight: 800; margin-bottom: 0.5rem;">أحسنت! أداء رائع</h2>
        <p style="color: var(--text-muted); font-size: 0.92rem;" id="result-subtext">تم تصحيح كافة الأسئلة، تفقد التفاصيل ومواطن القوة والضعف أدناه.</p>

        <!-- Meta Summary -->
        <div class="result-meta-grid">
          <div class="result-meta-box">
            <div style="font-size: 0.78rem; color: var(--text-muted);">الوقت المستغرق</div>
            <div style="font-weight: 700; font-size: 1.1rem; margin-top: 2px;" id="result-time-taken">--:--</div>
          </div>
          <div class="result-meta-box">
            <div style="font-size: 0.78rem; color: var(--text-muted);">إجابات صحيحة</div>
            <div style="font-weight: 700; font-size: 1.1rem; color: var(--correct); margin-top: 2px;" id="result-correct-count">0</div>
          </div>
          <div class="result-meta-box">
            <div style="font-size: 0.78rem; color: var(--text-muted);">إجابات خاطئة</div>
            <div style="font-weight: 700; font-size: 1.1rem; color: var(--wrong); margin-top: 2px;" id="result-wrong-count">0</div>
          </div>
          <div class="result-meta-box">
            <div style="font-size: 0.78rem; color: var(--text-muted);">أسئلة لم تُجب</div>
            <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-muted); margin-top: 2px;" id="result-unanswered-count">0</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0;">
          <button class="btn btn-primary" id="btn-retest-errors" onclick="Exam.retestErrorsOnly()">
            🔁 إعادة اختبار الأخطاء فقط
          </button>
          <button class="btn btn-outline" onclick="App.switchView('exam-setup')">
            ⏱️ اختبار جديد
          </button>
          <button class="btn btn-outline" onclick="App.switchView('bank')">
            📚 العودة لبنك الأسئلة
          </button>
          <button class="btn btn-outline" onclick="window.print()">
            🖨️ طباعة النتيجة
          </button>
        </div>

        <!-- Topic Breakdown -->
        <div class="topic-breakdown-list">
          <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.85rem; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;">
            تحليل الأداء حسب الموضوع:
          </h3>
          <div id="result-topic-bars">
            <!-- Dynamic bars -->
          </div>
        </div>
      </div>

      <!-- Detailed Question-by-Question Review -->
      <div style="max-width: 850px; margin: 2rem auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 800;">مراجعة الأسئلة بالتفصيل:</h3>
          <div class="status-filters">
            <button class="filter-chip active" id="rf-all" onclick="Exam.filterReview('all', this)">كافة أسئلة الاختبار</button>
            <button class="filter-chip" id="rf-wrong" onclick="Exam.filterReview('wrong', this)">الأخطاء فقط</button>
            <button class="filter-chip" id="rf-flagged" onclick="Exam.filterReview('flagged', this)">المميزة للمراجعة</button>
          </div>
        </div>

        <div id="exam-review-list" class="questions-wrapper">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </section>

    <!-- ======================================================================
         VIEW 5: EXAM HISTORY
         ====================================================================== -->
    <section id="view-history" class="d-none">
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h2 style="font-size: 1.3rem; font-weight: 800;">سجل الاختبارات السابقة</h2>
            <p style="color: var(--text-muted); font-size: 0.88rem;">يتم حفظ نتائج الاختبارات ومحاولاتك تلقائياً على متصفحك.</p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="App.exportData()">
              💾 تصدير نسخة احتياطية
            </button>
            <label class="btn btn-outline btn-sm" style="margin: 0; cursor: pointer;">
              📥 استيراد بيانات
              <input type="file" accept=".json" style="display: none;" onchange="App.importData(event)">
            </label>
            <button class="btn btn-outline btn-sm" onclick="App.clearHistory()">
              🗑️ مسح السجل
            </button>
          </div>
        </div>

        <div id="history-container" style="overflow-x: auto;">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </section>

  </main>

  <!-- ========================================================================
       MODAL: QUESTION PALETTE (EXAM QUICK JUMP)
       ======================================================================== -->
  <div class="modal-backdrop" id="palette-modal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">لوحة الأسئلة السريعة</h3>
        <button class="icon-btn" onclick="Exam.togglePaletteModal()" style="width: 32px; height: 32px;">✕</button>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 1rem; margin-bottom: 0.85rem; font-size: 0.82rem; flex-wrap: wrap;">
          <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <span style="width: 12px; height: 12px; background: #0284c7; border-radius: 2px;"></span> تم الإجابة
          </span>
          <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <span style="width: 12px; height: 12px; background: var(--surface-subtle); border: 1px solid var(--border); border-radius: 2px;"></span> لم يُجب
          </span>
          <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <span style="width: 12px; height: 12px; background: var(--flagged-bg); border: 1px solid var(--flagged); border-radius: 2px;"></span> مميز للمراجعة ★
          </span>
        </div>
        <div class="palette-grid" id="palette-grid">
          <!-- Rendered dynamically -->
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline btn-sm" onclick="Exam.togglePaletteModal()">إغلاق</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       MODAL: SUBMIT EXAM CONFIRMATION
       ======================================================================== -->
  <div class="modal-backdrop" id="submit-confirm-modal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">تسليم الاختبار</h3>
        <button class="icon-btn" onclick="Exam.closeSubmitPrompt()" style="width: 32px; height: 32px;">✕</button>
      </div>
      <div class="modal-body" id="submit-confirm-body">
        <!-- Rendered dynamically -->
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="Exam.closeSubmitPrompt()">متابعة الاختبار</button>
        <button class="btn btn-danger" onclick="Exam.submitExamNow()">تأكيد وتسليم الآن</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       MODAL: KEYBOARD SHORTCUTS
       ======================================================================== -->
  <div class="modal-backdrop" id="keyboard-modal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">اختصارات لوحة المفاتيح ⌨️</h3>
        <button class="icon-btn" onclick="App.closeKeyboardModal()" style="width: 32px; height: 32px;">✕</button>
      </div>
      <div class="modal-body" style="font-size: 0.92rem; line-height: 1.8;">
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 0.4rem; font-weight: bold; width: 45%;">
                <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">A</kbd> / <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">B</kbd> / <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">C</kbd> / <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">D</kbd><br>
                <small style="color: var(--text-muted);">(أو الأرقام 1, 2, 3, 4)</small>
              </td>
              <td>اختيار الإجابة مباشرة أثناء الاختبار</td>
            </tr>
            <tr>
              <td style="padding: 0.4rem; font-weight: bold;">
                <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">→</kbd> / <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">←</kbd>
              </td>
              <td>الانتقال بين السؤال التالي والسابق</td>
            </tr>
            <tr>
              <td style="padding: 0.4rem; font-weight: bold;">
                <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">F</kbd>
              </td>
              <td>تمييز السؤال للمراجعة (Flag)</td>
            </tr>
            <tr>
              <td style="padding: 0.4rem; font-weight: bold;">
                <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">P</kbd>
              </td>
              <td>فتح لوحة الأسئلة السريعة (Palette)</td>
            </tr>
            <tr>
              <td style="padding: 0.4rem; font-weight: bold;">
                <kbd style="background: var(--surface-subtle); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">Esc</kbd>
              </td>
              <td>إغلاق النوافذ المنبثقة</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary btn-sm" onclick="App.closeKeyboardModal()">حسناً، فهمت</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       APPLICATION LOGIC & 361 EMBEDDED QUESTIONS
       ======================================================================== -->
  <script>
    // 1. EMBEDDED QUESTIONS DATA (361 ITEMS)
    const RAW_QUESTIONS = ${JSON.stringify(questions)};

    // 2. LOCAL STORAGE KEYS & STORAGE WRAPPER
    const Storage = {
      KEY_STUDY: 'infosec_study_progress',
      KEY_STARS: 'infosec_starred_ids',
      KEY_HISTORY: 'infosec_exam_history',
      KEY_THEME: 'infosec_theme',

      getStudyProgress() {
        try {
          return JSON.parse(localStorage.getItem(this.KEY_STUDY)) || {};
        } catch (e) { return {}; }
      },
      saveStudyProgress(data) {
        localStorage.setItem(this.KEY_STUDY, JSON.stringify(data));
      },
      getStarred() {
        try {
          return new Set(JSON.parse(localStorage.getItem(this.KEY_STARS)) || []);
        } catch (e) { return new Set(); }
      },
      saveStarred(starSet) {
        localStorage.setItem(this.KEY_STARS, JSON.stringify(Array.from(starSet)));
      },
      getHistory() {
        try {
          return JSON.parse(localStorage.getItem(this.KEY_HISTORY)) || [];
        } catch (e) { return []; }
      },
      saveHistory(hist) {
        localStorage.setItem(this.KEY_HISTORY, JSON.stringify(hist));
      },
      getTheme() {
        return localStorage.getItem(this.KEY_THEME) || 'light';
      },
      saveTheme(t) {
        localStorage.setItem(this.KEY_THEME, t);
      }
    };

    // 3. MAIN APP STATE & CONTROLLER
    const App = {
      questions: RAW_QUESTIONS,
      topics: [],
      studyAnswers: Storage.getStudyProgress(),
      starredIds: Storage.getStarred(),
      currentView: 'bank',

      // Bank Filters & Pagination
      searchQuery: '',
      selectedTopic: 'ALL',
      statusFilter: 'all', // all | unanswered | correct | wrong | starred
      revealAllAnswers: false,
      revealedIndividualMap: {},
      currentPage: 1,
      pageSize: 20,

      init() {
        // Init theme
        const savedTheme = Storage.getTheme();
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Extract unique topics
        const topicSet = new Set();
        this.questions.forEach(q => topicSet.add(q.topic));
        this.topics = Array.from(topicSet);

        // Populate topic dropdowns
        const topicSelect = document.getElementById('topic-filter');
        const examTopicSelect = document.getElementById('exam-topic-select');
        
        this.topics.forEach(t => {
          const opt1 = document.createElement('option');
          opt1.value = t;
          opt1.textContent = t;
          topicSelect.appendChild(opt1);

          const opt2 = document.createElement('option');
          opt2.value = t;
          opt2.textContent = t;
          examTopicSelect.appendChild(opt2);
        });

        // Setup global keyboard listeners
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Render initial view
        this.updateStats();
        this.renderBank();
        this.renderHistory();
      },

      toggleTheme() {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        Storage.saveTheme(next);
      },

      openKeyboardModal() {
        document.getElementById('keyboard-modal').classList.add('active');
      },
      closeKeyboardModal() {
        document.getElementById('keyboard-modal').classList.remove('active');
      },

      switchView(viewName) {
        this.currentView = viewName;

        // Hide all views
        document.getElementById('view-bank').classList.add('d-none');
        document.getElementById('view-exam-setup').classList.add('d-none');
        document.getElementById('view-exam-live').classList.add('d-none');
        document.getElementById('view-exam-result').classList.add('d-none');
        document.getElementById('view-history').classList.add('d-none');

        // Nav tabs active status
        document.getElementById('tab-bank').classList.remove('active');
        document.getElementById('tab-exam').classList.remove('active');
        document.getElementById('tab-history').classList.remove('active');

        if (viewName === 'bank') {
          document.getElementById('view-bank').classList.remove('d-none');
          document.getElementById('tab-bank').classList.add('active');
          this.updateStats();
          this.renderBank();
        } else if (viewName === 'exam-setup') {
          document.getElementById('view-exam-setup').classList.remove('d-none');
          document.getElementById('tab-exam').classList.add('active');
          Exam.updateSetupCounts();
        } else if (viewName === 'exam-live') {
          document.getElementById('view-exam-live').classList.remove('d-none');
          document.getElementById('tab-exam').classList.add('active');
        } else if (viewName === 'exam-result') {
          document.getElementById('view-exam-result').classList.remove('d-none');
          document.getElementById('tab-exam').classList.add('active');
        } else if (viewName === 'history') {
          document.getElementById('view-history').classList.remove('d-none');
          document.getElementById('tab-history').classList.add('active');
          this.renderHistory();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      // Bank Mode Functions
      updateStats() {
        const total = this.questions.length;
        let answered = 0;
        let correct = 0;
        let wrong = 0;

        for (const q of this.questions) {
          const rec = this.studyAnswers[q.id];
          if (rec) {
            answered++;
            if (rec.selected === q.answer) correct++;
            else wrong++;
          }
        }

        const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
        const starred = this.starredIds.size;

        document.getElementById('stat-total-q').textContent = total;
        document.getElementById('stat-answered').textContent = answered;
        document.getElementById('stat-correct').textContent = correct;
        document.getElementById('stat-accuracy').textContent = '(' + accuracy + '%)';
        document.getElementById('stat-wrong').textContent = wrong;
        document.getElementById('stat-starred').textContent = starred;
      },

      onSearchChange(val) {
        this.searchQuery = val.trim().toLowerCase();
        this.currentPage = 1;
        this.renderBank();
      },

      onTopicChange(val) {
        this.selectedTopic = val;
        this.currentPage = 1;
        this.renderBank();
      },

      onFilterStatus(status, btn) {
        this.statusFilter = status;
        this.currentPage = 1;
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        if (btn) btn.classList.add('active');
        this.renderBank();
      },

      toggleRevealAllAnswers() {
        this.revealAllAnswers = !this.revealAllAnswers;
        const btn = document.getElementById('btn-toggle-answers');
        if (this.revealAllAnswers) {
          btn.innerHTML = '🙈 إخفاء كل الإجابات';
          btn.classList.add('active');
        } else {
          btn.innerHTML = '👁️ إظهار كل الإجابات';
          btn.classList.remove('active');
        }
        this.renderBank();
      },

      toggleSingleAnswerReveal(qid) {
        this.revealedIndividualMap[qid] = !this.revealedIndividualMap[qid];
        this.renderBank();
      },

      toggleStar(qid, event) {
        if (event) event.stopPropagation();
        if (this.starredIds.has(qid)) {
          this.starredIds.delete(qid);
        } else {
          this.starredIds.add(qid);
        }
        Storage.saveStarred(this.starredIds);
        this.updateStats();
        this.renderBank();
      },

      handleBankOptionClick(qid, optKey) {
        const q = this.questions.find(item => item.id === qid);
        if (!q) return;

        this.studyAnswers[qid] = {
          selected: optKey,
          isCorrect: optKey === q.answer,
          timestamp: Date.now()
        };

        Storage.saveStudyProgress(this.studyAnswers);
        this.updateStats();
        this.renderBank();
      },

      resetStudyProgress() {
        if (confirm('هل أنت متأكد من رغبتك في تصفير تقدمك في بنك الأسئلة؟')) {
          this.studyAnswers = {};
          this.revealedIndividualMap = {};
          Storage.saveStudyProgress({});
          this.updateStats();
          this.renderBank();
        }
      },

      printBank() {
        window.print();
      },

      exportData() {
        const payload = {
          version: 1,
          date: new Date().toISOString(),
          studyAnswers: this.studyAnswers,
          starredIds: Array.from(this.starredIds),
          examHistory: Storage.getHistory()
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'infosec_exam_backup_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
      },

      importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (data.studyAnswers) {
              this.studyAnswers = data.studyAnswers;
              Storage.saveStudyProgress(this.studyAnswers);
            }
            if (data.starredIds) {
              this.starredIds = new Set(data.starredIds);
              Storage.saveStarred(this.starredIds);
            }
            if (data.examHistory) {
              Storage.saveHistory(data.examHistory);
            }
            alert('تم استيراد بيانات التقدم والاختبارات بنجاح!');
            this.updateStats();
            this.renderBank();
            this.renderHistory();
          } catch (err) {
            alert('عذراً، الملف المحدد غير صالح.');
          }
        };
        reader.readAsText(file);
      },

      getFilteredQuestions() {
        return this.questions.filter(q => {
          // Topic filter
          if (this.selectedTopic !== 'ALL' && q.topic !== this.selectedTopic) {
            return false;
          }

          // Search query (question text, options, ID)
          if (this.searchQuery) {
            const qStr = 'q' + q.id;
            const fullQ = q.question.toLowerCase();
            const opts = Object.values(q.options).join(' ').toLowerCase();
            const query = this.searchQuery;

            if (!qStr.includes(query) && !fullQ.includes(query) && !opts.includes(query)) {
              return false;
            }
          }

          // Status filter
          const rec = this.studyAnswers[q.id];
          if (this.statusFilter === 'unanswered' && rec) return false;
          if (this.statusFilter === 'correct' && (!rec || rec.selected !== q.answer)) return false;
          if (this.statusFilter === 'wrong' && (!rec || rec.selected === q.answer)) return false;
          if (this.statusFilter === 'starred' && !this.starredIds.has(q.id)) return false;

          return true;
        });
      },

      renderBank() {
        const filtered = this.getFilteredQuestions();
        const container = document.getElementById('questions-list');
        const paginationContainer = document.getElementById('pagination-container');
        const paginationInfo = document.getElementById('pagination-info');
        const paginationButtons = document.getElementById('pagination-buttons');

        if (filtered.length === 0) {
          container.innerHTML = \`
            <div class="empty-state">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
              <h3 style="font-weight: 700; margin-bottom: 0.25rem;">لم يتم العثور على أسئلة مطابقة</h3>
              <p style="font-size: 0.88rem;">جرب تغيير كلمة البحث أو تحديد تصنيف مختلف.</p>
            </div>
          \`;
          paginationContainer.classList.add('d-none');
          return;
        }

        paginationContainer.classList.remove('d-none');
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / this.pageSize);
        if (this.currentPage > totalPages) this.currentPage = totalPages;
        if (this.currentPage < 1) this.currentPage = 1;

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, totalItems);
        const pageItems = filtered.slice(startIndex, endIndex);

        paginationInfo.textContent = \`عرض \${startIndex + 1} إلى \${endIndex} من إجمالي \${totalItems} سؤال\`;

        // Render Cards
        container.innerHTML = pageItems.map(q => {
          const isStarred = this.starredIds.has(q.id);
          const studyRecord = this.studyAnswers[q.id];
          const hasAnswered = !!studyRecord;
          const userChoice = studyRecord ? studyRecord.selected : null;
          const showAnswer = this.revealAllAnswers || hasAnswered || this.revealedIndividualMap[q.id];

          const optionsHtml = Object.entries(q.options).map(([letter, text]) => {
            let extraClass = '';
            if (showAnswer) {
              if (letter === q.answer) {
                extraClass = 'is-correct';
              } else if (userChoice === letter) {
                extraClass = 'is-wrong';
              }
            } else if (userChoice === letter) {
              extraClass = 'user-selected';
            }

            return \`
              <button 
                type="button"
                class="opt-btn en-text \${extraClass}"
                onclick="App.handleBankOptionClick(\${q.id}, '\${letter}')"
              >
                <span class="opt-letter">\${letter}</span>
                <span class="opt-text">\${this.escapeHtml(text)}</span>
              </button>
            \`;
          }).join('');

          let explanationHtml = '';
          if (showAnswer) {
            const isCorrect = userChoice === q.answer;
            const statusText = hasAnswered 
              ? (isCorrect ? '✅ إجابتك صحيحة!' : \`❌ إجابتك غير صحيحة (اخترت \${userChoice})\`)
              : 'الإجابة المعتمدة:';

            explanationHtml = \`
              <div class="q-explanation">
                <span>\${statusText}</span>
                <strong>الخيار (\${q.answer}) هو الصحيح:</strong>
                <span class="en-text" style="font-weight: 500;">\${this.escapeHtml(q.options[q.answer])}</span>
              </div>
            \`;
          }

          return \`
            <div class="q-card" id="qcard-\${q.id}">
              <div class="q-card-header">
                <div class="q-meta">
                  <span class="q-badge">Q\${q.id}</span>
                  <span class="topic-tag">\${q.topic}</span>
                </div>
                <div class="q-controls">
                  <button 
                    class="btn btn-outline btn-sm"
                    style="padding: 0.2rem 0.5rem; font-size: 0.78rem;"
                    onclick="App.toggleSingleAnswerReveal(\${q.id})"
                  >
                    \${showAnswer ? 'إخفاء الإجابة' : 'كشف الإجابة'}
                  </button>
                  <button 
                    class="star-btn \${isStarred ? 'starred' : ''}" 
                    onclick="App.toggleStar(\${q.id}, event)"
                    title="\${isStarred ? 'إزالة من المميزة' : 'إضافة إلى الأسئلة المميزة'}"
                  >
                    <span>\${isStarred ? '★' : '☆'}</span>
                    <span>\${isStarred ? 'مميز' : 'تمييز'}</span>
                  </button>
                </div>
              </div>
              <div class="q-card-body">
                <div class="q-title en-text">\${this.escapeHtml(q.question)}</div>
                <div class="options-grid">
                  \${optionsHtml}
                </div>
                \${explanationHtml}
              </div>
            </div>
          \`;
        }).join('');

        // Render Pagination buttons
        let pagButtonsHtml = \`
          <button class="btn btn-outline btn-sm" \${this.currentPage === 1 ? 'disabled' : ''} onclick="App.goToPage(\${this.currentPage - 1})">
            السابق
          </button>
        \`;

        const maxButtons = 5;
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
        if (endPage - startPage < maxButtons - 1) {
          startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let p = startPage; p <= endPage; p++) {
          pagButtonsHtml += \`
            <button class="btn btn-sm \${p === this.currentPage ? 'btn-primary' : 'btn-outline'}" onclick="App.goToPage(\${p})">
              \${p}
            </button>
          \`;
        }

        pagButtonsHtml += \`
          <button class="btn btn-outline btn-sm" \${this.currentPage === totalPages ? 'disabled' : ''} onclick="App.goToPage(\${this.currentPage + 1})">
            التالي
          </button>
        \`;

        paginationButtons.innerHTML = pagButtonsHtml;
      },

      goToPage(p) {
        this.currentPage = p;
        this.renderBank();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      renderHistory() {
        const history = Storage.getHistory();
        const container = document.getElementById('history-container');
        if (history.length === 0) {
          container.innerHTML = \`
            <div class="empty-state">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">📜</div>
              <h3 style="font-weight: 700;">لا توجد اختبارات سابقة</h3>
              <p style="font-size: 0.88rem;">ابدأ أول اختبار لك من خلال تبويب 'محاكاة الاختبار' وستظهر جميع نتائجك هنا.</p>
            </div>
          \`;
          return;
        }

        let html = \`
          <table class="history-table">
            <thead>
              <tr>
                <th>التاريخ والوقت</th>
                <th>الموضوع</th>
                <th>الأسئلة</th>
                <th>النتيجة</th>
                <th>النسبة</th>
                <th>الوقت المستغرق</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
        \`;

        history.slice().reverse().forEach(h => {
          const pass = h.percentage >= 60;
          html += \`
            <tr>
              <td>\${new Date(h.date).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' })}</td>
              <td>\${h.topic}</td>
              <td>\${h.totalQuestions}</td>
              <td style="font-weight: 700;">\${h.score} / \${h.totalQuestions}</td>
              <td style="font-weight: 700; color: \${pass ? 'var(--correct)' : 'var(--wrong)'};">\${h.percentage}%</td>
              <td>\${h.durationFormatted}</td>
              <td>
                <span class="result-badge \${pass ? 'badge-pass' : 'badge-fail'}" style="font-size: 0.78rem; padding: 0.15rem 0.5rem;">
                  \${pass ? 'ناجح' : 'يحتاج مراجعة'}
                </span>
              </td>
            </tr>
          \`;
        });

        html += \`</tbody></table>\`;
        container.innerHTML = html;
      },

      clearHistory() {
        if (confirm('هل أنت متأكد من رغبتك في مسح سجل الاختبارات بالكامل؟')) {
          Storage.saveHistory([]);
          this.renderHistory();
        }
      },

      handleKeyDown(e) {
        // Only active during live exam
        if (this.currentView !== 'exam-live') return;

        // Ignore if user is typing in an input
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

        const key = e.key.toUpperCase();
        // Keyboard support: A, B, C, D or 1, 2, 3, 4 or Arabic layout equivalents
        if (key === '1' || key === 'A' || key === 'ش') {
          Exam.selectAnswer('A');
        } else if (key === '2' || key === 'B' || key === 'لا') {
          Exam.selectAnswer('B');
        } else if (key === '3' || key === 'C' || key === 'ؤ') {
          Exam.selectAnswer('C');
        } else if (key === '4' || key === 'D' || key === 'ي') {
          Exam.selectAnswer('D');
        } else if (key === 'ARROWLEFT') {
          Exam.prevQuestion();
        } else if (key === 'ARROWRIGHT') {
          Exam.nextQuestion();
        } else if (key === 'F' || key === 'ب') {
          Exam.toggleCurrentFlag();
        } else if (key === 'P' || key === 'ح') {
          Exam.togglePaletteModal();
        } else if (key === 'ESCAPE') {
          Exam.closeSubmitPrompt();
          const p = document.getElementById('palette-modal');
          if (p.classList.contains('active')) Exam.togglePaletteModal();
          App.closeKeyboardModal();
        }
      },

      escapeHtml(str) {
        if (!str) return '';
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
    };

    // 4. EXAM SIMULATION ENGINE
    const Exam = {
      // Configuration
      qCount: 30,
      source: 'all', // all | topic | wrong | starred
      selectedTopic: '',
      timerMode: 'auto', // auto | none | custom
      customMinutes: 30,
      feedbackMode: 'real', // real | instant
      shuffleQ: true,
      shuffleOpt: false,

      // Live state
      questions: [],
      currentIndex: 0,
      userAnswers: {}, // index -> letter (or original letter)
      flaggedSet: new Set(),
      timerInterval: null,
      secondsLeft: 0,
      totalSeconds: 0,
      startTime: 0,
      endTime: 0,

      // Results state
      lastResult: null,

      updateSetupCounts() {
        // Update wrong & starred badges in setup screen
        let wrongCount = 0;
        App.questions.forEach(q => {
          const rec = App.studyAnswers[q.id];
          if (rec && rec.selected !== q.answer) wrongCount++;
        });
        document.getElementById('exam-setup-wrong-count').textContent = wrongCount;
        document.getElementById('exam-setup-starred-count').textContent = App.starredIds.size;
      },

      setQuestionCount(val, elem) {
        document.querySelectorAll('#exam-qcount-pills .pill-radio').forEach(p => p.classList.remove('active'));
        if (elem) elem.classList.add('active');

        const customWrapper = document.getElementById('custom-count-wrapper');
        if (val === 'CUSTOM') {
          customWrapper.classList.remove('d-none');
          this.qCount = parseInt(document.getElementById('custom-qcount-input').value) || 30;
        } else if (val === 'ALL') {
          customWrapper.classList.add('d-none');
          this.qCount = 361;
        } else {
          customWrapper.classList.add('d-none');
          this.qCount = parseInt(val) || 30;
        }
      },

      setCustomCount(val) {
        this.qCount = Math.min(361, Math.max(5, parseInt(val) || 30));
      },

      setSource(src, elem) {
        document.querySelectorAll('#exam-source-pills .pill-radio').forEach(p => p.classList.remove('active'));
        if (elem) elem.classList.add('active');
        this.source = src;

        const topicWrapper = document.getElementById('exam-topic-select-wrapper');
        if (src === 'topic') {
          topicWrapper.classList.remove('d-none');
        } else {
          topicWrapper.classList.add('d-none');
        }
      },

      setTimer(mode, elem) {
        document.querySelectorAll('#exam-timer-pills .pill-radio').forEach(p => p.classList.remove('active'));
        if (elem) elem.classList.add('active');
        this.timerMode = mode;

        const customTimerWrapper = document.getElementById('custom-timer-wrapper');
        if (mode === 'custom') {
          customTimerWrapper.classList.remove('d-none');
        } else {
          customTimerWrapper.classList.add('d-none');
        }
      },

      setFeedbackMode(mode, elem) {
        document.querySelectorAll('#exam-mode-pills .pill-radio').forEach(p => p.classList.remove('active'));
        if (elem) elem.classList.add('active');
        this.feedbackMode = mode;
      },

      confirmLeaveExam() {
        if (confirm('هل أنت متأكد من رغبتك في مغادرة الاختبار والعودة لبنك الأسئلة؟ لن يتم حفظ هذه الجلسة غير المسلمة.')) {
          if (this.timerInterval) clearInterval(this.timerInterval);
          App.switchView('bank');
        }
      },

      start(customQuestionsPool = null) {
        let pool = [];

        if (customQuestionsPool && customQuestionsPool.length > 0) {
          pool = [...customQuestionsPool];
        } else {
          if (this.source === 'all') {
            pool = [...App.questions];
          } else if (this.source === 'topic') {
            const topic = document.getElementById('exam-topic-select').value;
            pool = App.questions.filter(q => q.topic === topic);
          } else if (this.source === 'wrong') {
            pool = App.questions.filter(q => {
              const rec = App.studyAnswers[q.id];
              return rec && rec.selected !== q.answer;
            });
            if (pool.length === 0) {
              alert('لا توجد أسئلة مسجلة في بنك الأخطاء حالياً. يمكنك الإجابة على الأسئلة في بنك الأسئلة أولاً.');
              return;
            }
          } else if (this.source === 'starred') {
            pool = App.questions.filter(q => App.starredIds.has(q.id));
            if (pool.length === 0) {
              alert('لم تقم بتمييز أي سؤال بنجمة حتى الآن.');
              return;
            }
          }
        }

        if (pool.length === 0) {
          alert('لا توجد أسئلة متاحة في هذا النطاق.');
          return;
        }

        // Shuffle questions if chosen
        const doShuffle = document.getElementById('chk-shuffle-q').checked;
        if (doShuffle) {
          pool = this.shuffleArray(pool);
        }

        // Option shuffle logic
        const doShuffleOpt = document.getElementById('chk-shuffle-opt').checked;

        // Slice to requested count
        const targetCount = Math.min(pool.length, this.qCount);
        this.questions = pool.slice(0, targetCount).map(rawQ => {
          const q = { ...rawQ, options: { ...rawQ.options } };

          if (doShuffleOpt) {
            // Check if options contain relative terms like "all of the above" or "none of the above"
            const optValues = Object.values(q.options).join(' ').toLowerCase();
            const hasRelativeTerms = /above|below|both\s+[a-d]|all of the/i.test(optValues);
            if (!hasRelativeTerms) {
              // Safe to shuffle options
              const entries = Object.entries(q.options);
              const shuffledEntries = this.shuffleArray(entries);
              const letters = ['A', 'B', 'C', 'D'];
              const newOptions = {};
              let newAnswer = q.answer;

              letters.forEach((l, idx) => {
                const [origLetter, text] = shuffledEntries[idx];
                newOptions[l] = text;
                if (origLetter === q.answer) {
                  newAnswer = l;
                }
              });

              q.options = newOptions;
              q.answer = newAnswer;
            }
          }

          return q;
        });

        // Initialize exam live state
        this.currentIndex = 0;
        this.userAnswers = {};
        this.flaggedSet = new Set();
        this.startTime = Date.now();

        // Calculate Timer
        if (this.timerMode === 'none') {
          this.secondsLeft = 0;
          this.totalSeconds = 0;
        } else if (this.timerMode === 'custom') {
          const mins = parseInt(document.getElementById('custom-timer-input').value) || 30;
          this.secondsLeft = mins * 60;
          this.totalSeconds = mins * 60;
        } else {
          // Auto: 1 min per question
          this.secondsLeft = this.questions.length * 60;
          this.totalSeconds = this.questions.length * 60;
        }

        this.startTimer();
        App.switchView('exam-live');
        this.renderCurrentQuestion();
        this.updateHeaderProgress();
      },

      startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        const timerBadge = document.getElementById('live-timer-badge');
        const timerText = document.getElementById('live-timer-text');

        if (this.timerMode === 'none') {
          timerBadge.style.display = 'none';
          return;
        }

        timerBadge.style.display = 'inline-flex';
        timerBadge.classList.remove('warning');

        const updateDisplay = () => {
          const mins = Math.floor(this.secondsLeft / 60);
          const secs = this.secondsLeft % 60;
          timerText.textContent = 
            (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

          if (this.secondsLeft <= 120) {
            timerBadge.classList.add('warning');
          } else {
            timerBadge.classList.remove('warning');
          }
        };

        updateDisplay();

        this.timerInterval = setInterval(() => {
          this.secondsLeft--;
          if (this.secondsLeft <= 0) {
            clearInterval(this.timerInterval);
            this.secondsLeft = 0;
            updateDisplay();
            alert('⏰ انتهى الوقت المحدد للاختبار! سيتم تسليم إجاباتك الآن.');
            this.submitExamNow();
          } else {
            updateDisplay();
          }
        }, 1000);
      },

      renderCurrentQuestion() {
        const q = this.questions[this.currentIndex];
        const card = document.getElementById('live-question-card');
        const isFlagged = this.flaggedSet.has(this.currentIndex);
        const userChoice = this.userAnswers[this.currentIndex] || null;
        const isInstant = this.feedbackMode === 'instant';

        const flagBtn = document.getElementById('btn-exam-flag');
        if (isFlagged) {
          flagBtn.innerHTML = '★ تم التمييز';
          flagBtn.style.color = 'var(--flagged)';
          flagBtn.style.borderColor = 'var(--flagged-border)';
        } else {
          flagBtn.innerHTML = '☆ تمييز للمراجعة';
          flagBtn.style.color = 'inherit';
          flagBtn.style.borderColor = 'var(--border)';
        }

        const optionsHtml = Object.entries(q.options).map(([letter, text]) => {
          let extraClass = '';
          if (isInstant && userChoice) {
            if (letter === q.answer) extraClass = 'is-correct';
            else if (letter === userChoice) extraClass = 'is-wrong';
          } else if (userChoice === letter) {
            extraClass = 'user-selected';
          }

          return \`
            <button 
              type="button" 
              class="opt-btn en-text \${extraClass}"
              onclick="Exam.selectAnswer('\${letter}')"
            >
              <span class="opt-letter">\${letter}</span>
              <span class="opt-text">\${App.escapeHtml(text)}</span>
            </button>
          \`;
        }).join('');

        let instantFeedbackHtml = '';
        if (isInstant && userChoice) {
          const isCorrect = userChoice === q.answer;
          instantFeedbackHtml = \`
            <div class="q-explanation" style="\${isCorrect ? '' : 'background: var(--wrong-bg); border-color: var(--wrong-border);'}">
              <span>\${isCorrect ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة!'}</span>
              <strong>الإجابة النموذجية هي (\${q.answer}):</strong>
              <span class="en-text">\${App.escapeHtml(q.options[q.answer])}</span>
            </div>
          \`;
        }

        card.innerHTML = \`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="q-badge" style="font-size: 0.9rem; padding: 0.25rem 0.65rem;">السؤال \${this.currentIndex + 1}</span>
              <span class="topic-tag">\${q.topic}</span>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">[ID: Q\${q.id}]</span>
          </div>

          <div class="q-title en-text" style="font-size: 1.15rem; margin-bottom: 1.5rem;">
            \${App.escapeHtml(q.question)}
          </div>

          <div class="options-grid">
            \${optionsHtml}
          </div>

          \${instantFeedbackHtml}
        \`;

        // Update nav buttons disabled state
        document.getElementById('btn-exam-prev').disabled = (this.currentIndex === 0);
        document.getElementById('btn-exam-next').disabled = (this.currentIndex === this.questions.length - 1);

        this.updateHeaderProgress();
      },

      selectAnswer(letter) {
        this.userAnswers[this.currentIndex] = letter;

        // Also record in study answers so user builds mistakes bank & study stats seamlessly!
        const q = this.questions[this.currentIndex];
        App.studyAnswers[q.id] = {
          selected: letter,
          isCorrect: letter === q.answer,
          timestamp: Date.now()
        };
        Storage.saveStudyProgress(App.studyAnswers);

        this.renderCurrentQuestion();
      },

      clearCurrentAnswer() {
        delete this.userAnswers[this.currentIndex];
        this.renderCurrentQuestion();
      },

      toggleCurrentFlag() {
        if (this.flaggedSet.has(this.currentIndex)) {
          this.flaggedSet.delete(this.currentIndex);
        } else {
          this.flaggedSet.add(this.currentIndex);
        }
        this.renderCurrentQuestion();
      },

      prevQuestion() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.renderCurrentQuestion();
          window.scrollTo({ top: 120, behavior: 'smooth' });
        }
      },

      nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
          this.renderCurrentQuestion();
          window.scrollTo({ top: 120, behavior: 'smooth' });
        }
      },

      jumpToQuestion(idx) {
        this.currentIndex = idx;
        this.renderCurrentQuestion();
        this.togglePaletteModal(false);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      },

      updateHeaderProgress() {
        const total = this.questions.length;
        const answeredCount = Object.keys(this.userAnswers).length;
        const currentNum = this.currentIndex + 1;

        document.getElementById('live-q-counter').textContent = \`السؤال \${currentNum} من \${total}\`;
        document.getElementById('live-answered-ratio').textContent = \`(أجبت على \${answeredCount})\`;

        const pct = Math.round((answeredCount / total) * 100);
        document.getElementById('live-progress-fill').style.width = pct + '%';
      },

      togglePaletteModal(force) {
        const modal = document.getElementById('palette-modal');
        const isActive = force !== undefined ? force : !modal.classList.contains('active');
        if (isActive) {
          this.renderPaletteGrid();
          modal.classList.add('active');
        } else {
          modal.classList.remove('active');
        }
      },

      renderPaletteGrid() {
        const grid = document.getElementById('palette-grid');
        grid.innerHTML = this.questions.map((q, idx) => {
          const isAnswered = this.userAnswers.hasOwnProperty(idx);
          const isFlagged = this.flaggedSet.has(idx);
          const isCurrent = idx === this.currentIndex;

          let classes = ['palette-btn'];
          if (isCurrent) classes.push('current');
          if (isFlagged) classes.push('flagged');
          else if (isAnswered) classes.push('answered');

          return \`
            <button 
              type="button" 
              class="\${classes.join(' ')}" 
              onclick="Exam.jumpToQuestion(\${idx})"
            >
              \${idx + 1}
            </button>
          \`;
        }).join('');
      },

      promptSubmitExam() {
        const total = this.questions.length;
        const answered = Object.keys(this.userAnswers).length;
        const unanswered = total - answered;
        const flagged = this.flaggedSet.size;

        const body = document.getElementById('submit-confirm-body');
        body.innerHTML = \`
          <p style="font-size: 1rem; margin-bottom: 1rem;">هل أنت متأكد من رغبتك في تسليم الاختبار وإنهاء المحاكاة؟</p>
          <div style="background: var(--surface-subtle); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border); font-size: 0.92rem; line-height: 1.8;">
            <div>&bull; إجمالي الأسئلة: <strong>\${total}</strong></div>
            <div>&bull; الأسئلة المجابة: <strong style="color: var(--correct);">\${answered}</strong></div>
            <div>&bull; الأسئلة المتبقية دون إجابة: <strong style="\${unanswered > 0 ? 'color: var(--wrong);' : ''}">\${unanswered}</strong></div>
            <div>&bull; الأسئلة المميزة للمراجعة: <strong style="color: var(--flagged);">\${flagged}</strong></div>
          </div>
          \${unanswered > 0 ? '<p style="color: var(--wrong); margin-top: 0.85rem; font-size: 0.85rem;">⚠️ تنبيه: لديك أسئلة لم تُجب عليها، سيتم احتسابها خاطئة في حال التسليم الآن.</p>' : ''}
        \`;

        document.getElementById('submit-confirm-modal').classList.add('active');
      },

      closeSubmitPrompt() {
        document.getElementById('submit-confirm-modal').classList.remove('active');
      },

      submitExamNow() {
        this.closeSubmitPrompt();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.endTime = Date.now();

        // Calculate score
        let correctCount = 0;
        let wrongCount = 0;
        let unansweredCount = 0;
        const topicStats = {};

        this.questions.forEach((q, idx) => {
          const userAns = this.userAnswers[idx];
          if (!topicStats[q.topic]) {
            topicStats[q.topic] = { total: 0, correct: 0 };
          }
          topicStats[q.topic].total++;

          if (!userAns) {
            unansweredCount++;
          } else if (userAns === q.answer) {
            correctCount++;
            topicStats[q.topic].correct++;
          } else {
            wrongCount++;
          }
        });

        const total = this.questions.length;
        const percentage = Math.round((correctCount / total) * 100);
        const durationSecs = Math.round((this.endTime - this.startTime) / 1000);
        const durationFormatted = this.formatSeconds(durationSecs);

        const examResult = {
          date: Date.now(),
          score: correctCount,
          totalQuestions: total,
          percentage: percentage,
          durationSecs: durationSecs,
          durationFormatted: durationFormatted,
          topic: this.source === 'topic' ? document.getElementById('exam-topic-select').value : 'شامل',
          questions: this.questions,
          userAnswers: this.userAnswers,
          flaggedSet: Array.from(this.flaggedSet),
          topicStats: topicStats
        };

        this.lastResult = examResult;

        // Save to History
        const history = Storage.getHistory();
        history.push({
          date: examResult.date,
          score: examResult.score,
          totalQuestions: examResult.totalQuestions,
          percentage: examResult.percentage,
          durationFormatted: examResult.durationFormatted,
          topic: examResult.topic
        });
        Storage.saveHistory(history);

        // Render Results view
        this.renderResultsScreen(examResult);
        App.switchView('exam-result');
      },

      renderResultsScreen(res) {
        // Percentage circle
        document.getElementById('result-percentage').textContent = res.percentage + '%';
        document.getElementById('result-score-ratio').textContent = \`\${res.score} من \${res.totalQuestions}\`;

        // Pass/Fail badge & Headline
        const badgeElem = document.getElementById('result-status-badge');
        const headlineElem = document.getElementById('result-headline');
        const subtextElem = document.getElementById('result-subtext');

        if (res.percentage >= 90) {
          badgeElem.className = 'result-badge badge-pass';
          badgeElem.textContent = '🌟 ممتاز ومبدع';
          headlineElem.textContent = 'أداء استثنائي رائع!';
          subtextElem.textContent = 'أظهرت فهماً عميقاً ومتميزاً لمفاهيم أمن المعلومات.';
        } else if (res.percentage >= 75) {
          badgeElem.className = 'result-badge badge-pass';
          badgeElem.textContent = '✅ جيد جداً';
          headlineElem.textContent = 'أداء رائع وناجح!';
          subtextElem.textContent = 'أنت جاهز بنسبة عالية للاختبار النهائي، تفقد الملاحظات أدناه.';
        } else if (res.percentage >= 60) {
          badgeElem.className = 'result-badge badge-pass';
          badgeElem.textContent = '👍 ناجح';
          headlineElem.textContent = 'اجتزت الاختبار بنجاح';
          subtextElem.textContent = 'أداء جيد، ننصحك بمراجعة الأخطاء لتعزيز درجتك.';
        } else {
          badgeElem.className = 'result-badge badge-fail';
          badgeElem.textContent = '⚠️ يحتاج إلى تعزيز ومراجعة';
          headlineElem.textContent = 'لم يتم اجتياز الاختبار';
          subtextElem.textContent = 'لا تقلق، أعد مراجعة المفاهيم واختبر أخطاءك لترسيخ الإجابات الصحيحة.';
        }

        // Meta numbers
        document.getElementById('result-time-taken').textContent = res.durationFormatted;
        document.getElementById('result-correct-count').textContent = res.score;
        document.getElementById('result-wrong-count').textContent = (res.totalQuestions - res.score);
        const unanswered = res.totalQuestions - Object.keys(res.userAnswers).length;
        document.getElementById('result-unanswered-count').textContent = unanswered;

        // Toggle retest errors button visibility
        const retestBtn = document.getElementById('btn-retest-errors');
        const hasErrors = (res.totalQuestions - res.score) > 0;
        if (hasErrors) {
          retestBtn.style.display = 'inline-flex';
        } else {
          retestBtn.style.display = 'none';
        }

        // Topic breakdown bars
        const topicBarsContainer = document.getElementById('result-topic-bars');
        topicBarsContainer.innerHTML = Object.entries(res.topicStats).map(([topic, data]) => {
          const pct = Math.round((data.correct / data.total) * 100);
          return \`
            <div class="topic-bar-row">
              <div class="topic-bar-header">
                <span>\${topic}</span>
                <span style="font-weight: 700; color: \${pct >= 60 ? 'var(--correct)' : 'var(--wrong)'};">\${data.correct} / \${data.total} (\${pct}%)</span>
              </div>
              <div class="topic-bar-bg">
                <div class="topic-bar-fill" style="width: \${pct}%; background: \${pct >= 60 ? 'var(--correct)' : 'var(--wrong)'};"></div>
              </div>
            </div>
          \`;
        }).join('');

        // Render detailed questions review
        this.filterReview('all');
      },

      filterReview(filterType, btn) {
        if (!this.lastResult) return;
        const res = this.lastResult;
        const container = document.getElementById('exam-review-list');

        if (btn) {
          document.querySelectorAll('#view-exam-result .filter-chip').forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
        }

        const filtered = res.questions.map((q, idx) => {
          return { q, idx, userAns: res.userAnswers[idx] || null, isFlagged: res.flaggedSet.includes(idx) };
        }).filter(item => {
          const isCorrect = item.userAns === item.q.answer;
          if (filterType === 'wrong' && isCorrect) return false;
          if (filterType === 'flagged' && !item.isFlagged) return false;
          return true;
        });

        if (filtered.length === 0) {
          container.innerHTML = \`
            <div class="empty-state">
              <p>لا توجد أسئلة تطابق هذا الفلتر.</p>
            </div>
          \`;
          return;
        }

        container.innerHTML = filtered.map(item => {
          const { q, idx, userAns, isFlagged } = item;
          const isCorrect = userAns === q.answer;

          const optionsHtml = Object.entries(q.options).map(([letter, text]) => {
            let extraClass = '';
            if (letter === q.answer) {
              extraClass = 'is-correct';
            } else if (userAns === letter) {
              extraClass = 'is-wrong';
            }

            return \`
              <div class="opt-btn en-text \${extraClass}" style="cursor: default;">
                <span class="opt-letter">\${letter}</span>
                <span class="opt-text">\${App.escapeHtml(text)}</span>
              </div>
            \`;
          }).join('');

          const statusBadge = isCorrect
            ? '<span style="color: var(--correct); font-weight: 700;">✅ إجابة صحيحة</span>'
            : \`<span style="color: var(--wrong); font-weight: 700;">❌ إجابة خاطئة (اخترت \${userAns || 'بدون إجابة'})</span>\`;

          return \`
            <div class="q-card">
              <div class="q-card-header">
                <div class="q-meta">
                  <span class="q-badge">السؤال \${idx + 1} (Q\${q.id})</span>
                  <span class="topic-tag">\${q.topic}</span>
                  \${isFlagged ? '<span style="color: var(--flagged); font-size: 0.8rem; font-weight: 700;">★ مميز</span>' : ''}
                </div>
                <div>\${statusBadge}</div>
              </div>
              <div class="q-card-body">
                <div class="q-title en-text">\${App.escapeHtml(q.question)}</div>
                <div class="options-grid">
                  \${optionsHtml}
                </div>
                <div class="q-explanation">
                  <strong>الإجابة المعتمدة هي (\${q.answer}):</strong>
                  <span class="en-text">\${App.escapeHtml(q.options[q.answer])}</span>
                </div>
              </div>
            </div>
          \`;
        }).join('');
      },

      retestErrorsOnly() {
        if (!this.lastResult) return;
        const res = this.lastResult;
        const mistakes = res.questions.filter((q, idx) => {
          return res.userAnswers[idx] !== q.answer;
        });

        if (mistakes.length === 0) {
          alert('تهانينا! ليس لديك أي أخطاء لإعادة اختبارها.');
          return;
        }

        // Start exam with just these mistaken questions
        this.start(mistakes);
      },

      shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      },

      formatSeconds(s) {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return mins + ' دقيقة و ' + (secs < 10 ? '0' : '') + secs + ' ثانية';
      }
    };

    // Initialize application on page load
    window.addEventListener('DOMContentLoaded', () => {
      App.init();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('Successfully updated index.html with all enhanced features!');
const stats = fs.statSync(path.join(__dirname, 'index.html'));
console.log('Updated file size:', (stats.size / 1024).toFixed(2), 'KB');
