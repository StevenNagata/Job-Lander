import React from 'react'
import JobForm from './job-form'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prospects: []
    }
    this.saveProspect = this.saveProspect.bind(this)
  }
  saveProspect(prospect) {
    const jsonProspect = JSON.stringify(prospect)
    fetch('/prospects/', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: jsonProspect
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ prospects: [...this.state.prospects, data] })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <JobForm saveProspect={this.saveProspect} />
      </div>
    )
  }
}
