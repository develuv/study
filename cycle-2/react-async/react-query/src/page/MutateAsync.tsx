import React, { useCallback, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useMutation, UseMutationResult, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Article } from '../model/Article'

function MutateAsync(): JSX.Element {
  const [articles, setArticles] = useState<Array<Article>>([])
  const { isLoading, error, data } = useQuery('articles', () => axios.get('https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles'))

  const addMutation: UseMutationResult<AxiosResponse<Article>, unknown, Article, unknown> = useMutation((newArticle: Article) =>
    axios.post('https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles', newArticle)
  )

  const updateMutation: UseMutationResult<AxiosResponse<Article>, unknown, Article, unknown> = useMutation((modifyArticle: Article) =>
    axios.put(`https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles/${modifyArticle.id}`, modifyArticle)
  )

  const removeMutation: UseMutationResult<AxiosResponse<Article>, unknown, string, unknown> = useMutation((id: string) =>
    axios.delete(`https://60d08b927de0b20017108f83.mockapi.io/api/v1/articles/${id}`)
  )

  const addArticle = useCallback(async () => {
    const name = prompt('name')

    if (!name) return

    const { data } = await addMutation.mutateAsync({
      name,
      avatar: 'https://cdn.fakercloud.com/avatars/artem_kostenko_128.jpg',
    })

    setArticles([...articles, data])
  }, [addMutation, articles])

  const updateArticle = useCallback(
    async (article: Article) => {
      const name = prompt('name')

      if (!name) return

      const { data } = await updateMutation.mutateAsync({
        id: article.id,
        name,
        avatar: article.avatar,
      })

      const newArticles = articles.map(value => (value.id === data.id ? data : value))

      setArticles(newArticles)
    },
    [updateMutation, articles]
  )

  const removeArticle = useCallback(
    async (id: string) => {
      const { data } = await removeMutation.mutateAsync(id)

      setArticles(articles.filter(value => value.id !== data.id))
    },
    [removeMutation, articles]
  )

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

export default MutateAsync
