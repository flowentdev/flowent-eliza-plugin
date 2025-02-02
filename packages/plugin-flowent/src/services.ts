import axios from 'axios';
import { FlowentResponse } from './types';

export class FlowentService {
  private static readonly BASE_URL = 'https://api.flowent.com/v1';

  static async unifiedQuery(apiKey: string, query: string): Promise<FlowentResponse> {
    try {
      // Construct the request payload with all parameters
      const payload = {
        query: query,
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