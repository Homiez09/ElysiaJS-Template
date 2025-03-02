import { Elysia, redirect } from "elysia";
import { document } from "./swagger";
import UserController from "./controllers/UserController";

const app = new Elysia().listen(3000);

app.use(document); // API documentation (Swagger)
app.use(UserController);

app.get("/", () => redirect("/api/docs"), {
  detail: {
    tags: ["General"],
    summary: "API Documentation",
    description: "Redirect to the API documentation page",
  }
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
