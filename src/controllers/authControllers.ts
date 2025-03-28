import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { authSchema } from "../validations/authSchema";
import { authServices } from "../services/authServices";

export const authControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = authSchema.parse(req.body);
      const { id, token } = await authServices.login(
        { email, password },
        userRepository
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24, // 1d
      });

      res.status(200).json({ message: "Login completed", id });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .clearCookie("token")
        .status(200)
        .json({ message: "Logout completed" });
    } catch (error) {
      next(error);
    }
  },
};
