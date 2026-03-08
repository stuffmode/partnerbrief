# API Reference

## Endpoints

### GET /api/briefings
Returns all briefings.

**Response:**
```json
{ "briefings": [] }
```

### POST /api/briefings
Generate a new briefing.

**Request Body:**
```json
{
  "partnerId": "string",
  "type": "newsletter | audio",
  "includeMarketResearch": true,
  "dataSources": ["slack", "hubspot"],
  "tone": "formal | conversational | executive"
}
```

**Response:**
```json
{ "status": "created", "data": { ... } }
```

### GET /api/partners
Returns all partners.

**Response:**
```json
{ "partners": [] }
```
