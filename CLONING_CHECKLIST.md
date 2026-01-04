# Cloning Checklist: Lex Hygiene India Units

**Architecture Decision**: Standard Stack (Netlify + Sanity + Next.js).
**Strategy**: Separate Sanity Projects (Cleanest data separation, no risk of content mixing).

Please fill in the details below for the execution phase.

## Site 1: Termite Control Focus
*   **Domain**: `lhitermitecontrol.com`
*   **Site Title**: `[e.g., LHI Termite Control]`
*   **Phone Number**: `[e.g., 8882333782]`
*   **WhatsApp Number**: `[e.g., 8882333782]`
*   **Address**: `[Physical Address for Schema]`
*   **Geo Coordinates**: `[Latitude, Longitude]`
*   **Sanity Project**: New Project. I will need you to create it or authorize me to.
*   **Netlify**: New Site. I will need you to create it or authorize me to.

## Site 2: [Pending Name]
*   **Domain**: `[Enter Domain]`
*   **Site Title**: `[e.g., LHI Pest Control Delhi]`
*   **Phone Number**: `[Enter Phone]`
*   **WhatsApp Number**: `[Enter WhatsApp]`
*   **Address**: `[Physical Address]`
*   **Geo Coordinates**: `[Latitude, Longitude]`
*   **Sanity Project**: New Project.
*   **Netlify**: New Site.

## Technical Access Required
To deploy these, I will need:
1.  **Google Analytics IDs**: Create 2 new GA4 properties and provide the Measurement IDs (`G-XXXXXXXX`).
2.  **Google Ads IDs**: Create 2 new Ads accounts (if applicable) and provide IDs (`AW-XXXXXXXX`).
3.  **Sanity Access**: Access to create new projects or the API tokens for 2 new empty projects.
4.  **Netlify Access**: Access to link the new GitHub repositories to Netlify.

## Content Strategy
*   **Global Schema**: Will be set to `ParentOrganization: Lex Hygiene India` (Same as current site).
*   **Visuals**: Will you use the same green/gold theme? `[Yes/No]`

---
# Detailed Execution Checklists (AI To Follow)

## Branding & Visuals Configuration
| Field | Value |
| :--- | :--- |
| **Primary Color** | `eco-green` (#current) [Change if needed] |
| **Secondary Color** | `gold` (#current) [Change if needed] |
| **Logo Text** | "Pest Control Noida" -> [New Logo Text] |
| **Short Name** | "PCN" -> [New Short Name] |
| **Logo File** | `/public/logo.png` [Provide new path if changed] |

## Contact Information Mapping
This will replace all instances across the site (Header, Footer, Sticky Bar, Contact Page).

| Field | New Value (Site 1) | New Value (Site 2) |
| :--- | :--- | :--- |
| **Display Phone** | [e.g. +91 98765 43210] | [e.g. +91 98765 43210] |
| **Email Address** | [e.g. info@lhitermite.com] | [e.g. info@newdomain.com] |
| **Google Maps Link** | [Enter G-Maps URL] | [Enter G-Maps URL] |

## Execution Plan
1.  [ ] Clone repository to Target Directory.
2.  [ ] Clean up `git` history (fresh start).
3.  [ ] Find & Replace all "Pest Control Noida" -> "New Project Name".
4.  [ ] Find & Replace all Contact Info (Phone, Email).
5.  [ ] Update Color Variables in `tailwind.config.ts` and `globals.css` (if changed).
6.  [ ] Update `manifest.json` and `sitemap.ts`.
7.  [ ] **Verify Eco Mode**: Confirm `revalidate = 86400` (24h cache) is active on key pages.
8.  [ ] **Performance Check**: Run Lighthouse/PageSpeed test to ensure high scores.
9.  [ ] Verify build and deploy.
