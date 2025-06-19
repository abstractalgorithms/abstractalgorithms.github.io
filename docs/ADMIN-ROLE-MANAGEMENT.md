# Admin Role Management System

## 🎯 **Overview**

A complete admin dashboard for managing user roles in the Abstract Algorithms platform. This system allows administrators to view all users, change their roles, and manage permissions across the platform.

## ✨ **Features**

### **User Management Dashboard**
- View all registered users with their profiles
- Filter users by role (admin, editor, contributor, reader)
- Search users by name or email
- See user statistics and analytics
- Real-time user status (active/disabled)

### **Role Management**
- Change user roles with a single click
- Visual role indicators with icons and colors
- Permission-based access control
- Secure role validation

### **Admin Navigation**
- Dedicated admin layout with navigation
- Quick access to user management
- Links to analytics and settings (future features)
- Easy return to main site

## 🔐 **Role Hierarchy**

| Role | Permissions | Description |
|------|-------------|-------------|
| **Admin** | All permissions + user management | Full access to everything including user role management |
| **Editor** | Create, read, update content | Can manage content but not users |
| **Contributor** | Create, read content | Can create new content and read existing |
| **Reader** | Read content only | Basic user with read-only access |

### **Permission Details**
- `read` - View published content
- `create` - Create new content
- `update` - Edit existing content  
- `delete` - Remove content (admin only)
- `manage_users` - Change user roles (admin only)

## 🛠 **Implementation**

### **Frontend Components**

#### **AdminLayout** (`src/components/AdminLayout.tsx`)
- Provides consistent admin interface
- Access control for admin-only pages
- Navigation between admin sections
- Back-to-site functionality

#### **Admin Dashboard** (`src/app/admin/page.tsx`)
- User listing with search and filters
- Role change modal interface
- User statistics cards
- Responsive design for mobile/desktop

#### **User Menu Integration** (`src/components/UserMenu.tsx`)
- "Admin Dashboard" link for admin users
- Role-based menu item display
- Secure access to admin features

### **Backend Integration**

#### **API Routes** (`src/app/api/admin/users/route.ts`)
- GET `/api/admin/users` - List all users (admin only)
- PUT `/api/admin/users` - Update user role (admin only)
- Integrates with Firebase Admin SDK

#### **Firebase Auth Service** (Server-side)
- `listUsers()` - Fetch all user records
- `updateUserProfile()` - Change user roles
- `requirePermission()` - Validate admin access
- Firebase Authentication + Firestore integration

## 🚀 **Usage**

### **For Admin Users**

1. **Access Admin Dashboard**
   - Sign in as an admin user
   - Click your profile menu → "Admin Dashboard"
   - Or navigate to `/admin`

2. **View Users**
   - See all registered users in a table
   - View user details: name, email, role, join date
   - Check user status (active/disabled)

3. **Change User Roles**
   - Click "Edit Role" next to any user
   - Select the new role from the modal
   - Confirm the change
   - Changes take effect immediately

4. **Search and Filter**
   - Use search box to find users by name/email
   - Filter by role using the dropdown
   - View statistics in the dashboard cards

### **For Developers**

#### **Adding New Roles**
1. Update the role type in `src/hooks/useAuth.tsx`:
```typescript
role: 'admin' | 'editor' | 'contributor' | 'reader' | 'newrole';
```

2. Add permissions in `FirebaseAuthService.js`:
```javascript
const rolePermissions = {
  // ...existing roles
  newrole: ['read', 'create']
};
```

3. Update UI components:
- Add role icon in `getRoleIcon()`
- Add role color in `getRoleColor()`
- Update admin dashboard role options

#### **Adding Admin Features**
1. Create new pages under `/admin/` directory
2. Wrap with `AdminLayout` component
3. Add navigation links in `AdminLayout.tsx`
4. Implement API endpoints under `/api/admin/`

## 🔧 **Configuration**

### **Environment Variables**
```bash
# Firebase Admin SDK (required for user management)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Client Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

### **Firebase Security Rules**
```javascript
// Firestore rules for user management
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.uid == userId || 
         request.auth.token.role == 'admin');
    }
  }
}
```

## 🛡 **Security Features**

### **Access Control**
- Route-level protection for admin pages
- API-level permission validation
- Firebase ID token verification
- Role-based UI component rendering

### **Data Protection**
- User data filtered by permissions
- Secure Firebase Admin SDK integration
- No sensitive data exposed to client
- Audit trail for role changes (future)

## 📱 **User Experience**

### **Admin Interface**
- Clean, modern design with Tailwind CSS
- Responsive layout works on all devices
- Intuitive role change workflow
- Real-time updates without page refresh

### **User Feedback**
- Success/error messages for actions
- Loading states during operations
- Visual confirmation of role changes
- Search and filter for large user lists

## 🔮 **Future Enhancements**

### **Planned Features**
- [ ] Bulk role updates
- [ ] User activity analytics
- [ ] Role change audit log
- [ ] Email notifications for role changes
- [ ] Advanced user search
- [ ] Export user data
- [ ] User invitation system
- [ ] Custom role creation

### **Analytics Dashboard**
- [ ] User registration trends
- [ ] Role distribution charts
- [ ] Active user metrics
- [ ] Content creation by role

## 🚨 **Troubleshooting**

### **Common Issues**

**1. "Access Denied" when accessing admin**
- Verify user has 'admin' role in Firestore
- Check Firebase ID token is valid
- Ensure user is signed in

**2. Role changes not working**
- Verify Firebase Admin SDK configuration
- Check API endpoint returns success
- Ensure proper permissions in Firebase

**3. Users not loading**
- Check Firebase service account key
- Verify API route is accessible
- Look for CORS issues in browser console

### **Debug Commands**
```bash
# Check user role in Firebase console
# Firestore → users → [uid] → role

# Test API endpoints
curl -H "Authorization: Bearer <token>" \
  http://localhost:3001/api/admin/users

# Check server logs
netlify dev  # for server development
npm run dev  # for UI development
```

## 📚 **Related Documentation**

- [Firebase Authentication Guide](./FIREBASE-TROUBLESHOOTING.md)
- [Role-Based Access Control](./FIREBASE-ARCHITECTURE.md)
- [User Management API](../docs/API.md)
- [Security Best Practices](../docs/SECURITY.md)

---

**🎉 Your admin role management system is now complete!** 

Users with admin privileges can access the dashboard at `/admin` and manage all user roles with a beautiful, secure interface.
