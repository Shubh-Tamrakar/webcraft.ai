# ⚡ WebCraft AI — AI-Powered Website Builder

<div align="center">

![WebCraft AI](https://img.shields.io/badge/WebCraft-AI-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)

**Describe your vision. Watch it come to life.**

[🌐 Live Demo](https://webcraftai-eight.vercel.app) · [🐛 Report Bug](https://github.com/Shubh-Tamrakar) · [✨ Request Feature](https://github.com/Shubh-Tamrakar)

</div>

---

## 🚀 What is WebCraft AI?

WebCraft AI is a full-stack web application that lets you generate complete, responsive websites just by describing what you want — in plain English. Powered by Google's Gemini AI, it instantly produces production-ready HTML, CSS, and JavaScript code with a live preview editor.

No design skills. No coding required. Just pure innovation.

---

## ✨ Features

- 🤖 **AI Website Generation** — Describe your site, get instant HTML/CSS/JS
- 👁️ **Live Preview** — See your website render in real-time as it's generated
- ✏️ **Monaco Code Editor** — Edit generated code with VS Code-like experience
- 📱 **Responsive by Default** — All generated sites work on any screen size
- 🔐 **User Authentication** — Secure register/login with Passport.js sessions
- 🗄️ **MongoDB Storage** — User data persisted in MongoDB Atlas
- 🌐 **Fullscreen Preview** — View your generated site in fullscreen mode
- 🔄 **Reset & Regenerate** — Clear and start fresh anytime

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Monaco Editor | Code editor |
| Axios | HTTP requests |
| Three.js | 3D particle background |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server framework |
| Passport.js | Authentication |
| express-session | Session management |
| MongoDB + Mongoose | Database |
| connect-mongo | Session store |
| bcryptjs | Password hashing |
| Google Gemini AI | Website generation |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
WebCraft-AI/
├── frontend/                  # React App
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx       # Landing page with 3D background
│   │   │   ├── BuilderPage.jsx    # Main AI builder interface
│   │   │   ├── LoginPage.jsx      # Login form
│   │   │   ├── RegisterPage.jsx   # Register form
│   │   │   └── ProtectedRoute.jsx # Auth guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Global auth state
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json                # Vercel SPA routing fix
│   └── package.json
│
└── backend/                   # Express Server
    ├── config/
    │   └── passport.js            # Passport local strategy
    ├── models/
    │   └── User.js                # MongoDB user schema
    ├── routes/
    │   └── auth.js                # Auth routes
    ├── server.js                  # Main server file
    └── package.json
```

---


## 🌍 Deployment

### Backend → Render
Set these environment variables in Render dashboard:
```
MONGO_URI        = your mongodb atlas uri
SESSION_SECRET   = your secret key
API_KEY          = your gemini api key
CLIENT_URL       = https://your-app.vercel.app
NODE_ENV         = production
```

### Frontend → Vercel
Set this environment variable in Vercel dashboard:
```
VITE_API_URL = https://your-backend.onrender.com
```

---

## 🔐 Authentication Flow

```
User visits /builder
      ↓
ProtectedRoute checks auth
      ↓
Not logged in → redirect to /login
      ↓
Login/Register → Passport.js verifies
      ↓
Session created in MongoDB
      ↓
User redirected to /builder
      ↓
Generate websites freely!
```

---

## 📸 Screenshots

| Landing Page | Builder |
|-------------|---------|
| 3D particle background with hero section | Monaco editor + Live preview side by side |

---


## 👨‍💻 Author

**Shubh Tamrakar**

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/shubh_tamr47477)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubh-tamrakar-3b55282a4/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shubh-Tamrakar)

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ by Shubh Tamrakar

⭐ **Star this repo if you found it helpful!**

</div>
