import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { IrysService } from "../src/services/irysService";
import { defaultCharacter, IrysDataType } from "@elizaos/core";

// Mock NodeCache
vi.mock("node-cache", () => {
    return {
        default: vi.fn().mockImplementation(() => ({
            set: vi.fn(),
            get: vi.fn().mockReturnValue(null),
        })),
    };
});

// Mock path module
vi.mock("path", async () => {
    const actual = await vi.importActual("path");
    return {
        ...actual,
        join: vi.fn().mockImplementation((...args) => args.join("/")),
    };
});

// Mock the ICacheManager
const mockCacheManager = {
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn(),
    delete: vi.fn(),
};

describe("IrysService", () => {
    let irysService;
    let mockedRuntime;

    beforeEach(async () => {
        vi.clearAllMocks();
        mockCacheManager.get.mockResolvedValue(null);

        mockedRuntime = {
            character: defaultCharacter,
            getSetting: vi.fn().mockImplementation((key: string) => {
                if (key === "EVM_WALLET_PRIVATE_KEY") // TEST PRIVATE KEY
                    return "0xd6ed963c4eb8436b284f62636a621c164161ee25218b3be5ca4cad1261f8c390";
                return undefined;
            }),
        };
        irysService = new IrysService();
        await irysService.initialize(mockedRuntime);
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    describe("Store String on Irys", () => {
        it("should store string on Irys", async () => {
            const result = await irysService.providerUploadDataOnIrys("Hello World", IrysDataType.OTHER, ["test"], ["test"]);
            console.log("Store String on Irys ERROR : ", result.error)
            expect(result.success).toBe(true);
        });
    });
});

