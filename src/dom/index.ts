import { renderRoot } from "./render";
import { counter } from "./components/counter";

console.log(counter); // This is a hack to import the custom component to be rendered. TODO: Find a better way to do this

renderRoot("app");
