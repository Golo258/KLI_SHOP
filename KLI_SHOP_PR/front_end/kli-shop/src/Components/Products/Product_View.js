import { useEffect, useState } from "react";
import { NavBar } from "../Customer/NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";

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
            <span className="fs-5 fw-bold text-decoration-underline">
              Description:{" "}
            </span>
            <div className="justify-content"> {product.description}</div>
            <span className="fs-5 fw-bold">Category:</span>
            <div> {product.category}</div>
          </div>
        </div>
      </main>
    </>
  );
}
