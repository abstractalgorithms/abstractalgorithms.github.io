# GitHub Copilot Instructions for Abstract Algorithms Blog

> **📖 Complete Project Documentation**  
> For quick daily reference, see `/.copilot-instructions.md` in the root directory.

## Project Overview

This is a Next.js 14 blog application with MDX support for technical content, featuring a GenAI Mastery series and other algorithm/programming tutorials.

## Critical MDX File Requirements

### ✅ Required Structure for All MDX Files

Every MDX file in `/src/posts/` MUST start with a metadata export:

```javascript
export const metadata = {
  title: "Your Title Here",
  date: "YYYY-MM-DD",
  excerpt: "Brief description for SEO and previews",
  author: "Abstract Algorithms",
  tags: ["tag1", "tag2", "tag3"],
  coverImage: "./assets/filename.png",
  series: {
    // Only for series posts
    name: "Series Name",
    order: 1,
    total: 12,
    prev: "/posts/previous-part" || null,
    next: "/posts/next-part" || null,
  },
};
```

### ❌ Avoid These MDX Syntax Issues

1. **NO Anchor Link Syntax**: Never use `{#anchor-name}` in headings

   ```markdown
   ❌ ## My Section {#my-section}
   ✅ ## My Section
   ```

2. **NO F-String Syntax in Code Blocks**: MDX parser conflicts with `{}`

   ```python
   ❌ print(f"Hello {name}")
   ✅ print("Hello " + name)
   ✅ print("Hello {}".format(name))
   ```

3. **NO LaTeX Math with $$**: Use code blocks instead

   ````markdown
   ❌ $$\frac{a}{b}$$
   ✅ `math
       a / b
       `
   ````

4. **NO Template Literals in Code Blocks**: Escape or use alternatives
   ```javascript
   ❌ const msg = `Hello ${name}`
   ✅ const msg = "Hello " + name
   ```

### 🔧 Code Block Best Practices

1. **Escape Curly Braces**: If you must use `{}`, ensure proper escaping
2. **Use String Concatenation**: Instead of template literals in examples
3. **Simple Math Notation**: Use plain text or simple code blocks for formulas
4. **Consistent Language Tags**: Always specify language for syntax highlighting

## Series Management

### ⚠️ CRITICAL: Series Structure Guidelines

**Series posts appearing as standalone posts is a common issue. Follow these guidelines:**

#### ✅ Correct Series Structure

```
series-name/
├── content.mdx          # Landing page (Part 1 content, order: 1)
├── metadata.ts          # Series overview metadata (NO order)
├── part-2.mdx          # Part 2 (order: 2)
├── part-3.mdx          # Part 3 (order: 3)
└── part-N.mdx          # Subsequent parts
```

#### ❌ NEVER Create These Structures

```
❌ series-name/
   ├── content.mdx       # Series overview
   ├── part-1.mdx       # Duplicate first part
   └── part-2.mdx       # Creates confusion

❌ series-name/
   ├── metadata.ts      # Has order: 1
   ├── part-1.mdx       # Also has order: 1
   └── part-2.mdx       # Both appear in listings
```

#### 🎯 Series File Guidelines

**Landing Page (`content.mdx`)**:

- Contains actual Part 1 content (not just overview)
- Has `export const metadata` with `order: 1`
- Appears in main posts listings as the series entry point

**Series Metadata (`metadata.ts`)**:

- Contains series overview metadata
- Does NOT have an `order` field (or can be omitted)
- Used for series-wide configuration

**Individual Parts (`part-N.mdx`)**:

- Start from `part-2.mdx` (since Part 1 is in `content.mdx`)
- Each has `order: N` where N >= 2
- These do NOT appear in main posts listings
- Only accessible via series navigation

### Series Navigation Structure

```javascript
// Landing page (content.mdx)
series: {
  name: "Series Name",
  order: 1,
  total: 12,
  next: "/posts/series-name/part-2"  // No prev
}

// Individual parts (part-N.mdx)
series: {
  name: "Series Name",
  order: N,
  total: 12,
  prev: N === 2 ? "/posts/series-name" : "/posts/series-name/part-" + (N-1),
  next: N < total ? "/posts/series-name/part-" + (N+1) : null
}
```

### GenAI Mastery Series Structure

- Total: 12 parts
- Path: `/src/posts/genai-mastery-series/`
- Landing: `content.mdx` (Part 1 content)
- Parts: `part-2.mdx` through `part-12.mdx`
- Navigation: Landing page → part-2 → part-3 → ... → part-12

### Series Metadata Requirements

```javascript
series: {
  name: "GenAI Mastery",
  order: [current_part_number],
  total: 12,
  prev: [previous_part_path] || null,
  next: [next_part_path] || null
}
```

## Build Error Prevention

### Common Build Failures and Solutions

1. **"Could not parse expression with acorn"**

   - Check for unescaped `{}` in code blocks
   - Remove anchor link syntax `{#...}`
   - Fix f-strings and template literals

2. **"metadata is defined multiple times"**

   - Ensure only ONE `export const metadata` per file
   - Check for duplicate exports

3. **MDX Compilation Errors**
   - Validate all code blocks have proper language tags
   - Ensure proper closing of code fences
   - Check for special characters that need escaping

### Pre-Build Checklist

- [ ] All MDX files have metadata exports
- [ ] No anchor link syntax in headings
- [ ] No f-strings in code blocks
- [ ] No LaTeX math with `$$`
- [ ] Series navigation is correct
- [ ] No duplicate metadata exports
- [ ] **Series structure follows guidelines (no duplicate Part 1)**
- [ ] **Series landing page contains actual Part 1 content**
- [ ] **Individual parts start from part-2.mdx**

## Development Workflow

### When Adding New Content

1. Always add metadata export first
2. Use simple markdown syntax
3. Test build after major changes
4. Check series navigation links

### When Editing Existing Files

1. Preserve metadata structure
2. Don't add problematic syntax
3. Test compilation after edits
4. Update series links if needed

### When Adding New Series Content
1. **Plan the structure first**:
   - Landing page (`content.mdx`) = Part 1 content
   - Individual parts start from `part-2.mdx`
   - Never create both `content.mdx` overview AND `part-1.mdx`

2. **Always add metadata export first**
3. **Use simple markdown syntax**
4. **Test build after major changes**
5. **Check series navigation links**
6. **Verify only landing page appears in posts listing**

### PowerShell Commands for Bulk Fixes

```powershell
# Remove anchor links from all MDX files
Get-ChildItem "src\posts\**\*.mdx" | ForEach-Object {
  (Get-Content $_.FullName) -replace ' \{#[^}]*\}', '' | Set-Content $_.FullName
}

# Check for f-strings in MDX files
Get-ChildItem "src\posts\**\*.mdx" | Select-String 'f"'

# Check for LaTeX math expressions
Get-ChildItem "src\posts\**\*.mdx" | Select-String '\$\$'

# Fix f-strings in Python code blocks (convert to .format() or concatenation)
Get-ChildItem "src\posts\**\*.mdx" | ForEach-Object {
  (Get-Content $_.FullName) -replace 'f"([^"]*)\{([^}]*)\}([^"]*)"', '"$1{$2}$3".format($2)' | Set-Content $_.FullName
}
```

### F-String Conversion Examples

When updating code blocks in MDX files, use these patterns:

```python
# ❌ F-string (causes MDX parsing errors)
print(f"Hello {name}")
result = f"Score: {score:.2f}"
logging.error(f"Error in {module}: {e}")

# ✅ String concatenation (MDX-safe)
print("Hello " + name)
result = "Score: " + str(round(score, 2))
logging.error("Error in " + module + ": " + str(e))

# ✅ .format() method (MDX-safe)
print("Hello {}".format(name))
result = "Score: {:.2f}".format(score)
logging.error("Error in {}: {}".format(module, e))

# ✅ % formatting (MDX-safe)
print("Hello %s" % name)
result = "Score: %.2f" % score
logging.error("Error in %s: %s" % (module, e))
```

## File Organization

### Directory Structure

```
src/posts/
├── genai-mastery-series/
│   ├── content.mdx          # Landing page (Part 1 content)
│   ├── metadata.ts          # Series configuration (NO order field)
│   ├── part-2.mdx          # Part 2 (order: 2)
│   ├── part-3.mdx          # Part 3 (order: 3)
│   └── part-12.mdx         # Part 12 (order: 12)
├── other-posts/
│   └── post-name.mdx
public/
├── posts/                   # Static assets for posts
│   └── genai-mastery-series/
│       └── assets/          # Images, diagrams
```

### Asset Management

- Images: Place in `/public/posts/[series-name]/assets/`
- Reference: Use relative paths `./assets/image.png`
- Naming: Use kebab-case for consistency

## Content Guidelines

### Technical Accuracy

- Provide working code examples
- Test all code snippets
- Include proper imports and dependencies
- Use current best practices

### SEO Optimization

- Descriptive titles and excerpts
- Relevant tags for discoverability
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for images

### Series Consistency

- Maintain consistent tone and style
- Progressive complexity across parts
- Cross-reference related concepts
- Include practical examples

## Troubleshooting

### Build Command

```bash
npm run build
```

### Validation Commands

```bash
# Validate only GenAI Mastery series (12 parts expected)
npm run validate:genai

# Validate all MDX files
npm run validate:mdx

# Check for duplicate series parts appearing as standalone posts
npm run build && echo "Build successful - no duplicates"

# Quick syntax check for common MDX issues (PowerShell)
Get-ChildItem "src\posts\**\*.mdx" | Select-String 'f"|\\$\\$|\\{#' | Format-Table -AutoSize
```

### Common Fixes

1. **Series Structure Issues**: 
   - Check that landing page (`content.mdx`) contains Part 1 content with `order: 1`
   - Verify no `part-1.mdx` exists (causes duplicates)
   - Ensure individual parts start from `part-2.mdx`
   - Only landing page should appear in main posts listings

2. **Syntax errors**: Check MDX syntax compliance
3. **Missing metadata**: Add required metadata export
4. **Navigation issues**: Verify series links point to correct paths
5. **Asset errors**: Check image paths and file existence

### Debug Tools

- Next.js build output shows specific error locations
- Use VS Code MDX extensions for syntax validation
- Test individual files with `next dev`
- Use validation scripts to catch issues early

### Series Duplication Troubleshooting

**Problem**: Series parts appearing as standalone posts in main listing

**Root Cause**: Both `content.mdx` (landing page) and `part-1.mdx` exist with `order: 1`

**Solution**:
1. Choose one file as the actual Part 1:
   - Option A: Use `content.mdx` as Part 1, remove `part-1.mdx`
   - Option B: Use `part-1.mdx` as Part 1, make `content.mdx` an overview only
2. Update navigation links in `part-2.mdx` to point to the chosen Part 1
3. Update `metadata.ts` mapping if needed
4. Validate with `npm run validate:genai`

**Prevention**: Never create both files - pick one structure and stick to it

### F-String Syntax Issues (Common MDX Problem)

**Problem**: Build fails with "Could not parse expression with acorn" or validation shows F-string warnings

**Root Cause**: MDX parser conflicts with `{variable}` syntax inside f-strings in code blocks

**Solutions**:
1. **String Concatenation**: `"Hello " + name` 
2. **`.format()` Method**: `"Hello {}".format(name)`
3. **% Formatting**: `"Hello %s" % name`

**Bulk Fix Command**:
```powershell
# Convert simple f-strings to .format() method
Get-ChildItem "src\posts\**\*.mdx" | ForEach-Object {
  (Get-Content $_.FullName) -replace 'f"([^"]*)\{([^}]*)\}([^"]*)"', '"$1{$2}$3".format($2)' | Set-Content $_.FullName
}
```

**Find All F-strings**:
```powershell
Get-ChildItem "src\posts\**\*.mdx" | Select-String 'f"'
```

## AI Assistant Guidelines

When working with this project:

1. Always check existing patterns before suggesting new syntax
2. Prioritize build compatibility over advanced markdown features
3. Test suggestions against known error patterns
4. Provide complete, working examples
5. Consider the entire series when making changes
6. Follow the established naming and organization conventions

## Version History

- Created: 2025-06-20
- Last Updated: 2025-01-27
- Based on: GenAI Mastery series implementation and build error resolution
- Major Update: Added comprehensive series structure guidelines, F-string troubleshooting, and duplication prevention
