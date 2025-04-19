import type { State, EffectStack, EffectCallback, EffectCleanup } from "./types";

/**
 * A stack to manage active effects. Used internally by the `effect` function.
 */
const effectStack: EffectStack = [];

/**
 * Creates a reactive state that can be read and written to.
 * When the state changes, all registered effects are triggered.
 *
 * @template Value - The type of the state value.
 * @param initialValue - The initial value of the state.
 * @returns A Signal object representing the state.
 * The Signal object has a `value` property to get the current value and a `set` method to update it.
 */
export function state<Value>(initialValue: Value): State<Value> {
	const subscribers = new Set<() => void>();
	let value = initialValue;

	return {
		get value(): Value {
			// When the value is accessed, it checks if there are any active effects.
			// If there are, it adds the current effect to the subscribers set.
			// This allows the effect to be notified when the state changes.
			// The effectStack is used to manage the current effect.
			// The last effect in the stack is the one that is currently executing.
			if (effectStack.length > 0) {
				const currentEffect = effectStack[effectStack.length - 1];

				if (currentEffect && !subscribers.has(currentEffect)) {
					subscribers.add(currentEffect);
				}
			}

			// If there are no active effects, it simply return the current value.
			return value;
		},
		set(newValue: Value): void {
			// When the value is set, it checks if the new value is different from the current value.
			// If it is, it updates the value and notifies all subscribers.
			if (value !== newValue) {
				value = newValue;
				// Notify all subscribers (effects) that the state has changed.
				subscribers.forEach((callback) => callback());
			}
		}
	};
}

/**
 * Registers a callback function to be executed whenever the state changes.
 * The callback function can also return a cleanup function that will be called
 * when the effect is re-run or when the component is unmounted.
 * This allows for cleanup of resources, such as timers or event listeners.
 *
 * @param callback - A function that contains reactive dependencies and optionally returns a cleanup function.
 */
export function effect(callback: EffectCallback): void {
	let cleanup: EffectCleanup | undefined;

	/**
	 * The runner function is responsible for executing the effect.
	 * This closure is created to maintain the context of the effect and its cleanup function.
	 * It ensures that the cleanup function is called before re-running the effect.
	 * The runner function is also responsible for managing the effect stack.
	 * It pushes the current effect onto the stack before executing the callback function.
	 * After the callback function is executed, it pops the effect off the stack.
	 * This allows for nested effects and ensures that the cleanup function is called in the correct order.
	 */
	function runner(): void {
		// The previous cleanup function (if any) is called before running the new effect
		cleanup?.();
		// Cleanup is reset to undefined to avoid calling it again
		cleanup = undefined;

		try {
			// The current effect is pushed onto the stack
			effectStack.push(runner);
			// The callback function is executed, and if it returns the new cleanup function,
			cleanup = callback();
		} finally {
			// Once the effect is done, the current effect is removed from the stack
			effectStack.pop();
		}
	}

	runner();
}

/**
 * Creates a computed state that automatically updates when its dependencies change.
 * The computed state is derived from a callback function that returns a value.
 * When the dependencies change, the computed state is updated with the new value.
 *
 * @template Value - The type of the computed value.
 * @param callback - A function that returns the computed value.
 * @returns A Signal object representing the computed state.
 * The Signal object has a `value` property to get the current value and a `set` method to update it.
 */
export function computed<Value>(callback: () => Value): State<Value> {
	const computedState = state(callback());

	effect(() => {
		computedState.set(callback());
	});

	return computedState;
}
