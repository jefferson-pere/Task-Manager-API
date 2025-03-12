import { NextFunction, Request, Response } from "express";
import { userSchema } from "../validations/userSchema";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = userSchema.parse(req.body);
      //
      res.status(201).json({ name, email, password });
    } catch (error) {
      next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const {} = req.body;
      res.status(200).json({ message: "User read" });
    } catch (error) {
      next(error);
    }
  },
};
