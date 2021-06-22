import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {Link} from "react-router-dom";

function Refetch(): JSX.Element {
  const { isLoading, error, data, refetch } = useQuery('articles', () => axios.get('https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles'))

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error</div>

  return (
    <div>
      <button onClick={() => refetch()}>Refetch</button>
      <ul>
        {data?.data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Refetch
