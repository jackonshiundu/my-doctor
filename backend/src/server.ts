import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDb from "./config/mongodb";
import dotenv from "dotenv";
import createCloudinary from "./config/cloudinary";
import adminRouter from "./routes/admin.route";
import doctorRoute from "./routes/doctor.routes";
dotenv.config();
const app = express();

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"], // Comma separated list of your urls to access your api. * means allow everything
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
    console.log("Hello world");
  } catch (err) {
    console.log(err);
  }
});
//api endpoints

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRoute);

// Start backend server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

export default app;
