import React from 'react';
import Layout from "@/layout/Layout";

export const metadata = {
    title: 'EDL Meeting Room',
    description: 'EDl Book Meeting Room'
};

export default function SimpleLayout({ children }) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}
