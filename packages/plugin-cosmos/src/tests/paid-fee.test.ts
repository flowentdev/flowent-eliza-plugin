import { describe, it, expect } from "vitest";
import type {
    DeliverTxResponse,
    ExecuteResult,
} from "@cosmjs/cosmwasm-stargate";
import { getPaidFeeFromReceipt } from "../shared/helpers/cosmos-transaction-receipt";

describe("PaidFee", () => {
    describe("getPaidFeeFromReceipt", () => {
        it("should return the correct fee from a matching event", () => {
            const receipt: ExecuteResult = {
                logs: [],
                transactionHash: "",
                events: [
                    {
                        type: "fee_pay",
                        attributes: [
                            { key: "fee", value: "100uatom" },
                            { key: "other_key", value: "200" },
                        ],
                    },
                    {
                        type: "tip_refund",
                        attributes: [{ key: "tip", value: "50uatom" }],
                    },
                ],
                height: 0,
                gasUsed: BigInt(0),
                gasWanted: BigInt(0),
            };

            const result = getPaidFeeFromReceipt(receipt);

            expect(result).toBe(150);
        });

        it("should return 0 if no matching events are present", () => {
            const receipt: DeliverTxResponse = {
                height: 0,
                transactionHash: "",
                gasUsed: BigInt(0),
                gasWanted: BigInt(0),
                code: 0,
                events: [
                    {
                        type: "unrelated_event",
                        attributes: [{ key: "some_key", value: "123" }],
                    },
                ],
                rawLog: "",
                msgResponses: [],
                txIndex: 0,
            };

            const result = getPaidFeeFromReceipt(receipt);

            expect(result).toBe(0);
        });

        it("should ignore invalid number values", () => {
            const receipt: ExecuteResult = {
                logs: [],
                transactionHash: "",
                events: [
                    {
                        type: "fee_pay",
                        attributes: [
                            { key: "fee", value: "invalid_value" },
                            { key: "fee", value: "200uatom" },
                        ],
                    },
                ],
                height: 0,
                gasUsed: BigInt(0),
                gasWanted: BigInt(0),
            };

            const result = getPaidFeeFromReceipt(receipt);

            expect(result).toBe(200);
        });

        it("should handle an empty receipt gracefully", () => {
            const receipt: DeliverTxResponse = {
                height: 0,
                transactionHash: "",
                gasUsed: BigInt(0),
                gasWanted: BigInt(0),
                code: 0,
                events: [],
                rawLog: "",
                msgResponses: [],
                txIndex: 0,
            };

            const result = getPaidFeeFromReceipt(receipt);

            expect(result).toBe(0);
        });
    });
});
