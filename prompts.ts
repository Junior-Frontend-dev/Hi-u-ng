export const BASE_PROMPT_PREFIX = "Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a high-fidelity component that implements";

export const PROMPTS = {
  // ... (Previous prompts 1-200 remain unchanged) ...
  'parallax-basic': `${BASE_PROMPT_PREFIX} a **Cinematic Parallax Hero** section.
    
**Design Specs:**
- Use a high-quality landscape image (Unsplash) that covers 140% of the container height.
- As the user scrolls, translate the image vertically using \`transform: translate3d(0, scrollY * 0.5px, 0)\` for GPU acceleration.
- Overlay a glassmorphism card (backdrop-blur, delicate border) containing elegant typography.
- Ensure the scrolling is buttery smooth (consider \`requestAnimationFrame\`).
- Typography: Large serif headings mixed with monospaced accents.`,

  'parallax-multi': `${BASE_PROMPT_PREFIX} a **Multi-Layer 3D Parallax** scene.
    
**Design Specs:**
- Theme: Deep Space or Mystical Forest.
- Create 3-4 distinct layers using absolute positioning.
- Layer 1 (Background): Stars/Sky, moves very slowly (0.1x).
- Layer 2 (Middle): Planets/Mountains, moves at 0.4x.
- Layer 3 (Foreground): Text or Cards, moves at 1.0x or negative speed.
- Use CSS gradients and box-shadows to create "fake" volumetric lighting.
- Add subtle floating animations to the elements even when not scrolling.`,

  'horizontal-scroll': `${BASE_PROMPT_PREFIX} a **Horizontal Gallery Scroll**.
    
**Design Specs:**
- Create a parent container with \`h-[400vh]\`.
- Inside, a \`sticky top-0\` container holding a horizontal filmstrip of images.
- Logic: Map vertical scroll progress to horizontal translation (translateX 0% -> -300%).
- Visuals: High-contrast black and white imagery that gains color on hover.
- Add a custom cursor or "Scroll" indicator.
- Ensure the transition between vertical and horizontal feels magnetic.`,

  'scroll-trigger': `${BASE_PROMPT_PREFIX} a **Staggered Scroll Reveal** list.
    
**Design Specs:**
- Create a list of feature cards.
- Use \`IntersectionObserver\` to detect entry.
- Animation: Elements start \`opacity-0 translate-y-20 scale-95\` and transition to \`opacity-100 translate-y-0 scale-100\`.
- Easing: Use a custom cubic-bezier (e.g., \`cubic-bezier(0.2, 0.8, 0.2, 1)\`) for a premium feel.
- Add a slight delay based on index for the staggered effect.`,

  'scroll-snap': `${BASE_PROMPT_PREFIX} an **Immersive Scroll Snap** experience.
    
**Design Specs:**
- Container with \`snap-y snap-mandatory\`.
- 4 Full-screen sections, each with a rich, deep gradient background.
- Typography: Massive, centered headings (20vw size) that clip the background or use mix-blend-mode.
- Animations: When a section snaps into view, animate the text in (fade up + spacing increase).`,

  'scroll-progress': `${BASE_PROMPT_PREFIX} a **Modern Scroll Progress Master** indicator.
    
**Design Specs:**
- Create a high-fidelity long-form typography article in a deep purple dimension.
- Implement a multi-layer progress tracking system:
  1. A top gradient glow bar (Indigo-Purple-Pink).
  2. A floating circular glassmorphism widget with a percentage counter.
  3. Interactive side progress dots that react to section entry.
- Visuals: Super-sized headings, cinematic imagery, and 60FPS fluid animations.`,

  'scroll-reveal': `${BASE_PROMPT_PREFIX} a **Curtain Wipe Reveal**.
    
**Design Specs:**
- Two layers: A fixed bottom layer (Image) and a scrollable top layer (Solid Color/Text).
- As the user scrolls, use \`clip-path: inset(...)\` to slice it open.
- The bottom image should slightly scale down (zoom out) as it is revealed.
- Visuals: Bold, noir-style typography "UNVEILED" centered on the screen.`,

  'scroll-blur': `${BASE_PROMPT_PREFIX} a **Scroll-based Focus Shift**.
    
**Design Specs:**
- Sticky full-screen background image.
- As the user scrolls (0px to 500px), apply \`filter: blur(20px)\` to the background.
- Simultaneously, fade in a foreground card with clear text.
- This mimics a camera racking focus from the background scenery to the foreground subject.`,

  'scroll-scale': `${BASE_PROMPT_PREFIX} a **Portal Zoom-Out** effect.
    
**Design Specs:**
- Start with a media element filling the viewport (100vw, 100vh).
- As user scrolls, scale the element down to card size (scale 0.5) and increase border-radius (0px -> 40px).
- The text inside the hero should fade out, and new content should fade in around it.
- Use \`will-change: transform\` for performance.`,

  'scroll-rotation': `${BASE_PROMPT_PREFIX} a **Geometric Scroll Rotation**.
    
**Design Specs:**
- Place a large decorative ring/geometric shape in the center.
- Map scroll position to rotation degrees (1px = 0.5deg).
- Add smaller "satellites" orbiting the main ring at different speeds/directions.
- Visuals: Thin, technical lines (1px dashed borders), futuristic UI feel.`,

  'scroll-velocity': `${BASE_PROMPT_PREFIX} a **Velocity Skew** effect.
    
**Design Specs:**
- Create a list of large, repeated text lines (e.g. "VELOCITY").
- Calculate scroll velocity (delta Y).
- Apply skew transformation: \`transform: skewX(velocity * 0.1deg)\`.
- The skew should reset to 0 when scrolling stops.
- Clamp the maximum skew to avoid distortion.
- Visuals: Kinetic typography style, black and white.`,

  'scroll-stacking': `${BASE_PROMPT_PREFIX} a **Sticky Stacking Cards** section.
    
**Design Specs:**
- Create 4-5 cards with \`position: sticky; top: 20px\`.
- As the user scrolls, each card slides up and sticks on top of the previous one.
- Add a subtle scale down effect to the cards behind the current one for depth.
- Visuals: Colorful, distinct cards with shadows to show separation.`,

  'scroll-text-fill': `${BASE_PROMPT_PREFIX} a **Text Gradient Fill** effect.
    
**Design Specs:**
- Large paragraph of text with \`background-clip: text\`.
- The text color should be transparent or gray.
- The background should be a hard-stop gradient (Gray 50%, White 50%).
- Map scroll position to \`background-position-x\` to fill the text horizontally.`,

  'scroll-split': `${BASE_PROMPT_PREFIX} a **Split Screen Scroll**.
    
**Design Specs:**
- Two vertical panels taking up 50% width each.
- Left panel: Scrolls naturally (content moves up).
- Right panel: Scrolls in reverse (content moves down).
- This creates a mesmerizing shearing effect.
- Content: Matching image/text pairs that align at the center.`,

  'scroll-blend': `${BASE_PROMPT_PREFIX} a **Mix Blend Mode** transition.
    
**Design Specs:**
- Fixed white text "DIFFERENCE" in the center.
- Background starts black.
- Scrollable white sections slide over the text.
- Use \`mix-blend-mode: difference\` on the text so it turns black when over white sections.
- Visuals: Minimalist, Swiss design style.`,

  'scroll-line-reveal': `${BASE_PROMPT_PREFIX} a **Line-by-Line Text Reveal**.
    
**Design Specs:**
- Huge paragraph of text (sticky).
- Use \`background-clip: text\` with a vertical linear gradient.
- Gradient colors: Top is active color (white), Bottom is inactive color (gray-800).
- Animate \`background-position-y\` based on scroll percentage.
- The effect should look like the text is being illuminated line by line as the user scrolls down.`,

  'scroll-marquee': `${BASE_PROMPT_PREFIX} a **Scroll-Driven Horizontal Marquee**.
    
**Design Specs:**
- A stack of massive text lines (e.g., "CREATIVE", "DEVELOPMENT", "DESIGN").
- Alternating direction:
  - Odd lines move Left-to-Right.
  - Even lines move Right-to-Left.
- Map vertical scroll position to horizontal translation (translateX).
- The text should be much wider than the viewport (overflow).
- Typography: Extremely large (20vw), outline vs filled styles.`,

  'scroll-staggered-fill': `${BASE_PROMPT_PREFIX} a **Sequential Horizontal Text Fill**.
    
**Design Specs:**
- Sticky container with a poem or manifesto broken into separate lines.
- As the user scrolls, fill the text color of the first line from left to right.
- Once line 1 is done, immediately start filling line 2, then line 3, etc.
- Use \`background-clip: text\` with a hard-stop gradient or simply background-size on a text-masked element.
- Math: Map global scroll progress to individual line progress using CSS \`clamp\` and \`calc\`.`,

  // ... (Other prompts 19-260 implied or same as before) ...

  // --- INTERACTION & UX EXPERIMENTAL (261-280) ---

  'ux-hesitation': `${BASE_PROMPT_PREFIX} a **Mouse Hesitation Detector**.
**Design Specs:**
- Track mouse velocity and direction near a main CTA button.
- If the mouse hovers nearby but stops moving (hesitation) for >500ms, trigger a helper tooltip or pulse animation.
- "Don't know what to do? Click here."
- Subtle, empathetic UI.`,

  'ux-predictive': `${BASE_PROMPT_PREFIX} a **Predictive UI Animation**.
**Design Specs:**
- As the cursor moves towards a card, start the hover animation *before* the cursor actually hits it (proximity based).
- Creates a feeling of extreme responsiveness.
- Use distance calculation to map scale/lift.`,

  'ux-rhythm': `${BASE_PROMPT_PREFIX} a **Rhythm-Learning UI**.
**Design Specs:**
- Detect the tempo of user clicks.
- Adjust the speed of UI transitions to match.
- Fast clicker = snappy animations (0.2s). Slow clicker = languid animations (0.8s).
- Adaptive experience.`,

  'ux-pacing': `${BASE_PROMPT_PREFIX} an **Emotional Pacing UX**.
**Design Specs:**
- A multi-step form or narrative.
- Force a delay (loader/breathing animation) between steps to build anticipation.
- Then snap the next step in quickly for relief.
- Manipulate time perception.`,

  'ux-scroll-rhythm': `${BASE_PROMPT_PREFIX} a **Scroll Rhythm Sync**.
**Design Specs:**
- Background elements pulse or rotate.
- The pulse frequency syncs to the scroll velocity.
- Scrolling fast = high energy/bpm. Stopped = slow heartbeat.`,

  'ux-no-buttons': `${BASE_PROMPT_PREFIX} an **Interface Without Buttons**.
**Design Specs:**
- Navigate solely by dragging, swiping, or hovering.
- "Pull to refresh" style triggers for everything.
- Experimental gesture-first navigation.`,

  'ux-implicit': `${BASE_PROMPT_PREFIX} an **Implicit Interaction** layout.
**Design Specs:**
- No "Read More" buttons.
- Simply slowing down scroll over an item expands it.
- Gaze detection simulation (mouse hover duration).`,

  'ux-friction': `${BASE_PROMPT_PREFIX} a **UI with Intentional Friction**.
**Design Specs:**
- A "Delete" or "Confirm" action that requires effort.
- User must hold the button down for 3 seconds (filling a ring) to trigger.
- Adds weight to the decision.`,

  'ux-exploratory': `${BASE_PROMPT_PREFIX} an **Exploratory Navigation**.
**Design Specs:**
- A dark screen with scattered dim lights.
- User uses the cursor as a flashlight to find navigation nodes.
- No map, just discovery.`,

  'ux-resistance': `${BASE_PROMPT_PREFIX} a **Resistive UI Element**.
**Design Specs:**
- A draggable slider that has "weight" or "magnetic notches".
- It resists movement in certain zones (damping).
- Physical tactile feel via CSS transition timing.`,

  'ux-curiosity': `${BASE_PROMPT_PREFIX} a **Curiosity-Driven Reveal**.
**Design Specs:**
- A closed box or blurred shape.
- It shakes or glows slightly when ignored.
- Clicking opens it with a burst of confetti/particles.`,

  'ux-onetime': `${BASE_PROMPT_PREFIX} a **One-Time Interaction**.
**Design Specs:**
- An element that destroys itself after interaction (e.g., popping a bubble).
- It never comes back on the same session.
- Ephemeral UI.`,

  'ux-evolution': `${BASE_PROMPT_PREFIX} an **Evolving UI**.
**Design Specs:**
- Tracks "visit count" (mocked).
- Visit 1: Simple layout. Visit 5: Advanced/Dense layout.
- The UI grows up with the user.`,

  'ux-affordance': `${BASE_PROMPT_PREFIX} a **Hidden Affordance** design.
**Design Specs:**
- Clean text.
- Only when dragging the text does a "Share/Highlight" menu appear.
- Mimics iOS text selection but stylized.`,

  'ux-mystery': `${BASE_PROMPT_PREFIX} a **Progressive Mystery UX**.
**Design Specs:**
- A blurred background image.
- Each interaction (click, scroll section) clears a bit of the blur.
- The full image is the reward at the end.`,

  'ux-focus': `${BASE_PROMPT_PREFIX} an **Attention Focus** mode.
**Design Specs:**
- When a user hovers a paragraph, everything else on screen dims to 20% opacity.
- "Reading mode" activated automatically by attention.`,

  'ux-delayed': `${BASE_PROMPT_PREFIX} a **Delayed Gratification** effect.
**Design Specs:**
- Click a button. Nothing happens immediately.
- A fuse burns or a bar fills slowly.
- Then a massive, rewarding animation triggers.
- Building tension.`,

  'ux-memory': `${BASE_PROMPT_PREFIX} a **UI with Memory**.
**Design Specs:**
- A grid of tiles.
- Click a tile to flip it.
- If you reload (reset), the tiles stay flipped (mocked local state).
- The interface remembers your chaos.`,

  'ux-surprise': `${BASE_PROMPT_PREFIX} a **Broken Expectation** button.
**Design Specs:**
- A standard "Submit" button.
- When you try to click it, it dodges the cursor.
- Or it breaks into pieces.
- Playful frustration.`,

  'ux-storytelling': `${BASE_PROMPT_PREFIX} an **Interaction Story** container.
**Design Specs:**
- A character on screen.
- Dragging the character left/right moves them through a scene.
- The scrollbar is replaced by this drag interaction.`,

  // --- VISUAL IDENTITY & BRAND EFFECTS (281-300) ---

  'brand-morphing': `${BASE_PROMPT_PREFIX} a **Brand Color Morphing** background.
**Design Specs:**
- Smooth, continuous interpolation between brand colors (e.g., Blue -> Purple -> Pink).
- Use Mesh Gradient or WebGL fluid.
- The logo overlay adapts its contrast (white/black) based on the background brightness.`,

  'brand-living-logo': `${BASE_PROMPT_PREFIX} a **Living Logo** component.
**Design Specs:**
- An SVG logo.
- It blinks, stretches, or looks around periodically.
- Reacts to mouse proximity (shies away or leans in).`,

  'brand-reactive': `${BASE_PROMPT_PREFIX} a **Reactive Identity** system.
**Design Specs:**
- Brand elements (shapes, colors) shift based on user behavior.
- Fast scrolling = Energetic/Spiky shapes.
- Idle = Round/Soft shapes.`,

  'brand-reconstruct': `${BASE_PROMPT_PREFIX} a **Logo Reconstruction** animation.
**Design Specs:**
- On load, the logo flies in as separate geometric primitives.
- They assemble with a magnetic snap effect.
- Solid, heavy physics feel.`,

  'brand-motion-lang': `${BASE_PROMPT_PREFIX} a **Brand Motion Language** showcase.
**Design Specs:**
- 3 distinct motion curves: "Professional" (Ease), "Playful" (Bounce), "Urgent" (Linear).
- Apply them to cards side-by-side to define the brand feel.`,

  'brand-distortion': `${BASE_PROMPT_PREFIX} an **Identity Distortion** effect.
**Design Specs:**
- Apply heavy glitch or wave distortion to the brand name.
- It remains legible but stylized.
- "Signal" or "Broadcast" aesthetic.`,

  'brand-patterns': `${BASE_PROMPT_PREFIX} a **Procedural Brand Pattern**.
**Design Specs:**
- Use a canvas to generate a tiling pattern of the logo mark.
- Randomize rotation and scale slightly for a unique texture each time.`,

  'brand-sound': `${BASE_PROMPT_PREFIX} a **Sonic Identity** visualizer.
**Design Specs:**
- A visual waveform that represents the brand's "sound" (voice).
- It modulates in idle state.
- Hovering amplifies the wave.`,

  'brand-typography': `${BASE_PROMPT_PREFIX} a **Brand Typography Motion** system.
**Design Specs:**
- The brand typeface.
- Animate the variable font axes (Weight, Slant) continuously.
- The text feels like it is breathing the brand's personality.`,

  'brand-reveal': `${BASE_PROMPT_PREFIX} an **Interactive Logo Reveal**.
**Design Specs:**
- Screen is covered in "fog" or scratch-off texture.
- User must scrub the screen to reveal the brand logo underneath.
- Engagement requirement.`,

  'brand-depth': `${BASE_PROMPT_PREFIX} a **Brand Depth Illusion**.
**Design Specs:**
- Layer the logo parts (Icon, Text, Tagline) at different Z-depths.
- Mouse movement creates a parallax effect, giving the logo physical volume.`,

  'brand-negative': `${BASE_PROMPT_PREFIX} a **Negative Space Identity**.
**Design Specs:**
- A dense field of patterns/objects.
- The logo is formed by the *absence* of objects in the center.
- Gestalt principle design.`,

  'brand-disintegrate': `${BASE_PROMPT_PREFIX} a **Logo Disintegration**.
**Design Specs:**
- Click the logo to vaporize it into particles.
- It re-forms slowly after a delay.
- Thanos-snap style.`,

  'brand-environment': `${BASE_PROMPT_PREFIX} a **Brand Environment** walk-through.
**Design Specs:**
- 3D scene using the brand's colors and shapes as architecture.
- Camera slowly drifts through this abstract office/space.`,

  'brand-time': `${BASE_PROMPT_PREFIX} a **Time-Reactive Brand**.
**Design Specs:**
- Day Mode: Sharp, professional, blue/white.
- Night Mode: Neon, relaxed, purple/black.
- The logo shape itself might relax (rounded corners) at night.`,

  'brand-physics': `${BASE_PROMPT_PREFIX} a **Physics-Driven Identity**.
**Design Specs:**
- Drop multiple copies of the logo into a container.
- They collide and pile up.
- Drag them around to play.`,

  'brand-random': `${BASE_PROMPT_PREFIX} a **Randomized Brand Intro**.
**Design Specs:**
- 5 different animation sequences for the logo.
- Pick one randomly on mount.
- Keeps the experience fresh.`,

  'brand-exploration': `${BASE_PROMPT_PREFIX} an **Exploration Reveal**.
**Design Specs:**
- Brand values (Integrity, Boldness, etc.) hidden in a 3D cloud.
- User rotates the cloud to find and align the words.`,

  'brand-silent': `${BASE_PROMPT_PREFIX} a **Silent Story** layout.
**Design Specs:**
- No text.
- Only images and colors convey the brand mood.
- Abstract emotional connection.`,

  'brand-experience': `${BASE_PROMPT_PREFIX} a **Total Brand Experience**.
**Design Specs:**
- The cursor, scroll bar, and loaders are all branded micro-elements.
- A cohesive, immersive world where every pixel is "on brand".`
};