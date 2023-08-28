export interface User {
    nombres: string,
    apellidos: string
    email: string,
    password: string,
}
export interface loginForm {
    email: string,
    password: string,
}

export interface registerForm {
    nombres: string | undefined,
    apellidos: string | undefined;
    email: string | undefined,
    password: string | undefined,
}