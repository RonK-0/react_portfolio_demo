import React from "react";
import { StoreContext } from "../../store/StoreContext";
import { queryData } from "../helpers/queryData";
import { apiVersion, checkLocalStorage } from "../helpers/functions-general";

import { setIsLogin } from "../../store/StoreAction";
import { useNavigate, useNavigation } from "react-router-dom";

const useSystemLogin = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loginLoading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    const fetchLogin = async () => {
      const login = await queryData(`/${apiVersion}/user/token`, "post", {
        token: checkLocalStorage().token,
      });

      if (typeof login === "undefined" || !login.success) {
        localStorage.removeItem("glatoken");
        setLoading(false);
      } else {
        setLoading(false);
        // checkRoleToRedirect(navigate, login.data);
        navigate("/portfolio")
      }
    };
    if (
      checkLocalStorage() !== null &&
      checkLocalStorage().token !== undefined
    ) {
      fetchLogin();
      dispatch(setIsLogin(false));
    } else {
      setLoading(false);
      dispatch(setIsLogin(true));
    }
  }, []);

  return { loginLoading };
};

export default useSystemLogin;