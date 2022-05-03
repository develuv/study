# 9.USER MODULE E2E

# 개요

"
테스트 코드를 작성할 공수가 제한적이라면 E2E만 하세요.
프론트엔드, 백엔드, E2E 모든 영역에서 테스트 코드를 작성 하면 좋겠지만 그 정도의 공수를 투입하는것은 현실적으로 힘든 일입니다. 만약 하나만 골라서 제대로 해야 한다면 저는 E2E만 테스트 코드를 작성 하겠습니다. 종단(EndPoint)에서 테스트를 통과하면 기능이 잘 작동하는 것이고 종단에서 실패하는 테스트가 진짜 문제입니다.
"

# superTest
- express 통합 테스트 모듈이다.
- 여기서 통합테스트는 api의 기능 테스트를 의미한다.
- 내부적으로 express server를 구동시켜 시나리오대로 실제 요청을 보낸 뒤 결과를 검증한다.
- 통합 테스트하고자 하는 파일의 spec.js를 만들어 테스트를 돌리면 된다.
- 유닛테스트와 다르게 실제로 express 서버를 가동시킨다는 것이다
```text
users.e2e-spec.ts 
```

# 환경 설정
- unit test에는 package.json에 세팅되어 있고, e2e test는 test파일에 jest-e2e.json에 정의되어 있다.
- mouduleNameMapper 설정에 유의해야한다.
```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
}
```

- E2E 테스트에서 주의할 점은, 테스트 환경를 독립시켜야 한다는 것이다.
- 사용하는 환경 변수도 .env.test에 따로 저장했고, DB도 테스트 DB를 사용해야 한다.
```typescript
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test', // 개발 환경
      //... (중략)
```

# 실행 순서
- e2e의 경우 테스트 순서도 생각해야한다.
- 실제 DB를 사용하기 때문에 테스트 코드가 다음 테스트에 영향을 미칠 수 있다.
- 따라서 실제 유저가 거처가는 비지니스 로직을 그대로 따라가는 것이 좋다.
```typescript
  it.todo('can createAccount');
  it.todo('userProfile');
  it.todo('login');
  it.todo('me');
  it.todo('verifyEmail');
  it.todo('editProfile');
```

# Test Script
npm test를 진행하면 알아서 Test 파일을 찾아 테스트를 진행한다. 아래 옵션들이 있다.
- --detectOpenHandles: 열려있는 리소스 자동 닫기
- --forceExit: 테스트가 끝나면 강제 종료


# mocking 설정
e2e 테스트 도중 자주 보게 될 에러 중 하나로 아래의 메시지를 자주 보게 된다.
```text
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```
- --detectOpenHandles 플래그를 붙여서 보니 got 메서드에서 문제가 생겼던 것이었고 결과적으로 다음과 같이 모킹해주어야한다.
- e2e 테스트에서도 mocking은 필수이다.

```typescript
jest.mock('got', () => {
  return {
    post: jest.fn(),
  };
});
```

# beforeAll
각각의 테스트 항목을 수행하기 전에 앱을 초기화하고 usersRepository와 verificationsRepository를 할당해야한다.
```typescript
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    verificationsRepository = module.get<Repository<Verification>>(
      getRepositoryToken(Verification),
    );
    await app.init();
  });
```

# afterAll
- 테스트가 끝나면 DB를 drop 해야한다.
- 그 다음으로는 app.close()를 통해 앱을 닫아야한다.
```typescript
  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });
```

# graphql endpoint connection
```typescript
const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
```

# send query
```typescript
  const publicTest = (query: string) => baseTest().send({ query });
```

# jwt token setting
아래와 같이 post 직후 set을 통해 원하는 헤더를 붙여줄 수 있다.
```typescript
 const privateTest = (query: string) =>
    baseTest()
      .set('X-JWT', jwtToken)
      .send({ query });
```

# grapqhl 기반 backend에서 Query 요청하고 이를 따라해서 테스팅에 적용하기
https://graphql-kr.github.io/learn/serving-over-http/#post-request 에 따르면 표준 GraphQL POST 요청은 application/json content-type을 사용해야하며 아래 형식의 JSON 인코딩 바디을 포함해야 한다.
```json
{
  "query": "...",
  "operationName": "...",
  "variables": { "myVariable": "someValue", ... }
}
```
- operationName과 variables는 옵셔널 필드이다. 
- operationName은 쿼리에 여러 작업이 있는 경우에만 필요하다.
- 위 내용 외에도 추가로 두 가지 경우를 지원하는 것이 좋습니다.
  - query (위 GET 예제처럼)쿼리스트링 파라미터가 있는 경우, HTTP GET의 경우와 같은 방식으로 구문 분석되고 처리되어야 한다.
  - application/graphql Content-Type header가 있는 경우 HTTP POST body 내용을 GraphQL 쿼리스트링으로 처리한다.
  

# createAccount
계정 생성이 성공하는 케이스와 이미 이메일 계정이 존재하는 경우로 테스트 항목 정의
```
  describe('createAccount', () => {
    it('should create account', () => {
      return publicTest(`
        mutation {
          createAccount(input: {
            email:"${testUser.email}",
            password:"${testUser.password}",
            role:Owner
          }) {
            ok
            error
          }
        }
        `)
        .expect(200)
        .expect(res => {
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
        });
    });

    it('should fail if account already exists', () => {
      return publicTest(`
          mutation {
            createAccount(input: {
              email:"${testUser.email}",
              password:"${testUser.password}",
              role:Owner
            }) {
              ok
              error
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                createAccount: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(false);
          expect(error).toBe('There is a user with that email already');
        });
    });
  });
```

#login
로그인이 성공한 경우와 패스워드 오류로 성공하지 않은 경우로 테스트 항목 정의

```typescript
  describe('login', () => {
    it('should login with correct credentials', () => {
      return publicTest(`
          mutation {
            login(input:{
              email:"${testUser.email}",
              password:"${testUser.password}",
            }) {
              ok
              error
              token
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(true);
          expect(login.error).toBe(null);
          expect(login.token).toEqual(expect.any(String));
          jwtToken = login.token;
        });
    });
    
    it('should not be able to login with wrong credentials', () => {
      return publicTest(`
          mutation {
            login(input:{
              email:"${testUser.email}",
              password:"xxx",
            }) {
              ok
              error
              token
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(false);
          expect(login.error).toBe('Wrong password');
          expect(login.token).toBe(null);
        });
    });
  });
```

# userProfile
```typescript
 describe('userProfile', () => {
    let userId: number;
    beforeAll(async () => {
      const [user] = await usersRepository.find();
      userId = user.id;
    });
    it("should see a user's profile", () => {
      return privateTest(`
          {
            userProfile(userId:${userId}){
              ok
              error
              user {
                id
              }
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                userProfile: {
                  ok,
                  error,
                  user: { id },
                },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(id).toBe(userId);
        });
    });
    it('should not find a profile', () => {
      return privateTest(`
          {
            userProfile(userId:666){
              ok
              error
              user {
                id
              }
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                userProfile: { ok, error, user },
              },
            },
          } = res;
          expect(ok).toBe(false);
          expect(error).toBe('User Not Found');
          expect(user).toBe(null);
        });
    });
  });
```

# me
```typescript
  describe('me', () => {
    it('should find my profile', () => {
      return privateTest(`
          {
            me {
              email
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                me: { email },
              },
            },
          } = res;
          expect(email).toBe(testUser.email);
        });
    });
    it('should not allow logged out user', () => {
      return publicTest(`
          {
            me {
              email
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: { errors },
          } = res;
          const [error] = errors;
          expect(error.message).toBe('Forbidden resource');
        });
    });
  });
```

# editProfile
```typescript
  describe('editProfile', () => {
    const NEW_EMAIL = 'nico@new.com';
    it('should change email', () => {
      return privateTest(`
            mutation {
              editProfile(input:{
                email: "${NEW_EMAIL}"
              }) {
                ok
                error
              }
            }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                editProfile: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
        });
    });
    it('should have new email', () => {
      return privateTest(`
          {
            me {
              email
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                me: { email },
              },
            },
          } = res;
          expect(email).toBe(NEW_EMAIL);
        });
    });
  });
```

```typescript
  describe('editProfile', () => {
  const NEW_EMAIL = 'nico@new.com';
  it('should change email', () => {
    return privateTest(`
            mutation {
              editProfile(input:{
                email: "${NEW_EMAIL}"
              }) {
                ok
                error
              }
            }
        `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              editProfile: { ok, error },
            },
          },
        } = res;
        expect(ok).toBe(true);
        expect(error).toBe(null);
      });
  });
  it('should have new email', () => {
    return privateTest(`
          {
            me {
              email
            }
          }
        `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              me: { email },
            },
          },
        } = res;
        expect(email).toBe(NEW_EMAIL);
      });
  });
});

describe('verifyEmail', () => {
  let verificationCode: string;
  beforeAll(async () => {
    const [verification] = await verificationsRepository.find();
    verificationCode = verification.code;
  });
  it('should verify email', () => {
    return publicTest(`
          mutation {
            verifyEmail(input:{
              code:"${verificationCode}"
            }){
              ok
              error
            }
          }
        `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              verifyEmail: { ok, error },
            },
          },
        } = res;
        expect(ok).toBe(true);
        expect(error).toBe(null);
      });
  });
  it('should fail on verification code not found', () => {
    return publicTest(`
          mutation {
            verifyEmail(input:{
              code:"xxxxx"
            }){
              ok
              error
            }
          }
        `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              verifyEmail: { ok, error },
            },
          },
        } = res;
        expect(ok).toBe(false);
        expect(error).toBe('Verification not found.');
      });
  });
});
```