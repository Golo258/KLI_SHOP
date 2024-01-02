import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaAddressBook,
  FaBacon,
  FaBath,
  FaBible,
  FaBitcoin,
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaVideo,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";

export function CustomerView() {
  let navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const result = await axios.get("http://localhost:8080/customers/all", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setCustomers(result.data);
    }
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/customers/delete/${id}`);
    if (customers.length - 1 > 0){
      loadCustomers();
    }
    else{
      navigate("/");
    }
  };

  return (
    <>
      <section>
        <NavBar />
        <div className="customer-list">
          {customers.length === 0 ? <div className="d-flex justify-content-center mt-3"> <h1> There is not customer in here. Create one</h1> </div> : <h2>Customers List: </h2>}
          {customers
            .filter((st) => st.name.toLowerCase().includes(search))
            .map((customer, index) => (
              <div
                key={customer.id}
                className="customer-item d-flex justify-content-center mb-4 border p-3"
              >
                <div className="customer-info">
                  <div>
                    <strong>ID:</strong> {index + 1}
                  </div>
                  <div>
                    <strong>Name:</strong> {customer.name}
                  </div>
                  <div>
                    <strong>Age:</strong> {customer.age}
                  </div>
                  <div>
                    <strong>Email:</strong> {customer.email}
                  </div>
                  <div>
                    <strong>Phone Number:</strong> {customer.phoneNumber}
                  </div>
                  <div>
                    <strong>Image Url:</strong> {customer.imageUrl}
                  </div>
                  <div>
                    <strong>Gender:</strong> {customer.gender}
                  </div>
                  <div>
                    <strong>Products:</strong> {customer.products}
                  </div>
                  <div className="text-center my-3">
                    <img
                      src={customer.imageUrl}
                      alt={customer.name}
                      width={300}
                      className="border shadow-lg border-dark rounded"
                    />
                  </div>
                </div>
                <div className="customer-actions">
                  {/* <Link
                    to={`/view-customer/${customer.id}`}
                    className="btn btn-success mx-4 my-2"
                  >
                    <FaBible /> Add Products
                  </Link> */}
                  <Link
                    to={`/view-customer/${customer.id}`}
                    className="btn btn-primary mx-4 my-2"
                  >
                    <FaVideo /> View Customer
                  </Link>
                  <Link
                    to={`/edit-customer/${customer.id}`}
                    className="btn btn-warning mx-4 my-2"
                  >
                    <FaEdit /> Edit Customer
                  </Link>
                  <button
                    className="btn btn-danger mx-4 my-2"
                    onClick={() => handleDelete(customer.id)}
                  >
                    <FaTrashAlt /> Delete Customer
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
      ;
    </>
  );
}
