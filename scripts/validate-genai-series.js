#!/usr/bin/env node

/**
 * Validate only GenAI Mastery series MDX files
 * Run with: npm run validate:genai
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Validating GenAI Mastery series MDX files...');

const errors = [];
const seriesDir = 'src/posts/genai-mastery-series';

// Find all MDX files in the series directory
function findMdxFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && entry.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const mdxFiles = findMdxFiles(seriesDir);

mdxFiles.forEach(file => {
  if (!file.trim()) return;
  
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  // Check for metadata export
  if (!content.includes('export const metadata')) {
    errors.push(`❌ ${file}: Missing metadata export`);
  }
  
  // Check for duplicate metadata
  const metadataMatches = content.match(/export const metadata/g);
  if (metadataMatches && metadataMatches.length > 1) {
    errors.push(`❌ ${file}: Duplicate metadata exports found`);
  }
  
  // Check for anchor links
  lines.forEach((line, index) => {
    if (line.match(/\{#[^}]*\}/)) {
      errors.push(`❌ ${file}:${index + 1}: Anchor link syntax not allowed: ${line.trim()}`);
    }
    
    // Check for f-strings in code blocks
    if (line.includes('f"') && !line.trim().startsWith('//') && !line.trim().startsWith('#')) {
      errors.push(`❌ ${file}:${index + 1}: F-string syntax may cause parsing issues: ${line.trim()}`);
    }
    
    // Check for LaTeX math
    if (line.includes('$$')) {
      errors.push(`❌ ${file}:${index + 1}: LaTeX math syntax not supported: ${line.trim()}`);
    }
  });
});

if (errors.length > 0) {
  console.log('\n🚨 GenAI Mastery Series Validation Errors:');
  errors.forEach(error => console.log(error));
  console.log('\n💡 See .copilot-instructions.md for fixes');
  process.exit(1);
}

console.log('✅ All GenAI Mastery series MDX files validated successfully!');
