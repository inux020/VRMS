**Purpose**: Provide concise, actionable guidance for AI coding agents working in this repo (VRMS).

- **Repo layout (where to look first):** `controllers/` (Express controllers), `models/` (Mongoose models), `routes/` (if present), and the app entry `server.js` or `app.js` in the project root.

- **What I learned from the code:** controller functions are exported like `exports.registerUser = async (req,res) => { ... }`; controllers use `try/catch`, access request body via `req.body`, and return JSON via `res.status(...).json({ message: ... })`. Example: `controllers/userController.js` uses `const User = require("../models/User")` and `await User.findOne({ email })`.

- **Coding patterns to follow (concrete, reproducible):**
  - Use the existing controller export shape: `exports.<actionName> = async (req, res) => { try { ... } catch (err) { return res.status(500).json({ message: 'Server error' }) } }`.
  - Validation is inline in controllers (check required fields from `req.body` and return `res.status(400).json({ message: 'Please fill all fields' })`). Mirror this exact response shape and status codes when adding endpoints to keep consistency.
  - Use model methods directly (e.g., `User.findOne`, `Model.findById`, `Model.create`), and keep business logic thin in controllers — if logic grows, introduce `services/` but only after you find existing examples.

- **Routes and comments:** Many controllers include route and access comments (e.g., `// @route   POST /api/users/register`). Preserve or update these comments when adding new controllers or endpoints — they are treated as canonical route documentation for maintainers.

- **Error / response format:** The project consistently returns JSON objects with a top-level `message` field for errors. Follow this exact key (`message`) for consistency with existing code and front-end expectations.

- **File & naming conventions:**
  - Controllers: `controllers/<resource>Controller.js` (camelCase filename)
  - Models: `models/<ModelName>.js` (PascalCase model file)
  - Export pattern: module-level `exports.<fn>` for controller actions

- **Developer workflow hints (how to verify changes):**
  - Inspect `package.json` (root) for project scripts (`npm start`, `npm test`, etc.) — run using `npm run <script>` after `npm install`.
  - Search for `server.js`, `app.js`, or `index.js` in root to find Express bootstrap and middleware (CORS, bodyParser, DB connect).
  - If Mongoose is used, check the DB connection file (commonly `config/db.js` or inside `server.js`). Expect `process.env` usage for DB URIs; do not hardcode credentials.

- **Integration points & external deps:**
  - Database access is via models (likely Mongoose). Look for `require('mongoose')` or `mongoose.connect` in the repo.
  - Authentication/authorization (if present) will be middleware applied in the Express app — search `middleware/` or `auth` keywords. Mirror existing middleware style when adding protected routes.

- **Where to add tests or follow-up code:**
  - If you add new controllers, create matching unit/integration tests next to them under a `tests/` or `__tests__` folder if the repo already uses one. If no test structure exists, report that back instead of inventing a pattern.

- **What not to change without confirmation:**
  - Do not change route URIs or response shapes unless you also update every caller (clients or other services). Many APIs are implicitly relied on by front-end code.
  - Do not change model names or exported model schema filenames without confirming — other files `require()` them by the existing path.

- **Action checklist for the agent before making edits:**
  1. Search the repo for `controllers/`, `models/`, `server.js`/`app.js`, and `package.json`.
  2. Open the controller(s) related to the change and copy the exact export/response style.
  3. Run `npm install` and the relevant `npm run` script from `package.json` to smoke-test locally (report failures).
  4. If the change touches DB code, scan for `mongoose.connect` and `process.env` usage for configuration.

**If anything here is unclear or you want additional repo-specific rules (tests, linting, CI), tell me which files to inspect (e.g., `package.json`, `server.js`) and I will merge them into these instructions.**
