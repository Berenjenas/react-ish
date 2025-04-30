import { App } from "./app";

const root = document.getElementById("root") as HTMLElement;

export function renderApp() {
    root.innerHTML = App();
}
