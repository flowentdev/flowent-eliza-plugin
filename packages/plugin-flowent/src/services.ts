import axios from 'axios';
import { FlowentResponse, FlowentQuery } from './types';

export class FlowentService {
  private static readonly BASE_URL = 'https://api.flowent.com/v1';

  static async unifiedQuery(apiKey: string, query: FlowentQuery): Promise<FlowentResponse> {
    try {
      // Construct the request payload with all parameters
      const payload = {
        query: query.prompt,
        context: query.context || {}, // Default to empty object if not provided
        maxSources: query.maxSources || 5, // Default to 5 sources if not provided
        freshness: query.freshness || 'realtime' // Default to realtime if not provided
      };

      const response = await axios.post<FlowentResponse>(
        `${this.BASE_URL}/unified-query`,
        payload,
        {
          headers: {
            'flowent-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 15000
        }
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Flowent API Error: ${error.response?.data?.error || error.message}`);
      }
      throw new Error('Unknown error occurred');
    }
  }
}