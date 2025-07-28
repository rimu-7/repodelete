const Login = ({ user }) => {
  return (
    <div className="">
      {user ? (
        <a href="/dashboard" className="text-blue-600 hover:underline">
          Go to Dashboard
        </a>
      ) : (
        <a href={`http://localhost:4500/auth/github`}>
          <button className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition">
            Login with GitHub
          </button>
        </a>
      )}
    </div>
  );
};

export default Login;