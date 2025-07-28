import { Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        localStorage.setItem("theme", nextTheme);
        setTheme(nextTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-700 text-black dark:text-white transition-colors duration-500"
        >
            {theme === "light" ? (
                <Moon className="w-6 h-6" />
            ) : (
                <Sun className="w-6 h-6" />
            )}
        </button>
    );
};

export default ThemeToggle;
