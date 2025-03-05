import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export default function ProductCard() {
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
        <Button className="w-full bg-[#1B9CFC]">Buy Now</Button>
      </CardFooter>
    </Card>
  );
}
