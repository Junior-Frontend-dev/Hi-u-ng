// FULL PROMPTS FOR ALL EFFECTS

// --- VIETNAM SPECIAL ---
export const PROMPTS_FULL = {
  'vietnam-flag': `Create a highly detailed, 60fps canvas simulation of the Vietnamese flag waving in the wind with cloth physics, specular lighting, and golden "glory" particles rising from the bottom.`,

  'vietnam-drum': `Generate an intricate, procedural bronze drum face (Dong Son culture) using HTML5 Canvas. Implement a metallic shader effect, rotating geometric rings, and mouse-interactive lighting.`,

  // --- SCROLL EFFECTS (1-28) ---
  'parallax-basic': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Cinematic Parallax Hero section.
    
**Design Specs:**
- Use a high-quality landscape image (Unsplash) that covers 140% of the container height.
- As the user scrolls, translate the image vertically using transform: translate3d(0, scrollY * 0.5px, 0) for GPU acceleration.
- Overlay a glassmorphism card (backdrop-blur, delicate border) containing elegant typography.
- Ensure the scrolling is buttery smooth (consider requestAnimationFrame).
- Typography: Large serif headings mixed with monospaced accents.`,

  'parallax-multi': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Multi-Layer 3D Parallax scene.
    
**Design Specs:**
- Theme: Deep Space or Mystical Forest.
- Create 3-4 distinct layers using absolute positioning.
- Layer 1 (Background): Stars/Sky, moves very slowly (0.1x).
- Layer 2 (Middle): Planets/Mountains, moves at 0.4x.
- Layer 3 (Foreground): Text or Cards, moves at 1.0x or negative speed.
- Use CSS gradients and box-shadows to create "fake" volumetric lighting.
- Add subtle floating animations to the elements even when not scrolling.`,

  'horizontal-scroll': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Horizontal Gallery Scroll.
    
**Design Specs:**
- Create a parent container with h-[400vh].
- Inside, a sticky top-0 container holding a horizontal filmstrip of images.
- Logic: Map vertical scroll progress to horizontal translation (translateX 0% -> -300%).
- Visuals: High-contrast black and white imagery that gains color on hover.
- Add a custom cursor or "Scroll" indicator.
- Ensure the transition between vertical and horizontal feels magnetic.`,

  'scroll-trigger': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Staggered Scroll Reveal list.
    
**Design Specs:**
- Create a list of feature cards.
- Use IntersectionObserver to detect entry.
- Animation: Elements start opacity-0 translate-y-20 scale-95 and transition to opacity-100 translate-y-0 scale-100.
- Easing: Use a custom cubic-bezier (e.g., cubic-bezier(0.2, 0.8, 0.2, 1)) for a premium feel.
- Add a slight delay based on index for the staggered effect.`,

  'scroll-snap': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create an Immersive Scroll Snap experience.
    
**Design Specs:**
- Container with snap-y snap-mandatory.
- 4 Full-screen sections, each with a rich, deep gradient background.
- Typography: Massive, centered headings (20vw size) that clip the background or use mix-blend-mode.
- Animations: When a section snaps into view, animate the text in (fade up + spacing increase).`,

  'progress-indicator': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Modern Scroll Progress indicator.
    
**Design Specs:**
- Create a long-form typography article.
- Add two indicators:
  1. A top gradient line that fills width.
  2. A floating circular SVG widget in the bottom right that fills the stroke-dasharray.
- The SVG widget should have a glassmorphism background and update smoothly using RAF.`,

  'scroll-reveal': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Curtain Wipe Reveal.
    
**Design Specs:**
- Two layers: A fixed bottom layer (Image) and a scrollable top layer (Solid Color/Text).
- As the user scrolls, use clip-path: inset(...) to slice it open.
- The bottom image should slightly scale down (zoom out) as it is revealed.
- Visuals: Bold, noir-style typography "UNVEILED" centered on the screen.`,

  'scroll-blur': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Scroll-based Focus Shift.
    
**Design Specs:**
- Sticky full-screen background image.
- As the user scrolls (0px to 500px), apply filter: blur(20px) to the background.
- Simultaneously, fade in a foreground card with clear text.
- This mimics a camera racking focus from the background scenery to the foreground subject.`,

  'scroll-scale': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Portal Zoom-Out effect.
    
**Design Specs:**
- Start with a media element filling the viewport (100vw, 100vh).
- As user scrolls, scale the element down to card size (scale 0.5) and increase border-radius (0px -> 40px).
- The text inside the hero should fade out, and new content should fade in around it.
- Use will-change: transform for performance.`,

  'scroll-rotation': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Geometric Scroll Rotation.
    
**Design Specs:**
- Place a large decorative ring/geometric shape in the center.
- Map scroll position to rotation degrees (1px = 0.5deg).
- Add smaller "satellites" orbiting the main ring at different speeds/directions.
- Visuals: Thin, technical lines (1px dashed borders), futuristic UI feel.`,

  'scroll-velocity': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Velocity Skew effect.
    
**Design Specs:**
- Create a list of large, repeated text lines (e.g. "VELOCITY").
- Calculate scroll velocity (delta Y).
- Apply skew transformation: transform: skewX(velocity * 0.1deg).
- The skew should reset to 0 when scrolling stops.
- Clamp the maximum skew to avoid distortion.
- Visuals: Kinetic typography style, black and white.`,

  'scroll-stacking': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Sticky Stacking Cards section.
    
**Design Specs:**
- Create 4-5 cards with position: sticky; top: 20px.
- As the user scrolls, each card slides up and sticks on top of the previous one.
- Add a subtle scale down effect to the cards behind the current one for depth.
- Visuals: Colorful, distinct cards with shadows to show separation.`,

  'scroll-text-fill': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Text Gradient Fill effect.
    
**Design Specs:**
- Large paragraph of text with background-clip: text.
- The text color should be transparent or gray.
- The background should be a hard-stop gradient (Gray 50%, White 50%).
- Map scroll position to background-position-x to fill the text horizontally.`,

  'scroll-split': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Split Screen Scroll.
    
**Design Specs:**
- Two vertical panels taking up 50% width each.
- Left panel: Scrolls naturally (content moves up).
- Right panel: Scrolls in reverse (content moves down).
- This creates a mesmerizing shearing effect.
- Content: Matching image/text pairs that align at the center.`,

  'scroll-blend': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Mix Blend Mode transition.
    
**Design Specs:**
- Fixed white text "DIFFERENCE" in the center.
- Background starts black.
- Scrollable white sections slide over the text.
- Use mix-blend-mode: difference on the text so it turns black when over white sections.
- Visuals: Minimalist, Swiss design style.`,

  'scroll-line-reveal': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Line-by-Line Text Reveal.
    
**Design Specs:**
- Huge paragraph of text (sticky).
- Use background-clip: text with a vertical linear gradient.
- Gradient colors: Top is active color (white), Bottom is inactive color (gray-800).
- Animate background-position-y based on scroll percentage.
- The effect should look like the text is being illuminated line by line as the user scrolls down.`,

  'scroll-marquee': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Scroll-Driven Horizontal Marquee.
    
**Design Specs:**
- A stack of massive text lines (e.g., "CREATIVE", "DEVELOPMENT", "DESIGN").
- Alternating direction:
  - Odd lines move Left-to-Right.
  - Even lines move Right-to-Left.
- Map vertical scroll position to horizontal translation (translateX).
- The text should be much wider than the viewport (overflow).
- Typography: Extremely large (20vw), outline vs filled styles.`,

  'scroll-staggered-fill': `Act as a world-class creative frontend engineer. Using React, Tailwind CSS, and Framer Motion (optional but preferred for smoothness), create a Sequential Horizontal Text Fill.
    
**Design Specs:**
- Sticky container with a poem or manifesto broken into separate lines.
- As the user scrolls, fill the text color of the first line from left to right.
- Once line 1 is done, immediately start filling line 2, then line 3, etc.
- Use background-clip: text with a hard-stop gradient or simply background-size on a text-masked element.
- Math: Map global scroll progress to individual line progress using CSS clamp and calc.`,

  // --- CURSOR EFFECTS (29-55) ---
  'cursor-custom': `Create a custom cursor component using React. Replace the native cursor with a small dot that has a trailing ring. The dot follows mouse position exactly, while the ring has a slight delay with easing. Both elements should have pointer-events: none and be fixed position. Style the cursor with a subtle glow and ensure it hides when the mouse leaves the viewport.`,

  'cursor-follower': `Create a cursor follower component with spring physics. The cursor should have a "follower" circle that lags behind the actual mouse position using lerp (linear interpolation). Add a slight scale animation when hovering over clickable elements. Use requestAnimationFrame for smooth 60fps updates.`,

  'cursor-magnetic': `Create a magnetic cursor effect where buttons and links subtly move towards the cursor when it's nearby. Use distance calculation to determine the magnetic pull. Apply a spring animation for the "snap" effect. Ensure the cursor maintains its position and only elements move.`,

  'cursor-distortion': `Create a hover distortion effect using SVG filters or CSS clip-path. When hovering over an image, apply a liquid displacement effect. Use an SVG displacement map filter that follows the cursor position. Animate the displacement scale based on cursor velocity.`,

  'cursor-reveal': `Create a flashlight/reveal effect where the cursor acts as a light source. Use a radial gradient mask or clip-path to reveal content underneath. The mask should follow the cursor position and have a soft edge. Content is initially hidden by a dark overlay.`,

  'cursor-blend': `Create a cursor with mix-blend-mode difference. The cursor inverts the colors of everything underneath it. Use a circular cursor with a contrasting color (white/black). Apply pointer-events: none to ensure normal interaction.`,

  'cursor-trail': `Create a particle trail system that follows the cursor. Generate small particles at the cursor position on mousemove. Particles should fade out and shrink over time. Use a canvas or DOM elements for rendering with requestAnimationFrame.`,

  'cursor-ripple': `Create a click ripple effect that emanates from the cursor position on click. Use a radial gradient that expands and fades out. Trigger the animation at the exact click coordinates. Support multiple simultaneous ripples.`,

  'cursor-scale': `Create a context-aware cursor that changes size/shape based on the hovered element. Hovering a button makes it larger. Hovering a link creates a different shape. Use smooth transitions between states. Add a blend mode for visual interest.`,

  'cursor-tooltip': `Create a floating tooltip that follows the cursor with a slight delay. Display relevant information about the hovered element. Use a glassmorphism background. Position the tooltip above the cursor with smart boundary detection.`,

  'cursor-spotlight': `Create a spotlight effect using CSS gradients. The background is dark with a reveal area around the cursor. Use a radial gradient with hard stops to create a "hole" effect. Add a subtle glow at the cursor edges.`,

  'cursor-gravity': `Create a gravity effect where elements are attracted to the cursor. Small items or particles slowly drift towards the mouse. Use physics simulation with velocity and acceleration. Apply friction so they eventually settle.`,

  'cursor-tilt': `Create a 3D tilt effect on cards based on cursor position. Calculate the tilt angle from the cursor position relative to the card center. Apply transform: rotateX() and rotateY(). Add a reflection or glare layer.`,

  'cursor-noise': `Create a noise texture reveal on hover. Use an SVG noise filter or canvas noise pattern. The noise should follow the cursor as a brush reveal. Add grainy texture to images or text.`,

  'cursor-morph': `Create a morphing cursor that deforms based on velocity. At rest, it's a perfect circle. Moving fast stretches it into an oval. Use skew or scale transforms to achieve the effect. Smoothly return to circle when stopped.`,

  // --- TYPOGRAPHY EFFECTS (56-80) ---
  'type-split': `Create a staggered character reveal animation. Split text into individual characters with spans. Animate each character with a fade and slide up effect. Add a slight delay between each character for the staggered look.`,

  'type-mask': `Create a text masking reveal effect. Use clip-path or background-clip to reveal text through an image or gradient. Animate the mask position on scroll or hover. Add smooth transitions for a premium feel.`,

  'type-stroke': `Create an outline text animation. Use text-stroke CSS property or SVG text with stroke. Animate stroke-dashoffset to draw the outline. Fill the text after the outline is complete.`,

  'type-fill': `Create a liquid text fill effect. Use a gradient background with background-clip: text. Animate background-position to fill the text from bottom to top. Add a wave animation for a fluid feel.`,

  'type-variable': `Create a variable font animation. Use a font with weight/width axes. Animate the font-weight or font-stretch continuously. Add a subtle breathing rhythm to the animation.`,

  'type-3d': `Create a 3D layered text effect. Duplicate text multiple times with slight offsets. Each layer has a different color/opacity. Apply a rotation or parallax effect on mouse move.`,

  'type-kinetic': `Create chaotic kinetic typography. Large text that rotates and scales unpredictably. Use random values for animation parameters. Add a sense of controlled chaos.`,

  'type-typewriter': `Create a typewriter effect. Display characters one at a time with a blinking cursor. Support multiple lines and sentences. Add variable typing speed for realism.`,

  'type-distortion': `Create a glitch text effect. Randomly offset characters horizontally. Apply RGB split for a digital distortion look. Trigger the glitch on hover or continuously.`,

  'type-displacement': `Create a fisheye text effect. Use CSS transform: scale() to distort text. Make the center larger than the edges. Animate the effect on hover.`,

  // --- LAYOUT & VISUAL TRICKS (81-95) ---
  'layout-asymmetrical': `Create an asymmetrical grid layout. Use CSS Grid with irregular column spans. Overlap elements intentionally. Add smooth transitions for responsive behavior.`,

  'layout-broken-grid': `Create a broken grid layout. Elements should break out of their containers. Use negative margins and overlapping z-indices. Add a modern, edgy aesthetic.`,

  'layout-overlapping': `Create overlapping card sections. Use z-index layering with sticky positioning. Add subtle shadows to distinguish layers. Ensure content remains accessible.`,

  'layout-sticky': `Create a sticky sidebar layout. Sidebar content sticks while main content scrolls. Add smooth transitions for the sticky effect. Use IntersectionObserver for control.`,

  'layout-fullscreen': `Create full-screen snap sections. Use scroll-snap-type: y mandatory. Each section is 100vh. Add smooth snap animations.`,

  'visual-masking': `Create CSS masking effects. Use mask-image with gradients or images. Animate mask position for reveal effects. Support multiple mask layers.`,

  'visual-image-reveal': `Create image reveal on hover. Use clip-path or transform for reveal animation. Add smooth easing to the animation. Support different reveal directions.`,

  'visual-clip-path': `Create geometric clip-path transitions. Use polygon or circle clip-paths. Animate between different shapes. Add smooth morphing between states.`,

  'visual-glassmorphism': `Create frosted glass UI elements. Use backdrop-filter: blur(). Add subtle borders and shadows. Support dark and light backgrounds.`,

  'visual-neumorphism': `Create soft extruded UI elements. Use dual box-shadows (light and dark). Add subtle highlights and shadows. Support interactive states.`,

  'visual-brutalist': `Create neo-brutalist design elements. Use bold borders and high contrast colors. Add offset shadows and raw aesthetics. Support interactive hover states.`,

  'visual-cinematic': `Create cinematic dark UI. Use deep shadows and dramatic lighting. Add subtle glow effects and gradients. Support video backgrounds.`,

  'visual-noise': `Create animated film grain overlay. Use a noise texture with opacity. Animate the texture position or use multiple layers. Add a vintage/film aesthetic.`,

  'visual-theme-switch': `Create dynamic theme switching. Use CSS custom properties for colors. Add smooth transition animations. Support instant and gradual switches.`,

  'visual-inversion': `Create color inversion on scroll. Use mix-blend-mode for color effects. Map scroll position to invert amount. Add smooth transitions.`,

  // --- EXPERIMENTAL & SIGNATURE (96-100) ---
  'experimental-audio': `Create audio-reactive visualizations. Use Web Audio API to analyze sound. Create canvas-based visualizations that pulse with the beat. Support microphone input or audio files.`,

  'experimental-time': `Create day/night cycle effects. Use CSS gradients for sky transitions. Animate colors based on time of day. Add sun/moon positioning.`,

  'experimental-ai': `Create generative art patterns. Use canvas for procedural generation. Create complex, evolving patterns. Support mouse interaction for variations.`,

  'experimental-story': `Create scrollytelling narrative. Use scroll position to control story progression. Add smooth transitions between story beats. Use animations to reveal content.`,

  'experimental-timeline': `Create vertical timeline visualization. Animate timeline items on scroll. Add connecting lines and markers. Support rich media content.`,

  // --- ADVANCED SCROLL (101-120) ---
  'scroll-camera': `Create 3D camera fly-through effect. Use perspective and transforms to simulate depth. Animate camera position on scroll. Add parallax between elements.`,

  'scroll-assembly': `Create object assembly animation. Parts fly in from different directions. Assemble into a final shape on scroll. Add smooth easing and physics.`,

  'scroll-timeline-reveal': `Create timeline path drawing. Use SVG stroke-dasharray animation. Draw the path as user scrolls. Add markers and content at points.`,

  'scroll-audio': `Create audio playback control via scroll. Use Web Audio API for audio control. Map scroll position to playback time. Add visual waveform display.`,

  'scroll-shader': `Create liquid distortion shader effect. Use WebGL or Canvas for shaders. Distort content based on scroll. Add complex fluid simulations.`,

  'scroll-freeze': `Create sticky section with internal animation. Content pauses scrolling while animating internally. Resume scroll when animation completes. Add smooth transitions.`,

  'scroll-morph-logo': `Create morphing logo on scroll. Use SVG path morphing. Transition between logo states. Add smooth interpolation.`,

  'scroll-slicing': `Create page slicing effect. Split viewport into horizontal strips. Animate strips at different speeds. Add reveal effects between slices.`,

  'scroll-depth-stack': `Create 3D card stacking tunnel. Use CSS 3D transforms. Stack cards in z-space on scroll. Add perspective and depth.`,

  'scroll-zoom-world': `Create zoom from macro to massive scale. Start close, zoom out to reveal context. Use scale and opacity transitions. Add smooth easing.`,

  // --- ADVANCED CURSOR (121-140) ---
  'cursor-physics': `Create cursor with physics simulation. Add mass and velocity to cursor. Implement collision detection. Add bounce and friction effects.`,

  'cursor-liquid': `Create liquid displacement effect. Use WebGL for fluid simulation. Distort content like water. Add interaction ripples.`,

  'cursor-hover-gravity': `Create grid points attracted to cursor. Use canvas for particle system. Particles drift toward mouse. Add attraction and repulsion zones.`,

  'cursor-displacement-map': `Create image warp effect. Use displacement map texture. Warp images based on cursor. Add smooth interpolation.`,

  'cursor-spotlight-video': `Create video reveal with light. Use radial gradient masks. Reveal video where cursor "shines". Add soft edges and glow.`,

  'cursor-sound': `Create audio feedback cursor. Use Web Audio API for sounds. Generate sounds based on movement. Add pitch and volume variation.`,

  'cursor-parallax-depth': `Create holographic 3D parallax. Use multiple image layers. Parallax between layers on mouse move. Add depth perception.`,

  'cursor-speed-scale': `Create velocity-based deformation. Scale cursor based on speed. Stretch when moving fast. Reset when stopped.`,

  'cursor-magnetic-text': `Create magnetic text characters. Each letter attracted to cursor. Add physics simulation. Support word-level grouping.`,

  'cursor-reveal-ui': `Create fog of war reveal. Hide UI behind darkness. Reveal as cursor approaches. Add smooth gradient transitions.`,

  // --- MOTION & ANIMATION (141-160) ---
  'motion-reverse': `Create reverse scroll animation. Play animation forward on scroll down. Play backward on scroll up. Add smooth interpolation.`,

  'motion-breathing': `Create infinite pulse animation. Scale element up and down rhythmically. Add subtle rotation. Use ease-in-out timing.`,

  'motion-blur-ui': `Create motion blur effect. Blur elements based on speed. Use directional blur filter. Add speed-based intensity.`,

  'motion-offset': `Create temporal offset animations. Add staggered delays between elements. Use noise for organic feel. Animate sequentially.`,

  'motion-layout-shift': `Create layout shift animation. Animate grid positions. Add smooth transitions between states. Support responsive layouts.`,

  'motion-elastic': `Create elastic snap animation. Use spring physics. Add overshoot and bounce. Support various easing curves.`,

  'motion-liquid-morph': `Create liquid morph transitions. Use SVG path morphing. Transition between shapes smoothly. Add gooey filter effects.`,

  'motion-noise': `Create Perlin noise animation. Use noise for organic movement. Animate values smoothly. Support multiple layers.`,

  'motion-hand-drawn': `Create frame-by-frame animation. Add "boiling" line effect. Use rough.js or similar. Create sketchy aesthetic.`,

  'motion-minimal': `Create subtle, rich animations. Use small transforms and opacities. Add delayed sequencing. Create refined feel.`,

  'motion-typo-story': `Create kinetic typography story. Animate words to match meaning. Add dramatic timing. Support text variations.`,

  'motion-sync': `Create beat-synced animations. Use Web Audio API for analysis. Pulse animations with music. Add visualizer elements.`,

  'motion-guide': `Create attention guide animation. Animate element to draw eye. Add smooth motion paths. Support complex sequences.`,

  'motion-easing': `Create emotional easing showcase. Demonstrate different easing curves. Add comparison views. Show timing differences.`,

  'motion-bloom': `Create ink bloom effect. Animate spreading ink trails. Use gradient and blur filters. Add organic growth.`,

  'motion-blur-reveal': `Create blur-to-focus reveal. Start with heavy blur. Animate to clear. Add smooth transition.`,

  'motion-afterimage': `Create ghost trail effect. Keep previous frames visible. Fade out slowly. Support motion blur.`,

  'motion-physics-collapse': `Create physics-based collapse. Use rigid body simulation. Elements fall and collide. Add gravity effects.`,

  'motion-time': `Create time-based animation. Evolve without user input. Use continuous updates. Add day/night cycles.`,

  'motion-cut': `Create cinematic cut transitions. Hard instant changes. Use cross-dissolves. Add flash effects.`,

  // --- UX & BRAND (261-300) ---
  'ux-hesitation': `Act as a world-class creative frontend engineer. Create a Mouse Hesitation Detector.
**Design Specs:**
- Track mouse velocity and direction near a main CTA button.
- If the mouse hovers nearby but stops moving (hesitation) for >500ms, trigger a helper tooltip or pulse animation.
- "Don't know what to do? Click here."
- Subtle, empathetic UI.`,

  'ux-predictive': `Act as a world-class creative frontend engineer. Create a Predictive UI Animation.
**Design Specs:**
- As the cursor moves towards a card, start the hover animation *before* the cursor actually hits it (proximity based).
- Creates a feeling of extreme responsiveness.
- Use distance calculation to map scale/lift.`,

  'ux-rhythm': `Act as a world-class creative frontend engineer. Create a Rhythm-Learning UI.
**Design Specs:**
- Detect the tempo of user clicks.
- Adjust the speed of UI transitions to match.
- Fast clicker = snappy animations (0.2s). Slow clicker = languid animations (0.8s).
- Adaptive experience.`,

  'ux-pacing': `Act as a world-class creative frontend engineer. Create an Emotional Pacing UX.
**Design Specs:**
- A multi-step form or narrative.
- Force a delay (loader/breathing animation) between steps to build anticipation.
- Then snap the next step in quickly for relief.
- Manipulate time perception.`,

  'ux-scroll-rhythm': `Act as a world-class creative frontend engineer. Create a Scroll Rhythm Sync.
**Design Specs:**
- Background elements pulse or rotate.
- The pulse frequency syncs to the scroll velocity.
- Scrolling fast = high energy/bpm. Stopped = slow heartbeat.`,

  'brand-morphing': `Act as a world-class creative frontend engineer. Create a Brand Color Morphing background.
**Design Specs:**
- Smooth, continuous interpolation between brand colors (e.g., Blue -> Purple -> Pink).
- Use Mesh Gradient or WebGL fluid.
- The logo overlay adapts its contrast (white/black) based on the background brightness.`,

  'brand-living-logo': `Act as a world-class creative frontend engineer. Create a Living Logo component.
**Design Specs:**
- An SVG logo.
- It blinks, stretches, or looks around periodically.
- Reacts to mouse proximity (shies away or leans in).`,

  'brand-reactive': `Act as a world-class creative frontend engineer. Create a Reactive Identity system.
**Design Specs:**
- Brand elements (shapes, colors) shift based on user behavior.
- Fast scrolling = Energetic/Spiky shapes.
- Idle = Round/Soft shapes.`,

  'brand-reconstruct': `Act as a world-class creative frontend engineer. Create a Logo Reconstruction animation.
**Design Specs:**
- On load, the logo flies in as separate geometric primitives.
- They assemble with a magnetic snap effect.
- Solid, heavy physics feel.`,

  'brand-motion-lang': `Act as a world-class creative frontend engineer. Create a Brand Motion Language showcase.
**Design Specs:**
- 3 distinct motion curves: "Professional" (Ease), "Playful" (Bounce), "Urgent" (Linear).
- Apply them to cards side-by-side to define the brand feel.`,

  // --- NEW ARRIVALS (301-310) ---
  'scroll-3d-grid': `Create a retro vaporwave style 3D grid tunnel that moves towards the camera on scroll. Use perspective and transforms. Add neon colors and gradient floors.`,

  'scroll-parallax-zoom': `Implement a multi-layer photo zoom effect where the foreground expands faster than the background. Use CSS transforms for parallax. Add smooth easing.`,

  'cursor-magnetic-links': `Create navigation links that magnetically snap to the cursor position with a spring animation. Use distance calculation. Add elastic physics.`,

  'text-neon-flicker': `Simulate a broken neon sign with randomized flickering intensity and glow effects. Use CSS animation with random delays. Add realistic flicker patterns.`,

  'visual-glitch-image': `Apply an RGB split and horizontal slice distortion to an image on mouse hover. Use CSS transform and filter. Add glitch timing variations.`,

  'motion-path-follow': `Animate a small object (like a car or dot) following a curved SVG path based on scroll percentage. Use offset-path CSS property. Add smooth progression.`,

  'three-particle-terrain': `Generate a 3D terrain map using thousands of particles that undulate like waves. Use Three.js or canvas. Add lighting and depth.`,

  'brand-logo-morph': `Morph a simple circle icon into a square, then a triangle, using SVG path interpolation. Use CSS transitions or JavaScript. Add smooth intermediate states.`,

  'ux-micro-interaction': `Create a Twitter-like heart animation with exploding colorful particles upon clicking. Use canvas for particles. Add physics and gravity.`,

  'experimental-noise-field': `Visualize a flow field using Perlin noise where particles trail and follow invisible vectors. Use canvas for rendering. Add smooth particle movement.`,
};
