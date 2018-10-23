import React from 'react'
import { get } from 'http'
import JobForm from './job-form'
import ViewProspects from './view'
import Navbar from './navbar'
import hash from './hash'

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
    const { path } = this.state.view
    switch (path) {
      case 'create':
        return <JobForm saveProspect={this.saveProspect} />
      default:
        return <ViewProspects prospects={this.state.prospects} />
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.renderView()}
      </div>
    )
  }
}
