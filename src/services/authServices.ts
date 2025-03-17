import { compare } from "bcrypt";
import { UserRepositoryTypes } from "./userServices";
import { AppError } from "../errors/appError";
import { AuthDataTypes } from "../validations/authSchema";
import { sign } from "jsonwebtoken";

export const authServices = {
  async login(
    { email, password }: AuthDataTypes,
    repository: UserRepositoryTypes
  ) {
    try {
      const user = await repository.getUserByEmail(email);
      if (!user) {
        throw new AppError("email or password invalid", 404);
      }
      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        throw new AppError("email or password invalid", 401);
      }
      // const token = sign({ id: user.id }, `${process.env.SECRET_TOKEN}`, {
      //   expiresIn: "60s",
      // });
      if (!process.env.SECRET_TOKEN) {
        throw new AppError("SECRET_TOKEN is not defined", 500);
      }
      const token = sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: "60s",
      });

      return { id: user.id, token };
    } catch (error) {
      throw error;
    }
  },
};
