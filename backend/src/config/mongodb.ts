import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.connection.on(`connected`, () => {
    console.log("Database Connected");
  });
  mongoose.connect(`${process.env.MONGO_URL}`);
};

export default connectDb;
