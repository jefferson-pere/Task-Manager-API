import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { authSchema } from "../validations/authSchema";
import { authServices } from "../services/authServices";

export const authControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = authSchema.parse(req.body);
      const { id } = await authServices.login({ email, password }, userRepository);
      res.status(200).json({ message: "Login completed", id });
    } catch (error) {
      next(error);
    }
  },
};
