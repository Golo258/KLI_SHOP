import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "./NavBar";

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
