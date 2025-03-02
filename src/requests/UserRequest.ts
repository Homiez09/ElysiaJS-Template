export type UserRegisterRequest = {
    name: string;
    email: string;
}

export type UserLoginRequest = {
    email: string;
}

export type UserUpdateRequest = {
    name?: string;
    email?: string;
}