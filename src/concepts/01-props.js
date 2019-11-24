/* These props could be anything from simple atomic types to complex objects
it's not the convention to mutate the props inside the passed component
 */
import React from 'react'

function SayHello(props) {
  return (
    <div>
      Hello {props.firstName} {props.lastName}!
    </div>
  )
}
//you could also use parameter destructuring
//it's like destructuring objects 
/* function SayHello({firstName,lastName}) {
  //we can do this even getting the props as a whole and inside the function also
  //const {firstName,lastName} = props (props should be passed as args to SayHello component)
  return (
    <div>
      Hello Destructured {firstName} {lastName}!
    </div>
  )
} */

//you could also make use of spread operator in this occation if you want to pass just some object as props
/* const user = {
  firstName : "Matthew",
  lastName : "Perry",

}
export const Example = () => <SayHello {...user} />
 */
export const Example = () => <SayHello firstName="Matthew" lastName="Perry" />

export default SayHello
