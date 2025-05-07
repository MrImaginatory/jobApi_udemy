
# 💼 Job API

Welcome to the **Job API**! 🚀  
A powerful and modular Node.js RESTful API for managing job postings and user authentication, built with Express and MongoDB.

## ✨ Features

- 👤 **User Authentication** (JWT)
- 📝 **CRUD Operations for Jobs**
- 🔑 **Secure Endpoints with Token Middleware**
- 🍪 **Cookie Support**
- 🔒 **Password Hashing with bcrypt**
- 🌱 **Environment Variable Support (dotenv)**
- ⚡ **Async Error Handling**

## 📁 Project Structure

```
├── app.js
├── constants/
├── controllers/
│  ├── auth.controller.js
│  └── job.controller.js
├── database/
│  └── db.js
├── index.js
├── middlewares/
│  └── tokenCheck.middleware.js
├── models/
│  ├── job.models.js
│  └── user.model.js
├── package.json
├── README.md
└── utils/
    └── asyncWrapper.js
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MrImaginatory/jobApi_udemy.git
cd jobApi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory and add your variables:

```dotenv
PORT= 3001
MONGO_URI= 'your_mongodb_connection_string'
MONGO_DB= 'your_mongodb_database_name'
JWT_SECRET= 'your_jwt_secret'
NODE_ENV = 'development'
```

### 4. Run the development server

```bash
npm start
```

## 🛠️ API Endpoints Overview

*(Please refer to the controller files for detailed endpoint logic)*

### Auth

- `POST /auth/signUp` — Register new users
- `POST /auth/login` — Authenticate users and get JWT

### Jobs

- `GET /jobs/getAllJobs` — List all jobs *(protected)*
- `GET /jobs/getJob/:id` — List all jobs *(protected)*
- `POST /jobs/createJob` — Create a new job *(protected)*
- `PATCH /jobs/updateJobs/:id` — Update a job *(protected)*
- `DELETE /jobs/deleteJobs/:id` — Delete a job *(protected)*

## 🏗️ Tech Stack

Here are some suitable emojis for each of the mentioned technologies:

* **Node.js**: 🟢💻
* **Express**: 🚄⚡️
* **MongoDB**: 🟢📊
* **Mongoose**: 🐍🔗
* **JWT (JSON Web Token)**: 🔑🌐
* **Bcryptjs**: 🧮🔒
* **Dotenv**: 🌱🔧
* **Cookie-Parser**: 🍪🔍
* **Helmet**: 🪖🛡️
* **CORS**: 🌍🔗
* **XSS-Clean**: 🧹🛡️
* **Express-rate-Limit**: ⏱️🚦

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Don't hesitate to open a Pull Request or submit an Issue.

## ©️ License

ISC

---

Made with ❤️ by [MrImaginatory](https://github.com/MrImaginatory)
