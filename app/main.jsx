import React, { Component } from 'react'
import streams from '../services/streams'
import config from '../config/streams'
import getValueByPath from '../lib/helper'
import { ipcRenderer, remote } from 'electron'

class Main extends Component {

  constructor () {
    super()
    this.state = {
      showText: false,
      streams: []
    }
  }

  componentWillMount () {
    streams({}, (streams) => {
      this.setState({streams: streams})
      // console.log('state updated - should RERENDER!!!!')
    })
  }

  openStream = (stream) => {
    ipcRenderer.send('openStream', stream.channel)
  }

  render () {
    let { streams } = this.state

    let head = config.headers.map((header, index) => {
      return <th key={'head cell' + index} style={styles.col}>
        {header.label}
      </th>
    })

    let rows = streams.map((stream, index) => {
      let cols = config.headers.map((header, index) => {
        let tdStyles = header.key === 'status' ? {} : styles.col
        return <td key={'body cell' + index} style={tdStyles}>
          {getValueByPath(stream, header.path) || header.default}
        </td>
      })
      return <tr key={'row' + index} onClick={this.openStream.bind(this, stream)}>
        {cols}
      </tr>
    })

    return (
      <div className='Main'>
        <table style={styles.table} cellSpacing='0'>
          <thead>
            <tr>
              {head}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

const styles = {
  table: {

  },
  col: {
    whiteSpace: 'nowrap',
    padding: '2px 4px'
  }
}

export default Main
