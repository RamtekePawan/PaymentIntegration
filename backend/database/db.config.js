import { connect } from "mongoose";
const connectToMongo = async () => {
  try {
    let res = await connect(process.env.MONGO_URI);
    console.log("connected TO MONGODB");
  } catch (error) {
    console.log("ERROR ::::IN DB CONNECTION", error);
  }
};

export default connectToMongo;
