# 15장.

## codegen setup

[Apollo CLI](https://github.com/apollographql/apollo-tooling)

```
Are you here for codegen? We highly recommend using graphql-code-generator instead. Codegen in this repo is no longer supported and will be removed completely in a future version. For additional migration details, please see this fantastic writeup by @dotansimha: #2053
```

- 공식 github에 graphql-code-generator를 권장하는 내용이 있다.

> codegen을 여기에서 끝!

## graphql-code-generator

- GraphQL 스택을 최대한 활용하는데 사용하는 플러그인 기반 도구라고 설명되어 있다.
- GraphQL에서 제공하는 타입이 변경될 수도 있는 부분에서 본다면 프론트엔드에서 수동으로 관리하기란 쉽지 않고 영향 범위가 넓습니다.
- 타입을 자동화하여 타입 안정성을 더욱 극대화 할 수 있다고 합니다.

[React Apollo](https://www.graphql-code-generator.com/docs/guides/react#apollo-and-urql)

### Install

```bash
yarn add graphql
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

- script 추가

```json
{
  "script": {
    "generate": "graphql-codegen"
  },
  "dependencies": {
    "graphql": "^16.5.0"
  },
  "devDependencies": {
    "@graphql-codegen/cli": "2.11.3",
    "@graphql-codegen/typescript": "^2.7.2",
    "@graphql-codegen/typescript-operations": "^2.5.2",
    "@graphql-codegen/typescript-react-apollo": "3.3.2"
  }
}
```

### Generate codegen.yml

```yml
schema: 'http://localhost:4000/graphql'
generates:
  src/__generate__/types.ts:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
```

- schema field
  - GraphQL url을 나타낸다. root 외에도 각 generate 별로도 스키마를 별도로 설정할 수 있다.
- document
  - GraphQL query, mutation, subscription, fragment가 작성되어 있는 문서를 가리켜야 합니다.

### Run

```bash
yarn generate
```

- 타입들이 생성되는 위치

```
src/__generate__
└── types.ts
```

> 각 사용하는 부분별로 생성하고 싶은 경우 [@graphql-codegen/near-operation-file-preset](https://www.graphql-code-generator.com/docs/advanced/generated-files-colocation) 플러그인을 이용할 수도 있을 것 같다.
