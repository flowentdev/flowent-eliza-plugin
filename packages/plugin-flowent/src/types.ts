export interface FlowentResponse<T = any> {
    structured: T | null;
    insight: string;
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