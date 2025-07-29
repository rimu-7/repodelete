// === server.js ===
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 4500;
const backend_url = 'https://repodelete.vercel.app';

// Define frontend URL as a constant
const FRONTEND_URL =process.env.FRONTEND_URL|| "http://localhost:5173";

let userTokens = new Map();

// --- Middleware ---
app.use(helmet());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "92b3ebae7a0e98b3f55eb777e02fe1e622b640c5c26d261946430090a2caa754",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
}));

// --- Passport Strategy ---
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${backend_url}/auth/github/callback`,
}, (accessToken, refreshToken, profile, done) => {
  userTokens.set(profile.id, accessToken);
  return done(null, {
    id: profile.id,
    username: profile.username,
    photos: profile.photos,
  });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

//home
app.get("/", (req, res) => {
  res.send("Welcome to the GitHub OAuth App!");
});

// --- Routes ---
app.get("/auth/github", passport.authenticate("github", {
  scope: ["read:user", "repo", "delete_repo"],
}));

app.get("/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${FRONTEND_URL}/login`, // Redirect to login page on failure
  }),
  (req, res) => {
    res.redirect(`${FRONTEND_URL}/dashboard`); // Redirect to dashboard on success
  }
);

app.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/api/repos", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
  const accessToken = userTokens.get(req.user.id);
  try {
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${accessToken}` },
      params: {
        visibility: 'all',  // This will include both public and private repos
        per_page: 100,      // Increase from default 30 to 100
        sort: 'updated',    // Optional: sort by most recently updated
        direction: 'desc'   // Optional: descending order
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch repos", detail: err.message });
  }
});


app.delete("/api/repos/:owner/:repo", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
  const accessToken = userTokens.get(req.user.id);
  const { owner, repo } = req.params;
  try {
    await axios.delete(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `token ${accessToken}` },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete repo", detail: err.message });
  }
});

app.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    userTokens.delete(req.user.id);
  }
  req.logout(() => {
    res.redirect(FRONTEND_URL); // Redirect to frontend home page after logout
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});