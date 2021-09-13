import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
  } from '@material-ui/core';
  import { Search as SearchIcon } from 'react-feather';
  
  const StationListToolbar = (props) => (
    <Box {...props}>
        <div>
            <h1 style={{ color: '#464e78' }}>PriceLOCQ for Business Stations</h1>
            <p style={{ color: '#7d7f88', fontSize: '16px', marginTop: '-20px' }}>View list of stations</p>
        </div>
        {/* <Box sx={{ mt: 3 }}>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Station Name"
              />
            </Box>
        </Box> */}
    </Box>
  );
  
  export default StationListToolbar;
  