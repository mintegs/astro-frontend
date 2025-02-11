export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  body?: any;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  details?: string;
}
