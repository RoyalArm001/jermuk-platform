Jermuk Travel — Maintenance Page (GLOBAL Countdown)

WHAT YOU WANT ("same time for everyone"):
✅ Use a FIXED end date/time (UTC) in script.js:
   const END_AT_UTC = "YYYY-MM-DDTHH:mm:ssZ";

All users will see the SAME countdown (from that end time).

IMPORTANT:
- If a user's device clock is wrong, countdown can be wrong.
- For 100% accuracy, enable TIME_ENDPOINT (Cloudflare Worker) that returns server time.

FILES:
- index.html
- style.css
- script.js
- logo.png (placeholder, replace if you want)
- background.mp4 (YOU MUST ADD your own video with this exact filename)

HOW TO USE:
1) Put these files in your Git repo root (or /maintenance folder).
2) Add your own background.mp4.
3) Deploy to Cloudflare Pages and connect your domain.
