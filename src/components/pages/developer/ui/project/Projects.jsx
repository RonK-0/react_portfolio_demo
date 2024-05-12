import React from "react";
import { setIsShow } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hook/useQueryData";
import SpinnerFetching from "../../../../partials/spinners/SpinnerFetching";
import ModalProject from "./ModalProject";

const Projects = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [info, setInfo] = React.useState(null);

  const {
    isLoading,
    isFetching,
    error,
    data: portfolio,
  } = useQueryData(
    "/v1/portfolio", // endpoint
    "get", // metho
    "portfolio"
  );

  const handleShowMore = (item) => {
    dispatch(setIsShow(true));
    setInfo(item);
  };

  return (
    <>
      <section>
        <div className="max-w-[1200px] mx-auto px-4">
          <h3 className="text-center mb-5 text-content">My Projects</h3>
          <div className="relative">
            {isLoading ? (
              <SpinnerFetching />
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {portfolio?.data.map((item, key) => (
                  <div className="project_card" key={key}>
                    <img
                      src="https://via.placeholder.com/300"
                      alt=""
                      className="w-full h-[300px] object-cover"
                    />
                    <h4 className="text-center pt-5 pb-2">
                      {item.portfolio_title}
                    </h4>
                    <ul className="flex justify-between opacity-55 mb-10">
                      <li>
                        <small>Category: {item.portfolio_category}</small>
                      </li>
                      <li>
                        <small>Date: {item.portfolio_published_date}</small>
                      </li>
                    </ul>
                    <p className="line-clamp-2">{item.portfolio_category}</p>
                    <button
                      className="btn btn--accent justify-center w-full py-3"
                      onClick={() => handleShowMore(item)}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {store.isShow && <ModalProject position={"center"} info={info} />}
    </>
  );
};

export default Projects;
