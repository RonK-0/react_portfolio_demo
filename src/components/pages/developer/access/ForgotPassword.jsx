import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { queryData } from "../../../helpers/queryData";
import { FaCheckCircle } from "react-icons/fa";
import { object, string } from "yup";
import { setError, setMessage } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import ModalError from "../../../partials/modals/ModalError";
import Logo from "../../../partials/svg/Logo";
import SpinnerButton from "../../../partials/spinners/SpinnerButton";

const ForgotPassword = () => {
  const { dispatch, store } = React.useContext(StoreContext);

  const [verifySuccess, setVerifySuccess] = React.useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/user/reset`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        setVerifySuccess(true);
      }
    },
  });

  const initVal = { item: "" };
  const yupSchema = object({
    item: string().required("Required").email("Invalid Email")
  });

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="max-w-[400px] w-full px-4 py-8 bg-secondary">
          <Logo />

          {verifySuccess ? (
            <div className="text-center">
              <FaCheckCircle className="text-accent block mx-auto my-5 text-3xl" />
              <h3>Reset Email Sent</h3>
              <p className="text-balance">
                Plase check your email for the reset password instruction
              </p>
            </div>
          ) : (
            <>
              <h2>Fogot Password</h2>

              <Formik
                initialValues={initVal}
                validationSchema={yupSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  mutation.mutate(values);
                }}
              >
                {(props) => {
                  return (
                    <Form className="w-full mt-5">
                      <div className="input-wrap mb-10">
                        {/* <label htmlFor="">Registered Email</label>
                        <input type="text" /> */}
                        <InputText
                          label="Registered Email"
                          name="item"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <button
                        className="btn btn--accent w-full p-4"
                        type="submit"
                      >
                        {mutation.isPending ? (
                          <SpinnerButton />
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                      <button className="btn btn--cancel w-full p-4 mt-3">
                        Return
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </>
          )}
        </div>
      </div>
      {store.error && <ModalError position={"center"} />}
    </>
  );
};

export default ForgotPassword;
