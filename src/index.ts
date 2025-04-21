import { state, computed, readonly, effect } from "./lib";

// Example 1: Basic state usage
const count = state(0);

effect(() => {
	console.log("Count is", count.value);

	return () => {
		console.log("Cleanup count effect");
	};
});

// Example 2: Computed state usage
const computedCount = computed(() => count.value * 2);

effect(() => {
	console.log("Computed count is", computedCount.value);

	return () => {
		console.log("Cleanup computed count effect");
	};
});

// Example 3: Readonly state usage
const readonlyCount = readonly(count);

effect(() => {
	console.log("Readonly count is", readonlyCount.value);

	return () => {
		console.log("Cleanup readonly count effect");
	};
});

// ---------------------------------------------------------

setInterval(() => {
	count.set(count.value + 1);
}, 2000);
