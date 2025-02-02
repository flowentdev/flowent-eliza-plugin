// src/providers/wallet.ts
import { Actor, type ActorSubclass, HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";
import type { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";

export class WalletProvider {
    private privateKey: string;
    private identity: Ed25519KeyIdentity;
    private host: string;

    constructor(privateKey: string, host = "https://ic0.app") {
        this.privateKey = privateKey;
        this.host = host;
        this.identity = this.createIdentity();
    }

    private createIdentity = (): Ed25519KeyIdentity => {
        if (!this.privateKey) {
            throw new Error("Private key is required");
        }
        try {
            const privateKeyBytes = Buffer.from(this.privateKey, "hex");
            if (privateKeyBytes.length !== 32) {
                throw new Error("Invalid private key length");
            }
            const arrayBuffer = privateKeyBytes.buffer.slice(
                privateKeyBytes.byteOffset,
                privateKeyBytes.byteOffset + privateKeyBytes.length
            );
            return Ed25519KeyIdentity.fromSecretKey(arrayBuffer);
        } catch {
            throw new Error("Failed to create ICP identity");
        }
    };

    public createAgent = async (): Promise<HttpAgent> => {
        return HttpAgent.create({
            identity: this.identity,
            host: this.host,
        });
    };

    public getIdentity = (): Ed25519KeyIdentity => {
        return this.identity;
    };

    public getPrincipal = (): Principal => {
        return this.identity.getPrincipal();
    };

    public createActor = async <T>(
        idlFactory: IDL.InterfaceFactory,
        canisterId: string,
        fetchRootKey = false
    ): Promise<ActorSubclass<T>> => {
        const agent = await this.createAgent();
        if (fetchRootKey) {
            await agent.fetchRootKey();
        }
        return Actor.createActor<T>(idlFactory, {
            agent,
            canisterId,
        });
    };
}

// Add interface for the wallet provider return type
interface ICPWalletResponse {
    wallet: WalletProvider | null;
    identity: Ed25519KeyIdentity | null;
    principal: string | null;
    isAuthenticated: boolean;
    createActor?: typeof WalletProvider.prototype.createActor;
    error?: string;
}

// Add the new provider instance
export const icpWalletProvider: Provider = {
    async get(
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<ICPWalletResponse> {
        try {
            const privateKey = runtime.getSetting(
                "INTERNET_COMPUTER_PRIVATE_KEY"
            );
            if (!privateKey) {
                throw new Error("INTERNET_COMPUTER_PRIVATE_KEY not found");
            }

            const wallet = new WalletProvider(privateKey);

            return {
                wallet,
                identity: wallet.getIdentity(),
                principal: wallet.getPrincipal().toString(),
                isAuthenticated: true,
                createActor: wallet.createActor,
            };
        } catch (error: unknown) {
            return {
                wallet: null,
                identity: null,
                principal: null,
                isAuthenticated: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    },
};

// Export utility function
export const createAnonymousActor = async <T>(
    idlFactory: IDL.InterfaceFactory,
    canisterId: string,
    host = "https://ic0.app",
    fetchRootKey = false
): Promise<ActorSubclass<T>> => {
    const anonymousAgent = new HttpAgent({
        host,
        retryTimes: 1,
        verifyQuerySignatures: false,
    });

    if (fetchRootKey) {
        await anonymousAgent.fetchRootKey();
    }

    return Actor.createActor<T>(idlFactory, {
        agent: anonymousAgent,
        canisterId,
    });
};
