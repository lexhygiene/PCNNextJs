# Project Guide: Pest Control Noida (PCNNextJs)

This document is a comprehensive guide for AI agents and developers to understand the architecture, data flow, and structure of the **Pest Control Noida** web application.

---

## 1. Project Overview
- **Goal**: A premium, high-performance website for a professional pest control service in Noida/NCR.
- **Tech Stack**: 
  - **Framework**: Next.js 16 (App Router)
  - **Library**: React 19
  - **CMS**: Sanity (Embedded Studio at `/studio`)
  - **Styling**: Tailwind CSS 4 + Lucide Icons
  - **Mail**: Nodemailer via SMTP

---

## 2. Directory Structure

### `src/app` (Next.js Routing)
- **`(main)`**: Core user-facing pages (`about`, `articles`, `contact`, `pest-library`, `service-areas`).
- **`(marketing)`**: High-conversion landing pages (e.g., `termite-control-service-noida`) with isolated layouts.
- **`api`**: Endpoint logic for email/reCAPTCHA.
- **`studio`**: Embedded Sanity Studio.

### `src/components` (UI System)
- **`MagazineSection.tsx`**: Dynamic blog article display engine.
- **`QuoteForm.tsx`**: Lead generation with verification.
- **`WhatsAppBubble.tsx` / `StickyCTA.tsx`**: High-conversion floating elements for mobile.
- **`FloatingReviewBadge.tsx`**: Social proof integration.

### `scripts` (Maintenance)
- **`import-pests.js`**: Script to seed the Sanity database from `pests.csv`.
- **`import-service-areas.js`**: Script to seed Sanity locations from `service-areas.csv`.
- **`migrate-seo-titles.js`**: Utility for bulk updating SEO metadata in Sanity documents.

### `src/lib` (Core Utilities)
- **`analytics.ts`**: Centralized event tracking for GA4/GTM.

---

## 3. Key Technical Workflows

### Data Fetching & Caching (ISR)
The project uses **Incremental Static Regeneration (ISR)** to balance performance and freshness.
- Most pages use `export const revalidate = 60;` (1 minute).
- This ensures data from Sanity is cached but updates automatically without a full Netlify deploy.

### Lead Generation & Analytics
1. **Submission**: `QuoteForm` handles lead capture.
2. **Verification**: `/api/send-email` verify reCAPTCHA and triggers Mailer.
3. **Event Tracking**: Every key CTA (Call, WhatsApp, Form Submit) is tracked via `src/lib/analytics.ts` using specific event names (e.g., `click_call`, `click_whatsapp`) found in `docs/ANALYTICS_GUIDE.md`.

## 4. Automation & Maintenance

### n8n Integration
- **Blog Publishing**: Receive article data from n8n into Sanity.
- **Details**: See `docs/n8n_guide.md`.

### Data Seeding
- The application uses local CSV files (`pests.csv`, `service-areas.csv`) as sources of truth for initial Sanity imports via the provided scripts.

### Image Strategy
- **Internal**: Standard Sanity image uploads.
- **External**: Optimized support for Cloudinary URLs via `mainImageExternalUrl` field in the `post` schema.

---

## 5. Development Guidelines
- **Branding**: Colors are defined in `tailwind.config.ts` (Primary: `eco-green`, Secondary: `gold`).
- **SEO**: Every page should utilize `metadata` exports and proper semantic HTML (`<h1>` hierarchy).
- **Performance**: Use `next/image` for all visual assets to ensure high Lighthouse scores.

---

## 6. Project History & Decisions
- **Migration**: Content migrated from a Google Sheets/Manual setup to Sanity.
- **Design**: Focused on "Premium Trust" with glassmorphism and smooth transitions.
- **Credit Optimization**: Minimal Netlify rebuilds by utilizing high-frequency revalidation/ISR.

---

> [!TIP]
> When working on this project, always check `src/sanity/lib/queries.ts` first when modifying data fetching, as it contains the source of truth for all GROQ queries.
