# AiM - AI Music Creation Platform

Generate unique AI-composed music tracks from text descriptions.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **AI Generation**: (Worker to be implemented)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example env file and add your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: Supabase Dashboard → Settings → API

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

Your Supabase should have:

- `profiles` - User profiles (auto-created via trigger)
- `credit_ledger` - Credit transactions
- `tracks` - Generated tracks

Plus the `get_user_credits(uid)` function.

## Features

- ✅ Magic link authentication
- ✅ Credit-based generation system
- ✅ Track creation with genre/mood/duration
- ✅ Dashboard with track history
- ⏳ AI generation worker (next phase)
- ⏳ Audio playback
- ⏳ Stripe payments

## Deployment

```bash
npm run build
```

Deploy to Vercel:
```bash
npx vercel
```
