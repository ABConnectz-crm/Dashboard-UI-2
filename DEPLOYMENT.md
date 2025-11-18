# 🚀 Deployment Guide - LeadFlow Dashboard

This guide provides step-by-step instructions for deploying your LeadFlow dashboard to various platforms.

## Table of Contents

1. [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
2. [Netlify Deployment](#netlify-deployment)
3. [AWS Amplify](#aws-amplify)
4. [Docker Deployment](#docker-deployment)
5. [Traditional VPS (DigitalOcean, AWS EC2, etc.)](#traditional-vps)
6. [Troubleshooting](#troubleshooting)

---

## Vercel Deployment (Recommended)

Vercel is the platform built by the creators of Next.js and offers the best performance and developer experience.

### Prerequisites
- GitHub, GitLab, or Bitbucket account
- Vercel account (free tier available at [vercel.com](https://vercel.com))

### Option 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Prepare Your Repository

1. Ensure your code is pushed to GitHub:
   ```bash
   git init  # if not already initialized
   git add .
   git commit -m "Initial commit: LeadFlow dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

#### Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub" (or your preferred Git provider)
3. Authorize Vercel to access your repositories

#### Step 3: Import Your Project

1. Click "Import Project"
2. Find and select your repository
3. Click "Import"

#### Step 4: Configure Project Settings

Vercel auto-detects Next.js projects, but verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

#### Step 5: Environment Variables (Optional)

If you have environment variables (like API keys):

1. Click "Environment Variables"
2. Add your variables:
   ```
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```
3. Select which environments (Production, Preview, Development)

#### Step 6: Deploy

1. Click "Deploy"
2. Wait 1-2 minutes for deployment
3. Your site will be live at `https://your-project-name.vercel.app`

#### Step 7: Custom Domain (Optional)

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., `dashboard.yourcompany.com`)
4. Follow DNS configuration instructions

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Deploy

For preview deployment:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

The CLI will:
- Ask you to link to an existing project or create a new one
- Detect it's a Next.js project
- Build and deploy your application
- Provide you with a URL

#### Step 4: Continuous Deployment

Once linked, every `git push` to your main branch will automatically deploy to production!

### Vercel Deployment Benefits

✅ **Automatic HTTPS** - SSL certificates included
✅ **Edge Network** - Global CDN for fast loading
✅ **Automatic CI/CD** - Push to deploy
✅ **Preview Deployments** - Every PR gets a unique URL
✅ **Analytics** - Built-in performance monitoring
✅ **Zero Configuration** - Works out of the box

---

## Netlify Deployment

### Via Netlify Dashboard

#### Step 1: Prepare Your Repository

Push your code to GitHub, GitLab, or Bitbucket.

#### Step 2: Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider
4. Authorize Netlify

#### Step 3: Configure Build Settings

Select your repository and configure:

- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Environment variables**: Add if needed

#### Step 4: Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Your site is live at `https://random-name.netlify.app`

#### Step 5: Custom Domain

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration steps

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

---

## AWS Amplify

### Step 1: Access Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"

### Step 2: Connect Repository

1. Choose your Git provider (GitHub, GitLab, Bitbucket)
2. Authorize AWS Amplify
3. Select your repository and branch

### Step 3: Configure Build Settings

Amplify auto-detects Next.js. Verify the build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Step 4: Environment Variables

Add any required environment variables in the Amplify console.

### Step 5: Deploy

1. Click "Save and deploy"
2. Wait for deployment (~3-5 minutes)
3. Access your app at the provided URL

---

## Docker Deployment

Perfect for self-hosted environments.

### Step 1: Create Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Step 2: Create docker-compose.yml (Optional)

```yaml
version: '3.8'

services:
  leadflow:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Step 3: Build and Run

```bash
# Build the image
docker build -t leadflow-dashboard .

# Run the container
docker run -p 3000:3000 leadflow-dashboard

# Or use docker-compose
docker-compose up -d
```

### Step 4: Deploy to Production

Push to Docker Hub or your container registry:

```bash
# Tag the image
docker tag leadflow-dashboard your-username/leadflow-dashboard:latest

# Push to registry
docker push your-username/leadflow-dashboard:latest

# On production server
docker pull your-username/leadflow-dashboard:latest
docker run -d -p 3000:3000 your-username/leadflow-dashboard:latest
```

---

## Traditional VPS

Deploy to DigitalOcean, AWS EC2, Linode, etc.

### Step 1: Provision Server

1. Create a server with Ubuntu 22.04 LTS
2. Minimum specs: 1GB RAM, 1 CPU
3. Note the server IP address

### Step 2: SSH into Server

```bash
ssh root@your-server-ip
```

### Step 3: Install Node.js

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify installation
node -v
npm -v
```

### Step 4: Install PM2

```bash
npm install -g pm2
```

### Step 5: Clone and Build

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Build the application
npm run build
```

### Step 6: Start with PM2

```bash
# Start the application
pm2 start npm --name "leadflow" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

### Step 7: Configure Nginx (Reverse Proxy)

```bash
# Install Nginx
apt install -y nginx

# Create Nginx configuration
nano /etc/nginx/sites-available/leadflow
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/leadflow /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 8: SSL with Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

---

## Troubleshooting

### Build Errors

**Problem**: Build fails with "out of memory"
**Solution**: Increase Node.js memory limit
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

**Problem**: Module not found errors
**Solution**: Delete `node_modules` and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Problem**: 404 on page refresh
**Solution**: Ensure your server is configured for client-side routing. For Nginx:
```nginx
try_files $uri $uri/ /index.html;
```

**Problem**: Environment variables not working
**Solution**: Prefix client-side variables with `NEXT_PUBLIC_`
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Performance Issues

**Problem**: Slow initial load
**Solution**:
1. Enable image optimization
2. Use Next.js Image component
3. Implement code splitting
4. Enable caching headers

### Vercel-Specific Issues

**Problem**: Function timeout errors
**Solution**: Upgrade to Pro plan or optimize serverless functions

**Problem**: Deployment stuck
**Solution**: Check build logs, ensure dependencies are correctly listed in `package.json`

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test responsive design on mobile devices
- [ ] Check dark mode toggle functionality
- [ ] Test drag-and-drop Kanban board
- [ ] Verify search functionality works
- [ ] Test navigation and routing
- [ ] Ensure HTTPS is working
- [ ] Set up monitoring and analytics
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up backups (if using database)
- [ ] Document your deployment process

---

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)

---

**Need Help?** Open an issue in the repository or consult the deployment platform's support documentation.
