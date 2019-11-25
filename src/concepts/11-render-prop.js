// Higher Order components are great, but they suffer from a few short-comings:
// 1. You must create a component to pass to the HoC function
// 2. Your props/state share a namespace
// 3. Adding a HoC adds a layer of indirection resulting in less flexibility
//
// A great alternative to Higher Order Components is "render callbacks" (formally known as
// "Function as Child components). Learn more about them here:
// https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9
// 
// In this exercise, we're going to refactor the data-fetching example code to keep all the
// state and imperative code in one component, and all the UI rendering in a stateless,
// declarative function component.
/* 
<RepoListContainer>
  <FetchRepoList>
    <RepoList/> //children 
  </FetchRepoList>
</RepoListContainer>

*/

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class FetchRepoList extends Component {
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
        ({data: repos}) => this.setState({repos, error: null, loading: false}),
        error => this.setState({repos: null, error, loading: false}),
      )
  }
  render() {
    return this.props.children(this.state)// in the functions that takes the functions as children only render the children 
  }
}

function RepoListContainer({username, ...rest}) {
  return (
    <FetchRepoList username={username} {...rest}>
      {({repos, loading, error}) => (//this is how function as child pattern works
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
      )}
    </FetchRepoList>
  )
}
RepoListContainer.propTypes = {
  username: PropTypes.string,
}

function RepoList({username, repos}) {
  return (
    <div>
      <h1>{username}'s repos rendered by functions as children pattern</h1>
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
