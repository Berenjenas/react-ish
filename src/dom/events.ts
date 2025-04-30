const eventHandlers: Record<string, () => void> = {};

export function onClick(name: string, handler: () => void) {
    eventHandlers[name] = handler;
}

export function setupClickEventDelegation() {
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const eventName = target.dataset["click"];

        if (eventName && eventHandlers[eventName]) {
            eventHandlers[eventName]();
        }
    });
}
