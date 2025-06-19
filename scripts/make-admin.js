// Admin Setup Utility
// Run this in your browser console after signing up to make yourself admin

async function makeCurrentUserAdmin() {
  try {
    // Get current user
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      console.error('No user logged in');
      return;
    }

    // Get Firebase token
    const idToken = await user.getIdToken();
    
    // Update user role to admin
    const response = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        uid: user.uid, 
        role: 'admin' 
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Successfully made user admin!');
      console.log('🔄 Please refresh the page to see admin features');
    } else {
      console.error('❌ Failed to make user admin:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Uncomment the line below and run this script in browser console
// makeCurrentUserAdmin();
