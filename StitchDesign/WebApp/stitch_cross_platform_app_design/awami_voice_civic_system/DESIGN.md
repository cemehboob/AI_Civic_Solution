---
name: Awami Voice Civic System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#404941'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707a70'
  outline-variant: '#bfc9be'
  surface-tint: '#1f6b40'
  primary: '#004423'
  on-primary: '#ffffff'
  primary-container: '#0b5e34'
  on-primary-container: '#8ad5a0'
  inverse-primary: '#8cd7a2'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#002f99'
  on-tertiary: '#ffffff'
  tertiary-container: '#0242cd'
  on-tertiary-container: '#b5c2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a7f4bc'
  primary-fixed-dim: '#8cd7a2'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#00522b'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b7c4ff'
  on-tertiary-fixed: '#001551'
  on-tertiary-fixed-variant: '#0039b5'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Noto Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  display-hero-mobile:
    fontFamily: Noto Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 34px
  headline-md-mobile:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 30px
  title-lg:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-xl:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  label-md:
    fontFamily: Noto Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
  urdu-headline-lg:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 52px
  urdu-headline-md:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 44px
  urdu-body-lg:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 40px
  urdu-body-md:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 1.75rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is engineered specifically for citizens navigating public infrastructure, welfare programs, citizen identity verification, and dispute filings through conversational audio. The core target audience includes rural, elderly, and semi-literate demographics in Pakistan across Urdu and Punjabi linguistic contexts. The platform translates complex bureaucratic processes into immediate, voice-guided actions.

The interface aesthetic pairs institutional dignity with high-contrast accessibility and tactile clarity. Drawing from functional minimalism and tactile affordances, the visual language avoids cognitive clutter, dense tables, and abstract iconography. Every critical decision is anchored by clear visual metaphors, pictorial anchor cards, and persistent auditory feedback loops. The emotional response must convey unquestioned state reliability, safety, direct accessibility, and warmth, eliminating the intimidation frequently felt by citizens when interacting with institutional portals.

## Colors

The color architecture is built strictly around AAA accessibility thresholds against a crisp, non-glare slate canvas (`#f8fafc`). The primary civic green (`#0b5e34`) serves as the symbol of legitimate public governance, verified services, and affirmative actions. The secondary warm ochre/gold (`#d97706`) signals high-attention elements, active voice recording, pending verification steps, and interactive notices.

### State & Status Palette
- **Canvas Base:** `#f8fafc` (Clean Slate 50)
- **Card/Surface:** `#ffffff` (Pure White)
- **Primary Text & Icons:** `#0f172a` (Slate 900) for uncompromised legibility
- **Muted Text:** `#334155` (Slate 700) — strictly maintained above a 7:1 contrast ratio
- **Status: In-Progress / Processing:** `#d97706` (Ochre / Amber 600) with `#fffbeb` background fill
- **Status: Resolved / Success:** `#0b5e34` (Civic Green) with `#f0fdf4` background fill
- **Status: Attention / Action Needed:** `#b91c1c` (Accessible Crimson) with `#fef2f2` background fill
- **Active Audio Waves:** `#0284c7` (Sky Blue) to differentiate dynamic audio intake from static state colors

Every status indicator must pair color with a distinct, universal graphic icon (such as a checkmark inside a circle, clock, or triangle) and a plain-language text label to ensure complete comprehension without relying on color perception alone.

## Typography

Typography in this system handles strict bilingual parity between Latin script (English) and Arabic script (Urdu and Shahmukhi Punjabi). The typography engine uses **Noto Sans** for clean, legible sans-serif bilingual alignment alongside system fallbacks for Urdu typography.

### Nastaliq & Arabic Script Rules
- **Line Heights:** Urdu scripts require an expansion of 1.6x to 2x baseline height compared to Latin typography to prevent diacritic clashing (*aerab*) and vertical clipping.
- **Font Sizing:** Due to complex vertical glyph anatomy, Urdu text must be set 2px to 4px larger than its Latin equivalent to maintain visual balance and legibility.
- **Text Alignment:** Right-to-Left (RTL) context is native. RTL layouts mirror all margins, chevron indicators, and visual progress bars horizontally.
- **Minimum Size Floor:** No text across the application shall render below 15px (`label-md`). Fine print and micro-copy are prohibited.

## Layout & Spacing

The layout adopts a single-column, fluid card-based stack on mobile viewports, transitioning to a constrained 4-column system on tablets and an 8-column layout on desktop viewports. The maximum layout width is constrained to `840px` to keep interactions focused, centered, and within thumb reach.

### Touch Target Architecture
- **Critical Minimum Target:** Every interactive element has a strictly enforced physical target size of at least `56px × 56px`. Primary actions, such as initiating voice capture, span `72px` to `88px`.
- **Thumb Zone Anchor:** The primary voice input trigger resides in a persistent, bottom-docked controller floating above the device navigation bar.
- **Spacing Rhythm:** Generous vertical spacing (`space-md` and `space-lg`) separates interactive cards to eliminate accidental taps by users with varying motor skills or calloused fingers.

## Elevation & Depth

To maintain clarity and support low-cost mobile screens in bright outdoor sunlight, this design system uses sharp structural contrast rather than subtle, low-contrast shadows.

### Elevation Levels
1. **Level 0 (Base Canvas):** Background tone `#f8fafc`. Flat, non-interactive.
2. **Level 1 (Interactive Cards & Inputs):** Pure white background (`#ffffff`) bounded by a firm 1.5px solid border (`#cbd5e1`). It provides clear boundaries on outdoor screens without relying solely on shadows.
3. **Level 2 (Active/Pressed Cards):** High-contrast border shift to `#0b5e34` (2px thickness) accompanied by a soft, diffused ambient drop: `box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08)`.
4. **Level 3 (Sticky Bottom Voice Bar & Modals):** Grounded elevation with an explicit top border separator (`2px solid #e2e8f0`) and an ambient anchor shadow: `box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.12)`.
5. **Level 4 (Floating Voice Orb):** Concentric ripple pulses (`0 0 0 12px rgba(11, 94, 52, 0.15)`) indicating audio recording states.

## Shapes

The design system utilizes level `2` roundedness (0.5rem / 8px for standard components, 1rem / 16px for cards, and full pill curves for vocal triggers). This balances modern software expectations with the structured authority of an official public sector tool.

### Geometry Hierarchy
- **Standard Controls & Text Inputs:** `rounded` (8px / 0.5rem). Clean, legible boundary boxes.
- **Pictorial Cards & Status Containers:** `rounded-lg` (16px / 1rem). Clear separation between unrelated civic services.
- **Voice Button & Audio Controllers:** Fully circular (`rounded-full` / 9999px) to communicate omnidirectional input, distinguish speech controls from rectangular data cards, and create an intuitive target.
- **Status Badges & Chips:** `rounded-full` (pill-shaped) to distinguish non-clickable state metadata from tap-target actions.

## Components

### Giant Voice Action Bar (FAB / Docked Orb)
- **Dimensions:** Minimum 80px × 80px circular button centered inside a 96px tall fixed bottom utility deck.
- **Visual Style:** Deep Civic Green (`#0b5e34`) fill with a high-contrast white microphone glyph (minimum 36px icon size).
- **Listening State:** Transforms into Warm Ochre (`#d97706`) with two outward-animating concentric sound-wave pulse rings. Accompanied by real-time vertical frequency bars above the button (4px width, rounded pill ends) showing audio capture activity.
- **Tactile/Audio Confirmation:** Must trigger haptic click feedback on press, paired with an audible cue for recording start and stop.

### Pictorial Action Cards
- **Usage:** Primary gateway for selecting civic services (e.g., Pension, BISP, Land Records, CNIC, Healthcare).
- **Composition:** 50/50 balance between an illustrative, high-contrast, culturally accurate vector pictogram (top or left) and high-legibility bilingual text (bottom or right).
- **Audio Cue Button:** Every card includes a dedicated 56px speaker icon button ("Tap to Listen") that speaks the card's purpose aloud in Urdu/Punjabi without triggering navigation.
- **Border:** Minimum 1.5px solid `#cbd5e1` to maintain visual clarity on low-tier screens.

### Bilingual Audio Input Fields
- **Height:** Minimum 60px height.
- **Affordance:** Features a clear placeholder, a 2px high-contrast border, and an integrated trailing microphone icon button (52px tap area) that lets users dictate that specific field instead of typing.

### High-Contrast Status Badges
- **Dimensions:** Minimum 36px height, text size 16px bold (`label-md`).
- **Structure:** 2px solid border matching the status color, light tinted background fill, prominent left-aligned icon (20px), and explicit bold text (e.g., "حل شدہ / Resolved", "زیرِ التواء / In Progress").

### High-Affordance Selection Chips
- **Dimensions:** Minimum 56px height for rapid, low-dexterity tap selection.
- **Selected State:** Filled with `#0b5e34`, white text, 2px `#0b5e34` outline.
- **Unselected State:** Pure white background, `#334155` text, 2px `#94a3b8` outline.

### Screen-Reader & Audio Playback Prompts
- Fixed floating bar that appears when processing government responses, featuring large "Pause / پوز", "Replay / دوبارہ سنیں", and "Slow Speed / آہستہ" controls to assist elderly citizens.