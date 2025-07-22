import { NavLink } from 'react-router-dom';
import '../Sidebar.css';

export default function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/admin/requests"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Requests
        </NavLink>

        <NavLink to="/admin/landlords" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          My Landlords
        </NavLink>
        
        <NavLink to="/admin/tenants" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Tenants
        </NavLink>
        <NavLink
        to="/admin/manage-listings"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Properties
      </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Settings
        </NavLink>
      </nav>
    </div>
  );
}
