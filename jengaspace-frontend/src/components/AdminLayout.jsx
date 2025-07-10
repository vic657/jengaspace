
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../Sidebar.css'; // Optional: for layout styles

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet /> {/* This will render the nested admin pages */}
      </div>
    </div>
  );
}
