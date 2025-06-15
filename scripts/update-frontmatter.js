const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(process.cwd(), 'src/content/posts');

// Function to generate description from content
function generateDescription(content) {
  // Remove markdown symbols and get first paragraph
  const paragraphs = content.split('\n\n');
  const firstParagraph = paragraphs.find(p => 
    !p.startsWith('---') && p.trim().length > 0
  )?.replace(/[#*`]/g, '').trim() || '';
  
  return firstParagraph.length > 160 ? firstParagraph.slice(0, 157) + '...' : firstParagraph;
}

// Function to format YAML frontmatter
function formatFrontmatter(data) {
  const formattedData = { ...data };

  // Ensure date is in correct format
  if (formattedData.date) {
    const date = new Date(formattedData.date);
    formattedData.date = date.toISOString();
  }

  // Format categories as array of strings
  if (formattedData.categories) {
    if (typeof formattedData.categories === 'string') {
      formattedData.categories = formattedData.categories
        .replace(/[\[\]]/g, '')
        .split(',')
        .map(cat => cat.trim());
    }
  }

  // Format tags as array of strings
  if (formattedData.tags) {
    if (typeof formattedData.tags === 'string') {
      formattedData.tags = formattedData.tags
        .replace(/[\[\]]/g, '')
        .split(',')
        .map(tag => tag.trim());
    }
  }

  return formattedData;
}

// Process each markdown file
fs.readdirSync(postsDir).forEach(filename => {
  if (!filename.endsWith('.md')) return;

  const filePath = path.join(postsDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  try {
    const { data, content } = matter(fileContent);
    const formattedData = formatFrontmatter(data);

    // Add description if missing
    if (!formattedData.description) {
      formattedData.description = generateDescription(content);
    }

    // Create updated content
    const updatedContent = matter.stringify(content, formattedData);

    // Write back to file
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${filename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
});
