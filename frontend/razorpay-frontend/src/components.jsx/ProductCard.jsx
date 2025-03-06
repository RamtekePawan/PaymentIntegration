import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard() {
  const handlePaymentVerify = (data) => {
    let options = {
      key: import.meta.env.RAZORPAY_SECRET,
      amount: data.amount,
      currency: data.currency,
      name: "pawan",
      description: "Test Mode",
      order_id: data.id,
      config: {
        display: {
          blocks: {
            banks: {
              name: "Most Used Methods",
              instruments: [
                {
                  method: "wallet",
                  wallets: ["freecharge"],
                },
                {
                  method: "upi",
                },
              ],
            },
          },
          hide: [
            {
              method: "",
            },
          ],
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      handler: async (response) => {
        let sendData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Make sure Content-Type is set to JSON
              },
              body: JSON.stringify(sendData),
            }
          );
          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.log("handler:::>", error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const amount = 350;
  const handlePayment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );
      let { data } = await response.json();
      handlePaymentVerify(data);
    } catch (error) {
      console.log("handlePayment::::::>", error);
    }
  };

  return (
    <Card className="mt-6 w-96 bg-[#222f3e] text-white">
      {/* CardHeader */}
      <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
        {/* Image  */}
        <img
          src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/pack-of-five-plain-tshirt-white/1.webp"
          alt="card-image"
        />
      </CardHeader>
      {/* CardBody */}
      <CardBody>
        {/* Typography For Title */}
        <Typography variant="h5" className="mb-2"></Typography>
        {/* Typography For Price  */}
        <Typography>
          ₹350 <span className=" line-through">₹699</span>
        </Typography>
      </CardBody>
      {/* CardFooter  */}
      <CardFooter className="pt-0">
        {/* Buy Now Button  */}
        <Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">
          Buy Now
        </Button>
        <Toaster />
      </CardFooter>
    </Card>
  );
}
