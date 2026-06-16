/* =============================================
   Navi — Automate305 AI Chat Widget

   MODES:
   1. Simulated (default) — keyword-matched local responses
   2. Live AI — replace getNaviResponse() with a fetch() call
      to your backend endpoint (see comment below)

   TO CONNECT TO CLAUDE API: Replace getNaviResponse() with a fetch() call to your backend endpoint
   Example backend endpoint: POST /api/navi  { message: string } → { reply: string }
   ============================================= */

(function () {
  'use strict';

  /* =============================================
     System Prompt — used when connecting to real AI backend
     ============================================= */
  const NAVI_SYSTEM_PROMPT = `You are Navi, Automate305's AI rep. You help Miami SMB owners (especially HVAC companies) understand how AI automation can recover $3k-6k/month in lost revenue. Be friendly, direct, and helpful. Ask qualifying questions. Never make up specific client names. If asked for pricing, say "Camilo puts together custom quotes — book a free 30-min audit at cal.com/automate305/30min". You're bilingual (English/Spanish). Keep responses under 3 sentences. If the user seems ready to book, push them to cal.com/automate305/30min.`;

  /* =============================================
     Keyword Response Map
     ============================================= */
  var RESPONSES = [
    {
      keywords: ['hvac', 'ac', 'air conditioning', 'heating', 'cooling', 'heat pump'],
      reply: "Perfect — HVAC is our primary focus. Most of our clients recover $3k-6k/month in missed calls and slow follow-up. Want me to show you how it works, or book a free audit with Camilo?"
    },
    {
      keywords: ['price', 'cost', 'how much', 'pricing', 'fee', 'charge', 'expensive', 'affordable'],
      reply: "Camilo builds custom quotes based on your workflow. The audit is free — book at cal.com/automate305/30min"
    },
    {
      keywords: ['book', 'call', 'schedule', 'meeting', 'appointment', 'audit', 'talk', 'chat', 'camilo'],
      reply: "Great! Book directly at cal.com/automate305/30min — Camilo will map out your current workflow and show you what's being missed."
    },
    {
      keywords: ['spanish', 'hablo', 'español', 'hablas', 'espanol', 'en español'],
      reply: "¡Claro que sí! Estamos aquí para ayudarte. ¿Qué tipo de negocio tienes?"
    }
  ];

  var DEFAULT_REPLY = "That's great! Automate305 helps Miami SMBs automate lead follow-up, scheduling, and dispatch. Want to see how it works for your business?";

  var GREETING = "Hey, I'm Navi — Automate305's AI rep. What kind of business do you run?";

  /* =============================================
     Keyword Response Matching
     TO CONNECT TO CLAUDE API: Replace this function with a
     fetch() call to your backend endpoint:

     async function getNaviResponse(userMessage) {
       const res = await fetch('/api/navi', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ message: userMessage, systemPrompt: NAVI_SYSTEM_PROMPT })
       });
       const data = await res.json();
       return data.reply;
     }
     ============================================= */
  function getNaviResponse(userMessage) {
    var lower = userMessage.toLowerCase();

    for (var i = 0; i < RESPONSES.length; i++) {
      var entry = RESPONSES[i];
      for (var j = 0; j < entry.keywords.length; j++) {
        if (lower.indexOf(entry.keywords[j]) !== -1) {
          return entry.reply;
        }
      }
    }

    return DEFAULT_REPLY;
  }

  /* =============================================
     Inject Widget HTML and CSS into the page
     ============================================= */
  function injectStyles() {
    // Styles are in css/styles.css — section 11
    // This function is a no-op unless you need runtime overrides
  }

  function injectHTML() {
    var widgetHTML = [
      '<div id="navi-widget">',
      '  <div class="navi-window navi-hidden" id="navi-window" role="dialog" aria-label="Navi chat window" aria-modal="true">',
      '    <div class="navi-header">',
      '      <div class="navi-header-title">',
      '        <span>⚡</span>',
      '        <span>Navi — Automate305 AI</span>',
      '      </div>',
      '      <button class="navi-header-close" id="navi-close" aria-label="Close chat">&#x2715;</button>',
      '    </div>',
      '    <div class="navi-messages" id="navi-messages" role="log" aria-live="polite"></div>',
      '    <div class="navi-input-area">',
      '      <input',
      '        class="navi-input"',
      '        id="navi-input"',
      '        type="text"',
      '        placeholder="Type a message..."',
      '        autocomplete="off"',
      '        aria-label="Message input"',
      '      />',
      '      <button class="navi-send-btn" id="navi-send" aria-label="Send message">&#10148;</button>',
      '    </div>',
      '  </div>',
      '  <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">',
      '    <button class="navi-toggle-btn" id="navi-toggle" aria-label="Open Navi chat" aria-expanded="false">⚡</button>',
      '    <span class="navi-toggle-label">Navi</span>',
      '  </div>',
      '</div>'
    ].join('\n');

    var container = document.createElement('div');
    container.innerHTML = widgetHTML;
    document.body.appendChild(container.firstElementChild);
  }

  /* =============================================
     Message Rendering
     ============================================= */
  function appendMessage(text, sender) {
    var messagesEl = document.getElementById('navi-messages');
    if (!messagesEl) return;

    var msg = document.createElement('div');
    msg.className = 'navi-msg ' + sender;
    msg.textContent = text;
    messagesEl.appendChild(msg);

    // Auto-scroll to bottom
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTypingIndicator() {
    var messagesEl = document.getElementById('navi-messages');
    if (!messagesEl) return null;

    var indicator = document.createElement('div');
    indicator.className = 'navi-msg bot';
    indicator.id = 'navi-typing';
    indicator.textContent = '...';
    indicator.style.opacity = '0.6';
    messagesEl.appendChild(indicator);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator() {
    var el = document.getElementById('navi-typing');
    if (el) el.remove();
  }

  /* =============================================
     Send Message Flow
     ============================================= */
  function sendMessage(text) {
    if (!text || !text.trim()) return;

    text = text.trim();
    appendMessage(text, 'user');

    var inputEl = document.getElementById('navi-input');
    if (inputEl) inputEl.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate response delay (300–900ms)
    var delay = Math.random() * 600 + 300;
    setTimeout(function () {
      removeTypingIndicator();
      var reply = getNaviResponse(text);
      appendMessage(reply, 'bot');
    }, delay);
  }

  /* =============================================
     Open / Close Widget
     ============================================= */
  function openWidget() {
    var window_ = document.getElementById('navi-window');
    var toggleBtn = document.getElementById('navi-toggle');
    if (!window_) return;

    window_.classList.remove('navi-hidden');

    // Re-trigger animation
    window_.style.animation = 'none';
    window_.offsetHeight; // Force reflow
    window_.style.animation = '';

    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');

    // Focus input
    var input = document.getElementById('navi-input');
    if (input) setTimeout(function () { input.focus(); }, 100);
  }

  function closeWidget() {
    var window_ = document.getElementById('navi-window');
    var toggleBtn = document.getElementById('navi-toggle');
    if (!window_) return;

    window_.classList.add('navi-hidden');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  }

  /* =============================================
     Event Listeners
     ============================================= */
  function bindEvents() {
    var toggleBtn = document.getElementById('navi-toggle');
    var closeBtn = document.getElementById('navi-close');
    var sendBtn = document.getElementById('navi-send');
    var inputEl = document.getElementById('navi-input');
    var window_ = document.getElementById('navi-window');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (window_ && window_.classList.contains('navi-hidden')) {
          openWidget();
        } else {
          closeWidget();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeWidget);
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        var inputEl = document.getElementById('navi-input');
        if (inputEl) sendMessage(inputEl.value);
      });
    }

    if (inputEl) {
      inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(inputEl.value);
        }
      });
    }

    // Escape key closes widget
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeWidget();
      }
    });
  }

  /* =============================================
     Init
     ============================================= */
  function init() {
    injectStyles();
    injectHTML();
    bindEvents();

    // Show greeting after a brief delay
    setTimeout(function () {
      appendMessage(GREETING, 'bot');
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
