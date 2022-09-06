# 16장. User Page

## 유저 이메일 인증

> 메일에 링크가 누락되어 하드 코딩으로 링크 작업

```
http://localhost:3000/confirm?code=~~
```

1. 인증을 위한 페이지를 생성합니다.
  ```ts
  // pages/client/confirm-email.tsx
  const ConfirmEmail = () => {
    return ...;
  }
  ```
2. 인증은 로그인 이후에 할 수 있으므로 LoggedInRouter에 포함시킵니다.
  ```ts
  // router/LoggedInRouter.tsx
  const ClientRouter = [
    <Route key="confirm" path="/confirm" element={<ConfirmEmail />} />,
  ];
  ```
3. 쿼리스트링으로 전달되는 code 프로퍼티의 값을 통해 mutation 연동합니다.
  - qs, @types/qs 설치하여 쿼리스트링 파싱을 간단히 하도록 합니다.
  ```ts
  // pages/client/confirm-email.tsx
  const ConfirmEmail = () => {
    const [mutateVerification] = useVerifyEmailMutation();

    const location = useLocation();
    const { code } = qs.parse(search, { ignoreQueryPrefix: true });

    useEffect(() => {
      if (code) {
        mutateVerification({
          variables: {
            input: {
              code: code as string,
            },
          },
        });
      }
    }, [code]);
  }
  ```
4. 인증 완료 후 cache에 있는 User의 verified 값을 true로 변경한 후 루트로 라우트 이동을 시킵니다.
  - mutation의 결과를 판별하여 apollo 캐시에 있는 데이터를 업데이트 합니다.
  - apolloClient의 writeFragment를 이용하여 업데이트 합니다.
  - 인증을 완료하고 난 후엔 캐시에 있는 인증 여부를 true로 변경합니다.
  - 캐시 업데이트 후 루트로 navigate를 이용하여 이동합니다.
  ```ts
  // pages/client/confirm-email.tsx
  const ConfirmEmail = () => {
    const navigate = useNavigate();
    const apolloClient = useApolloClient();
    const { data: userData } = useMeQuery();
    const [mutateVerification] = useVerifyEmailMutation({
      onCompleted: (data: VerifyEmailMutation) => {
        const {
          verifyEmail: { ok },
        } = data;

        if (ok && userData?.me.id) {
          apolloClient.writeFragment({
            id: `User:${userData?.me.id}`,
            fragment: gql`
              fragment VerifiedUser on User {
                verified
              }
            `,
            data: {
              verified: true,
            },
          });

          navigate('/');
        }
      }
    });
  }
  ```

## 유저 프로필 변경

1. Header의 프로필 아이콘 클릭시 이동되는 페이지를 생성한다.
  ```ts
  // pages/client/me.tsx
  const Me = () => {
    return ...;
  }
  ```
2. LoggedInRouter에 포함시킨다.
  ```ts
  // router/LoggedInRouter.tsx
  const ClientRouter = [
    <Route key="me" path="/me" element={<Me />} />,
  ];
  ```
3. 이메일, 비밀번호 폼에 대한 react-hook-form을 사용합니다.
  ```ts
  // pages/client/me.tsx
  const FormNames = {
    Email: 'email',
    Password: 'password',
  }

  const FormRegisterOption = {
    [FormNames.Email] : { /* ... */ },
    [FormNames.Password] : { /* ... */ },
  }

  interface FormProps = {
    [FormNames.Email]?: string;
    [FormNames.Password]?: string;
  }

  const Me = () => {
    const { data: userData } = useMeQuery();
    const { register, handleSubmit, getValues, formState } = useForm<FormProps>({
      mode: 'onChange',
      defaultValues: {
        email: userData?.me.email,
      }
    });

    const onSubmit = () => {}

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register(FormNames.Email, FormRegisterOption[FormNames.Email])}/>
        <input {...register(FormNames.Password, FormRegisterOption[FormNames.Password])}/>
        <Button 
          loading={false}
          canClick={formState.isValid}
          activeText="Save Profile"
        />
      </form>
    )
  }
  ```
3. 폼을 연동한 이메일, 비밀번호의 값을 변경할 수 있도록 mutation 연동을 해준다.
  ```ts
  const Me = () => {
    const [editProfile, { loading }] = useEditProfileMutation();
    const onSubmit = () => {
      const { email, password } = getValues();

      editProfile({
        variables: {
          input: {
            email,
            ...(password && { password }),
          },
        },
      });
    }

    return (
      <Button loading={loading} />
    )
  }
  ```
4. 이메일이 변경된 경우에 cache에 있는 email, verified 값을 변경한다.
  ```ts
  const Me = () => {
    const apolloClient = useApolloClient();
    const [editProfile, { loading }] = useEditProfileMutation({
      onCompleted: (data: EditProfileMutation) => {
        const {
          editProfile: { ok },
        } = data;

        if (ok && userData) {
          const {
            me: { email: prevEmail, id },
          } = userData;

          const { email: nextEmail } = getValues();

          if (prevEmail !== nextEmail) {
            apolloClient.writeFragment({
              id: `User:${id}`,
              fragment: gql`
                fragment EditedUser on User {
                  verified
                  email
                }
              `,
              data: {
                verified: false,
                email: nextEmail,
              },
            });
          }
        }
      }
    });
  }
  ```

### Cache

[Reading and writing data to the cache](https://www.apollographql.com/docs/react/caching/cache-interaction/)

- readQuery
  - 캐시에 있는 데이터를 gql과 일치하는 데이터를 가져올 수 있다.
  - useQuery와는 다르게 캐시에 데이터가 없을 때 서버를 호출하지 않고 null을 반환한다.
  - 가져온 데이터의 값을 변경하는 것을 지양합니다.
- writeQuery
  - GQL에 일치하는 형태로 캐시에 데이터를 생성하거나 수정합니다.
  - 업데이터 하려는 속성만 업데이트 되고 이전 값은 보존된다.
  - 캐시에 있는 데이터는 서버에 있는 데이터에 영향을 끼치지 않아 새로고침 하는 경우 리셋된다.
  - 서버 스키마에 없는 속성이 추가될 수 있지만 권장되지 않는다.
- readFragment
  - readQuery와는 다르게 식별자 id가 필요하다.
  - id는 서버에서 내려오는 \_\_typename 값과 id 속성의 조합으로 나타난다.
  - 캐시에 값이 없는 경우에 null로 반환된다.
- writeFragment
  - readFragment와 유사하게 데이터를 추가하는 것외엔 동일하게 id로 값을 변경한다.
  - 변경된 데이터는 모든 쿼리에 영향을 받아 UI 업데이트가 된다.
