import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default class ViewProspects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <Grid
        style={{ marginTop: '2%' }}>
        <Typography variant="h5" align="center" component="h2">Current Job Prospects</Typography>
        {
          this.props.prospects.map(job => renderJob(job))
        }
      </Grid>
    )
  }
}

function renderJob(job) {
  return (
    <Card
      key={job.id}
      id={job.id}
      style={{ maxWidth: '50rem', margin: 'auto', marginTop: '1rem' }}>
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
          <textarea style={{ border: 'none', width: '100%', height: '3rem' }} defaultValue={job.description} readOnly />
        </Typography>
      </CardContent>
    </Card >
  )
}
