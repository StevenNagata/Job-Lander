import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'

const styles = {
  back: {
    textDecoration: 'none',
    position: 'absolute',
    top: '4.5rem'
  },
  container: {
    maxWidth: '50rem',
    margin: 'auto'
  },
  hr: {
    margin: '0'
  },
  company: {
    marginTop: '2%',
    marginBottom: '1rem'
  },
  status: {
    float: 'right'
  },
  textarea: {
    fontSize: '1rem',
    border: 'none',
    width: '100%',
    height: '7rem'
  }
}
export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: false
    }
  }
  render() {
    const { company, title, description, status, details } = this.props.job
    return (
      <div>
        <Grid style={styles.container} container spacing={24}>
          <a style={styles.back} href='#view'>
            <ArrowBack />
          </a>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" style={styles.company}>{company}</Typography>
            <hr style={styles.hr} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" style={styles.status}>Status: {status}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Descrption:</Typography>
          </Grid>
          <Grid item xs={12}>
            <textarea style={styles.textarea} defaultValue={description} readOnly />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Details:</Typography>
          </Grid>
          <Grid item xs={12}>
            <textarea style={styles.textarea} defaultValue={details} readOnly />
          </Grid>
        </Grid>
      </div>
    )
  }
}
