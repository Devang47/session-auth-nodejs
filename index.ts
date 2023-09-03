import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
import parser from "body-parser";
import {
  getUserDetails,
  loginUser,
  registerUser,
  revokeSession,
} from "./routes/auth";
import { authentication } from "./middlewares";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

const app = express();
dotenv.config();
app.use(parser.json());

mongoose.connect(process.env.URI || "").then(() => {
  console.log("MongoDB Connected....");
});

app.use(
  session({
    secret: process.env.SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: MongoStore.create({
      mongoUrl: process.env.URI,
    }),
  })
);

app.use("/auth/*", authentication);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/login", loginUser);
app.post("/register", registerUser);
app.get("/end", revokeSession);
app.get("/auth/me", getUserDetails);

app.all("*", (req, res) => {
  res.status(404).json("invalid path");
});

app.listen(5000, () => console.log(`Server up on 5000`));
