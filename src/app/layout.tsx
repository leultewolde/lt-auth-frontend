"use client";

import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import "./globals.css";
import React from "react";
import {SnackbarProvider} from "@/app/components/SnackbarContext";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
    },
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <SnackbarProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </SnackbarProvider>
        </body>
        </html>
    );
}