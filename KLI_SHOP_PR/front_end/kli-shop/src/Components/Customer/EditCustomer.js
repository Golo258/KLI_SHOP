import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

/* Documentation:
  The EditCustomer.js file is responsible for editing an existing customer's details by fetching the customer information from the backend API and allowing users to update the data. It provides a form with pre-filled fields for a specific customer based on the customer's ID.

  Structure of this function includes:
  State:
    - Uses the 'useState' hook to manage the state of the customer object, which contains fields like name, surname, email, age, phoneNumber, imageUrl, and gender.
  
  Hooks:
    - Utilizes the 'useEffect' hook to load customer data when the component mounts.

  Functions:
    loadCustomer():
      - Fetches customer information from the backend API using the customer's ID.
      - Sets the state with the retrieved customer data.

    handleInputChange(e):
      - Updates the customer state based on user input in the form fields.

    updateCustomer(e):
      - Prevents the default form submission.
      - Sends a PUT request to the API endpoint "/customers/update/:id" with the updated customer details.
      - Redirects to the "/customers-view" page after successfully updating the customer.

  Return statement:
    - Renders a form with input fields for editing customer details.
    - Fetches and displays the customer details based on the provided customer ID.
    - Provides buttons to save the changes or cancel the editing process.

  Note:
    - This component assumes the presence of a backend API with the specified endpoints and functionality.
    - The customer details are pre-filled in the form for editing.
*/

export function EditCustomer() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [customer, setCustomer] = useState({
    name: "",
    surname: "",
    email: "",
    age: "",
    phoneNumber: "",
    imageUrl: "",
    gender: " ",
  });

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    const result = await axios.get(`http://localhost:8080/customers/get/${id}`);
    setCustomer(result.data);
  };

  const handleInputChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };
  const updateCustomer = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/customers/update/${id}`, customer);
    navigate("/customers-view");
  };
  const customerAttributes = [
    {
      label: "name",
      attributesValue: customer.name,
      type: "text",
    },
    {
      label: "surname",
      attributesValue: customer.surname,
      type: "text",
    },
    {
      label: "age",
      attributesValue: customer.age,
      type: "Number",
    },
    {
      label: "email",
      attributesValue: customer.email,
      type: "email",
    },
    {
      label: "gender",
      attributesValue: customer.gender,
      type: "text",
    },
  ];

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit customer</h2>
      <form onSubmit={(e) => updateCustomer(e)}>
        {customerAttributes.map((attribute) => (
          <div className="input-group mb-5" key={attribute.label}>
            <label className="input-group-text" htmlFor={attribute.label}>
              {attribute.label[0].toUpperCase()}{attribute.label.slice(1)}
            </label>
            <input
              className="form-control col-sm-6"
              type={attribute.type}
              name={attribute.label}
              id={attribute.label}
              required
              value={attribute.attributesValue}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        ))}
        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/view-customers"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
