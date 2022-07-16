import { RequestHandler } from "express";

export const home: RequestHandler = (req, res) => {
  res.status(200).json({
    test: "test",
  });
};
