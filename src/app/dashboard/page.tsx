"use client";
import React from "react";
import Layout from "../components/Layout";
import {useSearchParams} from "next/navigation";

const Dashboard: React.FC = () => {
    const searchParams = useSearchParams();

    // Convert query parameters into an object for display
    const params: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return (
        <Layout title="Dashboard">
            <pre>{JSON.stringify(params, null, 2)}</pre>
        </Layout>
    );
};

export default Dashboard;