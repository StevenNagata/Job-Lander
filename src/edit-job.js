import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

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
  parentContainer: {
    backgroundColor: '#E8F1F3',
    padding: '0',
    position: 'absolute',
    width: '100vw',
    height: '100vh'
  },
  deleteButton: {
    color: '#3B3B3B',
    position: 'absolute',
    top: '3%',
    right: '3%',
    zIndex: '3'
  },
  card: {
    position: 'relative',
    padding: '1.5rem',
    maxWidth: '50rem',
    margin: '5% auto'
  },
  container: {
    width: '95%',
    margin: 'auto'
  },
  metaform: {
    maxWidth: '50rem'
  },
  grid: {
    marginTop: '1rem'
  },
  save: {
    backgroundColor: '#3B3B3B',
    textDecoration: 'none',
    color: 'white'
  },
  modal: {
    position: 'relative',
    top: '10rem',
    margin: '0 auto',
    padding: '1rem',
    width: '15rem',
    backgroundColor: '#E8F1F3',
    boxShadow: '#068587',
    textAlign: 'center'
  },
  cancel: {
    color: 'white',
    margin: '0.3rem',
    backgroundColor: '#505959'
  },
  confirmDelete: {
    color: 'white',
    margin: '0.3rem',
    backgroundColor: '#ed553b'
  }
}

export default class EditJobForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.editJob.status,
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
  }
  handleChange(event) {
    const status = event.target.value
    this.setState({ status })
  }
  handleSubmit(event) {
    event.preventDefault()
    const updatedProspect = {
      id: this.props.editJob.id,
      company: event.target.company.value,
      title: event.target.title.value,
      description: event.target.description.value,
      details: event.target.details.value,
      status: event.target.status.value
    }
    this.props.saveUpdate(updatedProspect)
  }
  handleOpen() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false })
  }
  confirmDelete() {
    console.log('ran delete')
    this.props.delete(this.props.editJob.id)
  }
  render() {
    if (!this.props.editJob) {
      return null
    }
    const { title, company, description, details } = this.props.editJob
    return (
      <div style={styles.parentContainer}>
        <Card style={styles.card}>
          {/* <Button onClick={this.handleOpen} style={styles.deleteButton} variant="fab" aria-label="Edit"> */}
          <Icon onClick={this.handleOpen} style={styles.deleteButton}>delete_icon</Icon>
          <Grid
            container
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center">
            <form
              style={styles.metaform}
              onSubmit={this.handleSubmit}>
              <TextField
                required
                fullWidth
                id="company"
                defaultValue={company}
                label="Company Name"
                margin="normal"
              />
              <TextField
                required
                fullWidth
                id="title"
                defaultValue={title}
                label="Job Title"
                margin="normal"
              />
              <TextField
                id="description"
                label="Description"
                fullWidth
                multiline
                rows="5"
                margin="normal"
                defaultValue={description}
                variant="filled"
              />
              <TextField
                id="details"
                label="Details"
                fullWidth
                multiline
                defaultValue={details}
                rows="5"
                margin="normal"
                variant="filled"
              />
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
              <Grid
                style={styles.grid}
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                margin="normal"
              >
                <Button type="submit" style={styles.save} variant="fab">Save</Button>
              </Grid>
            </form>
          </Grid>
        </Card>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div style={styles.modal}>
            <Typography variant="subtitle1" id="modal-title">
              Are you sure you want to delete this job prospect?
            </Typography>
            <Button style={styles.cancel} onClick={this.handleClose} aria-label="cancel">Cancel</Button>
            <Button onClick={this.confirmDelete} style={styles.confirmDelete} aria-label="delete">Delete</Button>
          </div>
        </Modal>
      </div>
    )
  }
}
