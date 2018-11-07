import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Visibility from '@material-ui/icons/Visibility'
import AddCircle from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FilterListIcon from '@material-ui/icons/FilterList'

const styles = {
  nav: {
    height: '45px'
  },
  appBar: {
    backgroundColor: '#068587'
  },
  hideFilter: {
    display: 'none'
  }
}

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left: false,
      filterOption: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.openfilter = this.openfilter.bind(this)
  }
  openfilter() {
    this.setState({ filterOption: !this.state.filterOption })
  }
  toggleDrawer(side, open) {
    this.setState({
      filterOption: false,
      [side]: open
    })
  }
  render() {
    const links = [
      {
        id: 1,
        href: '#create',
        value: 'Create Prospect',
        icon: <AddCircle />
      },
      {
        id: 2,
        href: '#view',
        value: 'View Prospects',
        icon: <Visibility />
      }
    ]
    const filter = this.state.filterOption ? {} : styles.hideFilter
    return (
      <div style={styles.nav}>
        <AppBar position="fixed" style={styles.appBar}>
          <Toolbar>
            <IconButton
              onClick={() => this.toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit">
              Job Lander
            </Typography>
            <Drawer open={this.state.left} onClose={() => this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
              // onClick={() => this.toggleDrawer('left', false)}
              // onKeyDown={() => this.toggleDrawer('left', false)}
              >
                <List>
                  {links.map(link => (
                    <ListItem
                      component='a'
                      button
                      key={link.id}
                      href={link.href}
                      onClick={() => this.toggleDrawer('left', false)}
                    >
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.value} />
                    </ListItem>
                  ))}

                  <ListItem
                    button
                    key='filter-by'
                    onClick={this.openfilter}
                  >
                    <ListItemIcon><FilterListIcon /></ListItemIcon>
                    <ListItemText primary='Filter Prospects by...' />
                  </ListItem>
                  <div style={filter}>
                    <ListItem button key='filter-by-intrested'>
                      <ListItemText primary='Intrested' />
                    </ListItem>
                    <ListItem button key='filter-by-applied'>
                      <ListItemText primary='Applied' />
                    </ListItem>
                    <ListItem button key='filter-by-phone-interview'>
                      <ListItemText primary='Phone Interviewing' />
                    </ListItem>
                    <ListItem button key='filter-by-interviewing'>
                      <ListItemText primary='Interviewing' />
                    </ListItem>
                    <ListItem button key='filter-by-offered'>
                      <ListItemText primary='Offered' />
                    </ListItem>
                  </div>
                </List>
              </div>
            </Drawer>
          </Toolbar>
        </AppBar>
      </div >
    )
  }
}
