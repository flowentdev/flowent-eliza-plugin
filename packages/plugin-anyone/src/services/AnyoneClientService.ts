import { Anon } from "@anyone-protocol/anyone-client";

export class AnyoneClientService {
    private static instance: Anon | null = null;

    static getInstance(): Anon | null {
        return this.instance;
    }

    static async initialize(): Promise<void> {
        if (!this.instance) {
            this.instance = new Anon({
                displayLog: true,
                socksPort: 9050,
                autoTermsAgreement: true,
            });
            await this.instance.start();
        }
    }

    static async stop(): Promise<void> {
        if (this.instance) {
            await this.instance.stop();
            this.instance = null;
        }
    }
}
