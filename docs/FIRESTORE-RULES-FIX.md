# Firestore Security Rules Setup

You're getting "Missing or insufficient permissions" because the Firestore security rules are blocking access to the `users` collection.

## Quick Fix: Update Firestore Security Rules

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `abstractalgorithms-3d9d6`
   - Navigate to **Firestore Database** → **Rules**

2. **Replace the current rules with this:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow admin users to read all user profiles
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Public collections (if any)
    match /posts/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Default deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. **Click "Publish"**

## Alternative: Temporary Open Rules (FOR TESTING ONLY)

If you want to test quickly, you can temporarily use open rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **WARNING**: Only use open rules for testing. Change them back to secure rules before production.

## Current Error Analysis

The error occurs here in your code:
```tsx
// useAuth.tsx line 56
const profileDoc = await getDoc(doc(db, 'users', user.uid));
```

This fails because:
1. ✅ User is authenticated (`test@example.com`)
2. ❌ Firestore rules deny access to `/users/{uid}` collection
3. The default rules probably only allow access to authenticated users for their own documents

## After Updating Rules

Once you update the Firestore rules, the same sign-in test should show:
```
🔄 Auth state changed: User logged in: test@example.com
🔄 Loading profile for authenticated user...
🔍 Loading user profile for UID: [uid]
📄 Profile document exists: true
📋 Profile data loaded: { role: "content-creator", email: "test@example.com", ... }
✅ Profile loaded successfully
```

## Manual User Document Creation

Since you set the role in Firebase Console, you might also need to create the Firestore document manually:

1. Go to **Firestore Database** → **Data**
2. Create collection: `users`
3. Add document with ID = user's UID
4. Add fields:
   ```
   email: "test@example.com"
   displayName: "Test User"
   role: "content-creator"
   createdAt: [timestamp]
   updatedAt: [timestamp]
   ```

Update the Firestore rules first, then try signing in again!
