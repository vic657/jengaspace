import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && !user.is_admin) return <Navigate to="/unauthorized" />;

  return children;
}
