import db from "../database/db";
import {
  UserRegisterRequest,
  UserUpdateRequest,
} from "../requests/UserRequest";
import {
  AllUserResponse,
  UserRegisterResponse,
  UserResponse,
} from "../responses/UserResponse";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface IUserRepository {
  getUserById(id: number): Promise<UserResponse | null>;
  getAllUser(page: number, totalUser?: number): Promise<AllUserResponse>;
  createUser(user: UserRegisterRequest): Promise<UserRegisterResponse>;
  updateUser(id: number, user: UserUpdateRequest): Promise<UserResponse | null>;
  deleteUser(id: number): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  public async createUser(
    user: UserRegisterRequest
  ): Promise<UserRegisterResponse> {
    try {
      const response = await db.user.create({
        data: {
          name: user.name,
          email: user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("Email already exists");
          default:
            throw new Error("Internal Server Error");
        }
      }
      throw new Error("Internal Server Error");
    }
  }

  public async deleteUser(id: number): Promise<boolean> {
    try {
      await db.user.delete({
        where: { id: id },
      });

      return true;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2018":
            throw new Error("User not found");
          default:
            throw new Error("Internal Server Error");
        }
      }
      throw new Error("Internal Server Error");
    }
  }

  public async updateUser(
    id: number,
    user: UserUpdateRequest
  ): Promise<UserResponse | null> {
    try {
      const response = await db.user.update({
        where: {
          id: id,
        },
        data: {
          name: user.name,
          email: user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2018":
            throw new Error("User not found");
          default:
            throw new Error("Internal Server Error");
        }
      }
      throw new Error("Internal Server Error");
    }
  }

  public async getUserById(id: number): Promise<UserResponse | null> {
    try {
      const response = await db.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return response;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }

  // Support pagination for fetching all users
  public async getAllUser(
    page: number = 1,
    maxUser: number = 10
  ): Promise<AllUserResponse> {
    try {
      const totalUsers = await db.user.count();

      const response = await db.user.findMany({
        skip: (page - 1) * maxUser,
        take: maxUser,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return {
        data: response,
        meta: {
          pagination: {
            page: page,
            pageSize: maxUser,
            pageCount: totalUsers === 0 ? 1 : Math.ceil(totalUsers / maxUser),
            total: totalUsers,
          },
        },
      };
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
}
