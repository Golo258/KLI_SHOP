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

/* Documentation:
  The CustomerView.js file is used:
    to extract all customers information

    Stucture of this function include:
    Functions:
      LoadCustomers():
          Which load all customers by using our created API endpoint customers/all
          During loading the customer we validate the status of our request in order to avoid errors
          If everything is right, the customers variable are filled with data
      HandleDelete():
        Which remove specific customer by its id which is saved in database during its creation
        After performing the customer removal we are redirected to home page
      
    Return statement:
      Present our loaded customer in form of html structure:
        We are using the attributes of Customer model and puting in specific fields in order to show its assigned values
        In the last part return statement we have 3 option that what we want to do with the CustomeR:
          View: We can load the SingleCustomerView.js file which present singular customer view
          Edit: We can change our existing customer fields and save it in database. There We are redirected to EditCustomer.js
          Delete: We can remove our customer by used previously presented function HandleDelete();;
          
*/

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
    if (customers.length - 1 > 0) {
      loadCustomers();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <section>
        <NavBar />
        <div className="customer-list">
          {customers.length === 0 ? (
            <div className="d-flex justify-content-center mt-3">
              {" "}
              <h1> There is not customer in here. Create one</h1>{" "}
            </div>
          ) : (
            <h2>Customers List: </h2>
          )}
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
                  ł{" "}
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
