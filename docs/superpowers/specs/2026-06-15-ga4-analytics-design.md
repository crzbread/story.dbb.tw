# GA4 Analytics Design

## Goal

Add Google Analytics 4 tracking to `story.dbb.tw` using measurement ID
`G-6LQD9KD6SJ`.

## Scope

- Load the GA4 Google tag on every public page in production builds.
- Initialize GA4 with measurement ID `G-6LQD9KD6SJ`.
- Use GA4's default automatic collection, including page views and enhanced
  measurement configured in Google Analytics.
- Do not send analytics data from local development.

## Architecture

The Google tag will be rendered from `src/components/BaseHead.astro`. Every HTML
page uses this shared component through `src/layouts/BaseLayout.astro`, so this
provides one centralized integration point without modifying individual pages.

The existing `prod` value from `astro-pure/server` will guard both GA scripts.
Production builds will contain the external `gtag.js` loader and inline
initialization script. Development pages will contain neither script.

## Data Flow

1. A visitor loads a production page.
2. The browser asynchronously loads `gtag.js` from Google Tag Manager.
3. The inline bootstrap initializes `dataLayer` and configures
   `G-6LQD9KD6SJ`.
4. GA4 collects its default events according to the property's settings.

## Privacy And Failure Behavior

The integration does not collect custom user data or define custom events.
Loading is asynchronous, so an unavailable or blocked Google script must not
prevent the site from rendering. Cookie consent management is outside this
change's scope.

## Verification

- Add a source-level test that confirms the shared head contains the expected
  production guard, loader URL, and GA4 initialization.
- Run the repository test suite.
- Run a production build and confirm generated HTML contains
  `G-6LQD9KD6SJ`.
- Confirm the production build succeeds.

