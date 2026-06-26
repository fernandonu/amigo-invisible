# 🎅 Amigo Invisible - Secret Santa App

A complete Secret Santa web application built with Next.js 14, React 18, TypeScript, TailwindCSS, and Framer Motion. Features a festive Christmas UI with snow effects, animated Christmas lights, and confetti on success.

## Features

- Add, edit, delete, and reorder participants via drag and drop
- Import/export participants via CSV
- Automatic derangement algorithm (no one gets assigned themselves)
- Individual email notifications via Resend
- Animated snow, Christmas lights, and confetti effects
- Sound effects (toggle on/off)
- Persistent state via localStorage
- Responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v3
- **Animations**: Framer Motion v11
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Toasts**: Sonner
- **Confetti**: canvas-confetti

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Amigo Invisible <noreply@tudominio.com>
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Resend Configuration

1. Create a free account at [resend.com](https://resend.com)
2. Go to **API Keys** and create a new key
3. Add your domain under **Domains** (or use `onboarding@resend.dev` for testing)
4. Set `RESEND_API_KEY` in your `.env.local`
5. Set `EMAIL_FROM` to your verified sender address

> **Note**: Without a verified domain, you can only send to the email address associated with your Resend account. For production use, verify your domain.

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/amigo-invisible.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and click **Add New Project**
2. Import your GitHub repository
3. Vercel will auto-detect Next.js settings

### 3. Add Environment Variables

In Vercel project settings under **Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key |
| `EMAIL_FROM` | Your verified sender email |

### 4. Deploy

Click **Deploy**. Your app will be live in seconds!

## CSV Import Format

The CSV file should have the following format (header row optional):

```csv
Nombre,Alias,Email
Juan Pérez,juancho,juan@ejemplo.com
María García,maru,maria@ejemplo.com
Carlos López,caro,carlos@ejemplo.com
```

## How It Works

1. Add participants (name, alias, email)
2. Click "Realizar Sorteo" (at least 3 participants required)
3. Confirm the raffle in the modal
4. The app generates a random derangement (no one gets themselves)
5. Each participant receives a personalized email revealing their Secret Santa assignment

## Local Development Notes

- Participant data is stored in `localStorage` — it persists across page refreshes
- Email sending requires a valid `RESEND_API_KEY` in `.env.local`
- The derangement algorithm retries up to 1000 times to find a valid assignment

## License

MIT
