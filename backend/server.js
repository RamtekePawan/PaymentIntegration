import connectToMongo from "./database/db.config.js";
import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentsRouter from "./routers/payments.router.js";
import router from "./routers/payments.router.js";
dotenv.config(); // This is how you load the .env file

connectToMongo();
const app = express();
const port = process.env.SERVER_PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

//* Available Route
app.get("/", (req, res) => {
  res.send("Razorpay Payment Gateway Using React And Node Js ");
});

app.use("/api/payment",  router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
