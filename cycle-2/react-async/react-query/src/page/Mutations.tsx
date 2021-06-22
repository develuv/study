import React, {useEffect, useState} from 'react'
import axios, { AxiosResponse } from 'axios'
import { useMutation, UseMutationResult, useQuery } from 'react-query'
import {Link} from "react-router-dom";

interface Article {
  id?: string
  name: string
  avatar: string
  createdAt?: string
}

function Mutations(): JSX.Element {
  const [articles, setArticles] = useState<Array<Article>>([])
  const { isLoading, error, data } = useQuery('articles', () => axios.get('https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles'))

  const addMutation: UseMutationResult<AxiosResponse<Article>, unknown, Article, unknown> = useMutation((newArticle: Article) =>
    axios.post('https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles', newArticle)
  )

  const updateMutation: UseMutationResult<AxiosResponse<Article>, unknown, Article, unknown> = useMutation((modifyArticle: Article) =>
    axios.put(`https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles/${modifyArticle.id}`, modifyArticle)
  )

  const removeMutation: UseMutationResult<AxiosResponse<Article>, unknown, number, unknown> = useMutation((id: number) =>
    axios.delete(`https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles/${id}`)
  )

  const addArticle = () => {
    const name = prompt('name')

    if (!name) return

    addMutation.mutate({
      name,
      avatar: 'https://cdn.fakercloud.com/avatars/artem_kostenko_128.jpg',
    })
  }

  const updateArticle = (article: Article) => {
    const name = prompt('name')

    if (!name) return

    updateMutation.mutate({
      id: article.id,
      name,
      avatar: article.avatar,
    })
  }

  const removeArticle = (id: number) => {
    removeMutation.mutate(id)
  }

  useEffect(() => {
    if (!addMutation.data) return

    setArticles([...articles, addMutation.data.data])
  }, [addMutation.data])

  useEffect(() => {
    if (!updateMutation.data) return

    const { data } = updateMutation.data

    const newArticles = articles.map(value => (value.id === data.id ? data : value))

    setArticles(newArticles)
  }, [updateMutation.data])

  useEffect(() => {
    if (!removeMutation.data) return

    const removeId = removeMutation.data.data.id

    setArticles(articles.filter(value => value.id !== removeId))
  }, [removeMutation.data])

  useEffect(() => {
    setArticles(data?.data || [])
  }, [data])

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error</div>

  return (
    <div>
      <button onClick={() => addArticle()}>추가</button>
      <ul>
        {articles.map((item: any) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeArticle(item.id)}>삭제</button>
            <button onClick={() => updateArticle(item)}>수정</button>
          </li>
        ))}
      </ul>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Mutations
