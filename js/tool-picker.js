/* =============================================
   Automate305 — Tool Picker + ROI Widget
   Vanilla JS, no frameworks
   Renders into div#tool-picker
   ============================================= */

(function () {
  'use strict';

  /* =============================================
     Tool Data
     ============================================= */
  var TOOLS = [
    {
      id: 'google-sheets',
      label: 'Google Sheets',
      hoursSaved: 10,
      monthlyRecovered: '$1,200',
      steps: [
        'We connect Google Sheets to your CRM',
        'Auto-follow-up triggers on new rows',
        'Missed call logs routed to Navi',
        'Weekly reports auto-generated'
      ]
    },
    {
      id: 'housecall-pro',
      label: 'Housecall Pro',
      hoursSaved: 5,
      monthlyRecovered: '$600',
      steps: [
        'Housecall Pro webhooks feed Navi',
        'After-hours calls handled automatically',
        'Estimates followed up in 2 minutes',
        'Dispatch optimized by zone'
      ]
    },
    {
      id: 'servicetitan',
      label: 'ServiceTitan',
      hoursSaved: 8,
      monthlyRecovered: '$960',
      steps: [
        'ServiceTitan data synced to AI layer',
        'Technician scheduling optimized',
        'Customer follow-up sequences triggered',
        'Monthly revenue reports'
      ]
    },
    {
      id: 'quickbooks',
      label: 'QuickBooks',
      hoursSaved: 6,
      monthlyRecovered: '$720',
      steps: [
        'Invoice follow-up automated',
        'Estimate reminders sent at optimal times',
        'Payment links sent via SMS',
        'Overdue accounts flagged'
      ]
    },
    {
      id: 'pen-paper',
      label: 'Pen & Paper',
      hoursSaved: 15,
      monthlyRecovered: '$1,800',
      steps: [
        'We digitize your workflow first',
        'All leads captured in one place',
        'Navi handles after-hours',
        'You get a full dashboard'
      ]
    }
  ];

  /* =============================================
     State
     ============================================= */
  var selectedToolId = null;

  /* =============================================
     Render Widget
     ============================================= */
  function render() {
    var container = document.getElementById('tool-picker');
    if (!container) return;

    var html = [
      '<p class="tool-picker-question">What do you use today to track leads and schedule jobs?</p>',
      '<div class="tool-picker-buttons">'
    ];

    TOOLS.forEach(function (tool) {
      var isActive = tool.id === selectedToolId;
      html.push(
        '<button class="tool-btn' + (isActive ? ' active' : '') + '" data-tool-id="' + tool.id + '">' +
        tool.label +
        '</button>'
      );
    });

    html.push('</div>');

    // Result panel
    if (selectedToolId) {
      var tool = TOOLS.find(function (t) { return t.id === selectedToolId; });
      if (tool) {
        html.push(
          '<div class="tool-result visible">',
          '  <div class="tool-result-header">',
          '    <div class="tool-result-check">&#10003;</div>',
          '    <div class="tool-result-name">' + tool.label + ' Workflow</div>',
          '  </div>',
          '  <div class="tool-result-stats">',
          '    <div class="tool-result-stat">',
          '      <span class="tool-result-stat-value">' + tool.hoursSaved + ' hrs</span>',
          '      <span class="tool-result-stat-label">saved per week</span>',
          '    </div>',
          '    <div class="tool-result-stat">',
          '      <span class="tool-result-stat-value">' + tool.monthlyRecovered + '</span>',
          '      <span class="tool-result-stat-label">recovered / month</span>',
          '    </div>',
          '  </div>',
          '  <div class="tool-result-steps">',
          '    <h4>How we automate your workflow</h4>',
          '    <ol>'
        );

        tool.steps.forEach(function (step) {
          html.push('<li>' + step + '</li>');
        });

        html.push(
          '    </ol>',
          '  </div>',
          '  <a href="https://cal.com/automate305/30min" target="_blank" rel="noopener" class="btn-primary" style="width:100%;justify-content:center;">',
          '    Book a Free Audit &rarr;',
          '  </a>',
          '</div>'
        );
      }
    }

    container.innerHTML = html.join('\n');

    // Bind button events
    var buttons = container.querySelectorAll('.tool-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var toolId = btn.getAttribute('data-tool-id');
        if (selectedToolId === toolId) {
          // Deselect if already selected
          selectedToolId = null;
        } else {
          selectedToolId = toolId;
        }
        render();

        // Scroll result into view
        if (selectedToolId) {
          var result = container.querySelector('.tool-result');
          if (result) {
            setTimeout(function () {
              result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 50);
          }
        }
      });
    });
  }

  /* =============================================
     Init on DOM Ready
     ============================================= */
  function init() {
    var container = document.getElementById('tool-picker');
    if (!container) return;
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
