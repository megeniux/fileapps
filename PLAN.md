# FileApps V2 Product Plan

## Purpose
This plan turns FileApps V2 into a privacy-first, browser-based tool platform that is strong enough to publish publicly, rank in search, and become eligible for AdSense.

The main business goals are:
- Wide variety of tools
- Wide variety of options within each tool
- Maximum client hardware usage where possible
- Reliable processing with clear error handling
- Better progress, preview, save, and completion UX
- Strong SEO so pages are not seen as low-value utility pages
- A future-ready base for documents, images, video, and audio tools

## Product Direction
FileApps should compete on:
- Privacy first: files stay on the device
- Speed: use browser-native APIs before heavy wasm when possible
- Serious controls: not just one-button utilities
- Clear UX: upload, inspect, configure, process, preview, download
- Useful content: every tool page should teach, not just process

## Current State Summary
The current repo already has:
- Next.js app router setup
- Individual tool routes
- Shared tool shell
- Client-side FFmpeg loading
- Basic metadata and content sections

The current repo still needs major platform work:
- Shared tool engine only supports simple single-file, select-based forms
- Some pages promise features not fully implemented yet
- Multi-file workflows are not truly supported
- Image tools still rely too much on FFmpeg instead of browser-native paths
- SEO foundation is incomplete
- Error handling, ETA, queueing, and advanced previews are still limited

## Guiding Principles
1. Build the platform before scaling tool count.
2. Do not claim features in SEO copy unless the tool really supports them.
3. Prefer native browser APIs for simple image and document work.
4. Use FFmpeg.wasm for broad compatibility and advanced media operations.
5. Move heavy work off the main thread.
6. Make every tool feel trustworthy, predictable, and recoverable.

## Phase Overview
1. Phase 1: Core platform rebuild
2. Phase 2: Reliability and processing UX
3. Phase 3: High-value tool upgrades
4. Phase 4: Document and image expansion
5. Phase 5: SEO, publishing, and AdSense readiness
6. Phase 6: Performance and advanced hardware usage
7. Phase 7: Scale-out and growth content

---

## Phase 1: Core Platform Rebuild

### Goal
Create a reusable tool framework that can power advanced tools instead of only simple dropdown-based pages.

### Outcomes
- One shared schema for tool controls
- One shared execution model for single-file and multi-file tools
- One shared result model for preview, download, retry, and errors
- Ability to build richer tools without rewriting everything per page

### Implementation
- Expand the tool config system to support:
  - `select`
  - `number`
  - `range`
  - `toggle`
  - `text`
  - `textarea`
  - `color`
  - `file`
  - `file[]`
  - `sortable-list`
  - `preset-group`
  - `timeline`
  - `crop-box`
- Split tool definitions into:
  - marketing metadata
  - UI schema
  - processing schema
  - SEO content
- Refactor `ToolShell` into a more flexible container with:
  - upload state
  - inspect state
  - configure state
  - processing state
  - result state
  - error state
- Add shared interfaces for:
  - `ToolInput`
  - `ToolJob`
  - `ToolProgress`
  - `ToolResult`
  - `ToolError`
- Add support for true multi-file workflows
- Add shared validation rules:
  - accepted types
  - max file count
  - per-file max size
  - estimated memory risk
  - unsupported browser capability checks

### Files Likely Touched
- `src/components/tools/tool-shell.tsx`
- `src/components/tools/tool-page-generator.tsx`
- `src/lib/tool-configs.ts`
- `src/lib/tools.ts`
- `src/lib/constants.ts`
- `src/lib/utils.ts`

### Phase 1 Execution Checklist

#### Step 1: Define the New Shared Types
Goal:
Create the type system that the rest of the platform will use.

Tasks:
- Create a shared tool model file, preferably `src/lib/tool-types.ts`
- Define:
  - `ToolControlType`
  - `ToolControlOption`
  - `ToolControlDefinition`
  - `ToolFileRequirement`
  - `ToolValidationRule`
  - `ToolProgressStage`
  - `ToolErrorCode`
  - `ToolResult`
  - `ToolJobContext`
  - `ToolEngine`
- Split definitions clearly between:
  - page metadata
  - UI controls
  - processing config
  - content/SEO config

Deliverable:
- A typed schema that can describe both simple and advanced tools

#### Step 2: Restructure Tool Data
Goal:
Stop mixing marketing content, page metadata, and processing behavior in one loose structure.

Tasks:
- Refactor `src/lib/tools.ts` into richer tool definitions
- Keep lightweight list data for homepage/category cards
- Move processing config to `src/lib/tool-configs.ts` or a new `src/lib/tool-definitions.ts`
- Add fields for:
  - supported input count
  - accepted mime groups
  - output capabilities
  - feature flags
  - SEO content sections
- Make sure feature bullets only describe implemented behavior

Deliverable:
- Tool definitions that can drive cards, pages, forms, and execution consistently

#### Step 3: Rebuild the Control Schema
Goal:
Move beyond select-only controls.

Tasks:
- Expand `ToolPageConfig` or replace it with a better schema
- Support controls for:
  - `select`
  - `number`
  - `range`
  - `toggle`
  - `text`
  - `textarea`
  - `color`
  - `file`
  - `file[]`
  - `sortable-list`
- Add optional control metadata:
  - label
  - help text
  - placeholder
  - min/max/step
  - default value
  - visibility conditions
  - validation rules
  - preset tags

Deliverable:
- A schema that can render real production-grade tool forms

#### Step 4: Build a Shared Tool Form Renderer
Goal:
Render controls from schema instead of hardcoding every tool page.

Tasks:
- Create or refactor a renderer component, such as `src/components/tools/tool-form-renderer.tsx`
- Render each control type from the shared schema
- Add inline validation messages
- Add support for conditional fields
- Keep layout mobile-friendly and section-based

Deliverable:
- One reusable form renderer for most tool pages

#### Step 5: Refactor ToolShell into a State-Based Container
Goal:
Make the shell support richer workflows, not just upload/configure/done.

Tasks:
- Replace the current loose step handling with a clearer state model:
  - upload
  - inspect
  - configure
  - processing
  - result
  - error
- Add support for:
  - one file
  - multiple files
  - file reordering
  - file removal
  - per-file metadata display
- Stop relying on DOM assumptions like grabbing the first `video` or `audio` element from the page
- Pass preview refs and media metadata through React state instead

Deliverable:
- A shell that supports both simple and advanced tool flows safely

#### Step 6: Add a Validation Layer
Goal:
Catch bad inputs before processing starts.

Tasks:
- Add a new helper such as `src/lib/tool-validation.ts`
- Validate:
  - file count
  - file type
  - per-file size
  - total size
  - missing required options
  - unsafe option combinations
- Return typed validation errors with friendly user messages
- Show warnings separately from hard-blocking errors

Deliverable:
- Consistent pre-processing validation across all tools

#### Step 7: Add an Input Inspection Layer
Goal:
Prepare tools to show useful file information before processing.

Tasks:
- Add a lightweight inspect step that reads:
  - file name
  - size
  - mime type
  - image dimensions when possible
  - media duration when possible
- Store inspection results in shared state
- Surface this information in the configure view

Deliverable:
- Every tool can show users what was detected from their file before they process it

#### Step 8: Add Engine Abstraction
Goal:
Prepare for FFmpeg, browser-native image processing, and later document engines.

Tasks:
- Add a minimal execution abstraction:
  - `ffmpeg` engine
  - `browser-image` engine
  - future `document` engine
- Let each tool declare which engine it uses
- Keep the shell and form renderer engine-agnostic

Deliverable:
- A platform that can grow beyond FFmpeg-only execution

#### Step 9: Migrate Two Reference Tools
Goal:
Prove the new platform before migrating everything.

Tasks:
- Migrate one simple single-file tool:
  - recommended: `image-convert` or `audio-convert`
- Migrate one true multi-file tool:
  - recommended: `video-merge` or `image-batch-compress`
- Confirm both work on the new shared schema and shell

Deliverable:
- Two working reference implementations on the new platform

#### Step 10: Remove Platform Debt
Goal:
Avoid carrying misleading or temporary platform assumptions forward.

Tasks:
- Remove or rewrite any feature copy that overpromises
- Mark unfinished capabilities clearly in config, not in public content
- Delete dead assumptions from old generator logic once replacements exist
- Update README to reflect the new architecture after migration is stable

Deliverable:
- Cleaner foundation with less mismatch between UI, code, and SEO copy

### Phase 1 Suggested File Plan

#### New Files to Add
- `src/lib/tool-types.ts`
- `src/lib/tool-validation.ts`
- `src/components/tools/tool-form-renderer.tsx`
- `src/components/tools/tool-preview.tsx`
- `src/components/tools/tool-file-list.tsx`

#### Existing Files to Refactor First
- `src/components/tools/tool-page-generator.tsx`
- `src/components/tools/tool-shell.tsx`
- `src/lib/tool-configs.ts`
- `src/lib/tools.ts`

#### Files to Migrate Later in Phase 1
- `src/app/tools/video/merge/client.tsx`
- `src/app/tools/image/batch-compress/client.tsx`
- One simpler client page such as:
  - `src/app/tools/image/convert/client.tsx`
  - `src/app/tools/audio/convert/client.tsx`

### Phase 1 Suggested Coding Order
1. Create shared types
2. Rework tool config structure
3. Build validation layer
4. Build form renderer
5. Refactor tool shell
6. Add inspection layer
7. Add engine abstraction
8. Migrate one single-file tool
9. Migrate one multi-file tool
10. Remove old assumptions and cleanup

### Phase 1 Testing Checklist
- Single-file upload still works
- Multi-file upload works
- Invalid file type is blocked cleanly
- Oversized file shows warning or hard stop
- Controls render correctly from schema
- Conditional controls show and hide correctly
- Processing output still downloads correctly
- Reset and retry still work
- Mobile layout remains usable
- No public tool page claims missing features after migration

### Exit Criteria
- At least one single-file tool and one multi-file tool use the new shared platform
- The platform supports more than dropdown-only controls
- Merge and batch pages are no longer pretending to be advanced while using shallow config

---

## Phase 2: Reliability and Processing UX

### Goal
Make processing feel dependable and professional.

### Outcomes
- Better progress reporting
- Better failures and recovery
- Better device-aware behavior
- Better previews before and after processing

### Implementation
- Move heavy operations into Web Workers
- Separate progress into stages:
  - preparing engine
  - reading files
  - analyzing input
  - processing
  - finalizing output
- Add user-facing progress details:
  - percent complete
  - current step
  - live status messages
  - estimated remaining time when possible
- Add stronger error categories:
  - invalid input
  - unsupported format
  - browser limitation
  - memory pressure
  - FFmpeg load failure
  - processing command failure
- Show recovery actions:
  - retry
  - lower quality
  - use smaller file
  - switch browser
  - switch format
- Add cancellation support
- Add auto-cleanup for virtual files and object URLs
- Add warnings before expensive jobs based on:
  - file size
  - file count
  - browser capabilities
  - device concurrency

### Hardware Utilization Plan
- Use `navigator.hardwareConcurrency` to tune worker count
- Use `navigator.deviceMemory` when available to reduce risky jobs
- Use `OffscreenCanvas` for image operations off the main thread
- Explore `WebCodecs` fast paths for preview, thumbnails, and some encode/decode tasks
- Keep fallback paths for browsers without these APIs

### Exit Criteria
- Every tool shows proper status and actionable failure messages
- Long-running tasks no longer look frozen
- Users can cancel and retry without refreshing the page

---

## Phase 3: High-Value Tool Upgrades

### Goal
Upgrade the current highest-potential tools until they are genuinely competitive.

### Priority Order
1. Video Compress
2. Video Convert
3. Video Trim
4. Image Compress
5. Image Convert
6. Audio Compress
7. Audio Convert
8. Audio Trim

### Required Improvements Per Tool
- More control depth
- Better preview
- Better defaults
- Better output naming
- Better validation
- Better result summaries

### Video Compress
- Add codec selection
- Add preset selection
- Add CRF slider
- Add bitrate mode choice
- Add resolution presets
- Add FPS option
- Add audio codec and bitrate options
- Add estimated size guidance
- Add "best for WhatsApp / email / web / archive" presets

### Video Convert
- Add codec/container distinction
- Add audio passthrough or transcode options
- Add subtitle preservation options where possible
- Add faststart option for MP4
- Add social/export presets

### Video Trim
- Replace simple time inputs with a visual timeline
- Add frame preview thumbnails
- Add quick segment presets
- Add stream-copy vs re-encode mode
- Add better cut accuracy messaging

### Image Compress
- Use browser-native path first for JPEG/PNG/WebP/AVIF where feasible
- Add lossless/lossy modes
- Add metadata stripping option
- Add resize-before-compress option
- Add side-by-side before/after preview

### Image Convert
- Add transparency handling
- Add background fill for non-transparent formats
- Add metadata preserve/remove option
- Add simple batch conversion

### Audio Compress / Convert / Trim
- Add sample rate, channel, and codec control
- Add waveform preview for trim
- Add normalize and loudness presets
- Add speech/music presets

### Exit Criteria
- These core tools feel meaningfully deeper than basic online utilities
- At least 8 tools are polished enough to act as flagship pages

---

## Phase 4: Document and Image Expansion

### Goal
Expand beyond current media tools into broader utility categories without breaking the privacy-first model.

### Document Tool Priorities
1. PDF to JPG/PNG
2. JPG/PNG to PDF
3. PDF merge
4. PDF split
5. PDF reorder pages
6. PDF compress
7. Extract images from PDF
8. Document image cleanup

### Implementation Notes
- Do not force all document workflows through FFmpeg
- Use document-specific client libraries where appropriate
- Use canvas-based rendering for previews
- Reuse the shared upload, inspect, progress, result, and error layers

### Image Tool Expansion
1. Crop
2. Rotate/flip
3. Watermark
4. Metadata remover
5. Social media resizer
6. Thumbnail generator
7. Blur/redact
8. Favicon/app icon generator

### Exit Criteria
- FileApps is no longer only "media convert/compress"
- Documents and image utilities broaden searchable surface area

---

## Phase 5: SEO, Publishing, and AdSense Readiness

### Goal
Make the site publish-ready and reduce the risk of being seen as thin, low-value content.

### Technical SEO Tasks
- Add `sitemap.ts`
- Add `robots.ts`
- Add canonical URL handling
- Improve Open Graph and Twitter metadata
- Add breadcrumb schema
- Add per-tool structured data where appropriate
- Add category landing pages with unique intros
- Add proper internal linking between related tools

### Content SEO Tasks
Each important tool page should include:
- a unique intro
- a real "how to use it" section
- best settings guidance
- format comparison notes
- privacy explanation
- limitations and compatibility notes
- FAQ based on real use cases
- links to related tools

### Publishing Pages Required
- About
- Contact
- Privacy Policy
- Terms
- Disclaimer
- Ads disclosure if needed

### AdSense Readiness Tasks
- Add `ads.txt` when ready
- Avoid aggressive ad placement inside workflows
- Prefer ads on:
  - homepage
  - category pages
  - content sections
  - result pages
- Keep tool UI fast and uncluttered

### Exit Criteria
- Site is technically crawlable and well-structured
- Top pages contain useful original content
- The site is ready for a public launch and later AdSense review

---

## Phase 6: Performance and Advanced Hardware Usage

### Goal
Push browser-side performance as far as practical without sacrificing reliability.

### Implementation
- Add worker pool support
- Add adaptive concurrency rules
- Profile large jobs on low-end and high-end devices
- Prefer native browser APIs for simple jobs
- Only load heavy engines when required
- Add optional fast paths for:
  - thumbnails
  - frame extraction
  - image resize/compress
  - preview rendering

### Advanced Research Track
- Evaluate WebCodecs for:
  - decode previews
  - thumbnail extraction
  - lightweight re-encode cases
- Evaluate WebGPU or GPU-assisted browser APIs only if they provide real value
- Keep compatibility-first fallbacks

### Exit Criteria
- Heavy jobs no longer block the page
- Performance scales better on stronger hardware
- Simple jobs avoid unnecessary FFmpeg overhead

---

## Phase 7: Scale-Out and Growth Content

### Goal
Grow the site in breadth only after the platform and flagship tools are strong.

### New Tool Families
- Video:
  - mute video
  - extract audio
  - crop video
  - resize for social
  - subtitle convert
  - thumbnail generator
  - watermark overlay
- Audio:
  - noise reduction
  - silence remover
  - volume normalize
  - metadata editor
  - ringtone maker
- Image:
  - meme maker
  - poster maker
  - color palette extractor
  - QR utility tools
- Document:
  - page extractor
  - page rotator
  - OCR prep tools

### Growth Content
- "Best settings" guides
- format comparison articles
- troubleshooting articles
- privacy-first comparison pages
- "tool vs tool" pages
- landing pages for real intents like:
  - compress video for WhatsApp
  - convert image to WebP for website speed
  - trim MP3 for ringtone

### Exit Criteria
- New tools launch on a strong shared foundation
- SEO growth is supported by real content and real utility

---

## Cross-Phase Standards

### UX Standard for Every Tool
Every tool should eventually support:
- upload with validation
- file info preview
- configurable options
- progress state
- meaningful errors
- downloadable result
- reset and retry
- mobile-friendly layout

### Content Standard for Every Tool Page
Every important page should eventually have:
- unique title and description
- unique H1 and intro
- feature list that matches the actual implementation
- how-it-works section
- FAQ
- related tools

### Quality Standard
Before marking any tool "done":
- verify it works with several real files
- verify the output opens correctly
- verify errors are understandable
- verify page copy does not overpromise
- verify mobile layout is usable

---

## Suggested Build Order

### Sprint 1
- Rebuild tool schema
- Rebuild tool shell states
- Add validation and typed errors

### Sprint 2
- Add worker-based processing and progress phases
- Upgrade video compress
- Upgrade image compress

### Sprint 3
- Upgrade video trim with timeline foundation
- Upgrade audio trim with waveform/timeline foundation
- Upgrade merge and batch flows to real multi-file handling

### Sprint 4
- Add first document tools
- Add sitemap, robots, canonical, and richer metadata
- Improve content on homepage, category pages, and top tool pages

### Sprint 5
- Add additional flagship tools
- Add before/after preview, ETA, queueing, and result summaries
- Prepare site for public launch

---

## Risks to Watch
- Browser memory limits on large files
- Overusing FFmpeg where native APIs would be better
- Shipping too many shallow tools too early
- SEO copy getting ahead of real functionality
- Letting ads harm UX before search trust is established

## Final Strategy
Do not optimize for tool count first.

Optimize for:
1. Strong shared platform
2. 8 to 12 genuinely useful flagship tools
3. Solid SEO and trust pages
4. Publish and validate
5. Scale only after quality is proven

This is the path most likely to help FileApps become a real product instead of just another thin browser utility site.
