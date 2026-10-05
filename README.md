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
