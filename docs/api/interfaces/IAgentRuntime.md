[@elizaos/core v0.1.7](../index.md) / IAgentRuntime

# Interface: IAgentRuntime

## Properties

### agentId

> **agentId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

Properties

#### Defined in

[packages/core/src/types.ts:1100](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1100)

---

### serverUrl

> **serverUrl**: `string`

#### Defined in

[packages/core/src/types.ts:1101](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1101)

---

### databaseAdapter

> **databaseAdapter**: [`IDatabaseAdapter`](IDatabaseAdapter.md)

#### Defined in

[packages/core/src/types.ts:1102](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1102)

---

### token

> **token**: `string`

#### Defined in

[packages/core/src/types.ts:1103](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1103)

---

### modelProvider

> **modelProvider**: [`ModelProviderName`](../enumerations/ModelProviderName.md)

#### Defined in

[packages/core/src/types.ts:1104](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1104)

---

### imageModelProvider

> **imageModelProvider**: [`ModelProviderName`](../enumerations/ModelProviderName.md)

#### Defined in

[packages/core/src/types.ts:1105](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1105)

---

### imageVisionModelProvider

> **imageVisionModelProvider**: [`ModelProviderName`](../enumerations/ModelProviderName.md)

#### Defined in

[packages/core/src/types.ts:1106](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1106)

---

### character

> **character**: [`Character`](../type-aliases/Character.md)

#### Defined in

[packages/core/src/types.ts:1107](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1107)

---

### providers

> **providers**: [`Provider`](Provider.md)[]

#### Defined in

[packages/core/src/types.ts:1108](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1108)

---

### actions

> **actions**: [`Action`](Action.md)[]

#### Defined in

[packages/core/src/types.ts:1109](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1109)

---

### evaluators

> **evaluators**: [`Evaluator`](Evaluator.md)[]

#### Defined in

[packages/core/src/types.ts:1110](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1110)

---

### plugins

> **plugins**: [`Plugin`](../type-aliases/Plugin.md)[]

#### Defined in

[packages/core/src/types.ts:1111](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1111)

---

### fetch()?

> `optional` **fetch**: (`input`, `init`?) => `Promise`\<`Response`\>(`input`, `init`?) => `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)

#### Parameters

• **input**: `RequestInfo` \| `URL`

• **init?**: `RequestInit`

#### Returns

`Promise`\<`Response`\>

#### Parameters

• **input**: `string` \| `Request` \| `URL`

• **init?**: `RequestInit`

#### Returns

`Promise`\<`Response`\>

#### Defined in

[packages/core/src/types.ts:1113](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1113)

---

### messageManager

> **messageManager**: [`IMemoryManager`](IMemoryManager.md)

#### Defined in

[packages/core/src/types.ts:1115](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1115)

---

### descriptionManager

> **descriptionManager**: [`IMemoryManager`](IMemoryManager.md)

#### Defined in

[packages/core/src/types.ts:1116](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1116)

---

### documentsManager

> **documentsManager**: [`IMemoryManager`](IMemoryManager.md)

#### Defined in

[packages/core/src/types.ts:1117](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1117)

---

### knowledgeManager

> **knowledgeManager**: [`IMemoryManager`](IMemoryManager.md)

#### Defined in

[packages/core/src/types.ts:1118](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1118)

---

### loreManager

> **loreManager**: [`IMemoryManager`](IMemoryManager.md)

#### Defined in

[packages/core/src/types.ts:1119](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1119)

---

### cacheManager

> **cacheManager**: [`ICacheManager`](ICacheManager.md)

#### Defined in

[packages/core/src/types.ts:1121](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1121)

---

### services

> **services**: `Map`\<[`ServiceType`](../enumerations/ServiceType.md), [`Service`](../classes/Service.md)\>

#### Defined in

[packages/core/src/types.ts:1123](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1123)

---

### clients

> **clients**: `Record`\<`string`, `any`\>

any could be EventEmitter
but I think the real solution is forthcoming as a base client interface

#### Defined in

[packages/core/src/types.ts:1126](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1126)

## Methods

### initialize()

> **initialize**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1128](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1128)

---

### registerMemoryManager()

> **registerMemoryManager**(`manager`): `void`

#### Parameters

• **manager**: [`IMemoryManager`](IMemoryManager.md)

#### Returns

`void`

#### Defined in

[packages/core/src/types.ts:1130](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1130)

---

### getMemoryManager()

> **getMemoryManager**(`name`): [`IMemoryManager`](IMemoryManager.md)

#### Parameters

• **name**: `string`

#### Returns

[`IMemoryManager`](IMemoryManager.md)

#### Defined in

[packages/core/src/types.ts:1132](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1132)

---

### getService()

> **getService**\<`T`\>(`service`): `T`

#### Type Parameters

• **T** _extends_ [`Service`](../classes/Service.md)

#### Parameters

• **service**: [`ServiceType`](../enumerations/ServiceType.md)

#### Returns

`T`

#### Defined in

[packages/core/src/types.ts:1134](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1134)

---

### registerService()

> **registerService**(`service`): `void`

#### Parameters

• **service**: [`Service`](../classes/Service.md)

#### Returns

`void`

#### Defined in

[packages/core/src/types.ts:1136](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1136)

---

### getSetting()

> **getSetting**(`key`): `string`

#### Parameters

• **key**: `string`

#### Returns

`string`

#### Defined in

[packages/core/src/types.ts:1138](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1138)

---

### getConversationLength()

> **getConversationLength**(): `number`

Methods

#### Returns

`number`

#### Defined in

[packages/core/src/types.ts:1141](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1141)

---

### processActions()

> **processActions**(`message`, `responses`, `state`?, `callback`?): `Promise`\<`void`\>

#### Parameters

• **message**: [`Memory`](Memory.md)

• **responses**: [`Memory`](Memory.md)[]

• **state?**: [`State`](State.md)

• **callback?**: [`HandlerCallback`](../type-aliases/HandlerCallback.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1143](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1143)

---

### evaluate()

> **evaluate**(`message`, `state`?, `didRespond`?, `callback`?): `Promise`\<`string`[]\>

#### Parameters

• **message**: [`Memory`](Memory.md)

• **state?**: [`State`](State.md)

• **didRespond?**: `boolean`

• **callback?**: [`HandlerCallback`](../type-aliases/HandlerCallback.md)

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/core/src/types.ts:1150](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1150)

---

### ensureParticipantExists()

> **ensureParticipantExists**(`userId`, `roomId`): `Promise`\<`void`\>

#### Parameters

• **userId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

• **roomId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1157](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1157)

---

### ensureUserExists()

> **ensureUserExists**(`userId`, `userName`, `name`, `source`): `Promise`\<`void`\>

#### Parameters

• **userId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

• **userName**: `string`

• **name**: `string`

• **source**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1159](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1159)

---

### registerAction()

> **registerAction**(`action`): `void`

#### Parameters

• **action**: [`Action`](Action.md)

#### Returns

`void`

#### Defined in

[packages/core/src/types.ts:1166](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1166)

---

### ensureConnection()

> **ensureConnection**(`userId`, `roomId`, `userName`?, `userScreenName`?, `source`?): `Promise`\<`void`\>

#### Parameters

• **userId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

• **roomId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

• **userName?**: `string`

• **userScreenName?**: `string`

• **source?**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1168](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1168)

---

### ensureParticipantInRoom()

> **ensureParticipantInRoom**(`userId`, `roomId`): `Promise`\<`void`\>

#### Parameters

• **userId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

• **roomId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1176](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1176)

---

### ensureRoomExists()

> **ensureRoomExists**(`roomId`): `Promise`\<`void`\>

#### Parameters

• **roomId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1178](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1178)

---

### composeState()

> **composeState**(`message`, `additionalKeys`?): `Promise`\<[`State`](State.md)\>

#### Parameters

• **message**: [`Memory`](Memory.md)

• **additionalKeys?**

#### Returns

`Promise`\<[`State`](State.md)\>

#### Defined in

[packages/core/src/types.ts:1180](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1180)

---

### updateRecentMessageState()

> **updateRecentMessageState**(`state`): `Promise`\<[`State`](State.md)\>

#### Parameters

• **state**: [`State`](State.md)

#### Returns

`Promise`\<[`State`](State.md)\>

#### Defined in

[packages/core/src/types.ts:1185](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L1185)
