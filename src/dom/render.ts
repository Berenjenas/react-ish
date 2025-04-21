const root = document.getElementById("root") as HTMLElement;

export async function renderRoot(component: string) {
    const html = await fetch(`/src/dom/${component}.html`);

    const _component = await html.text();

    root.innerHTML = _component;
}
