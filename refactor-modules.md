# Module Refactoring Plan - 15 Total Modules

## Completed ✅ (Fully Refactored + Fixed FFmpeg Issues)
1. **AudioTrim** - ✅ Refactored + Fixed FFmpeg reset/stop issues
2. **AudioConvert** - ✅ Refactored + Fixed FFmpeg reset issues  
3. **AudioEffects** - ✅ Refactored + Fixed FFmpeg reset/stop issues
4. **AudioPlayback** - ✅ Refactored + Fixed FFmpeg reset/stop issues
5. **ExtractAudio** - ✅ Refactored with Twitter meta tags + Root styling
6. **VideoCompression** - ✅ Refactored + Fixed FFmpeg termination issues
7. **VideoConvert** - ✅ Refactored with Twitter meta tags + Root styling (uses better FFmpeg manager)
8. **VideoPlayback** - ✅ Refactored with Twitter meta tags + Root styling
9. **VideoResize** - ✅ Refactored with Twitter meta tags + Root styling  
10. **VideoTrim** - ✅ Refactored with Twitter meta tags + Root styling
11. **AudioMerge** - ✅ Refactored to match AudioConvert pattern exactly
12. **ImageConvert** - ✅ Refactored to match AudioConvert pattern exactly
13. **ThumbnailGenerator** - ✅ Refactored to match AudioConvert pattern exactly

## To Refactor 🔄

### Main Components (2 remaining - Complex modules)
1. **BurnCaption** - `BurnCaption.tsx` ⚠️ (Complex - subtitle handling)
2. **VideoMerge** - `VideoMerge.tsx` ⚠️ (Complex - multiple files)

## 🔧 Critical Issues Fixed
- **FFmpeg Reset Problems**: Fixed improper FFmpeg instance cleanup in reset/stop functions
- **State Management**: Fixed status transitions and proper cleanup
- **Memory Leaks**: Fixed FFmpeg references and loading state management

## Pattern to Apply

### Import Structure:
```tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';
import { styled } from '@mui/material/styles';

// MUI imports
import Container from '@mui/material/Container';
// ... other MUI components

// MUI Icons (if needed)
import SomeIcon from '@mui/icons-material/SomeIcon';

// Component imports
import { useHookName } from './useHookName';
import ComponentA from './ComponentA';
import FileInfoDisplay from '../../../components/shared/FileInfoDisplay';
```

### Styled Component (at bottom):
```tsx
// Styled components
const Root = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));
```

### Meta Tags to Add:
```tsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Title] | ${APP_INFO.name}" />
<meta name="twitter:description" content="[Description]" />
<meta name="twitter:image" content="/images/branding/logo-small.svg" />
```

### Replace filename sections with:
```tsx
{/* File information and remove button */}
{file && <FileInfoDisplay file={file} onRemove={removeFile} />}
```

### Use Root instead of Container:
```tsx
<Root maxWidth="lg">
  {/* content */}
</Root>
```



Transform [TARGET_COMPONENT] to exactly match the AudioConvert.tsx pattern with:
1. Complete landing page structure (Hero, Tool, Benefits, How It Works, FAQ, Related Tools, CTA sections)
2. Similar UI components and import style (individual MUI imports, same icons pattern)
3. Keep the existing tool Card section untouched since it has the core functionality
4. Match the responsive CSS Grid layouts (avoid MUI Grid component)
5. Include comprehensive SEO metadata and JSON-LD schema
6. Use the same section className structure and styling patterns
7. Adapt content to be specific to [TARGET_TOOL_NAME] while maintaining the exact same component structure and layout
8. Maintain the same responsive design patterns and hover effects