# Chapter 15. Authentication

## 15.0 Local Only Fields

- Local-only fields : GraphQL 서버의 스키마에 정의 되지 않은 것

  - local state : server에는 없지만 application에 필요한 state
    - ex) login or not, dark mode, volume on Youtube,
  - ApolloClient의 cache안에 정의 되는 키&값들

- reactive variable(apollo.ts)
  - apollo client에 저장되고 읽고 업데이트 하는 것이 가능
  - const name = makeVar("default value");

<details>
  <summary>local state(reactive variable) code</summary>

```javascript
// apollo.ts
const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // 여기에 선언된 것들이 local state
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
```

</details>

- 궁금증
  - App에서 local state와 local field variable의 차이점 ?
    - [Apollo client는 Redux와 무엇이 다른가](https://d2.naver.com/helloworld/4245995)
    - [Local State Management with Reactive Variables](https://www.apollographql.com/blog/apollo-client/caching/local-state-management-with-reactive-variables/)
    - 같다. 하지만 사용이 더 편리하다.


## 15.1 React Hook Form
https://github.com/blue45f/nuber-eats-frontend-step/commit/d58f616998793e3028331af838ceeb77591c89f4

- [리액트에서 form을 다루기 위한 라이브러리](https://react-hook-form.com/)
- useForm();
<details>
  <summary>useForm code</summary>

```javascript
export const LoggedOutRouter = () => {
  const { register, watch } = useForm(); // useForm()의 사용 방법
  console.log(watch()); // register가 등록된 form에 입력되는 값을 실시간으로 확인
  return (
    <div>
      <form>
        <input
          ref={register} // 사용할 form에 register를 붙이면 됨
          name="email" // name도 필수
          required
          placeholder="email"
        >
      </form>
    </div>
  )
}
```

</details>
- useForm()의 메서드들
  - const { register, watch, handleSubmit, errors } = useForm();
  - handleSubmit : submit 시 실행될 함수(onSubmit)을 등록하면 실행됨

<details>
  <summary>handle submit code</summary>

```javascript
export const CreateAccount = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    console.log('how to use handleSubmit');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} name="email" /> // register를 ref에 등록 + name 설정
      하면 useForm() 사용 준비 완료
    </form>
  );
};
```

</details>

- errors : useForm()의 메서드 중 에러가 있으면 알려줌

<details>
<summary>errors code</summary>

```javascript
<input
  ref={register({
    required: 'Email is required',
    pattern: {
      value: EMAIL_REGEX,
      message: 'Please enter a valid email',
    },
  })}
  required
  name="email"
  placeholder="Email"
  className="input"
/>;
{
  errors.email?.message && <FormError errorMessage={errors.email?.message} />;
}
```
</details>

## 15.2 React Hook Form part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/3846ace09af29b552963da9a7193be42d63f4b32

<details>
<summary>useForm with typescript</summary>

```typescript
interface ILoginForm {
  email: string;
  password: string;
}
const { register, error } = useForm<ILoginForm>(); // <ILoginForm>을 typescript형식에 맞게 useForm()에 추가함
// 이후 typescript가 자동완성 기능을 실행
// error.email?.message // error. 이후 자동완성 사용 가능
```

</details>

## 15.3 Router and @types
https://github.com/blue45f/nuber-eats-frontend-step/commit/890dbb428a9decd9697c6973ec2b7bdf75a6ade6
  
<details>
<summary>npm install @type/react-router-dom</summary>

react-router-dom은 javascript 버전인데
typescript는 알아 듣질 못 함

1. @type 버전이 있길 기도
   구글 : definitely typed => The repository for high queality Typescript type definitions.

npm install @type/react-router-dom

2. @type 버전이 없을 경우엔 type definition을 하고 사용가능하지만 typescript의 보호기능 등은 사용 불가능
</details>


## 15.4 Form Design
https://github.com/blue45f/nuber-eats-frontend-step/commit/cd7bcb96e6434def6708338f43420798a2b238d6

- tailwindCSS를 활용해 간단하게 스타일링 가능

<details>
  <summary>TailwindCSS features</summary>

- 부트스트랩과 달리 눈에 띄는 특유의 생김새가 없음
- 조합할 수 있는 여러 클래스들이 있는데 좋바해서 쓰면 됨
- production을 위해 build할때 사용하지 않은 클래스들을 제거해서 css크기를 줄일 수 있음
- VScode extension : Tailwind CSS intellisense : Tailwind CSS 클래스 이름 자동 완성
- [postCSS](https://github.com/postcss/postcss) : post process할 수 있게 해주는 라이브러리 - CSS 전용 Babel 같은 느낌
  - tailwind를 일반 css파일로 빌드하기 위해 postcss config 파일 필요
  - autoprefixer : 크로스 브라우징 되도록 지원
  - 참고 : https://fourwingsy.medium.com/postcss-%EC%86%8C%EA%B0%9C-727310aa6505
- tailwind.config.js : tailwind를 커스터마이즈 하기 위해

</details>

## 15.5 Form Login 
https://github.com/blue45f/nuber-eats-frontend-step/commit/8cff6fac2482de2c0b1cc16e7f10a2657ad2a931
https://github.com/blue45f/nuber-eats-frontend-step/commit/0f1e0ccee211be53c7ec24df11e3a34dc9b31006

<details>
  <summary>TailwindCSS features</summary>
  
- 다양한 클래스를 통해 디자인한 요소를 묶어 해당 클래스를 간편하게 재사용할 수 있다.
- @apply를 통해 스타일들을 컴포넌트화 하여, 해당 클래스를 사용함으로써 스타일의 재사용이 가능하다.

````css
@tailwind components;

.input {
    @apply focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors;
}

.container {
    @apply max-w-screen-2xl mx-auto;
}

.link {
    @apply text-lime-600 hover:underline;
}

.btn {
    @apply text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-lime-600 hover:bg-lime-700;
}

@tailwind utilities;
````

  https://velog.io/@ney9083/TailwindCSS
</details>

## 15.6 Login Mutation part One
https://github.com/blue45f/nuber-eats-frontend-step/commit/6f664cb07bdb098c522baaa551fe0fb07b4dffa2
  
  <details>
  <summary>apollo features</summary>
  
- Apollo란 GraphQL의 클라이언트 라이브러리 중 하나로 GraphQL을 사용한다면 거의 필수적으로 사용하는 상태 관리 플랫폼입   
- 장점
    - Query 및 Mutation 직접 전송
      - API 서버에서 데이터를 가져오기 위해 번거로운 네트워크단의 HTTP 요청을 신경 쓸 필요가 없어진다.
    - 전송받은 데이터 캐싱
      - 클라이언트의 반복 요청을 줄여 서버 부하를 줄일 수 있을 뿐만 아니라, 서비스를 이용하는 사람들에게 더 나은 사용자 경험을 제공할 수 있다.
    - Local state 관리
      - 클라이언트 만의 Local state를 만들어 Query, Mutation, Resolver의 사용이 가능하다. 서버에서 받아온 데이터와 클라이언트에서 관리하는 데이터를 병합할 수 있다.

- apollo.ts : apollo 세팅 파일
- uri : back-end url(localhost:4000/graphql)
- \<app /\>을 \<ApolloProvider client={client}>\</ApolloProvider>로 감싸 줌
- chrome extension apollo dev tools docs에서 연결 확인 가능
- set up -> authentication -> login part -> user part -> test(Jest) -> restaurant owner dashboard -> driver part
- React-router-dom
  - 로그인 여부와 사용자에 따라 main화면을 다르게 구성
</details>
    


## 15.7 Apollo Codegen
https://github.com/blue45f/nuber-eats-frontend-step/commit/87ddf987621645767f7080af7c7590b270120d4f

## 15.8 Login Mutation
https://github.com/blue45f/nuber-eats-frontend-step/commit/82dd5a99fbc49973da7196ac330a06356ce24a4d
   
<details>
  <summary>로그인 Mutation</summary>
  
   ````ts
   const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;
   ````
   
- graphql의 mutation을 클라이언트에서 이용하려면 먼저 gql을 사용하여, 쿼리문을 먼저 작성
- login은 mutation이므로 useMutation을 사용
- typescript를 사용하고 있기 때문에 위와 같이 useMutation에 login, loginVariables 타입을 전달
- t인자로 넘겨준 것은 위의 쿼리어로 만든 LOGIN_MUTATION과 옵션값 
   
````
const [login, { data: loginResults, loading }] = useMutation<
  login,
  loginVariables
>(LOGIN_MUTATION, {
  onCompleted,
});
````
</details> 

## 15.9 Login Mutation part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/3b6e584242a511e666f1859777808262bac39f47
   
 <details>
  <summary>Mutation loading</summary>
 
  - loading api를 활용하여 서버에서 응답 받기전까지의 상태를 표시
  
````
  const [loginMutation, {data: loginMutationResult, loading}] = useMutation<loginMutation,
    loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted,
  });
   

  <button className="mt-3 btn">
    {loading ? "Loading..." : "Log In"}
  </button>
````
</details> 

## 15.10 UI Clonning
https://github.com/blue45f/nuber-eats-frontend-step/commit/51a2e245df42fec66fff369896152037f8278a83

## 15.11 UI Clonning part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/ba3d09cbfe0f2fe7a81dd0d45f826f371b3e5258 
   
## 15.12 Create Account Mutation
https://github.com/blue45f/nuber-eats-frontend-step/commit/718c3675adc225a9f9b4bdb44d0563b171333388
   
<details>
  <summary>react-helmet</summary>
 
  - html meta tag를 동적으로 관리해주는 라이브러리
  - react-helmet의 작동 순서
    - url경로를 따라서 page request
    - page에 맞는 resource fetching
    - HTML 파일 불러옴
    - react-helmet이 담겨있는 js 파일 작동
  
````ts
    <Helmet>
        <title>Login | Nuber Eats</title>
     </Helmet>
````
  
- https://jeonghwan-kim.github.io/dev/2020/08/15/react-helmet.html
- https://velog.io/@miyoni/noSSRyesSEO
- https://velog.io/@raverana96/React-React-helmet%EA%B3%BC-%EA%B7%B8-%ED%95%9C%EA%B3%84.-next%EB%A1%9C-migrate%ED%95%98%EB%A0%A4%EB%8A%94-%EC%9D%B4%EC%9C%A0
</details>      

## 15.13 Create Account Mutation part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/c4040edba9c1bdcb0f3eff14989534a0b6759566
  
<details>
  <summary>useNavigate</summary>
 
  - useNavigate는 양식이 제출되거나 특정 event가 발생할 때,  url을 조작할 수 있는 interface를 제공
  
````ts
import {Link, useNavigate} from "react-router-dom";
   
  const history = useNavigate();
  
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: {ok},
    } = data;
    if (ok) {
      history("/login");
    }
  };  
````
  
- https://basemenks.tistory.com/278
</details>    

## 15.14 Saving the Token
https://github.com/blue45f/nuber-eats-frontend-step/commit/b5480995dcbdc6ca8ca04e36e808ea6ea08e4efe
  
<details>
  <summary>react-helmet-async</summary>
 
  - react-helmet을 쓰지 않는 이유
    - react-helmet은 thread-safe하지 않은 react-side-effect에 의존한다는 단점이 있음
    - 따라서, 비동기 데이터 처리에 문제가 생길 수 있습니다.
  - react-helmet-async는 react-helmet과 유사한 라이브러리이면서 thread-safe하고 react-helmet보다 실행면에서 더 깊숙한 곳에서 우선권을 갔는다

  
````ts
import {HelmetProvider} from "react-helmet-async";
  
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App/>
      </HelmetProvider>
    </ApolloProvider>
  
  
import {Helmet} from "react-helmet-async";  
````

- https://jisu-y.github.io/til/TIL-%EA%B3%B5%EB%B6%80-220414/
</details>      

## 15.15 Using the Token
https://github.com/blue45f/nuber-eats-frontend-step/commit/ded58a4378705b5481f7519ac86219c730c2b9bf
   
<details>
  <summary>setContext</summary>
 
  - contextSetter() 함수는 Apollo 클라이언트가 서버로 GraphQL 요청을 수행하기 전에 매번 실행된다
  - 그래서 여기에 HTTP 헤더에 넣을 데이터를 설정할 수 있다.
  - 그리고 기존 링크인 httpLink와 setContext()로 반환되는 Apollo 링크를 합쳐준다.
 
  
````ts
import {setContext} from "@apollo/client/link/context";
  
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
````

- https://velog.io/@gwak2837/Apollo-Client-React%EB%A1%9C-GraphQL-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-2
</details>         

## 15.16 Routers and 404s
https://github.com/blue45f/nuber-eats-frontend-step/commit/73c10136dd171628e4ff3d507b8ec305a40ae4e0

## 15.17 Header part One
https://github.com/blue45f/nuber-eats-frontend-step/commit/e18f904058e206340762299fd739eaaec08e581b

## 15.18 Header part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/9c74bc72cf7d49b34794695249f5d793a6c2e4a3
  
- Apollo cache

query me를 날리는 useMe custom hook을 만들고, 그것을 router에서 부르고 header에서 또 한번 부르면 graphql query가 두번 실행될까? 그렇지 않다. 똑같은 쿼리를 다시 날릴 때 Apollo Client는 query를 보내는 대신 cache에서 값을 찾아 보내준다.
아주 큰 장점이지만 경우에 따라서는 매번 새 쿼리를 날리도록 만들어줄 필요가 있을 것 같  

# Document
- https://reactrouter.com/docs/en/v6
- https://reactrouter.com/docs/en/v6/upgrading/v5
- https://react-hook-form.com/get-started
- https://react-hook-form.com/migrate-v6-to-v7
- https://tailwindcss.com/docs/configuration
- https://fortawesome.com/
- https://github.com/nfl/react-helmet
- https://github.com/staylor/react-helmet-async
