import { Link } from 'react-router-dom';
import '../index.css'; 


function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to <span className="brand-name">JengaSpace</span></h1>
        <p className="subtitle">Affordable homes at your fingertips. Fast, smart, and verified.</p>
        <Link to="/listings" className="button-primary">Explore Listings</Link>
      </header>

      {/* About Us Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          JengaSpace is a Kenyan-built housing platform that connects tenants with verified landlords in your region.
          We offer a fast and secure way to browse rentals, view details, and make informed decisions—without the hassle.
        </p>
      </section>

      {/* Features Section */}
      <section className="info-section">
        <h2>Why JengaSpace?</h2>
        <ul>
          <li> Filter by region and rent range</li>
          <li>See property images before visiting</li>
          <li> Get directions with integrated maps</li>
          <li> Verified landlords and secure payments</li>
        </ul>
      </section>

      {/* Contact Us Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or need support?</p>
        <p><strong>Email:</strong> support@jengaspace.ke</p>
        <p><strong>Phone:</strong> +254 700 123 456</p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} vicmass. Built for Kenya 🇰🇪</p>
      </footer>
    </div>
  );
}

export default Home;
