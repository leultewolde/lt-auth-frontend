import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./page";
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
    register: jest.fn(() => Promise.resolve({ data: { redirectUrl: "/dashboard" } })),
}));

describe("Register Page", () => {
    test("renders register form and submits", async () => {
        render(
            <SnackbarProvider>
                <Register />
            </SnackbarProvider>
        );

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Smith" } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "641-233-9335" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });

        const loginButton = screen.getByRole("button", { name: /Register/i });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/Register successful. Redirecting.../i)).toBeInTheDocument();
    });
});