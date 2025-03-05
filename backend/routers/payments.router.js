import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.get("/get-payment", (req, res) => {
  res.json("Payment Details");
});

router.post("/order", (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data });
      console.log("data /order ::::>", data);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

export default router;
