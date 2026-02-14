Jermuk Guide — Sidebar/Menu UI patch (drop-in)
What this contains:
- PageShell layout with left sidebar + topbar (glass/rounded/shadow like your screenshots)
- Sidebar with accordion sections (Hotels/Food & Bars/Sights/Transport)
- Topbar with logo, search box, favorites, language flags
How to apply:
1) Copy these files into your project under the same paths (src/components/layout, src/components/ui, src/components/nav).
2) In src/app.tsx (or your main layout route), wrap routes with <PageShell/> or replace your shell with it.
3) Ensure Tailwind is enabled (this uses Tailwind classes).
Notes:
- You must connect your actual navigation handlers (navigate('/'), navigate('/list/hotels'), etc.) in the TODO markers.
- If you already have a BottomNav, keep it; this patch focuses on desktop/tablet sidebar layout.
