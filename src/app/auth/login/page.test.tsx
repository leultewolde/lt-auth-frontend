import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./page";
import { SnackbarProvider } from "../../components/SnackbarContext";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(() => "mock-value"), // Mock query params as needed
    }),
}));

jest.mock("../../../utils/api", () => ({
    login: jest.fn(() => Promise.resolve({ data: { redirectUrl: "/dashboard" } })),
}));

describe("Login Page", () => {
    test("renders login form and submits", async () => {
        render(
            <SnackbarProvider>
                <Login />
            </SnackbarProvider>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });

        const loginButton = screen.getByRole("button", { name: /Login/i });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/Login successful. Redirecting.../i)).toBeInTheDocument();
    });
});