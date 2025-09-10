import React from 'react';

export const metadata = {
    title: 'EDL Procurement',
    description: 'EDl Procurement'
};

export default function SimpleLayout({ children }) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
