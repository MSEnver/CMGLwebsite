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

## Contact form
The shared contact form posts to `/api/contact.php`, which sends enquiries to `info@cmgl-x.com` using PHP's `mail()` function. It validates inputs, includes the visitor's email as `Reply-To`, and uses a basic honeypot and session-based rate limit.

**Before production:** deploy `api/contact.php` alongside the static files on the Namecheap cPanel hosting account, ensure PHP is enabled and the server's mail transport is configured, then submit a real test and confirm delivery to `info@cmgl-x.com`. A successful HTTP response means the server accepted the message for sending; it does not guarantee inbox delivery. If the host's `mail()` transport is disabled or delivery is unreliable, configure authenticated SMTP with a mail library and store credentials outside the public web root. Never put mailbox passwords or SMTP secrets in GitHub or browser JavaScript.

Replace illustrative stock images with approved/licensed project photography. Review all copy, project claims, contact details, privacy notice, and SEO metadata before publishing.

All pages use shared styles and JavaScript from `/assets/`.

## NFC digital business card
- Public profile URL: `https://cmgl-x.com/card/`
- Contact download: `https://cmgl-x.com/card/muhammad-saleem.vcf`
- Program the NFC tag with the profile URL (not the VCF URL), so it opens the mobile-friendly contact page on iPhone and Android.
- The visitor taps **Save Contact to Phone** to import the vCard.
- Deploy both `card/index.html` and `card/muhammad-saleem.vcf` to the matching `public_html/card/` directory. Test the page and vCard download on both iOS and Android before encoding a batch of NFC cards.


### Muhammad Waseem NFC card
- Public profile URL: `https://cmgl-x.com/card/muhammad-waseem/`
- Contact file: `https://cmgl-x.com/card/muhammad-waseem.vcf`
- Upload `card/muhammad-waseem/index.html` to `public_html/card/muhammad-waseem/index.html` and `card/muhammad-waseem.vcf` to `public_html/card/muhammad-waseem.vcf`.
- Encode the NFC tag with the profile URL, then test the page and contact import on iPhone and Android.
