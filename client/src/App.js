import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DevicesIcon from '@material-ui/icons/Devices';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import Collapse from '@material-ui/core/Collapse';
import {Provider} from 'react-redux';
import Dashboard from './components/Dashboard';
import AddDevice from './components/Devices/AddDevice';
import EditDevice from './components/Devices/EditDevice';
import ListDevices from './components/Devices/ListDevices';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import store from './store';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: 'white',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    color: '#000000DE'
  }
}));

export default function App() {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isNestedMenuOpen, setIsNestedMenuOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsMenuOpen(open);
  };

  const handleNestedMenuClick = () => {
    setIsNestedMenuOpen(!isNestedMenuOpen);
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to="/" className={classes.link} onClick={toggleDrawer(false)}>
          <ListItem button key="Dashboard">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button key="Devices" onClick={handleNestedMenuClick}>
          <ListItemIcon><DevicesIcon /></ListItemIcon>
          <ListItemText primary="Devices" />
          {isNestedMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      <Collapse in={isNestedMenuOpen} timeout="auto" unmountOnExit>
        <Link to="/devices/add" className={classes.link} onClick={toggleDrawer(false)}>
          <List component="div" disablePadding>
            <ListItem button key="Add Device"  className={classes.nested}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Add Device" />
            </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="/devices" className={classes.link} onClick={toggleDrawer(false)}>
          <List component="div" disablePadding>
            <ListItem button key="List Device"  className={classes.nested}>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary="Lists" />
            </ListItem>
          </List>
        </Link>
      </Collapse>
    </div>
  );

  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Button onClick={toggleDrawer(true)}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </Button>
              <Drawer anchor="left" open={isMenuOpen} onClose={toggleDrawer(false)}>
                {list()}
              </Drawer>
              <Typography variant="h6" className={classes.title}>
                Found & Seek
              </Typography>
            </Toolbar>
          </AppBar>

          <Container fixed>
            <Grid container className={classes.root} justifyContent="center">
              <Grid item xs={12}>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/devices/add' component={AddDevice} />
                <Route exact path='/devices/edit/:id' component={EditDevice} />
                <Route exact path='/devices' component={ListDevices} />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Router>
    </Provider>
  );
};