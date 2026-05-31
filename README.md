# Angkringan Sedulur — Landing Page

Premium landing page for Angkringan Sedulur, a local food & drink spot in Sipare-pare, Batu Bara, North Sumatra, Indonesia.

## Quick Start

Open `index.html` in a browser. No build step required.

For best experience with CDN assets, serve over a local HTTP server:
```
npx serve .
```
or
```
python -m http.server 8080
```

## Before Launching

Replace all placeholder values marked with HTML comments:

| Placeholder | File(s) | Replace With |
|---|---|---|
| `wa.me/6282365202375` | index.html (4 places) | Real WhatsApp number, e.g. `wa.me/6281234567890` |
| `@angkringansedulur_new` | index.html | Confirmed active Instagram handle |
| Google Maps link | index.html | Actual GPS pin URL |

## Asset Replacement

When real photos are available, place them in `assets/images/` and update the `<img>` `src` attributes in `index.html`. The SVG illustrations in gallery cells and menu cards can be swapped for real photos.

## Tech Stack

- Vanilla HTML / CSS / JavaScript — no framework
- GSAP 3.12 + ScrollTrigger — animations
- Lenis v1 — smooth scroll
- Google Fonts: Cormorant Garamond + Nunito

## Project Structure

```
angkringan-sedulur/
├── index.html
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   └── main.js
├── assets/
│   ├── svg/
│   │   ├── logo.svg
│   │   ├── icons/
│   │   │   ├── clock.svg
│   │   │   ├── pin.svg
│   │   │   ├── whatsapp.svg
│   │   │   ├── instagram.svg
│   │   │   ├── gofood.svg
│   │   │   ├── menu.svg
│   │   │   ├── close.svg
│   │   │   └── arrow-right.svg
│   │   └── illustrations/
│   │       ├── nasi-kucing.svg
│   │       ├── tempe-goreng.svg
│   │       ├── gorengan.svg
│   │       ├── sate-usus.svg
│   │       ├── sate-telur.svg
│   │       ├── sate-ayam.svg
│   │       ├── kopi-tubruk.svg
│   │       ├── wedang-jahe.svg
│   │       ├── es-teh.svg
│   │       ├── scene-night.svg
│   │       ├── scene-food.svg
│   │       ├── scene-drink.svg
│   │       ├── scene-grill.svg
│   │       ├── scene-people.svg
│   │       └── scene-cart.svg
│   └── images/
└── README.md
```
