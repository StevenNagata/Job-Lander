import React from 'react'
import JobForm from './job-form'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <JobForm />
      </div>
    )
  }
}
