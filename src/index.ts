import { state, computed, readonly, watch, effect } from "./lib";

// #region Example 1: Basic state usage

const count = state(0);

effect(
	() => {
		console.log("Count is", count.value);

		return () => {
			console.log("Cleanup count effect");
		};
	},
	{ skip: true }
);

// #endregion

// #region Example 2: Computed state usage

const computedCount = computed(() => count.value * 2);

effect(
	() => {
		console.log("Computed count is", computedCount.value);
	},
	{ skip: true }
);

// #endregion

// #region Example 3: Readonly state usage

const readonlyCount = readonly(count);

effect(
	() => {
		console.log("Readonly count is", readonlyCount.value);
	},
	{ skip: true }
);

// #endregion

// #region Example 4: Watcher usage

// Watch for primitive value changes
watch(
	() => count.value,
	(newValue, oldValue) => {
		console.log("Count changed from", oldValue, "to", newValue);
	},
	{ skip: true }
);

// Watch for object changes
watch(
	() => ({ count: count.value, computed: computedCount.value }),
	(newValue, oldValue) => {
		console.log("Count states changed from", oldValue, "to", newValue);
	},
	{ skip: true }
);

// #endregion

// ---------------------------------------------------------

setInterval(() => {
	count.set(count.value + 1);
}, 2000);
