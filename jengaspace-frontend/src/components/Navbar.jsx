import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import '../index.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="logo">
        <Link to="/" className="nav-title">JengaSpace</Link>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>☰</div>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/listings" onClick={() => setMenuOpen(false)}>Listings</Link></li>

        {!user ? (
  <>
    <li><a href="/general-login">user Login</a></li>
    <li><Link to="/register" onClick={() => setMenuOpen(false)}>Landlord Register</Link></li>
    <li><Link to="/login" onClick={() => setMenuOpen(false)}>landlord Login</Link></li>
  </>
) : (
  <>
    <li>
      <Link
        to={user.is_admin ? "/admin/dashboard" : "/landlord-dashboard"}
        onClick={() => setMenuOpen(false)}
      >
        Dashboard
      </Link>
    </li>
    <li className="dropdown">
      <button className="dropdown-btn">
        <FiUser size={20} style={{ marginRight: '6px' }} />
        {user.name.split(' ')[0]}
      </button>
      <div className="dropdown-content">
        <p><strong>{user.name}</strong></p>
        <p>{user.email}</p>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </li>
  </>
)}

      </ul>
    </nav>
  );
}

export default Navbar;
