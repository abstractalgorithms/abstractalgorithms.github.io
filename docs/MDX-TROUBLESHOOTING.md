# MDX Troubleshooting Guide

## Common Issues and Solutions

### Component Not Defined Error
**Error**: `Expected component 'ComponentName' to be defined: you likely forgot to import, pass, or provide it.`

**Solution**: Add the component to `mdx-components.tsx`:

1. Import the component:
   ```tsx
   import ComponentName from './src/components/ComponentName'
   ```

2. Add it to the exports:
   ```tsx
   export function useMDXComponents(components: MDXComponents): MDXComponents {
     return {
       SeriesNav,
       GiscusComments,
       ComponentName,  // Add here
       ...components,
     }
   }
   ```

### Image Not Loading
**Issue**: Images in MDX files not displaying

**Solution**: Ensure images are placed in the correct directory:
- **Location**: `public/posts/[slug]/assets/`
- **Reference**: `<img src="./assets/image.png" alt="Description" />`

### Build Errors in MDX
**Issue**: MDX syntax or component errors during build

**Debugging Steps**:
1. Check MDX syntax is valid
2. Ensure all custom components are properly imported
3. Verify image paths are correct
4. Test with `npm run dev` first

### SeriesNav Component Usage
The SeriesNav component requires specific props:

```jsx
<SeriesNav 
  seriesName="Series Name" 
  currentOrder={1} 
  total={3} 
  prev={null | "/posts/previous-post"} 
  next={"/posts/next-post" | null} 
/>
```

## File Structure for Posts

Each post should have:
```
src/posts/[slug]/
├── content.mdx          # MDX content
├── metadata.ts          # Post metadata
public/posts/[slug]/
└── assets/              # Images and other assets
    ├── image1.png
    └── image2.jpg
```

## Testing MDX Changes

1. **Development**: `npm run dev`
2. **Build Test**: `npm run build`
3. **Check Specific Post**: Visit `/posts/[slug]` in browser

## Available Components

### Currently Available in MDX:
- `SeriesNav` - Series navigation
- `GiscusComments` - Comments system
- Standard HTML tags with className support

### To Add New Components:
1. Create component in `src/components/`
2. Import in `mdx-components.tsx`
3. Add to exports object
4. Test with build
