import { state, computed, effect } from "./lib";

// Example 1: Basic state usage
const count = state(0);
const computedCount = computed(() => count.value * 2);

effect(() => {
	console.log("Count is", count.value);

	return () => {
		console.log("Cleanup count effect");
	};
});

effect(() => {
	console.log("Computed count is", computedCount.value);

	return () => {
		console.log("Cleanup computed count effect");
	};
});

setInterval(() => {
	count.set(count.value + 1);
}, 2000);
