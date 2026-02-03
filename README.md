# project1

A small static site demonstrating a "choose-your-own-adventure" tree diagram.

How it works:
- `index.html` contains a scalable SVG tree where every box links to a page in `pages/`.
- Each `pages/*.html` file is an entry point (a "box") and can contain one or more choice links. Give each choice link a `data-choice` attribute (it's used for tracking) and a `class="btn"` for consistent styling.
- `js/app.js` records the path you take (in `localStorage`) and shows it on ending pages; clicking the index link clears the recorded path.

Quick dev preview:
- From the project root run: `python3 -m http.server` and open `http://localhost:8000` to try it locally.

How to add branches:
1. Add a new `pages/yourbox.html` file.
2. Add a corresponding node/link in `index.html`'s SVG so the tree reflects it.
3. Add choice links (with `data-choice`) to route visitors to the next pages or to endings.

Enjoy building your story tree! ✨