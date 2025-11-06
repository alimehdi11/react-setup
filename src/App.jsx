import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Counter from "./components/Counter";
import TopBar from "./components/TopBar";
import Users from "./pages/users/Users";
import Products from "./pages/product/Products";
import ProductForm from "./pages/product/ProductForm";
import UserForm from "./pages/users/UserForm";

const App = () => {
  return (
    <div className="min-h-screen bg-black/10 dark:bg-black/90 dark:text-white">
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<Users />}>
            <Route path="create" element={<UserForm />} />
            <Route path="edit/:id" element={<UserForm />} />
          </Route>
          <Route path="/counter" element={<Counter />} />
          <Route path="/products" element={<Products />}>
            <Route path="create" element={<ProductForm />} />
            <Route path="edit/:id" element={<ProductForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;


