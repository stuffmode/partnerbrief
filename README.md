# Partner Brief

AI-powered platform that auto-generates personalized newsletters and audio briefings for B2B partner programs.

## Overview

Partner Brief pulls data from internal tools (Slack, HubSpot, Gong, Google Drive) and layers in external market research to create tailored partner communications.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API
- **Email**: Resend
- **Data**: Google Sheets API

## Project Structure

```
partner-brief/
├── app/                    # Pages and routes (App Router)
│   ├── api/                # API route handlers
│   │   ├── briefings/      # Briefing CRUD + generation
│   │   └── partners/       # Partner management
│   ├── briefings/          # Briefings list/detail pages
│   ├── dashboard/          # Main dashboard
│   ├── partners/           # Partner management pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── briefings/          # Briefing-specific components
│   ├── layout/             # Header, Footer, Sidebar
│   ├── partners/           # Partner-specific components
│   └── ui/                 # Generic UI (Button, Card, etc.)
├── lib/                    # Utilities and API helpers
│   ├── api/                # External API clients
│   └── utils/              # Formatting, helpers
├── types/                  # TypeScript interfaces
├── public/                 # Static assets
├── styles/                 # Global styles
└── docs/                   # Project documentation
```

## Getting Started

1. Clone the repository
2. Copy `.env.local` and fill in API keys
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key for briefing generation |
| `GOOGLE_SHEETS_API_KEY` | Google Sheets API for partner data |
| `RESEND_API_KEY` | Resend API for email delivery |
