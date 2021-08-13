import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListDevice = (props) => {
    const classes = useStyles();
    const [devices, setDevices] = React.useState('');
    
    useEffect(() => {
        axios.get('http://localhost:5000/devices')
            .then(function (response) {
                setDevices(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [setDevices]);

    const handleDeleteDevice = (id) => {
        if (window.confirm('Are you sure you want to delete this selected device?')) {
            axios.delete(`http://localhost:5000/devices/${id}`)
                .then(function (response) {
                    // lets refresh the page for now
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });        
        }
    };

    return (
        <div>
            <h1>Devices</h1>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Device ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Field</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {devices.length > 0 && devices.map((device) => (
                        <TableRow key={device.name}>
                            <TableCell component="th" scope="row">{device.deviceId}</TableCell>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>{device.field}</TableCell>
                            <TableCell>{device.description}</TableCell>
                            <TableCell>{device.availability}</TableCell>
                            <TableCell>
                                <Link to={`/devices/edit/${device._id}`}>
                                    <Button variant="contained" color="primary">
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="contained" color="secondary" style={{marginLeft: '10px'}} onClick={() => { handleDeleteDevice(device._id) }}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    {devices.length === 0 && <TableCell colSpan={5} style={{ textAlign: "center" }}>No Devices available yet</TableCell>}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    )
};

export default ListDevice;