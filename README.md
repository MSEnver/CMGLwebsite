# CMGL Corporate Website

Static, responsive corporate website for Coopers & McGill (CMGL), a diversified business group.

## Pages
- `/` — Group homepage
- `/about/` — About CMGL
- `/engineering/` — Engineering & Infrastructure
- `/ict/` — Information & Communication Technology
- `/trading/` — Trading & International Trade
- `/consultancy/` — Consultancy & Advisory
- `/projects/` — Projects & Capabilities
- `/contact/` — Contact

## Local preview
Serve this folder with any static HTTP server. For example, from the repository root:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Important before production
The contact modal currently prepares an email using the visitor's email application; it does not submit directly to a server. Configure a real form backend and confirm the receiving email before launch. Replace illustrative stock images with approved/licensed project photography. Review all copy, project claims, contact details, privacy notice, and SEO metadata before publishing.

All pages use shared styles and JavaScript from `/assets/`.