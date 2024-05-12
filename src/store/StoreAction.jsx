export const setError = (val) => {
    return {
      type: "ERROR",
      payload: val,
    };
  };
  
  export const setInfo = (val) => {
    return {
      type: "INFO",
      payload: val,
    };
  };
  
  export const setMessage = (val) => {
    return {
      type: "MESSAGE",
      payload: val,
    };
  };
  

  export const setSuccess = (val) => {
    return {
      type: "SUCCESS",
      payload: val,
    };
  };
  
  export const setSave = (val) => {
    return {
      type: "SAVE",
      payload: val,
    };
  };
  
  export const setIsShow = (val) => {
    return {
      type: "SHOW",
      payload: val,
    };
  };
  
  export const setIsArchive = (val) => {
    return {
      type: "ARCHIVE",
      payload: val,
    };
  };
  
  export const setIsRestore = (val) => {
    return {
      type: "RESTORE",
      payload: val,
    };
  };
  
  export const setIsDelete = (val) => {
    return {
      type: "DELETE",
      payload: val,
    };
  };
  
  export const setIsAdd = (val) => {
    return {
      type: "IS_ADD",
      payload: val,
    };
  };
  
  export const setIsSearch = (val) => {
    return {
      type: "IS_SEARCH",
      payload: val,
    };
  };

  export const setIsActive = (val) => {
    return {
      type: "IS_ACTIVE",
      payload: val,
    };
  };

  export const setIsEdit = (val) => {
    return {
      type: "IS_EDIT",
      payload: val,
    };
  };