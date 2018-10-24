import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Edit from '@material-ui/icons/Edit'

const styles = {
  card: {
    position: 'relative'
  },
  back: {
    color: 'black',
    position: 'absolute',
    left: '5px',
    top: '5px',
    textDecoration: 'none'
  },
  edit: {
    position: 'absolute',
    right: '5px',
    top: '5px'
  },
  container: {
    padding: '0 3%',
    maxWidth: '50rem',
    margin: '3% auto',
    align: 'center'
  },
  containerMobile: {
    padding: '15px 3%',
    maxWidth: '50rem',
    margin: '3% auto',
    align: 'center'
  },
  status: {
    paddingBottom: '3%'
  },
  company: {
    position: 'relative',
    bottom: '10px'
  },
  textareaMobile: {
    position: 'relative',
    left: '5%',
    fontSize: '0.6rem',
    border: 'none',
    width: '90%',
    height: '5rem',
    padding: '3%',
    marginBottom: '2%'
  },
  textarea: {
    position: 'relative',
    left: '5%',
    fontSize: '0.6rem',
    border: 'none',
    width: '90%',
    height: 'auto',
    padding: '3%',
    marginBottom: '2%'
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileView: true
    }
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 650) {
        this.setState({ mobileView: true })
      }
      else {
        this.setState({ mobileView: false })
      }
    })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 1500)
  }
  handleEdit() {
    this.props.editProspect(this.props.job.id)
  }
  render() {
    if (!this.props.job) {
      return null
    }
    const { company, title, description, status, details } = this.props.job
    const { mobileView } = this.state
    const textarea = mobileView ? styles.textareaMobile : styles.textarea
    const container = mobileView ? styles.containerMobile : styles.container
    return (
      <div style={container}>
        <Card style={styles.card}>
          <a style={styles.back} href='#view'>
            <ArrowBack />
          </a>
          <Edit
            style={styles.edit}
            onClick={this.handleEdit} />
          <Grid style={container} container spacing={0}>
            <Grid item xs={12}>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" style={styles.company}>{company}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline" style={styles.status}>Status: {status}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Descrption:</Typography>
            </Grid>
            <textarea style={textarea} defaultValue={description} readOnly />
            <Typography variant="body2">Details:</Typography>
            <textarea style={textarea} defaultValue={details} readOnly />
          </Grid>
        </Card>
      </div >
    )
  }
}
