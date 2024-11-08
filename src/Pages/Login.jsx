import React from "react";
import "../Styles/CreateAccount.css";
import CemperiumLogo from "../img/Logo.svg";
import SignupForm from "../Components/SignupForm";
import LoginForm from "../Components/LoginForm";
import Illustrartion from "../img/Illustration.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="createAccount pr-4 pl-4 pt-4">
      <div className="cemperiumlogo-signup display: flex justify-between">
        <img src={CemperiumLogo} alt="" />
        <button className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl p-2 sm:p-2 md:p-2 lg:p-2 xl:p-2">
          <Link to="/">Create account</Link>
        </button>
      </div>
      <div className="createAcctWord mb-10">
        <h2 className="text-left text-3xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl pt-10">
          Trade & Manage Your Cryptocurrency
        </h2>
      </div>

      <div className="create-an-account text-center mt-10 pt-10 pb-5 pr-5 pl-5">
        <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-2">
          Log in to account
        </h1>
        <h5 className="text-xs sm:text-xs md:text-xs lg:text-sm l:text-sm mb-5 font-light">
          Welcome back to Cemperium Exchange!
        </h5>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
