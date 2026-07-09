# FileApps Master Plan

## Working Rules
- This file is the source of truth for roadmap, sprint order, and delivery status.
- Every meaningful implementation pass must update:
  - phase status
  - sprint status
  - shipped items
  - current focus
  - next execution order
- Status labels:
  - `[done]` shipped and verified
  - `[in-progress]` partially shipped or currently being implemented
  - `[planned]` intentionally queued, not started
  - `[blocked]` waiting on a prerequisite or decision

## Product Goal
Build a browser-only file tools suite in the style of 123apps, but with deeper controls, stronger privacy, better content quality, and a more trustworthy publishing surface.

### Non-Negotiables
- all important processing should stay in the browser
- no required upload-processing backend
- advanced controls should be real, not decorative
- SEO copy must match implementation truthfully
- trust, legal, and publishing pages must exist before broad launch
- the platform should scale without turning every tool into a bespoke one-off

## Current Product Snapshot

### Public Surface Shipped
- `[done]` Homepage
- `[done]` Tool index page
- `[done]` Category landing pages for `video`, `audio`, `image`, and `pdf`
- `[done]` Trust and policy pages:
  - `about`
  - `contact`
  - `privacy`
  - `terms`
  - `disclaimer`
  - `eula`
  - `ads-disclosure`
- `[done]` Technical crawl surface:
  - `sitemap.ts`
  - `robots.ts`
  - canonical metadata on key public pages

### Tools Currently Present In The App
#### Video
- `[done]` compress
- `[done]` convert
- `[done]` crop
- `[done]` burn caption
- `[done]` effects
- `[done]` extract audio
- `[done]` gif
- `[done]` merge
- `[done]` mute
- `[done]` reverse
- `[done]` speed
- `[done]` trim

#### Audio
- `[done]` compress
- `[done]` convert
- `[done]` effects
- `[done]` merge
- `[done]` trim

#### Image
- `[done]` batch compress
- `[done]` compress
- `[done]` convert
- `[done]` crop
- `[done]` filters
- `[done]` resize
- `[done]` rotate
- `[done]` watermark

#### PDF
- `[done]` from images
- `[done]` merge
- `[done]` to images

## Current Overall Status
- Core shared platform: `[in-progress]`
- Reliability and processing UX: `[in-progress]`
- Flagship depth for top tools: `[in-progress]`
- Document and image suite expansion: `[in-progress]`
- SEO and trust surface: `[in-progress]`
- Performance and worker architecture: `[in-progress]`
- Long-tail suite expansion: `[planned]`
- Public-launch polish: `[planned]`

---

## Phase 1: Shared Platform Foundation
**Status:** `[in-progress]`
**Goal:** Make new tools cheaper to build and existing tools less bespoke.

### Delivered
- `[done]` shared tool schema in `src/lib/tool-types.ts`
- `[done]` shared validation layer in `src/lib/tool-validation.ts`
- `[done]` shared tool form renderer
- `[done]` shared stateful tool shell flow
- `[done]` shared tool page generator/scaffold direction
- `[done]` engine abstraction for `ffmpeg`, `browser-image`, and `document`
- `[done]` generic processing path validates tool values before work starts

### In Progress
- `[in-progress]` remove bespoke assumptions from older media clients
- `[in-progress]` keep advanced controls aligned with real implementation behavior
- `[in-progress]` standardize page scaffolding across all important tool pages

### Remaining
- `[planned]` normalize more custom clients onto shared job helpers
- `[planned]` reduce duplicated preview, cleanup, and result-summary logic
- `[planned]` expose richer control types only where processing support is truly present

### Exit Criteria
- `[done]` at least one single-file and one multi-file tool use the shared platform
- `[in-progress]` most important tools avoid bespoke state and processing code where shared primitives fit

---

## Phase 2: Reliability And Processing UX
**Status:** `[in-progress]`
**Goal:** Make long-running browser jobs feel dependable and understandable.

### Delivered
- `[done]` clearer staged processing states
- `[done]` cancellation and reset support in the shared UI
- `[done]` warnings for large file sizes and larger batches
- `[done]` improved processing status presentation

### In Progress
- `[in-progress]` move more heavy work into worker/job architecture
- `[in-progress]` expand actionable recovery guidance
- `[in-progress]` improve cleanup of temporary files and object URLs
- `[in-progress]` standardize progress reporting across bespoke FFmpeg tools

### Remaining
- `[planned]` shared queueing for batch and sequential jobs
- `[planned]` ETA estimation where practical
- `[planned]` richer result summaries and comparisons
- `[planned]` device-aware tuning using hardware concurrency and memory signals

### Exit Criteria
- `[in-progress]` every major tool shows useful progress and understandable failure states
- `[done]` users can cancel and retry without refreshing
- `[planned]` long-running heavy jobs no longer feel page-blocking

---

## Phase 3: Flagship Tool Quality
**Status:** `[in-progress]`
**Goal:** Make the most important tools feel strong enough to compete.

### Current Flagship Group
- Video Compress: `[in-progress]`
- Video Convert: `[in-progress]`
- Video Trim: `[in-progress]`
- Image Compress: `[in-progress]`
- Image Convert: `[in-progress]`
- Audio Compress: `[in-progress]`
- Audio Convert: `[in-progress]`
- Audio Trim: `[in-progress]`

### Delivered
- `[done]` video trim has a timeline and preview-thumbnails foundation
- `[done]` audio trim has a waveform/timeline foundation
- `[done]` image compress has comparison-style output UX
- `[done]` video compress has useful preset-driven UX
- `[done]` worker-backed browser-image processing now powers image compress
- `[done]` shared SEO content layer now supports best-settings, privacy, compatibility, limitations, and FAQ blocks on flagship pages

### Remaining By Tool
#### Video Compress
- `[planned]` codec selection
- `[planned]` bitrate mode choice
- `[planned]` FPS control
- `[planned]` richer audio codec and bitrate controls
- `[in-progress]` stronger preset guidance and expected-size guidance

#### Video Convert
- `[planned]` clearer codec vs container controls
- `[planned]` audio passthrough vs transcode choice
- `[planned]` subtitle preservation when practical
- `[planned]` social/export presets
- `[planned]` advanced `faststart` toggle

#### Video Trim
- `[in-progress]` stream-copy vs re-encode guidance
- `[planned]` better cut-accuracy explanation

#### Image Compress
- `[in-progress]` browser-native-first strategy
- `[planned]` explicit lossless vs lossy modes
- `[planned]` metadata preserve/remove choices

#### Image Convert
- `[in-progress]` metadata stripping control
- `[planned]` transparency/background handling
- `[planned]` batch conversion flow

#### Audio Compress / Convert / Trim
- `[in-progress]` codec / sample-rate / channel-depth controls
- `[planned]` normalize and loudness presets
- `[planned]` speech vs music presets

### Exit Criteria
- `[planned]` 8 to 12 top tools feel genuinely polished, not just present
- `[in-progress]` top tools are already deeper than generic low-effort utility sites

---

## Phase 4: Document And Image Breadth
**Status:** `[in-progress]`
**Goal:** Grow beyond simple media conversion without losing the browser-only model.

### Delivered
#### PDF
- `[done]` PDF to images
- `[done]` images to PDF
- `[done]` PDF merge

#### Image Utility
- `[done]` crop
- `[done]` resize
- `[done]` rotate
- `[done]` watermark
- `[done]` filters

### Remaining
#### PDF
- `[planned]` PDF split
- `[planned]` PDF reorder pages
- `[planned]` PDF compress
- `[planned]` extract images from PDF

#### Image
- `[planned]` metadata remover
- `[planned]` thumbnail generator
- `[planned]` blur / redact
- `[planned]` favicon / app icon generator
- `[planned]` social media resizer presets

### Exit Criteria
- `[in-progress]` the app is already more than just convert/compress
- `[planned]` document and utility breadth materially increase searchable surface area

---

## Phase 5: SEO, Trust, And AdSense Readiness
**Status:** `[in-progress]`
**Goal:** Be publishable, crawlable, and trustworthy before scale-out.

### Delivered
- `[done]` sitemap and robots routes
- `[done]` canonical handling on key public pages
- `[done]` canonical host and metadata base are now aligned with the live `www` domain
- `[done]` breadcrumb navigation and breadcrumb schema
- `[done]` shared structured data support for tool and browse pages
- `[done]` category pages upgraded from simple grids to real landing pages
- `[done]` trust and legal page set exists and is linked into the site

### In Progress
- `[in-progress]` Open Graph and Twitter metadata coverage
- `[in-progress]` stronger internal linking between related tools
- `[in-progress]` richer unique copy on top tool pages
- `[in-progress]` richer intent- and comparison-oriented category content
- `[in-progress]` keep workflow UI clean and trustworthy for future monetization

### Remaining
- `[planned]` `ads.txt` once monetization is activated
- `[planned]` conservative ad placement strategy
- `[planned]` more original educational sections on top traffic pages
- `[planned]` search-intent content such as best-settings and format-comparison guides

### Exit Criteria
- `[in-progress]` site is technically crawlable and trust-complete
- `[planned]` top landing pages have enough original content for public launch and AdSense review

---

## Phase 6: Performance And Worker Architecture
**Status:** `[in-progress]`
**Goal:** Push browser-side performance without making the UX fragile.

### Delivered
- `[done]` worker-backed browser-image job foundation
- `[done]` shared FFmpeg single-job runner for custom and generator-based media flows
- `[done]` shared multi-file FFmpeg workspace helpers for merge-style flows
- `[done]` native/browser-first processing is already used for some lighter image and document paths

### In Progress
- `[in-progress]` extend shared FFmpeg job helpers into more bespoke media clients
- `[in-progress]` reduce duplicated FFmpeg lifecycle code
- `[in-progress]` only load heavy engines when a tool truly needs them

### Remaining
- `[planned]` push more heavy FFmpeg work into workers
- `[planned]` adaptive concurrency rules
- `[planned]` better profiling on low-end vs high-end hardware
- `[planned]` fast-path preview generation for thumbnails, frame grabs, and simple transforms
- `[planned]` evaluate WebCodecs where it gives real wins

### Exit Criteria
- `[planned]` heavy work avoids blocking the page
- `[planned]` strong devices get measurable wins
- `[planned]` simple jobs avoid unnecessary FFmpeg overhead

---

## Phase 7: Long-Tail Tool Expansion
**Status:** `[planned]`
**Goal:** Expand breadth after the platform and flagship experiences are strong enough.

### Planned Video Additions
- `[planned]` resize for social
- `[planned]` subtitle convert
- `[planned]` thumbnail generator
- `[planned]` watermark overlay

### Planned Audio Additions
- `[planned]` noise reduction
- `[planned]` silence remover
- `[planned]` volume normalize
- `[planned]` metadata editor
- `[planned]` ringtone maker

### Planned Image Additions
- `[planned]` meme maker
- `[planned]` poster maker
- `[planned]` color palette extractor
- `[planned]` QR utility tools

### Planned Document Additions
- `[planned]` page extractor
- `[planned]` page rotator
- `[planned]` OCR prep tools

### Exit Criteria
- `[planned]` new tools launch on top of shared architecture, not fresh duplication
- `[planned]` SEO growth is supported by real utility and original content

---

## Sprint Tracker

### Sprint 1: Platform Rebuild
**Status:** `[done]`
- `[done]` rebuild tool schema
- `[done]` rebuild tool shell states
- `[done]` add validation and typed error flow

### Sprint 2: Shared Execution Foundations
**Status:** `[in-progress]`
- `[done]` add worker-backed browser-image processing foundation
- `[done]` consolidate FFmpeg execution for generator-based tools and audio compress
- `[in-progress]` continue moving heavy tools toward shared job execution
- `[in-progress]` strengthen processing phases and cleanup behavior

### Sprint 3: Editing UX And Real Multi-File Flows
**Status:** `[in-progress]`
- `[done]` upgrade video trim with timeline foundation
- `[done]` upgrade audio trim with waveform/timeline foundation
- `[done]` upgrade merge flows to real multi-file handling
- `[in-progress]` standardize more bespoke FFmpeg-heavy flows on shared helpers

### Sprint 4: Documents And Crawlability
**Status:** `[done]`
- `[done]` add first PDF tool family
- `[done]` add sitemap, robots, canonicals, and richer metadata foundation
- `[done]` improve homepage and browse-page content depth

### Sprint 5: Landing Pages And Flagship SEO Depth
**Status:** `[in-progress]`
- `[done]` standardize tool-page breadcrumbs, metadata, and structured data through a shared scaffold
- `[done]` turn category pages into real landing pages with educational copy and FAQ/schema
- `[done]` add deeper best-settings, privacy, compatibility, and limitations guidance to flagship tool pages
- `[in-progress]` continue expanding richer original content to additional top tool pages
- `[planned]` add richer result summaries and comparison content consistently

### Sprint 6: Performance Consolidation
**Status:** `[in-progress]`
- `[done]` consolidate shared FFmpeg workspace/progress handling for merge flows
- `[in-progress]` extend the shared worker/job architecture into more bespoke FFmpeg-heavy tools
- `[planned]` add adaptive concurrency and better profiling
- `[planned]` reduce main-thread pressure for the heaviest tasks

### Sprint 7: Launch Surface And Monetization Readiness
**Status:** `[in-progress]`
- `[done]` complete the core trust/legal page set
- `[done]` align live canonical host signals and explicit robots metadata with the deployed `www` domain
- `[in-progress]` keep the site content-rich and AdSense-safe
- `[planned]` add `ads.txt` when monetization is switched on
- `[planned]` finalize Open Graph and internal linking coverage

### Sprint 8: Breadth Expansion
**Status:** `[planned]`
- `[planned]` add more document and utility tools
- `[planned]` add search-intent landing content
- `[planned]` expand long-tail tool families on top of the shared platform

---

## What Is Actually Done Right Now
- `[done]` the app has a meaningful browser-only media/image/PDF tool surface
- `[done]` the public trust/legal page set is present
- `[done]` `/tools` and category pages have a real SEO/navigation foundation
- `[done]` the first generation of shared worker/job abstractions is in place
- `[done]` the build has been brought back to a successful state after the `/tools` prerender issue

## What Is Actively Being Worked Through
- `[in-progress]` moving more bespoke FFmpeg-heavy clients to shared execution helpers
- `[in-progress]` deepening flagship tools rather than just adding more shallow ones
- `[in-progress]` strengthening category and tool-page content for launch readiness
- `[in-progress]` reducing duplicated media-processing logic before broader expansion

## Highest-Value Remaining Work
1. Extend shared FFmpeg job/worker architecture into the remaining bespoke media clients.
2. Improve flagship controls and result summaries for `video-convert`, `audio-convert`, and `image-convert`.
3. Expand PDF and image utility breadth with tools like split, reorder, metadata removal, and thumbnail generation.
4. Finish launch-surface SEO work: OG/Twitter metadata, internal linking, and more original educational content.
5. Activate monetization support safely later with `ads.txt` and conservative ad placement.

## Execution Order From Here
1. Finish performance consolidation on the remaining custom FFmpeg clients.
2. Upgrade the top flagship tools until their controls and guidance are genuinely competitive.
3. Add the next PDF and image utility tools.
4. Finish launch-readiness SEO and trust polishing.
5. Scale out into broader tool families only after the above is stable.

## Risks To Watch
- browser memory limits on very large files
- FFmpeg overuse where browser APIs would be simpler and faster
- content volume outpacing true tool depth
- launch/SEO copy promising features not fully implemented yet
- monetization harming trust or workflow clarity

## Shipping Rule
When a sprint task or phase item is completed, mark it in this file during the same work pass so the tracker always reflects reality.
