import React from 'react'
import ReactDOM from 'react-dom'
import Main from './main.jsx'
import Stream from './Stream.jsx'

window.onload = function () {
  if (document.getElementById('root')) ReactDOM.render(<Main />, document.getElementById('root'))
  if (document.getElementById('stream')) ReactDOM.render(<Stream />, document.getElementById('stream'))
}
