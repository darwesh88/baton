---
name: database-design
description: >-
  Database design patterns — schema design, normalization, indexes, migrations,
  and query optimization. Load at Session 1-2 when setting up the database.
  Use when designing tables, writing migrations, or optimizing slow queries.
---

# Database Design Skill

> Get the schema right early. Fixing it later means migrating live data.

---

## Schema Design (Session 1)

### Every Table Needs

```sql
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- your columns here
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

- UUID primary keys (not auto-increment — safer for distributed systems)
- `created_at` and `updated_at` on every table
- Auto-update `updated_at` with a trigger

### Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Tables | Plural, snake_case | `order_items` |
| Columns | Singular, snake_case | `first_name` |
| Foreign keys | `{table_singular}_id` | `user_id` |
| Booleans | `is_` or `has_` prefix | `is_active` |
| Timestamps | `_at` suffix | `deleted_at` |
| Money | `_cents` or `_fils` suffix | `price_cents` |

### Data Types

| Use | Type | Why |
|-----|------|-----|
| IDs | UUID | No guessing, safe to expose |
| Short text | TEXT | PostgreSQL treats VARCHAR and TEXT the same |
| Long text | TEXT | Same as above |
| Money | INTEGER (cents) | No floating point errors |
| Booleans | BOOLEAN | Not integers |
| Timestamps | TIMESTAMPTZ | Always with timezone |
| JSON data | JSONB | Queryable, indexed |
| Enums | TEXT with check | More flexible than PostgreSQL ENUM |

```sql
-- Use TEXT with check instead of ENUM
status TEXT NOT NULL DEFAULT 'draft'
  CHECK (status IN ('draft', 'active', 'archived'))
```

---

## Relationships

### One-to-Many (Most Common)

```sql
-- A user has many posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  title TEXT NOT NULL
);
```

### Many-to-Many

```sql
-- Users belong to many organizations
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  role TEXT DEFAULT 'member',
  UNIQUE(user_id, org_id)
);
```

### When to Use JSONB Instead

Use JSONB for:
- Metadata that varies per record
- Settings/preferences
- Data you query rarely

Don't use JSONB for:
- Relationships (use foreign keys)
- Data you filter/sort by frequently
- Core business data

---

## Indexes (Session 2-3)

### Rules

1. **Foreign keys always get an index** — PostgreSQL doesn't auto-index them
2. **Columns you filter by get an index** — WHERE clauses need them
3. **Columns you sort by get an index** — ORDER BY is slow without them
4. **Don't index everything** — each index slows writes

```sql
-- Index foreign keys
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Index commonly filtered columns
CREATE INDEX idx_posts_status ON posts(status);

-- Composite index for common query patterns
CREATE INDEX idx_posts_user_status ON posts(user_id, status);
```

### When to Add

- Session 1-2: Index foreign keys
- Session 5+: Add indexes for slow queries (measure first)
- Don't add indexes "just in case"

---

## Migrations (Session 1+)

### Migration File Naming

```
20260214_001_create_users.sql
20260214_002_create_organizations.sql
20260215_001_add_status_to_users.sql
```

### Safe Migration Rules

**Safe (can run on live database):**
- Adding a table
- Adding a nullable column
- Adding an index (use CONCURRENTLY)
- Adding a column with a default

**Dangerous (plan carefully):**
- Renaming a column (breaks existing queries)
- Changing a column type
- Dropping a column (might break code)
- Dropping a table

**Never in production:**
- `DROP TABLE` without backup
- Changing column type with data in it
- Removing NOT NULL without checking data

### Migration Workflow

```
1. Write migration SQL
2. Test locally (reset database)
3. Ask user to run in production
4. Wait for confirmation
5. Regenerate types (if using TypeScript)
6. THEN build features for new tables
```

**Never build UI for tables that don't exist yet.**

---

## Query Patterns

### Fetching Lists

```sql
-- Always paginate, never SELECT * without LIMIT
SELECT id, name, status, created_at
FROM items
WHERE org_id = $1
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

### Counting

```sql
-- For display ("42 items"), use count
SELECT COUNT(*) FROM items WHERE org_id = $1;

-- For "has any?", use EXISTS (faster)
SELECT EXISTS(SELECT 1 FROM items WHERE org_id = $1);
```

### Soft Deletes

For important data (orders, financial records):

```sql
ALTER TABLE orders ADD COLUMN deleted_at TIMESTAMPTZ;

-- "Delete" = set timestamp
UPDATE orders SET deleted_at = NOW() WHERE id = $1;

-- All queries exclude deleted
SELECT * FROM orders WHERE deleted_at IS NULL;
```

For unimportant data: just delete it.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using FLOAT for money | Use INTEGER (cents) |
| No indexes on foreign keys | Add after creating table |
| Building UI before migration runs | Wait for confirmation |
| Storing arrays as comma-separated strings | Use JSONB or junction table |
| Not testing migration rollback | Always have a rollback plan |
| Huge tables without pagination | Always LIMIT queries |

---

*Last updated: Baton Protocol v3.1*
