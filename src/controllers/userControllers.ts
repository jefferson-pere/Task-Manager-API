import { NextFunction, Request, Response } from "express";
import { userSchema } from "../validations/userSchema";
import { userServices } from "../services/userServices";
import { userRepository } from "../repositories/userRepository";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = userSchema.parse(req.body);

      const userCreated = await userServices.create({ name, email, password }, userRepository);

      res.status(201).json(userCreated);
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
