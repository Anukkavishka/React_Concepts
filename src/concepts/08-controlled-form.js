// For controlled components, the idea is that you push the values from the component
// to the consumer via callback handlers. In the context of a form, this is normally
// via `onChange` which receives the `event` (and you can get the value via
// `event.target.value`) like so:
//
//     <input onChange={event => console.log(event.target.value)} />
//
// In this scenario, you also need to provide the value for the input like so:
//
//     <input value={this.state.value} />
//
// This gives you a lot more power over the input. This is not like your ng-model
// from Angular. It's a little more low-level than that. But this control is really nice


import React, {Component} from 'react'
import PropTypes from 'prop-types'

class NameForm extends Component {
  state = {value: ''}
  static propTypes = {
    getErrorMessage: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.onValueChange()
  }

  handleChange = event => {
    const {value} = event.target
    this.onValueChange(value)
  }

  handleSubmit = event => {
    event.preventDefault()
    if (!this.state.error) {
      alert(this.state.value)
    }
  }

  onValueChange(value = this.state.value) {
    const error = this.props.getErrorMessage(value)
    this.setState({value, error})
  }

  render() {
    const {value, error} = this.state
    const hasError = Boolean(error)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={this.handleChange} />
        </label>
        {hasError ? (
          <div style={{color: 'red'}}>{error}</div>
        ) : (
          <input type="submit" value="Submit" />
        )}
      </form>
    )
  }
}

export const Example = () => (
  <NameForm
    getErrorMessage={value => {
      if (value.length < 3) {
        return `Value must be at least 3 characters, but is only ${value.length}`
      }
      if (!value.includes('A')) {
        return `Value does not include "A" but it should!`
      }
      return null
    }}
  />
)

export default NameForm
