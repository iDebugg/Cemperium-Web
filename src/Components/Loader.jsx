import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Loader.css";

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="createAccount pr-4 pl-4 pt-4">
      <div className="ddddddd">
        <div className="jjjjj"></div>
      </div>
    </div>
  );
};

export default Loader;
