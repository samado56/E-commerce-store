import { useState } from "react";
import { AuthContext } from "./AuthCntext";

const AuthProvider = ({ children }) => {
  const localUser = localStorage.getItem("username");
  const localToken = localStorage.getItem("token");

  const [username, setUsername] = useState(localUser);
  const [token, setToken] = useState(localToken);

  // useEffect(() => {
  //   const localUser = localStorage.getItem("username");
  //   const localToken = localStorage.getItem("token");

  //   setUsername(localUser);
  //   setToken(localToken);
  // }, []);
  const login = (username, token) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  const isLogedin = !!token;

  return (
    <AuthContext.Provider value={{ username, token, login, isLogedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
