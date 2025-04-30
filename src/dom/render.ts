import { resetGlobalIndex } from "../core";
import { App } from "./app";

export function renderApp() {
    resetGlobalIndex();

    document.body.innerHTML = App();
}
