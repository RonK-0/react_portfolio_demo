import { FaUpload } from "react-icons/fa";
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ModalWrapper from "../../../../partials/modals/ModalWrapper";
import SpinnerButton from "../../../../partials/spinners/SpinnerButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../helpers/queryData";
import {
  InputText,
  InputTextArea,
  InputFileUpload,
} from "../../../../helpers/FormInputs";
import { Form, Formik } from "formik";
// import * as Yup from "yup";
import { object, string, number } from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { devBaseImgUrl } from "../../../../helpers/functions-general";

const ModalAddUser = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setIsAdd(false));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v1/user/${itemEdit.user_aid}` : `/v1/user`,
        itemEdit ? "put" : "post",
        // `/v1/user`,
        // `post`,
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage("Successfully " + [store.isEdit ? "updated." : "added."])
        );
      } else {
        dispatch(setError(true));
        dispatch(setMessage(`Failed updating database.`));
      }
    },
  });

  const initVal = {
    user_name: itemEdit ? itemEdit.user_name : "",
    user_email: itemEdit ? itemEdit.user_email : "",
  };
  const yupSchema = object({
    user_name: string().required("Name Required*"),
    user_email: string().required("Email Required*").email("Invalid Email"),
  });

  return (
    <ModalWrapper>
      <div className="main-modal w-[300px] bg-secondary text-content h-full">
        <div className="modal-header p-4 relative">
          <h2>{store.isEdit ? "Edit" : "New"} User</h2>
          <button className="absolute top-[25px] right-4" onClick={handleClose}>
            <LiaTimesSolid />
          </button>
        </div>
        <div className="modal-body p-4">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate(values);
            }}
          >
            <Form action="" className="flex flex-col h-[calc(100vh-110px)]">
              <div className="grow overflow-y-scroll">
                <div className="input-wrap">
                  <InputText label="Name" type="text" name="user_name" />
                </div>
                <div className="input-wrap">
                  <InputText label="Email" type="text" name="user_email" />
                </div>
              </div>
              <div className="form-action">
                <button className="btn btn-form btn--accent" type="submit">
                  {`${
                    mutation.isPending ? (
                      <SpinnerButton />
                    ) : store.isEdit ? (
                      "Update"
                    ) : (
                      "Add"
                    )
                  }`}
                </button>
                <button
                  className="btn btn-form btn--cancel"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalAddUser;
