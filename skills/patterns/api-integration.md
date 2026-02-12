# API Integration Skill

> External APIs fail. Plan for it from line one.

---

## Before Writing Any API Code

1. **Read the official documentation** — don't guess endpoints, auth methods, or model names
2. **Check for SDKs** — official client libraries are always better than raw HTTP calls
3. **Note rate limits** — know your ceiling before you hit it
4. **Check pricing** — free tiers have limits, know what they are

---

## Retry Logic (Implement From the Start)

Every external API call must have retry logic. Don't add it later when things break.

```
Minimum: 3 retry attempts
Strategy: Exponential backoff (1s, 2s, 4s)
Retry on: 429 (rate limit), 500, 502, 503, 504
Don't retry: 400 (bad request), 401 (auth), 403 (forbidden), 404
```

### Pattern

```
try call → if transient error → wait → retry → if still failing → graceful error to user
```

Always log which attempt succeeded. If retries are frequent, something is wrong.

---

## AI/LLM API Specifics

When calling AI model APIs (Gemini, OpenAI, Anthropic, etc.):

### Token Limits
- Set `max_tokens` higher than you think you need
- Shorter prompts = more room for output
- If responses feel cut off, you're hitting the limit

### Check Finish Reasons
```
"stop" → completed normally ✓
"length" → truncated — increase max_tokens
"safety" → content filtered — adjust prompt
"error" → something broke — retry
```

**Always check the finish reason.** Truncated responses without checking = silent bugs.

### Prompt Efficiency
- Shorter, clearer prompts perform better AND cost less
- Put instructions first, data second
- Don't repeat yourself in prompts
- Use structured output (JSON mode) when parsing responses

---

## Error Handling

### What Users Should See

| Situation | Show User |
|-----------|----------|
| API timeout | "Taking longer than usual. Retrying..." |
| Rate limited | "Busy right now. Trying again in a moment..." |
| API down | "Service temporarily unavailable. Please try again." |
| Bad response | "Something went wrong. Please try again." |
| Auth failure | Nothing — this is a bug, log it, alert developer |

**Never show raw API errors to users.** No stack traces, no error codes, no JSON blobs.

### What Developers Should See

Log everything:
- Request timestamp
- Response status code
- Retry attempt number
- Finish reason (for AI APIs)
- Response time

---

## Environment Variables

```
API keys → environment variables, NEVER hardcoded
Model names → environment variables (models change, keys don't)
Base URLs → environment variables (staging vs production)
```

### Pattern
```
GEMINI_API_KEY=xxx
GEMINI_MODEL=gemini-2.5-flash
OPENAI_API_KEY=xxx
OPENAI_MODEL=gpt-4o
```

Make the model name configurable. New models drop constantly.

---

## Rate Limiting Your Own Users

If your app calls an external API per user request:
- Add your own rate limiting (e.g., 10 requests/minute per user)
- Queue requests if needed
- Cache responses when possible (same input = same output)
- Show remaining quota to users if applicable

**Your free API tier is shared across ALL your users.** One heavy user can burn your quota.

---

## Checklist Before Shipping

- [ ] All API keys in environment variables
- [ ] Retry logic on every external call
- [ ] Graceful error messages for users
- [ ] Finish reason checked (AI APIs)
- [ ] Rate limiting on user-facing endpoints
- [ ] Timeouts set (don't wait forever)
- [ ] Logging on failures
- [ ] Tested with API returning errors (not just happy path)

---

*Last updated: Baton Protocol v3.1*
