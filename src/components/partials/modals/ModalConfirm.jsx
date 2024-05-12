import React from "react";
import ModalWrapper from "./ModalWrapper";
import { LiaTimesSolid } from "react-icons/lia";
import { PiArchive } from "react-icons/pi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../helpers/queryData";
import { StoreContext } from "../../../store/StoreContext";
import {
  setMessage,
  setSuccess,
  setError,
  setIsActive,
} from "../../../store/StoreAction";

const ModalConfirm = ({ position, queryKey, endpoint }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setIsActive(false));

  const isArchiving = store.isArchive;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(endpoint, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (data.success) {
        dispatch(setIsActive(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(
            `Record successfully ${isArchiving ? "Restored" : "Archived"}.`
          )
        );
      } else {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleConfirm = async () => {
    mutation.mutate({
      isActive: isArchiving,
    });
  };
  return (
    <>
      <ModalWrapper position={position}>
        <div className="modal-main max-w-[401px] w-full">
          <div className="modal-header flex between-center bg-warning text-white p-3 px-4 rounded-t-md">
            <h4 className="mb-0 text-white">Confirm</h4>
            <button type="button" onClick={handleClose}>
              <LiaTimesSolid />
            </button>
          </div>
          <div className="modal-body p-4 rounded-b-md bg-secondary text-content">
            <div className="flex gap-4 items-center">
              <PiArchive className="text-4xl text-warning mb-3" />
              <div>
                <h2 className="mb-2">
                  {isArchiving === 0
                    ? "Archive "
                    : isArchiving === 1
                    ? "Restore "
                    : "[UNSPECIFIED FUNCTION]"}
                  Record
                </h2>
                <p className="mb-5">
                  Are you sure you want to
                  {isArchiving === 0
                    ? " archive "
                    : isArchiving === 1
                    ? " restore "
                    : " [UNSPECIFIED FUNCTION] "}
                  this record?
                </p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                className="btn btn--warning btn-form w-1/4"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="btn btn--cancel btn-form w-1/4"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalConfirm;
