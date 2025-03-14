import { compare } from "bcrypt";
import { UserRepositoryTypes } from "./userServices";
import { AppError } from "../errors/appError";
import { AuthDataTypes } from "../validations/authSchema";

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
      return { id: user.id };
    } catch (error) {
      throw error;
    }
  },
};
