// Base URL of the Express backend. Configure via VITE_API_URL (see .env.example).
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const REPORTS_API_URL = `${API_URL}/api/reports`;
