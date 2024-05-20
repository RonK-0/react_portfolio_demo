import React from "react";
import { setError, setMessage } from "../../store/StoreAction";
import { devApiUrl, fetchFormData } from "../helpers/functions-general";

const useUploadPhoto = (url, dispatch) => {
  const [photo, setPhoto] = React.useState(null);
  const uploadPhoto = async () => {
    if (photo) {
      const fd = new FormData();

      fd.append("photo", photo, photo.name.toLowerCase());

      const data = await fetchFormData(devApiUrl + url, fd, dispatch);

      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    }
  };

  const handleChangePhoto = (e) => {
    if (!e.target.files[0]) {
      setPhoto("");
      dispatch(setError(false));
      return;
    }

    const file = e.target.files[0];

    // if (file.size > 5000) {
    //   dispatch(setError(true));
    //   dispatch(
    //     setMessage(
    //       "Photo is too big. It should be less than 5Kb and 80x80px size for better result."
    //     )
    //   );

    //   return;
    // }

    // consoleLog("Set photo");
    setPhoto(file);
  };

  return { uploadPhoto, handleChangePhoto, photo };
};

export default useUploadPhoto;