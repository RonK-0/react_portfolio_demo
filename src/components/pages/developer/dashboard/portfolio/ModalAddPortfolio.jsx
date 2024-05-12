import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ModalWrapper from "../../../../partials/modals/ModalWrapper";
import SpinnerButton from "../../../../partials/spinners/SpinnerButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../helpers/queryData";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { object, string, number } from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";

const ModalAddPortfolio = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setIsAdd(false));
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v1/portfolio/${itemEdit.portfolio_aid}` : `/v1/portfolio`,
        itemEdit ? "put" : "post",
        // `/v1/portfolio`,
        // `post`,
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Successfully "+[store.isEdit ? "updated." : "added."]));
      } else {
        dispatch(setError(true));
        dispatch(setMessage(`Failed updating database.`));
      }
    },
  });
  console.log("");

  const initVal = {
    portfolio_title: itemEdit ? itemEdit.portfolio_title : "",
    portfolio_category: itemEdit ? itemEdit.portfolio_category : "",
    portfolio_image: itemEdit ? itemEdit.portfolio_image : "",
    portfolio_description: itemEdit ? itemEdit.portfolio_description : "",
    portfolio_publish_date: itemEdit ? itemEdit.portfolio_publish_date : "",
  };
  const yupSchema = object({
    portfolio_title: string().required("Title Required*"),
    portfolio_category: string().required("Category Required*"),
    portfolio_description: string().required("Description Required*"),
    portfolio_image: string().required("Image Required*"),
    portfolio_publish_date: string().required("Publishing Date Required*"),
  });

  return (
    <ModalWrapper>
      <div className="main-modal w-[300px] bg-secondary text-content h-full">
        <div className="modal-header p-4 relative">
          <h2>{store.isEdit ? "Edit" : "New"} portfolio</h2>
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
                  <InputText label="Title" type="text" name="portfolio_title" />
                </div>
                <div className="input-wrap">
                  <InputText
                    label="Category"
                    type="text"
                    name="portfolio_category"
                  />
                </div>
                <div className="input-wrap">
                  <InputText label="Image" type="text" name="portfolio_image" />
                </div>
                <div className="input-wrap">
                  <InputTextArea
                    label="Description"
                    name="portfolio_description"
                    className="h-[10rem] resize-none"
                  />
                </div>
                <div className="input-wrap">
                  <InputText
                    label="Publishing Date"
                    type="text"
                    name="portfolio_publish_date"
                  />
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

export default ModalAddPortfolio;
