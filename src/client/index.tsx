import {hydrateRoot} from "react-dom/client";
import {Store} from "../types";
import {App, context} from "./App";

const store = context.hydrate<Store>();

hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <App store={store}/>
);
