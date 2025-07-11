import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaMoneyCheckAlt } from 'react-icons/fa'; // added icon
import '../index.css';

const LandlordSidebar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="landlord-sidebar">
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

        <Link className={isActive('/landlord-payments') ? 'active' : ''} to="/landlord-payments">
          <FaMoneyCheckAlt /> Payments
        </Link>
      </nav>
    </aside>
  );
};

export default LandlordSidebar;
