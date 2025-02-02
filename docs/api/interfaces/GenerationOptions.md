[@elizaos/core v0.1.7](../index.md) / GenerationOptions

# Interface: GenerationOptions

Configuration options for generating objects with a model.

## Properties

### runtime

> **runtime**: [`IAgentRuntime`](IAgentRuntime.md)

#### Defined in

[packages/core/src/generation.ts:1516](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1516)

---

### context

> **context**: `string`

#### Defined in

[packages/core/src/generation.ts:1517](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1517)

---

### modelClass

> **modelClass**: [`ModelClass`](../enumerations/ModelClass.md)

#### Defined in

[packages/core/src/generation.ts:1518](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1518)

---

### schema?

> `optional` **schema**: `ZodType`\<`any`, `ZodTypeDef`, `any`\>

#### Defined in

[packages/core/src/generation.ts:1519](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1519)

---

### schemaName?

> `optional` **schemaName**: `string`

#### Defined in

[packages/core/src/generation.ts:1520](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1520)

---

### schemaDescription?

> `optional` **schemaDescription**: `string`

#### Defined in

[packages/core/src/generation.ts:1521](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1521)

---

### stop?

> `optional` **stop**: `string`[]

#### Defined in

[packages/core/src/generation.ts:1522](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1522)

---

### mode?

> `optional` **mode**: `"auto"` \| `"json"` \| `"tool"`

#### Defined in

[packages/core/src/generation.ts:1523](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1523)

---

### experimental_providerMetadata?

> `optional` **experimental_providerMetadata**: `Record`\<`string`, `unknown`\>

#### Defined in

[packages/core/src/generation.ts:1524](https://github.com/elizaOS/eliza/blob/main/packages/core/src/generation.ts#L1524)
