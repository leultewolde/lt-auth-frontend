"use client";
import React, {Suspense, useState} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, TextField, Stack } from "@mui/material";
import Layout from "../../components/Layout";
import { register } from "@/utils/api";
import {useSnackbar} from "@/app/components/SnackbarContext";

const RegisterContent: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showSnackbar } = useSnackbar();

    const handleRegister = async () => {
        const prefix = searchParams.get("prefix") || "http";
        const host = searchParams.get("host") || "localhost";
        const port = searchParams.get("port") || undefined;
        const resources = searchParams.get("resources") || undefined;

        try {
            const response = await register(firstName, lastName, email, password, phone, {
                prefix,
                host,
                port,
                resources,
            });
            showSnackbar("Register successful. Redirecting...", "success");
            router.push(response.data.redirectUrl);
        } catch (error) {
            console.log(error);
            showSnackbar("Registration failed. Please try again.", "error");
        }
    };

    return (
        <Layout title="Register">
            <Stack spacing={2}>
                <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Phone"
                    name="phone"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" onClick={handleRegister}>
                        Register
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            router.push(`/auth/login?prefix=${searchParams.get("prefix") || "http"}&host=${searchParams.get("host") || "localhost"}${searchParams.get("port") ? `&port=${searchParams.get("port")}` : ""}${searchParams.get("resources") ? `&resources=${searchParams.get("resources")}` : ""}`)
                        }
                    >
                        Go to Login
                    </Button>
                </Stack>
            </Stack>
        </Layout>
    );
};

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterContent />
        </Suspense>
    );
}
