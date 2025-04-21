# React-ish

React-ish is a lightweight reactive library designed for experimenting with state management and reactivity. It provides a simple API for creating
reactive states, computed values, and effects.

## Features

- **State**: Create reactive state objects that notify subscribers when updated.
- **Computed**: Derive values from reactive states that automatically update when dependencies change.
- **Effect**: Run side effects in response to state changes.
- **Readonly**: Expose state as read-only to prevent external modifications.
- **Watch**: Observe changes in state or computed values and react to them.

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

- **Parameters**: `initialValue` - The initial value of the state.
- **Returns**: A state object with `value` (getter) and `set(newValue)` (setter).

#### `computed(callback)`

Creates a computed state derived from other reactive states.

- **Parameters**: `callback` - A function that returns the computed value.
- **Returns**: A state object with `value` (getter).

#### `readonly(state)`

Creates a readonly version of a state object.

- **Parameters**: `state` - The state object to make readonly.
- **Returns**: A readonly state object with `value` (getter).

#### `watch(source, callback, options?)`

Observes changes in a state or computed value and executes a callback.

- **Parameters**:
    - `source`: A function that returns the value to watch.
    - `callback`: A function that receives the new and old values.
    - `options`: An optional object with options for the watcher.
        - `skip`: A boolean indicating whether to skip the internal effect execution.

#### `effect(callback, options?)`

Registers a side effect that runs whenever its dependencies change.

- **Parameters**:
    - `callback`: A function that optionally returns a cleanup function.
    - `options`: An optional object with options for the effect.
        - `skip`: A boolean indicating whether to skip the effect's execution.

## Development

### Scripts

- `pnpm run build`: Compiles the TypeScript code using `tsup`.
- `pnpm run start`: Runs the compiled code.
- `pnpm run dev:tsc`: Watches for TypeScript changes and recompiles.
- `pnpm run dev:node`: Watches for changes and restarts the Node.js process.
- `pnpm run dev`: Runs both `dev:tsc` and `dev:node`.
- `pnpm run test`: Runs tests with `vitest` and generates a coverage report.
- `pnpm run test:ci`: Runs tests with verbose reporting and coverage for CI environments.
- `pnpm run test:watch`: Runs tests in watch mode.
- `pnpm run lint`: Checks for linting errors using `eslint`.
- `pnpm run format`: Formats the code using Prettier.
- `pnpm run format:check`: Checks if the code is formatted correctly.
- `pnpm run clean`: Removes the `dist` directory.
- `pnpm run analyze`: Analyzes the bundle size using `source-map-explorer`.

## License

This project is licensed under the ISC License.

## Author

Created by **Berenjena** 🍆
