# Chapter 14. Front-end Setup

## CRA

```bash
yarn create react-app nuber-eats-frontend --template=typescript
```

## TailwindCSS

[Install](https://tailwindcss.com/docs/installation/using-postcss)

> 강의와는 메이저 버전이 차이가 나서 설정 부분이 약간 다릅니다.<br/>
> v3 부터는 빌드가 별도로 필요 없습니다.<br/>
> v2.1 버전부터는 mode: jit를 제공하였지만 v3에서는 자동으로 된다.

- tailwind, postcss, autoprefixer 를 설치합니다.

```bash
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- tailwind.config.js에서 content를 업데이트 해줍니다.
- content에 등록한 패턴의 파일들에서 사용하는 클래스들만 최종 css 파일에 포함시킵니다.
- content에는 광범위한 패턴을 지정하는 것을 지양합니다.
- css 패턴은 절대 포함시키면 안됩니다.

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- index.css에 아래와 같이 작성하면 setup이 마무리 됩니다.

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

[VS Code & JetBrain plugin](https://tailwindcss.com/docs/editor-setup)

## Apollo
[Apollo with React](https://www.apollographql.com/docs/react/)

- apollo client와 graphql을 설치합니다.

```bash
yarn add @apollo/client graphql
```

- apollo.ts 파일을 따로 생성하여 클라이언트를 생성합니다.
- uri는 백엔드 개발한 서버를 바라보게 해줍니다. 
- 백엔드 PORT는 main.ts에서 변경할 수 있습니다.

```ts
// apollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:${PORT}/graphql',
  cache: new InMemoryCache(),
});
```

- ApolloProvider 로 루트를 감싸고 client를 주입해줍니다.

```
import { client } from './apollo';

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

## React Router DOM

[React Router DOM v6](https://reactrouter.com/docs/en/v6/getting-started/overview)

```bash
yarn add react-router-dom
```

- 로그인 전/후, 각 롤에 대한 페이지가 달라짐.

```bash
├── App.tsx
├── routers
│   ├── LoggedInRouter.tsx
│   └── LoggedOutRouter.tsx
```
