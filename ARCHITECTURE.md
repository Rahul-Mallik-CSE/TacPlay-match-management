# System Architecture

## Overview

TACPlay Field Owner Dashboard is a single-page application (SPA) built on Next.js 16 App Router with a feature-sliced architecture. The system follows a unidirectional data flow pattern using Redux Toolkit for state management and RTK Query for server state synchronization.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App Router (SSR/CSR Hybrid)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Page Routes  │  │  Components  │  │  Redux Store         │  │
│  │  (thin entry  │→ │  (feature-   │→ │  ┌────────────────┐  │  │
│  │   points)     │  │   based)     │  │  │ RTK Query API  │  │  │
│  └──────────────┘  └──────────────┘  │  │ (server state)  │  │  │
│                                       │  ├────────────────┤  │  │
│                                       │  │ Feature Slices  │  │  │
│                                       │  │ (client state)  │  │  │
│                                       │  └────────────────┘  │  │
│                                       └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                    HTTP/HTTPS (Bearer JWT)                       │
├─────────────────────────────────────────────────────────────────┤
│                     BACKEND API SERVER                           │
└─────────────────────────────────────────────────────────────────┘
```

## High-Level Architecture

### Application Layers

```
┌─────────────────────────────────────────────────┐
│                  Presentation Layer              │
│  ┌─────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Pages   │  │Components│  │  UI Primitives│  │
│  │ (routes) │  │ (feature)│  │  (shadcn/ui)  │  │
│  └────┬─────┘  └────┬─────┘  └───────────────┘  │
│       │              │                            │
├───────┼──────────────┼────────────────────────────┤
│       │     State Management Layer               │
│  ┌────▼──────────────▼────────────────────────┐  │
│  │            Redux Toolkit Store              │  │
│  │  ┌──────────┐  ┌────────────────────────┐  │  │
│  │  │  Slices   │  │     RTK Query API      │  │  │
│  │  │ (UI state)│  │   (server state sync)  │  │  │
│  │  └──────────┘  └───────────┬────────────┘  │  │
│  └────────────────────────────┼───────────────┘  │
├───────────────────────────────┼───────────────────┤
│          Data Layer           │                   │
│  ┌────────────────────────────▼───────────────┐  │
│  │         HTTP Client (fetchBaseQuery)        │  │
│  │  ┌─────────────┐  ┌─────────────────────┐  │  │
│  │  │JWT Auth     │  │  Token Refresh      │  │  │
│  │  │Interceptor  │  │  (401 handling)      │  │  │
│  │  └─────────────┘  └─────────────────────┘  │  │
│  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component Dispatch → RTK Query Mutation → API Call
                                                         ↓
                                                   Response Handling
                                                         ↓
                                              Cache Invalidation/Update
                                                         ↓
                                              Component Re-render (auto)
```

## Module Architecture

### Feature-Sliced Design

Each feature module is self-contained with its own components, state, and API integration:

```
src/redux/features/{feature}/
├── {feature}API.tsx        # RTK Query endpoints (server state)
└── {feature}Slice.tsx      # Redux slice (client/UI state)

src/components/{Feature}Components/
├── {Feature}Page.tsx       # Page orchestrator
├── {Feature}Header.tsx     # Header with title/actions
├── {Feature}Table.tsx      # Data display
├── {Feature}Details*.tsx   # Detail views
├── shared/                 # Feature-scoped primitives
│   ├── InfoRow.tsx
│   ├── StatusBadge.tsx
│   └── FormField.tsx
└── SubComponents/          # Extracted UI sections
```

### Feature Modules

| Module | Scope | API Endpoints | State |
|---|---|---|---|
| `auth` | Authentication, registration, OTP | 9 endpoints | tokens, pending verification |
| `arenaManagement` | Arena CRUD, field setup, packages | 12 endpoints | current arena data |
| `dashboard` | Analytics overview | 1 endpoint | selected range |
| `sessions` | Session CRUD, match management | 10 endpoints | page, limit, filters |
| `bookingList` | Booking list, details | 2 endpoints | page, limit |
| `earnings` | Earnings list, details | 2 endpoints | page, limit |
| `settings` | Profile, password | 3 endpoints | — |
| `subscriptions` | Plans, billing, upgrade | 4 endpoints | — |

## Authentication Architecture

### Token Management

```
┌─────────────────────────────────────────────────────┐
│                  Auth Flow                           │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Sign Up → Verify OTP → Profile Setup → Sign In     │
│                                    ↓                 │
│                    ┌───────────────────────────┐     │
│                    │   JWT Token Pair           │     │
│                    │   ├── Access Token         │     │
│                    │   └── Refresh Token        │     │
│                    └───────────┬───────────────┘     │
│                                ↓                     │
│                    Stored in localStorage             │
│                                ↓                     │
│                    Attached to all API requests       │
│                    via Authorization header           │
│                                ↓                     │
│                    401 Response → Auto Refresh        │
│                                ↓                     │
│                    Refresh Success → Retry Request    │
│                    Refresh Failure → Clear Tokens     │
│                                ↓                     │
│                    Redirect to /sign-in               │
└─────────────────────────────────────────────────────┘
```

### Protected Routes

- Auth pages (`/sign-in`, `/sign-up`, etc.) use `(auth)` route group with shared layout
- Dashboard pages require valid JWT (enforced by API, not client route guards)
- Return path support: `/sign-in?from=/sessions` redirects after login

## Component Architecture

### Hierarchy

```
Layout (app/layout.tsx)
├── ReduxProvider (client-side state)
├── I18nProvider (internationalization)
├── LayoutWrapper (sidebar + navbar)
│   ├── DashboardSidebar
│   ├── NabBar
│   └── {children} ← Page Route
│       └── FeaturePage (thin entry)
│           └── FeatureContent (orchestrator)
│               ├── FeatureHeader
│               ├── FeatureTable/FeatureForm
│               │   └── SubComponents
│               │       └── Shared Primitives
│               └── FeatureDetailsSheet
```

### Component Categories

| Category | Location | Purpose |
|---|---|---|
| **UI Primitives** | `src/components/ui/` | Atomic design elements (Button, Input, Dialog, etc.) |
| **Common** | `src/components/CommonComponents/` | Cross-feature components (Table, Sidebar, Navbar) |
| **Feature** | `src/components/{Feature}Components/` | Domain-specific business components |
| **Shared** | `FeatureComponents/shared/` | Feature-scoped reusable primitives |

### Page Composition Pattern

Every page follows this pattern:

```tsx
// page.tsx (thin entry point — ~8 lines)
"use client";
import FeatureContent from "@/components/FeatureComponents/FeatureContent";

export default function FeaturePage() {
  return <FeatureContent />;
}
```

```tsx
// FeatureContent.tsx (orchestrator — contains feature logic)
"use client";
// imports, state, hooks, handlers
return (
  <div className="...">
    <FeatureHeader />
    <FeatureTable />
    <FeatureDetailsSheet />
  </div>
);
```

## State Management

### Redux Store Structure

```typescript
{
  api: RTKQueryState,           // Server cache
  auth: {                       // Client state
    pendingEmail,
    verificationPurpose,
    user
  },
  dashboard: {
    selectedRange               // "week" | "month" | "year"
  },
  sessions: {
    page, limit, status, matchType
  },
  bookingList: {
    page, limit
  },
  earnings: {
    page, limit
  },
  arenaManagement: {
    arenaField                  // Current arena data
  },
  settings: {},                 // No client state
  subscriptions: {}             // No client state
}
```

### RTK Query Cache Tags

```typescript
tagTypes: [
  "Auth",
  "Arena",
  "Dashboard",
  "Earnings",
  "BookingList",
  "Sessions",
  "Settings",
  "Subscriptions",
]
```

Cache invalidation is automatic — mutations invalidate related tags, causing refetches.

## Internationalization

### Supported Languages

| Code | Language | Flag |
|---|---|---|
| `en` | English | Default |
| `de` | Deutsch | German |
| `fr` | Francais | French |
| `es` | Espanol | Spanish |

### Architecture

```
src/i18n/
├── init.ts              # i18next initialization
├── resources.ts         # Language registry + imports
└── locales/
    ├── en/dashboard.json
    ├── de/dashboard.json
    ├── fr/dashboard.json
    └── es/dashboard.json
```

- Single `dashboard` namespace for all translations
- Language persisted in `localStorage` (`tp-language` key)
- Browser auto-detection with English fallback
- Runtime switching without page reload

## API Layer

### Base URL Configuration

```env
NEXT_PUBLIC_API_BASE_URL=https://api.tacplay.eu
```

### Request/Response Cycle

```
Component calls useGetSomethingQuery(args)
        ↓
RTK Query checks cache
        ↓ (cache miss)
baseQueryWithReauth executes
        ↓
Attaches Bearer token from localStorage
        ↓
Sends HTTP request to API
        ↓ (200 OK)
Response cached + component re-renders
        ↓ (401 Unauthorized)
Attempts token refresh
        ↓ (refresh success)
Retries original request
        ↓ (refresh failure)
Clears tokens, redirects to /sign-in
```

### Error Handling

- **API errors** displayed via `react-toastify` notifications
- **Form validation** errors shown inline or via toast
- **Network errors** handled by RTK Query with retry logic
- **403 responses** trigger upgrade modals for plan-restricted features

## Build System

### Next.js 16 with Turbopack

- **Development:** `next dev` with Turbopack for fast HMR
- **Production:** `next build` with static optimization
- **Rendering:** Client-side rendering (`"use client"`) for all interactive pages
- **Route Groups:** `(auth)` for shared auth layout

### TypeScript Configuration

```json
{
  "strict": true,
  "moduleResolution": "bundler",
  "paths": { "@/*": ["./src/*"] }
}
```

- Path aliases via `@/` prefix
- Strict mode enabled for type safety
- Incremental compilation for fast builds

## Deployment

### Recommended: Vercel

```bash
# Connect repository to Vercel
# Set environment variable:
#   NEXT_PUBLIC_API_BASE_URL = https://api.tacplay.eu
# Deploy automatically on push to main
```

### Self-Hosted

```bash
npm run build
npm start
# Runs on port 3000 by default
```

### Docker (example)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```
