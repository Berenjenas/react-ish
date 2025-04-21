import { App } from ".";

const root = document.getElementById("root") as HTMLElement;

export function render(component: () => string): void {
	root.innerHTML = component();
}

export function registerListener(elementId: string, event: string, callback: () => void): void {
	render(App); // Re-render

	const _element = document.getElementById(elementId); // Get the element by ID after rendering

	if (_element) {
		_element.addEventListener(event, () => {
			callback(); // Call the callback function
			registerListener(elementId, event, callback); // Re-register listener
		});
	}
}
