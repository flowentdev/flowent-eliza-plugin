export interface FlowentResponse<T = any> {
    rawData: T | null;
    summary: string;
    metadata: {
      sources: string[];
      dataPoints: number;
      creditsUsed: number;
      responseTime: number;
    };
    error?: {
      service: string;
      message: string;
      retryable: boolean;
    };
  }
  
  // Unified Query Parameters
  export interface FlowentQuery {
    prompt: string;
    context?: Record<string, any>;
    maxSources?: number;
    freshness?: 'realtime' | 'cached';
  }