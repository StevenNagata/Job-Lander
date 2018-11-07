import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'

const styles = {
  background: {
    position: 'absolute',
    width: '100vw',
    backgroundColor: '#E8F1F3',
    height: '100vh'
  },
  grid: {
    marginTop: '2%'
  },
  card: {
    position: 'relative',
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
    whiteSpace: 'nowrap',
    lineHeight: '1.25rem',
    marginTop: '2%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  ref: {
    textDecoration: 'none',
    color: '#D3D3D3',
    display: 'block',
    maxWidth: '50rem',
    margin: 'auto',
    padding: '0 1%'
  },
  favorite: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#3b3b3b'
  },
  favoriteActive: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#ED553B'
  },
  noStatus: {
    textAlign: 'center',
    fontSize: '1.5rem'
  },
  hideNoStatus: {
    display: 'none'
  }
}

export default class ViewProspects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    fetch('/prospects/')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ prospects: data })
      })
  }
  render() {
    if (!this.state.prospects) {
      return null
    }
    let filtered = this.state.prospects
    if (this.props.status) {
      filtered = this.state.prospects.filter(job => job.status === this.props.status)
    }
    if (this.props.status === 'PhoneInterviewing') {
      filtered = this.state.prospects.filter(job => job.status === 'Phone Interviewing')
    }
    let filterNoStatus = styles.hideNoStatus
    if (filtered.length === 0) {
      filterNoStatus = styles.noStatus
    }
    return (
      <div style={styles.background}>
        <Grid
          style={styles.grid}>
          <Typography style={filterNoStatus}>There are no prospects with this status</Typography>
          {
            filtered.map(job => renderJob(job))
          }
        </Grid>
      </div >
    )
  }
}

function renderJob(job) {
  const href = `/#details?uniqueId=${job.id}`
  const favIcon = job.favorite ? styles.favoriteActive : styles.favorite
  return (
    <a href={href} style={styles.ref} key={job.id}>
      <Card
        id={job.id}
        style={styles.card}>
        <FavoriteIcon style={favIcon} />
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
