import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const availabilities = [
  {
    value: 'Available',
    label: 'Available',
  },
  {
    value: 'Out of Stock',
    label: 'Out of Stock',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    }
  },
}));

const EditDevice = (props) => {
    const classes = useStyles();
    const [deviceId, setDeviceId] = React.useState('');
    const [name, setName] = React.useState('');
    const [field, setField] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [availability, setAvailability] = React.useState('Available');
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/devices/${id}`)
            .then(function (response) {
                setDeviceId(response.data.deviceId);
                setName(response.data.name);
                setField(response.data.field);
                setDescription(response.data.description);
                setAvailability(response.data.availability);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id, setDeviceId, setName, setField, setDescription, setAvailability]);

    const onSubmit = (e) => {
        e.preventDefault();
        
        const newDevice = {
          deviceId,
          name,
          field,
          description,
          availability
        }

        try {
          const config = {
            headers : {
              'Content-Type':'application/json'
            }
          }

          const body = JSON.stringify(newDevice);
          axios.put(`http://localhost:5000/devices/${id}`, body, config)
            .then(function (response) {
                alert(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        } catch (err) {
          console.error(err.response.data);
        }
    };

    return(
        <div>
            <h1>Edit Device</h1>

            <form className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Input placeholder="Device ID" value={deviceId} onChange={(event) => { setDeviceId(event.target.value) }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Input placeholder="Name" value={name} onChange={(event) => { setName(event.target.value) }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Input placeholder="Field" value={field} onChange={(event) => { setField(event.target.value) }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Input placeholder="Description" value={description} onChange={(event) => { setDescription(event.target.value) }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                          id="filled-select-currency-native"
                          select
                          label="Availability"
                          value={availability}
                          onChange={(event) => { setAvailability(event.target.value) }}
                          SelectProps={{
                            native: true,
                          }}
                        >
                            {availabilities.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                          Update Device
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
};

export default EditDevice;