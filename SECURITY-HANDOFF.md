# Security Handoff

This website is intentionally static: no server code, no database, no cookies, no analytics scripts, and no third-party JavaScript.

## Checks completed

- No secrets, API keys, passwords, or credentials are included.
- No external scripts, fonts, trackers, maps, chat widgets, or CDNs are loaded.
- No customer data is saved by the website.
- The lead form opens a prefilled email and uses encoded mail fields.
- A hidden honeypot field and client-side validation are included for basic spam reduction.
- Security headers are provided in `_headers` for static hosts that support it.
- The Content Security Policy blocks external connections and framing.
- The script does not use `localStorage`, `sessionStorage`, cookies, or fetch requests.

## Required before public launch

- Serve the site only over HTTPS.
- Replace all placeholder contact, address, domain, and business identity details.
- Verify every license, insurance, emergency-service, and review claim with the actual owner.
- If adding analytics, booking, call tracking, chat, maps, or form storage, update the CSP and privacy page.
- If using a form processor, review its data retention, spam protection, access controls, and breach notification policy.
- Limit admin access at the host and registrar with strong passwords and multi-factor authentication.

## Data safety posture

The safest default is that the website does not collect or retain lead data. Once the next owner adds a third-party form, CRM, chat widget, call tracking number, or analytics platform, that provider becomes part of the data handling chain and should be disclosed in the privacy policy.
