"use client";

import React, {Suspense} from "react";
import Layout from "../components/Layout";
import {useSearchParams} from "next/navigation";

const DashboardContent: React.FC = () => {
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

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}