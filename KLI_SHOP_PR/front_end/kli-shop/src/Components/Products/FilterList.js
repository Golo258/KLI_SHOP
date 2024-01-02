import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDataContext } from "../Provider/DataProvider";
import ReactSlider from "react-slider";
import "../../Styles/Slider.css";

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
