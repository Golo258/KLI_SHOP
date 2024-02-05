import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDataContext } from "../Provider/DataProvider";

/* Documentation:
  The ProductList.js file is a React functional component responsible for displaying a list of products based on selected category and price thresholds. It uses the 'useEffect' and 'useState' hooks for managing component state and fetching data from an API using Axios. It also leverages the 'useDataContext' hook for accessing shared data.

  Structure of this component includes:
  - Utilizes React Hooks such as 'useState' and 'useEffect' for managing component state and side effects.
  - Imports 'Link' from React Router for navigation.
  - Utilizes the 'useDataContext' hook for accessing and updating shared data context.

  Functions:
    - loadProducts(): Fetches products based on selected category and/or price thresholds from the API endpoint.
  
  Return statement:
    - Renders a list of products with images, titles, prices, and links to view product details.

  Note:
    - Assumes the usage of React, Axios, and React Router libraries.
    - The 'useDataContext' hook is assumed to be provided by a higher-level data provider.
    - The structure assumes the existence of a product API with endpoints for filtering products by category and prices.
*/


export function ProductList() {
  const { attributesDictionary } = useDataContext();
  const [products, setProducts] = useState([]);
  let selectedCategory = attributesDictionary.selectedCategory;
  let selectedThresholds = attributesDictionary.thresholds;
  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedThresholds]);

  const loadProducts = async () => {
    try {
      if (selectedCategory !== undefined && selectedThresholds === undefined) {
        const response = await axios.get(
          `http://localhost:8080/products/filter/category/${selectedCategory}`
        );
        setProducts(response.data);
      } else if (
        selectedThresholds !== undefined &&
        selectedCategory === undefined
      ) {
        try {
          const response = await axios.get(
            `http://localhost:8080/products/filter/prices/${selectedThresholds[0]},${selectedThresholds[1]}`,
            {
              validateStatus: () => true,
            }
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error occures while loading products by prices");
        }
      } else if (
        selectedCategory !== undefined &&
        selectedThresholds !== undefined
      ) {
        const response = await axios.get(
          `http://localhost:8080/products/filter/category/${selectedCategory}`
        );
        const filteredProducts = response.data.filter((product) => {
          const price = product.price;

          return (
            price >= selectedThresholds[0] && price <= selectedThresholds[1]
          );
        });
        setProducts(filteredProducts);
      } else {
        const response = await axios.get("http://localhost:8080/products/all", {
          validateStatus: () => true,
        });
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error during loading products:", error);
      setProducts([]);
    }
  };

  return (
    <>
      <ul className="list-unstyled">
        {products.map((product) => (
          <li
            key={product.id}
            className="small d-flex align-items-center mb-4 border product-contaner-bg p-3"
          >
            <img
              src={product.image}
              alt={product.title}
              width={150}
              className="border mr-3"
            />
            <div>
              <div className="fs-5 fw-bold">{product.title}</div>
              <div> Price: {product.price}</div>
              <Link
                to={`/product-view/${product.id - 1}`}
                className="fw-bold text-dark text-decoration-underline
               lh-5 text-decoration-thickness-3"
              >
                Show Description of the Product:
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
