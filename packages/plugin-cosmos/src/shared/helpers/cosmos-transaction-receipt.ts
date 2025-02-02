import type {
    DeliverTxResponse,
    ExecuteResult,
} from "@cosmjs/cosmwasm-stargate";

const DEFUALT_EVENTS = [
    { eventName: "fee_pay", attributeType: "fee" },
    { eventName: "tip_refund", attributeType: "tip" },
];

export const getPaidFeeFromReceipt = (
    receipt: ExecuteResult | DeliverTxResponse,
    eventsToPickGasFor = DEFUALT_EVENTS
) => {
    const selectedEvents = receipt.events.filter(({ type }) =>
        eventsToPickGasFor.map(({ eventName }) => eventName).includes(type)
    );

    return selectedEvents.reduce<number>((acc, { attributes }) => {
        return (
            acc +
            attributes.reduce<number>((_acc, { key, value }) => {
                if (
                    eventsToPickGasFor.some(
                        ({ attributeType }) => attributeType === key
                    )
                ) {
                    const testValue = value.match(/\d+/)?.[0];
                    const testValueAsNumber = Number(testValue);

                    if (Number.isNaN(testValueAsNumber)) {
                        return _acc;
                    }

                    _acc = _acc + testValueAsNumber;

                    return _acc;
                }

                return _acc;
            }, 0)
        );
    }, 0);
};
