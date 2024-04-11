import { Link, Outlet } from 'react-router-dom';

const Footer = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 0,
      }}
    >
      <footer></footer>
    </div>
  );
};

/**
 * Horizontal navigation bar with Shop Name on the Left and Navigation Links on the Right
 * @returns
 */
const Navbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#333333',
        padding: '1rem',
      }}
    >
      <div>Web Shop</div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/products">Produkte</Link>
        <Link to="/cart">Warenkorb</Link>
        <Link to="/registration">Registrieren</Link>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          padding: '1rem',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            height: '100%',
          }}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
