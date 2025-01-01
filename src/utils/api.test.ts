import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { login, register, QueryParams } from "./api";

const mock = new MockAdapter(axios);
const API_URL = "http://localhost:8080";

describe("API Utilities", () => {
    const queryParams: QueryParams = {
        prefix: "http",
        host: "localhost",
        port: "8080",
        resources: "dashboard",
    };
    const query = new URLSearchParams({
        prefix: "http",
        host: "localhost",
        port: "8080",
        resources: "dashboard",
    });

    afterEach(() => {
        mock.reset();
    });

    test("login sends correct payload", async () => {
        mock.onPost(`${API_URL}/auth/login?${query}`).reply(200, { redirectUrl: "/dashboard" });

        const response = await login("test@example.com", "password", "device", queryParams);

        expect(response.data.redirectUrl).toBe("/dashboard");
        expect(mock.history.post[0].data).toContain("test@example.com");
    });

    test("register sends correct payload", async () => {
        mock.onPost(`${API_URL}/auth/register?${query}`).reply(201);

        await register("John", "Doe", "john@example.com", "password", "1234567890", queryParams);

        const data = JSON.parse(mock.history.post[0].data);
        expect(data.firstName).toBe("John");
        expect(data.lastName).toBe("Doe");
    });
});