import { Github, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const GitHubAuthButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = "http://localhost:4500";
    const isProduction = import.meta.env.VITE_ENV === 'production';

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/auth/status`, { withCredentials: true })
            .then((res) => setIsLoggedIn(res.data.authenticated))
            .catch(() => setIsLoggedIn(false))
            .finally(() => setLoading(false));
    }, []);

    const login = () => {
        window.location.href = `${BACKEND_URL}/auth/github`;
        toast.success("Redirecting to GitHub...");
    };

    const handleLogout = () => {
        toast.success("Logged out successfully!");  
        setTimeout(() => {
            window.location.href = `${BACKEND_URL}/logout`;
        }, 1000);
    };

    return (
        <div className="flex justify-center">
            {loading ? (
                <div className="flex items-center justify-center p-4">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
            ) : isLoggedIn ? (
                <div className="flex gap-2">
                    <Link
                        to={isProduction ? "/dashboard" : "/dashboard"}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-800 text-white rounded-lg shadow hover:shadow-md transition-all"
                    >
                        Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-800 text-white rounded-lg shadow hover:shadow-md transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    onClick={login}
                    className="flex items-center gap-3 px-5 py-2.5 rounded-md hover:text-blue-500 text-lg font-bold bg-gray-200 dark:bg-gray-800 transition-all"
                >
                    <Github className="w-5 h-5" />
                    Continue with GitHub
                </button>
            )}
        </div>
    );
};

export default GitHubAuthButton;