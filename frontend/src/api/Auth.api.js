import {api} from "../api/axios";

export const login = (body) =>
    api.post("auth/login", body);

export const register = (body) =>
    api.post("auth/register", body);
