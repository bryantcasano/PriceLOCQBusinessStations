import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from '@material-ui/icons/Check';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';

const StationListResults = ({ stations }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

  interface stationRows {
    stationId: number,
    depotId: number,
    name: string,
    stationCode: number,
    mobileNumber: string,
    province: string,
    city: string,
    stationType: string,
    stationProduct: any,
        diesel: boolean,
        gas91: boolean,
        gas95: boolean,
        gas97: boolean
  }
  
  const [rows, setRows] = useState<stationRows[]>([]);
  const [searched, setSearched] = useState<string>("");
  const classes = useStyles();
  
  const params = {
        page: 1,
        perPage: 20
    }
    
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    useEffect(() => {
    if (token) {
        axios.get("https://staging.api.locq.com/ms-fleet/station", {
            headers: { Authorization: token },
            params
        })
        .then(response => {
            setRows(response.data.data.stations);
        })
        .catch(error => {
            throw error;
        });
    }
    }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = stations.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  
  return (
    <>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          
          placeholder="Station Name"
          style={{border: '1px solid #727272', marginTop: '-10px', marginBottom: '10px', boxShadow: 'none'}}
        />
    <Card style={{border: 'none', boxShadow: 'none', borderRadius: '0px'}}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }} style={{border: 'none', boxShadow: 'none', borderRadius: '0px'}}>
          <Table style={{border: 'none', boxShadow: 'none', borderRadius: '0px'}}>
            <TableHead
                style={{backgroundColor: '#fafafa'}}
            >
              <TableRow>
                <TableCell style={{fontWeight: 'bold'}}>
                  STATION NAME
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}}>
                  CITY/PROVINCE
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}}>
                  <FiberManualRecordIcon style={{fontSize: 'small', color: '#fca60b'}} /> DIESEL
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}}>
                  <FiberManualRecordIcon style={{fontSize: 'small', color: '#049f37'}} /> GAS 91
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}}>
                  <FiberManualRecordIcon style={{fontSize: 'small', color: '#ed3931'}} /> GAS 95
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}}>
                  <FiberManualRecordIcon style={{fontSize: 'small', color: '#2a468d'}} /> GAS 97
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * limit, page * limit + limit).map((station) => (
                <TableRow
                  hover
                  key={station.stationId}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {station.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>
                    {station.city} <br/>
                    <p style={{fontSize: '12px', marginTop: '-2px', color: '#a1a1a1'}}>
                        {station.province}
                    </p>
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.diesel === true
                     ? <CheckIcon style={{color: '#6127b7'}} />
                     : ``}
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.gas91 === true
                     ? <CheckIcon style={{color: '#6127b7'}} />
                     : ``}
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.gas95 === true
                     ? <CheckIcon style={{color: '#6127b7'}} />
                     : ``}
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.gas97 === true
                     ? <CheckIcon style={{color: '#6127b7'}} />
                     : ``}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination
        component="div"
        count={stations.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        style={{backgroundColor: '#fafafa', textTransform: 'uppercase'}}
      />
    </Card>
    </>
  );
};

StationListResults.propTypes = {
  stations: PropTypes.array.isRequired
};

export default StationListResults;
