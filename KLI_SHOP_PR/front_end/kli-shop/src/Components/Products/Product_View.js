import { useEffect, useState } from "react";
import { NavBar } from "../Customer/NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";

/* Documentation:
  The Product_View.js file is a React functional component responsible for displaying detailed information about a specific product. It uses the 'useEffect' and 'useState' hooks for managing component state and fetching data from an API using Axios. It also imports the 'NavBar' component for navigation and uses 'useParams' from React Router to access the product ID from the URL.

  Structure of this component includes:
  - Utilizes React Hooks such as 'useState' and 'useEffect' for managing component state and side effects.
  - Imports 'NavBar' component for consistent navigation.
  - Uses 'useParams' to access the product ID from the URL.

  Functions:
    - loadProductById(): Fetches the details of a specific product using the product ID from the API endpoint.
  
  Return statement:
    - Renders detailed information about the product, including title, image, price, description, and category.

  Note:
    - Assumes the usage of React, Axios, and React Router libraries.
    - The structure assumes the existence of a product API with an endpoint for fetching product details by ID.
*/

export function Product_View() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState([]);
  useEffect(() => {
    loadProductById();
  }, []);

  const loadProductById = async () => {
    const result = await axios.get(
      `http://localhost:8080/products/get/${productId}`
    );
    setProduct(result.data);
  };
  return (
    <>
      <NavBar />
      <main className="container mt-5 mb-5">
        <div className="text-center border-bottom pb-3">
          <h1 className="fw-bold">{product.title}</h1>
        </div>
        <div className="text-center my-4">
          <img
            src={product.image}
            alt={product.title}
            width={300}
            className="border shadow-lg border-dark rounded"
          />
        </div>
        <div className="border p-3">
          <div>
            <h5 className="fw-bold">Product Details:</h5>
            <div className="fw-bold text-center my-4">
              Price: {product.price}
            </div>
            <h3>Description: </h3>
            <div>
              <span className="fs-5">{product.description}</span>
            </div>
            <span className="fs-5 fw-bold">Category:</span>
            <div> {product.category}</div>
          </div>
        </div>
      </main>
    </>
  );
}
