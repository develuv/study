import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {Link} from "react-router-dom";

function AutoRefetch(): JSX.Element {
  const { isLoading, error, data } = useQuery('articles', () => axios.get('https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles'), {
    refetchInterval: 3,
  })

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error</div>

  if (data) {
    console.log(data)
  }

  return (
    <div>
      <ul>
        {data?.data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Link to="/">Home</Link>
    </div>
  )
}

export default AutoRefetch
