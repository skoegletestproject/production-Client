import { createRoot } from "react-dom/client";
import "./Global.css"
import App from "./App.jsx";
import { StoreProvider } from "./Store/Store.jsx";

createRoot(document.getElementById("root")).render(
<StoreProvider>
<App />

</StoreProvider>

);
