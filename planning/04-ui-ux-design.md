# UI/UX Design Document

## 1. Design Principles

### 1.1 Core Principles
- **Clarity**: Information hierarchy should be immediately obvious
- **Simplicity**: Minimize cognitive load, focus on the visualization
- **Consistency**: Uniform design language across all pages
- **Responsiveness**: Work seamlessly on desktop, tablet, and mobile
- **Accessibility**: Usable by everyone, including those with disabilities

### 1.2 User Goals
- Quickly understand how algorithms work
- Learn through visual exploration
- Practice for coding interviews
- Build algorithmic intuition

## 2. Color Palette

### 2.1 Light Theme

**Primary Colors**:
- Primary Blue: `#3b82f6` - Main actions, links
- Primary Dark: `#1e40af` - Hover states
- Primary Light: `#60a5fa` - Backgrounds, highlights

**Secondary Colors**:
- Success Green: `#10b981` - Completed states, correct
- Warning Orange: `#f59e0b` - Comparison states, attention
- Error Red: `#ef4444` - Errors, targets
- Info Purple: `#6366f1` - Information, sorted states

**Neutral Colors**:
- Background: `#ffffff`
- Surface: `#f9fafb`
- Border: `#e5e7eb`
- Text Primary: `#111827`
- Text Secondary: `#6b7280`
- Text Muted: `#9ca3af`

### 2.2 Dark Theme

**Primary Colors**:
- Primary Blue: `#60a5fa`
- Primary Dark: `#93c5fd`
- Primary Light: `#3b82f6`

**Secondary Colors**:
- Success Green: `#34d399`
- Warning Orange: `#fbbf24`
- Error Red: `#f87171`
- Info Purple: `#818cf8`

**Neutral Colors**:
- Background: `#0f172a`
- Surface: `#1e293b`
- Border: `#334155`
- Text Primary: `#f1f5f9`
- Text Secondary: `#cbd5e1`
- Text Muted: `#64748b`

## 3. Typography

### 3.1 Font Families

**Sans-Serif** (UI Text):
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Monospace** (Code):
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### 3.2 Type Scale

```css
/* Headings */
.text-h1 { font-size: 2.5rem;  line-height: 1.2; font-weight: 700; }
.text-h2 { font-size: 2rem;    line-height: 1.3; font-weight: 700; }
.text-h3 { font-size: 1.5rem;  line-height: 1.4; font-weight: 600; }
.text-h4 { font-size: 1.25rem; line-height: 1.4; font-weight: 600; }

/* Body */
.text-lg { font-size: 1.125rem; line-height: 1.75; }
.text-base { font-size: 1rem; line-height: 1.5; }
.text-sm { font-size: 0.875rem; line-height: 1.5; }
.text-xs { font-size: 0.75rem; line-height: 1.5; }

/* Code */
.text-code { font-size: 0.875rem; line-height: 1.7; }
```

## 4. Layout & Spacing

### 4.1 Spacing Scale (Tailwind)
```
0   = 0px
1   = 0.25rem  (4px)
2   = 0.5rem   (8px)
3   = 0.75rem  (12px)
4   = 1rem     (16px)
6   = 1.5rem   (24px)
8   = 2rem     (32px)
12  = 3rem     (48px)
16  = 4rem     (64px)
```

### 4.2 Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### 4.3 Container Widths
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

## 5. Page Layouts

### 5.1 Home Page

```
┌─────────────────────────────────────────────────┐
│  Header: [Logo] [Problems] [About] [Theme]     │
├─────────────────────────────────────────────────┤
│                                                 │
│              Hero Section                       │
│   Large Title: "Learn Algorithms Visually"     │
│   Subtitle: "Interactive visualizations..."     │
│   [Get Started] [Browse Problems]               │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│          Featured Problems Grid                 │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐      │
│   │ Card │  │ Card │  │ Card │  │ Card │      │
│   └──────┘  └──────┘  └──────┘  └──────┘      │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│          Category Browse                        │
│   [Arrays] [Trees] [Graphs] [DP] ...           │
│                                                 │
├─────────────────────────────────────────────────┤
│  Footer: [GitHub] [Contact] [Credits]          │
└─────────────────────────────────────────────────┘
```

### 5.2 Problems Page

```
┌─────────────────────────────────────────────────┐
│  Header                                         │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│   Filters    │      Problem Grid                │
│              │                                  │
│ Difficulty   │  ┌────────┐  ┌────────┐         │
│ □ Easy       │  │ #1     │  │ #2     │         │
│ □ Medium     │  │Two Sum │  │Add Two │         │
│ □ Hard       │  │[Easy]  │  │[Medium]│         │
│              │  └────────┘  └────────┘         │
│ Category     │                                  │
│ □ Array      │  ┌────────┐  ┌────────┐         │
│ □ Tree       │  │ #3     │  │ #4     │         │
│ □ Graph      │  │Longest │  │Median  │         │
│ ...          │  │[Medium]│  │[Hard]  │         │
│              │  └────────┘  └────────┘         │
│ [Search...]  │                                  │
│              │         [Load More]              │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

### 5.3 Visualization Page (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  Header                                              [Back]  │
├─────────────────────────────────────────────────────────────┤
│  #1. Two Sum                       [Easy]  [JS ▼] [Dark ⚡] │
├──────────────────────────┬──────────────────────────────────┤
│                          │                                  │
│   Visualization Panel    │      Code Panel                  │
│   ┌──────────────────┐  │   1  function twoSum(nums..     │
│   │                  │  │   2    const map = new Map()     │
│   │  [Canvas Area]   │  │ ►3    for (let i = 0; i <..     │
│   │                  │  │   4      const complement =..    │
│   │   Array/Tree/    │  │   5                              │
│   │   Graph render   │  │   6      if (map.has(comp..     │
│   │                  │  │   7        return [map.get..     │
│   │                  │  │   8      }                       │
│   └──────────────────┘  │   9                              │
│                          │  10      map.set(nums[i], i)    │
│   [◄◄] [◄] [▶] [▶▶]    │  11    }                         │
│   ━━━━●━━━━━━━━━━━      │  12  }                           │
│   Step 3/12   [1x ▼]    │                                  │
│                          │  Time:  O(n)                     │
│   Explanation:           │  Space: O(n)                     │
│   "Calculate complement  │                                  │
│   value: 9 - 2 = 7"      │                                  │
│                          │                                  │
├──────────────────────────┴──────────────────────────────────┤
│                                                             │
│  Problem Description                                        │
│  Given an array of integers `nums` and an integer           │
│  `target`, return indices of the two numbers such that...   │
│                                                             │
│  Example 1:                                                 │
│  Input: nums = [2,7,11,15], target = 9                     │
│  Output: [0,1]                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.4 Visualization Page (Mobile)

```
┌──────────────────────────┐
│  Header            [☰]   │
├──────────────────────────┤
│  #1. Two Sum      [Easy] │
│  [JS ▼]                  │
├──────────────────────────┤
│                          │
│  [Canvas Area]           │
│                          │
│    Visualization         │
│                          │
│                          │
├──────────────────────────┤
│ [◄◄] [◄] [▶] [▶▶] [1x]  │
│ ━━━━●━━━━━━━━━━━━        │
│ Step 3/12                │
├──────────────────────────┤
│ Explanation:             │
│ "Calculate complement"   │
├──────────────────────────┤
│ [Problem] [Code] [Info]  │
│                          │
│ <Selected Tab Content>   │
│                          │
└──────────────────────────┘
```

## 6. Component Designs

### 6.1 Problem Card

```
┌─────────────────────────────┐
│ #1. Two Sum           [Easy]│
│ Array • Hash Table          │
│                             │
│ Find two numbers that sum   │
│ to target value...          │
│                             │
│ [▶ Visualize]               │
└─────────────────────────────┘
```

**States**:
- Default: White/dark surface
- Hover: Subtle shadow, scale 1.02
- Clicked: Brief scale down animation

### 6.2 Control Panel

```
┌─────────────────────────────────────────┐
│  [⏮]  [◄]  [▶]  [⏭]       Speed: [1x ▼]│
│  ━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Step 5 / 12                            │
└─────────────────────────────────────────┘
```

**Buttons**:
- Skip to start: `⏮`
- Step backward: `◄`
- Play/Pause: `▶` / `⏸`
- Step forward: `►`
- Skip to end: `⏭`

**Speed Options**:
- 0.5x (Slow)
- 1x (Normal)
- 1.5x (Fast)
- 2x (Very Fast)

### 6.3 Code Display

```
┌──────────────────────────────────────┐
│ 1  function twoSum(nums, target) {   │
│ 2    const map = new Map();          │
│►3    for (let i = 0; i < nums.le..  │ ← Active line (highlighted)
│ 4      const complement = target..   │
│ 5                                    │
│ 6      if (map.has(complement)) {    │
│ 7        return [map.get(comple..    │
│ 8      }                             │
└──────────────────────────────────────┘
```

**Highlighting**:
- Active line: Background `#3b82f620`, left border `#3b82f6`
- Line numbers: `#9ca3af`, monospace

### 6.4 Explanation Panel

```
┌─────────────────────────────────────┐
│ Step 3: Calculate Complement        │
│                                     │
│ Calculate the complement value by   │
│ subtracting the current number      │
│ from the target: 9 - 2 = 7         │
│                                     │
│ Key Insight:                        │
│ If complement exists in map, we've  │
│ found our pair!                     │
└─────────────────────────────────────┘
```

### 6.5 Difficulty Badge

```css
/* Easy */
.badge-easy {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

/* Medium */
.badge-medium {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}

/* Hard */
.badge-hard {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}
```

### 6.6 Filter Sidebar

```
┌──────────────────┐
│ Filters          │
│                  │
│ Difficulty       │
│ ☑ Easy      (45) │
│ ☑ Medium    (63) │
│ ☐ Hard      (22) │
│                  │
│ Category         │
│ ☑ Array     (31) │
│ ☐ Tree      (24) │
│ ☐ Graph     (18) │
│ ☐ DP        (27) │
│ [Show more ▼]    │
│                  │
│ [Clear All]      │
└──────────────────┘
```

## 7. Animations & Transitions

### 7.1 Micro-interactions

**Button Hover**:
```css
.button {
  transition: all 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

**Card Hover**:
```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

**Page Transitions**:
- Fade in: 300ms
- Slide up: 400ms ease-out

### 7.2 Loading States

**Skeleton Screen**:
```
┌─────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓       ▓▓▓▓▓ │
│ ▓▓▓▓▓ ▓▓▓▓▓            │
│                         │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓          │
│                         │
│        ▓▓▓▓▓▓▓          │
└─────────────────────────┘
```

**Spinner**:
```css
.spinner {
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
```

## 8. Responsive Design

### 8.1 Breakpoint Behavior

**Desktop (lg+)**:
- Side-by-side layout (visualization + code)
- Full filter sidebar
- All controls visible

**Tablet (md)**:
- Stacked layout with tabs
- Collapsible filter sidebar
- Compact controls

**Mobile (sm)**:
- Single column
- Tabs for content switching
- Bottom sheet for filters
- Touch-friendly controls (min 44px tap targets)

### 8.2 Mobile Optimizations

- Larger touch targets (48px minimum)
- Swipe gestures for step navigation
- Bottom navigation for easier thumb reach
- Simplified visualizations (fewer elements)
- Collapsible sections to save space

## 9. Accessibility

### 9.1 Keyboard Navigation

**Global**:
- `Tab` / `Shift+Tab`: Navigate interactive elements
- `Enter` / `Space`: Activate buttons
- `Esc`: Close modals/dropdowns

**Visualization Page**:
- `Space`: Play/Pause
- `→`: Step forward
- `←`: Step backward
- `Home`: First step
- `End`: Last step
- `+`: Increase speed
- `-`: Decrease speed

### 9.2 Screen Reader Support

**ARIA Labels**:
```html
<button aria-label="Play animation">
  <PlayIcon />
</button>

<div role="slider"
     aria-label="Animation timeline"
     aria-valuenow="5"
     aria-valuemin="0"
     aria-valuemax="12">
</div>

<div role="status" aria-live="polite">
  Step 5: Checking if complement exists in map
</div>
```

### 9.3 Focus Indicators

```css
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### 9.4 Color Contrast

All text must meet WCAG AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

## 10. Error States

### 10.1 Empty States

**No Problems Found**:
```
┌─────────────────────────────┐
│         🔍                  │
│   No problems found         │
│   Try adjusting your        │
│   filters or search term    │
│                             │
│   [Clear Filters]           │
└─────────────────────────────┘
```

### 10.2 Error Messages

**Failed to Load**:
```
┌─────────────────────────────┐
│         ⚠️                  │
│   Failed to load problem    │
│   Please try again          │
│                             │
│   [Retry]                   │
└─────────────────────────────┘
```

## 11. Design System Checklist

- [ ] Color palette defined (light + dark)
- [ ] Typography scale established
- [ ] Spacing system consistent
- [ ] Component library created
- [ ] Icon set selected
- [ ] Animation timing standardized
- [ ] Accessibility guidelines documented
- [ ] Responsive breakpoints defined
- [ ] Loading states designed
- [ ] Error states designed
- [ ] Empty states designed
