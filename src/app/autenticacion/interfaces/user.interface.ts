export interface User{
    email: string,
    password: string,
}
export interface loginForm {
    email: string,
    password: string,
}

export interface registerForm {
    email: string | undefined,
    password: string | undefined,
}