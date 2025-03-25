import { expect, test, describe } from "vitest";
import { userServices } from "../services/userServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";

describe("test create user functions", async () => {
  const user = {
    name: "Jefferson",
    email: "jeff@dev.com",
    password: "32101A!",
  };
  test("should create user", async () => {
    const userCreated = await userServices.create(user, userRepositoryInMemory);

    expect(userCreated).toBeDefined();
    expect(userCreated).toHaveProperty("id");
    expect(userCreated?.email).toEqual(user.email);
  });
  test("should not create user with same email", async () => {
    try {
      await userServices.create(user, userRepositoryInMemory);
    } catch (error: any) {
      expect(error.message).toBe("Email already exists");
    }
  });
});
