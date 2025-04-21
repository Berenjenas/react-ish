import { createElement, defineComponent, render, useEffect, useState } from "./render";

const Counter = defineComponent(() => {
    const count = useState<number>(0);

    useEffect(() => {
        console.log("Count updated:", count.value);
    });

    return createElement(
        "div",
        undefined,
        createElement("button", { click: () => count.set(count.value - 1) }, "-"),
        createElement("span", {}, `Count: ${count.value}`),
        createElement("button", { click: () => count.set(count.value + 1) }, "+")
    );
});

const App = defineComponent(() => {
    return createElement("div", undefined, Counter());
});

render(App(), document.getElementById("root")!);
