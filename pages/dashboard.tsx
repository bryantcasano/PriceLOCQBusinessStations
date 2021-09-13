import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Navbar from './components/navbar';
import Stations from './stations';
import router from 'next/router'

const LayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const LayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 35
  })
);

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const LayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const Layout = () => {

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token === null) {
      alert("You are not authorized to view this page.");
      location.href = '/login';
    }
  }, []);

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <LayoutRoot>
      <Navbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>
            <Stations />
          </LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
};

export default Layout;
