import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
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

export default class JobForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'Interested'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    const status = event.target.value
    this.setState({ status })

  }
  render() {
    return (
      <div>
        <Typography variant='h5' gutterBottom align='center'>
          Create New Job Prospect
        </Typography>
        <TextField
          required
          fullWidth
          id="comapny-name"
          placeholder="Facebook"
          label="Company Name"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="job-title"
          placeholder="e.g Software Developer"
          label="Job Title"
          margin="normal"
        />
        <TextField
          id="description-input"
          label="Description"
          placeholder="Asking for candidate with 3+ years of Javascrip experience/ Two complete self projects..."
          fullWidth
          multiline
          rows="5"
          margin="normal"
          variant="filled"
        />
        <TextField
          id="details-input"
          label="Details"
          placeholder="Get exposure to more backend work. Work life balance not so great..."
          fullWidth
          multiline
          rows="5"
          margin="normal"
          variant="filled"
        />
        <TextField
          select
          fullWidth
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
          style={{ marginTop: '1rem' }}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          margin="normal"
        >
          <Button variant="contained" color="primary" >
            Save
          </Button>
        </Grid>
      </div >
    )
  }
}
