import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

export interface QueryParams {
    prefix: string;
    host: string;
    port?: string;
    resources?: string;
}

export const login = async (email: string, password: string, device: string, params: QueryParams) => {
    const query = new URLSearchParams({
        prefix: params.prefix,
        host: params.host,
        port: params.port || "80",
        resources: params.resources || "default",
    });

    return await axios.post(`${API_URL}/auth/login?${query}`, {
        email,
        password,
        device,
    });
};

export const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    params: QueryParams
) => {
    const query = new URLSearchParams({
        prefix: params.prefix,
        host: params.host,
        port: params.port || "80",
        resources: params.resources || "default",
    });

    return await axios.post(`${API_URL}/auth/register?${query}`, {
        firstName,
        lastName,
        email,
        password,
        phone,
    });
};
