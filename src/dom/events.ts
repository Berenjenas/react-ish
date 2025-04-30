const eventHandlers: Record<string, () => void> = {};

/**
 * Registers a click event handler for a specific element.
 * The handler will be executed when the element is clicked.
 *
 * @param id - The ID of the event handler.
 * @param handler - The function to execute when the element is clicked.
 */
export function onClick(id: string, handler: () => void) {
    eventHandlers[id] = handler;
}

export function setupClickEventDelegation() {
    {
        document.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            const eventName = target.getAttribute("onClick");

            if (eventName && eventHandlers[eventName]) {
                eventHandlers[eventName]();
            }
        });
    }
}
