# Maktabatus Salam

A full-stack web application for my local club, Maktabatus Salam, designed to manage and present Islamic educational resources, events, notices, blogs, donations, and a library.

### Key Features

- **AI integrated blog**: When a user clicks the Insight button on a blog post, the system generates and displays a concise, AI-powered overview and key takeaways using Gemini.
- **Payment gateway**: Secure donation flow via SSLCommerz with success, fail, and cancel handling, plus server-side verification and redirect URLs configured through environment variables.
- **Email notifier**: Transactional email support (Mailtrap) for notifications and confirmations using Nodemailer.
- **Admin Dashboard**: Separate Admin Dashboard for background handling.

### Tech Stack

- **Frontend**: React (Vite), React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express, PostgreSQL, JWT Auth, Multer, Cloudinary, Nodemailer
- **AI**: Google Generative AI (Gemini 2.5 Flash Lite) for analyzer features
- **Payments**: SSLCommerz

### Monorepo Structure

```
.
├─ backend/           # Express API server
│  ├─ controller/     # Route controllers (blog, book, quran, etc.)
│  ├─ db/             # DB config and SQL scripts
│  ├─ middlewares/    # Common, upload, nodemailer
│  ├─ router/         # Express routers per feature
│  └─ server.js       # App entrypoint
├─ frontend/          # React app (Vite)
│  ├─ src/            # Components, pages, context, utils
│  ├─ public/         # Static assets
│  └─ vite.config.js  # Vite config
└─ README.md          # This file
```

## Full Folder Structure

```
Maktabatus Salam/
├─ backend/
│  ├─ controller/
│  │  ├─ aboutController.js
│  │  ├─ analyzerController.js
│  │  ├─ blogController.js
│  │  ├─ bookController.js
│  │  ├─ committeeController.js
│  │  ├─ dashboardController.js
│  │  ├─ donationController.js
│  │  ├─ eventController.js
│  │  ├─ loginController.js
│  │  ├─ noticeController.js
│  │  ├─ quranController.js
│  │  └─ userController.js
│  ├─ db/
│  │  ├─ config/
│  │  │  ├─ cloudinary.js
│  │  │  └─ dbConfig.js
│  │  └─ db_queries/
│  │     └─ queries.sql
│  ├─ middlewares/
│  │  ├─ common/
│  │  │  ├─ errorHandler.js
│  │  │  └─ verifyToken.js
│  │  ├─ imageUpload/
│  │  │  └─ multer.js
│  │  └─ nodeMailer/
│  │     └─ nodemailer.js
│  ├─ router/
│  │  ├─ aboutRouter.js
│  │  ├─ analyzerRoute.js
│  │  ├─ blogRouter.js
│  │  ├─ bookRouter.js
│  │  ├─ checkRouter.js
│  │  ├─ committeeRouter.js
│  │  ├─ dashboardRouter.js
│  │  ├─ donationRouter.js
│  │  ├─ eventRouter.js
│  │  ├─ loginRouter.js
│  │  ├─ noticeRouter.js
│  │  ├─ quranRouter.js
│  │  └─ userRouter.js
│  ├─ uploads/
│  │  └─ logo.png
│  ├─ package.json
│  ├─ package-lock.json
│  └─ server.js
│
├─ frontend/
│  ├─ dist/
│  │  ├─ assets/
│  │  │  ├─ index-B5CzRO2c.js
│  │  │  └─ index-BTm-ZbVT.css
│  │  ├─ images/
│  │  │  ├─ add-book-icon.png
│  │  │  ├─ add-event-icon.png
│  │  │  ├─ add-notice-icon.png
│  │  │  ├─ add-post-icon-white.png
│  │  │  ├─ add-post-icon.png
│  │  │  └─ logo.png
│  │  └─ index.html
│  ├─ public/
│  │  └─ images/
│  │     ├─ add-book-icon.png
│  │     ├─ add-event-icon.png
│  │     ├─ add-notice-icon.png
│  │     ├─ add-post-icon-white.png
│  │     ├─ add-post-icon.png
│  │     └─ logo.png
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ AddBookModal.jsx
│  │  │  ├─ AddEventModal.jsx
│  │  │  ├─ AdminMenu.jsx
│  │  │  ├─ EditModal.jsx
│  │  │  ├─ EventCard.jsx
│  │  │  ├─ Menu.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ QuranCard.jsx
│  │  │  └─ TextCard.jsx
│  │  ├─ Context/
│  │  │  └─ LoginContext.jsx
│  │  ├─ pages/
│  │  │  ├─ admin/
│  │  │  │  ├─ About.jsx
│  │  │  │  ├─ Blog.jsx
│  │  │  │  ├─ Dashboard.jsx
│  │  │  │  ├─ Donation.jsx
│  │  │  │  ├─ Event.jsx
│  │  │  │  ├─ Library.jsx
│  │  │  │  ├─ Notice.jsx
│  │  │  │  └─ Quran.jsx
│  │  │  └─ user/
│  │  │     ├─ About.jsx
│  │  │     ├─ Donate.jsx
│  │  │     ├─ Event.jsx
│  │  │     ├─ Home.jsx
│  │  │     ├─ Library.jsx
│  │  │     ├─ Login.jsx
│  │  │     └─ Notice.jsx
│  │  ├─ utils/
│  │  │  ├─ CheckLoggedIn.jsx
│  │  │  ├─ ConfirmDialog.jsx
│  │  │  └─ EnglishToBanglaNumberConverter.jsx
│  │  ├─ App.jsx
│  │  ├─ config.jsx
│  │  ├─ main.jsx
│  │  └─ style.css
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ vercel.json
│  └─ vite.config.js
│
└─ README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL database (connection URL)
- Cloudinary account (for image storage)
- Mailtrap (or SMTP creds) for email testing
- SSLCommerz merchant credentials (for donation flow)

## Quick Start (Development)

1. Install dependencies

```
cd backend && npm install
cd ../frontend && npm install
```

2. Configure environment variables

Create a `.env` file in `backend/`:

```
# Server
PORT=5000
NODE_ENV=development

# Database
DB_URI=postgres://USER:PASSWORD@HOST:PORT/DB_NAME

# Auth & Roles
JWT_SECRET=change_me
ROLE1=admin

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
CLOUDINARY_FOLDER_NAME=xxxx

# Mail (Mailtrap or SMTP)
MAILTRAP_USERNAME=xxxx
MAILTRAP_PASSWORD=xxxx

# SSLCommerz (Donations)
DONATION_STORE_ID=xxxx
DONATION_STORE_PASSWORD=xxxx
DONATION_SUCCESS_URL_POST=https://your-frontend-domain/success
DONATION_FAIL_URL_POST=https://your-frontend-domain/fail
DONATION_CANCEL_URL_POST=https://your-frontend-domain/cancel
DONATION_URL_GET=https://your-frontend-domain/donation

# Google Gemini
GEMINI_API_KEY=xxxx
```

Optionally edit the frontend API base in `frontend/src/config.jsx`:

```js
const API_BASE_URL = "http://localhost:5000"; // use this for local dev
export default API_BASE_URL;
```

3. Run the servers

```
# Backend (http://localhost:5000)
cd backend
npm run dev

# Frontend (http://localhost:5173)
cd ../frontend
npm run dev
```

## Production Build

```
# Frontend
cd frontend
npm run build
# Preview locally (optional)
npm run preview

# Backend (ensure NODE_ENV=production)
cd ../backend
npm run start
```

## Key NPM Scripts

- Backend:
  - `npm run dev` – Start Express with nodemon (development)
  - `npm run start` – Start Express (production)
- Frontend:
  - `npm run dev` – Vite dev server
  - `npm run build` – Build for production
  - `npm run preview` – Preview production build
  - `npm run lint` – Lint the code

## API Overview (Backend)

Base URL: `http://localhost:5000`

Public endpoints (representative):

- `GET /quran` – List Quran resources
- `GET /blog` – List blog posts
- `GET /notice` – List notices
- `GET /event` – List events
- `GET /book` – List books

Protected (admin) endpoints use JWT and `verifyToken` with `ROLE1`:

- `POST/PUT/DELETE /about|/blog|/book|/committee|/event|/notice|/quran`
- `GET/POST/DELETE /user`

Auth & Sessions:

- `POST /login` – Obtain JWT cookie/token
- `GET /check` – Check login/session

Donations:

- `POST /donation` – Initiate SSLCommerz transaction
- Callback/redirect URLs are controlled via environment variables

Analyzer (AI):

- `POST /analyzer` – Uses Google Gemini via `@google/generative-ai`

Errors are handled centrally by `middlewares/common/errorHandler.js`.

## Frontend

- Update `frontend/src/config.jsx` to point to your API base URL.
- Pages for users: Home, About, Library, Event, Notice, Donate, Login
- Admin pages: Dashboard, About, Blog, Donation, Event, Library, Notice, Quran, User
- Components include modals for CRUD (books/events), charts (Recharts), and common UI.

## Environment & Security Notes

- Keep `.env` out of version control.
- Use strong `JWT_SECRET` in production.
- Restrict CORS origins in `backend/server.js` to known domains.
- Store images in a dedicated Cloudinary folder set with `CLOUDINARY_FOLDER_NAME`.

## Deployment Tips

- Backend: Render, Railway, or any Node host. Set all env vars.
- Frontend: Vercel/Netlify. Set `API_BASE_URL` to your backend URL.
- Ensure CORS whitelist includes the production frontend domain.

## License

## Acknowledgements

- Google Gemini for analyzer features
- SSLCommerz for payment processing
- Mailtrap for email testing
- Cloudinary for media storage
