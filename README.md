# Virtual Dog Park
## Project Description
This is a browser-based virtual dog adoption and pet simulator. Users can browse dog breed information, interact with breed cards, adopt a virtual dog, care for it, and watch it grow over days. All interaction runs client-side with HTML, CSS and JavaScript.

## Features
- Three dog breed profile cards with custom SVG illustrations
- Pet counter button on each breed card
- Adoption form with breed selection and name validation (1–20 characters, empty names rejected)
- Care actions: Feed and Play to adjust happiness value
- Next Day function to advance time and trigger growth stage changes
- Start Over button with confirmation prompt to clear all pet progress
- Local browser storage to persist pet state between page refreshes
- Responsive layout that works on narrow screens

## Preview Instructions
This project requires a local web server. Open the project folder in VS Code, install the Live Server extension, then right-click `index.html` and select **Open with Live Server**.
Do NOT open the file directly by double-clicking, as local storage behaviour may be inconsistent.

## Growth & Happiness Rules
- Happiness range: locked between 0 and 100.
- Feed: +10 happiness
- Play: +10 happiness
- Next Day: day count increases by 1, happiness decreases by 10
- Growth stages:
  - Day 1: Puppy
  - Day 2–3: Young Dog
  - Day 4 and onwards: Adult Dog

## Data Storage Note
All pet progress is saved inside your browser’s `localStorage`. This data stays on your device and is **not uploaded to GitHub or any remote server**.

## Manual Testing Checklist
- Three breed entries and three illustrations display.
- A valid name can be adopted and an empty name is rejected.
- Feed and Play work; happiness remains between 0 and 100.
- Growth stages change on the specified days.
- Refresh preserves one dog in the same browser.
- Start Over asks for confirmation and clears saved progress only after Confirm.
- The page remains usable on a narrow screen.

## Illustration Note
All dog illustrations in SVG format are custom project-created vector drawings, not real dog photographs.
