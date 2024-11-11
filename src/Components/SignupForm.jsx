import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setIsChecked(false);
    setIsFormSubmitted(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isChecked) {
      const deviceToken = "0";
      const username = `${firstname}${lastname}`;
      const userData = { email, username, password, deviceToken };
      console.log(`======= user data ========`);
      console.log(userData);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SIGNUP_API_URL}`,
          userData
        );
        console.log("====== response ======");
        console.log(res.data);

        if (res.data.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => navigate("/LogIn"), 500);
        } else {
          toast.error(res.data.message);
          resetForm();
        }
      } catch (err) {
        console.log("======== error heree ========");
        if (err.response && err.response.data && err.response.data.message) {
          console.log(err.response.data);
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        resetForm();
      }

      console.log(userData);
      setIsFormSubmitted(true);
    } else {
      alert("Please agree to the terms to create an account.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="display: grid">
        <input
          type="text"
          placeholder="First name"
          className="firstNameInput pl-3 pr-5 mb-4"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          className="lastNameInput pl-3 pr-5 mb-4"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="emailAndPassInput pl-3 pr-5 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="password-input"
            required
          />
          <div className="icon-container">
            <button
              type="button"
              onClick={handlePasswordToggle}
              style={{
                position: "absolute",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={{ fontSize: "20px", color: "#B0B1B2" }}
              />
            </button>
          </div>
        </div>

        <br />
        <label className="agreenmentText">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="text-sm sm:text-l md:text-l lg:text-l l:text-l">
            {" "}
            I agree with Cemperium's Terms of services, Privacy policy and
            default notification settings.
          </span>
        </label>
        <br />
        <button
          className="createAccountButton pt-2 pb-2 rounded-lg"
          type="submit"
          style={{
            backgroundColor: isChecked ? "rgb(81,154,206)" : "gray",
            color: "white",
            cursor: isChecked ? "pointer" : "not-allowed",
          }}
          disabled={!isChecked || isFormSubmitted}
        >
          Create Account
        </button>
      </form>
      {isFormSubmitted && console.log("Form submitted successfully")}
    </div>
  );
};

export default SignupForm;
