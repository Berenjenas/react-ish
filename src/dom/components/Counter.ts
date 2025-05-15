import { computed } from "../../core";

export function Counter(props: { counter: number; toggle: boolean }) {
    const double = computed(() => props.counter * 2);

    return `
        <span>Counter: ${props.counter}</span>
        <span>Double: ${double.value}</span>
        <span>Toggle ${props.toggle ? "On" : "Off"}</span>

        <button click="incrementCounter">Increment</button>
        <button click="toggle">Toggle</button>
    `;
}
