import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaSignOutAlt } from 'react-icons/fa';
import '../index.css';

const LandlordSidebar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="landlord-sidebar">
      <div className="sidebar-header">Landlord Panel</div>

      <nav className="sidebar-links">
        <Link className={isActive('/landlord-dashboard') ? 'active' : ''} to="/landlord-dashboard">
          <FaHome /> Dashboard
        </Link>

        <Link className={isActive('/add-property') ? 'active' : ''} to="/add-property">
          <FaPlus /> Add Property
        </Link>

        <Link className={isActive('/my-listings') ? 'active' : ''} to="/my-listings">
          <FaList /> My Listings
        </Link>

        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default LandlordSidebar;
