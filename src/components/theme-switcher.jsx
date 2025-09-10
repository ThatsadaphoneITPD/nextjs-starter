"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "@mui/material/Button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex gap-2 items-center">
      {["light", "dark", "system", "blue"].map((t) => (
        <Button
          key={t}
          variant={theme === t ? "contained" : "outlined"} // MUI variant
          color={theme === t ? "primary" : "inherit"} // optional color
          size="small"
          onClick={() => setTheme(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </Button>
      ))}
      <span className="ml-2 text-sm text-gray-500">
        Current: {theme}
      </span>
    </div>
  );
}
