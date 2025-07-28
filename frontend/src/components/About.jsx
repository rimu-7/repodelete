import { Github } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold mb-8">
        About GitHub Repo Manager
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl">
        This app allows you to securely log in with GitHub OAuth, view your
        repositories, and manage them easily, including deleting repos either
        one-by-one or in bulk.
      </p>

      <div className="p-8 rounded-xl bg-gray-200/30 dark:bg-gray-400/30  w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 ">Source Code & Contributions</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Feel free to explore, fork, or contribute to this project on GitHub.
        </p>

        <a
          href="https://github.com/your-username/github-repo-manager"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-6 py-3  hover:text-blue-500 dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform"
        >
          <Github size={24} />
          <span className="font-semibold text-lg">View on GitHub</span>
        </a>
      </div>

     
    </main>
  );
};

export default About;
