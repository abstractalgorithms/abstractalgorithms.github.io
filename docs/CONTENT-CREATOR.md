# Content Creator Guide

## 🎨 **Overview**

The Content Creator is a comprehensive, step-by-step tool for creating professional blog posts and learning series for your Abstract Algorithms website. It provides a guided workflow with live preview, image management, and automatic file generation.

## 🚀 **Access**

**Development Mode Only:**
- URL: `http://localhost:3000/content-creator`
- Navigation: Look for the "Create" button in the header (blue button, only visible in development)

**Note:** The content creator is only available in development mode for security reasons. It's not deployed to production.

## 📝 **Content Types**

### **1. Independent Article**
- Standalone blog post covering a specific topic
- Perfect for focused, in-depth articles
- Examples: "Hash Tables Guide", "Database Optimization Tips"

### **2. Learning Series**
- Multi-part learning series with structured navigation
- Ideal for comprehensive guides and step-by-step tutorials
- Examples: "Big O Notation Mastery (8 parts)", "System Design Interview Series"

## 🛠️ **Step-by-Step Workflow**

### **Independent Article Steps:**
1. **Basic Information** - Title, author, date, excerpt, tags
2. **Content Creation** - Write in MDX with live preview
3. **Images & Assets** - Upload and manage images
4. **Preview & Generate** - Review and download files

### **Learning Series Steps:**
1. **Series Information** - Series name, description, structure
2. **Post Information** - This post's title and details
3. **Content Creation** - Write in MDX with live preview
4. **Images & Assets** - Upload and manage images
5. **Preview & Generate** - Review and download files

## 🖼️ **Image Management**

### **Upload Features:**
- **Drag & Drop:** Easy image upload interface
- **Multiple Formats:** JPG, PNG, GIF, WebP supported
- **Alt Text:** Accessibility-friendly alt text for each image
- **Auto-Reference:** Automatic image path generation for MDX

### **Image Usage in Content:**
```mdx
![Alt text description](./assets/image-name.jpg)
```

The tool automatically generates these references when you upload images.

## ✨ **MDX Editor Features**

### **Live Preview:**
- Toggle between edit and preview modes
- Real-time rendering of markdown elements
- Syntax highlighting for code blocks

### **Supported MDX Elements:**
```mdx
# Headers (H1-H6)
**Bold text** and *italic text*
[Links](https://example.com)
`inline code` and code blocks
- Lists and numbered lists
![Images](./assets/image.jpg)
> Blockquotes
Tables and more!
```

### **Code Blocks:**
```javascript
function example() {
  return 'Syntax highlighting supported!'
}
```

## 🏷️ **Tag Management**

### **Predefined Tags:**
The tool includes 40+ predefined tags:
- Technical: `algorithms`, `data-structures`, `system-design`
- Languages: `javascript`, `python`, `typescript`
- Concepts: `performance`, `optimization`, `scalability`
- And many more...

### **Custom Tags:**
You can also add custom tags for specific content.

## 📁 **File Generation**

### **What Gets Created:**

#### **For Independent Posts:**
```
src/posts/your-post-slug/
├── metadata.ts          # Post metadata and configuration
└── content.mdx          # Your article content

public/posts/your-post-slug/
└── assets/              # Images and assets
    ├── image1.jpg
    └── image2.png
```

#### **For Series Posts:**
```
src/posts/series-slug/
├── metadata.ts          # Series metadata with navigation
└── content.mdx          # Main post content

public/posts/series-slug/
└── assets/              # Shared series assets
    └── images...
```

### **Generated Files:**

1. **metadata.ts** - TypeScript metadata file with:
   - Post information (title, date, author, etc.)
   - Tags and categorization
   - Series information (if applicable)
   - Navigation structure

2. **content.mdx** - MDX content file with:
   - Your article content
   - Automatic image references
   - Proper MDX formatting

3. **Folder Structure Guide** - Setup instructions

## 🔄 **Integration Workflow**

### **Automatic Setup (Recommended):**
1. Use the content creator to generate files
2. Files are automatically created in the correct project structure
3. Run `npm run build:check` to regenerate static data
4. Run `npm run dev` to see your new post
5. Visit `http://localhost:3000/posts/your-slug`

### **Manual Setup (Fallback):**
1. Download generated files
2. Create folder: `src/posts/your-slug/`
3. Place `metadata.ts` and `content.mdx` in that folder
4. Create `public/posts/your-slug/assets/` for images
5. Upload your images to the assets folder
6. Run build commands as above

## 🎯 **Best Practices**

### **Title & Excerpt:**
- **Compelling Titles:** Use action words and clear benefits
- **SEO-Friendly:** Include relevant keywords naturally
- **Engaging Excerpts:** Summarize value proposition in 1-2 sentences

### **Content Structure:**
- **Clear Headers:** Use H2/H3 hierarchy consistently
- **Short Paragraphs:** Keep paragraphs 2-3 sentences max
- **Code Examples:** Include practical, working examples
- **Visual Aids:** Use images, diagrams, and code blocks effectively

### **Series Organization:**
- **Logical Progression:** Each part builds on previous knowledge
- **Consistent Naming:** Use clear, descriptive part titles
- **Cross-References:** Link between related parts when relevant

### **Image Optimization:**
- **Descriptive Alt Text:** Essential for accessibility
- **Reasonable File Sizes:** Optimize images before upload
- **Relevant Content:** Images should support and enhance text

## 🔧 **Technical Features**

### **Smart File Generation:**
- **Slug Generation:** Automatic URL-friendly slug creation
- **Metadata Validation:** Ensures all required fields are present
- **Path Resolution:** Correct relative paths for images
- **Type Safety:** TypeScript metadata for better development experience

### **Preview System:**
- **Live Rendering:** Real-time preview of MDX content
- **Responsive Design:** Mobile-friendly preview
- **Error Handling:** Graceful handling of preview errors

### **Development Integration:**
- **API Endpoints:** Server-side file creation when possible
- **Fallback System:** Client-side generation as backup
- **Build Integration:** Works with existing build system

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **"Cannot create files automatically"**
- **Solution:** Use manual setup workflow
- **Download:** All files and follow setup instructions
- **Check:** File permissions in your project directory

#### **"Images not displaying"**
- **Solution:** Verify image paths and placement
- **Check:** Images are in `public/posts/[slug]/assets/`
- **Verify:** Image references use `./assets/filename.ext` format

#### **"Post not appearing"**
- **Solution:** Run `npm run build:check` to regenerate data
- **Verify:** Folder structure matches requirements
- **Check:** Metadata file is valid TypeScript

### **Development Mode Issues:**
- **Content Creator not visible:** Ensure you're in development mode (`npm run dev`)
- **API errors:** Check server console for detailed error messages
- **Build errors:** Validate generated metadata.ts syntax

## 🎉 **Tips for Success**

1. **Start Simple:** Begin with independent posts before trying series
2. **Use Preview:** Always preview content before generating files
3. **Organize Images:** Name images descriptively for easy management
4. **Test Builds:** Run build check after creating content
5. **Iterate:** Use the tool regularly to become proficient

## 📞 **Support**

The Content Creator is designed to streamline your content creation workflow. If you encounter issues:

1. Check this documentation
2. Verify file structure and permissions
3. Use manual setup as fallback
4. Check development console for error details

Happy content creating! ✨
