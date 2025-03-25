import { CreateUserDataType } from "./userRepository";

const users = [
  {
    id: "1",
    name: "Jefferson",
    email: "jeff1@dev.com",
    password: "$2b$10$K.5W/ryjy0RMYsBlQmCYFOrpYPXhhVrpBo4r6q3Bp1bk9SDCflVy6",
  },
  {
    id: "2",
    name: "Jefferson",
    email: "jeff2@dev.com",
    password: "$2b$10$K.5W/ryjy0RMYsBlQmCYFOrpYPXhhVrpBo4r6q3Bp1bk9SDCflVy6",
  },
] as CreateUserDataType[];

export const userRepositoryInMemory = {
  async create({ id, name, email, password }: CreateUserDataType) {
    try {
      users.push({ id, name, email, password });

      console.log(users); //

      return users[users.length - 1];
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = users.find((user) => user.email === email);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const user = users.find((user) => user.id === id);
      return user;
    } catch (error) {
      throw error;
    }
  },
};
