import AdminUserView from './AdminUserView';

// For static export compatibility - admin pages should not be pre-generated
export async function generateStaticParams() {
  // Return empty array since admin pages are dynamic and require authentication
  return [];
}

export default function AdminUserProfilePage() {
  return <AdminUserView />;
}
