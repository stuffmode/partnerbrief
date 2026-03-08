# Architecture

## System Overview

Partner Brief follows a three-layer architecture:

```
┌─────────────────────────────────────┐
│           Frontend (Next.js)        │
│  Dashboard / Briefings / Partners   │
├─────────────────────────────────────┤
│          API Layer (Route Handlers) │
│  /api/briefings  /api/partners      │
├─────────────────────────────────────┤
│        Integration Layer            │
│  Claude API │ Sheets │ Resend       │
│  Slack │ HubSpot │ Gong │ GDrive   │
└─────────────────────────────────────┘
```

## Data Flow

1. **Ingestion** - Pull partner activity data from connected sources (Slack, HubSpot, Gong, Google Drive, Google Sheets)
2. **Enrichment** - Layer in external market research and industry context
3. **Generation** - Claude API synthesizes a personalized briefing per partner/segment
4. **Delivery** - Send via email (Resend) or publish as audio briefing
5. **Tracking** - Log delivery status and engagement metrics

## Key Design Decisions

- **App Router** over Pages Router for server components and streaming
- **Server-side API calls** to keep API keys secure (no client-side exposure)
- **Typed interfaces** for all data models to catch errors at compile time
- **Modular API clients** in `/lib/api/` for each external service
