# Vehicle Marketplace - Second-Hand Vehicle Project

A Vite + React second-hand vehicle marketplace demo for college/project use.

## Run the project

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## What was changed

- Added realistic second-hand vehicle photos to the demo listings.
- Added used-car/used-bike fallback photos for seller-created listings.
- Updated demo listings with more realistic used-vehicle years, kilometres, owners, conditions and prices.
- Added a small `Used vehicle photo` label to make it clear that the photos are representative marketplace images rather than inspection photos of the exact listing.
- Added `imageNote` to the demo vehicle data.

## Photo sources

The demo photos are from Unsplash and are used through their image URLs. Unsplash states that images can be used under the Unsplash License. See https://unsplash.com/terms.

Important: these are representative demo images. For a real marketplace, replace them with the seller's actual vehicle photos before publishing a listing.


## Images
The vehicle listing images are stored locally in `public/vehicles/`, so the marketplace does not depend on external image URLs.
If you previously opened an older copy of the project, close it and open this extracted `vehicle-marketplace-secondhand-local-images` folder in VS Code.

## Run locally (VS Code)

1. Install Node.js (LTS) if it is not already installed.
2. Open this project folder in VS Code.
3. Open Terminal and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

To check a production build, run `npm run build`, then `npm run preview`.

## Important project notes

- This is a front-end demo. Login and registration are simulated in the browser; there is no backend authentication, database, or secure payment flow.
- Favorites, comparisons, listings, and profile data are stored in the browser's local storage, so they are not shared between devices/users.
- `node_modules` is intentionally not included in this cleaned ZIP. Install dependencies with `npm install` on your computer.


## Dependency security and GitHub setup

The package manifest has been updated to use patched dependency lines for Vite, React Router, and affected transitive packages. `overrides` pins patched versions of `braces`, `esbuild`, `postcss-selector-parser`, and `source-map-js`. The old lockfile was removed because it contained the vulnerable dependency resolutions; regenerate a fresh lockfile with the commands below before committing the project.

```bash
npm install
npm audit
npm run build
```

Commit the newly generated `package-lock.json` to GitHub along with `package.json`. Do not use `npm audit fix --force` blindly; it may introduce unrelated breaking changes. If `npm audit` still reports advisories after installation, review the exact package versions and upgrade path rather than claiming the audit is clean.
