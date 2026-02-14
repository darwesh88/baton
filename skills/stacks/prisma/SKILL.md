---
name: prisma
description: >-
  Prisma ORM patterns — schema design, migrations, type-safe queries,
  relations, and seeding. Load at Session 1-2 when using Prisma as the
  database ORM. Use when designing schemas, writing queries, or running
  migrations.
---

# Prisma Skill

> Schema-first development. Define your data model, Prisma handles the rest.

---

## Setup (Session 1)

```bash
npm install prisma @prisma/client
npx prisma init
```

This creates:
- `prisma/schema.prisma` — your data model
- `.env` — database connection string

### Database URL

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

---

## Schema Design

### Basic Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
```

### Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Models | PascalCase, singular | `User`, `OrderItem` |
| Fields | camelCase | `firstName`, `createdAt` |
| Relations | camelCase, descriptive | `author`, `orderItems` |
| Enums | PascalCase | `Role`, `OrderStatus` |

### Enums

```prisma
enum Role {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## Migrations

### Create a Migration

```bash
npx prisma migrate dev --name add_users_table
```

This:
1. Generates SQL migration file
2. Applies it to your dev database
3. Regenerates Prisma Client types

### Migration Workflow

```
1. Edit schema.prisma
2. Run prisma migrate dev
3. Check generated SQL
4. Commit migration file
5. Build features
```

### Production Migrations

```bash
npx prisma migrate deploy
```

**Rule:** Never run `migrate dev` in production. Always use `migrate deploy`.

---

## Prisma Client (Queries)

### Setup

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

**Why the global pattern:** Prevents creating multiple Prisma Client instances during hot reload in development.

### Common Queries

```typescript
// Find many with filter
const posts = await prisma.post.findMany({
  where: { published: true, authorId: userId },
  orderBy: { createdAt: 'desc' },
  take: 20,
});

// Find one
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// Find one or throw
const user = await prisma.user.findUniqueOrThrow({
  where: { id: userId },
});

// Create
const post = await prisma.post.create({
  data: {
    title: 'Hello',
    authorId: userId,
  },
});

// Update
const post = await prisma.post.update({
  where: { id: postId },
  data: { published: true },
});

// Delete
await prisma.post.delete({
  where: { id: postId },
});
```

### Include Relations

```typescript
// Get user with their posts
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { posts: true },
});

// Selective include
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    },
  },
});
```

### Select Specific Fields

```typescript
// Only get what you need
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});
```

---

## Transactions

```typescript
// When multiple operations must succeed together
const [order, updatedInventory] = await prisma.$transaction([
  prisma.order.create({ data: orderData }),
  prisma.product.update({
    where: { id: productId },
    data: { inventory: { decrement: quantity } },
  }),
]);
```

---

## Seeding

```typescript
// prisma/seed.ts
import { prisma } from '../lib/db';

async function main() {
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      posts: {
        create: [
          { title: 'First Post', published: true },
          { title: 'Draft Post' },
        ],
      },
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```bash
npx prisma db seed
```

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Not using the global pattern | Multiple clients = connection pool issues |
| Fetching all fields when you need 2 | Use `select` |
| N+1 queries (looping with queries) | Use `include` or `select` with relations |
| Running `migrate dev` in production | Use `migrate deploy` |
| Not committing migration files | Always commit `prisma/migrations/` |
| Editing generated migration SQL | Create a new migration instead |

---

*Last updated: Baton Protocol v3.1*
