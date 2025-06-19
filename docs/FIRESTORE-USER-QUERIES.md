# Firestore User Collection Queries

This document provides sample queries for inserting and managing user entries in the Firestore `users` collection.

## Collection Structure

The `users` collection follows this structure:
```javascript
{
  uid: "firebase-user-uid",
  email: "user@example.com", 
  displayName: "User Name",
  role: "user" | "admin" | "content-creator",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLogin: Timestamp
}
```

## 1. Firebase Console (Web Interface)

### Steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Firestore Database
4. Click "Start collection" or navigate to existing `users` collection
5. Click "Add document"
6. Use the user's Firebase UID as the document ID
7. Add the following fields:

```
Document ID: [Firebase UID - e.g., "kJ8x2mP4qYR7nZ9vB1cA3eF5gH"]

Fields:
- email (string): "admin@example.com"
- displayName (string): "Admin User"
- role (string): "admin"
- createdAt (timestamp): [Current timestamp]
- updatedAt (timestamp): [Current timestamp]
- lastLogin (timestamp): [Current timestamp]
```

## 2. JavaScript/Node.js Code

### Using Firebase Admin SDK (Server-side):

```javascript
const admin = require('firebase-admin');

// Initialize Firebase Admin (if not already done)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

async function createUser(uid, userData) {
  try {
    await db.collection('users').doc(uid).set({
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role || 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    console.log('User created successfully:', uid);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Example usage:
createUser('kJ8x2mP4qYR7nZ9vB1cA3eF5gH', {
  email: 'admin@example.com',
  displayName: 'Admin User',
  role: 'admin'
});
```

### Using Firebase Client SDK (Client-side):

```javascript
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function createUserDocument(uid, userData) {
  try {
    await setDoc(doc(db, 'users', uid), {
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role || 'user',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    
    console.log('User document created successfully');
  } catch (error) {
    console.error('Error creating user document:', error);
  }
}

// Example usage:
createUserDocument('kJ8x2mP4qYR7nZ9vB1cA3eF5gH', {
  email: 'admin@example.com',
  displayName: 'Admin User',
  role: 'admin'
});
```

## 3. Firestore REST API

### Using curl:

```bash
curl -X POST \
  "https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/users/USER_UID" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "email": {"stringValue": "admin@example.com"},
      "displayName": {"stringValue": "Admin User"},
      "role": {"stringValue": "admin"},
      "createdAt": {"timestampValue": "2024-01-01T00:00:00Z"},
      "updatedAt": {"timestampValue": "2024-01-01T00:00:00Z"},
      "lastLogin": {"timestampValue": "2024-01-01T00:00:00Z"}
    }
  }'
```

## 4. Batch Operations

### Creating multiple users at once:

```javascript
const admin = require('firebase-admin');
const db = admin.firestore();

async function createMultipleUsers(users) {
  const batch = db.batch();
  
  users.forEach(user => {
    const userRef = db.collection('users').doc(user.uid);
    batch.set(userRef, {
      email: user.email,
      displayName: user.displayName,
      role: user.role || 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  
  try {
    await batch.commit();
    console.log('All users created successfully');
  } catch (error) {
    console.error('Error creating users:', error);
  }
}

// Example usage:
const usersToCreate = [
  {
    uid: 'admin-uid-1',
    email: 'admin1@example.com',
    displayName: 'Admin One',
    role: 'admin'
  },
  {
    uid: 'creator-uid-1', 
    email: 'creator1@example.com',
    displayName: 'Content Creator One',
    role: 'content-creator'
  },
  {
    uid: 'user-uid-1',
    email: 'user1@example.com', 
    displayName: 'Regular User One',
    role: 'user'
  }
];

createMultipleUsers(usersToCreate);
```

## 5. Sample Data for Testing

Here are some sample user entries you can use for testing:

### Admin User:
```javascript
{
  uid: "admin-test-uid-123",
  email: "admin@abstractalgorithms.com",
  displayName: "Site Administrator", 
  role: "admin"
}
```

### Content Creator:
```javascript
{
  uid: "creator-test-uid-456",
  email: "creator@abstractalgorithms.com",
  displayName: "Content Creator",
  role: "content-creator"
}
```

### Regular User:
```javascript
{
  uid: "user-test-uid-789",
  email: "user@example.com",
  displayName: "Regular User",
  role: "user"
}
```

## Important Notes

1. **Document ID**: Always use the Firebase Authentication UID as the document ID for consistency
2. **Role Values**: Valid roles are: `"user"`, `"admin"`, `"content-creator"`
3. **Timestamps**: Use server timestamps when possible for accuracy
4. **Security**: Ensure proper Firestore security rules are in place
5. **Authentication**: Users must exist in Firebase Authentication before creating Firestore documents

## Getting Firebase UID

There are several ways to get a user's Firebase UID depending on your scenario:

### 1. From Firebase Console (Web Interface)

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** > **Users**
4. Find the user in the list
5. Copy their UID from the "User UID" column

**When to use:** When you need to manually create user documents for existing authenticated users.

### 2. From Your Application Code

#### After User Authentication:
```javascript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user } = useAuth();
  
  if (user) {
    console.log('Current user UID:', user.uid);
    // Use user.uid to create/update Firestore document
  }
}
```

#### In Browser Console (for current user):
```javascript
// Open browser console (F12) and run:
const auth = getAuth();
const currentUser = auth.currentUser;
if (currentUser) {
  console.log('Current user UID:', currentUser.uid);
} else {
  console.log('No user logged in');
}
```

#### Using Firebase Auth State Listener:
```javascript
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User UID:', user.uid);
    // Create Firestore document here
  }
});
```

### 3. Create Test Users and Get Their UIDs

#### Method A: Using Firebase Console
1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Copy the generated UID

#### Method B: Using Your App's Sign-Up
1. Go to your app's sign-up page
2. Create a new account
3. Check browser console or use auth state listener to get UID

#### Method C: Programmatically (Admin SDK)
```javascript
const admin = require('firebase-admin');

async function createTestUser() {
  try {
    const userRecord = await admin.auth().createUser({
      email: 'test@example.com',
      password: 'testpassword123',
      displayName: 'Test User',
    });
    
    console.log('Created user with UID:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
```

### 4. Getting UID from Email (if user exists)

#### Using Admin SDK:
```javascript
const admin = require('firebase-admin');

async function getUidByEmail(email) {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    console.log('User UID:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

// Usage:
getUidByEmail('user@example.com');
```

### 5. During User Registration (Automatic)

In your sign-up flow, you can automatically create the Firestore document:

```javascript
// In your auth hook or sign-up component
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

async function signUpAndCreateProfile(email, password, displayName) {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Automatically create Firestore document with the new UID
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName,
      role: 'user', // Default role
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    
    console.log('User created with UID:', user.uid);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
```

### Quick Reference: Common UIDs for Testing

For testing purposes, you might want to use predictable UIDs:

```javascript
// Sample test UIDs (these won't work unless you create users with these exact UIDs)
const testUIDs = {
  admin: 'admin-test-uid-123456789',
  creator: 'creator-test-uid-123456789', 
  user: 'user-test-uid-123456789'
};
```

**Note:** Firebase generates random UIDs automatically. You cannot choose custom UIDs when creating users through normal authentication methods.

## Utility Script

You can also use the provided utility script:

```bash
cd scripts
node make-admin.js
```

This script will make the currently authenticated user an admin.
