import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {Link} from "react-router-dom";

const fetchArticles = async (page: number = 1) => await axios.get(`https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles?page=${page}&limit=10`)

function Prefetch(): JSX.Element {
  const [page, setPage] = React.useState(1)
  const { data, error, isLoading } = useQuery(['articles', page], () => fetchArticles(page), {
    keepPreviousData: true,
    staleTime: 50000,
  })

  const goPrev = () => {
    if (Object.is(page, 1)) return

    setPage((prevState: number) => prevState - 1)
  }

  const goNext = () => {
    if (Object.is(page, 10)) return

    setPage((prevState: number) => prevState + 1)
  }

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error</div>

  return (
    <div>
      <button onClick={goPrev}>Previous Page</button>
      <button onClick={goNext}>Next Page</button>
      <ul>
        {data?.data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Prefetch
