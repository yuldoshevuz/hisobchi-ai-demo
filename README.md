# 🧮 Hisobchi AI (Demo)

A fully Dockerized backend and Telegram bot implementation for **Hisobchi.ai** —  
a fintech product for tracking income and expenses via REST API and Telegram 🤖💸

This project was built as a **technical assignment**.  
The focus is on clean backend architecture, Telegram bot integration, tariff-based business logic, and a Docker-first workflow.

---

## 🚀 Getting Started (Docker-first)

This project is **100% containerized**.

You **do NOT need** to install:

- Node.js
- npm
- PostgreSQL
- PM2
- any process manager

### ✅ Requirements

- **Docker**
- **Docker Compose (v2)**

That’s it 🙂

---

## 🧱 Tech Stack

### Backend

- NestJS
- PostgreSQL
- Prisma ORM
- JWT authentication (access token only)

### Telegram Bot

- grammY
- Session-based state (simplified linking)

### Infrastructure

- Docker
- Docker Compose
- Multi-stage Dockerfile (DEV & PROD)

> Redis is intentionally **not used** to keep the demo minimal and focused.

---

## 📁 Repository Structure

```
.
├── backend/
├── bot/
├── docker-compose.yaml
├── docker-compose.override.yaml
├── docker-compose.prod.yaml
├── .env.db
├── .example.env.db
├── .dockerignore
├── .gitignore
├── Makefile
└── README.md
```

---

## 🔐 Environment Variables

Each service contains its own `.env.example` file.

### Backend (`backend/.env`)

```env
HTTP_PORT=3000
DATABASE_URL=postgres://postgres:postgres@postgres:5432/hisobchi
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1d
```

### Bot (`bot/.env`)

```env
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
API_BASE_URL=http://backend:3000/api
```

### Database (`.env.db`)

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=hisobchi
```

---

## ▶️ Running the Project (Makefile)

### Development

```bash
make dev
```

### Production

```bash
make prod
```

### Migrations

```bash
make migrate
```

### Logs

```bash
make log
```

### Stop

```bash
make down
```

---

## 🤖 Telegram Bot Commands

```bash
/expense <amount> <category> [description]
```

```bash
/income <amount> <category> [description]
```

```bash
/summary 2026-01-01 2026-01-31
```

```bash
/week
```

```bash
/day
```

```bash
/unlink
```

---

## 👤 Author

**Muhammadali Yuldoshev**  
Backend Developer
