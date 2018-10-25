import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

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
  container: {
    width: '95%',
    margin: 'auto'
  },
  metaform: {
    maxWidth: '50rem',
    marginTop: '2%'
  },
  grid: {
    marginTop: '1rem'
  }
}

export default class EditJobForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.status || 'Intrested'
    }
  }

  render() {
    if (!this.props.editJob) {
      return null
    }
    console.log(this.props)
    const { title, company, status, description, details } = this.props.editJob
    return (
      <div style={styles.container}>
        <Grid
          container
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
              value={company}
              label="Company Name"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="title"
              value={title}
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
              value={description}
              variant="filled"
            />
            <TextField
              id="details"
              label="Details"
              fullWidth
              multiline
              rows="5"
              value={details}
              margin="normal"
              variant="filled"
            />
            <TextField
              select
              fullWidth
              id="status"
              label="Current Status"
              value={status}
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
              <Button type="submit" variant="contained" color="default" >Save</Button>
            </Grid>
          </form>
        </Grid>
      </div>
    )
  }
}
