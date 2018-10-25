import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ArrowBack from '@material-ui/icons/ArrowBack'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const styles = {
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
    maxWidth: '50rem',
    marginTop: '2%'
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
      status: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    console.log(event.target)
    const status = event.target.value
    this.setState({ status })
  }
  handleSubmit(event) {
    const updatedProspect = {
      company: event.target.company.value,
      title: event.target.title.value,
      description: event.target.description.value,
      details: event.target.details.value
    }
    console.log(updatedProspect)
  }
  componentDidUpdate(prevProps) {
    if (this.props.editJob !== prevProps.editJob) {
      this.setState({ status: this.props.editJob.status })
    }
    console.log(this.props)
  }
  render() {
    if (!this.props.editJob) {
      return null
    }
    const href = `#details?uniqueId=${this.props.editJob.id}`
    const { title, company, description, details } = this.props.editJob
    return (
      <div style={styles.container}>
        <a style={styles.back} href={href}>
          <ArrowBack />
        </a>
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
              rows="5"
              defaultValue={details}
              margin="normal"
              variant="filled"
            />
            <Grid
              style={styles.grid}
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              margin="normal"
            >

              <Button type="submit" variant="contained" color="default" >
                <a style={styles.save} href={href}>Save</a>
              </Button>

            </Grid>
          </form>
        </Grid>
      </div>
    )
  }
}
