import React from 'react'
import { get } from 'http'
import JobForm from './job-form'
import ViewProspects from './view'
import Navbar from './navbar'
import hash from './hash'
import Details from './details'
import EditJobForm from './edit-job'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const path = hash.parse(location.hash).path
    const params = hash.parse(location.hash).params
    this.state = {
      view: {
        path: path,
        params: params
      },
      prospects: []
    }
    this.saveProspect = this.saveProspect.bind(this)
    this.saveUpdatedProspect = this.saveUpdatedProspect.bind(this)
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
  saveUpdatedProspect(updatedProspect) {
    const jsonProspect = JSON.stringify(updatedProspect)
    fetch(`/prospects/${updatedProspect.id}`, {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      body: jsonProspect
    })
      .then(resp => resp.json())
      .then(data => {
        const updated = this.state.prospects.map(job => {
          if (data.id === job.id) {
            return data
          }
          else {
            return job
          }
        })
        return updated
      })
      .then(prospects => {
        this.setState({ prospects }, () => {
          location.hash = `#details?uniqueId=${updatedProspect.id}`
        })
      })
      .catch(err => console.log(err))
  }
  deleteProspect(id) {
    fetch(`/prospects/${id}`, {
      method: 'delete'
    })
      .then(resp => resp.json())
      .then(() => {
        const updated = this.state.prospects.filter(job => job.id !== id)
        this.setState({ prospect: updated })
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
        return (
          <div>
            <Navbar />
            <Details job={job} editProspect={this.editProspect} />
          </div>
        )
      case 'edit':
        const editJob = this.state.prospects.find(job => job.id === parseInt(params.uniqueId, 10))
        if (!editJob) {
          return null
        }
        return (
          <div>
            <EditJobForm editJob={editJob} delete={this.deleteProspect} saveUpdate={this.saveUpdatedProspect} />
          </div>
        )
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
