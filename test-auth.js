// Quick test user creation script
// Copy and paste this into browser console when app is loaded

async function quickTestAuth() {
  try {
    console.log('🧪 Testing Firebase Auth...');
    
    // Get Firebase auth
    const { auth } = await import('/src/lib/firebase.js');
    const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = await import('firebase/auth');
    
    console.log('📱 Auth object:', auth);
    console.log('👤 Current user:', auth.currentUser);
    
    // Try to create a test user
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    try {
      console.log(`🔑 Attempting to sign in with ${testEmail}...`);
      const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
      console.log('✅ Signed in successfully:', userCredential.user.uid);
    } catch (signInError) {
      console.log('🔑 Sign in failed, trying to create user...');
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('✅ User created successfully:', userCredential.user.uid);
      } catch (createError) {
        console.error('❌ Failed to create user:', createError);
      }
    }
    
  } catch (error) {
    console.error('❌ Auth test failed:', error);
  }
}

// Export for manual execution
window.quickTestAuth = quickTestAuth;
console.log('🎯 Test script loaded! Run: quickTestAuth()');
