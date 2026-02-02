export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiMeta {
  timestamp: string;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}
