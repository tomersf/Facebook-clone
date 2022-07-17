import jwt from "jsonwebtoken";

export const generateToken = (
  payload: string | object | Buffer,
  expired: string | number
) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: expired,
  });
};
