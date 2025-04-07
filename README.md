**St. Louis Men’s Soccer Website**

LIVE WEBSITE EXAMPLE: https://www.example-stlmenssoccer.hec.to/

This project is a modern, responsive website built for a local soccer club using cutting-edge web technologies. It features a dynamic public-facing interface along with secure admin functionality that allows for easy editing and schedule updates.

**Tech Stack Overview**

_Next.js 13 (App Router)_

The website leverages Next.js 13’s App Router for dynamic routing and scalable page structure. Dynamic route segments (e.g. [slug]) are used to create individual pages for schedules and season results, allowing content to be generated dynamically from backend data.

_TypeScript_

TypeScript is used throughout the project, adding static typing and improved developer tooling. This ensures robust, maintainable code—especially when working with dynamic API routes and data fetched from the backend.

_Tailwind CSS_

Tailwind CSS is used for styling the website. Its utility-first approach enables rapid, consistent styling and responsiveness. Custom gradients, responsive layouts, and modern design elements are all implemented using Tailwind classes.

_Framer Motion_

Framer Motion brings smooth, engaging animations to the website. From interactive page transitions to hover effects on navigation links, Framer Motion helps create a delightful user experience.

_File-Based Storage & Node.js API Routes_

For simplicity, schedule and season data are stored in JSON files within the project’s data directory. Node.js’s fs module is used in API routes to read and write this data. This file-based approach allows for straightforward persistent storage without needing a full database solution.

_Admin Functionality_

A key feature of the website is the admin editing interface. Admin users (authenticated via a secure token stored in environment variables) can:

- Log in through a dedicated admin login modal.
- Create new seasons by entering a title and season details.
- Update or delete existing season data directly through a dynamic admin interface.
- View an up-to-date list of seasons, where new seasons are added dynamically.

This setup makes it easy for non-developer administrators to keep the website current without modifying the code.
