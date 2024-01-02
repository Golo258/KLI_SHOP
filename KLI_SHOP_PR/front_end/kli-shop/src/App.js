import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./Styles/home_style.css";
import { Home } from "./pages/Home";
import { NoPage } from "./pages/NoPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product_View } from "./Components/Products/Product_View";
import { CreateView } from "./Components/Customer/CreateView";
import { CustomerView } from "./Components/Customer/CustomersView";

import { SingleCustomerView } from "./Components/Customer/SingleCustomerView";
import { EditCustomer } from "./Components/Customer/EditCustomer";
export function App() {
  return (
    <main className="container mt-5">
      <Router>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route exact path="/:filter_attributes" element={<Home />}></Route>
          <Route exact path="/product-view/:id" element={<Product_View/>}></Route>
          <Route exact path="/create-customer" element={<CreateView />}></Route>
          <Route exact path="/view-customer/:id" element={<SingleCustomerView />}></Route>
          <Route exact path="/customers-view" element={<CustomerView />}></Route>
          <Route exact path="/edit-customer/:id" element={<EditCustomer />}></Route>
          {/* <Route exact path="/edit-customer-product/:id" element={<EditProductView />}></Route> */}
          <Route exact path="*" element={<NoPage />}></Route>
        </Routes>
      </Router>
    </main>
  );
}
