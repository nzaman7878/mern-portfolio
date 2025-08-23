# mern-portfolio
# MERN Developer Portfolio


## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express.js, MongoDB Atlas
- Auth: JWT
- Deployment: Client (Netlify), Server (Render), DB (MongoDB Atlas)


## Project Structure
portfolio-mern/              # Root project folder
│
├── .git/                    # Git repository (after git init)
├── node_modules/            # Root dependencies (if any installed later)
├── package.json             # Root package.json (for scripts)
├── package-lock.json        
├── README.md                # Project documentation (you’ll create)
│
├── client/                  # React (Vite + Tailwind) frontend
│   ├── node_modules/        
│   ├── public/              # Public assets (images, favicon, etc.)
│   ├── src/                 # Source code
│   │   ├── assets/          # Local images, fonts, etc.
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page-level components (Home, About, Projects, etc.)
│   │   ├── App.jsx          # Root React component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Tailwind base styles
│   ├── .eslintrc.json       # ESLint config
│   ├── tailwind.config.js   # Tailwind config
│   ├── postcss.config.js    # PostCSS config
│   ├── package.json         # Client dependencies
│   └── vite.config.js       # Vite config
│
├── server/                  # Express backend
│   ├── node_modules/
│   ├── src/
│   │   ├── config/          # Config (DB connection, env variables)
│   │   ├── middleware/      # Middlewares (auth, error handling, etc.)
│   │   ├── models/          # MongoDB models (User, Project, etc.)
│   │   ├── routes/          # Express routes (auth.js, projects.js)
│   │   ├── controllers/     # Controller logic for routes
│   │   └── index.js         # Entry point for Express server
│   ├── .eslintrc.json       # ESLint config
│   ├── package.json         # Server dependencies
│   └── nodemon.json         # (Optional) nodemon config
│
└── .gitignore               # Ignore node_modules, env files, etc.


## Install dependencies
# Initialize project
mkdir portfolio-mern && cd portfolio-mern
git init

# Create client (React + Vite)
npm create vite@latest client -- --template react
cd client
npm install
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx tailwindcss init -p
cd ..

# Create server (Express)
mkdir server && cd server
npm init -y
npm install express cors helmet express-rate-limit morgan
npm install -D nodemon eslint prettier eslint-config-prettier
cd ..

# Root package.json for scripts
npm init -y

## Development

