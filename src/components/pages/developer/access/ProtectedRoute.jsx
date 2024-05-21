import React from "react";
import { Navigate } from "react-router-dom";
import { queryData } from "../../../helpers/queryData.jsx";
import { setCredentials } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import SpinnerFetching from "../../../partials/spinners/SpinnerFetching.jsx";
import NotFound from "../../NotFound.jsx";

const ProtectedRoute = ({ children }) => {
  const { dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState("");
  const glatoken = JSON.parse(localStorage.getItem("glatoken"));
  const [pageStatus, setPageStatus] = React.useState(false);

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await queryData(`/v1/user/token`, "post", {
        token: glatoken.token,
      });

      console.log(login);

      if (typeof login === "undefined" || !login.success) {
        setLoading(false);
        setIsAuth("456");
      } else {
        dispatch(setCredentials(login.data));
        setIsAuth("123");
        setLoading(false);
        delete login.data.user_password;
        setPageStatus(true);
      }
    };

    if (glatoken !== null) {
      fetchLogin();
    } else {
      setLoading(false);
      localStorage.removeItem("glatoken");
      setIsAuth("456");
    }
  }, [dispatch]);

  if (!pageStatus) {
    return <NotFound />;
  } else {
    return (
      <>
        {loading ? (
          <SpinnerFetching />
        ) : isAuth === "123" ? (
          children
        ) : isAuth === "456" ? (
          <Navigate to={`/login`} />
        ) : (
          <p>API end point error / Page not found.</p>
        )}
      </>
    );
  }
};

export default ProtectedRoute;
