import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hook/useQueryData";
import Navigation from "../../../../partials/Navigation";
import Header from "../../../../partials/Header";
import Toast from "../../../../partials/Toast";
import ModalAddPortfolio from "./ModalAddPortfolio";
import { setIsAdd, setIsEdit } from "../../../../../store/StoreAction";
import PortfolioTable from "./PortfolioTable";
import ModalError from "../../../../partials/modals/ModalError";

const Portfolio = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const [isSearch, setIsSeach] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const handleAdd = () => {
    dispatch(setIsAdd(true)), dispatch(setIsEdit(false)), setItemEdit(null);
  };

  const {
    isLoading,
    isFetching,
    error,
    data: portfolio,
  } = useQueryData(
    isSearch ? "/v1/portfolio/search" : "/v1/portfolio", // endpoint
    isSearch ? "post" : "get", // method
    // ["portfolio", isSearch], // key
    // {
    //   searchValue: keyword,
    // }
    "portfolio",
    { searchValue: keyword }
  );

  return (
    <section className="flex relative left-[250px]">
      <Navigation />
      <main className="w-[calc(100%-250px)]">
        <Header />
        <div className="flex relative">
          <div
            className={`main-wrapper transition-all px-4 py-3 ${
              store.isShow ? "w-3/4" : "w-full"
            }`}
          >
            <div
              className={`fixed bg-primary ${
                store.isShow ? "w-[calc(100%-700px)]" : "w-[calc(100%-300px)]"
              }`}
            >
              <div className="flex justify-between items-center">
                <h1 className="leading-none mb-0">Portfolio Database</h1>
                {/* <Searchbar setIsSeach={setIsSeach} setKeyword={setKeyword} /> */}
              </div>

              <div className="tab flex between-center mt-8 border-b border-line mb-8">
                {/* <ul className="flex items-center gap-10">
                  <li className="tab-link active">
                    <Link to="/portfolio">Portfolio</Link>
                  </li>
                  <li className="tab-link">
                      <Link to="/database/teacher">Teacher</Link>
                    </li>
                    <li className="tab-link">
                      <Link to="/database/staff">Staff</Link>
                    </li>
                </ul> */}
                <ul>
                  <li className="tab-link active">
                    <h2 className="mb-0">Search</h2>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn--accent"
                  onClick={handleAdd}
                >
                  <FiPlus /> New
                </button>
              </div>
            </div>
            <PortfolioTable
              isLoading={isLoading}
              portfolio={portfolio}
              isFetching={isFetching}
              setItemEdit={setItemEdit}
            />
          </div>

          {/* <DatabaseInformation /> */}
        </div>
      </main>
      {store.isAdd && <ModalAddPortfolio itemEdit={itemEdit} />}
      {/* <ModalAddPortfolio itemEdit={itemEdit}/> */}
      {store.success && <Toast />}
      {store.error && <ModalError position={"center"} />}
    </section>
  );
};

export default Portfolio;
