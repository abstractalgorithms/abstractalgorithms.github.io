import AdminUserView from './AdminUserView';

// For static export compatibility - we need to provide at least one static param
export async function generateStaticParams() {
  // Generate a placeholder route for static export
  // In a real app, this would fetch actual user IDs
  return [
    { id: 'placeholder' }
  ];
}

// This ensures the page is treated as dynamic in client-side navigation
export const dynamic = 'force-dynamic';

export default function AdminUserProfilePage() {
  return <AdminUserView />;
}
