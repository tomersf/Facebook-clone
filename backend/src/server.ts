import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.log("database connected!"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is lestining...");
});
