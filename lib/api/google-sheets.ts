const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

export async function fetchSheetData(spreadsheetId: string, range: string) {
  if (!GOOGLE_SHEETS_API_KEY) {
    throw new Error("GOOGLE_SHEETS_API_KEY is not configured");
  }

  // TODO: Implement Google Sheets API call
  return { values: [] };
}
