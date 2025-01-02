"use client";

import React, {Suspense, useEffect, useState} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, TextField, Stack } from "@mui/material";
import Layout from "../../components/Layout";
import { login } from "@/utils/api";
import DeviceDetector from "device-detector-js";
import {useSnackbar} from "@/app/components/SnackbarContext";

const LoginContent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [deviceString, setDeviceString] = useState("unknown-unknown-unknown-unknown");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const deviceDetector = new DeviceDetector();
            const userAgent = navigator.userAgent;
            const device = deviceDetector.parse(userAgent);
            setDeviceString(`${device.client?.name || "unknown"}-${device.device?.model || "unknown"}-${device.device?.type || "unknown"}-${device.device?.brand || "unknown"}`);
        }
    }, []);

    const handleLogin = async () => {
        const prefix = searchParams.get("prefix") || "http";
        const host = searchParams.get("host") || "localhost";
        const port = searchParams.get("port") || undefined;
        const resources = searchParams.get("resources") || undefined;

        try {
            const response = await login(email, password, deviceString, { prefix, host, port, resources });
            showSnackbar("Login successful. Redirecting...", "success");
            router.push(response.data.redirectUrl);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
            console.log(errorMessage)
            showSnackbar("Login failed. Please try again.", "error");
        }
    };

    return (
        <Layout title="Login">
            <Stack spacing={2}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            router.push(`/auth/register?prefix=${searchParams.get("prefix") || "http"}&host=${searchParams.get("host") || "localhost"}${searchParams.get("port") ? `&port=${searchParams.get("port")}` : ""}${searchParams.get("resources") ? `&resources=${searchParams.get("resources")}` : ""}`)
                        }
                    >
                        Go to Register
                    </Button>
                </Stack>
            </Stack>
        </Layout>
    );
};

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}