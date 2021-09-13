import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Box, Container } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import StationListResults from './components/stations/station-list-results';
import StationListToolbar from './components/stations/station-list-toolbar';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const StationList = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [stations, setStations] = useState([]);
    const params = {
        page: 1,
        perPage: 20
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    useEffect(() => {
    if (token) {
        setOpen(true);
        axios.get("https://staging.api.locq.com/ms-fleet/station", {
            headers: { Authorization: token },
            params
        })
        .then(response => {
            setStations(response.data.data.stations);
        })
        .catch(error => {
            throw error;
        });

        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);
        return () => clearTimeout(timer);
    }
    }, []);

    return (
    <>
        <Helmet>
        <title>PriceLOCQ for Business Stations</title>
        </Helmet>
        <Box
        sx={{
            minHeight: '100%',
            py: 3
        }}
        >
        <Container maxWidth={false}>
            <StationListToolbar />
            <Box sx={{ pt: 3 }}>
                <StationListResults stations={stations} />
            </Box>
        </Container>
        </Box>
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </>
    );

};

export default StationList;
