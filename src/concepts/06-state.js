
// So far we've just been using function components.
// Now that we need to worry about state in our component, we need to use the ES6 class syntax.
// To turn an ES6 class into a React component, you extend React.Component
// (or `import {Component} from 'react'` and use that)
//
// Let's take this simple component for example:
//
// function SayHello(props) {
//   return (
//     <div>Hello {props.firstName} {props.lastName}!</div>
//   )
// }
//
// Here's how we'd express this using classes:
//
// class SayHello extends React.Component {
//   render() {
//     return (
//       <div>Hello {this.props.firstName} {this.props.lastName}!</div>
//     )
//   }
// }
//
// From here you can now start using this.state in your render method and call this.setState
// in callback handlers (like onClick).
import React from 'react'

class StopWatch extends React.Component {
  /* 
  initializing state as below is fairly new and it's really convinient because 
  it removes the dependancy of declaring state and binding event handlers inside a contructor
  */
  state = { 
    running: false,
    lapse: 0,
  }

  _now = 0
  _timer = null

  componentWillUnmount() { //added to avoid memory leak
    this.stop()
  }
  /*
  If you can see that below we have declared event handlers and we have not binded them using .bind(this), 
  this is a cool new feature that we could use with new JS syntax  as class properties
   */
  handleRunClick = () => {
    if (this.state.running) {
      this.stop()
    } else {
      this.start()
    }
  }

  handleClearClick = () => {
    this.stop()
    this._now = 0
    this.setState({lapse: 0})
  }

  start() {
    //this._timer  keeps the ref to pass to the clearInterval()
    this._timer = setInterval(() => { //setInterval() repeats a given function continuosly in this case updating the state
      this.setState({
        lapse: Date.now() - this._now,
      })
      /* console.log("Date.now()  "+Date.now())
      console.log("this._now   "+this._now)
      console.log("lapse: Date.now() - this._now,  "+(Date.now() - this._now)) */
    })

    this._now = Date.now() - this.state.lapse //anchor value where the lapse is being calculated from
    //console.log("Date.now() - this.state.lapse  "+this._now)
    this.setState({running: true})
  }

  stop() {
    clearInterval(this._timer)
    this._timer = null
    this.setState({running: false})
  }

  render() {
    const buttonStyles = {
      border: '1px solid #ccc',
      background: '#fff',
      fontSize: '2em',
      padding: '15px',
      margin: '0 5px',
      width: '200px',
    }
    const labelStyles = {fontSize: '5em', display: 'block'}
    return (
      <div style={{textAlign: 'center'}}>
        <label style={labelStyles}>{this.state.lapse}ms</label>
        <button style={buttonStyles} onClick={this.handleRunClick}>
          {this.state.running ? 'Stop' : 'Start'}
        </button>
        <button style={buttonStyles} onClick={this.handleClearClick}>
          Clear
        </button>
      </div>
    )
  }
}

// We don't need to do anything fancy here even with props, because the <StopWatch /> component tracks its own state!
export const Example = () => <StopWatch />

export default StopWatch
