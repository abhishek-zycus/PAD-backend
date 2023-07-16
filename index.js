import express from "express";
import dotenv from "dotenv";
import registerRoute from "./router/registerRoute.js";
import loginRoute from "./router/loginRoute.js";
import dashboardRoute from "./router/dashboardRoute.js";
import cors from "cors";
import dbConnection from "./db/connection.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
dbConnection(process.env.MONGO_URI);

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/", (req, res) => {
  res.status(200).json({ message: "PAD Backend is running" });
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  if (!error.message) error.message = "Server side error";
  const status = error.statusCode;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at port ${process.env.PORT}`);
});
