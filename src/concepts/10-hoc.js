// State and peremptory code are two of the things that makes building applications more difficult.
// And we haven't even started talking about context yet!
// The more components we can have that have no state and completely declarative the better.
// Doing this makes things easier to test and maintain.
//
// So we're going to refactor our last component to follow a pattern called "Higher Order Components"
//
// This is essentially a function that accepts a component and returns a new one with that manages
// the state and renders the original component with the state as props. (react-redux follows this
// pattern, as did react-router until recently)
/* 
<WrappedRepoListContainer>
  <FetchData>
    <RepoListContainer>
      <RepoList/>
    </RepoListContainer>
  </FetchData>
</WrappedRepoListContainer>
*/

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const WrappedRepoListContainer = fetchDataComponent(RepoListContainer)

function fetchDataComponent(Comp) {
  return class FetchData extends Component {
    static propTypes = {
      username: PropTypes.string,
      fetch: PropTypes.func,
    }
    static defaultProps = {
      fetch: axios.get,
    }
    state = {repos: null, loading: false, error: null}

    componentDidMount() {
      this.fetchRepos()
    }

    fetchRepos() {
      this.setState({repos: null, loading: true, error: null})
      this.props
        .fetch()
        .then(
          ({data: repos}) =>
            this.setState({repos, error: null, loading: false}),
          error => this.setState({repos: null, error, loading: false}),
        )
    }
    render() {
      // we're spreading the state of repos, loading, and error as props to the Comp
      // we're forwarding the props given to this component to the child Comp
      return <Comp {...this.state} {...this.props} />
    }
  }
}

function RepoListContainer({username, repos, loading, error}) { //we are using the destructured objects from the above passed component 
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

RepoListContainer.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.bool,
}

function RepoList({username, repos}) {
  return (
    <div>
      <h1>{username}'s repos Rendered By the HOC Pattern</h1>
      <ul style={{textAlign: 'left'}}>
        {repos.map(repo => {
          return <li key={repo.id}>{repo.name}</li>
        })}
      </ul>
    </div>
  )
}
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
  <WrappedRepoListContainer username="anukkavishka" fetch={mockFetch} />
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

export default WrappedRepoListContainer
