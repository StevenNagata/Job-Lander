import React from 'react'
import { get } from 'http'
import JobForm from './job-form'
import ViewProspects from './view'
import Navbar from './navbar'
import hash from './hash'
import Details from './details'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const stateJson = localStorage.getItem('current-app-state')
    const appState = JSON.parse(stateJson) || {}
    const path = hash.parse(location.hash).path
    const params = hash.parse(location.hash).params
    this.state = {
      view: {
        path: path,
        params: params
      },
      prospects: appState.prospects || []
    }
    this.saveProspect = this.saveProspect.bind(this)
  }
  componentDidMount() {
    fetch('/prospects/', get)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ prospects: data })
      })
      .catch(err => console.log(err))
    window.addEventListener('hashchange', () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({
        view: { path, params }
      })
    })
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
  renderView() {
    const { path, params } = this.state.view
    switch (path) {
      case 'create':
        return (
          <div>
            <Navbar />
            <JobForm saveProspect={this.saveProspect} />
          </div>
        )
      case 'details':
        const job = this.state.prospects.find(job => job.id === parseInt(params.uniqueId, 10))
        return <Details job={job} />
      default:
        return (
          <div>
            <Navbar />
            <ViewProspects prospects={this.state.prospects} />
          </div>
        )
    }
  }
  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}
