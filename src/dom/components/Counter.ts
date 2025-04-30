import { computed } from "../../core";

export function Counter(props: { counter: number; toggle: boolean }) {
    const double = computed(() => props.counter * 2);

    return `
        <span>Counter: ${props.counter}</span>
        <span>Double: ${double.value}</span>
        <span>Toggle ${props.toggle ? "On" : "Off"}</span>

        <button onClick="incrementCounter">Click</button>
        <button onClick="changeName">Toggle</button>
    `;
}
