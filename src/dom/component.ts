import { effect } from "../core";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

type Events = {
    [eventName: string]: EventListener;
};

type State = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

type ComponentOptions = {
    tag: string;
    children?: Promise<string> | string | (() => Promise<string> | string);
    props?: Props;
    events?: Events;
    styles?: string;
    state?: State;
};

type EventDelegationOptions = {
    componentName: string;
    matcherId: string;
    eventType: string;
    event: (e?: Event) => void;
};

export class Component extends HTMLElement {
    constructor(options: ComponentOptions) {
        super();

        const { tag, children, props, events, styles, state } = options;

        const el = document.createElement(tag);

        // Set props/attributes
        for (const [key, value] of Object.entries(props || {})) {
            el.setAttribute(key, value);
        }

        el.textContent = "";

        // Set events
        for (const [eventName, listener] of Object.entries(events || {})) {
            el.addEventListener(eventName, listener);
        }

        // Create Shadow DOM and apply content
        const shadow = this.attachShadow({ mode: "open" });

        if (styles) {
            const styleTag = document.createElement("style");
            styleTag.textContent = styles;
            shadow.appendChild(styleTag);
        }

        shadow.appendChild(el);

        function interpolate(template: string): string {
            return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => (state?.[key]?.value != null ? state[key].value : ""));
        }

        function renderContent(): void {
            const childContent = typeof children === "function" ? children() : children;

            Promise.resolve(childContent).then((resolved) => {
                function update() {
                    el.innerHTML = interpolate(resolved || "");
                }

                effect(update);
            });
        }

        effect(renderContent);

        renderContent();
    }
}

export function createComponent(name: string, options: ComponentOptions): HTMLElement {
    if (!customElements.get(name)) {
        customElements.define(
            name,
            class extends Component {
                constructor() {
                    super(options);
                }
            }
        );
    }

    return document.createElement(name);
}

export async function getComponentHTML(path: string) {
    const component = await fetch(path);

    const text = await component.text();
    return text;
}

/**
 * Registers an event delegation within a custom component
 */
export function registerEventDelegation(options: EventDelegationOptions) {
    setTimeout(() => {
        const component = document.querySelector(options.componentName);
        const shadow = component?.shadowRoot;

        shadow?.addEventListener(options.eventType, (e) => {
            const target = e.target as HTMLElement;

            if (target.id === options.matcherId) {
                options.event(e);
            }
        });
    }, 100);
}
