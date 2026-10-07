<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ea91c372-5e26-4679-83e5-c95a37da06e6

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Project URLs

Project routing lives in `src/projectRoutes.mjs`. The existing project components and animations are reused:

- `/imaclinic`
- `/los-santos`
- `/el-bon-vermut`
- `/lapara`
- `/ikea`
- `/napoli`
- `/mana`

`npm run build` emits a separate `dist/<slug>/index.html` entry for each URL, plus `404.html`. Publish the **complete dist directory** at the domain root. This supports direct links on static hosts with directory-index support; SPA hosts can alternatively rewrite unknown paths to `/index.html`. These entries are client-rendered, not prerendered project content.

`npm run test:routes` checks route mapping and navigation/history logic with a simulated browser environment. Visual interactions should also be reviewed in the preview before merging.

Recovery snapshot: branch `backup/before-project-urls-20261007`. Routing work: `feature/project-urls`. Main has not been merged or pushed.
