# Source Code Structure

```text
AI Adventure Academy/
|-- backend/
|   |-- api/
|   |-- netlify/functions/
|   |-- src/
|   |   |-- data/
|   |   |-- db/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- app.ts
|   |   `-- server.ts
|   `-- package.json
|-- docs/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- hooks/
|   |   |-- lib/
|   |   `-- pages/
|   `-- package.json
|-- .gitignore
|-- package.json
`-- README.md
```

## Backend Responsibilities

- `routes/`: REST endpoints
- `services/`: game logic, player updates, admin analytics
- `db/`: SQLite initialization และ seed
- `data/`: mission content

## Frontend Responsibilities

- `components/`: UI building blocks
- `pages/`: page-level screens
- `hooks/`: state orchestration
- `lib/`: API client และ localStorage helpers
