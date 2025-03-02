# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Prisma
Next steps:
1. Set the `DATABASE_URL` in the `.env` file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the `provider` of the `datasource` block in `schema.prisma` to match your database: `postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.`
3. Run `prisma db pull` to turn your database schema into a Prisma schema.
4. Run `prisma generate` to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the `ORM` with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm
Addtionally, you can run the following command to create a migration:
```bash
bun prisma migrate dev --name init
```
```bash
bun prisma db seed
```