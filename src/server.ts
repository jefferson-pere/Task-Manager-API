import express from "express";
import { routes } from "./routes";
import { AppErrors } from "./errors/appErrors";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);

app.use(AppErrors)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
