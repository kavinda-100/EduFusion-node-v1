import express from "express";
import type { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import ImageKit from "imagekit";
import dotenv from "dotenv";

import { connectToDB, disconnectFromDB } from "./lib/db";
import { errorHandler } from "./lib/errorHandellers";
import MainRouter from "./routes";

// Load environment variables from the .env file
dotenv.config();
// Create an Express application
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/dist")));

const PORT = process.env.PORT || 5000;

export const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKITIO_PUBLIC_URL as string,
  publicKey: process.env.IMAGEKITIO_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKITIO_PRIVATE_KEY as string,
});

// allow cross-origin requests
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/auth", function (req: Request, res: Response) {
  let result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// Welcome route
app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to EduFusion" });
});

// Routes
//edufusion.com/api/v1
app.use("/api/v1", MainRouter);

// Static files
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start the server
connectToDB()
  .then(() => {
    // If the connection to MongoDB is successful, start the server
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // If there was an error connecting to MongoDB, log the error and disconnect from the database
    disconnectFromDB()
      .then(() => {
        console.log("Disconnected from MongoDB");
      })
      .catch((error) => {
        console.error("Error disconnecting from MongoDB: ", error);
      });
    // Log the error and exit the process
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  });
