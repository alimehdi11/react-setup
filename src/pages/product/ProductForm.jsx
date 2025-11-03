import { useProducts } from "../../contexts/ProductContext";
import { useState } from "react";
import { FaDollarSign, FaListCheck, FaLayerGroup } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import Drawer from "../../components/Drawer";
import FormGenerator from "../../components/FormElements/FormGenerator";

const ProductForm = () => {

const [product, setProduct] = useState({
    product_name: "",
    price: "",
    category: "",
    brand: "",
  });
  const { addAndUpdateProduct } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAndUpdateProduct(product);
  };


  const productFormFields = [
    { name: "product_name", icon: <FaShoppingBag className="text-purple-500"/>, required: true },
    { name: "price", icon: <FaDollarSign className="text-sky-500"/>, type: "number", required: true },
    {
      name: "category",
      icon: <FaLayerGroup className="text-rose-500"/>,
      type: "select",
      required: true,
      options: [
        "Electronics",
        "Clothing",
        "Footwear",
        "Beauty & Personal Care",
        "Books and Stationery",
      ],
    },
    {
      name: "brand",
      icon: <FaListCheck className="text-emerald-500"/>,
      type: "select",
      required: true,
      options: ["Nike", "Adidas", "Samsung", "Apple", "Sony"],
    },
  ];


  return (
    <>

<Drawer title="Add Product">
        <FormGenerator
          fields={productFormFields}
          onSubmit={handleSubmit}
          values={product}
          setValues={setProduct}
        />
      </Drawer>
    </>
  )
}

export default ProductForm
