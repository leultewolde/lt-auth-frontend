import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

export interface QueryParams {
    prefix: string;
    host: string;
    port?: string;
    resources?: string;
}

export const login = async (email: string, password: string, device: string, params: QueryParams) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    const query = new URLSearchParams(filteredParams);

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
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    const query = new URLSearchParams(filteredParams);

    return await axios.post(`${API_URL}/auth/register?${query}`, {
        firstName,
        lastName,
        email,
        password,
        phone,
    });
};
