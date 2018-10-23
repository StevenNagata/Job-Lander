import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
  grid: {
    marginTop: '2%'
  },
  card: {
    maxWidth: '50rem',
    margin: 'auto',
    marginTop: '2%'
  },
  textarea: {
    border: 'none',
    width: '100%',
    height: '3rem'
  },
  ref: {
    textDecoration: 'none',
    color: '#D3D3D3',
    display: 'block',
    maxWidth: '50rem',
    margin: 'auto'
  }
}

export default class ViewProspects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <Grid
        style={styles.grid}>
        {
          this.props.prospects.map(job => renderJob(job))
        }
      </Grid>
    )
  }
}

function renderJob(job) {
  const href = `/#details?uniqueId=${job.id}`
  return (
    <a href={href} style={styles.ref} key={job.id}>
      <Card
        id={job.id}
        style={styles.card}>
        <CardContent>
          <Typography variant="h6">
            {
              job.company
            }
          </Typography>
          <hr />
          <Typography variant="subtitle1">
            {
              job.title
            }
            <br />
          </Typography>
          <Typography variant="caption">
            Status: {job.status}
          </Typography>

          <Typography variant="caption">
            Description:
            <textarea style={styles.textarea} defaultValue={job.description} readOnly />
          </Typography>
        </CardContent>
      </Card >
    </a>
  )
}
