import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  
  const router = useRouter();
  const logout = () => {
    // remove user from local storage and redirect to login page
    localStorage.removeItem('accessToken');
    router.push('/login');
  }

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar style={{ backgroundColor: '#fff', border: '2px solid #f0f0f0' }}>
        <img src="https://www.pricelocq.com/assets/locq-logo-2019.png" width="10%" />
        <Box sx={{ flexGrow: 1 }} />
        <div style={{backgroundColor: '#6127b7', padding: '0.5em', marginRight: '-24px'}}>
          <IconButton color="inherit" onClick={logout} className="nav-item nav-link">
            <InputIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
