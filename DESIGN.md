# Automate305 — Brand & Design Guidelines

## 1. Brand Identity

**Agency Name:** Automate305  
**Tagline:** AI-powered revenue recovery for Miami SMBs  
**Primary Vertical:** HVAC companies in South Florida  
**Expanding To:** Restaurants, law firms, real estate agencies, medical/dental offices, auto repair shops  
**Founder:** Camilo  
**Location:** Miami, FL (305 = Miami area code)  
**Booking Link:** https://cal.com/automate305/30min  

### Mission
Help Miami small-to-medium business owners stop losing money to missed calls, slow follow-up, and manual scheduling — by automating the revenue recovery layer with AI.

### Voice & Tone
- **Direct:** No fluff. Numbers first.
- **Local:** Miami-specific references. Speak to owners who run real businesses.
- **Confident but not arrogant:** We show proof, not hype.
- **Bilingual-friendly:** English primary, Spanish available on request.
- **Conversational:** Written like a smart friend who knows automation — not a corporate brochure.

**Write like this:** "Most HVAC owners lose $3k-6k/month to missed calls. We fix that in 2 weeks."  
**Not like this:** "Our revolutionary AI platform leverages cutting-edge machine learning to optimize your customer acquisition pipeline."

---

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-primary` | `#0A0A0F` | Main dark background (hero, nav, footer) |
| `--color-bg-secondary` | `#F7F3EE` | Light cream sections (proof cards, contrast blocks) |
| `--color-accent` | `#6D28D9` | Purple — primary CTA buttons, logo "305", borders, highlights |
| `--color-accent-hover` | `#8B5CF6` | Lighter purple on hover states |
| `--color-border` | `#2A2A35` | Subtle dark borders, card edges |
| `--color-success` | `#10B981` | Green — stat numbers, positive results, savings |
| `--color-urgency` | `#F97316` | Orange — urgency callouts, "don't miss this" moments |
| `--color-card-dark` | `#1A1A24` | Dark card backgrounds (service cards, proof cards on dark bg) |
| `--color-text-light` | `#F5F5F5` | Primary text on dark backgrounds |
| `--color-text-dark` | `#0A0A0F` | Primary text on light backgrounds |
| `--color-muted-dark` | `#9CA3AF` | Secondary text on dark backgrounds |
| `--color-muted-light` | `#6B7280` | Secondary text on light backgrounds |

### Color Rules
- Dark sections (`#0A0A0F`) → use `#F5F5F5` text and `#6D28D9` accents
- Light sections (`#F7F3EE`) → use `#0A0A0F` text and `#6D28D9` accents
- Never put orange (`#F97316`) and purple (`#6D28D9`) next to each other without separation
- Green (`#10B981`) is reserved for numbers/stats that show positive ROI — do not overuse

---

## 3. Typography

### Fonts
- **Headings:** Anton (Google Fonts) — bold, condensed, loud. Used for H1, H2, large stat numbers.
- **Body:** Inter (Google Fonts) — clean, readable. Used for body copy, nav, buttons, labels.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size (desktop) | Size (mobile) | Weight | Letter-spacing |
|---|---|---|---|---|---|
| H1 | Anton | 64px | 36px | 400 | -0.02em |
| H2 | Anton | 48px | 28px | 400 | -0.01em |
| H3 | Anton | 32px | 22px | 400 | 0 |
| Stat number | Anton | 72px | 48px | 400 | -0.02em |
| Body large | Inter | 18px | 16px | 400 | 0 |
| Body | Inter | 16px | 15px | 400 | 0 |
| Small/caption | Inter | 14px | 13px | 400 | 0 |
| Button | Inter | 16px | 15px | 600 | 0.01em |
| Nav link | Inter | 15px | 16px | 500 | 0 |
| Label/tag | Inter | 12px | 11px | 600 | 0.08em uppercase |

---

## 4. Logo

```html
<a href="index.html" class="logo">
  AUTOMATE<span class="purple">305</span> ⚡
</a>
```

- Font: Anton
- "AUTOMATE" → `#F5F5F5` on dark bg, `#0A0A0F` on light bg
- "305" → `#6D28D9` (always purple, regardless of background)
- "⚡" → follows the text color
- Size: 24px in nav, 36px in standalone uses
- No logo image file — purely typographic

---

## 5. Navigation Structure

### Desktop Nav (horizontal)
```
[AUTOMATE305 ⚡]   [Services]  [Proof]  [Contact]   [Book a Free Audit →]
```

- Background: `#0A0A0F` with `1px solid #2A2A35` bottom border
- Height: 72px
- Sticky (position: fixed top)
- Logo left, links center-right, CTA button far right
- Nav links: `#9CA3AF` default → `#F5F5F5` hover, no underline
- Active page link: `#6D28D9`

### Mobile Nav (hamburger)
- Hamburger button `id="hamburger"` (3 lines → X on open)
- `.nav-links` hidden by default on mobile
- On open: full-width dropdown below nav, dark bg, vertical links
- CTA button full width in mobile dropdown

---

## 6. Button Styles

### Primary CTA (Purple)
```css
background: #6D28D9;
color: #F5F5F5;
padding: 14px 28px;
border-radius: 8px;
font-family: Inter;
font-weight: 600;
font-size: 16px;
border: none;
cursor: pointer;
transition: background 0.2s ease, transform 0.1s ease;
```
Hover: `background: #8B5CF6; transform: translateY(-1px);`

### Secondary / Outline
```css
background: transparent;
color: #F5F5F5;
border: 2px solid #6D28D9;
padding: 12px 26px;
border-radius: 8px;
```
Hover: `background: rgba(109,40,217,0.1);`

### Ghost (text link style)
```css
background: transparent;
color: #6D28D9;
border: none;
padding: 0;
text-decoration: underline;
```

---

## 7. Card Styles

### Dark Service Card (on `#0A0A0F` background)
```css
background: #1A1A24;
border: 1px solid #2A2A35;
border-radius: 12px;
padding: 32px;
```
Hover: `border-color: #6D28D9; box-shadow: 0 0 20px rgba(109,40,217,0.15);`

### Light Proof Card (on `#F7F3EE` background)
```css
background: #FFFFFF;
border: 1px solid #E5E0DA;
border-radius: 12px;
padding: 32px;
box-shadow: 0 2px 8px rgba(0,0,0,0.06);
```

### Stat Highlight
- Large number: Anton 72px `#10B981`
- Label below: Inter 14px uppercase letter-spacing `#6B7280`
- Detail text: Inter 15px `#0A0A0F`

---

## 8. Logo Marquee

Continuous horizontal scroll of tool/partner logos as text spans.

```
📊 Google Sheets  |  📁 Google Drive  |  🎯 Apollo.io  |  📧 SmartLead  |  
🟠 HubSpot  |  🤖 OpenAI  |  🔮 Claude/Anthropic  |  ⚙️ Make.com  |  📅 Cal.com  |  ▲ Vercel
```

- Background: `#1A1A24`
- Text: `#9CA3AF` → `#F5F5F5` on hover of individual item
- Scrolls left infinitely, 30s loop
- Pauses on hover of the marquee container
- Items duplicated in DOM for seamless loop
- Overflow: hidden, no scrollbar

---

## 9. Animations & Interactions

### Rotating Subheadline
- Element: `<span id="rotating-text">`
- Cycles: "More Revenue" → "More Repeat Clients" → "More Free Time"
- Interval: 3 seconds
- Transition: fade out (opacity 0) → swap text → fade in (opacity 1)
- Duration: 300ms fade

### Particle Background (Hero Canvas)
- `<canvas id="hero-canvas">` behind hero content
- ~80 purple dots (`rgba(109,40,217,0.6)`)
- Random positions and velocities
- Lines drawn between particles within 120px distance
- Canvas fills full hero section
- Runs on `requestAnimationFrame`

### Hover States
- Cards: border glow (`box-shadow: 0 0 20px rgba(109,40,217,0.15)`)
- Buttons: subtle lift (`transform: translateY(-1px)`)
- Nav links: color shift 0.2s ease
- Marquee: pause on container hover

### Scroll Behavior
- Smooth scroll for all anchor `#` links
- Nav stays fixed; page content starts below 72px nav

---

## 10. Spacing System

Base unit: 8px

| Token | Value |
|---|---|
| `--space-xs` | 8px |
| `--space-sm` | 16px |
| `--space-md` | 24px |
| `--space-lg` | 32px |
| `--space-xl` | 48px |
| `--space-2xl` | 64px |
| `--space-3xl` | 96px |

Section padding: `96px 0` desktop, `64px 0` mobile  
Container max-width: `1200px`, padding: `0 24px`

---

## 11. Footer

3-column layout on desktop, stacked on mobile.

**Column 1 — Brand**
- Logo: `AUTOMATE305 ⚡`
- Tagline: "AI automation for Miami SMBs."
- © 2025 Automate305. Miami, FL. All rights reserved.

**Column 2 — Quick Links**
- Services
- Proof
- Contact
- Book a Free Audit

**Column 3 — Contact**
- Email: hello@automate305.com
- Location: Miami, FL
- Cal.com booking link

Footer background: `#0A0A0F`, top border: `1px solid #2A2A35`, text: `#9CA3AF`

---

## 12. Responsive Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | ≤ 768px | Single column, hamburger nav, smaller type, full-width buttons |
| Tablet | 768px – 1024px | 2-column grids, medium type sizes |
| Desktop | > 1024px | Full layout, 3-column grids, horizontal nav |

### Mobile-Specific Rules
- H1: 36px → 28px on very small screens
- Service cards: 1 column
- Proof cards: 1 column
- Footer: stacked vertically
- Marquee: same, just smaller text
- Navi widget: 90vw width, full-bottom-edge positioning

---

## 13. Navi Chat Widget

Fixed bottom-right chat button + expandable chat window.

- **Button:** 60px circle, `#6D28D9` background, `⚡` icon, "Navi" label below
- **Window:** 360×480px, `#1A1A24` background, purple header
- **Header:** "Navi — Automate305 AI", close button (×)
- **Message bubbles:**
  - Bot: dark gray background (`#2A2A35`), left-aligned
  - User: purple background (`#6D28D9`), right-aligned
- **Input:** dark background, purple send button
- **Animation:** slide up from bottom-right on open, slide down on close
- **Mobile:** 90vw width, positioned to bottom edge

---

## 14. Tool Picker Widget

Interactive selection widget embedded in services.html.

- Question displayed as H3
- Tool buttons: grid of 2-3 per row, outlined style
- On selection: button highlights purple, result panel slides in below
- Result panel shows:
  - Tool name + checkmark
  - Hours saved per week
  - Monthly revenue recovered (green)
  - 4 workflow steps as a numbered list
  - CTA: "Book a Free Audit →"
- Resets on new selection

---

## 15. Page Structure Summary

```
index.html      — Hero + marquee + service preview + industries + footer
services.html   — How it works + tool picker + full services + video placeholder
proof.html      — Case studies + Camilo section + marquee + CTA
contact.html    — Booking CTA + form + service area + about Camilo
```

All pages share: same nav, same footer, js/main.js, js/navi.js
