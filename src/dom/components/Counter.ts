export function Counter(props: { counter: number }) {
    return `<span>Counter: ${props.counter}</span>

        <button data-click="incrementCounter">Click</button>`;
}
