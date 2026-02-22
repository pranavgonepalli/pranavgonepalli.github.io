# pranavgonepalli.github.io

Personal portfolio website for Pranav Gonepalli — built with plain HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## Running Locally

No build step required. Open `index.html` in a browser, **or** use a local server to avoid CORS issues when loading `data/resume.json`:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Updating Resume Content

All website content is driven by `data/resume.json`. To update the site:

1. Edit `data/resume.json` directly, or
2. Replace `Pranav_Resume_Updated.pdf` with a new PDF and re-run extraction:

```bash
pip install pdfplumber
python scripts/extract_resume.py
```

The extraction script outputs a basic JSON skeleton with contact info parsed automatically. Review and complete the `experience`, `projects`, `education`, `skills`, and `competitions` sections manually for full accuracy.

## Project Structure

```
├── index.html              # Main HTML shell
├── styles.css              # Design system and responsive styles
├── scripts.js              # Dynamic rendering from JSON + animations
├── data/
│   └── resume.json         # Structured resume data (single source of truth)
├── scripts/
│   └── extract_resume.py   # PDF → JSON extraction utility
├── images/
│   ├── profile_photo.jpg    # Profile photo
│   ├── microstrategy_logo.png
│   └── ibm_logo.webp
└── Pranav_Resume_Updated.pdf
```

## Deployment

This site deploys automatically via GitHub Pages from the `main` branch. Push changes to `main` and the site updates within a few minutes.
