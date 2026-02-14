---
name: shadcn
description: >-
  shadcn/ui component library patterns — installation, customization,
  form integration, and accessible component usage. Load at Session 1-3
  when using shadcn/ui. Use when building UI components or forms.
---

# shadcn/ui Skill

> Copy-paste components you own. Not a dependency — it's YOUR code.

---

## What shadcn/ui Is

- NOT an npm package you install
- A collection of components you copy into your project
- Built on Radix UI (accessible primitives) + Tailwind CSS
- You own the code — customize freely

---

## Setup (Session 1)

```bash
npx shadcn@latest init
```

This creates:
- `components/ui/` — where components live
- `lib/utils.ts` — the `cn()` helper
- Updates `tailwind.config.ts` with CSS variables

### Adding Components

```bash
# Add individual components as needed
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
```

**Rule:** Only add components you're about to use. Don't add the entire library upfront.

---

## Most Used Components

### Essential (Add Session 1)

| Component | Use For |
|-----------|---------|
| `button` | All clickable actions |
| `input` | Text inputs |
| `label` | Form labels |
| `card` | Content containers |

### Common (Add When Needed)

| Component | Use For |
|-----------|---------|
| `dialog` | Modals, confirmations |
| `dropdown-menu` | Action menus, user menus |
| `table` | Data display |
| `select` | Dropdown selections |
| `textarea` | Multi-line input |
| `badge` | Status indicators |
| `toast` | Notifications |
| `skeleton` | Loading states |
| `avatar` | User images |
| `tabs` | Content sections |

---

## Form Pattern (Session 2-3)

### With react-hook-form + zod

```bash
npx shadcn@latest add form
npm install react-hook-form zod @hookform/resolvers
```

```tsx
'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage,
} from '@/components/ui/form';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

export function CreateForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    // Server action or API call
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
```

---

## Customization

### Changing Colors

Edit `globals.css` CSS variables:

```css
@layer base {
  :root {
    --primary: 222.2 47.4% 11.2%;       /* Dark blue */
    --primary-foreground: 210 40% 98%;
    --destructive: 0 84.2% 60.2%;       /* Red */
  }
}
```

### Changing Border Radius

```css
:root {
  --radius: 0.5rem;  /* Change this one value */
}
```

### Extending a Component

Since you own the code, just edit the file:

```tsx
// components/ui/button.tsx
// Add a new variant
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "...",
        outline: "...",
        // Add your own
        brand: "bg-brand-600 text-white hover:bg-brand-700",
      },
    },
  }
);
```

---

## Layout Patterns

### Page with Sidebar

```tsx
<div className="flex h-screen">
  <aside className="hidden w-64 border-r lg:block">
    <nav className="space-y-1 p-4">{/* Nav items */}</nav>
  </aside>
  <main className="flex-1 overflow-y-auto p-6">
    {children}
  </main>
</div>
```

### Dashboard Header

```tsx
<header className="flex items-center justify-between border-b px-6 py-4">
  <h1 className="text-lg font-semibold">{title}</h1>
  <div className="flex items-center gap-3">
    <Button variant="outline" size="sm">Settings</Button>
    <Avatar />
  </div>
</header>
```

### Data Table with Actions

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="w-[50px]" />
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell><Badge>{item.status}</Badge></TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Best Practices

### Do

- Add components one at a time as you need them
- Use the `Form` component for all forms (handles validation, accessibility)
- Use `toast` for success/error feedback
- Use `skeleton` for loading states
- Keep customizations in CSS variables when possible

### Don't

- Don't add all components at once
- Don't wrap shadcn components in your own wrappers (unnecessary abstraction)
- Don't fight the styling — if you need something very different, build custom
- Don't use `dialog` for simple confirmations (use browser `confirm()` for MVP)

---

*Last updated: Baton Protocol v3.1*
