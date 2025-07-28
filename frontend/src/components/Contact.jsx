import { useRef, useState, useEffect } from "react";
import { X, Mail, User, MessageSquare, Send } from "lucide-react";
import { toast } from "react-toastify";

const Contact = ({ onClose }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://personal-node-mailer.vercel.app/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send");

      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error("Error sending message:", err.message);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    className="min-h-screen flex items-center justify-center "
    >
      <div className="relative w-full mx-auto max-w-5xl  overflow-hidden rounded-2xl border bg-gray-300/30 dark:bg-gray-800/30 shadow-lg backdrop-blur-lg">
        

        {/* Header */}
        <div className="px-8 pt-10 pb-2">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Contact Me</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Have a question or want to work together?
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="px-8 pb-8"
          noValidate
        >
          <div className="space-y-5">
            <div className="group relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
                <User size={18} />
              </div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800/30 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900"
              />
            </div>

            <div className="group relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800/30 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900"
              />
            </div>

            <div className="group relative">
              <div className="absolute left-3 top-4 text-gray-400 group-focus-within:text-blue-500">
                <MessageSquare size={18} />
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows="4"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800/30 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-800 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Spinner />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default Contact;