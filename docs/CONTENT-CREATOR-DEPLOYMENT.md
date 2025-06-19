# Content Creator Deployment Guide

This guide explains how to deploy the Abstract Algorithms content creation system with proper API endpoints.

## Architecture Overview

The content creation system consists of two parts:
1. **Main Website** (`abstractalgorithms.github.io`) - Contains the content creator UI
2. **Server Functions** (`abstractalgorithms.server`) - Handles content creation and image uploads via Netlify Functions

## Deployment Steps

### 1. Deploy the Server Functions

1. **Navigate to the server directory:**
   ```bash
   cd abstractalgorithms.server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file based on `.env.example`:
   ```bash
   GITHUB_TOKEN=your_github_personal_access_token
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=production
   ```

4. **Deploy to Netlify:**
   ```bash
   npm run deploy
   ```

   Or connect the repository to Netlify for auto-deployment.

### 2. Configure GitHub Token

1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Create a token with `repo` permissions
3. Add it to your Netlify environment variables as `GITHUB_TOKEN`

### 3. Deploy the Main Website

1. **Set production environment variables:**
   Update `.env.production` with your server URL:
   ```bash
   NEXT_PUBLIC_SERVER_URL=https://your-server-name.netlify.app/api
   ```

2. **Deploy to GitHub Pages or Vercel**

### 4. Test the Deployment

1. Visit your deployed website
2. Navigate to `/content-creator`
3. Test creating a post with images
4. Verify files are created in the GitHub repository

## API Endpoints

The server provides these endpoints:

- `POST /api/create-post` - Creates post files in the GitHub repository
- `POST /api/upload-image` - Uploads images to the repository
- `GET /api/get-views` - Analytics (existing)
- `POST /api/track-view` - Analytics (existing)

## Environment Variables

### Main Website (abstractalgorithms.github.io)
```bash
NEXT_PUBLIC_SERVER_URL=https://your-server.netlify.app/api
NEXT_PUBLIC_SITE_URL=https://abstractalgorithms.dev
```

### Server (abstractalgorithms.server)
```bash
GITHUB_TOKEN=your_github_token
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
```

## Local Development

### Start the Server Functions
```bash
cd abstractalgorithms.server
npm run dev
```
This starts the Netlify Dev server on port 3001.

### Start the Main Website
```bash
cd abstractalgorithms.github.io
npm run dev
```
This starts the Next.js development server on port 3000.

### Local Environment Variables
Create `.env.local` in the main project:
```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:3001/api
```

## Security Considerations

1. **GitHub Token**: Ensure your GitHub token has minimal required permissions (only `repo` scope)
2. **CORS**: The server is configured to only allow requests from your domain
3. **File Validation**: Both client and server validate file types for images
4. **Rate Limiting**: Consider adding rate limiting for production use

## Troubleshooting

### Images Not Uploading
1. Check GitHub token permissions
2. Verify CORS settings match your domain
3. Check Netlify function logs for errors

### Posts Not Creating
1. Verify GitHub token has `repo` permissions
2. Check that the repository name is correct in the server functions
3. Ensure the branch name is correct (usually `main`)

### API Calls Failing
1. Check that `NEXT_PUBLIC_SERVER_URL` is set correctly
2. Verify the server is deployed and accessible
3. Check browser console for CORS errors

## File Structure

After deployment, created posts will have this structure:
```
src/posts/post-slug/
├── metadata.ts     # Post metadata
└── content.mdx     # Post content

public/posts/post-slug/
└── assets/         # Uploaded images
```

## Limitations

1. **File Size**: Netlify Functions have a 6MB limit for request bodies
2. **GitHub API**: Subject to GitHub API rate limits
3. **Concurrent Uploads**: Large batches of images may need to be processed sequentially
