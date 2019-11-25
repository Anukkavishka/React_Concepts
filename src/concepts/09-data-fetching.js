// for our data fetching needs, we're going to use axios.get (imported above)
//
// It is best not to fetch data from a server in the `render` method. As we
// saw in the last exercise any change to the state of a component can cause
// a re-render of the component. This will likely happen more often than we
// want. It is best to use another lifecycle method `componentDidMount` to
// make these requests. This method will be called once before the component
// is inserted into the document, regardless of how many times `render` is
// called.
//
// Example:
//
// ```
// class UserProfile extends Component {
//   state = {user: {}}
//   static propTypes = {
//     username: PropTypes.number.isRequired,
//     fetch: PropTypes.func,
//   }
//   static defaultProps = { fetch: axios.get } // doing this allows you to pass a mock version as a prop
//
//   componentDidMount() {
//     this.props.fetch(`/users/${this.props.username}`)
//       .then(
//         ({data: user}) => this.setState({user}),
//         // should add an error handler here 
//       )
//   }
//
//   render() {
//     const {user} = this.state
//     return (
//       <div>
//         <div>First name: {user.firstName}</div>
//         <div>Last name: {user.lastName}</div>
//         <div>Email address: {user.emailAddress}</div>
//       </div>
//     )
//   }
// }
//
//
// ```
//
// See https://facebook.github.io/react/docs/component-specs.html
//

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class RepoListContainer extends Component {
  /* 
  From ES6 onwards on all most all browsers except IE you can declare static properties in a class and before we learned 
  declare propTypes like RepoListContainer.propTypes = {} objects but that's only for functional components, if you have class based
  component you can declare them as above and also default proptypes
    <RepoListContainer>
      <RepoList/>
    </RepoListContainer>

  */
  static propTypes = {
    username: PropTypes.string.isRequired,
    fetch: PropTypes.func,
  }
  static defaultProps = {fetch: axios.get} // if you don't specify the fetch it will be default axios.get 
  state = {repos: null, loading: false, error: null}

  componentDidMount() {
    this.fetchRepos()
  }

  fetchRepos() {
    this.setState({repos: null, loading: true, error: null})
    this.props
      .fetch()
      .then(
        ({data: repos}) => this.setState({repos, error: null, loading: false}),//when it's been returned successfully we destructured the data prop and pt a alias to it
        error => this.setState({repos: null, error, loading: false}),
      )
  }

  render() {
    const {repos, loading, error} = this.state
    const {username} = this.props
    return (
      <div>
        {!loading ? null : <div>Loading...</div>}
        {!error ? null : (
          <div>
            Error loading info for <code>{username}</code>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        {!repos ? null : <RepoList username={username} repos={repos} />}
      </div>
    )
  }
}

function RepoList({username, repos}) {
  return (
    <div>
      <h1>{username}'s repos</h1>
      <ul style={{textAlign: 'left'}}>
        {repos.map(repo => {
          return <li key={repo.id}>{repo.name}</li>
        })}
      </ul>
    </div>
  )
}
//you can see some extensive propTypes checking even on collections 
RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export const Example = () => (
  <RepoListContainer username="anukkavishka" fetch={mockFetch} />
)

function mockFetch() {
  const delay = 0 // set this to `Number.MAX_VALUE` test the loading state
  const sendError = false // set this to `true` to test out the error state
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sendError) {
        reject({
          message: 'Something went wrong',
          status: 500,
        })
      } else {
        resolve({
          data: [
            {id: 12345, name: 'SpringBoot-Cloud-Stream-Kafka-Binder'},
            {id: 54321, name: 'Node-js-RESTful-Patterns'},
            {id: 43234, name: 'React_chat_app_using_redux'},
            {id: 49234, name: 'Hands-on-ANN'},
            {id: 43237, name: 'MicroServices-With-Eventual-Consistency'},
          ],
        })
      }
    }, delay)
  })
}

export default RepoListContainer
