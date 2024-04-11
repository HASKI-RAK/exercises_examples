import { Link, Outlet } from 'react-router-dom';

const Footer = () => {
  return <footer>Footer</footer>;
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
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          padding: '1rem',
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
