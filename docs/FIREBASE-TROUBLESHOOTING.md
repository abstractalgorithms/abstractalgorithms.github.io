# Firebase 400 Error Troubleshooting Guide

## Current Error Analysis
- **URL**: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword`
- **Status**: 400 Bad Request
- **API Key**: `AIzaSyCkkUj8ZGtALzwKQo8ImVAAnnhGYL6qs_4`
- **Project ID**: `abstractalgorithms-3d9d6`

## Common Causes & Solutions

### 1. Email/Password Authentication Not Enabled
**Most Likely Cause**: Email/Password provider is not enabled in Firebase Console.

**How to Fix**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `abstractalgorithms-3d9d6`
3. Go to **Authentication** → **Sign-in method**
4. Click on **"Email/Password"**
5. Enable the **"Email/Password"** toggle
6. Click **"Save"**

### 2. API Key Restrictions
**Possible Cause**: API key is restricted to specific domains.

**How to Check**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `abstractalgorithms-3d9d6`
3. Go to **APIs & Services** → **Credentials**
4. Find your API key: `AIzaSyCkkUj8ZGtALzwKQo8ImVAAnnhGYL6qs_4`
5. Check **Application restrictions**:
   - Should be "None" or include `localhost:3000`
   - Should include your production domain

### 3. Identity Toolkit API Not Enabled
**Possible Cause**: Required APIs are not enabled.

**How to Fix**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `abstractalgorithms-3d9d6`
3. Go to **APIs & Services** → **Library**
4. Search for and enable:
   - **Identity and Access Management (IAM) API**
   - **Cloud Resource Manager API**
   - **Firebase Management API**

### 4. Invalid Request Payload
**Possible Cause**: The sign-in request has invalid data.

**Common Issues**:
- Empty email/password fields
- Invalid email format
- Password too short (< 6 characters)
- Special characters in password not properly encoded

### 5. Project Configuration Issues
**Possible Cause**: Firebase project not properly set up.

**How to Check**:
1. Verify project exists: `abstractalgorithms-3d9d6`
2. Check if billing is enabled (required for authentication)
3. Verify you have proper permissions on the project

## Immediate Actions to Take

### Step 1: Check Firebase Console
1. Visit: https://console.firebase.google.com/project/abstractalgorithms-3d9d6/authentication/providers
2. Verify **Email/Password** is **enabled**
3. If not enabled, enable it now

### Step 2: Test with Simple Credentials
Try signing in with:
- **Email**: `test@example.com`
- **Password**: `password123`

### Step 3: Check Browser Console
1. Open browser Developer Tools (F12)
2. Go to **Console** tab
3. Look for detailed error messages
4. Check **Network** tab for the actual request/response

### Step 4: Verify Environment Variables
Ensure these are set correctly in `.env.local`:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCkkUj8ZGtALzwKQo8ImVAAnnhGYL6qs_4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=abstractalgorithms-3d9d6.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=abstractalgorithms-3d9d6
```

### Step 5: Test Firebase Config
Add this test to verify Firebase is properly initialized:

```javascript
// Add to browser console
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});
```

## Quick Fix Commands

### Restart Development Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Clear Browser Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Test Firebase Connection
```javascript
// Test in browser console
import { auth } from './src/lib/firebase'
console.log('Auth instance:', auth)
console.log('App config:', auth.app.options)
```

## Expected Success Response
When working correctly, you should see:
- **Status**: 200 OK
- **Response**: Contains `idToken`, `email`, `refreshToken`
- **No console errors**

## Next Steps if Still Failing
1. Check Firebase Console project settings
2. Verify billing is enabled
3. Try creating a new test user in Firebase Console
4. Check if other Firebase services work (Firestore, Storage)
5. Consider creating a new Firebase project for testing
