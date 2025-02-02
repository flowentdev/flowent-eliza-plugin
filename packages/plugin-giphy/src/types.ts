// types.ts

export interface GiphyConfig {
    apiKey: string;
}

export interface GifResponse {
    data: Gif[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
}

export interface Gif {
    id: string;
    url: string; // Giphy webpage URL
    title: string;
    images: {
        original: {
            url: string; // Direct GIF URL
            width: string;
            height: string;
            size: string;
            mp4?: string;
            webp?: string;
        };
        downsized: {
            url: string;
            width: string;
            height: string;
        };
        fixed_height: {
            url: string;
            width: string;
            height: string;
        };
        // Add other image formats if needed
    };
}
