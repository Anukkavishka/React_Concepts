import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Div} from 'glamorous'
import Final, {List} from './concepts'

function App() {
  return (
    <Router>
      <Route
        path="/"
        render={props => (
          <Div
            display="flex"
            marginLeft={20}
            marginRight={20}
            css={{
              '& > *': {
                paddingLeft: 10,
                paddingRight: 10,
                borderRight: '1px solid',
              },
              '& > *:last-child': {
                paddingRight: 0,
                borderRight: 'none',
              },
            }}
          >
            <div
              style={{
                width: '20vw',
                minWidth: 200,
                maxWidth: 400,
                backgroundColor:'#8563c3'
              }}
            >
              <h1 style={{textAlign: 'center'}}>Concepts</h1>
              <List {...props} />
            </div>
            <div style={{flex: 1,backgroundColor:'lightblue'}}>
              <h1 style={{textAlign: 'center'}}>Implementation</h1>
              <Final {...props} />
            </div>
          </Div>
        )}
      />
    </Router>
  )
}

export default App
