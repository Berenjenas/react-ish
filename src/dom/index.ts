import { computed, state } from "../core";
import { registerListener } from "./render";
import "./index.css";

const count = state<number>(0);
const double = computed(() => count.value * 2);

registerListener("counter", "click", () => {
	count.set(count.value + 1);
});

export function App() {
	return `${Header({ count: count.value })}<main><button id="counter">Click</button></main>${Footer({ double: double.value })}`;
}

function Header(props: { count: number }) {
	return `<header>Hello World! - Count: ${props.count}</header>`;
}

function Footer(props: { double: number }) {
	return `<footer>Footer component - Computed value (count x2): ${props.double}</footer>`;
}
