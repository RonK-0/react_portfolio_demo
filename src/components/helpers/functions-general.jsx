// export const baseImgUrl = "http://localhost:5173/img";
export const baseImgUrl = "../../img";

// for page title
export const PageTitle = (newTitle) => {
  return (document.title = newTitle);
};

// for api path &  key
export const urlPathPortfolio = "http://localhost/react_demo";
export const devApiUrl = `${urlPathPortfolio}/rest`;
export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";
export const apiVersion = "v1";


// for img upload
// export const devBaseImgUrl = "https://localhost/react_demo/public/img";
export const devBaseImgUrl = `${urlPathPortfolio}/public/img`;

// fetch for uploading photo or file
export const fetchFormData = (url, fd = {}) => {
  const data = fetch(url, {
    method: "post",
    body: fd,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error + " api endpoint error");
    });

  return data;
};

// for search
// get the url id parameter
export const getUrlParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
};

// for login
export const checkLocalStorage = () => {
  let glatoken = null;
  try {
    glatoken = JSON.parse(localStorage.getItem("glatoken"));
  } catch (error) {
    glatoken = null;
  }

  return glatoken;
};

export function setStorageRoute(jwt) {
  localStorage.setItem("glatoken", JSON.stringify({ token: jwt }));
}