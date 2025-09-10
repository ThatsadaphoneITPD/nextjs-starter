"use client";

import React, { useRef } from "react";
import AppTopbar from "./AppTopbar";
import AppFooter from "./AppFooter";

export default function Layout({ children }) {
  const topbarRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Topbar */}
      <AppTopbar ref={topbarRef} />

      {/* Main content */}
      <main className="flex-1 px-6 py-6">{children}</main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
