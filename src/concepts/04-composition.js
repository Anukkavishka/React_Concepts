import React from 'react'
import PropTypes from 'prop-types'
import './04-composition.css'

function Person(props) {
  return (
    <div className="Person">
      <Avatar url={props.avatar} />
      <b>{props.name}</b>
      <em>{props.title}</em>
      <ul>
        <li>
          <Icon href={`https://twitter.com/${props.twitter}`} type="twitter" />
        </li>
        <li>
          <Icon href={`https://github.com/${props.github}`} type="github" />
        </li>
      </ul>
    </div>
  )
}

Person.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
}

function Avatar(props) {
  return (
    <img
      src={props.url}
      className="Avatar"
      alt="user avatar"
      style={{
        width: props.size,
        height: props.size,
        borderRadius: props.size / 2,
      }}
    />
  )
}

// We didn't really talk about defaultProps,
// but this is what the `size` will be set to
// if it's not provided. it will use these
//you can also declare default values to parameters
Avatar.defaultProps = {
  size: 200,
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
}

function Icon(props) {
  return (
    <a href={props.href} target="_blank" className="Icon">
      <i className={`fa fa-${props.type}`} />
    </a>
  )
}

Icon.propTypes = {
  href: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export const Example = () => (
  <Person
    name="Anuk Kavishka"
    title="Alcoholic"
    avatar="https://pbs.twimg.com/profile_images/1007624021813481473/quBSw3Te_400x400.jpg"
    twitter="anukkavishka"
    github="anukkavishka"
  />
)

export default Person
