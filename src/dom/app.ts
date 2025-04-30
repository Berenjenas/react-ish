import { state } from "../core";
import { Counter } from "./components/Counter";
import { onClick } from "./events";

const counter = state(0);

onClick("incrementCounter", () => {
    counter.set(counter.value + 1);
});

export function App() {
    return `<div>
        <h1>Hello world</h1>
        
        ${Counter({ counter: counter.value })}
    </div>`;
}
