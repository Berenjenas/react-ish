# React-ish

React-ish is a lightweight reactive library designed for experimenting with state management and reactivity. It provides a simple API for creating reactive states, computed values, and effects.

## Features

-   **State**: Create reactive state objects that notify subscribers when updated.
-   **Computed**: Derive values from reactive states that automatically update when dependencies change.
-   **Effect**: Run side effects in response to state changes.

## Installation

Clone the repository and install dependencies using `pnpm`:

```bash
pnpm install
```

## Usage

### Example: Basic State and Effects

```typescript
import { state, computed, effect } from "./lib";

const count = state(0);
const computedCount = computed(() => count.value * 2);

effect(() => {
	console.log("Count is", count.value);
});

effect(() => {
	console.log("Computed count is", computedCount.value);
});

setInterval(() => {
	count.set(count.value + 1);
}, 2000);
```

### API

#### `state(initialValue)`

Creates a reactive state object.

-   **Parameters**: `initialValue` - The initial value of the state.
-   **Returns**: A state object with `value` (getter) and `set(newValue)` (setter).

#### `computed(callback)`

Creates a computed state derived from other reactive states.

-   **Parameters**: `callback` - A function that returns the computed value.
-   **Returns**: A state object with `value` (getter).

#### `effect(callback)`

Registers a side effect that runs whenever its dependencies change.

-   **Parameters**: `callback` - A function that optionally returns a cleanup function.

## Development

### Scripts

-   `pnpm run build`: Compiles the TypeScript code.
-   `pnpm run start`: Runs the compiled code.
-   `pnpm run dev:tsc`: Watches for TypeScript changes and recompiles.
-   `pnpm run dev:node`: Watches for changes and restarts the Node.js process.
-   `pnpm run dev`: Runs both `dev:tsc` and `dev:node`.

## License

This project is licensed under the ISC License.

## Author

Created by **Berenjena** 🍆
