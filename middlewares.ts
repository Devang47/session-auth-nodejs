import type { Request, Response, NextFunction } from "express";
import { UserModel } from "./models/user";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(400).json({ msg: "session-expired" });
  }
  try {
    let user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: "session-expired" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server error. Please reload page after sometime" });
  }
};
