import jwt from "jsonwebtoken";
import { userModel } from "../models/users.js";

const validateJWt = async (req, res, next) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization was not found");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("token not found !");
    return;
  }

  jwt.verify(
    token,
    "nqCveM8kzQ0eQDVQYAn6FMEYYdwn9l6e",
    async (err, payload) => {
      if (err) {
        res.status(403).send("invalid token !");
        return;
      }

      if (!payload) {
        res.status(403).send("invalid token payload !");
        return;
      }

      /// fetch user from db pn payload

      const user = await userModel.findOne({ email: payload.email });

      req.user = user;
      next();
    }
  );
};

export default validateJWt;
