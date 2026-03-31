# BugBoard-26

Sistema di bug tracking con backend Spring Boot, frontend Angular e database PostgreSQL in Docker.

## Prerequisiti

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Java 25](https://jdk.java.net/25/) + Maven
- [Node.js](https://nodejs.org/) (v22+) + npm

---

## Avvio del progetto (Stack Completo in Docker)

Il modo più semplice per avviare il progetto è tramite Docker Compose, che tira su database, backend e frontend in un colpo solo.

```bash
# Dalla root del progetto
docker compose up -d --build
```

- **Frontend**: http://localhost
- **Backend API**: http://localhost/api/...
- **Database**: `localhost:5433` (container `bugboard_postgres`)

Per spegnere tutto:
```bash
docker compose down
```

---

## Struttura del progetto

```
BugBoard-26/
├── docker-compose.yml   # Container PostgreSQL
├── backend/             # Spring Boot (Java 25, Maven)
│   └── src/
└── frontend/            # Angular 21
    └── src/
```

## Stack tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Frontend | Angular 21 + TypeScript |
| Backend | Spring Boot 4 + Java 25 |
| Database | PostgreSQL 16 (Docker) |
| Sicurezza | JWT + Spring Security |
| ORM | Hibernate / JPA |