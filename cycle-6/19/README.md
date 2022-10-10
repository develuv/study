# 19. E2E 리엑트 테스팅

> 브라우저에서 실행되는 모든 항목에 대한 빠르고 쉽고 안정적인 테스트.
> - 내부적으로 테스팅 라이브러리를 사용하며 cypress의 철학은 테스팅 라이브러리의 정신과 테스트 작성 접근 방식과 밀접하게 일치합니다. 우리는 그들의 모범 사례를 강력히 지지합니다.




## 19.0 Cypress 설치

### 설치 및 실행
```sh
npm install cypress
cypress open
```

### tsconfig 설정
```ts
// cypress/tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": "../node_modules",
    "outDir": "#",
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```
> [Configure tsconfig.json
](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript)


### 첫 테스트 실행
- New Spec 버튼으로 테스트 케이스 생성

```ts
// cypress/e2e/first-test.cy.ts
describe('First Test', () => {
  it('should go to homepage', () => {
    cy.visit('https://localhost:5173/').title().should('eq', 'Login - Nuber');
  });
});
```

## 19.1 Cypress 테스트

- baseUrl 세팅
- 로그인 타이틀 체크
- cypress 셀렉터를 활용하여 돔 셀렉터를 받아올수 있다.
- type으로 타이핑
- should 첫번째 인자에 chains로 assertion 할당 (`Chai` or `Chai-jQuery` or `Sinon-Chai`) [assertions](https://docs.cypress.io/guides/references/assertions)



```ts
// cypress.config.ts
baseUrl: 'https://localhost:5173/'
```

```ts
describe('Log In', () => {
  it('should see login page', () => {
    cy.visit('/').title().should('eq', 'Login - Nuber');
  });
  it('can fill out the form', () => {
    cy.visit('/')
      .findByPlaceholderText(/email/i)
      // .get('[name="email"]')
      .type('ldj525@naver.com')
      .get('[name="password"]')
      .type('12345')
      .get('.button')
      .should('not.have.class', 'pointer-events-none');
    // todo can login
  });
  it('can see email / password validation errors', () => {
    cy.visit('/').get('[name="email"]').type('bad@email').get('.grid > .font-medium').should('have.text', 'Please enter a vaild email');
  });
});

```
https://docs.cypress.io/guides/component-testing/mounting-react#Cypress-and-Testing-Library


## 19.2 Login E2E

- testing-library 셀렉터를 사용하기 위해서는 체이닝 분리가 필요
- `cy.window().its('localStorage.[로컬스토리지명]')`으로 저장한 로컬스토리지 테스트 가능
- 각각의 테스트마다 로컬스토리지는 공유 및 저장 되지 않는다

```ts
describe('Log In', () => {
  it('should see login page', () => {
    cy.visit('/').title().should('eq', 'Login - Nuber');
  });
  it('can see email / password validation errors', () => {
    cy.visit('/');
    cy.findByPlaceholderText(/email/i).type('bad@email');
    cy.findByRole('alert').should('have.text', 'Please enter a vaild email');
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole('alert').should('have.text', 'Email is required');
    cy.findByPlaceholderText(/email/i).type('ldj525@naver.com');
    cy.findByPlaceholderText(/password/i)
      .type('1')
      .clear();
    cy.findByRole('alert').should('have.text', 'Password is required');
  });
  it('can fill out the form', () => {
    cy.visit('/');
    cy.findByPlaceholderText(/email/i).type('ldj525@naver.com');
    cy.findByPlaceholderText(/password/i).type('12345');
    cy.findByRole('button').should('not.have.class', 'pointer-events-none').click();
    cy.window().its('localStorage.nuber-token').should('be.a', 'string');
  });
  it('sign up', () => {
    cy.visit('/create-account');
  });
});

```

## 19.3-4 Create Account E2E part.1-2

- 네트워크 인터셉트 하기
  - 응답값 인터셉트
  - 실제응답값은 에러이지만 성공으로 응답
- 응답 레이턴시 고려하여 딜레이 추가`cy.wait(1000);`


```ts
describe('Create Account', () => {
  it('should see email / password validation errors', () => {
    cy.visit('/');
    cy.findByText(/Create an Account/i).click();
    cy.findByPlaceholderText(/email/i).type('bad@email');
    cy.findByRole('alert').should('have.text', 'Please enter a vaild email');
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole('alert').should('have.text', 'Email is required');
    cy.findByPlaceholderText(/email/i).type('ldj525@naver.com');
    cy.findByPlaceholderText(/password/i)
      .type('1')
      .clear();
    cy.findByRole('alert').should('have.text', 'Password is required');
  });
  it('should be able to create account', () => {
    cy.intercept('http://localhost:3000/graphql', (req) => {
      if (req.body.operationName === 'createAccount') {
        req.reply((res) => {
          res.send({
            data: {
              createAccount: {
                ok: true,
                error: null,
                __typename: 'CreateAccountOutput'
              }
            }
          });
        });
      }
    });
    cy.visit('/create-account');
    cy.findByPlaceholderText(/email/i).type('test6@naver.com');
    cy.findByPlaceholderText(/password/i).type('12345');
    cy.findByRole('button').should('not.have.class', 'pointer-events-none').click();
    cy.wait(1000);
    cy.findByPlaceholderText(/email/i).type('test6@naver.com');
    cy.findByPlaceholderText(/password/i).type('12345');
    cy.findByRole('button').should('not.have.class', 'pointer-events-none').click();
    cy.window().its('localStorage.nuber-token').should('be.a', 'string');
  });
});
```


## 19.5 Custom Commands

- 반복적인 명령들을 커스텀 커맨드로 묶어서 사용할 수 있다
- 파라미터 지정도 가능
- `Chainable` 인터페이스를 확장해서 커맨드 타입을 추가한다

```ts
// cypress/support/commands.ts
Cypress.Commands.add('assertLoggedIn', () => {
  cy.window().its('localStorage.nuber-token').should('be.a', 'string');
});

Cypress.Commands.add('assertLoggedOut', () => {
  cy.window().its('localStorage.nuber-token').should('be.undefined');
});

Cypress.Commands.add('validateSignForm', () => {
  cy.findByPlaceholderText(/email/i).type('bad@email');
  cy.findByRole('alert').should('have.text', 'Please enter a vaild email');
  cy.findByPlaceholderText(/email/i).clear();
  cy.findByRole('alert').should('have.text', 'Email is required');
  cy.findByPlaceholderText(/email/i).type('ldj525@naver.com');
  cy.findByPlaceholderText(/password/i)
    .type('1')
    .clear();
  cy.findByRole('alert').should('have.text', 'Password is required');
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.assertLoggedOut();
  cy.title().should('eq', 'Login - Nuber');
  cy.findByPlaceholderText(/email/i).type(email);
  cy.findByPlaceholderText(/password/i).type(password);
  cy.findByRole('button').should('not.have.class', 'pointer-events-none').click();
  cy.assertLoggedIn();
});
```

```ts
// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    assertLoggedIn: () => void;
    assertLoggedOut: () => void;
    login: (email: string, password: string) => void;
    validateSignForm: () => void;
  }
}
```

```ts
cy.validateSignForm();
// ...
cy.login('ldj525@naver.com', '12345');
// ...
cy.assertLoggedIn();
```

## 19.6-7 Edit Profile E2E part.1-2

- request인터셉터를 통해 헤더나 페이로드를 조작할 수 있다
- beforeEach로 로그인 로직을 한곳에서 관리

```ts
// cypress/e2e/user/edit-profile.cy.ts
describe('Edit Profile', () => {
  beforeEach(() => {
    cy.login('ldj5252@naver.com', '12345');
  });
  it('can go to /edit-profile using the header', () => {
    cy.get('a[href="/edit-profile"]').click();
    cy.title().should('eq', 'Edit Profile - Nuber');
  });
  it('can change email', () => {
    cy.intercept('http://localhost:3000/graphql', (req) => {
      if (req.body.operationName === 'editProfile') {
        req.body.variables.input.email = 'ldj5252@naver.com';
        console.log(req.body);
      }
    });
    cy.visit('/edit-profile');
    cy.findByPlaceholderText(/email/i).clear().type('ldj5256@naver.com');
    cy.findByRole('button').click();
  });
});
```
