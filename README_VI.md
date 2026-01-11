# EffectLib - Thư Viện Hiệu Ứng UI/UX

<div align="center">
  <img width="1200" height="475" alt="Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

EffectLib là một thư viện demo các hiệu ứng UI/UX hiện đại, bao gồm hơn 300 hiệu ứng từ cơ bản đến nâng cao. Dự án được xây dựng như một công cụ học tập, tham khảo và phát triển các tương tác đẹp mắt cho web.

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ](#công-nghệ)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Danh sách hiệu ứng](#danh-sách-hiệu-ứng)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Cách thêm hiệu ứng mới](#cách-thêm-hiệu-ứng-mới)
- [API & Backend](#api--backend)
- [Đóng góp](#đóng-góp)
- [License](#license)

## Giới thiệu

EffectLib được thiết kế với mục tiêu:

- **Học tập**: Hiểu cách hoạt động của các hiệu ứng web phổ biến
- **Tham khảo**: Nhanh chóng tìm kiếm và áp dụng hiệu ứng vào dự án
- **Phát triển**: Xây dựng UI/UX đẹp mắt với animation mượt mà
- **Cộng đồng**: Chia sẻ và nhận feedback từ người dùng

Dự án bao gồm cả các hiệu ứng đặc trưng của Việt Nam như cờ đỏ sao vàng và trống đồng Đông Sơn.

## Tính năng

### Hiệu ứng Scroll
- Parallax (cơ bản & đa tầng)
- Scroll-trigger animations
- Video scrub điều khiển bằng scroll
- Sticky sections với stacking cards
- Shape morphing và distortion
- 3D camera flythrough

### Hiệu ứng Cursor & Mouse
- Custom cursor với physics
- Magnetic effects cho buttons
- Liquid distortion
- Particle trails
- Spotlight reveal
- Hover interactions phức tạp

### Typography Effects
- Typewriter effects
- Text masking và gradient fill
- 3D layered text
- Kinetic type animations
- Glitch và distortion effects

### Motion & Animation
- Elastic spring physics
- Motion blur UI
- Liquid morph transitions
- Afterimage và bloom effects
- Physics-based animations

### 3D & WebGL
- 3D tunnels và terrain
- Glassmorphism
- Particle systems
- Mouse rotation controls
- Volumetric fog effects

### UX & Interaction Design
- Predictive UI
- Hesitation detection
- Intentional friction
- Exploratory interactions
- Storytelling animations

### Brand Identity
- Living logos
- Color morphing transitions
- Logo reconstruction
- Sonic identity
- Brand patterns generation

### Visual Tricks
- Glassmorphism & Neumorphism
- Neo-Brutalist design
- Cinematic lighting
- Animated noise/film grain
- Theme switching

## Công nghệ

| Công nghệ | Mục đích |
|-----------|----------|
| **React 19** | UI framework chính |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **React Router** | Navigation |
| **Express.js** | Backend API |
| **Framer Motion** | Animation (tùy effect) |
| **Three.js** | 3D & WebGL effects |
| **Canvas API** | High-performance graphics |

## Cấu trúc dự án

```
effectlib/
├── src/
│   ├── components/
│   │   ├── effects/          # Tất cả effect components
│   │   │   ├── Scroll*.tsx
│   │   │   ├── Cursor*.tsx
│   │   │   ├── Type*.tsx
│   │   │   └── ...
│   │   ├── Layout.tsx        # Main layout
│   │   ├── AdminPage.tsx     # Admin dashboard
│   │   ├── LazyCache.tsx     # Performance optimization
│   │   └── ...
│   ├── constants.ts          # Effects data & metadata
│   ├── types.ts              # TypeScript interfaces
│   ├── App.tsx               # Main app component
│   ├── index.tsx             # Entry point
│   └── hooks/                # Custom React hooks
├── server.ts                 # Express backend
├── data/
│   ├── code/                 # Generated code maps
│   └── submissions.json      # User feedback storage
├── prompts.ts                # AI prompts for generation
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Danh sách hiệu ứng

### Danh mục chính

| ID | Danh mục | Số lượng | Mô tả |
|----|----------|----------|-------|
| 🇻🇳 | Vietnam Special | 2 | Hiệu ứng đặc trưng Việt Nam |
| 📜 | Scroll Effects | 40+ | Hiệu ứng điều khiển bằng scroll |
| 🖱️ | Cursor & Mouse | 30+ | Tương tác với con trỏ chuột |
| 🔤 | Typography | 30+ | Hiệu ứng chữ và text |
| 🎨 | Visual Tricks | 15+ | Hiệu ứng visual đặc biệt |
| ✨ | Motion & Animation | 50+ | Animation và motion design |
| 🎭 | 3D & WebGL | 20+ | Hiệu ứng 3D với Three.js |
| 💡 | UX & Interaction | 30+ | UX experiments |
| 🎯 | Brand Identity | 25+ | Hiệu ứng thương hiệu |
| 🧪 | Experimental | 10+ | Hiệu ứng thử nghiệm |
| 🎯 | Micro-interactions | 50+ | Tương tác nhỏ |
| 🃏 | Cards, Buttons, Forms | 50+ | UI components |

### Chi tiết từng danh mục

#### Scroll Effects (1-40)
- 01. Parallax Basic
- 03. Horizontal Scroll
- 04. Scroll Trigger
- 05. Scroll Snap
- 07. Scroll Reveal
- 08. Scroll Blur
- 12. Stacking Cards
- 19. Video Scrub
- 21. Sticky Flow
- 24. Shape Morph
- 25. Depth Tunnel
- 26. Text Distortion
- ... và nhiều hơn nữa

#### Cursor Effects (29-55)
- 29. Custom Cursor
- 30. Cursor Follower
- 31. Magnetic Cursor
- 35. Cursor Trail
- 37. Context Scaling
- 42. Noise Brush
- 43. Morphing Shape
- ... và nhiều hơn nữa

#### Typography Effects (56-80)
- 56. Split Text
- 57. Text Mask
- 58. Stroke Animation
- 59. Liquid Fill
- 60. Variable Font
- 61. 3D Layered
- 62. Kinetic Type
- 63. Typewriter
- ... và nhiều hơn nữa

#### Motion Effects (141-160)
- 141. Reverse Scroll
- 142. Breathing UI
- 143. Motion Blur UI
- 146. Elastic Snap
- 147. Liquid Morph
- 148. Noise Motion
- 149. Hand Drawn
- ... và nhiều hơn nữa

#### 3D & WebGL (195-215)
- 195. Three Tunnel
- 196. Three Liquid
- 197. Three Depth Map
- 198. Three Glass
- 199. Three Gallery
- 200. Three Character
- ... và nhiều hơn nữa

#### UX & Interaction (261-280)
- 261. Mouse Hesitation
- 262. Predictive UI
- 263. Rhythm Learning
- 264. Emotional Pacing
- 265. Scroll Rhythm
- ... và nhiều hơn nữa

## Hướng dẫn cài đặt

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Cài đặt

```bash
# Clone dự án
git clone <repository-url>
cd effectlib

# Cài đặt dependencies
npm install

# Cấu hình biến môi trường
cp .env.example .env.local
# Chỉnh sửa GEMINI_API_KEY trong .env.local

# Chạy development server
npm run dev
```

### Các lệnh có sẵn

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview

# Chạy backend server
npm run server

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### Cấu hình môi trường

Tạo file `.env.local`:

```env
GEMINI_API_KEY=your-gemini-api-key
ADMIN_PASSWORD=your-admin-password
PORT=3001
```

## Cách thêm hiệu ứng mới

### Bước 1: Tạo component

Tạo file mới trong `src/components/effects/`:

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
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MyNewEffect;
```

### Bước 2: Đăng ký trong App.tsx

```tsx
// Import component
const MyNewEffect = React.lazy(() => import('./components/effects/MyNewEffect'));

// Thêm vào COMPONENT_MAP
const COMPONENT_MAP: Record<string, React.LazyExoticComponent<any>> = {
  // ...
  'my-new-effect': MyNewEffect,
};
```

### Bước 3: Thêm vào constants.ts

```ts
// Trong EFFECTS_DATA
{
  id: 'my-new-effect',
  title: 'XXX. My New Effect',
  description: 'Mô tả ngắn về hiệu ứng',
  prompt: 'Prompt chi tiết cho AI generation...'
}
```

### Bước 4: Thêm category (nếu cần)

Chỉnh sửa `Layout.tsx` để thêm category mới:

```ts
const CATEGORIES = [
  // ...
  { id: 'my-category', label: 'My Category', prefixes: ['my-new-effect'] },
];
```

## API & Backend

Server Express xử lý các tính năng backend:

### Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/submissions` | Lấy danh sách submissions |
| POST | `/api/submissions` | Tạo submission mới |
| DELETE | `/api/submissions/:id` | Xóa submission |
| POST | `/api/login` | Admin login |

### Submission Types

```typescript
interface Submission {
  id: string;
  type: 'bug' | 'idea';
  title: string;
  description: string;
  contact?: string;
  createdAt: string;
}
```

### Admin Features

- Xem danh sách bug reports và ideas
- Xóa submissions không hợp lệ
- Export data

## Đóng góp

Rất hoan nghênh đóng góp từ cộng đồng!

### Cách đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-effect`)
3. Commit changes (`git commit -m 'Add amazing effect'`)
4. Push to branch (`git push origin feature/amazing-effect`)
5. Tạo Pull Request

### Hướng dẫn

- Đảm bảo code tuân thủ TypeScript conventions
- Thêm comments cho logic phức tạp
- Test hiệu ứng trên nhiều browsers
- Cập nhật README nếu thêm features mới

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Liên hệ

- GitHub: [anomalyco](https://github.com/anomalyco)
- Issues: [Report Bug](https://github.com/anomalyco/effectlib/issues)

---

<div align="center">
  EffectLib - Made with ❤️ for the UI/UX community
</div>
