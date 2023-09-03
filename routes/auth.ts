import type { Request, Response } from "express";
import { UserModel } from "../models/user";

export const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await UserModel.findOne({
    email,
  });
  if (!user) return res.status(404).json({ msg: "Not found" });

  req.session.userId = user.id;

  res.json({ msg: "success" }).status(200);
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.create({
    email,
    password,
  });
  user.save();

  req.session.userId = user.id;
  req.session.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(req.session.userId);
    }
  });
};

export const revokeSession = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Session is destroyed");
    }
  });
};

export const getUserDetails = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.session.userId);
  if (!user) return res.status(404).json({ msg: "Not found" });

  console.log(user);
  res.json({ user }).status(200);
};
