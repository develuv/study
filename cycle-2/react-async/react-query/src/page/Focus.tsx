import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

function AutoRefetch(): JSX.Element {
  const page: number = Math.floor(Math.random() * 10) + 1
  const { isLoading, error, data } = useQuery(
  'articles',
  () => axios.get(`https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles?page=${page}&limit=10`),
    {
      refetchOnWindowFocus: true,
    }
  )

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error</div>

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
