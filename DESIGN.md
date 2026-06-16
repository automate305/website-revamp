# Automate305 — Design System

## Brand Identity
- **Name:** Automate305
- **Founder:** Camilo
- **Tagline:** "AI automation for Miami HVAC pros — recover $3k-6k/month"
- **Vibe:** Miami energy + tech-forward + trustworthy + slightly playful (steak dinner energy)
- **Primary market:** Miami HVAC companies; expanding to other SMBs

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary background | `#0A0A0F` | Dark sections, nav, footer |
| Secondary background | `#F7F3EE` | Light sections, alternating rows |
| Primary text (dark bg) | `#F5F5F5` | Body text on dark backgrounds |
| Primary text (light bg) | `#0A0A0F` | Body text on light backgrounds |
| Accent | `#6D28D9` | Buttons, links, "305", bolt icon |
| Accent hover | `#8B5CF6` | Hover states |
| Border / divider | `#2A2A35` | Subtle separators |
| Card (dark bg) | `#1A1A24` | Cards on dark backgrounds |
| Success | `#10B981` | Booking confirmations |
| Urgency | `#F97316` | Emergency dispatch (sparingly) |

---

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headings | Anton | 400 (inherently bold) | Condensed, high impact |
| Body | Inter | 400, 500, 600 | Clean, readable |
| Monospace | system mono | 400 | Code/tech references (optional) |

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap
```

---

## Logo

- **Mark:** ⚡ (bolt) + AUTOMATE + 305
- **Dark bg version:** White "AUTOMATE" + purple "305" + purple bolt
- **Light bg version:** Near-black "AUTOMATE" + purple "305" + purple bolt
- **Lockup:** Horizontal — bolt left of wordmark
- **File naming:** `logo-dark.svg`, `logo-light.svg` (to be added)

---

## Components

### Buttons
```css
/* Primary */
background: #6D28D9;
color: #ffffff;
border-radius: 8px;
padding: 12px 24px;
font-weight: 600;

/* Hover */
background: #8B5CF6;

/* Secondary / Outline */
background: transparent;
border: 2px solid #6D28D9;
color: #F5F5F5;
```

### Cards (dark bg)
```css
background: #1A1A24;
border: 1px solid #2A2A35;
border-radius: 12px;
padding: 24px;
box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
```

### Cards (light bg)
```css
background: #F7F3EE;
border: 1px solid #e0dbd4;
border-radius: 12px;
padding: 24px;
```

### Inputs
```css
background: #1A1A24;
border: 1px solid #2A2A35;
color: #F5F5F5;
border-radius: 8px;

/* Focus */
border-color: #6D28D9;
outline: none;
```

### Links
```css
color: #8B5CF6;
text-decoration: none;

/* Hover */
text-decoration: underline;
```

---

## Layout

- **Max container width:** 1280px, centered, 24px padding each side
- **Grid:** 12-column desktop, 4-column mobile
- **Spacing scale:** 4px, 8px, 16px, 24px, 48px, 64px, 96px

### Breakpoints
| Name | Width | Layout |
|------|-------|--------|
| Mobile | ≤768px | 1-column, hamburger nav, marquee shows 3-4 items |
| Tablet | 768–1024px | 2-column |
| Desktop | ≥1024px | Multi-column, full nav |

---

## Navigation

**Structure:** Logo | Services | Proof | Contact | [Book a Free Audit]

- Desktop: horizontal, all items visible
- Mobile: hamburger (☰) toggles links
- Active page: underline in purple

---

## Depth & Elevation

- Cards: `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`
- No heavy 3D effects
- Subtle hover lift: `transform: translateY(-2px)` on cards

---

## Animations

- Logo marquee: 30s linear infinite, pause on hover
- Rotating headline: fade cross-dissolve, 3s interval
- Navi chat: slide up from bottom-right
- Hover transitions: 0.2s ease on all interactive elements

---

## Photo Usage

- `assets/camilo-scooter.png` — founder photo
  - Circular crop (border-radius: 50%)
  - 120×120px desktop, 80×80px mobile
  - 2px purple border (#6D28D9)
  - Used in: proof.html (next to stats), contact.html (about section)
