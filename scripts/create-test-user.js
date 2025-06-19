// Create Test User Script
// Run this in your browser console to create a test user and get their UID

async function createTestUser(email, password, displayName, role = 'user') {
  try {
    console.log(`Creating test user: ${email}`);
    
    // Import Firebase functions (assuming they're available globally)
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    
    // Get auth and db (adjust import path as needed)
    const auth = getAuth();
    const db = getFirestore();
    
    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Auth user created with UID:', user.uid);
    
    // Create Firestore profile
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName,
      role: role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    
    console.log('✅ Firestore profile created');
    console.log('📋 Copy this UID:', user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: role
    };
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('💡 User already exists. Try signing in to get their UID.');
    }
  }
}

// Usage examples (uncomment the one you want to use):

// Create admin user
// createTestUser('admin@test.com', 'password123', 'Test Admin', 'admin');

// Create content creator
// createTestUser('creator@test.com', 'password123', 'Test Creator', 'content-creator');

// Create regular user  
// createTestUser('user@test.com', 'password123', 'Test User', 'user');

console.log('📝 Test user creation script loaded!');
console.log('📋 Copy and paste one of the function calls above to create a user.');
