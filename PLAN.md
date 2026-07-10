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
- `[done]` thumbnail generator
- `[done]` rotate
- `[done]` watermark

#### PDF
- `[done]` from images
- `[done]` merge
- `[done]` split
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
- `[done]` keyword-aware metadata, FAQs, and compression guidance now align with the researched `compress video` intent cluster
- `[done]` codec selection
- `[done]` bitrate mode choice
- `[done]` FPS control
- `[done]` richer audio codec and bitrate controls
- `[done]` stronger preset guidance and expected-size guidance

#### Video Convert
- `[done]` keyword-aware metadata, FAQs, and comparison copy now align with the researched `video converter` intent cluster
- `[done]` clearer codec vs container controls
- `[done]` audio passthrough vs transcode choice
- `[done]` subtitle preservation when practical
- `[done]` social/export presets
- `[done]` advanced `faststart` toggle

#### Video Trim
- `[done]` keyword-aware metadata, FAQs, and trim guidance now align with the researched `trim video` intent cluster
- `[done]` stream-copy vs re-encode guidance
- `[done]` better cut-accuracy explanation

#### Image Compress
- `[done]` keyword-aware metadata, FAQs, and size-reduction guidance now align with the researched `compress image` intent cluster
- `[in-progress]` browser-native-first strategy
- `[done]` explicit lossless vs lossy modes
- `[done]` workflow and FAQ copy now clearly explain that browser-based compression strips EXIF and similar metadata from exported images
- `[done]` metadata preserve/remove choices

#### Image Convert
- `[done]` keyword-aware metadata, FAQs, and format guidance now align with the researched `image converter` intent cluster
- `[done]` metadata stripping control
- `[done]` transparency/background handling
- `[done]` batch conversion flow

#### Audio Compress / Convert / Trim
- `[done]` Audio Trim now has keyword-aware metadata, FAQs, and trimming guidance aligned with the researched `trim audio` intent cluster
- `[done]` Audio Compress now has keyword-aware metadata, FAQs, and size-reduction guidance aligned with the researched `compress audio` intent cluster
- `[done]` Audio Converter now has keyword-aware metadata, FAQs, and format guidance aligned with the researched `audio converter` intent cluster
- `[done]` Audio Converter now exposes sample-rate and channel controls through the shared conversion workflow
- `[done]` Audio Compressor now exposes output-format and sample-rate controls through the shared compression workflow
- `[done]` Audio Trim now explains when same-format stream copy is faster versus when re-encoding is safer for tighter cut boundaries
- `[done]` codec / sample-rate / channel-depth controls
- `[done]` normalize and loudness presets
- `[done]` speech vs music presets

### Exit Criteria
- `[planned]` 8 to 12 top tools feel genuinely polished, not just present
- `[in-progress]` top tools are already deeper than generic low-effort utility sites

---

## Phase 4: Document And Image Breadth
**Status:** `[done]`
**Goal:** Grow beyond simple media conversion without losing the browser-only model.

### Delivered
#### PDF
- `[done]` PDF to images
- `[done]` images to PDF
- `[done]` PDF merge
- `[done]` PDF split
- `[done]` PDF reorder pages
- `[done]` PDF compress
- `[done]` extract images from PDF

#### Image Utility
- `[done]` crop
- `[done]` resize
- `[done]` rotate
- `[done]` watermark
- `[done]` filters
- `[done]` thumbnail generator
- `[done]` metadata remover
- `[done]` blur / redact
- `[done]` favicon / app icon generator
- `[done]` social media resizer presets

### Remaining
- `[done]` the currently planned Phase 4 PDF and image utility set has been shipped

### Exit Criteria
- `[done]` the app is already more than just convert/compress
- `[done]` PDF and image utility breadth now includes splitting, reordering, compression, extraction, metadata removal, redaction, icons, and social resizing
- `[done]` document and utility breadth materially increase searchable surface area

---

## Phase 5: SEO, Trust, And AdSense Readiness
**Status:** `[in-progress]`
**Goal:** Be publishable, crawlable, and trustworthy before scale-out.

### Delivered
- `[done]` sitemap and robots routes
- `[done]` canonical handling on key public pages
- `[done]` canonical host and metadata base are now aligned with the live `www` domain
- `[done]` shared tool pages now avoid duplicate H1s by keeping one primary hero heading and a separate editor section heading
- `[done]` shared tool metadata now has stronger keyword-aware title defaults and page-level keyword metadata support
- `[done]` shared tool SEO rendering now normalizes common text-encoding glitches so long-form copy and schema read cleanly
- `[done]` Audio Compress now has page-specific keyword-aware title, description, FAQs, and size-reduction guidance aligned across metadata and structured content
- `[done]` Audio Converter now has page-specific keyword-aware title, description, FAQs, and format guidance aligned across metadata and structured content
- `[done]` Audio Trim now has page-specific keyword-aware title, description, FAQs, and trimming guidance aligned across metadata and structured content
- `[done]` Audio Merge, Image Resize, PDF Merge, and Video Merge now have page-specific keyword-aware titles, descriptions, FAQs, and workflow guidance aligned across metadata and structured content
- `[done]` Image Crop, Image Rotate, PDF to Images, Video to GIF, Extract Audio, and Mute Video now have page-specific keyword-aware titles, descriptions, FAQs, and workflow guidance aligned across metadata and structured content
- `[done]` Audio Effects, Images to PDF, Image Batch Compress, Image Filters, Image Watermark, Reverse Video, Crop Video, Video Effects, and Burn Captions now have page-specific keyword-aware titles, descriptions, FAQs, and workflow guidance aligned across metadata and structured content
- `[done]` Image Compress now has page-specific keyword-aware title, description, FAQs, and size-reduction guidance aligned across metadata and structured content
- `[done]` Image Converter now has page-specific keyword-aware title, description, FAQs, and format guidance aligned across metadata and structured content
- `[done]` Video Trim now has page-specific keyword-aware title, description, FAQs, and trimming guidance aligned across metadata and structured content
- `[done]` Video Compress now has page-specific keyword-aware title, description, FAQs, and size-reduction guidance aligned across metadata and structured content
- `[done]` Video Converter now has page-specific keyword-aware title, description, FAQs, and format guidance aligned across metadata and structured content
- `[done]` breadcrumb navigation and breadcrumb schema
- `[done]` shared structured data support for tool and browse pages
- `[done]` category pages upgraded from simple grids to real landing pages
- `[done]` trust and legal page set exists and is linked into the site

### In Progress
- `[done]` Open Graph and Twitter metadata coverage across homepage, `/tools`, category pages, tool pages, and trust/legal pages
- `[done]` shared static-page metadata helper now gives trust/legal pages and the main `/tools` index consistent canonical, Open Graph, and Twitter metadata
- `[done]` stronger internal linking between related tools through shared intent-aware related-tool recommendations on tool pages and editor sidebars
- `[done]` richer unique copy on top tool pages through shared practical-guidance sections on flagship tool pages
- `[done]` richer intent- and comparison-oriented category content through shared decision and workflow-comparison sections
- `[in-progress]` keep workflow UI clean and trustworthy for future monetization

### Remaining
- `[planned]` `ads.txt` once monetization is activated
- `[planned]` conservative ad placement strategy
- `[done]` more original educational sections on top traffic pages
- `[done]` search-intent content such as best-settings and format-comparison guides

### Exit Criteria
- `[done]` site is technically crawlable and trust-complete
- `[done]` top landing pages have enough original content for public launch and AdSense review

---

## Phase 6: Performance And Worker Architecture
**Status:** `[done]`
**Goal:** Push browser-side performance without making the UX fragile.

### Delivered
- `[done]` worker-backed browser-image job foundation
- `[done]` shared FFmpeg single-job runner for custom and generator-based media flows
- `[done]` shared multi-file FFmpeg workspace helpers for merge-style flows
- `[done]` native/browser-first processing is already used for some lighter image and document paths
- `[done]` adaptive browser heuristics now tune image batch concurrency and PDF render-scale defaults for lower-end devices
- `[done]` shared FFmpeg single-file execution now powers older standalone media tools such as `video-extract-audio`, `video-mute`, `video-gif`, `video-speed`, `video-reverse`, and `audio-effects`
- `[done]` older standalone media tools now rely on shared FFmpeg context progress instead of attaching fresh per-run progress listeners
- `[done]` heavier standalone media tools now surface more device-aware guidance for large-file browser workloads

### Remaining
- `[done]` push more heavy FFmpeg work into workers
- `[done]` adaptive concurrency rules
- `[done]` better profiling on low-end vs high-end hardware through shared runtime heuristics
- `[done]` fast-path preview generation for thumbnails, frame grabs, and simple transforms through browser-native image and PDF paths already in use across those lighter workflows
- `[done]` evaluate WebCodecs where it gives real wins
  Current direction: continue relying on the existing browser-native image/PDF paths and FFmpeg for the current shipped tool set instead of adding a second media pipeline prematurely.

### Exit Criteria
- `[done]` heavy work avoids blocking the page
- `[done]` strong devices get measurable wins
- `[done]` simple jobs avoid unnecessary FFmpeg overhead

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
- `[done]` rewrite Image Compress page copy around researched keywords across title, description, FAQs, and compression intent
- `[done]` rewrite Image Converter page copy around researched keywords across title, description, FAQs, and format intent
- `[done]` rewrite Video Trim page copy around researched keywords across title, description, FAQs, and trimming intent
- `[done]` rewrite Audio Trim page copy around researched keywords across title, description, FAQs, and trimming intent
- `[done]` expand the next tier of tool pages with keyword-aware copy for Video Merge, Audio Merge, Image Resize, and PDF Merge
- `[done]` expand additional utility pages with keyword-aware copy for Video to GIF, Extract Audio, Mute Video, Image Crop, Image Rotate, and PDF to Images
- `[done]` complete the keyword-aware copy rollout across the remaining current tool catalog
- `[done]` rewrite Audio Compress page copy around researched keywords across title, description, FAQs, and compression intent
- `[done]` rewrite Audio Converter page copy around researched keywords across title, description, FAQs, and format intent
- `[done]` rewrite Video Compress page copy around researched keywords across title, description, FAQs, and compression intent
- `[done]` rewrite Video Converter page copy around researched keywords across title, description, FAQs, and format intent
- `[done]` continue expanding richer original content to additional top tool pages
- `[planned]` add richer result summaries and comparison content consistently

### Sprint 6: Performance Consolidation
**Status:** `[done]`
- `[done]` consolidate shared FFmpeg workspace/progress handling for merge flows
- `[done]` extend the shared worker/job architecture into more bespoke FFmpeg-heavy tools
- `[done]` add adaptive concurrency and better profiling
- `[done]` reduce main-thread pressure for the heaviest tasks

### Sprint 7: Launch Surface And Monetization Readiness
**Status:** `[in-progress]`
- `[done]` complete the core trust/legal page set
- `[done]` align live canonical host signals and explicit robots metadata with the deployed `www` domain
- `[done]` remove duplicate H1 patterns from shared tool pages and improve shared title-tag generation
- `[done]` add shared keyword expansion and text-normalization support for tool-page SEO content
- `[in-progress]` keep the site content-rich and AdSense-safe
- `[planned]` add `ads.txt` when monetization is switched on
- `[done]` finalize Open Graph and internal linking coverage

### Sprint 8: Breadth Expansion
**Status:** `[in-progress]`
- `[done]` add more document and utility tools
- `[done]` add `pdf-split` with per-page and page-range exports
- `[done]` add `image-thumbnail` with preset-driven browser-native thumbnail generation
- `[done]` add the remaining planned Phase 4 breadth tools: `pdf-reorder`, `pdf-compress`, `pdf-extract-images`, `image-metadata`, `image-blur-redact`, `image-icons`, and `image-social-resize`
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
- `[in-progress]` deepening flagship tools rather than just adding more shallow ones
- `[in-progress]` strengthening category and tool-page content for launch readiness
- `[in-progress]` reducing duplicated media-processing logic before broader expansion

## Highest-Value Remaining Work
1. Improve flagship controls and result summaries for `video-convert`, `audio-convert`, and `image-convert`.
2. Expand long-tail utility depth beyond the current Phase 4 set, while keeping each new page honest about what runs fully in the browser.
3. Keep the public surface monetization-safe while holding onto the current trust, content, and workflow clarity standards.
4. Activate monetization support safely later with `ads.txt` and conservative ad placement.
5. Continue polishing specialized FFmpeg-heavy workflows where bespoke preview UX is still intentional rather than accidental duplication.

## Execution Order From Here
1. Upgrade the top flagship tools until their controls and guidance are genuinely competitive.
2. Add the next long-tail utility families only where they still fit the browser-only model cleanly.
3. Finish launch-readiness SEO and trust polishing.
4. Scale out into broader tool families only after the above is stable.

## Risks To Watch
- browser memory limits on very large files
- FFmpeg overuse where browser APIs would be simpler and faster
- content volume outpacing true tool depth
- launch/SEO copy promising features not fully implemented yet
- monetization harming trust or workflow clarity

## Shipping Rule
When a sprint task or phase item is completed, mark it in this file during the same work pass so the tracker always reflects reality.
