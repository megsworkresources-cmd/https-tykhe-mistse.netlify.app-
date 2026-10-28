# Тихе місце — простір підтримки для дітей

A calm, Ukrainian-language wellbeing app for children, with gentle activities and a sunflower garden.

## App location

The Vite app currently lives in `.github/workflows/` for historical reasons. Netlify is configured to use that directory as its build base through the root `netlify.toml`.

## Verify locally

From `.github/workflows/`:

```sh
npm install
npm test
npm run build
```

The GitHub Actions workflow runs the same test and production build checks on pushes and pull requests.

## Sunflower garden

- Without `VITE_CONVEX_URL`, the garden stores the user's flower only in that browser's local storage.
- With `VITE_CONVEX_URL`, the garden uses the Convex functions in `convex/` to show a shared community garden.
- The community query returns only planting timestamps; it does not expose device keys, names, photos, or messages.

To enable the shared garden in production, deploy the Convex functions from `.github/workflows/` using the intended Convex production deployment and set `VITE_CONVEX_URL` in Netlify's environment variables to that deployment's URL. Then trigger a new Netlify deploy. Never commit deploy keys or other secrets to this repository.

## Deployment

Netlify build configuration is in `netlify.toml`. A successful GitHub Actions build verifies tests and bundling, but does not by itself prove that Netlify or Convex production deployment is configured and healthy.
