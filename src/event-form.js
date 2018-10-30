import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { DatePicker } from 'material-ui-pickers'
import Button from '@material-ui/core/Button'
import { get } from 'http'

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
    maxWidth: '50rem',
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
      selectedDate: this.props.defaultValue
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
          id="date"
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
      status: this.props.defaultValue
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
        required
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
      event: null,
      currentJobId: this.props.jobId,
      editedEvent: this.props.editedEvent
    }
    this.saveEvent = this.saveEvent.bind(this)
    this.saveEdited = this.saveEdited.bind(this)
  }
  componentDidMount() {
    if (this.props.isEdit) {
      fetch(`/events/${this.props.eventId}`, get)
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            event: data
          })
        })
        .catch(err => console.log(err))
    }
  }
  saveEvent(event) {
    event.preventDefault()
    const newEvent = {
      jobId: this.state.currentJobId,
      title: event.target.eventtitle.value,
      status: event.target.status.value,
      date: event.target.date.value,
      details: event.target.details.value,
      nextStep: event.target.nextstep.value
    }
    this.props.saveAnEvent(newEvent)
  }
  saveEdited(event) {
    event.preventDefault()
    const editedEvent = {
      title: event.target.eventtitle.value,
      status: event.target.status.value,
      date: event.target.date.value,
      details: event.target.details.value,
      nextStep: event.target.nextstep.value
    }
    this.props.saveEditedEvent(editedEvent)
  }
  render() {
    if (this.props.isEdit && !this.state.event) {
      return null
    }
    let save = this.saveEvent
    let header = 'Create New Event'
    let editTitle = ''
    let editDate = new Date()
    let editStatus = 'Interested'
    let editDetails = ''
    let editNextStep = ''
    if (this.state.event) {
      save = this.saveEdited
      header = 'Edit Event'
      editTitle = this.state.event.title
      editDate = this.state.event.date
      editStatus = this.state.event.status
      editDetails = this.state.event.details
      editNextStep = this.state.event.nextStep
    }
    return (
      <div style={styles.container}>
        <form
          onSubmit={save}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">{header}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                defaultValue={editTitle}
                id="eventtitle"
                label="Event Title"
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <Status defaultValue={editStatus} />
            </Grid>
            <Grid item xs={6}>
              <DayDatePicker defaultValue={editDate} />
            </Grid>
            <Grid item xs={12}>
              <Typography>Details:</Typography>
              <TextField
                id="details"
                fullWidth
                multiline
                defaultValue={editDetails}
                rows="5"
                margin="normal"
              />
              <Typography>Next Steps:</Typography>
              <TextField
                id="nextstep"
                fullWidth
                multiline
                defaultValue={editNextStep}
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
