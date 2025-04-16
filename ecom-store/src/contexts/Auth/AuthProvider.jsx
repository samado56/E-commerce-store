import { useState } from "react";
import { AuthContext } from "./AuthCntext";

const AuthProvider = ({ children }) => {
  const USERNAME_KEY = "username";
  const TOKEN_KEY = "token";
  const localUser = localStorage.getItem(USERNAME_KEY);
  const localToken = localStorage.getItem(TOKEN_KEY);

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
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername(null);
    setToken(null);
  };

  const isLogedin = !!token;

  return (
    <AuthContext.Provider value={{ username, token, login, isLogedin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
