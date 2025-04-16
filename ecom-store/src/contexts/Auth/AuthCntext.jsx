import { createContext, useContext } from "react";

const initail = {
  username: "",
  token: "",
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initail);

export const UseAuth = () => useContext(AuthContext);
