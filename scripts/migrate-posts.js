const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const NEW_POSTS_DIR = path.join(process.cwd(), 'src/content/posts_new');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public/images');

// Create new posts directory if it doesn't exist
if (!fs.existsSync(NEW_POSTS_DIR)) {
  fs.mkdirSync(NEW_POSTS_DIR, { recursive: true });
}

// Function to extract image paths from markdown content
function extractImagePaths(content) {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  
  return images;
}

// Function to copy image to post assets directory
function copyImageToAssets(imagePath, postAssetsDir, postSlug) {
  try {
    // Handle both relative and absolute paths
    const sourcePath = imagePath.startsWith('/') 
      ? path.join(process.cwd(), 'public', imagePath)
      : path.join(POSTS_DIR, imagePath);

    if (fs.existsSync(sourcePath)) {
      const fileName = path.basename(imagePath);
      const targetPath = path.join(postAssetsDir, fileName);
      fs.copyFileSync(sourcePath, targetPath);
      return `./assets/${fileName}`;
    }

    // Check in public/images directory
    const publicImagePath = path.join(PUBLIC_IMAGES_DIR, path.basename(imagePath));
    if (fs.existsSync(publicImagePath)) {
      const fileName = path.basename(imagePath);
      const targetPath = path.join(postAssetsDir, fileName);
      fs.copyFileSync(publicImagePath, targetPath);
      return `./assets/${fileName}`;
    }

    console.warn(`Warning: Image not found: ${imagePath}`);
    return imagePath;
  } catch (error) {
    console.error(`Error copying image ${imagePath}:`, error);
    return imagePath;
  }
}

// Function to update image references in content
function updateImageReferences(content, imageMap) {
  let updatedContent = content;
  for (const [oldPath, newPath] of Object.entries(imageMap)) {
    const regex = new RegExp(`!\\[.*?\\]\\(${oldPath}\\)`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(oldPath, newPath);
    });
  }
  return updatedContent;
}

// Read all markdown files
const files = fs.readdirSync(POSTS_DIR)
  .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

// Process each file
files.forEach(file => {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = matter(content);
  
  // Create slug from filename
  const slug = path.basename(file, path.extname(file));
  
  // Create new directory for the post
  const postDir = path.join(NEW_POSTS_DIR, slug);
  const assetsDir = path.join(postDir, 'assets');
  
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Extract and process images from content
  const imagePaths = extractImagePaths(markdownContent);
  const imageMap = {};
  
  // Add frontmatter image if it exists
  if (data.image) {
    imagePaths.push(data.image);
  }
  
  // Process all images
  imagePaths.forEach(imagePath => {
    const newPath = copyImageToAssets(imagePath, assetsDir, slug);
    imageMap[imagePath] = newPath;
  });

  // Update content with new image paths
  const updatedContent = updateImageReferences(markdownContent, imageMap);

  // Update frontmatter image path if it exists
  if (data.image && imageMap[data.image]) {
    data.image = imageMap[data.image];
  }

  // Create new MDX file with updated frontmatter and content
  const newContent = matter.stringify(updatedContent, {
    ...data,
    slug: slug,
    url: `/${slug}`,
  });

  // Write the new MDX file
  fs.writeFileSync(path.join(postDir, 'index.mdx'), newContent);
  
  console.log(`Migrated ${file} to ${slug}/index.mdx`);
});

console.log('Migration complete!'); 