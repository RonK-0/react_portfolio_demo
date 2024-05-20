import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../partials/svg/Logo";

const Login = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="max-w-[400px] w-full px-4 py-8 bg-secondary">
          <Logo />

          <h2>Login</h2>
          <form action="" className="mt-5">
            <div className="input-wrap">
              <label htmlFor="">Email</label>
              <input type="text" />
            </div>
            <div className="input-wrap">
              <label htmlFor="">Passwprd</label>
              <input type="password" />
            </div>
            <Link
              to={"/forgot-password"}
              className="block text-right italic text-xs mb-5 hover:underline"
            >
              Forgot Password
            </Link>
            <button className="btn btn--accent w-full p-4">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
