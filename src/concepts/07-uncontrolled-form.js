// Pretty much every application is going to need to do something with forms
// There are two ways to handle forms elements with React.
// First, there's Uncontrolled inputs. They're arguably easier, but less powerful.
//because we cannot do real-time validations to form values before they are being submitted.
// The basic idea of uncontrolled components is you pull the value out of the DOM
// element when you need it. To do this, you need to get a reference to the element.
// You can either get a reference via an event handler `event` argument (`event.target`),
// or by using the special `ref` prop on the element like so:
// 'ref' let's you access the raw DOM elements
//     <input ref={node => this.input = node} />
//
// From there you can reference the input node elsewhere in your component methods
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class NameForm extends Component {
  static propTypes = {
    defaultName: PropTypes.string,
  }

  handleSubmit = event => {
    event.preventDefault()
    alert(this.input.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            defaultValue={this.props.defaultName}
            ref={node => (this.input = node)} //now you are able to access this fields value after being submitted by 'this.input'
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export const Example = () => <NameForm defaultName="Marcy" />

export default NameForm

//below you have an example of how to submit form values and access form values using event object,
/* 
import React, {Component} from "react"
 
class App extends Component {

      state = {
           firstName: "",
           lastName: ""
       }

   handleChange(event) {
       this.setState({
           [event.target.name]: event.target.value // see what we have done here
       })
   }
  
   render() {
       return (
           <form>
               <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} />
               <br />
               <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
               <h1>{this.state.firstName} {this.state.lastName}</h1>
           </form>
       )
   }
}
 
export default App
*/
