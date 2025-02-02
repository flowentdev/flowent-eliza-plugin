[@elizaos/core v0.1.7](../index.md) / State

# Interface: State

Represents the current state/context of a conversation

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### userId?

> `optional` **userId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

ID of user who sent current message

#### Defined in

[packages/core/src/types.ts:253](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L253)

---

### agentId?

> `optional` **agentId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

ID of agent in conversation

#### Defined in

[packages/core/src/types.ts:256](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L256)

---

### bio

> **bio**: `string`

Agent's biography

#### Defined in

[packages/core/src/types.ts:259](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L259)

---

### lore

> **lore**: `string`

Agent's background lore

#### Defined in

[packages/core/src/types.ts:262](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L262)

---

### messageDirections

> **messageDirections**: `string`

Message handling directions

#### Defined in

[packages/core/src/types.ts:265](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L265)

---

### postDirections

> **postDirections**: `string`

Post handling directions

#### Defined in

[packages/core/src/types.ts:268](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L268)

---

### roomId

> **roomId**: \`$\{string\}-$\{string\}-$\{string\}-$\{string\}-$\{string\}\`

Current room/conversation ID

#### Defined in

[packages/core/src/types.ts:271](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L271)

---

### agentName?

> `optional` **agentName**: `string`

Optional agent name

#### Defined in

[packages/core/src/types.ts:274](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L274)

---

### senderName?

> `optional` **senderName**: `string`

Optional message sender name

#### Defined in

[packages/core/src/types.ts:277](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L277)

---

### actors

> **actors**: `string`

String representation of conversation actors

#### Defined in

[packages/core/src/types.ts:280](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L280)

---

### actorsData?

> `optional` **actorsData**: [`Actor`](Actor.md)[]

Optional array of actor objects

#### Defined in

[packages/core/src/types.ts:283](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L283)

---

### goals?

> `optional` **goals**: `string`

Optional string representation of goals

#### Defined in

[packages/core/src/types.ts:286](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L286)

---

### goalsData?

> `optional` **goalsData**: [`Goal`](Goal.md)[]

Optional array of goal objects

#### Defined in

[packages/core/src/types.ts:289](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L289)

---

### recentMessages

> **recentMessages**: `string`

Recent message history as string

#### Defined in

[packages/core/src/types.ts:292](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L292)

---

### recentMessagesData

> **recentMessagesData**: [`Memory`](Memory.md)[]

Recent message objects

#### Defined in

[packages/core/src/types.ts:295](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L295)

---

### actionNames?

> `optional` **actionNames**: `string`

Optional valid action names

#### Defined in

[packages/core/src/types.ts:298](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L298)

---

### actions?

> `optional` **actions**: `string`

Optional action descriptions

#### Defined in

[packages/core/src/types.ts:301](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L301)

---

### actionsData?

> `optional` **actionsData**: [`Action`](Action.md)[]

Optional action objects

#### Defined in

[packages/core/src/types.ts:304](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L304)

---

### actionExamples?

> `optional` **actionExamples**: `string`

Optional action examples

#### Defined in

[packages/core/src/types.ts:307](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L307)

---

### providers?

> `optional` **providers**: `string`

Optional provider descriptions

#### Defined in

[packages/core/src/types.ts:310](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L310)

---

### responseData?

> `optional` **responseData**: [`Content`](Content.md)

Optional response content

#### Defined in

[packages/core/src/types.ts:313](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L313)

---

### recentInteractionsData?

> `optional` **recentInteractionsData**: [`Memory`](Memory.md)[]

Optional recent interaction objects

#### Defined in

[packages/core/src/types.ts:316](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L316)

---

### recentInteractions?

> `optional` **recentInteractions**: `string`

Optional recent interactions string

#### Defined in

[packages/core/src/types.ts:319](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L319)

---

### formattedConversation?

> `optional` **formattedConversation**: `string`

Optional formatted conversation

#### Defined in

[packages/core/src/types.ts:322](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L322)

---

### knowledge?

> `optional` **knowledge**: `string`

Optional formatted knowledge

#### Defined in

[packages/core/src/types.ts:325](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L325)

---

### knowledgeData?

> `optional` **knowledgeData**: [`KnowledgeItem`](../type-aliases/KnowledgeItem.md)[]

Optional knowledge data

#### Defined in

[packages/core/src/types.ts:327](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L327)
