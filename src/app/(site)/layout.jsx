import React from 'react';
import Layout from "@/layout/Layout";

export const metadata = {
    title: 'EDL Procurement',
    description: 'EDl Procurement'
};

export default function SimpleLayout({ children }) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}
