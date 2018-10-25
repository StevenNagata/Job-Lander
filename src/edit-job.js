import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ArrowBack from '@material-ui/icons/ArrowBack'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Paper'

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
  card: {
    position: 'relative',
    padding: '1.5rem',
    maxWidth: '50rem',
    margin: '3% auto'
  },
  container: {
    width: '95%',
    margin: 'auto'
  },
  back: {
    color: 'black',
    position: 'absolute',
    left: '5px',
    top: '5px',
    textDecoration: 'none'
  },
  metaform: {
    maxWidth: '50rem'
  },
  grid: {
    marginTop: '1rem'
  },
  save: {
    textDecoration: 'none',
    color: 'black'
  }
}

export default class EditJobForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.editJob.status
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  componentDidUpdate(prevProps) {
    if (this.props.editJob !== prevProps.editJob) {
      this.setState({ status: this.props.editJob.status })
    }
  }
  render() {
    if (!this.props.editJob) {
      return null
    }
    const href = `#details?uniqueId=${this.props.editJob.id}`
    const { title, company, description, details } = this.props.editJob
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <a style={styles.back} href={href}>
            <ArrowBack />
          </a>
          <Grid
            container
            spacing={12}
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
                <Button type="submit" variant="contained" color="primary">Save</Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </div>
    )
  }
}
