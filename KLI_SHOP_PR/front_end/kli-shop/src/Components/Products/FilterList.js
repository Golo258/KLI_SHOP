import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDataContext } from "../Provider/DataProvider";
import ReactSlider from "react-slider";
import "../../Styles/Slider.css";

/* Documentation:
  The CategoriesList.js file is a React functional component responsible for displaying and updating category and price threshold filters for products. It utilizes React Bootstrap components and Axios for data fetching.

  Structure of this component includes:
  - Utilizes React Hooks such as 'useState' and 'useEffect' for managing component state and side effects.
  - Imports 'Container', 'Form', 'Row', 'Col' from React Bootstrap for layout structuring.
  - Utilizes the 'ReactSlider' component for a customizable price threshold slider.
  - Utilizes the 'useDataContext' hook for accessing and updating shared data context.

  Functions:
    - handleLoadOfCategories(): Fetches product categories from the API endpoint and updates the state.
    - handleCategoryChange(category): Updates the selected category in the state and shared data context.
    - handleLoadThresholds(): Fetches price thresholds from the API endpoint and updates the state.
    - handlePriceChange(value): Updates the price thresholds in the state and shared data context.

  Return statement:
    - Renders a container with a form containing radio buttons for categories and a price threshold slider.
    - Displays the selected category and chosen price thresholds dynamically.

  Note:
    - Assumes the usage of React, Axios, React Bootstrap, and React Slider libraries.
    - The 'useDataContext' hook is assumed to be provided by a higher-level data provider.
*/



export function CategoriesList() {
  const { attributesDictionary, updateAttributesDictionary } = useDataContext();

  /* Categories loading  */
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    handleLoadOfCategories();
  }, []);

  const handleLoadOfCategories = async () => {
    const categoriesResult = await axios.get(
      "http://localhost:8080/products/categories",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setCategories(categoriesResult.data);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    updateAttributesDictionary((prevAttributes) => {
      const updatedAttributesDictionary = {
        ...prevAttributes,
        selectedCategory: category,
      };
      return updatedAttributesDictionary;
    });
  };

  /* Price thresholds loading */
  const [minThreshold, setMinThreshold] = useState(0);
  const [maxThreshold, setMaxThreshold] = useState(1000);
  const [currentValue, setCurrentValue] = useState([
    minThreshold,
    maxThreshold,
  ]);

  useEffect(() => {
    handleLoadThresholds();
  }, []);
  const handleLoadThresholds = async () => {
    const thresholdResult = await axios.get(
      "http://localhost:8080/products/pricesThresholds",
      {
        validateStatus: () => {
          return true;
        },
      }
    );

    if (thresholdResult.data.length === 2) {
      setMinThreshold(parseInt(thresholdResult.data[0]));
      setMaxThreshold(parseInt(thresholdResult.data[1]));
      setCurrentValue([
        parseInt(thresholdResult.data[0]),
        parseInt(thresholdResult.data[1]),
      ]);
    }

  };

  const handlePriceChange = (value) => {
    setCurrentValue(value);
    updateAttributesDictionary((prevAttributes) => {
      const updatedAttributesDictionary = {
        ...prevAttributes,
        thresholds: value, 
      };
      return updatedAttributesDictionary;
    });
  };
  /*  Layout processing*/

  return (
    <>
      <Container>
        <Form>
          <Form.Group controlId="categories">
            <Form.Label>Categories</Form.Label>
            <Row>
              {categories.map((category, index) => (
                <Col key={index}>
                  <Form.Check
                    type="radio"
                    label={category}
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
          <Form.Group controlId="priceThresholds">
            <Form.Label>Choose price thresholds:</Form.Label>
            <Row>
              <Col>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="thumb"
                  trackClassName="track"
                  min={0}
                  max={maxThreshold + 10}
                  defaultValue={[currentValue[0], currentValue[1]]}
                  onChange={handlePriceChange}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="priceThresholds">
            <Form.Label></Form.Label>
            <Row>
              <Col>
                <div>Min value: {currentValue[0]} </div>
                <div>Max value: {currentValue[1]} </div>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
