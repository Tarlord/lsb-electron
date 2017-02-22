import React from 'react'
import { ipcRenderer, remote } from 'electron'

export default class Stream extends React.Component {

  state = {
    channel: null
  }

  componentWillMount () {
    ipcRenderer.on('streamData', (event, channel) => {
      // console.log('stream data recieved', {event}, {channel})
      this.setState({channel})
    })
  }

  render () {
    let { channel } = this.state
    // console.log('stream render', channel)
    if (!channel) return null
    return (
      <iframe
        src={`http://player.twitch.tv/?channel=${channel.display_name}&autoplay=true`}
        height='100%'
        width='100%'
        frameBorder='0'
        scrolling='no'
        allowFullScreen='true' />
    )
  }
}
