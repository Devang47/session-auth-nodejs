import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
import parser from "body-parser";

const app = express();
dotenv.config();
app.use(parser.json());

mongoose.connect(process.env.URI || "").then(() => {
  console.log("MongoDB Connected....");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(5000, () => console.log(`Server 🔥🔥🔥 up on 5000`));
