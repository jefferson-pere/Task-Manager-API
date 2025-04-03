import express from "express";
import { routes } from "./routes";
import { AppErrors } from "./errors/appErrors";
import { sqliteConnection } from "./databases";
import { runMigrations } from "./databases/migrations";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cookieParser());

const whiteList = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "app1",
  "site",
  "web",
];
app.use(cors({ origin: whiteList, credentials: true }));

app.use(routes);

app.use(AppErrors);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});

sqliteConnection()
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((error) => {
    console.log("Database ERROR - ", error);
  });

runMigrations()
  .then(() => {
    console.log("Migrations is connected!");
  })
  .catch((error) => {
    console.log("Migrations ERROR - ", error);
  });

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});
