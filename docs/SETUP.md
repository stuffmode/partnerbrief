# Setup Guide

## Prerequisites

- Node.js 18+ (recommended: v22)
- npm or yarn

## Installation

```bash
cd partner-brief
npm install
```

## Environment Configuration

Copy the `.env.local` file and replace placeholder values:

### Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Set `ANTHROPIC_API_KEY=sk-ant-...`

### Google Sheets API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable the Google Sheets API
3. Create credentials (API key)
4. Set `GOOGLE_SHEETS_API_KEY=...`

### Resend API Key
1. Go to [resend.com](https://resend.com)
2. Create an API key
3. Set `RESEND_API_KEY=re_...`

## Running Locally

```bash
npm run dev
```

Open http://localhost:3000.

## Future Integrations

The following integrations are planned and will require additional environment variables:

| Integration | Purpose |
|---|---|
| Slack | Pull partner conversation context |
| HubSpot | CRM data and deal activity |
| Gong | Call recordings and insights |
| Google Drive | Shared documents and collateral |
