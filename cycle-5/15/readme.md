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


## 15.4 Form Design
https://github.com/blue45f/nuber-eats-frontend-step/commit/cd7bcb96e6434def6708338f43420798a2b238d6

## 15.5 Form Login 
https://github.com/blue45f/nuber-eats-frontend-step/commit/8cff6fac2482de2c0b1cc16e7f10a2657ad2a931
https://github.com/blue45f/nuber-eats-frontend-step/commit/0f1e0ccee211be53c7ec24df11e3a34dc9b31006

## 15.6 Login Mutation part One
https://github.com/blue45f/nuber-eats-frontend-step/commit/6f664cb07bdb098c522baaa551fe0fb07b4dffa2

## 15.7 Apollo Codegen
https://github.com/blue45f/nuber-eats-frontend-step/commit/87ddf987621645767f7080af7c7590b270120d4f

## 15.8 Login Mutation
https://github.com/blue45f/nuber-eats-frontend-step/commit/82dd5a99fbc49973da7196ac330a06356ce24a4d

## 15.9 Login Mutation part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/3b6e584242a511e666f1859777808262bac39f47

## 15.10 UI Clonning
https://github.com/blue45f/nuber-eats-frontend-step/commit/51a2e245df42fec66fff369896152037f8278a83

## 15.11 UI Clonning part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/ba3d09cbfe0f2fe7a81dd0d45f826f371b3e5258

## 15.12 Create Account Mutation
https://github.com/blue45f/nuber-eats-frontend-step/commit/718c3675adc225a9f9b4bdb44d0563b171333388

## 15.13 Create Account Mutation part Two
https://github.com/blue45f/nuber-eats-frontend-step/commit/c4040edba9c1bdcb0f3eff14989534a0b6759566

## 15.14 Saving the Token
https://github.com/blue45f/nuber-eats-frontend-step/commit/b5480995dcbdc6ca8ca04e36e808ea6ea08e4efe

## 15.15 Using the Token
https://github.com/blue45f/nuber-eats-frontend-step/commit/ded58a4378705b5481f7519ac86219c730c2b9bf

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
https://reactrouter.com/docs/en/v6
https://reactrouter.com/docs/en/v6/upgrading/v5
https://react-hook-form.com/get-started
https://react-hook-form.com/migrate-v6-to-v7
https://tailwindcss.com/docs/configuration
https://fortawesome.com/
