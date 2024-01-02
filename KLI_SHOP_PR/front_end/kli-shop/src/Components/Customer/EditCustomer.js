import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

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
