import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const ProtectedRoutes = ({ children }) => {
  const history = useHistory();
  const isAuth = localStorage.getItem("token");
  useEffect(() => {
    if (isAuth) {
      axios.defaults.headers.common["Authorization"] = `Token${" "}${isAuth}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      history.push("/login");
    }
  }, [isAuth, history]);
  return <>{children}</>;
};

export default ProtectedRoutes;
