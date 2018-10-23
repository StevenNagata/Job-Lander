import React from 'react'
import Typography from '@material-ui/core/Typography'

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: false
    }
  }
  render() {
    console.log(this.props.job)
    const { company } = this.props.job
    return (
      <div>
        <Typography variant="h5">{company}</Typography>
      </div>
    )
  }
}
