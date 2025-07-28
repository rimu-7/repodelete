import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RepoList = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/repos`, { withCredentials: true })
      .then((res) => setRepos(res.data))
      .catch(() => toast.error("Failed to fetch repositories"));
  }, []);

  const toggleSelect = (fullName) => {
    setSelected((prev) =>
      prev.includes(fullName)
        ? prev.filter((name) => name !== fullName)
        : [...prev, fullName]
    );
  };

  const deleteSelected = async () => {
    if (!window.confirm("Are you sure you want to delete selected repositories?")) return;

    for (let fullName of selected) {
      const [owner, repo] = fullName.split("/");
      try {
        await axios.delete(`${BACKEND_URL}/api/repos/${owner}/${repo}`, {
          withCredentials: true,
        });
        toast.success(`Deleted ${repo}`);
      } catch {
        toast.error(`Failed to delete ${repo}`);
      }
    }

    setRepos((prev) => prev.filter((r) => !selected.includes(r.full_name)));
    setSelected([]);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Logged out");
        window.location.href = "/";
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {user?.username}</h2>
          <p className="text-gray-500">Here's a list of your GitHub repositories.</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Repositories</h3>
        <button
          onClick={deleteSelected}
          disabled={selected.length === 0}
          className={`px-4 py-2 rounded text-white ${
            selected.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Delete Selected ({selected.length})
        </button>
      </div>

      <div className="space-y-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="p-4 border rounded-md shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(repo.full_name)}
                  onChange={() => toggleSelect(repo.full_name)}
                  className="mt-1"
                />
                <div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {repo.full_name}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    {repo.description || "No description"}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">⭐ {repo.stargazers_count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
