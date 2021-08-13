import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const AddDevice = (props) => {
    const classes = useStyles();
    const [deviceId, setDeviceId] = React.useState('');
    const [name, setName] = React.useState('');
    const [field, setField] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [availability, setAvailability] = React.useState('Available');

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
          axios.post('http://localhost:5000/devices', body, config)
            .then(function (response) {
                alert(response.data);

                // reset form
                setDeviceId('');
                setName('');
                setField('');
                setDescription('');
                setAvailability('');
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
            <h1>Add Device</h1>

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
                          Add Device
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
};

export default AddDevice;