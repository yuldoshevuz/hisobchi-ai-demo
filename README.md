# Hisobchi AI (Demo)

A simplified backend and Telegram bot implementation for **Hisobchi.ai**, a fintech product that helps users track income and expenses via REST API and Telegram.

This project was built as a technical assignment. The goal is to demonstrate backend architecture, authentication, Telegram bot integration, tariff-based business logic, and clean code structure.

---

## Tech Stack

Backend:

- NestJS (@nestjs/common v11.0.1)
- PostgreSQL
- Prisma ORM
- JWT authentication (access token only)

Telegram Bot:

- grammY
- Uses session-based state for simplicity

Infrastructure:

- PM2 for process management
- Makefile for common commands

Redis is intentionally NOT used in this demo to keep the implementation minimal and focused.

---

## Repository Structure

```
├── backend/
│ ├── src/
│ ├── prisma/
│ ├── .env.example
│ └── package.json
│
├── bot/
│ ├── src/
│ ├── .env.example
│ └── package.json
│
├── ecosystem.config.json
├── Makefile
└── README.md
```

Backend API and Telegram bot are deployed as separate processes and communicate via HTTP.

---

## Environment Variables

Each project contains its own .env.example file.

Backend (.env):

```
- HTTP_PORT
- DATABASE_URL=postgres://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME
- JWT_SECRET
- JWT_EXPIRES_IN
```

Bot (.env):

```
- BOT_TOKEN
- API_BASE_URL
```

---

## Installation

Install dependencies for both backend and bot:

```bash
make install
```

Build projects:

```bash
make build
```

Start services using PM2:

```bash
make start
```

Stop services:

```bash
make stop
```

Restart services:

```bash
make restart
```

---

## Authentication (API)

Endpoints:

- POST /api/auth/register
- POST /api/auth/login

Authentication uses JWT access tokens only.
Refresh tokens are intentionally omitted.

---

## Telegram Account Linking

Linking flow:

1. User sends /start to the bot
2. Bot asks for API token
3. User sends the token
4. Backend validates token and links:

The API token is used only for linking and is not persisted in the database.

### Important Note (Simplification)

For simplicity, the Telegram bot temporarily stores the API token inside the bot session.

- Tokens are short-lived (JWT expiration)
- When a token expires, the session is cleared
- The user is asked to re-link the account

This approach reduces implementation complexity for the demo.
In a production system, a stateless identification mechanism would be preferred.

---

## Bot to API Communication

After successful linking:

- The bot sends requests to the API
- API token is taken from the bot session
- No tokens are stored in database or external storage

The bot acts as a thin client.
All business logic and validations live in the backend.

---

## Transactions

Create transaction:
POST /api/transaction

Fields:

- amount (must be positive)
- type: income or expense
- category
- description (optional)

Rules:

- amount must always be positive
- transaction direction is defined by type
- negative balance is allowed

---

## Tariff Logic

FREE:

- Maximum 50 transactions per month
- Summary: monthly only
- Limit is enforced using DB transactions to avoid race conditions

PRO:

- No transaction limits
- Summary options:
  - daily
  - weekly
  - monthly
  - custom date range

---

## Summary

Endpoint:
GET /api/transaction/summary

Query parameters:

- from (optional, YYYY-MM-DD)
- to (optional, YYYY-MM-DD)

Behavior:

- FREE users:
  - custom date range is forbidden
  - current month is always used
- PRO users:
  - can request custom ranges
  - defaults to current month if not provided

Response:

- total_income
- total_expense
- balance

All calculations are performed using database-level aggregation.

---

## Telegram Bot Commands

Xarajat qo'shish:
/expense <miqdor> <kategoriya> [izoh]

Daromad qo‘shish:
/income <miqdor> <kategoriya> [izoh]

Hisobotni ko‘rish:
/summary 2026-01-01 2026-01-31 (optional)

Haftalik hisobot:
/week

Bugun uchun hisobot:
/day

Hisobni uzish:
/unlink

---

## Error Handling

- API returns proper HTTP status codes
- Bot maps API errors to user-friendly messages
- Internal errors are not exposed to the user

---

## Known Limitations

- No refresh tokens
- No Redis
- No automated tests (time constraint)
- Simplified security model for demo purposes

---

## Design Decisions

- Telegram bot is a thin client
- Business logic exists only in the backend
- Session-based token storage is used for simplicity
- Architecture favors clarity over over-engineering

---

## Author

Muhammadali Yuldoshev

Backend Developer
