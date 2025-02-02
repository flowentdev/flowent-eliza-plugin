import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import {
    DEPIN_METRICS_URL,
    DEPIN_PROJECTS_URL,
    DePINScanProvider,
} from "../providers/depinData";
import {
    mockDepinscanMetrics,
    mockDepinscanProjects,
    parsedProjectsSample,
} from "./sampleData";

vi.stubGlobal(
    "fetch",
    vi.fn((url) => {
        if (url.includes(DEPIN_METRICS_URL)) {
            return Promise.resolve({
                json: () => Promise.resolve(mockDepinscanMetrics),
            });
        } else if (url.includes(DEPIN_PROJECTS_URL)) {
            return Promise.resolve({
                json: () => Promise.resolve(mockDepinscanProjects),
            });
        } else {
            return Promise.reject(new Error("Unknown endpoint"));
        }
    })
);

// Mock NodeCache
vi.mock("node-cache", () => {
    return {
        default: vi.fn().mockImplementation(() => ({
            set: vi.fn(),
            get: vi.fn().mockReturnValue(null),
        })),
    };
});

// Mock the ICacheManager
const mockCacheManager = {
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn(),
};

describe("Depin Data provider", () => {
    let depinscan: DePINScanProvider;

    beforeEach(() => {
        vi.clearAllMocks();
        mockCacheManager.get.mockResolvedValue(null);

        depinscan = new DePINScanProvider(mockCacheManager as any);
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    describe("Cache Management", () => {
        it("should use cached data when available", async () => {
            mockCacheManager.get.mockResolvedValueOnce(mockDepinscanMetrics);

            const result = await (depinscan as any).getCachedData("test-key");

            expect(result).toEqual(mockDepinscanMetrics);
            expect(mockCacheManager.get).toHaveBeenCalledTimes(1);
        });

        it("should write data to both caches", async () => {
            await (depinscan as any).setCachedData(
                "test-key",
                mockDepinscanMetrics
            );

            expect(mockCacheManager.set).toHaveBeenCalledWith(
                expect.stringContaining("test-key"),
                mockDepinscanMetrics,
                expect.any(Object)
            );
        });
    });

    it("should fetch depinscan metrics", async () => {
        const metrics = await depinscan.getDailyMetrics();

        expect(metrics).toEqual(mockDepinscanMetrics);
    });
    it("should fetch depinscan projects", async () => {
        const projects = await depinscan.getProjects();

        expect(projects).toEqual(parsedProjectsSample);
    });
});
