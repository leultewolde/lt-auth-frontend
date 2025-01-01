"use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const router = useRouter();

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
                    onClick={() => router.push("/auth/login?prefix=http&host=localhost&port=3000&resources=dashboard")}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => router.push("/auth/register?prefix=http&host=localhost&port=3000&resources=dashboard")}
                >
                    Register
                </Button>
            </Stack>
        </Stack>
    );
};

export default Home;
