import React from 'react'
import CreateProspect from './create-job-prospect'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <CreateProspect />
      </div>
    )
  }
}
