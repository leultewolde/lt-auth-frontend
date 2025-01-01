import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SnackbarProvider, useSnackbar } from "./SnackbarContext";

const TestComponent = () => {
    const { showSnackbar } = useSnackbar();

    return (
        <button onClick={() => showSnackbar("Test Message", "success")}>Show Snackbar</button>
    );
};

describe("SnackbarContext", () => {
    test("displays snackbar message", () => {
        render(
            <SnackbarProvider>
                <TestComponent />
            </SnackbarProvider>
        );

        fireEvent.click(screen.getByText(/Show Snackbar/i));

        expect(screen.getByText(/Test Message/i)).toBeInTheDocument();
    });
});