# ynprysk — Portfolio

A responsive, multi-page portfolio built with plain HTML, CSS, and JavaScript. No install or build step is required. Navigation uses clean directory routes: `/`, `/work/`, `/about/`, and `/contact/`.

Run it from a local static server so directory routes resolve correctly. For example, from this folder run `python -m http.server 8000`, then open `http://localhost:8000`. A static host or VS Code Live Server also works. Opening `index.html` directly with `file://` does not support clean directory routes in every browser.

## Make it yours

- Update the name and introduction in `index.html`.
- Replace the Discord bot concept projects in `work/index.html` and their matching detail copy in `script.js` with your real bots.
- Update your languages and about copy in `about/index.html`.
- Change the contact address and social profile links in `contact/index.html` and the footer links on each page.
- Adjust the color and typography tokens at the top of `style.css`.

The project filters, project detail dialogs, dark theme, mobile navigation, scroll reveals, and `/` quick-navigation shortcut work without a backend.
