/* Learn more about React PropTypes here: https://facebook.github.io/react/docs/typechecking-with-proptypes.html
propTypes are objects that let you to do runtime validations type checking on props passed to objects
not to use in production this is onl for dev (performance issues)
once the type checking is done on a component you could see if there are any errors in the console.
propType validations happen before the component uses the props
if you don't care about a para on props it just defaults to any when you don't include it in the propType object
 */
import React from 'react'
import PropTypes from 'prop-types'

function SayHello(props) {
  return (
    <div>
      <h1>Let's check out some propTypes
           <br/>{props.firstName} {props.lastName}!
      </h1>
    </div>
  )
}

SayHello.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

//export const Example = () => <SayHello firstName={true} lastName="Perry" />

export const Example = () => <SayHello firstName="Matthew" lastName="Perry" />

export default SayHello 
