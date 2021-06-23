import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Article } from '../model/Article'

function Select(): JSX.Element {
  const { isLoading, error, data } = useQuery<AxiosResponse<Array<Article>>, AxiosError, Array<Article>>(
    'articles',
    () => axios.get('https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles'),
    {
      select: (axiosResponse: AxiosResponse<Array<Article>>): Array<Article> => axiosResponse.data,
    }
  )

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error</div>

  return (
    <div>
      <ul>{data && data.map((item: any) => <li key={item.id}>{item.name}</li>)}</ul>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Select
