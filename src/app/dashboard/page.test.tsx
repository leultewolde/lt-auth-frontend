import React from "react";
import {render, screen} from "@testing-library/react";
import Dashboard from "./page";
import {SnackbarProvider} from "@/app/components/SnackbarContext";
import {useSearchParams} from "next/navigation";

jest.mock("next/navigation", () => ({
    useSearchParams: jest.fn(),
}));

describe("Dashboard Page", () => {
    test("renders query parameters correctly", () => {
        // Mock the useSearchParams hook
        const mockSearchParams = new URLSearchParams({
            prefix: "http",
            host: "localhost",
            port: "8081",
            resources: "dashboard",
        });
        (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

        render(
            <SnackbarProvider>
                <Dashboard/>
            </SnackbarProvider>
        );

        // Verify the rendered JSON string
        const preElement = screen.getByText((content, element) => {
            return (
                element?.tagName === "PRE" &&
                content.includes('"prefix": "http"') &&
                content.includes('"host": "localhost"') &&
                content.includes('"port": "8081"') &&
                content.includes('"resources": "dashboard"')
            );
        });

        expect(preElement).toBeInTheDocument();
    });

    test("renders empty object when no query parameters are present", () => {
        // Mock the useSearchParams hook with an empty URLSearchParams
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

        render(
            <SnackbarProvider>
                <Dashboard/>
            </SnackbarProvider>
        );

        // Verify the rendered JSON string for an empty object
        const preElement = screen.getByText(JSON.stringify({}, null, 2));
        expect(preElement).toBeInTheDocument();
    });
});