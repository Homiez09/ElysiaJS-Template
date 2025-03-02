import { PaginationResponse } from "./PaginationResponse";

export type UserResponse = {
    id: number;
    name: string;
    email: string;
}

export type UserRegisterResponse  = UserResponse

export type UserLoginResponse = UserResponse;

export type AllUserResponse = {
    data: UserResponse[];
    meta: {
        pagination: PaginationResponse;
    }
}