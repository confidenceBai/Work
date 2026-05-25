---
name: 白子煜 · Portfolio
description: UX designer portfolio — dark-first, opinionated, contemporary
colors:
  warm-interruption: "#FF9191"
  sharp-annotation: "#DDE83F"
  text-primary: "#fcfcfc"
  text-muted: "#aeaebc"
  text-dim: "#636379"
  lifted-surface: "#3a3d43"
  active-surface: "#2e3138"
  card-shell: "#1f2126"
  obsidian-surface: "#292c33"
  stage-floor: "#15161a"
  void: "#0e0f10"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Noto Sans SC', sans-serif"
    fontSize: "72px"
    fontWeight: 500
    lineHeight: "1.2"
    letterSpacing: "0"
  headline:
    fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Noto Sans SC', sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: "1.2"
  title:
    fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Noto Sans SC', sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: "1.2"
  body:
    fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Noto Sans SC', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.4"
  label:
    fontFamily: "InterDisplay, 'Inter Display', Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "1.5"
    letterSpacing: "0.08em"
rounded:
  pill: "80px"
  card: "24px"
  chip: "32px"
  icon-badge: "112px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "24px"
  lg: "32px"
components:
  nav-pill:
    backgroundColor: "{colors.stage-floor}"
    rounded: "{rounded.pill}"
    padding: "8px"
  nav-highlight:
    backgroundColor: "{colors.active-surface}"
    rounded: "{rounded.chip}"
  hero-card:
    backgroundColor: "{colors.card-shell}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: 白子煜 · Portfolio

## 1. Overview

**Creative North Star: "The Magic Canvas"**

A dark, unlit stage where the work is the only light source. The system doesn't announce itself — it recedes so each case study, each parallax thumbnail, each accent color pop commands full attention precisely when it appears. Nothing here is ambient decoration; every visible element was placed with a reason, and everything else was removed.

The aesthetic language is cool and deliberate: near-black surfaces in a tight blue-gray register, two surgical accent colors deployed with highlighter logic, and typography that mixes CJK warmth with Latin precision. The Warm Interruption (#FF9191) marks the person — their name, once. The Sharp Annotation (#DDE83F) marks a fact — years of experience, once. Both appear on the same screen and never again on any other. Their power is in scarcity.

Motion is purposeful and physical. Showcase images respond to the cursor with parallax depth that reveals the spatial stack without drama. The floating navigation indicator springs between positions with real weight. Everything else is still. The system's restraint is not minimalism for aesthetics — it's an argument: the work speaks, not the frame.

**Key Characteristics:**
- Near-monochrome deep dark stage, two precision accent interruptions only
- Asymmetric top-left border chamfer on all card surfaces
- Floating bottom pill navigation with spring-animated position indicator
- Parallax-offset work thumbnails orbiting the hero content at clock positions
- CJK-first typography (PingFang SC) paired with InterDisplay for Latin metadata
- Zero decorative motion; all animation carries spatial or state information

## 2. Colors: The Staged Palette

A near-monochrome dark system with two precision interruptions. The deep surface stack creates spatial depth through tone alone; the two accents exist to break silence exactly once each per screen.

### Primary
- **Warm Interruption** (#FF9191): Reserved for the subject's name on the homepage. Coral at body temperature — personal, not aggressive. Deployed once. Never used decoratively, never repeated on the same screen.
- **Sharp Annotation** (#DDE83F): Acid chartreuse on a single factual callout (years of experience). Cold against the warm coral; functions as a margin annotation, not emphasis. Deployed once. Never paired with Warm Interruption in visual proximity.

### Neutral (Surface Stack)
- **Void** (#0e0f10): The deepest available surface. Full-bleed backgrounds only.
- **Stage Floor** (#15161a): Navigation background. The ground plane.
- **Card Shell** (#1f2126): Primary card and article background — the main surface for contained content.
- **Obsidian Surface** (#292c33): Secondary container layer; nested elements.
- **Active Surface** (#2e3138): Navigation highlight pill; hover state layer.
- **Lifted Surface** (#3a3d43): Top-left border color on cards and nav highlight — encodes "this surface has an edge."

### Neutral (Text Stack)
- **Text Dim** (#636379): Metadata, secondary labels, timestamps, inactive states.
- **Text Muted** (#aeaebc): Supporting body copy, inactive navigation icons.
- **Text Primary** (#fcfcfc): All primary body text, headings, and active icons on dark backgrounds.

**The Interruption Rule.** Both accent colors appear exactly once per screen. Their scarcity is the mechanism — a third instance of either color anywhere on the same page is prohibited.

**The Temperature Rule.** All surfaces are blue-shifted grays. The only warmth in the system is Warm Interruption (#FF9191). Introducing warm surfaces (beige, warm gray, sand, brown) violates the tonal contract the accent relies on.

## 3. Typography: CJK + Latin Precision

**Body / Display Font:** PingFang SC (system stack: `system-ui, -apple-system, 'PingFang SC', 'Noto Sans SC', sans-serif`)
**Label / Identifier Font:** InterDisplay (`InterDisplay, 'Inter Display', Inter, sans-serif`)

**Character:** PingFang SC carries the content — it reads with the authority and warmth of good editorial Chinese typography. InterDisplay handles metadata and labels with Western technical precision. The pairing communicates: designed in China, fluent everywhere. The two fonts never mix on a single line.

### Hierarchy
- **Display** (weight 500, 72px, 1.2 line-height): Full-page section titles; not used at hero scale on homepage (see note below).
- **Headline** (weight 600, 40px, 1.2): Page-level titles, case study headlines.
- **Title** (weight 600, 32px, 1.2): Section headings within case studies; H4 at 20px weight 600 for subsections.
- **Body Emphasis** (weight 500, 18px, 1.4): Intro paragraphs, primary callout text.
- **Body** (weight 400, 16px, 22.4px): Standard running copy; max line length 65–75ch.
- **Label** (InterDisplay, weight 500, 14px, 1.5 line-height, 0.08em letter-spacing): Navigation items, metadata tags, keywords, year markers. Always InterDisplay, never PingFang SC.

**Homepage deviation:** The hero H1 is set at 28px weight 400 (not the 72px display scale) — a deliberate choice so the opening reads as speech, not broadcast. Display scale is reserved for screens that need to fill a full viewport with a single claim.

**The Two-Font Rule.** Every typographic element uses exactly one of the two font families. PingFang SC for all prose, headings, and flowing text. InterDisplay for all metadata identifiers, labels, and technical strings. Never mix them on the same line.

## 4. Elevation: Asymmetric Chamfer + Ambient Shadow

This system has no "flat by default, shadow on hover" pattern. Depth is permanent and structural, built through two mechanisms:

**Tonal surface stacking** — each nested layer uses a progressively lighter shade from the surface stack (Card Shell → Obsidian Surface → Active Surface → Lifted Surface). The layering is visible without any shadow.

**The Hero Ambient Shadow** — the central homepage card carries a single permanent 8-step layered shadow. Each step uses a negative spread to produce a close, soft penumbra rather than a broad blur:
`0px 0.84px 0.5px -0.31px rgba(0,0,0,0.13), 0px 1.99px 1.19px -0.63px rgba(0,0,0,0.13), 0px 3.63px 2.18px -0.94px rgba(0,0,0,0.13), 0px 6.04px 3.62px -1.25px rgba(0,0,0,0.13), 0px 9.75px 5.85px -1.56px rgba(0,0,0,0.13), 0px 15.96px 9.57px -1.88px rgba(0,0,0,0.13), 0px 27.48px 16.49px -2.19px rgba(0,0,0,0.13), 0px 50px 30px -2.5px rgba(0,0,0,0.13)`

**The Asymmetric Border** — all cards use a 1px border on the top and left edges only (right and bottom are borderless). The border color is Lifted Surface (#3a3d43). This creates a chamfered edge illusion: the surface appears to have a physical corner catching light. It is not decorative; it is the spatial grammar of the system.

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows in this system are permanent ambient depth, not hover responses. Hover states use tonal background shifts. Never add a shadow as an interactive response.

## 5. Components

### Floating Navigation Pill
The defining interaction pattern. A fixed-position pill that floats 32px above the viewport floor, containing four icon-only navigation items with a sliding spring-animated highlight.

- **Shape:** 80px full-pill radius; internal highlight uses 32px chip radius
- **Background:** Stage Floor (#15161a)
- **Border:** Asymmetric — 2px top + 2px left / 1px bottom + 1px right, at Card Shell (#1f2126)
- **Inactive icon:** Phosphor fill icons at 20px, Text Muted (#aeaebc)
- **Active icon:** Text Primary (#fcfcfc)
- **Highlight:** Active Surface (#2e3138) pill, with 1px top + 1px left border at Lifted Surface (#3a3d43). Animates with spring physics: stiffness 300, damping 30 — physically weighted, not tweened.
- **Item size:** 48×48px per icon; 8px internal padding on container

### Hero Card
The homepage's sole contained element. Floats centered in the viewport, orbited by showcase images.

- **Shape:** 24px corner radius
- **Background:** Card Shell (#1f2126)
- **Border:** 1px top + 1px left at Active Surface (#2e3138); 0px right + 0px bottom
- **Padding:** 24px
- **Width:** 480px fixed (desktop)
- **Shadow:** 8-step ambient (see Elevation)
- **Typography:** PingFang SC 28px weight 400, Text Primary (#fcfcfc), centered, `text-wrap: balance`
- **Accent inline spans:** Warm Interruption on the name; Sharp Annotation on the experience claim. No other instances.

### Inline Icon Badge
Small pill-shaped badges embedded inline within headline text, acting as visual punctuation marks.

- **Shape:** 112px radius (fully rounded for its 32×24px dimensions)
- **Background:** Active Surface (#2e3138)
- **Border:** 1px, Lifted Surface (#3a3d43)
- **Interior:** Diagonal white-at-53%-opacity streak — a highlight baked in, not interactive
- **Placement:** `display: inline-block; vertical-align: middle` within `<h1>`
- **Rotation:** Each instance has a unique fixed rotation (e.g. +8°, −15°) to break visual rigidity without being random

### Floating Showcase Images
Portfolio thumbnails arranged at clock positions (12, 9, 7, 5, 3 o'clock) relative to the hero card, each with a baked rotation and parallax cursor response.

- **Arrangement:** Absolute positioning, all overflow-visible outside the hero container
- **Rotation:** Fixed per instance (0°, 11°, −9°, 15°, −15°) — organized chaos, not uniform grid
- **Motion:** Framer Motion `useTransform` on normalized cursor XY → each card at a different parallax sensitivity. Easing: spring (stiffness 120, damping 18 recommended for thumbnail parallax)
- **State:** No click hover animations on the thumbnails themselves; the whole field responds to cursor as a unified depth effect

## 6. Do's and Don'ts

### Do:
- **Do** keep both accent colors to a single appearance per screen. Warm Interruption marks the person; Sharp Annotation marks a fact. This contract is why they land.
- **Do** apply the asymmetric 1px top-left border to every card and contained surface. Consistency makes it a grammar, not an accident.
- **Do** use InterDisplay exclusively for labels, year markers, keywords, and metadata. All prose and headings use PingFang SC.
- **Do** allow work images to overflow their containers. The system communicates depth through cropping and overlap, not tidy containment.
- **Do** treat the floating bottom nav as the sole navigation element. No top nav, no drawer, no hamburger.
- **Do** use spring transitions (stiffness 300, damping 30) for position-based state changes (nav highlight, cursor-following elements). Use ease-out-quart for opacity/scale transitions.
- **Do** keep the page background at Stage Floor (#15161a) or Void (#0e0f10). Never introduce a lighter background as the root surface.

### Don't:
- **Don't** build a SaaS-style layout: no large hero headline with feature cards below, no gradient backgrounds, no "What I do" section presented in icon-grid format. This is a portfolio where the work is the argument, not a product page.
- **Don't** use more than two accent colors on any single screen. A third accent destroys the interruption logic the entire system depends on.
- **Don't** add scroll-triggered animation sequences to every section. Motion in this system is spatial and interactive — it responds to the user. Choreographed entrance animations that fire regardless of user action are prohibited.
- **Don't** use templates. If a layout could pass for the Behance default grid, Notion portfolio template, or a generic "case study" carousel, redesign it.
- **Don't** introduce warm surfaces (beige, warm gray, cream, sand, warm brown). All surfaces are blue-shifted. The only warmth is the Warm Interruption accent.
- **Don't** write self-introduction copy that describes capabilities at length. Let the work establish the argument. Text on this site is for facts, transitions, and context — not self-advocacy paragraphs.
- **Don't** apply shadows as hover state responses. Shadows are permanent ambient depth in this system. Hover states use tonal background shifts only.
- **Don't** use `border-left` as a colored stripe accent on cards or callouts. The asymmetric border treatment is top-left simultaneously — it's a chamfer, not a stripe.
