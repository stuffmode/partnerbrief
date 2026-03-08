export interface Partner {
  id: string;
  name: string;
  company: string;
  email: string;
  segment: string;
  tier: "platinum" | "gold" | "silver";
  dataSources: DataSource[];
  createdAt: string;
  updatedAt: string;
}

export interface DataSource {
  id: string;
  type: "slack" | "hubspot" | "gong" | "google_drive" | "google_sheets";
  connectionStatus: "connected" | "disconnected" | "error";
  lastSyncedAt: string | null;
}

export interface Briefing {
  id: string;
  partnerId: string;
  title: string;
  type: "newsletter" | "audio";
  status: "draft" | "generated" | "sent" | "failed";
  content: string;
  audioUrl?: string;
  generatedAt: string;
  sentAt?: string;
}

export interface BriefingRequest {
  partnerId: string;
  type: "newsletter" | "audio";
  includeMarketResearch: boolean;
  dataSources: string[];
  tone?: "formal" | "conversational" | "executive";
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: "success" | "error";
}
