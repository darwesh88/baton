---
name: file-uploads
description: >-
  File upload patterns — storage strategy, direct uploads, presigned URLs,
  image optimization, and validation. Load at Session 2-4 when the project
  needs file uploads (avatars, images, documents). Use when implementing
  any file upload feature.
---

# File Uploads Skill

> Files are the messiest feature. Validate early, store smart, serve fast.

---

## Choose Storage (Session 1-2)

| Storage | Best For | Pricing |
|---------|----------|---------|
| **Supabase Storage** | Already using Supabase | 1GB free, then $0.021/GB |
| **Vercel Blob** | Simple, Next.js apps | 100MB free |
| **AWS S3** | Full control, large scale | Pay per GB |
| **Cloudflare R2** | S3-compatible, no egress fees | 10GB free |

**Default:** Use whatever your stack already includes. Supabase project? Use Supabase Storage. Don't add a new service just for files.

---

## Upload Flow (Session 2-3)

### Direct Upload (Recommended)

```
Browser → Presigned URL from server → Upload directly to storage → Save URL in database
```

**Why direct:** Files don't pass through your server. Faster, cheaper, no server memory issues.

### Server Upload (Simple but Limited)

```
Browser → Server → Storage → Save URL in database
```

**When to use:** Small files only (<5MB), when presigned URLs are overkill.

### Presigned URL Pattern

```typescript
// 1. Client requests upload URL
// POST /api/upload/request
'use server'
export async function getUploadUrl(filename: string, contentType: string) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error('Not authenticated');

  // Validate before generating URL
  if (!ALLOWED_TYPES.includes(contentType)) {
    throw new Error('Invalid file type');
  }

  const path = `${user.id}/${Date.now()}-${filename}`;
  const { data, error } = await supabase.storage
    .from('uploads')
    .createSignedUploadUrl(path);

  return { uploadUrl: data.signedUrl, path };
}

// 2. Client uploads directly to storage using the URL
// 3. Client sends the path back to save in database
```

---

## Validation (Always)

### Before Upload

```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'File type not allowed';
  }
  if (file.size > MAX_SIZE) {
    return 'File too large (max 10MB)';
  }
  return null; // valid
}
```

### What to Validate

| Check | Why |
|-------|-----|
| File type (MIME) | Prevent executable uploads |
| File size | Prevent storage abuse |
| Filename | Sanitize special characters |
| Dimensions (images) | Prevent absurdly large images |

### Never Trust the Client

- Validate on server AND client
- Client validation is for UX (fast feedback)
- Server validation is for security (can't be bypassed)

---

## Image Optimization

### On Upload

- Resize to max dimensions (e.g., 1920px wide for display images)
- Generate thumbnails (200x200 for avatars, 400x300 for cards)
- Convert to WebP (smaller, supported everywhere)

### On Display

```tsx
// Next.js Image handles optimization automatically
import Image from 'next/image';

<Image
  src={imageUrl}
  alt={description}
  width={400}
  height={300}
  className="object-cover"
/>
```

**Rule:** Always use Next.js `<Image>` for user-uploaded images. It handles lazy loading, sizing, and format conversion.

---

## Avatar Upload Pattern

The most common file upload feature:

```typescript
// Upload component
function AvatarUpload({ currentUrl }: { currentUrl?: string }) {
  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) { alert(error); return; }

    // Get presigned URL
    const { uploadUrl, path } = await getUploadUrl(file.name, file.type);

    // Upload directly to storage
    await fetch(uploadUrl, { method: 'PUT', body: file });

    // Save path in database
    await updateAvatar(path);
  }

  return (
    <label>
      <img src={currentUrl || '/default-avatar.png'} />
      <input type="file" accept="image/*" onChange={handleChange} hidden />
    </label>
  );
}
```

---

## Storage Organization

### File Path Convention

```
{user_id}/{purpose}/{timestamp}-{filename}

Examples:
abc123/avatars/1708300800-photo.jpg
abc123/documents/1708300800-contract.pdf
abc123/products/1708300800-hero-image.webp
```

**Rules:**
- Always include user/org ID (for RLS and cleanup)
- Include timestamp (prevents collisions)
- Sanitize filename (remove special characters)

---

## Security

- Never serve user uploads from your main domain (use storage CDN URL)
- Set appropriate bucket policies (public for avatars, private for documents)
- Generate signed URLs for private files (expire in 1 hour)
- Scan for malware if handling sensitive documents (enterprise only)

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Storing files in database (BLOB) | Use object storage |
| No file size limit | Always set MAX_SIZE |
| Accepting any file type | Whitelist allowed MIME types |
| Uploading through server | Use presigned URLs for large files |
| Not handling upload failures | Show error, allow retry |
| No loading indicator | Show progress bar during upload |

---

*Last updated: Baton Protocol v3.1*
