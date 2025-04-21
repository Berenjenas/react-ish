import { state } from "../../../core";
import { createComponent, getComponentHTML, registerEventDelegation } from "../../component";

const count = state(0);

export const counter = createComponent("counter-component", {
    tag: "div",
    children: () => getComponentHTML("/src/dom/components/counter/counter.html"),
    state: {
        count: count
    }
});

registerEventDelegation({
    componentName: "counter-component",
    eventType: "click",
    matcherId: "counter-btn",
    event: () => count.set(count.value + 1)
});
