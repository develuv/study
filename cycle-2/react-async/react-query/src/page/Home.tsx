import React from 'react'
import { Link } from 'react-router-dom'

function Home(): JSX.Element {
  return (
    <ul>
      <li>
        <Link to="/basic">Basic</Link>
      </li>
      <li>
        <Link to="/refetch">Refetch</Link>
      </li>
      <li>
        <Link to="/retry">Retry</Link>
      </li>
      <li>
        <Link to="/enabled">Enabled</Link>
      </li>
      <li>
        <Link to="/polling">Polling</Link>
      </li>
      <li>
        <Link to="/focus">Focus Refetch</Link>
      </li>
      <li>
        <Link to="/prefetch">Prefetch</Link>
      </li>
      <li>
        <Link to="/mutations">Mutations</Link>
      </li>
    </ul>
  )
}

export default Home
