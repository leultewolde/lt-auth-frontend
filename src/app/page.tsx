"use client";

import React, {Suspense, useEffect} from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

console.log(process.env.NODE_ENV);
console.log(process.env.NEXT_PUBLIC_API_URL);

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

const HomeContent: React.FC = () => {
    const router = useRouter();

    const [redirectParams, setRedirectParams] = React.useState("");

    useEffect(() => {
        const params = objectToQueryParams(
            transformUrlToObject(window.location.href + "dashboard")
        );
        setRedirectParams(params);
    }, []);

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

export default function HomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeContent />
        </Suspense>
    );
}
