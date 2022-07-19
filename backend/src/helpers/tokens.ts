import jwt from "jsonwebtoken";
import { ENVS, extractENV } from "./env";

export const generateToken = (
  payload: string | object | Buffer,
  expired: string | number
) => {
  return jwt.sign(payload, extractENV(ENVS.TOKEN_SECRET), {
    expiresIn: expired,
  });
};
