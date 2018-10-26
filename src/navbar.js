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

const styles = {
  nav: {
    height: '45px'
  },
  appBar: {
    backgroundColor: '#068587'
  }

}

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }
  toggleDrawer(side, open) {
    this.setState({
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
                onClick={() => this.toggleDrawer('left', false)}
                onKeyDown={() => this.toggleDrawer('left', false)}>
                <List>
                  {links.map(link => (
                    <ListItem
                      component='a'
                      button
                      key={link.id}
                      href={link.href}
                    >
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.value} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
          </Toolbar>
        </AppBar>
      </div >
    )
  }
}
