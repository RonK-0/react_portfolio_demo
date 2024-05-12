import React from "react";
import { PiArchive } from "react-icons/pi";
import { LiaEdit, LiaHistorySolid, LiaTrashAltSolid } from "react-icons/lia";
import TableLoader from "../../../../partials/TableLoader";
import { StoreContext } from "../../../../../store/StoreContext";
import NoData from "../../../../partials/NoData";
import SpinnerFetching from "../../../../partials/spinners/SpinnerFetching";
import {
  setInfo,
  setIsActive,
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsEdit,
  setIsShow,
} from "../../../../../store/StoreAction";
import ModalConfirm from "../../../../partials/modals/ModalConfirm";
import ModalDelete from "../../../../partials/modals/ModalDelete";

const PortfolioTable = ({ isLoading, portfolio, isFetching, setItemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  let counter = 1;
  const [id, setId] = React.useState("");

  const handleShowInfo = (item) => {
    dispatch(setIsShow(true));
    dispatch(setInfo(item));
  };

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
    dispatch(setIsEdit(true));
  };

  const handleArchive = (item) => {
    dispatch(setIsActive(true));
    setId(item.portfolio_aid);
    dispatch(setIsArchive(0));
  };

  const handleRestore = (item) => {
    dispatch(setIsActive(true));
    setId(item.portfolio_aid);
    dispatch(setIsArchive(1));
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.portfolio_aid);
  };

  return (
    <>
      <div
        className={`table-wrapper overflow-x-scroll lg:overflow-x-auto h-full pb-64 fixed top-56 left-[270px] ${
          store.isShow ? "w-[calc(100%-690px)]" : "w-[calc(100%-270px)]"
        } `}
      >
        {isFetching && <SpinnerFetching />}
        <table>
          <thead>
            <tr>
              <th className="w-5">#</th>
              <th className="w-[150px]">Title</th>
              <th className="w-[80px]">Category</th>
              <th className="w-[80px]">Published</th>
              <th className="w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7}>
                  <TableLoader count="20" cols="4" />
                </td>
              </tr>
            )}

            {portfolio?.data.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <NoData />
                </td>
              </tr>
            )}
            
            {portfolio?.data.map((item, key) => (
              <tr
                onDoubleClick={() => handleShowInfo(item)}
                key={key}
              >
                <td>{counter++}</td>
                <td>{item.portfolio_title}</td>
                <td>{item.portfolio_category}</td>
                <td>{item.portfolio_publish_date}</td>
                <td className="table-action">
                  <ul>
                    {item.portfolio_is_active ? (
                      <>
                        <li>
                          <button
                            className="tooltip"
                            data-tooltip="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <LiaEdit />
                          </button>
                        </li>
                        <li>
                          <button
                            className="tooltip"
                            data-tooltip="Archive"
                            onClick={() => handleArchive(item)}
                          >
                            <PiArchive />
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button
                            className="tooltip"
                            data-tooltip="Restore"
                            onClick={() => handleRestore(item)}
                          >
                            <LiaHistorySolid />
                          </button>
                        </li>
                        <li>
                          <button
                            className="tooltip"
                            data-tooltip="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            <LiaTrashAltSolid />
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {store.isActive && (
          <ModalConfirm
            position={"center"}
            queryKey={"portfolio"}
            endpoint={`/v1/portfolio/active/${id}`}
          />
        )}
        {store.isDelete && (
          <ModalDelete
            position={"center"}
            queryKey={"portfolio"}
            endpoint={`/v1/portfolio/${id}`}
          />
        )}
    </>
  );
};

export default PortfolioTable;
