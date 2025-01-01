"use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function transformUrlToObject(url: string): {
    prefix: string;
    host: string;
    port?: number;
    resources?: string;
} {
    const urlPattern = /^(https?):\/\/(.*?)(?::(\d+))?(?:\/(.*))?$/;
    const match = url.match(urlPattern);

    if (!match) {
        throw new Error("Invalid URL format");
    }

    const [, prefix, host, port, resources] = match;

    return {
        prefix,
        host,
        port: port ? parseInt(port, 10) : undefined,
        resources: resources ? resources.replace(/\//g, "~") : undefined,
    };
}

function objectToQueryParams(obj: { [key: string]: any }): string {
    return Object.entries(obj)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

const Home: React.FC = () => {
    const router = useRouter();

    const redirectParams = objectToQueryParams(transformUrlToObject(document.location.href ? document.location.href + "dashboard" : "http://localhost:3000/dashboard"))

    return (
        <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{ height: "100vh", textAlign: "center" }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to LT Auth
            </Typography>
            <Typography variant="body1">
                Please log in or register to continue.
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/auth/login?${redirectParams}`)}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => router.push(`/auth/register?${redirectParams}`)}
                >
                    Register
                </Button>
            </Stack>
        </Stack>
    );
};

export default Home;
