import React from 'react'
import { get } from 'http'
import JobForm from './job-form'
import ViewProspects from './view'
import Navbar from './navbar'
import hash from './hash'
import Details from './details'
import EditJobForm from './edit-job'
import EventForm from './event-form'

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
      events: [],
      prospects: []
    }
    this.saveProspect = this.saveProspect.bind(this)
    this.saveUpdatedProspect = this.saveUpdatedProspect.bind(this)
    this.deleteProspect = this.deleteProspect.bind(this)
    this.saveAnEvent = this.saveAnEvent.bind(this)
    this.saveEditedEvent = this.saveEditedEvent.bind(this)
  }
  componentDidMount() {
    fetch('/prospects/', get)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ prospects: data })
      })
      .catch(err => console.log(err))
    fetch('/events/', get)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ events: data })
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
        const updated = this.state.prospects.filter(job => job.id !== parseInt(id, 10))
        this.setState({ prospects: updated }, () => {
          location.hash = '#view'
        })
      })
      .catch(err => console.log(err))
  }
  saveAnEvent(newEvent) {
    const job = this.state.prospects.find(job => job.id === parseInt(newEvent.jobId, 10))
    job.status = newEvent.status
    const jsonProspect = JSON.stringify(job)
    const jsonEvent = JSON.stringify(newEvent)
    fetch('/events/', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: jsonEvent
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ events: [...this.state.events, data] }, () => {
          location.hash = `#details?uniqueId=${newEvent.jobId}`
        })
      })
      .catch(err => console.log(err))
    fetch(`/prospects/${newEvent.jobId}`, {
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
        this.setState({ prospects })
      })
      .catch(err => console.log(err))
  }
  saveEditedEvent(updatedEvent) {
    const jsonEvent = JSON.stringify(updatedEvent)
    const eventId = parseInt(this.state.view.params.uniqueId, 10)
    let jobId = ''
    console.log(jsonEvent)
    fetch(`/events/${eventId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: jsonEvent
    })
      .then(resp => resp.json())
      .then(data => {
        jobId = data.jobId
        const updated = this.state.events.map(event => {
          if (data.id === event.id) {
            return data
          }
          else {
            return event
          }
        })
        return updated
      })
      .then(events => {
        this.setState({ events }, () => {
          location.hash = `#details?uniqueId=${jobId}`
        })
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
        return (
          <div>
            <Navbar />
            <Details jobId={parseInt(params.uniqueId, 10)} editProspect={this.editProspect} />
          </div>
        )
      case 'edit':
        return (
          <div>
            <EditJobForm jobId={parseInt(params.uniqueId, 10)} delete={this.deleteProspect} saveUpdate={this.saveUpdatedProspect} />
          </div>
        )
      case 'newevent':
        const jobId = parseInt(params.uniqueId, 10)
        return (
          <EventForm jobId={jobId} saveAnEvent={this.saveAnEvent} />
        )
      case 'editEvent':
        const eventId = parseInt(params.uniqueId, 10)
        const currentEditedEvent = this.state.events.find(event => event.id === eventId)
        return (
          <EventForm editedEvent={currentEditedEvent} isEdit saveEditedEvent={this.saveEditedEvent} />
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
