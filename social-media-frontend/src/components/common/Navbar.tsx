import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SocialMediaApp
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;