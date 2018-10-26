import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { DatePicker } from 'material-ui-pickers'
import Button from '@material-ui/core/Button'

const options = [
  {
    id: 1,
    value: 'Interested'
  },
  {
    id: 2,
    value: 'Applied/Waiting for Response'
  },
  {
    id: 3,
    value: 'Phone Interviewing'
  },
  {
    id: 4,
    value: 'Interviewing'
  },
  {
    id: 5,
    value: 'Offered'
  }
]

const styles = {
  container: {
    width: '95%',
    margin: '5% auto'
  },
  savegrid: {
    textAlign: 'center'
  },
  save: {
    backgroundColor: '#3B3B3B',
    textDecoration: 'none',
    color: 'white'
  }
}

class DayDatePicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: new Date()
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }
  handleDateChange(date) {
    this.setState({ selectedDate: date })
  }
  render() {
    const { selectedDate } = this.state
    return (
      <div className="picker">
        <DatePicker
          keyboard
          required
          margin="normal"
          format="MM/dd/yyyy"
          label="Event Date"
          value={selectedDate}
          onChange={this.handleDateChange}
          animateYearScrolling={false}
          onInputChange={e => console.log('Keyboard Input:', e.target.value)}
        />
      </div>
    )
  }
}

class Status extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    const status = event.target.value
    this.setState({ status })
  }
  render() {
    return (
      <TextField
        select
        fullWidth
        id="status"
        label="Current Status"
        value={this.state.status}
        onChange={this.handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"> </InputAdornment>
          )
        }}>
        {options.map(option => (
          <MenuItem key={option.id} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    )
  }
}

export default class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: null
    }
  }
  render() {
    return (
      <div style={styles.container}>
        <form>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">Create New Event</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="eventtitle"
                label="Event Title"
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <Status />
            </Grid>
            <Grid item xs={6}>
              <DayDatePicker />
            </Grid>
            <Grid item xs={12}>
              <Typography>Details:</Typography>
              <TextField
                id="details"
                fullWidth
                multiline
                rows="5"
                margin="normal"
              />
              <Typography>Next Steps:</Typography>
              <TextField
                id="nextstep"
                fullWidth
                multiline
                rows="5"
                margin="normal"
              />
            </Grid>
            <Grid style={styles.savegrid} item xs={12}>
              <Button type="submit" style={styles.save} variant="fab">Save</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}
