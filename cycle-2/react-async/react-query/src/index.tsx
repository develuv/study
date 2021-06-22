import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './page/Home'
import Basic from './page/Basic'
import Refetch from './page/Refetch'
import Retry from './page/Retry'
import AutoRefetch from './page/AutoRefetch'
import Enabled from './page/Enabled'
import Focus from "./page/Focus";
import Prefetch from "./page/Prefetch";
import Mutations from "./page/Mutations";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/basic" component={Basic} />
          <Route exact path="/refetch" component={Refetch} />
          <Route exact path="/polling" component={AutoRefetch} />
          <Route exact path="/focus" component={Focus} />
          <Route exact path="/retry" component={Retry} />
          <Route exact path="/enabled" component={Enabled} />
          <Route exact path="/prefetch" component={Prefetch} />
          <Route exact path="/mutations" component={Mutations} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>{' '}
  </React.StrictMode>,
  document.getElementById('root')
)
