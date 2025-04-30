import { state } from "../core";
import { Counter } from "./components/Counter";
import { onClick } from "./events";
import "./index.css";

export function App() {
    const counter = state<number>(0);
    const toggle = state<boolean>(true); // A second state just to show that we can have multiple states

    /**
     * This is a click event handler. It will be executed when the button with the `onClick="incrementCounter"` is clicked.
     */
    onClick("incrementCounter", () => {
        counter.set(counter.value + 1);
    });

    /**
     * This is just a name change, not a real toggle. Also this is just to show that we can have multiple events handlers
     * Note that the event handler is not a function, but a string. This is because we are using a custom event delegation system.
     * The event delegation system is implemented in the events.ts file. It uses a map to store the event handlers and a single event listener to handle all events.
     *
     * Event Id should be unique for each event handler. This is to avoid conflicts between different event handlers.
     */
    onClick("changeName", () => {
        toggle.set(!toggle.value);
    });

    return `
        <h1>Hello world</h1>

        <h2>This is a reactive example</h2>
        
        ${Counter({ counter: counter.value, toggle: toggle.value })}
    `;
}
