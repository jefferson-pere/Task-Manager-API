import { sqliteConnection } from "../databases";
import { AppError } from "../errors/appError";
import { TaskDataCreate, UserTaskPagination } from "../services/taskServices";

export type CreateTaskDataType = TaskDataCreate & { id: string };
export type UpdateTaskDataType = CreateTaskDataType & { updated_at: Date };

export const taskRepository = {
  async createTask({
    id,
    title,
    description,
    date,
    status,
    user_id,
  }: CreateTaskDataType) {
    try {
      const db = await sqliteConnection();
      const query = `INSERT INTO tasks (id, title, description, date, status, user_id) VALUES (?,?,?,?,?,?)`;

      await db.run(query, [id, title, description, date, status, user_id]);

      return { id, title, description, date, status, user_id };
    } catch (error) {
      throw error;
    }
  },

  async getTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const query = `SELECT * FROM tasks WHERE id = ?`;

      const task = await db.get(query, id);

      return task;
    } catch (error) {
      throw error;
    }
  },
  async getTasks({ userID, limit, offset, filter }: UserTaskPagination) {
    try {
      const db = await sqliteConnection();
      let querySql = "";
      let tasks = [];
      switch (filter) {
        case "all":
          querySql = `SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;
          tasks = await db.all(querySql, [userID, limit, offset]);
          break; //

        case "completed":
          querySql = `SELECT * FROM tasks WHERE user_id = ? AND status = 'completed' ORDER BY created_at DESC LIMIT ? OFFSET ?`;
          tasks = await db.all(querySql, [userID, limit, offset]);
          break; //

        case "pending":
          querySql = `SELECT * FROM tasks WHERE user_id = ? AND status = 'peding' AND date >= CURRENT_DATE ORDER BY created_at DESC LIMIT ? OFFSET ?`;
          tasks = await db.all(querySql, [userID, limit, offset]);
          break; //

        case "late":
          querySql = `SELECT * FROM tasks WHERE user_id = ? AND status = 'peding' AND date < CURRENT_DATE ORDER BY created_at DESC LIMIT ? OFFSET ?`;
          tasks = await db.all(querySql, [userID, limit, offset]);
          break; //

        default:
          throw new AppError("Invalid filter", 400);
      }
      return tasks;
    } catch (error) {
      throw error;
    }
  },

  async updateTask({
    id,
    title,
    description,
    date,
    status,
    user_id,
    updated_at,
  }: UpdateTaskDataType) {
    try {
      const db = await sqliteConnection();

      const query = `UPDATE tasks
      SET title=?, description=?, date=?, status=?, updated_at=?
      WHERE id=? AND user_id=?`;

      await db.run(query, [
        title,
        description,
        date,
        status,
        updated_at,
        id,
        user_id,
      ]);

      return { id, title, description, date, status, user_id, updated_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const query = `DELETE FROM tasks WHERE id = ?`;

      await db.run(query, id);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
