// import { devNavUrl } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_client === 1
    ? navigate(`${data.role_name.toLowerCase()}/profile`)
    : navigate(`${data.role_name.toLowerCase()}/client`);
};