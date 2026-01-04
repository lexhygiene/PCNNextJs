# Google Analytics 4 (GA4) Tracking Guide

This website is configured with **Custom Event Tracking** to help you identify exactly where your leads are coming from (e.g., did they call from the *Header* or the *Sticky Bottom Bar*?).

## 1. What We Are Tracking
We track specific interactions beyond standard page views.

| Event Name | Action | What it Tracks |
| :--- | :--- | :--- |
| `click_call` | User clicks a Phone Number | Calls initiated from the website. |
| `click_whatsapp` | User clicks a WhatsApp button | WhatsApp chats started. |
| `click_email` | User clicks an Email address | Emails composed. |

---

## 2. Lead Sources (Event Labels)
To differentiate *where* the user clicked, we attach a **Label** to every event.

### 📌 Main Website (Global)
These appear on every page of the main site (Home, About, Contact, etc.):
*   **Header Phone**: The phone number in the top navigation bar.
*   **Mobile Menu Phone**: The large call button in the mobile slide-out menu.
*   **Sticky Bar Call**: The phone icon in the floating bottom bar (Mobile).
*   **Sticky Bar WhatsApp**: The WhatsApp icon in the floating bottom bar (Mobile).
*   **Floater Call**: The "Need Help?" floating pill bubbles (Desktop).
*   **Footer Phone**: The phone number in the website footer.
*   **Footer Email**: The email address in the website footer.

### 🏠 Homepage Specifics
*   **Home Bottom CTA**: The large "Call Now" button in the "Ready to reclaim your space?" section at the bottom of the home page.

### 🐜 Termite Landing Page (`/termite-control-service-noida`)
*   **Hero Section**: The main call button at the very top.
*   **Pricing Standard**: "Book on WhatsApp" for the ₹1299 plan.
*   **Pricing Advanced**: "Call to Book" for the ₹3499 plan.
*   **Pricing Premium**: "Book on WhatsApp" for the ₹5999 plan.
*   **Bottom CTA**: The "Give us a call" button below the pricing table.
*   **Reviews Section CTA**: The "Join 390+ Happy Neighbors" button.
*   **Video Section CTA**: The "Get Professional Treatment" button below the videos.

---

## 3. How to Check Data in Google Analytics
1.  **Log in** to your [Google Analytics Account](https://analytics.google.com/).
2.  In the left sidebar, go to **Reports** > **Engagement** > **Events**.
3.  You will see a list of events. Look for `click_call` or `click_whatsapp`.
4.  **Click on the event name** (e.g., click on `click_call`).
5.  This opens a detailed view. Scroll down to find the card titled **"Event label"** (or sometimes just "Label").
6.  **Analyze**: You will see a breakdown like:
    *   `Sticky Bar Call`: 50 users
    *   `Header Phone`: 20 users
    *   `Hero Section`: 15 users

**Note**: Data in GA4 can sometimes take 24 hours to appear in standard reports. For real-time testing, use the **Realtime** report in the left sidebar.
