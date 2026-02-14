---
name: ecommerce
description: >-
  E-commerce patterns — product catalog, cart management, checkout flow,
  inventory tracking, and order management. Load at Session 0 when building
  an online store or marketplace. Stays loaded for the entire project lifecycle.
---

# E-Commerce Domain Skill

> E-commerce is not a CRUD app with a checkout button. It's a system where money moves and inventory matters.

---

## Load This Skill When

- User says they're building a store, marketplace, or selling products online
- Project involves product listings, shopping cart, or checkout
- Revenue model is transactional (per purchase, not subscription)

---

## Core Data Model (Session 0-1)

### Minimum Tables

```
products           — What you're selling
product_variants   — Size, color, etc. (optional, add when needed)
orders             — Purchase records
order_items        — Products in each order
customers          — Buyers (may overlap with users)
```

### Product Schema

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,        -- Store in cents, ALWAYS
  compare_at_price_cents INTEGER,      -- Original price for "sale" display
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'draft',         -- draft | active | archived
  inventory_count INTEGER DEFAULT 0,
  images JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Critical rules:**
- Store prices in smallest currency unit (cents, fils, pence)
- Never use floating point for money
- Products have statuses — don't show drafts to customers

---

## Product Display (Session 1-3)

### Product Listing Page

Show:
- Product image (first image, optimized)
- Product name
- Price (formatted with currency)
- "Sale" badge if compare_at_price exists
- "Out of stock" badge if inventory_count = 0

### Product Detail Page

Show:
- Image gallery (swipeable on mobile)
- Name, price, description
- Variant selector (if applicable)
- Add to cart button (disabled if out of stock)
- Quantity selector

**Price display helper:**
```typescript
function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}
```

---

## Cart (Session 2-3)

### Cart Strategy

| Approach | Pros | Cons |
|----------|------|------|
| **localStorage** | Simple, no auth needed | Lost on device switch |
| **Database** | Persists, works cross-device | Needs auth or session ID |
| **Hybrid** | localStorage for guests, DB for logged-in | More complex |

**Default:** localStorage for MVP. Move to database when users ask for saved carts.

### Cart Data Structure

```typescript
interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  priceAtAdd: number;  // Price when added (prices can change)
}
```

### Cart Rules

- Validate inventory before checkout (not just at add-to-cart)
- Show item count in header/nav always
- Let users update quantity or remove items
- Show subtotal, update on every change
- Don't clear cart on page refresh

---

## Checkout (Session 3-5)

### Checkout Flow

```
Cart → Shipping info → Payment → Confirmation
```

Keep it to ONE page if possible. Multi-step checkout kills conversion.

### Use Stripe Checkout

Don't build a custom payment form. Stripe Checkout handles:
- Card input (PCI compliant)
- Apple Pay, Google Pay
- 3D Secure
- Tax calculation
- Receipt emails

```typescript
// Create checkout session
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name },
      unit_amount: item.priceAtAdd,
    },
    quantity: item.quantity,
  })),
  success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${baseUrl}/cart`,
});
```

### After Payment (Webhook)

```
Payment confirmed →
  Create order record →
    Decrement inventory →
      Send confirmation email →
        Clear cart
```

**Critical:** Decrement inventory in the webhook, not at checkout start. Failed payments shouldn't reduce stock.

---

## Order Management (Session 4-6)

### Order Statuses

```
pending → confirmed → processing → shipped → delivered
                   ↘ cancelled
                   ↘ refunded
```

### Order Schema

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  status TEXT DEFAULT 'pending',
  subtotal_cents INTEGER NOT NULL,
  shipping_cents INTEGER DEFAULT 0,
  tax_cents INTEGER DEFAULT 0,
  total_cents INTEGER NOT NULL,
  shipping_address JSONB,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### What Customers Need

- Order confirmation page (immediately after checkout)
- Order history page (list of past orders)
- Order detail page (items, status, tracking)
- Email notifications (confirmation, shipped, delivered)

### What Admin Needs

- Order list with filters (status, date range)
- Order detail with ability to update status
- Basic revenue dashboard (total sales, order count)

---

## Inventory (Session 3-5)

### Simple Inventory Rules

- Track `inventory_count` on each product
- Decrement on confirmed order (webhook)
- Increment on cancellation/refund
- Show "Out of stock" when count = 0
- Show "Low stock" when count < threshold (e.g., 5)

### Don't Over-Build

Skip these until you actually need them:
- Warehouse management
- Multi-location inventory
- Automated reordering
- Batch/lot tracking

---

## Search and Filtering (Session 4-6)

### Minimum Viable Search

- Text search on product name + description
- Filter by category (if categories exist)
- Sort by price (low-high, high-low) and newest

### Don't Build Yet

- Faceted search (wait for 100+ products)
- AI-powered recommendations
- Elasticsearch/Algolia (use database full-text search first)

---

## Session Checkpoints

### Session 3: Storefront Check
- [ ] Products display correctly
- [ ] Cart works (add, remove, update quantity)
- [ ] Price formatting is correct everywhere

### Session 5: Checkout Check
- [ ] Stripe Checkout works (test mode)
- [ ] Webhook creates orders and decrements inventory
- [ ] Order confirmation page shows after payment
- [ ] Cart clears after successful purchase

### Session 8: Pre-Launch Check
- [ ] Real products loaded
- [ ] Stripe in live mode
- [ ] Order notification emails working
- [ ] Admin can view and manage orders
- [ ] Inventory tracking accurate

---

*Last updated: Baton Protocol v3.1*
