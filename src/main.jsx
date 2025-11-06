import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import UserProvider from "./contexts/UserContext";
import ThemeProvider from "./contexts/ThemeContext";
import ProductProvider from "./contexts/ProductContext";
import ComponentProvider from "./contexts/ComponentContext";
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ComponentProvider>
      <UserProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </UserProvider>
    </ComponentProvider>
  </ThemeProvider>
);
