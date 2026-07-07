# FileAppsV2

Browser-based media tools built with Next.js, React, TypeScript, Tailwind CSS v4, shadcn/ui, and FFmpeg.wasm.

## What this app does

FileAppsV2 provides a set of client-side tools for working with video, audio, and image files directly in the browser. Files are processed locally and are not uploaded to a server.

Current tool families:

- Video: convert, compress, trim, merge, effects, burn captions
- Audio: convert, compress, trim, merge, effects
- Image: convert, compress, resize, batch compress

## Architecture

- Each tool has a server `page.tsx` for metadata and routing.
- Interactive UI lives in a matching client component, usually `client.tsx`.
- Media tools share `ToolShell`, which handles upload, configure, processing, and done states.
- FFmpeg is loaded client-side through the `useFFmpeg` hook.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` after the dev server starts.

## Current source of truth

This README is the canonical place for project notes, implementation order, and ongoing work.

## Implementation roadmap

Work is being done one item at a time, in order:

1. Fix media preview layout instability in `ToolShell`
2. Add a hero section to each tool landing page
3. Improve control grouping, labels, and iconography across tool forms
4. Upgrade `ToolPageGenerator` to support richer section metadata
5. Add browser-only document tools
6. Add browser-only utility tools for images and QR/color workflows
7. Improve the step indicator and processing status UI
8. Polish SEO and metadata

## Notes

- The repo uses the Next.js app router.
- Root metadata lives in `src/app/layout.tsx`.
- Tool definitions live in `src/lib/tools.ts`.
- Tool-specific form configs live in `src/lib/tool-configs.ts`.
