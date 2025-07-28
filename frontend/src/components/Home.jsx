import React, { useEffect, useState } from "react";
import axios from "axios";
import { Github } from "lucide-react";
import { toast } from "react-toastify";
import Logout from "./Dashboard";
import GitHubAuthButton from "./GithubAuthButton";

const features = [
    {
        title: "❓ Why I Built This Tool",
        description:
            "Cleaning up GitHub repositories manually is slow, repetitive, and error-prone. This tool was created to streamline that process — allowing developers to instantly manage and remove clutter with zero hassle.",
    },
    {
        title: "🔐 Secure GitHub OAuth Login",
        description:
            "Authenticate via GitHub OAuth with just one click. We never store your credentials — everything happens securely through GitHub's official flow, ensuring maximum privacy and trust.",
    },
    {
        title: "📂 Real-Time Repository Overview",
        description:
            "Instantly fetch and display all your personal repositories in a beautifully organized, searchable interface — no need to copy-paste repo names or URLs.",
    },
    {
        title: "🗑️ One-Click & Bulk Deletion",
        description:
            "Delete individual repositories or select multiple at once to remove them in bulk — all from one intuitive dashboard. No more digging through GitHub settings.",
    },
    {
        title: "🧠 Smart Filtering (Coming Soon)",
        description:
            "Filter repos by visibility, activity, forks, or stars. Quickly find stale or unused projects that can be safely deleted.",
    },
    {
        title: "⚡ Fast, Lightweight & Fully Responsive",
        description:
            "Experience lightning-fast performance with smooth transitions, minimal load time, and complete mobile responsiveness. Built with Vite + React + Tailwind CSS.",
    },
    {
        title: "💎 Clean UI / UX for Focused Work",
        description:
            "Thoughtfully designed UI with subtle animations and minimal distractions — so you can focus on what matters: managing your GitHub workspace.",
    },
    {
        title: "🛡️ No Data Stored, No Tracking",
        description:
            "Your data stays yours. We do not store, track, or share any personal or repository information. Sessions are temporary and securely managed via encrypted cookies.",
    },
    {
        title: "🚀 Productivity Multiplier",
        description:
            "Reclaim your time. Whether you're cleaning up after a hackathon or decluttering old projects, this tool helps you stay organized and productive — in just minutes.",
    },
];


const Home = () => {


    return (
        <main className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 max-w-6xl mx-auto">
            {/* Hero Section */}
            <section className="text-center max-w-4xl space-y-6">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GitHub Repo Manager
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Securely log in with GitHub, view all your repositories, and manage them
                    with ease — including deleting unwanted repos in bulk or individually.
                </p>

                <GitHubAuthButton/>
            </section>

            {/* Features Section */}
            <section className="mt-20 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map(({ title, description }, idx) => (
                    <div
                        key={idx}
                        className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-200 dark:bg-gray-800 shadow-lg transition hover:shadow-2xl hover:scale-[1.03] duration-300 cursor-default group"
                    >
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {description}
                        </p>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Home;