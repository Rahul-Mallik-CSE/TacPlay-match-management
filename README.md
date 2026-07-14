# TACPlay Field Owner Dashboard

A modern, production-grade field owner management platform built with Next.js 16, React 19, and TypeScript. Enables field owners to manage arenas, sessions, bookings, earnings, and subscriptions through an intuitive dashboard interface.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui (Radix UI primitives) |
| State Management | Redux Toolkit + RTK Query |
| Internationalization | i18next (EN, DE, FR, ES) |
| Charts | Recharts |
| PDF Generation | @react-pdf/renderer |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tacplay_feildowner

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=<backend-api-url>
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Auth route group (shared layout)
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-pass/
│   │   ├── reset-pass/
│   │   ├── verify-otp/
│   │   └── profile-setup/
│   ├── arena-management/
│   ├── booking-list/
│   ├── earnings/
│   ├── sessions/
│   │   ├── [session-id]/
│   │   └── create-session/
│   ├── settings/
│   └── api/auth/session/         # Next.js API route (session proxy)
│
├── components/                   # Feature-based component architecture
│   ├── ui/                       # Shared UI primitives (shadcn/ui)
│   ├── CommonComponents/         # Cross-feature shared components
│   ├── AuthComponents/           # Authentication feature
│   │   ├── shared/               # Auth-specific shared primitives
│   │   ├── SignIn/
│   │   ├── SignUp/
│   │   ├── ForgotPassword/
│   │   ├── ResetPassword/
│   │   ├── VerifyOtp/
│   │   └── ProfileSetup/
│   ├── DashboardComponents/      # Dashboard feature
│   │   └── shared/
│   ├── ArenaManagementComponents/ # Arena management feature
│   │   └── shared/
│   ├── SessionComponents/        # Sessions feature
│   │   ├── shared/
│   │   ├── CreateSessionComponents/
│   │   └── SessionDetailsComponents/
│   ├── BookingListComponents/    # Bookings feature
│   │   └── shared/
│   ├── EarningComponents/        # Earnings feature
│   │   └── shared/
│   └── SettingsComponents/       # Settings feature
│       └── shared/
│
├── redux/                        # State management
│   ├── api/baseAPI.tsx           # RTK Query base API (auth, interceptors)
│   ├── features/                 # Feature-sliced state modules
│   │   ├── auth/
│   │   ├── arenaManagement/
│   │   ├── dashboard/
│   │   ├── sessions/
│   │   ├── bookingList/
│   │   ├── earnings/
│   │   ├── settings/
│   │   └── subscriptions/
│   ├── store.ts                  # Redux store configuration
│   ├── hooks.ts                  # Typed Redux hooks
│   └── ReduxProvider.tsx         # Client-side provider wrapper
│
├── types/                        # TypeScript type definitions
├── i18n/                         # Internationalization
│   ├── init.ts                   # i18next configuration
│   ├── resources.ts              # Language registry
│   └── locales/                  # Translation files (en, de, fr, es)
├── lib/                          # Utility functions
│   ├── auth.ts                   # Token management, auth helpers
│   ├── utils.ts                  # General utilities (cn, media URL)
│   └── session-cookie.ts        # Server-side session handling
└── hooks/                        # Custom React hooks
```

## Architecture

### Component Architecture

The project follows a **feature-based, small-component architecture** where each feature module contains:

```
FeatureComponents/
├── FeaturePage.tsx              # Main page orchestrator
├── FeatureHeader.tsx            # Page header (title, actions)
├── FeatureTable.tsx             # Data table with pagination
├── FeatureDetailsSheet.tsx      # Side panel for details
├── shared/                      # Feature-scoped shared components
│   ├── InfoRow.tsx
│   ├── StatusBadge.tsx
│   └── FormField.tsx
└── SubComponents/               # Extracted UI sections
    ├── SectionA.tsx
    └── SectionB.tsx
```

**Key principles:**
- **Page files are thin entry points** (~8 lines) that import content components
- **Content components** orchestrate feature logic and compose sub-components
- **Shared primitives** (`InfoRow`, `StatusBadge`, `FormField`) eliminate duplication within features
- **Custom hooks** extract reusable stateful logic (e.g., `useSessionForm`, `useCreateSessionForm`)

### State Management

**Redux Toolkit + RTK Query** handles all server state and client state:

- **`baseAPI.tsx`** — Centralized API layer with automatic JWT token refresh on 401 responses
- **Feature modules** — Each domain (auth, sessions, bookings, etc.) has its own API file (RTK Query endpoints) and slice file (local UI state)
- **Typed hooks** — `useAppDispatch` and `useAppSelector` provide full TypeScript inference

### Authentication Flow

```
Sign Up → OTP Verification → Profile Setup (4-step wizard) → Dashboard
                                                          
Sign In → JWT Access/Refresh Tokens → Stored in localStorage
                                    → Auto-refresh on 401
```

- Access tokens stored in `localStorage` via `auth.ts` helpers
- Refresh tokens enable seamless session persistence
- Automatic token refresh via RTK Query base query interceptor
- Protected routes redirect to `/sign-in` with return path support

### Internationalization

- **4 supported languages:** English, Deutsch, Francais, Espanol
- Language preference persisted in `localStorage`
- Browser language auto-detection with fallback to English
- Single `dashboard` namespace with all translations
- Runtime language switching without page reload

### API Integration

All API calls flow through RTK Query with feature-sliced endpoints:

| Feature | Base Path | Operations |
|---|---|---|
| Auth | `/api/auth/` | Sign up, sign in, OTP, password reset |
| Arena | `/api/arena/` | Arena info, field setup, packages, payout |
| Sessions | `/api/session/` | CRUD, start/cancel match, check-in, results |
| Bookings | `/api/arena/bookings/` | List, details |
| Earnings | `/api/arena/earnings/` | List, details, PDF download |
| Settings | `/api/auth/field-owner/` | Profile, password change |
| Subscriptions | `/api/auth/field-owner/subscription/` | Plans, status, billing, upgrade |

## Features

### Dashboard
- Analytics overview with configurable time ranges (week/month/year)
- Revenue chart, session distribution pie chart, booking bar chart
- Stats cards with trend indicators
- Feature-locked content for Bronze plan users

### Arena Management
- Cover image slider with lightbox viewer
- Arena info, field setup, package management, payout details tabs
- Subscription-aware UI (locked features for lower tiers)

### Sessions
- Session list with status and match type filters
- Create session wizard (teams or manual player mode)
- Session details with player cards, score management
- Start/cancel match, submit results, player check-in

### Bookings
- Booking list with search and pagination
- Booking details sheet (player info, session info, payment info)
- Check-in confirmation dialog

### Earnings
- Earnings list with search and pagination
- Transaction details sheet with PDF download
- Payment method badges and status indicators

### Settings
- Profile display with avatar
- Edit profile dialog (name, contact, profile image)
- Change password dialog with validation

### Onboarding
- 4-step profile setup wizard
- Arena info, business setup, package management, payout setup
- Step progress sidebar with completion indicators

## Component Patterns

### Shared Primitives

| Component | Purpose | Used By |
|---|---|---|
| `InfoRow` | Label/value display row | BookingList, Earnings, Sessions, Settings |
| `StatusBadge` | Colored status indicator | BookingList, Earnings |
| `FormField` | Label + input wrapper | ArenaManagement, Sessions |
| `AuthPasswordField` | Password input with show/hide | SignIn, SignUp, ResetPassword |
| `AuthSubmitButton` | Loading submit button | All auth pages |
| `AuthCard` | Centered card with gradient glow | ForgotPassword, ResetPassword, VerifyOtp |

### Custom Hooks

| Hook | Purpose |
|---|---|
| `useSessionForm` | Edit session form state, validation, submission |
| `useCreateSessionForm` | Create session form state, validation, submission |

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

The application is optimized for deployment on Vercel, Netlify, or any Node.js hosting platform supporting Next.js.

## License

Proprietary — TACPlay
