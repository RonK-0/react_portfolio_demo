import React from "react";
import { FiPlus } from "react-icons/fi";
import { setIsAdd, setIsEdit } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hook/useQueryData";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import Toast from "../../../../partials/Toast";
import ModalError from "../../../../partials/modals/ModalError";
import ModalAddUser from "./ModalAddUser";
import UsersTable from "./UsersTable";

const Users = () => {
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
    data: user,
  } = useQueryData(
    isSearch ? "/v1/user/search" : "/v1/user", // endpoint
    isSearch ? "post" : "get", // method
    // ["user", isSearch], // key
    // {
    //   searchValue: keyword,
    // }
    "user",
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
                <h1 className="leading-none mb-0">User List</h1>
                {/* <Searchbar setIsSeach={setIsSeach} setKeyword={setKeyword} /> */}
              </div>

              <div className="tab flex between-center mt-8 border-b border-line mb-8">
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
            <UsersTable
              isLoading={isLoading}
              user={user}
              isFetching={isFetching}
              setItemEdit={setItemEdit}
            />
          </div>
        </div>
      </main>
      {store.isAdd && <ModalAddUser itemEdit={itemEdit} />}
      {store.success && <Toast />}
      {store.error && <ModalError position={"center"} />}
    </section>
  );
};

export default Users;
