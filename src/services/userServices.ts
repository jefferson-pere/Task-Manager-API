import { CreateUserDataType } from "../repositories/userRepository";
import { UserDataTypes } from "../validations/userSchema";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

export type UserRepositoryTypes = {
  create: (data: CreateUserDataType) => Promise<UserDataTypes | undefined>;
};

export const userServices = {
  async create(
    { name, email, password }: UserDataTypes,
    repository: UserRepositoryTypes
  ) {
    try {
      const passwordHash = await hash(password, 10);

      const userCreated = await repository.create({
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      });

      return userCreated;
    } catch (error) {
      throw error;
    }
  },
};
