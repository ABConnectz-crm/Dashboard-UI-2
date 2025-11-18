# LeadFlow - Modern Lead Management ERP Dashboard

A next-generation lead management dashboard built with cutting-edge technologies, featuring a beautiful, professional, and highly interactive user interface.

![LeadFlow Dashboard](./Dashboard-Ui-Template-1.jpg)

## ✨ Features

- **Modern Bento Grid Layout** - Clean, organized card-based interface inspired by top-tier SaaS applications
- **Drag & Drop Kanban Board** - Intuitive lead management with smooth animations
- **Real-time Metrics Dashboard** - Track KPIs with beautiful animated cards
- **Global Command Search** - Quick navigation with Cmd+K shortcut
- **Dark Mode Support** - Seamless theme switching for comfortable viewing
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Glassmorphism Effects** - Modern UI with subtle backdrop blur effects
- **TypeScript First** - Fully typed for enhanced developer experience and code reliability

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI Primitives)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd New-Dashboard-Design
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📦 Project Structure

```
New-Dashboard-Design/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with sidebar
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── ui/                  # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── command.tsx
│   │   └── ...
│   └── dashboard/           # Dashboard-specific components
│       ├── sidebar.tsx      # Collapsible navigation sidebar
│       ├── navbar.tsx       # Top navigation with search
│       ├── metrics-card.tsx # KPI metric cards
│       ├── kanban-board.tsx # Drag-and-drop board
│       └── lead-card.tsx    # Individual lead cards
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── types.ts            # TypeScript interfaces
│   └── mock-data.ts        # Sample data
├── public/                  # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🎨 Design System

### Color Palette

The dashboard uses a carefully crafted color system optimized for professional environments:

- **Primary**: Deep Navy/Indigo (`#1A1A40`) - Conveys trust and stability
- **Accent**: Vivid Violet/Blue - High-energy call-to-action elements
- **Background**: Light cool gray/white - Reduces eye strain
- **Status Colors**: Pastel chips for lead statuses
  - New: Soft Blue
  - Qualified: Soft Green
  - Negotiation: Soft Amber
  - Won: Emerald Green

### Typography

- **Font**: Inter (with Geist Sans fallback)
- **Hierarchy**: Established through font weight and color, not excessive size variation
- **Readability**: Optimized for scanning dense data with high x-height and open counters

### Spacing & Layout

- **Comfort Density**: Generous padding (p-6, p-8) for visual breathing room
- **Border Radius**: Soft, rounded corners (rounded-xl, rounded-2xl)
- **Shadows**: Subtle, diffuse shadows that intensify on hover
- **Grid**: Responsive Bento grid that adapts from 4 columns to 1 column

## 🎭 Key Components

### Sidebar
- Collapsible navigation with smooth animations
- Active state highlighting
- User profile section
- Icon-based navigation with clear labels

### Metrics Cards
- Animated entrance with staggered delays
- Trend indicators with color-coded values
- Icon badges for visual categorization
- Hover effects with subtle lift

### Kanban Board
- 6-column pipeline visualization (New → Won)
- Drag-and-drop with smooth physics
- Lead count badges per column
- Empty state indicators
- Responsive grid layout

### Global Search (Command Palette)
- Keyboard shortcut: Cmd/Ctrl + K
- Grouped search results
- Quick actions
- Fuzzy search capability

## 🌙 Dark Mode

Toggle dark mode using the sun/moon icon in the navbar. The theme uses CSS variables for seamless transitions and maintains excellent contrast ratios.

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints optimized for:

- **Desktop**: 4-6 column Bento grid, full sidebar
- **Tablet**: 2-3 column grid, collapsible sidebar
- **Mobile**: Single column layout, drawer navigation

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides the best deployment experience.

#### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Visit [vercel.com](https://vercel.com)** and sign in with your GitHub account

3. **Click "Add New Project"**

4. **Import your repository**:
   - Select your GitHub repository
   - Vercel will automatically detect it's a Next.js project

5. **Configure your project** (optional):
   - Project Name: `leadflow-dashboard` (or your preferred name)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

6. **Click "Deploy"**

That's it! Vercel will:
- Install dependencies
- Build your project
- Deploy to a production URL (e.g., `your-project.vercel.app`)
- Provide automatic HTTPS
- Set up CI/CD for future commits

#### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For production**:
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

#### Netlify

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

#### AWS Amplify

1. Visit [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Amplify will auto-detect Next.js settings
5. Click "Save and deploy"

#### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t leadflow-dashboard .
docker run -p 3000:3000 leadflow-dashboard
```

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
# Database (when you add real database)
DATABASE_URL=your_database_url

# API Keys (if needed)
NEXT_PUBLIC_API_URL=your_api_url

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

**Note**: Never commit `.env.local` to version control!

## 📊 Adding Real Data

Currently, the dashboard uses mock data from `lib/mock-data.ts`. To connect to a real database:

1. **Install Prisma** (recommended):
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. **Initialize Prisma**:
   ```bash
   npx prisma init
   ```

3. **Define your schema** in `prisma/schema.prisma`

4. **Create API routes** in `app/api/`

5. **Update components** to fetch from API instead of mock data

## 🎯 Customization

### Changing Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary: 237 72% 25%;    /* Navy blue */
  --accent: 237 51% 54%;     /* Violet */
  /* ... */
}
```

### Adding New Pages

Create new files in the `app/` directory:

```tsx
// app/reports/page.tsx
export default function ReportsPage() {
  return <div>Reports Page</div>
}
```

### Modifying the Sidebar

Edit `components/dashboard/sidebar.tsx` and update the `navigation` array:

```tsx
const navigation = [
  { name: "Your Page", href: "/your-page", icon: YourIcon, current: false },
  // ...
]
```

## 📝 License

This project is provided as-is for educational and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using Next.js, Tailwind CSS, and Shadcn UI**
