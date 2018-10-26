import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const styles = {
  parentContainer: {
    backgroundColor: '#E8F1F3',
    padding: '2% auto',
    position: 'absolute',
    width: '100vw',
    height: '100vh'
  },
  card: {
    maxWidth: '50rem',
    padding: '0 2%',
    margin: '5% auto',
    position: 'relative'
  },
  container: {
    padding: '0 3%',
    maxWidth: '50rem',
    margin: '5% auto',
    align: 'center'
  },
  title: {
    fontSize: '1.4rem',
    color: '#022829',
    lineHeight: '2rem'
  },
  company: {
    fontSize: '1rem',
    color: '#4B4C4C',
    lineHeight: '1rem'
  },
  status: {
    fontSize: '0.8rem',
    marginTop: '0',
    color: '#7A7C7D'
  },
  paragraph: {
    color: '#07141C',
    fontSize: '0.7rem',
    margin: '2% auto',
    whiteSpace: 'pre-wrap'
  },
  center: {
    margin: '2%'
  },
  addEventGrid: {
    padding: '2%',
    textAlign: 'center'
  },
  addEvent: {
    color: '#3B3B3B',
    backgroundColor: '#4fb99f'
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileView: true
    }
  }
  render() {
    if (!this.props.job) {
      return null
    }
    const { id, company, title, description, status, details } = this.props.job
    return (
      <div style={styles.parentContainer}>
        <div style={styles.center}>
          <Card style={styles.card}>
            <Grid style={styles.container} container spacing={0}>
              <Grid item xs={12}>
                <Typography style={styles.title} variant="h6">{title}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" style={styles.company}>{company}</Typography>
              </Grid>
              <Grid item xs={12}>
                <hr />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline" style={styles.status}>Status: {status}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2"><strong>Descrption:</strong></Typography>
              </Grid>
              <Grid>
                <Typography style={styles.paragraph}>{description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2"><strong>Details:</strong></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography style={styles.paragraph}>{details}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2"><strong>Timeline:</strong></Typography>
              </Grid>
              <Grid style={styles.addEventGrid} item xs={12}>
                <Button style={styles.addEvent}>Add Event</Button>
              </Grid>
            </Grid>
            <Button id="editButton" href={`#edit?uniqueId=${id}`} variant="fab" aria-label="Edit">
              <Icon>edit_icon</Icon>
            </Button>
          </Card>
        </div>
      </div >
    )
  }
}
