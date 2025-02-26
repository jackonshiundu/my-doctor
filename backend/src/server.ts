import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDb from "./config/mongodb";
import dotenv from "dotenv";
import createCloudinary from "./config/cloudinary";
dotenv.config();
const app = express();

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(helmet());

app.use(express.json());

connectDb();
createCloudinary();
app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    res.send("Server is Running!");
  } catch (err) {
    console.log(err);
  }
});

// Start backend server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

export default app;
