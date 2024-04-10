import { Outlet } from 'react-router-dom';
const Header = () => {
  return <header>Header</header>;
};

const Footer = () => {
  return <footer>Footer</footer>;
};

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
