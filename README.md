# EffectLib - Thư Viện Hiệu Ứng UI/UX

<div align="center">
  <img width="1200" height="475" alt="EffectLib Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<p align="center">
  <strong>Thư viện demo hơn 260 hiệu ứng UI/UX hiện đại</strong><br>
  Xây dựng với React 19, TypeScript, Vite & Tailwind CSS
</p>

<p align="center">
  <a href="#-tính-năng">Tính năng</a> •
  <a href="#-công-nghệ">Công nghệ</a> •
  <a href="#-cấu-trúc-dự-án">Cấu trúc</a> •
  <a href="#-danh-sách-hiệu-ứng">Danh sách hiệu ứng</a> •
  <a href="#-hướng-dẫn-cài-đặt">Cài đặt</a> •
  <a href="#-api--backend">API</a>
</p>

---

## 📖 Giới thiệu

EffectLib là dự án thư viện hiệu ứng UI/UX được xây dựng với mục tiêu:

- **Học tập**: Hiểu cách hoạt động của các hiệu ứng web phổ biến từ cơ bản đến nâng cao
- **Tham khảo**: Nhanh chóng tìm kiếm và áp dụng hiệu ứng vào dự án thực tế
- **Phát triển**: Xây dựng UI/UX đẹp mắt với animation mượt mà
- **Cộng đồng**: Chia sẻ, nhận feedback và cải thiện liên tục

Dự án bao gồm cả các hiệu ứng đặc trưng của Việt Nam như **Cờ đỏ sao vàng** và **Trống đồng Đông Sơn**.

---

## ✨ Tính năng

### 🎛️ Hệ thống hiệu ứng
- **260+ hiệu ứng** được chia thành 22 danh mục
- **Lazy loading** với smart caching (max 8 effects cached)
- **Preloading** thông minh khi hover sidebar items
- **Search & Filter** theo tên, mô tả, hoặc category
- **Favorites** lưu vào localStorage

### 👁️ Chế độ xem
- **Preview Mode**: Xem demo trực tiếp
- **Code Mode**: Syntax highlighting, copy to clipboard
- **Prompt Mode**: Xem prompt gốc dùng để generate với AI

### 🎨 Giao diện
- Dark mode mặc định với hiệu ứng noise overlay
- Responsive design (desktop & mobile)
- Glassmorphism & Neumorphism UI elements
- Custom scrollbar & cursor effects

### 💬 Feedback System
- Gửi bug reports & ideas
- Backend API lưu trữ submissions
- Admin dashboard quản lý

---

## 🛠️ Công nghệ

| Lớp | Công nghệ | Phiên bản |
|-----|-----------|-----------|
| **Framework** | React | 19.2.3 |
| **Language** | TypeScript | 5.8.2 |
| **Build Tool** | Vite | 6.2.0 |
| **Styling** | Tailwind CSS | - |
| **Routing** | React Router DOM | 7.12.0 |
| **Icons** | Lucide React | 0.562.0 |
| **Backend** | Express.js | 4.21.0 |
| **Performance** | react-window | 2.2.4 |

---

## 📁 Cấu trúc dự án

```
effectlib/
├── src/
│   ├── components/
│   │   ├── effects/              # 260+ effect components
│   │   │   ├── Brand*.tsx        # Brand identity effects (26)
│   │   │   ├── Cursor*.tsx       # Cursor effects (40+)
│   │   │   ├── Motion*.tsx       # Motion effects (50+)
│   │   │   ├── Scroll*.tsx       # Scroll effects (50+)
│   │   │   ├── Three*.tsx        # 3D/WebGL effects (20+)
│   │   │   ├── Type*.tsx         # Typography effects (15+)
│   │   │   ├── Ux*.tsx           # UX interaction effects (25+)
│   │   │   ├── Visual*.tsx       # Visual tricks (15+)
│   │   │   ├── Vietnam*.tsx      # Vietnam special (3)
│   │   │   └── ...               # Cards, Buttons, Forms, etc.
│   │   ├── AdminPage.tsx         # Admin dashboard
│   │   ├── FeedbackForm.tsx      # Bug/idea submission
│   │   ├── Layout.tsx            # Main layout
│   │   ├── LazyCache.tsx         # Performance optimization
│   │   └── Sidebar.tsx           # Navigation sidebar
│   ├── hooks/
│   │   ├── useStore.ts           # Global state (favorites, params)
│   │   └── useScrollAnimation.ts # Scroll hook
│   ├── constants.ts              # Effects data (5000+ lines)
│   ├── types.ts                  # TypeScript interfaces
│   ├── prompts.ts                # AI generation prompts
│   ├── App.tsx                   # Main app (routes, component map)
│   └── index.tsx                 # Entry point
├── server.ts                     # Express backend API
├── data/
│   ├── code/                     # Generated code maps
│   └── submissions.json          # User feedback storage
├── package.json
├── tsconfig.json
├── vite.config.ts                # Vite config with proxy & visualizer
└── README.md
```

---

## 📊 Danh sách hiệu ứng theo danh mục

### 🇻🇳 Vietnam Special (3)
| ID | Tên | Mô tả |
|----|-----|-------|
| `vietnam-flag` | VN. Cờ Đỏ Sao Vàng | Cloth physics simulation với golden particles |
| `vietnam-drum` | VN. Trống Đồng | Procedural Dong Son drum patterns với metallic shader |
| `vietnam-map` | VN. Bản Đồ Việt Nam | Interactive Vietnam map visualization |

### 📜 Scroll Effects (50+)
| ID | Tên | Mô tả |
|----|-----|-------|
| `parallax-basic` | Parallax Basic | Cinematic depth với smooth translations |
| `parallax-multi` | Multi-Layer Parallax | Deep space 3D effect |
| `horizontal-scroll` | Horizontal Scroll | Sticky horizontal gallery |
| `scroll-trigger` | Scroll Trigger | Staggered element reveals |
| `scroll-snap` | Scroll Snap | Full-screen immersive sections |
| `scroll-reveal` | Scroll Reveal | Curtain-wipe effect |
| `scroll-blur` | Scroll Blur | Dynamic focus shifting |
| `scroll-scale` | Scroll Scale | Portal zoom-out effect |
| `scroll-rotation` | Scroll Rotation | Velocity-based rotation |
| `scroll-velocity` | Scroll Velocity | Typography skew by speed |
| `scroll-stacking` | Stacking Cards | Cards that stick & stack |
| `scroll-video` | Video Scrub | Video playback via scroll |
| `scroll-hijack` | Sticky Flow | Scroll hijacking simulation |
| `scroll-infinite` | Infinite Loop | Seamless content looping |
| `scroll-depth` | Depth Tunnel | Fake 3D z-axis flythrough |
| `scroll-distortion` | Text Distortion | Liquid turbulence effect |
| `scroll-zoom` | Deep Zoom | Massive scale zoom |

### 🖱️ Cursor & Mouse (40+)
| ID | Tên | Mô tả |
|----|-----|-------|
| `cursor-custom` | Custom Cursor | Replaced native cursor |
| `cursor-follower` | Cursor Follower | Lagging spring physics |
| `cursor-magnetic` | Magnetic Cursor | Buttons snap to cursor |
| `cursor-distortion` | Hover Distortion | Liquid displacement |
| `cursor-reveal` | Image Reveal | Flashlight mask reveal |
| `cursor-trail` | Cursor Trail | Particle system trail |
| `cursor-ripple` | Click Ripple | Expanding wave animation |
| `cursor-scale` | Context Scaling | Shape changes by element |
| `cursor-tooltip` | Following Tooltip | Info tag attached to mouse |
| `cursor-spotlight` | CSS Spotlight | Reveal borders near mouse |
| `cursor-gravity` | Gravity Effect | Elements pulled to cursor |
| `cursor-tilt` | 3D Tilt | Cards rotate to face mouse |
| `cursor-noise` | Noise Brush | Static noise reveal |
| `cursor-morph` | Morphing Shape | Cursor deforms by velocity |
| `cursor-physics` | Cursor Physics | Tethered ball collision |
| `cursor-liquid` | Liquid Cursor | Displacing UI like water |
| `cursor-lens` | Distortion Lens | Magnifying glass effect |

### 🔤 Typography (15+)
| ID | Tên | Mô tả |
|----|-----|-------|
| `type-split` | Split Text | Staggered character animations |
| `type-mask` | Text Mask | Revealing text through masks |
| `type-stroke` | Stroke Animation | Drawing text outlines (SVG) |
| `type-fill` | Liquid Fill | Text filling like water |
| `type-variable` | Variable Font | Animating font weight/width |
| `type-3d` | 3D Layered | Stacked text layers |
| `type-kinetic` | Kinetic Type | Chaotic rhythmic motion |
| `type-typewriter` | Typewriter | Sequential character typing |
| `type-distortion` | Text Glitch | Digital distortion & warp |
| `type-displacement` | Displacement | Fisheye menu effect |

### ✨ Motion & Animation (50+)
| ID | Tên | Mô tả |
|----|-----|-------|
| `motion-reverse` | Reverse Scroll | Animation reverses on scroll up |
| `motion-breathing` | Breathing UI | Infinite organic pulse |
| `motion-blur-ui` | Motion Blur UI | Directional blur on movement |
| `motion-elastic` | Elastic Snap | Spring physics opening |
| `motion-liquid-morph` | Liquid Morph | Melting section transitions |
| `motion-noise` | Noise Motion | Drifting via Perlin noise |
| `motion-hand-drawn` | Hand Drawn | Boiling frame-by-frame feel |
| `motion-bloom` | Color Bloom | Movement leaves ink trails |
| `motion-blur-reveal` | Blur Reveal | Focusing from heavy blur |
| `motion-afterimage` | Afterimage | Ghost trails behind objects |

### 🎭 3D & WebGL (20+)
| ID | Tên | Mô tả |
|----|-----|-------|
| `three-tunnel` | Three Tunnel | Retro vaporwave 3D grid |
| `three-liquid` | Three Liquid | Liquid simulation |
| `three-depth-map` | Three Depth Map | Depth-based rendering |
| `three-glass` | Three Glass | Glassmorphism 3D |
| `three-gallery` | Three Gallery | 3D image gallery |
| `three-character` | Three Character | Character animation |
| `three-floating` | Three Floating | Floating elements |
| `three-shader-text` | Three Shader Text | Shader-based text |
| `three-explode` | Three Explode | Explosion effects |
| `three-mouse-rotate` | Three Mouse Rotate | Mouse-controlled rotation |
| `three-terrain` | Particle Terrain | 3D terrain with particles |

### 💡 UX & Interaction (25+)
| ID | Tên | Mô tả |
|----|-----|-------|
| `ux-hesitation` | Mouse Hesitation | UI suggests help when hesitating |
| `ux-predictive` | Predictive UI | Pre-animating likely actions |
| `ux-rhythm` | Rhythm Learning | Adapting to user click speed |
| `ux-pacing` | Emotional Pacing | Forcing slow/fast interaction |
| `ux-scroll-rhythm` | Scroll Rhythm | Syncing to scroll beat |
| `ux-no-buttons` | No Buttons | Interaction via gestures only |
| `ux-implicit` | Implicit Cues | Guiding without text labels |
| `ux-friction` | Intentional Friction | Slowing down choices |
| `ux-exploratory` | Exploratory | No instructions, pure discovery |
| `ux-curiosity` | Curiosity Driven | Teasing content to provoke clicks |

### 🎯 Brand Identity (26)
| ID | Tên | Mô tả |
|----|-----|-------|
| `brand-morphing` | Color Morphing | Fluid brand palette transitions |
| `brand-living-logo` | Living Logo | Logo breathes and reacts |
| `brand-reactive` | Reactive Identity | Brand changes based on user |
| `brand-reconstruct` | Logo Reconstruct | Assembling brand marks |
| `brand-motion-lang` | Motion Language | Consistent physics |
| `brand-distortion` | Identity Distortion | Recognizable even warped |
| `brand-patterns` | Procedural Patterns | Infinite texture generation |
| `brand-sound` | Sonic Identity | Visuals driven by audio |
| `brand-typography` | Brand Typo Motion | Custom font behavior |
| `brand-reveal` | Interactive Reveal | User draws the logo |

### 🎨 Visual Tricks (15+)
| ID | Tên | Mô tả |
|----|-----|-------|
| `visual-masking` | CSS Masking | Clipping with shapes |
| `visual-image-reveal` | Hover Reveal | Images on text hover |
| `visual-clip-path` | Clip Path | Geometric transitions |
| `visual-glassmorphism` | Glassmorphism | Frosted glass UI |
| `visual-neumorphism` | Neumorphism | Soft extruded shadows |
| `visual-brutalist` | Neo-Brutalism | Raw high-contrast aesthetic |
| `visual-cinematic` | Cinematic Dark | Movie-style lighting |
| `visual-noise` | Animated Noise | Film grain texture overlay |
| `visual-glitch-image` | Image Glitch | RGB split + distortion |

### 🃏 UI Components
| Danh mục | Số lượng | Ví dụ |
|----------|----------|-------|
| Navigation | 10+ | Morphing nav, pill indicator, magnetic link |
| Cards | 10+ | 3D flip, hover lift, fan stack, glare |
| Buttons | 10+ | Pulse, shine, ripple, magnetic, neon |
| Loaders | 10+ | Circle spinner, dots, glitch, skeleton |
| Forms | 10+ | Float label, focus border, shake error |

### 🧪 Experimental & Micro
| ID | Tên | Mô tả |
|----|-----|-------|
| `experimental-audio` | Sound Reactive | Audio visualizations |
| `experimental-time` | Time Cycle | Day/Night themes |
| `experimental-ai` | Generative Art | Algorithmic visuals |
| `experimental-story` | Scrollytelling | Narrative via scroll |
| `experimental-noise` | Noise Field | Perlin flow field |
| `ux-micro-like` | Micro Like | Heart particle explosion |
| `micro-toggle-elastic` | Elastic Toggle | Jelly bounce switch |
| `micro-button-morph` | Button Morph Loader | Button to spinner |

---

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/anomalyco/effectlib.git
cd effectlib

# Cài đặt dependencies
npm install

# Tạo file .env.local
cp .env.example .env.local

# Chỉnh sửa các biến môi trường
# GEMINI_API_KEY=your-api-key
# VITE_API_URL=http://localhost:3001
# ADMIN_PASSWORD=your-password

# Chạy development server
npm run dev

# (Terminal khác) Chạy backend server
npm run server
```

### Scripts có sẵn

```bash
# Development
npm run dev          # Chạy Vite dev server (port 3000)

# Production
npm run build        # Build cho production
npm run preview      # Preview build

# Backend
npm run server       # Chạy Express server (port 3001)

# Tools
npm run lint         # ESLint (nếu có config)
npx tsc --noEmit     # Type checking
```

### Cấu hình môi trường (.env.local)

```env
# Backend
PORT=3001
ADMIN_PASSWORD=08102011

# Frontend
VITE_API_URL=http://localhost:3001
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🏗️ Thêm hiệu ứng mới

### Bước 1: Tạo component

```tsx
// src/components/effects/MyNewEffect.tsx
import React, { useRef, useEffect } from 'react';

interface MyNewEffectProps {
  variant?: string;
}

export const MyNewEffect: React.FC<MyNewEffectProps> = ({ variant }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Logic implementation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    // ... animation logic
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default MyNewEffect;
```

### Bước 2: Đăng ký trong LazyCache

```tsx
// src/components/LazyCache.tsx
const effectComponentMap: EffectComponentMap = {
  // ... existing effects
  'my-new-effect': () => import('./effects/MyNewEffect'),
};
```

### Bước 3: Thêm vào constants.ts

```ts
// src/constants.ts
{
  id: 'my-new-effect',
  title: 'XXX. My New Effect',
  description: 'Mô tả ngắn gọn về hiệu ứng',
  prompt: 'Prompt chi tiết cho AI generation...'
}
```

### Bước 4: (Tùy chọn) Thêm category mới

```tsx
// src/components/Sidebar.tsx
const CATEGORIES = [
  // ... existing
  { id: 'my-category', label: 'My Category', prefixes: ['my-new-effect'] },
];
```

---

## 🔧 API & Backend

Server Express xử lý feedback system.

### Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/health` | Health check |
| POST | `/api/feedback` | Gửi bug/idea |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/submissions` | Danh sách submissions |
| DELETE | `/api/admin/submissions/:id` | Xóa submission |
| GET | `/api/admin/stats` | Thống kê |

### Feedback Submission

```typescript
// Request
POST /api/feedback
{
  type: 'bug' | 'idea',
  title: string,        // max 150 chars
  description: string,  // max 2000 chars
  contact?: string      // email format
}

// Response
{ success: true, id: 'xxx' }
```

### Admin Authentication

```typescript
// Login
POST /api/admin/login
{ password: '08102011' }

// Response
{ success: true, token: 'admin-token-xxx' }

// Subsequent requests
Authorization: Bearer admin-token
```

---

## 📦 Performance

### Optimization Techniques
- **Code Splitting**: React.lazy() cho từng effect
- **Smart Caching**: Max 8 effects cached, unload sau 60s không dùng
- **Preloading**: Tự động load khi hover sidebar
- **Virtual Scrolling**: react-window cho large lists
- **Memoization**: React.memo, useMemo, useCallback

### Build Analysis
```bash
npm run build
# Mở dist/stats.html để xem bundle analysis
```

---

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Build test
npm run build
```

---

## 📝 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 🤝 Đóng góp

Rất hoan nghênh đóng góp từ cộng đồng!

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-effect`
3. Commit changes: `git commit -m 'Add amazing effect'`
4. Push to branch: `git push origin feature/amazing-effect`
5. Tạo Pull Request

---

<div align="center">
  <p>EffectLib - Made with ❤️ for the UI/UX community</p>
  <p>
    <a href="https://github.com/anomalyco">GitHub</a> •
    <a href="https://ai.studio.apps/drive/1JmpUxgBOQ8p2lS4FZ-TsyesVx0a0dZV4">AI Studio</a>
  </p>
</div>
