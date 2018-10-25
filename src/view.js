import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
  background: {
    padding: '1%',
    position: 'absolute',
    width: '100vw',
    backgroundColor: '#E8F1F3'
  },
  grid: {
    marginTop: '2%'
  },
  card: {
    maxWidth: '50rem',
    margin: 'auto',
    marginTop: '2%'
  },
  title: {
    color: '#022829',
    lineHeight: '2rem'
  },
  company: {
    color: '#4B4C4C',
    lineHeight: '1rem'
  },
  status: {
    marginTop: '1%',
    color: '#7A7C7D'
  },
  description: {
    color: '#07141C',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.25rem',
    marginTop: '2%'
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
      <div style={styles.background}>
        <Grid
          style={styles.grid}>
          {
            this.props.prospects.map(job => renderJob(job))
          }
        </Grid>
      </div >
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
          <Typography variant="h6" style={styles.title}>
            {
              job.title
            }
          </Typography>
          <hr />
          <Typography variant="subtitle1" style={styles.company}>
            {
              job.company
            }
            <br />
          </Typography>
          <Typography variant="caption" style={styles.status}>
            Status: {job.status}
          </Typography>

          <Typography style={styles.description}>{job.description}</Typography>
        </CardContent>
      </Card >
    </a>
  )
}
