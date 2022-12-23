import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppProvider";
import API from "../../requests";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { urls, dispatch, setIsLoged } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeRememberMe = (e) =>
    setRememberMe((prevValue) => !prevValue);

  const handleLogin = async (e) => {
    const token = await API.request({
      url: urls.token.href,
      method: urls.token.method,
      data: {
        username,
        password,
      },
    });
    const { data } = await API.request({
      url: urls.users.href + "me/",
      method: urls.users.method,
      headers: { Authorization: `Token ${token.data.auth_token}` },
    });
    if (rememberMe) {
      await sessionStorage.setItem("token", token.data.auth_token);
    }
    dispatch({
      type: "LOGIN",
      payload: {
        ...data,
        token: token.data.auth_token,
      },
    });
    setIsLoged(true);
    navigate("/");
  };

  return (
    <div className={styles.signin}>
      <div className={`${styles.form_signin} text-center`}>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Zaloguj się</h1>
        <input
          type="text"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required=""
          value={password}
          onChange={handleChangePassword}
        />
        <div className="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              value="remember-me"
              checked={rememberMe}
              onChange={handleChangeRememberMe}
            />
            Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={handleLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
