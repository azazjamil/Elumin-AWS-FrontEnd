import React, { useEffect } from "react";
// import { API } from "../service/httpservice";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
export const Login = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    if (userInfo) {
      navigate("/form");
    }
  }, [userInfo]);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUserInfo(response.access_token);
    },
    onError: (error) => {
      console.log(`Login Failed: ${error}`);
    },
  });

  return (
    <div className="main-section">
      <div className="section-wrap">
        <div className="login-text">Login</div>
        <div>
          <button
            className="btn-pdf"
            onClick={() => {
              login();
            }}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
