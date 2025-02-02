import { AnonSocksClient } from "@anyone-protocol/anyone-client";
import axios from "axios";
import { AnyoneClientService } from "./AnyoneClientService";

export class AnyoneProxyService {
    private static instance: AnyoneProxyService | null = null;
    private sockClient: AnonSocksClient | null = null;
    private originalAxios: any = null;
    private originalDefaults: any = null;

    static getInstance(): AnyoneProxyService {
        if (!AnyoneProxyService.instance) {
            AnyoneProxyService.instance = new AnyoneProxyService();
        }
        return AnyoneProxyService.instance;
    }

    async initialize(): Promise<void> {
        await AnyoneClientService.initialize();
        const anon = AnyoneClientService.getInstance();
        if (!anon) {
            throw new Error("Anyone client not initialized");
        }

        this.sockClient = new AnonSocksClient(anon);

        // Store original axios configuration
        this.originalDefaults = { ...axios.defaults };
        this.originalAxios = {
            request: axios.request,
            get: axios.get,
            post: axios.post,
            put: axios.put,
            delete: axios.delete,
            patch: axios.patch,
        };

        // Create new defaults object instead of modifying existing one
        axios.defaults = {
            ...axios.defaults,
            ...this.sockClient.axios.defaults,
        };

        // Apply proxy methods
        axios.request = this.sockClient.axios.request.bind(
            this.sockClient.axios
        );
        axios.get = this.sockClient.axios.get.bind(this.sockClient.axios);
        axios.post = this.sockClient.axios.post.bind(this.sockClient.axios);
        axios.put = this.sockClient.axios.put.bind(this.sockClient.axios);
        axios.delete = this.sockClient.axios.delete.bind(this.sockClient.axios);
        axios.patch = this.sockClient.axios.patch.bind(this.sockClient.axios);
    }

    cleanup(): void {
        if (this.originalAxios && this.originalDefaults) {
            // Create fresh axios defaults
            axios.defaults = { ...this.originalDefaults };

            // Create fresh bindings
            axios.request = this.originalAxios.request.bind(axios);
            axios.get = this.originalAxios.get.bind(axios);
            axios.post = this.originalAxios.post.bind(axios);
            axios.put = this.originalAxios.put.bind(axios);
            axios.delete = this.originalAxios.delete.bind(axios);
            axios.patch = this.originalAxios.patch.bind(axios);

            this.originalAxios = null;
            this.originalDefaults = null;
        }
        AnyoneProxyService.instance = null;
    }
}
