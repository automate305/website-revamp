/* =============================================
   Automate305 — Tool Picker + ROI Widget
   Vanilla JS, no frameworks
   ============================================= */

const TOOL_DATA = {
  'Google Sheets': {
    hours: 10,
    monthly: 1200,
    steps: [
      'We connect Google Sheets to a central CRM layer automatically',
      'Auto-follow-up triggers fire whenever a new lead row appears',
      'Missed call logs are routed to Navi for instant response',
      'Weekly revenue recovery reports auto-generated and emailed to you'
    ]
  },
  'Housecall Pro': {
    hours: 5,
    monthly: 600,
    steps: [
      'Housecall Pro webhooks feed directly into Navi',
      'After-hours calls handled automatically — no more voicemail black holes',
      'Estimates followed up via SMS within 2 minutes of sending',
      'Dispatch routes optimized by zone to save drive time'
    ]
  },
  'ServiceTitan': {
    hours: 8,
    monthly: 960,
    steps: [
      'ServiceTitan data synced to our AI layer in real time',
      'Technician scheduling optimized by availability and location',
      'Customer follow-up sequences triggered post-service automatically',
      'Monthly revenue recovery reports delivered to your inbox'
    ]
  },
  'QuickBooks': {
    hours: 6,
    monthly: 720,
    steps: [
      'Invoice follow-up sequences automated — no more chasing payments',
      'Estimate reminders sent at optimal times (day 2, day 5, day 10)',
      'Payment links sent via SMS for faster collection',
      'Overdue accounts flagged and escalated automatically'
    ]
  },
  'Pen & Paper': {
    hours: 15,
    monthly: 1800,
    steps: [
      'We digitize your entire workflow first — no disruption to operations',
      'All leads captured in one place with automatic follow-up',
      'Navi handles after-hours calls and books appointments 24/7',
      'You get a live dashboard showing revenue recovered in real time'
    ]
  }
};

document.addEventListener('DOMContentLoaded', initToolPicker);

function initToolPicker() {
  const container = document.getElementById('tool-picker');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-picker-section">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">ROI Calculator</span>
          <h2 class="section-title dark">What do you use today to track leads and schedule jobs?</h2>
          <p class="section-subtitle dark">Click your current tool to see how Automate305 integrates — and your estimated monthly recovery.</p>
        </div>
        <div class="tool-buttons">
          ${Object.keys(TOOL_DATA).map(tool => `
            <button class="tool-btn" data-tool="${tool}">
              ${getToolIcon(tool)} ${tool}
            </button>
          `).join('')}
        </div>
        <div class="roi-result" id="roi-result">
          <div class="roi-stats">
            <div class="roi-stat">
              <span class="roi-stat-value" id="roi-hours">—</span>
              <span class="roi-stat-label">Hours/week saved</span>
            </div>
            <div class="roi-stat">
              <span class="roi-stat-value" id="roi-monthly">—</span>
              <span class="roi-stat-label">Est. monthly recovery</span>
            </div>
          </div>
          <div class="roi-workflow">
            <h4>How it works with <span id="roi-tool-name">your tool</span></h4>
            <ol id="roi-steps"></ol>
          </div>
          <div style="margin-top: 28px; padding-top: 24px; border-top: 1px solid #2A2A35;">
            <a href="https://cal.com/automate305/30min" target="_blank" class="btn btn-primary">
              Book a Free Audit — See Your Real Numbers
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showROI(btn.dataset.tool);
    });
  });
}

function showROI(toolName) {
  const data = TOOL_DATA[toolName];
  if (!data) return;

  const result = document.getElementById('roi-result');
  const hoursEl = document.getElementById('roi-hours');
  const monthlyEl = document.getElementById('roi-monthly');
  const toolNameEl = document.getElementById('roi-tool-name');
  const stepsEl = document.getElementById('roi-steps');

  hoursEl.textContent = `${data.hours}hrs`;
  monthlyEl.textContent = `~$${data.monthly.toLocaleString()}`;
  toolNameEl.textContent = toolName;
  stepsEl.innerHTML = data.steps.map(s => `<li>${s}</li>`).join('');

  result.classList.remove('visible');
  void result.offsetWidth; // force reflow for re-animation
  result.classList.add('visible');
}

function getToolIcon(tool) {
  const icons = {
    'Google Sheets': '📊',
    'Housecall Pro': '🔧',
    'ServiceTitan': '⚙️',
    'QuickBooks': '📒',
    'Pen & Paper': '✏️'
  };
  return icons[tool] || '🛠️';
}
