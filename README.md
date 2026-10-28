# Kusumesh — Minimal Editorial Developer Portfolio

A minimal, typography-driven developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Motion (Motion for React)**, and **GSAP ScrollTrigger**.

Designed around restraint, fluid typography, and purposeful motion. Every layout property is stable (zero Cumulative Layout Shift), and all animations run on hardware-accelerated compositor threads (`transform` and `opacity` only).

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org) with App Router & Turbopack
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with CSS custom properties (tokens for light/dark modes)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) driven directly from `gsap.ticker` for a single unified animation loop
- **Scroll Orchestration**: [GSAP](https://gsap.com) + `ScrollTrigger` via `@gsap/react`
- **UI State & Spring Physics**: [Motion for React](https://motion.dev)
- **Icons**: [Lucide React](https://lucide.dev)
- **Typography**: Next.js Font Optimization with Geist and Space Grotesk

---

## 📂 Project Structure

```text
├── app/
│   ├── layout.tsx         # Root layout with ThemeScript, JSON-LD, metadata & providers
│   ├── page.tsx           # Home page assembling all portfolio sections
│   ├── template.tsx       # Route transition wipe & Lenis scroll reset
│   ├── not-found.tsx      # Editorial custom 404 with magnetic navigation
│   ├── loading.tsx        # Minimal progress state
│   ├── error.tsx          # Error boundary with reset trigger
│   ├── sitemap.ts         # Automated XML sitemap generation
│   ├── robots.ts          # Crawlers policy configuration
│   ├── og/                # Dynamic Open Graph image generation (next/og)
│   └── projects/[slug]/   # Statically generated case studies (SSG)
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── motion/            # MagneticButton, CustomCursor, AnimatedLink, SplitText, SectionHeader
│   ├── sections/          # Hero, About, Projects, Skills, Experience, Contact
│   └── ui/                # ThemeProvider, ThemeToggle, GrainOverlay
├── data/
│   ├── site.ts            # Bio, social links, educational institution & metadata
│   ├── projects.ts        # Projects, stacks, links, and case study details
│   ├── skills.ts          # Four core technical repertoire categories & notes
│   └── experience.ts      # Education, milestones, open source & hackathon timeline
├── hooks/                 # useReducedMotion, useIsTouch, useLocalTime, useActiveSection
└── public/
    └── images/            # Optimized profile and project preview assets (.webp)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+ installed
- npm, pnpm, or yarn

### 2. Installation
```bash
git clone https://github.com/kusumesh/portfolio.git
cd portfolio
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your public site URL:
```env
NEXT_PUBLIC_SITE_URL=https://kusumesh.dev
```

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✏️ How to Edit Content

All personal data, links, descriptions, and achievements are isolated in the `/data` directory so you can customize your portfolio without touching component code:

1. **Personal Information & Bio**:
   - Edit [`data/site.ts`](data/site.ts)
   - Update `name`, `role`, `email`, `location`, `timezone`, `socials`, `about` paragraphs, and `education`.
   - Look for `[EDIT ME]` tags indicating editable fields.

2. **Selected Projects & Case Studies**:
   - Edit [`data/projects.ts`](data/projects.ts)
   - Update `slug`, `title`, `year`, `description`, `stack`, `liveUrl`, `githubUrl`, and `image`.
   - Preview assets are stored in `public/images/projects/`.

3. **Skills & Tools of the Trade**:
   - Edit [`data/skills.ts`](data/skills.ts)
   - Modify items under the four categories: `Frontend`, `Backend`, `AI & Machine Learning`, and `Tools & Workflow`.
   - Each skill can optionally include a `note` that reveals on hover.

4. **Experience Timeline**:
   - Edit [`data/experience.ts`](data/experience.ts)
   - Add or update milestones across education, hackathons, open source contributions, and notable projects.

---

## 🛠 Available Scripts

- `npm run dev` — Launch development server with Turbopack.
- `npm run build` — Create optimized production bundle and statically prerender pages (SSG).
- `npm run start` — Run production server locally.
- `npm run lint` — Run ESLint check.
- `npx tsc --noEmit` — Run TypeScript compiler type check.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Log in to [Vercel](https://vercel.com) and click **Add New > Project**.
3. Import your repository.
4. Next.js will be automatically detected with default settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app` (or custom domain)
6. Click **Deploy**.

---

## ♿ Accessibility & Performance Principles

- **Reduced Motion**: Automatically honors `prefers-reduced-motion: reduce`. All parallax, cursor tracking, scroll-jacking, and entrance transforms are disabled; content is immediately visible.
- **Touch / Mobile**: Detects coarse pointer devices to hide the custom cursor and simplify touch interactions.
- **Zero CLS**: All image frames utilize fixed aspect ratios with Next.js image optimization.
- **Single Clock Loop**: Lenis runs via `gsap.ticker` to guarantee zero jitter between smooth scrolling and ScrollTrigger scrub positions.
- **Full Keyboard Navigation**: Visible focus states (`:focus-visible`), skiplink (`#main-content`), and screen-reader accessible attributes (`aria-current`, `aria-label`, `aria-live`).
