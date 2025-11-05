import Header from './Header';
import Footer from './Footer';
import ClientLayout from './ClientLayout';
import LoadingManager from '../LoadingManager';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LoadingManager>
      <Header />
      <ClientLayout>
        {children}
        <Footer />
      </ClientLayout>
    </LoadingManager>
  );
};

export default Layout;
