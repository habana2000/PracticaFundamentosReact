import Button from '../shared/Button';

import { logout } from '../auth/service';
import classNames from 'classnames';

import './Header.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context';

const Header = ({ className }) => {
  const navigate = useNavigate();
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => { 
    const confirmed = window.confirm("Do you really want to log out?");
    if (confirmed) {
      await logout();
      onLogout();
      navigate('/login');
    }
  };

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <img 
            src="https://th.bing.com/th/id/OIP.M-e5j8-LdiK3jq9Bu5iI9QHaHa?pid=ImgDet&rs=1"
            alt="advert-react" 
            width="48" height="48"
            />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          className="header-nav-item"
          // className={({ isActive }) => (isActive ? 'selected' : '')}
          // style={({ isActive }) => (isActive ? { color: 'red' } : null)}
        >
          New Advert
        </NavLink>{' '}
        <NavLink to="/adverts" className="header-nav-item" end>
          See latest adverts
        </NavLink>
        {isLogged ? (
          <Button onClick={handleLogoutClick} className="header-button">
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            variant="primary"
            className="header-button"
            to="/login"
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
