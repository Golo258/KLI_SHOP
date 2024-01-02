import { useState } from "react";
import { NavBar } from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function CreateView() {
  let navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    surname : "",
    email: "",
    age: "",
    phoneNumber: "",
    imageUrl: "",
    gender : " ",
  });
  const { name,surname, email, age, phoneNumber, imageUrl , gender} = customer;

  const handleInputChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };
  const saveNewCustomer = async (e) => {
    e.preventDefault();

    if(!selectedImage){
      console.error("Please select an image");
      return;
    }
    const customerToSend = {
      name,
      surname,
      email,
      age,
      phoneNumber,
      imageUrl: selectedImage,
      gender : selectedGender
    };
    await axios.post(
      "http://localhost:8080/customers/addNewCustomer",
      customerToSend
    );
    navigate("/customers-view");
  };
  // ----------------------------------------------------------------
  //  Selecting customer avatar
  // ----------------------------------------------------------------

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleGenderButtonClick = (gender) => {
    setSelectedGender(gender);
    setSelectedImage(null); // Reset selected image when changing gender
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
//  Components\Customer\Images\Male\1.jpg
  const getImagesForGender = () => {
    // Replace with your logic to fetch images based on gender
    // For simplicity, I'm using static URLs here
    const male_images= [
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png",
      "https://akamai.darcherif.fr/assets/img/avataaars.svg",
      "https://razvanmar.in/assets/avataaars.svg",
      "https://meine-erste-homepage.com/wp-content/uploads/2023/11/karl.png",
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Clipart.png"
    ];
    const female_images = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCVb0IbF6DWN3kgRFAlknXN4xSPOod1hMbjEYT5mWRLvtgl72qBJW4pw6xTNFdqAxQJWE&usqp=CAU",
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
      "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png",
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png",
      "https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
      "https://as1.ftcdn.net/v2/jpg/01/13/41/66/1000_F_113416666_a7CuS6cvc6D5P5ezUbsTMexJHm9iAgga.jpg"
    ];
    const images = selectedGender === "Male" ? male_images : female_images;
    return  images;
    
  };
  //----------------------------------------------------------------
  // Exeuction of loading komponent
  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <NavBar />
      <h2 className="mt-5"> Create New Customer</h2>
      <form onSubmit={(e) => saveNewCustomer(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="name">
            Customer Name:
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="surname">
            Customer Surname:
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="surname"
            id="surname"
            required
            value={surname}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="email">
            Customer Email:
          </label>
          <input
            className="form-control col-sm-6"
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="age">
            Customer Age:
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="age"
            id="age"
            required
            value={age}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="phoneNumber">
            Customer Phone number:
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            required
            value={phoneNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {/* Selecting avatar dependeces on gender */}
        <div>
          <div className="mb-5">
            <button
              className="btn btn-primary"
              onClick={() => handleGenderButtonClick("Male")}
            >
              Male
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => handleGenderButtonClick("Female")}
            >
              Female
            </button>
          </div>

          {selectedGender && (
            <div>
              <h3>Selected Gender: {selectedGender}</h3>

              <div>
                {getImagesForGender().map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(imageUrl)}
                  />
                ))}
              </div>

              {selectedImage && (
                <div>
                  <h4>Selected Image URL:</h4>
                  <p>{selectedImage}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/"}
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
//----------------------------------------------------------------
