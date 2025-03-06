import express from "express";
import Razorpay from "razorpay";
import "dotenv/config";
import crypto from "crypto";
import Payment from "../models/payment.model.js";

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
    console.log("error /order ::::>", error);
  }
});

router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log(
    "INSIDE /verify  razorpay_order_id, razorpay_payment_id, razorpay_signature",
    req.body
  );
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log(
      "INSIDE /verify expectedSign , razorpay_signature",
      expectedSign,
      razorpay_signature
    );
    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      let dbRespo = await payment.save();

      console.log("dbRespo:::::::>>>>", dbRespo);
      // Send Message
      res.status(200).json({
        message: "Payement Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in /verify ::::>", error);
  }
});

export default router;
