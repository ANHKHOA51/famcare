# FamCare - Project Context & Handover

## 🚀 Project Overview

**FamCare** is a smart healthcare management application designed to help families organize medical records, scan prescriptions using AI, and manage medications efficiently.

- **Primary Goal:** Finalizing core functionality, transitioning from mock data to real API-driven logic.
- **Current Branch:** `feature/ui-functional-settings-cabinet-mealplan` (or main, check git branch).

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons.
- **Backend:** Node.js (Express), Prisma ORM.
- **Database:** PostgreSQL (Supabase/Neon recommended for Vercel).
- **AI Integration:** Google Generative AI (Gemini 1.5 Flash) for OCR and meal planning.
- **Authentication:** JWT (JSON Web Tokens) stored in `localStorage` as `aura_token`.

## 📂 Project Structure

- `/src/pages`: Main application views (Scanner, Cabinet, Profile, etc.).
- `/src/components`: Reusable UI components.
- `/server/index.js`: Monolithic backend handling all API routes and AI logic.
- `/prisma/schema.prisma`: Database schema.
- `/src/context/AuthContext.tsx`: Global authentication state.

## ✅ Feature Status (Production Ready)

| Feature | Status | Notes |
|---|---|---|
| **Authentication** | Functional | Login/Signup with password hashing (bcryptjs). |
| **Scanner** | Functional | Uses Gemini 1.5 Flash. Handles blurry images. Memory leaks fixed. |
| **Cabinet** | Functional | Full CRUD. Supports `isShared` toggle for privacy. |
| **Meal Plan** | Functional | AI-generated plans based on medication/diagnosis. Supports tab filtering. |
| **Profile** | Functional | Personal info + Family member management (linking users). |
| **Settings** | Functional | Password change, Theme (Light/Dark), and Notification persistence. |

## ⚠️ Known Demo Areas (UI Only)

- **DashboardPage:** Currently uses mock statistics and Unsplash images.
- **AppointmentsPage:** Full UI mockup but not connected to a backend scheduling system yet.
- **MarketplacePage:** Demo listing of health products.

## 🔧 Critical Fixes & Gotchas (Fixed in Pass 1-3)

1. **CORS:** Configuration in `server/index.js` allows Vercel preview domains and same-origin requests.
2. **Encryption:** Medication names/diagnosis are encrypted using AES-256. `ENCRYPTION_KEY` must be 32 bytes.
3. **Environment Variables:**
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `DATABASE_URL`
   - `ENCRYPTION_KEY` (32 bytes string)
   - `ALLOWED_ORIGINS` (comma-separated URLs)
4. **LocalStorage Guard:** `AuthContext` has a `try/catch` around `JSON.parse` to prevent white-screen crashes if storage is corrupted.
5. **Memory Leak:** `ScannerPage` revokes `Blob` URLs after scan/reset.

## 📝 Instructions for Next Assistant

- **Backend:** If adding routes, use the `authenticateToken` middleware.
- **Frontend:** Follow the `shadcn/ui` pattern and use the `toast` (sonner) for feedback.
- **Database:** Run `npx prisma generate` after schema changes.
- **AI:** Prefer `gemini-3.1-flash-preview` for speed/cost.

---
*Last Updated: 2026-04-22*
