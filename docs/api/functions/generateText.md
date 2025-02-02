[@elizaos/core v0.1.7](../index.md) / generateText

# Function: generateText()

> **generateText**(`opts`): `Promise`\<`string`\>

Send a message to the model for a text generateText - receive a string back and parse how you'd like

## Parameters

• **opts**

The options for the generateText request.

• **opts.runtime**: [`IAgentRuntime`](../interfaces/IAgentRuntime.md)

• **opts.context**: `string`

The context of the message to be completed.

• **opts.modelClass**: `string`

• **opts.tools?**: `Record`\<`string`, `Tool`\> = `{}`

• **opts.onStepFinish?**

• **opts.maxSteps?**: `number` = `1`

• **opts.stop?**: `string`[]

A list of strings to stop the generateText at.

• **opts.customSystemPrompt?**: `string`

## Returns

`Promise`\<`string`\>

The completed message.

## Defined in

[packages/core/src/generation.ts:170](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L170)
