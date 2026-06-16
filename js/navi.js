/* =============================================
   Navi — Automate305 AI Chat Widget

   MODES:
   1. Simulated (default) — keyword-matched local responses
   2. Claude API — set NAVI_USE_API = true and provide your API key
      via a backend proxy (never expose API keys in frontend JS!)

   To connect to Claude API:
   1. Create a backend endpoint (e.g. /api/chat) that proxies to Anthropic
   2. Set NAVI_API_ENDPOINT to your endpoint URL
   3. Set NAVI_USE_API = true
   ============================================= */

const NAVI_USE_API = false;
const NAVI_API_ENDPOINT = '/api/chat'; // Your backend proxy endpoint

// Navi system prompt — used when API mode is enabled
const NAVI_SYSTEM_PROMPT = `You are Navi, Automate305's AI rep. You help Miami SMB owners (especially HVAC companies) understand how AI automation can recover $3k-6k/month in lost revenue. Be friendly, direct, and helpful. Ask qualifying questions. Never make up specific client names or invent statistics beyond what you know. If asked for pricing, say "Camilo puts together custom quotes — book a free 30-min audit at cal.com/automate305/30min". You're bilingual (English/Spanish) — match the user's language. Keep responses under 3 sentences. If the user seems ready to book, push them to cal.com/automate305/30min. The founder is Camilo, who has a background as a licensed mold assessor with field experience in restoration. He now builds AI systems for Miami SMBs.`;

// Simulated responses (keyword matching for demo mode)
const NAVI_SIMULATED_RESPONSES = [
  {
    keywords: ['hvac', 'ac', 'air conditioning', 'cooling', 'heating', 'heat pump'],
    response: "Perfect — HVAC is our primary focus. Most of our clients recover $3k–6k/month in missed calls and slow follow-up. Want me to show you how it works, or book a free audit with Camilo?"
  },
  {
    keywords: ['roofing', 'roof', 'plumbing', 'plumber', 'electrical', 'electrician', 'restoration', 'mold'],
    response: "We're expanding to your industry soon! Automate305 is built for Miami SMBs like yours. Book a free call with Camilo — he'll tell you exactly what's possible for your business."
  },
  {
    keywords: ['price', 'cost', 'how much', 'pricing', 'fee', 'charge', 'rates', 'cuanto'],
    response: "Camilo builds custom quotes based on your workflow size and what you're losing today. The audit is completely free — book at cal.com/automate305/30min and he'll scope it out."
  },
  {
    keywords: ['book', 'call', 'schedule', 'meet', 'meeting', 'calendar', 'appointment', 'reservar'],
    response: "Book directly at cal.com/automate305/30min — Camilo will map out your current workflow and show exactly what's being missed. Takes 30 minutes."
  },
  {
    keywords: ['spanish', 'hablo', 'español', 'hablas', 'en español'],
    response: "¡Claro que sí! Estamos aquí para ayudarte. Automate305 trabaja con negocios en Miami-Dade, Broward y Palm Beach. ¿Qué tipo de negocio tienes?"
  },
  {
    keywords: ['missed call', 'after hours', 'calls', 'voicemail', 'phone'],
    response: "After-hours missed calls are the #1 revenue leak for HVAC companies. Navi (that's me!) can answer calls 24/7 and book appointments automatically. Want to see how?"
  },
  {
    keywords: ['follow up', 'follow-up', 'leads', 'estimates', 'quotes'],
    response: "Slow follow-up is where most HVAC companies lose $1k–3k/month. We automate email + SMS sequences so no lead goes cold. Book a free audit to see your exact numbers."
  },
  {
    keywords: ['camilo', 'founder', 'who', 'about'],
    response: "Camilo is the founder — licensed mold assessor, field experience in restoration, now building AI systems for Miami SMBs. He does every audit personally. Book at cal.com/automate305/30min."
  },
  {
    keywords: ['hello', 'hi', 'hey', 'hola', 'sup', 'what up'],
    response: "Hey! I'm Navi — Automate305's AI rep. We help Miami HVAC companies (and other SMBs) recover $3k–6k/month in lost revenue through AI automation. What kind of business do you run?"
  }
];

const NAVI_DEFAULT_RESPONSE = "That's great context! Automate305 helps Miami SMBs automate lead follow-up, scheduling, and dispatch. Want to see how it could work for your business? Or book a free audit at cal.com/automate305/30min.";

// ---- Widget Init ----

(function () {
  injectNaviStyles();
  buildNaviWidget();
})();

function injectNaviStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #navi-launcher {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      font-family: 'Inter', system-ui, sans-serif;
    }

    #navi-bubble {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #6D28D9;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 8px 24px rgba(109,40,217,0.5);
      transition: background 0.2s ease, transform 0.2s ease;
      color: white;
      position: relative;
    }

    #navi-bubble:hover {
      background: #8B5CF6;
      transform: scale(1.05);
    }

    #navi-bubble-label {
      position: absolute;
      right: 68px;
      top: 50%;
      transform: translateY(-50%);
      background: #1A1A24;
      color: #F5F5F5;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 20px;
      white-space: nowrap;
      border: 1px solid #2A2A35;
      pointer-events: none;
      opacity: 1;
      transition: opacity 0.2s;
    }

    #navi-bubble:hover #navi-bubble-label {
      opacity: 0;
    }

    #navi-window {
      display: none;
      flex-direction: column;
      width: 340px;
      height: 480px;
      background: #0A0A0F;
      border: 1px solid #2A2A35;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      animation: naviSlideUp 0.25s ease;
    }

    #navi-window.open {
      display: flex;
    }

    @keyframes naviSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    #navi-header {
      background: #6D28D9;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    #navi-header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #navi-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }

    #navi-header-text h4 {
      font-size: 0.875rem;
      font-weight: 700;
      color: white;
      margin: 0;
    }

    #navi-header-text p {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.75);
      margin: 0;
    }

    #navi-close {
      background: none;
      border: none;
      color: rgba(255,255,255,0.8);
      cursor: pointer;
      font-size: 1.2rem;
      padding: 4px;
      line-height: 1;
      transition: color 0.2s;
    }

    #navi-close:hover { color: white; }

    #navi-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    #navi-messages::-webkit-scrollbar { width: 4px; }
    #navi-messages::-webkit-scrollbar-track { background: transparent; }
    #navi-messages::-webkit-scrollbar-thumb { background: #2A2A35; border-radius: 2px; }

    .navi-msg {
      display: flex;
      flex-direction: column;
      max-width: 85%;
    }

    .navi-msg.navi { align-self: flex-start; }
    .navi-msg.user { align-self: flex-end; }

    .navi-msg-bubble {
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.85rem;
      line-height: 1.5;
    }

    .navi-msg.navi .navi-msg-bubble {
      background: #1A1A24;
      color: #F5F5F5;
      border: 1px solid #2A2A35;
    }

    .navi-msg.user .navi-msg-bubble {
      background: #6D28D9;
      color: white;
    }

    .navi-msg-bubble a {
      color: #8B5CF6;
    }

    .navi-typing {
      display: flex;
      gap: 4px;
      padding: 12px 14px;
      background: #1A1A24;
      border: 1px solid #2A2A35;
      border-radius: 12px;
      width: fit-content;
    }

    .navi-typing span {
      width: 6px;
      height: 6px;
      background: #6D28D9;
      border-radius: 50%;
      animation: naviTyping 1.2s infinite;
    }

    .navi-typing span:nth-child(2) { animation-delay: 0.2s; }
    .navi-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes naviTyping {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-4px); opacity: 1; }
    }

    #navi-input-area {
      padding: 12px 16px;
      border-top: 1px solid #2A2A35;
      display: flex;
      gap: 8px;
    }

    #navi-input {
      flex: 1;
      background: #1A1A24;
      border: 1px solid #2A2A35;
      border-radius: 8px;
      padding: 10px 14px;
      color: #F5F5F5;
      font-size: 0.85rem;
      font-family: 'Inter', system-ui, sans-serif;
      outline: none;
      transition: border-color 0.2s;
    }

    #navi-input:focus { border-color: #6D28D9; }
    #navi-input::placeholder { color: #555; }

    #navi-send {
      background: #6D28D9;
      border: none;
      border-radius: 8px;
      padding: 0 14px;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s;
    }

    #navi-send:hover { background: #8B5CF6; }

    @media (max-width: 480px) {
      #navi-launcher {
        bottom: 16px;
        right: 16px;
      }
      #navi-window {
        width: calc(100vw - 32px);
        height: 420px;
      }
    }
  `;
  document.head.appendChild(style);
}

function buildNaviWidget() {
  const launcher = document.createElement('div');
  launcher.id = 'navi-launcher';
  launcher.innerHTML = `
    <div id="navi-window">
      <div id="navi-header">
        <div id="navi-header-info">
          <div id="navi-avatar">⚡</div>
          <div id="navi-header-text">
            <h4>Navi</h4>
            <p>Miami's AI Rep · Automate305</p>
          </div>
        </div>
        <button id="navi-close" aria-label="Close chat">✕</button>
      </div>
      <div id="navi-messages"></div>
      <div id="navi-input-area">
        <input id="navi-input" type="text" placeholder="Ask me anything..." autocomplete="off" />
        <button id="navi-send" aria-label="Send">↑</button>
      </div>
    </div>
    <button id="navi-bubble" aria-label="Chat with Navi">
      ⚡
      <span id="navi-bubble-label">Navi — Miami's AI Rep</span>
    </button>
  `;
  document.body.appendChild(launcher);

  const win = document.getElementById('navi-window');
  const bubble = document.getElementById('navi-bubble');
  const closeBtn = document.getElementById('navi-close');
  const input = document.getElementById('navi-input');
  const sendBtn = document.getElementById('navi-send');
  const messages = document.getElementById('navi-messages');

  // Open/close
  bubble.addEventListener('click', () => {
    win.classList.toggle('open');
    if (win.classList.contains('open')) {
      if (messages.children.length === 0) {
        appendNaviMessage('navi', "Hey, I'm Navi — Automate305's AI rep. What kind of business do you run?");
      }
      setTimeout(() => input.focus(), 100);
    }
  });

  closeBtn.addEventListener('click', () => win.classList.remove('open'));

  // Send
  const send = () => {
    const text = input.value.trim();
    if (!text) return;
    appendNaviMessage('user', text);
    input.value = '';

    if (NAVI_USE_API) {
      sendToAPI(text);
    } else {
      showTyping();
      setTimeout(() => {
        removeTyping();
        const reply = getSimulatedResponse(text);
        appendNaviMessage('navi', reply);
      }, 900 + Math.random() * 600);
    }
  };

  sendBtn.addEventListener('click', send);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });
}

function appendNaviMessage(role, text) {
  const messages = document.getElementById('navi-messages');
  const msg = document.createElement('div');
  msg.className = `navi-msg ${role}`;

  // Linkify cal.com URLs
  const linkedText = text.replace(
    /cal\.com\/automate305\/30min/g,
    '<a href="https://cal.com/automate305/30min" target="_blank">cal.com/automate305/30min</a>'
  );

  msg.innerHTML = `<div class="navi-msg-bubble">${linkedText}</div>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('navi-messages');
  const typing = document.createElement('div');
  typing.className = 'navi-msg navi';
  typing.id = 'navi-typing-indicator';
  typing.innerHTML = `<div class="navi-typing"><span></span><span></span><span></span></div>`;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('navi-typing-indicator');
  if (t) t.remove();
}

function getSimulatedResponse(userText) {
  const lower = userText.toLowerCase();
  for (const item of NAVI_SIMULATED_RESPONSES) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.response;
    }
  }
  return NAVI_DEFAULT_RESPONSE;
}

/* --- Claude API Mode (connect when ready) ---

   Create a backend endpoint that accepts POST { messages: [...] }
   and proxies to the Anthropic API with your API key server-side.

   Never put your Anthropic API key in frontend JavaScript.
*/
async function sendToAPI(userText) {
  showTyping();
  try {
    const res = await fetch(NAVI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: NAVI_SYSTEM_PROMPT,
        message: userText
      })
    });
    const data = await res.json();
    removeTyping();
    appendNaviMessage('navi', data.reply || NAVI_DEFAULT_RESPONSE);
  } catch (err) {
    removeTyping();
    appendNaviMessage('navi', "Sorry, I hit a glitch! You can reach Camilo directly at cal.com/automate305/30min.");
  }
}
