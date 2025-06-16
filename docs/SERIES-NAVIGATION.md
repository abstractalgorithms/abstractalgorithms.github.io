# Series Navigation Components Guide

## Available Series Navigation Components

The blog supports multiple types of series navigation components to create cohesive learning series for readers.

### 1. InlineSeriesNav (Recommended)

**Best for**: Primary series navigation that integrates naturally with page content.

```jsx
<InlineSeriesNav 
  seriesName="Learning Series: Databases" 
  currentOrder={1} 
  total={3} 
  prev={null}
  next="/posts/next-post"
  seriesItems={[
    { title: "Post Title 1", slug: "/posts/post-1", order: 1 },
    { title: "Post Title 2", slug: "/posts/post-2", order: 2 },
    { title: "Post Title 3", slug: "/posts/post-3", order: 3 }
  ]}
  compact={false}  // Set to true for smaller version
  showProgress={true}  // Show progress bar
/>
```

**Features**:
- ✅ Inline with content (no overlay)
- ✅ Progress bar visualization
- ✅ Compact mode for footer placement
- ✅ Visual status indicators (current, completed, upcoming)
- ✅ Responsive design
- ✅ Click to expand/collapse in compact mode

### 2. FloatingSeriesNav

**Best for**: Quick navigation without taking up content space (use sparingly).

```jsx
<FloatingSeriesNav 
  seriesName="Learning Series: Databases" 
  currentOrder={1} 
  total={3}
  prev={null} 
  next="/posts/next-post"
  seriesItems={[...]}
/>
```

**Features**:
- Floating button in top-right corner
- Dropdown panel with series overview
- Mobile-friendly

### 3. SeriesNav (Original)

**Best for**: Simple previous/next navigation.

```jsx
<SeriesNav 
  seriesName="Learning Series: Databases" 
  currentOrder={1} 
  total={3} 
  prev={null} 
  next="/posts/next-post"
/>
```

## Best Practices

### Placement Recommendations

1. **Top of Article**: Use `InlineSeriesNav` with full expansion
   ```jsx
   <InlineSeriesNav 
     // ... props
     compact={false}
     showProgress={true}
   />
   ```

2. **Bottom of Article**: Use `InlineSeriesNav` in compact mode
   ```jsx
   <InlineSeriesNav 
     // ... props
     compact={true}
     showProgress={false}
   />
   ```

3. **Both**: Use both for maximum navigation convenience

### Series Items Structure

```typescript
interface SeriesItem {
  title: string    // Display title
  slug: string     // URL path (e.g., "/posts/post-slug")
  order: number    // Position in series (1-based)
  completed?: boolean  // Optional completion status
}
```

### Props Reference

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `seriesName` | string | ✅ | Series title |
| `currentOrder` | number | ✅ | Current post position (1-based) |
| `total` | number | ✅ | Total posts in series |
| `prev` | string \| null | ✅ | Previous post URL or null |
| `next` | string \| null | ✅ | Next post URL or null |
| `seriesItems` | SeriesItem[] | ❌ | Custom series structure |
| `compact` | boolean | ❌ | Compact mode (InlineSeriesNav only) |
| `showProgress` | boolean | ❌ | Show progress bar (InlineSeriesNav only) |

## Implementation Example

```mdx
# Your Post Title

<InlineSeriesNav 
  seriesName="Learning Series: Databases" 
  currentOrder={1} 
  total={3} 
  prev={null} 
  next="/posts/database-normalization-guide"
  seriesItems={[
    { title: "Database Indexes Guide", slug: "/posts/database-indexes-guide", order: 1 },
    { title: "Database Normalization Guide", slug: "/posts/database-normalization-guide", order: 2 },
    { title: "Advanced Database Concepts", slug: "/posts/advanced-database-concepts", order: 3 }
  ]}
/>

## Your Content Here

...article content...

<InlineSeriesNav 
  seriesName="Learning Series: Databases" 
  currentOrder={1} 
  total={3} 
  prev={null} 
  next="/posts/database-normalization-guide"
  seriesItems={[...]}
  compact={true}
/>
```

## Visual Features

### Status Indicators
- **Current Post**: Blue circle with number, "Current" badge
- **Completed Posts**: Green checkmark icon
- **Upcoming Posts**: Gray circle outline

### Progress Bar
- Visual representation of series completion
- Animated transitions
- Percentage display

### Responsive Design
- Mobile-optimized layouts
- Touch-friendly buttons
- Collapsible sections on small screens

## Styling

All components use Tailwind CSS classes and follow the site's design system:
- Blue color scheme for current/active states
- Green for completed states
- Gray for inactive/upcoming states
- Consistent spacing and typography
