import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import { extractENV, ENVS } from "./helpers/env";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

mongoose
  .connect(extractENV(ENVS.DATABASE_URL))
  .then(() => console.log("database connected!"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = extractENV(ENVS.PORT) || 8000;
app.listen(PORT, () => {
  console.log("server is lestining on port", PORT);
});
