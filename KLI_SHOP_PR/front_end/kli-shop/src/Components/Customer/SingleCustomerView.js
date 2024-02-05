import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "./NavBar";

/* Documentation:
  The SingleCustomerView.js file is a React functional component responsible for displaying details of a single customer. It retrieves customer information based on the provided ID from the URL params using React Router.

  Structure of this component includes:
  - Utilizes React Hooks such as 'useState' and 'useEffect' for managing component state and side effects.
  - Imports the 'NavBar' component for consistent navigation.

  Functions:
    - loadCustomer(): Fetches customer details using the provided customer ID from the API endpoint.
  
  Return statement:
    - Renders a section with a shadowed card layout.
    - Displays customer information, including an avatar, personal details, and contact options.
    - Utilizes the 'NavBar' component for navigation consistency.

  Note:
    - Assumes the usage of React and Axios libraries.
    - The customer ID is retrieved from the URL params using 'useParams' from React Router.
*/

export function SingleCustomerView() {
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    name: "",
    surname: "",
    email: "",
    age: "",
    phoneNumber: "",
    imageUrl: "",
  });

  useEffect(() => {
    loadCustomer();
  }, []);
  const loadCustomer = async () => {
    const result = await axios.get(`http://localhost:8080/customers/get/${id}`);
    setCustomer(result.data);
  };
  const customerInfos = [
    {
      label: "Name",
      value: customer.name,
    },
    {
      label: "Surname",
      value: customer.surname,
    },
    {
      label: "Email",
      value: customer.email,
    },
    {
      label: "Age",
      value: customer.age,
    },
    {
      label: "PhoneNumber",
      value: customer.phoneNumber,
    },
    {
      label: "Gender",
      value: customer.gender,
    },
  ];

  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <NavBar />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={customer.imageUrl}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">
                  {`${customer.name} ${customer.surname}`}
                </h5>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-outline-primary">
                    Call
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning ms-1"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card-body">
              {customerInfos.map((info) => (
                  <div className="row" key={info.label}>
                    <hr/>
                  <div className="col-sm-3">
                    <h4 className="mb-0">{info.label}</h4>
                  </div>
                  <div className="col-sm-9">
                    <h5 className="text-muted mb-0">{info.value}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
