/* https://medium.com/@dmitrynozhenko/9-ways-to-implement-css-in-react-js-ccea4d543aa3
you could use inline styles with react components but you need to access the attributes as js,
ex: style={{backgroundColor: 'lightblue'}}
since in this example we are using Stadard CSS also 
 */
import React from 'react'
import PropTypes from 'prop-types'
import './03-styling.css' //Webpack let's you import your CSS file and read it and create a JSON out of the CSS file to be used

function Box(props) {
  const myStyle = {
    fontWeight : 'bold',
    ...props.style
  }
  return (//{props.children} is the content in the Box object, 
    //it' a given variable.in this example it's strings like  'I'm in a small box!'
   
    <div 
    className={`Box Box--${props.size}`} 
    style={props.style}//adding properties to components like this is clean accepted convention by the community
    //style={myStyle}
    >
      {props.children}
    </div>
  )
}

// I'm gonna give this one to you. Isn't that nice? :)
Box.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export const Example = () => (
  <div>
    <Box size="small" style={{backgroundColor: 'lightblue'}}>
      I'm in a small box!
    </Box>
    <Box size="medium" style={{backgroundColor: 'lightgreen'}}>
      I'm in a medium box!
    </Box>
    <Box size="large" style={{backgroundColor: 'red'}}>
      I'm in a large box!
    </Box>
  </div>
)

export default Box

//when ever there is a JS syntaxt that you cannot figure out, you could always use this https://astexplorer.net/ site 
//to make sense of what is running behind that code and information about syntaxes

