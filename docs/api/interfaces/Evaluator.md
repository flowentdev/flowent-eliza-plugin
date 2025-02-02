[@elizaos/core v0.1.7](../index.md) / Evaluator

# Interface: Evaluator

Evaluator for assessing agent responses

## Properties

### alwaysRun?

> `optional` **alwaysRun**: `boolean`

Whether to always run

#### Defined in

[packages/core/src/types.ts:449](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L449)

---

### description

> **description**: `string`

Detailed description

#### Defined in

[packages/core/src/types.ts:452](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L452)

---

### similes

> **similes**: `string`[]

Similar evaluator descriptions

#### Defined in

[packages/core/src/types.ts:455](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L455)

---

### examples

> **examples**: [`EvaluationExample`](EvaluationExample.md)[]

Example evaluations

#### Defined in

[packages/core/src/types.ts:458](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L458)

---

### handler

> **handler**: [`Handler`](../type-aliases/Handler.md)

Handler function

#### Defined in

[packages/core/src/types.ts:461](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L461)

---

### name

> **name**: `string`

Evaluator name

#### Defined in

[packages/core/src/types.ts:464](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L464)

---

### validate

> **validate**: [`Validator`](../type-aliases/Validator.md)

Validation function

#### Defined in

[packages/core/src/types.ts:467](https://github.com/elizaOS/eliza/blob/main/packages/core/src/types.ts#L467)
