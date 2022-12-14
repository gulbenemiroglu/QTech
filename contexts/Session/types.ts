import {Dispatch, SetStateAction} from "react";

export interface IUser {
    id: number;
    username: string;
    dayLimit: number;
}

export interface ICredentials {
    username: string;
    password: string;
}

export type TUser = IUser | null;

export interface ISessionContext {
    user: TUser;
    setUser: Dispatch<SetStateAction<TUser>>;
    login: (args: ICredentials) => void;
    logout: () => void;
}