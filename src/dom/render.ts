import { state, effect } from "../core";
import type { State, EffectCallback, EffectOptions } from "../types";

type ReactishElement = string | number | HTMLElement | (<Props = unknown>(props: Props) => ReactishElement);

export function useState<Value>(initialValue: Value): State<Value> {
    return state(initialValue);
}

export function useEffect(callback: EffectCallback, options?: EffectOptions): void {
    effect(callback, options);
}

function appendChildRecursive(parent: HTMLElement, child: ReactishElement): void {
    if (typeof child === "string" || typeof child === "number") {
        parent.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
        parent.appendChild(child);
    } else if (typeof child === "function") {
        const childElement = (child as () => ReactishElement)();
        appendChildRecursive(parent, childElement);
    } else if (Array.isArray(child)) {
        (child as ReactishElement[]).forEach((nestedChild) => appendChildRecursive(parent, nestedChild));
    }
}

export function createElement<Props = unknown>(tag: string, props: Record<string, Props> = {}, ...children: ReactishElement[]): ReactishElement {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(props)) {
        if (typeof value === "function") {
            element.addEventListener(key, value as never);
        } else {
            element.setAttribute(key, String(value));
        }
    }

    children.forEach((child) => appendChildRecursive(element, child));

    return element;
}

export function defineComponent(renderFunction: () => ReactishElement) {
    return renderFunction;
}

export function render(vdom: ReactishElement, container: HTMLElement) {
    container.innerHTML = "";
    container.appendChild(vdom as Node);
}
