import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ExternalLinkIcon,
  StarIcon,
  GitForkIcon,
  Trash2Icon,
  Loader2Icon,
  ArrowUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("User object:", user); // Debug
  }, [user]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/repos`, {
          withCredentials: true,
        });
        setRepos(data);
      } catch (error) {
        toast.error("Failed to fetch repositories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const toggleSelect = (fullName) => {
    setSelected((prev) =>
      prev.includes(fullName)
        ? prev.filter((name) => name !== fullName)
        : [...prev, fullName]
    );
  };

  const deleteSelected = async () => {
    if (
      !window.confirm("Are you sure you want to delete selected repositories?")
    )
      return;

    setIsDeleting(true);
    const deletionPromises = selected.map(async (fullName) => {
      const [owner, repo] = fullName.split("/");
      try {
        await axios.delete(`${BACKEND_URL}/api/repos/${owner}/${repo}`, {
          withCredentials: true,
        });
        toast.success(`Deleted ${repo}`);
        return fullName;
      } catch {
        toast.error(`Failed to delete ${repo}`);
        return null;
      }
    });

    const deletedRepos = await Promise.all(deletionPromises);
    setRepos((prev) => prev.filter((r) => !deletedRepos.includes(r.full_name)));
    setSelected([]);
    setIsDeleting(false);
  };

  const selectAll = () => {
    if (selected.length === repos.length) {
      setSelected([]);
    } else {
      setSelected(repos.map((repo) => repo.full_name));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome, {user?.username || "Guest"}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Your GitHub repositories at a glance
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs border border-gray-100 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {repos.length} repositories
          </div>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
          <button
            onClick={selectAll}
            className="text-sm font-medium w-20 text-blue-600 dark:text-blue-400 hover:underline"
          >
            {selected.length === repos.length ? "Deselect all" : "  Select all"}
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Repositories
        </h2>

        <button
          onClick={deleteSelected}
          disabled={selected.length === 0 || isDeleting}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-white transition-all ${
            selected.length === 0 || isDeleting
              ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isDeleting ? (
            <Loader2Icon className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2Icon className="w-4 h-4" />
          )}
          Delete ({selected.length})
        </button>
      </div>

      {isLoading ? (
        <div className="grid place-items-center py-20 min-h-screen">
          <Loader2Icon className="w-8 h-8 animate-spin text-gray-400" />
          <p className="mt-4 text-gray-500">Loading repositories...</p>
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No repositories found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Connect your GitHub account to see your repositories here.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {repos.map((repo) => (
              <motion.div
                key={repo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -4 }}
                className={`relative border rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 ${
                  selected.includes(repo.full_name)
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <label className="block cursor-pointer">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(repo.full_name)}
                        onChange={() => toggleSelect(repo.full_name)}
                        className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {repo.name}
                          </a>
                          <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {repo.description || "No description provided"}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {repo.language && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {repo.language}
                              </span>
                            )}
                            {repo.license?.name && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                {repo.license.name}
                              </span>
                            )}
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              repo.private
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}
                          >
                            {repo.private ? "Private" : "Public"}
                          </span>

                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <StarIcon className="w-3.5 h-3.5" />
                              {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitForkIcon className="w-3.5 h-3.5" />
                              {repo.forks_count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>

                <div className="absolute top-3 right-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {repos.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 flex gap-2 justify-center items-center rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top <ArrowUp />
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
