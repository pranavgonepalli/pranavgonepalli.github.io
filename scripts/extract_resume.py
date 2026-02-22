#!/usr/bin/env python3
"""
Extract structured data from a resume PDF and save as JSON.

Usage:
    pip install pdfplumber
    python scripts/extract_resume.py [path/to/resume.pdf] [output/path.json]

Defaults:
    PDF:    Pranav_Resume_Updated.pdf  (repo root)
    Output: data/resume.json
"""

import json
import re
import sys
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print("Error: pdfplumber is required. Install it with:\n  pip install pdfplumber")
    sys.exit(1)


def extract_text(pdf_path: str) -> str:
    """Extract raw text from all pages of a PDF."""
    with pdfplumber.open(pdf_path) as pdf:
        pages = [page.extract_text() or "" for page in pdf.pages]
    return "\n".join(pages)


def find_section(text: str, header: str, next_headers: list[str]) -> str:
    """Extract text between a section header and the next section header."""
    pattern = rf"{re.escape(header)}\s*\n(.*?)(?={'|'.join(re.escape(h) for h in next_headers)}|\Z)"
    match = re.search(pattern, text, re.DOTALL)
    return match.group(1).strip() if match else ""


def parse_resume(text: str) -> dict:
    """
    Parse extracted resume text into a structured dict.

    NOTE: This parser uses heuristics and may need adjustments if the
    resume format changes significantly. Always review the output JSON
    and correct any parsing errors manually.
    """
    data = {
        "name": "",
        "title": "Software Engineer",
        "headline": "",
        "phone": "",
        "email": "",
        "linkedin": "",
        "github": "",
        "resumePdf": "Pranav_Resume_Updated.pdf",
        "profileImage": "images/profile_pic.auto",
        "about": "",
        "experience": [],
        "projects": [],
        "education": [],
        "certifications": [],
        "skills": {},
        "competitions": [],
    }

    lines = text.strip().split("\n")

    # Name is typically the first line
    if lines:
        data["name"] = lines[0].strip()

    # Extract contact info with regex
    email_match = re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", text)
    if email_match:
        data["email"] = email_match.group()

    phone_match = re.search(r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", text)
    if phone_match:
        data["phone"] = phone_match.group()

    linkedin_match = re.search(r"linkedin\.com/in/[\w-]+", text)
    if linkedin_match:
        data["linkedin"] = "https://" + linkedin_match.group()

    github_match = re.search(r"github\.com/[\w-]+", text)
    if github_match:
        data["github"] = "https://" + github_match.group()

    print(f"Extracted name: {data['name']}")
    print(f"Extracted email: {data['email']}")
    print(f"Extracted phone: {data['phone']}")
    print(f"Extracted LinkedIn: {data['linkedin']}")
    print(f"Extracted GitHub: {data['github']}")
    print()
    print("NOTE: Sections like experience, projects, education, skills,")
    print("and competitions require manual review. The raw text is printed")
    print("below for reference. Update data/resume.json as needed.")
    print()
    print("--- RAW TEXT ---")
    print(text)
    print("--- END ---")

    return data


def main():
    repo_root = Path(__file__).resolve().parent.parent
    pdf_path = sys.argv[1] if len(sys.argv) > 1 else str(repo_root / "Pranav_Resume_Updated.pdf")
    output_path = sys.argv[2] if len(sys.argv) > 2 else str(repo_root / "data" / "resume.json")

    print(f"Extracting text from: {pdf_path}")
    text = extract_text(pdf_path)

    print(f"Parsing resume...")
    data = parse_resume(text)

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\nBasic data saved to: {output_path}")
    print("Review and complete the JSON manually for full accuracy.")


if __name__ == "__main__":
    main()
