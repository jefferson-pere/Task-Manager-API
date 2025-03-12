import { sqliteConnection } from "../databases";
import { UserDataTypes } from "../validations/userSchema";

export type CreateUserDataType = UserDataTypes & { id: string };

export const userRepository = {
  async create({ id, name, email, password }: CreateUserDataType) {
    try {
      const db = await sqliteConnection();
      const query = `INSERT INTO users (id, name, email, password) VALUES (?,?,?,?)`;

      await db.run(query, [id, name, email, password]);

      return { id, name, email, password };
    } catch (error) {
      throw error;
    }
  },
};
