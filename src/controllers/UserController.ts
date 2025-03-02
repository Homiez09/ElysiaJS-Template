import Elysia, { error, t } from "elysia";
import { UserRepository } from "../repositories/UserRepository";
import { AllUserResponse, UserResponse } from "../responses/UserResponse";

const UserController = new Elysia({
  prefix: "/api/v1/user",
  tags: ["User"],
}).model({
  UserRegisterRequest: t.Object({
    name: t.String(
      {
        minLength: 3,
        maxLength: 50,
        pattern: "^[a-zA-Z0-9 ]+$",
      },
    ),
    email: t.String({
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    }),
  }),
});

UserController.get(
  "/all",
  async ({ query: { page = 1, maxuser = 10 } }): Promise<AllUserResponse> => {
    const userRepository = new UserRepository();
    const users: AllUserResponse = await userRepository.getAllUser(
      Number(page),
      Number(maxuser)
    );
    return users;
  },
  {
    detail: {
      summary: "Get all users",
      description: "Fetch all users from the database with pagination",
      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          description: "Page number",
          schema: {
            type: "number",
            default: 1,
          },
        },
        {
          name: "maxuser",
          in: "query",
          required: false,
          description: "Maximum number of users per page",
          schema: {
            type: "number",
            default: 10,
          },
        },
      ],
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        name: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                  },
                  meta: {
                    type: "object",
                    properties: {
                      pagination: {
                        type: "object",
                        properties: {
                          page: { type: "number" },
                          pageSize: { type: "number" },
                          pageCount: { type: "number" },
                          total: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }
);

UserController.get(
  "/:id",
  async ({ params: { id } }) => {
    const userRepository = new UserRepository();
    const user: UserResponse | null = await userRepository.getUserById(
      Number(id)
    );
    if (!user) return error(404, { message: "User not found" });
    return user;
  },
  {
    detail: {
      summary: "Get user by ID",
      description: "Fetch a user from the database by ID",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "User not found" },
                },
              },
            },
          },
        },
      },
    },
  }
);

UserController.post(
  "/register",
  async ({ body }) => {
    const userRepository = new UserRepository();
    const user: UserResponse = await userRepository.createUser(body);
    return user;
  },
  {
    body: "UserRegisterRequest",
    detail: {
      summary: "Register a new user",
      description: "Create a new user in the database",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserRegisterRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  }
);

export default UserController;
