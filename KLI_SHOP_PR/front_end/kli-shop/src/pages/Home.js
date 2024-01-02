import { NavBar } from "../Components/Customer/NavBar";
import { MainView } from "../Components/MainView";
import { CategoriesList } from "../Components/Products/FilterList";
import { ProductList } from "../Components/Products/GetProductList";



export function Home() {
  return (
    <>
      <NavBar />
      <MainView>
        <div className="d-flex">
          <div className="col-2 h-100 custom-left-side-bg justify-content-between mb-3 border">
            <CategoriesList />
          </div>
          <div
            className="col-9 p-2 custom-right-side-bg justify-content-end  mb-3 border"
            style={{ marginLeft: "10px" }}
          >
            <ProductList />
          </div>
        </div>
      </MainView>
    </>
  );
}
