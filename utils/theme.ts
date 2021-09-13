import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: blue,
  },
});

export default theme;