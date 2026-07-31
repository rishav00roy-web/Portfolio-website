# Extra Projects / Technical Experiments Section

This module introduces a dedicated section on the portfolio page to showcase side projects, open-source utilities, and prototypes separate from the primary paid commercial projects.

## Implementation Details
- **Component**: `src/components/ExtraProjects.tsx` (rendered between `Projects` and `About` in `src/App.tsx`).
- **Interactive Tab Menu**: 
  - Allows users to select and toggle between different projects.
  - Features a custom sliding background highlight using Framer Motion's `layoutId="activeExtraTab"` for layout-animated tab shifting.
- **Responsive Stacking**: 
  - Stacks vertically on mobile and small tablets, keeping a clean layout.
  - Spreads into a side-by-side grid (35% menu, 65% details panel) on large screens (`lg:` viewport).
- **Details Transition**: 
  - Framer Motion's `<AnimatePresence mode="wait">` transitions details smoothly using `x` offset slides and opacity fades.
- **Visual Glow Accent**: 
  - Renders a dynamic radial background glow behind the active project matching the project's accent color (e.g. emerald green for the Gym CRM, blue for the Developer Portfolio).
- **Tech Tags**:
  - Highlights specific tools, languages, and frameworks used in the prototype.
- **SVG Social Links**:
  - Direct links to GitHub repositories and live deployments using custom inline SVG shapes and Lucide arrows.

## Cured Content
1. **Gym CRM (Offline Local-First)**:
   - *Description*: Offline-first membership management tool designed to run locally in basement gyms with spotty cell coverage. Features Tesseract.js OCR, IndexedDB replication, and offline queues.
   - *Accent*: `#10B981` (Emerald)
2. **Personal Portfolio V2**:
   - *Description*: Rishav Roy's developer portfolio featuring high-fidelity custom animations and control flow.
   - *Accent*: `#3B82F6` (Blue)
