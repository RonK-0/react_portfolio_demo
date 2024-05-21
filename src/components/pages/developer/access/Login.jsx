import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import {
  setCredentials,
  setError,
  setIsLogin,
  setMessage,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useSystemLogin from "../../../custom-hook/useSystemLogin";
import { InputText } from "../../../helpers/FormInputs";
import {
  apiVersion,
  setStorageRoute,
} from "../../../helpers/functions-general";
import ModalError from "../../../partials/modals/ModalError";
import SpinnerButton from "../../../partials/spinners/SpinnerButton";
import Logo from "../../../partials/svg/Logo";
import SpinnerWindow from "../../../partials/spinners/SpinnerWindow";
import { queryData } from "../../../helpers/queryData";

const Login = () => {
  const { store, dispatch } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();
  const { loginLoading } = useSystemLogin();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/${apiVersion}/user/login`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        if (store.isLogin) {
          delete data.data[0].user_system_password;
          // delete data.data[0].role_description;
          // delete data.data[0].role_created;
          // delete data.data[0].role_datetime;

          dispatch(setCredentials(data.data[0]));
          setStorageRoute(data.data[1]);
          dispatch(setIsLogin(false));
          // checkRoleToRedirect(navigate, data.data[0]);
          navigation("/portfolio");
        }
      }
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const initVal = {
    user_email: "",
    password: "",
  };

  const yupSchema = object({
    user_email: string().required("Required").email("Invalid email"),
    password: string().required("Required"),
  });

  return (
    <>
      {loginLoading ? (
        <SpinnerWindow />
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="max-w-[400px] w-full px-4 py-8 bg-secondary">
            <Logo />

            <h2>Login</h2>
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form className="mt-5">
                    <div className="input-wrap">
                      {/* <label htmlFor="">Email</label>
                    <input type="text" /> */}
                      <InputText label="Email" type="text" name="user_email" />
                    </div>
                    <div className="input-wrap">
                      {/* <label htmlFor="">Passwprd</label>
                    <input type="password" /> */}

                      <InputText
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        // disabled={mutation.isPending}
                      />
                      {props.values.password && (
                        <span
                          className="absolute text-base translate-y-1/2 cursor-pointer bottom-1/2 right-2"
                          onClick={togglePassword}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="fill-gray-400" />
                          ) : (
                            <FaEye className="fill-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                    <Link
                      to={"/forgot-password"}
                      className="block text-right italic text-xs mb-5 hover:underline"
                    >
                      Forgot Password
                    </Link>
                    <button className="btn btn--accent w-full p-4" type="submit">
                      {mutation.isPending ? <SpinnerButton /> : "Sign In"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          {store.error && <ModalError position={"center"} />}
        </div>
      )}
    </>
  );
};

export default Login;
