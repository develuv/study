React CRA 실무 환경 적용기

## 개요
- 웹프론트엔드는 Webpack 과 같은 번들러와 Babel 과 같은 트랜스파일링등 개발을 위한 기본적인 설정 파일들 뿐만 아니라 lint 같은 코드 품질 도구나 각종 컨벤션 플로그인, 코드 최적화 및 테스팅 도구까지 관리해 줘야 할 것들이 매우 많다. 
- 개발 환경 구축에 들이는 비용을 조금이라도 줄이고자 하는 상황에서 간단한 명령어 한줄로 개발 환경 구축해주는 CRA 나 vite 같은 도구들을 이용하여 쉽게 개발 환경을 구축해 사용하는 것을 한번쯤 고민해 보셨을 것이다.
- 대부분 많은 프론트엔드 개발자들은 CRA 혹은 vite 같은 개발 환경 구축 도구보다는 직접 webpack, babel, eslint 등 이미 구축된 프로젝트를 참고하여 구축하는 것을 선호할 것이다.
- 하지만 대부분의 경우, CRA 나 vite 같은 개발환경 구축도구를 이용한 결과물보다 못한 경우가 많았고 특히, 유지보수적인 측면에서 많은 설정 파일과 의존성 라이브러리들간의 호환성 문제로 이후 관리가 매우 어렵다는 단점이 있다.
- 실제로 구축 이후 운영되는 많은 프로덕트 코드들이 지속적인 관리에 실패하여 결국 개발환경을 재구축하는 경우를 많이 경험하였다.
- 하지만 그럼에서 실무 환경에서는 CRA 같은 개발환경 구축 도구를 이용하여 운영하는 것은 어려운 일이라고 생각한다. 정말 그러할까?
- 여기서는 CRA를 실무에서 어떻게 적용할 수 있는지 점검해 보도록 하겠다.

## 개발 환경 구축 도구(CRA)의 장점
- 빠른 개발 환경 구축
- 설정의 편리성과 이로인한 유지보수의 장점
- 의존성 관리가 편하다.
  - react-scripts 에서 대부분의 설정에 필요한 필요한 의존성을 가지고 있다.

## 개발 환경 구축 도구(CRA)의 단점
- 어려운 커스텀마이징
- 디테일한 설정 불가
  - 치명적인 단점으로 alias 를 사용할 수 없다.
  - 마찬가지로 jest 에서도 import 되는 파일의 alias 경로를 설정해 줄 수 없다
  - 절대 경로를 제대로 인식하지 못한다.
  - 추가적인 플러그인 설정이 불가능하다.
  - 빌드되는 파일(명) 형식을 변경하기 어렵다.
  - 기본적으로 웹팩 설정 자체를 변경할 수 없다.

## CRA는 실무에서는 사용할 수 없는가?
결국 CRA를 실무에 적용하기 위해서는 실무에서 상황마다 필요한 설정등을 비교적 자유롭게 구성할 수 있어야 한다.
위의 단점을 극복하기 위한 두가지 방법이 존재한다.

1. eject : eject 스크립트를 실행함으로써 모든 설정을 노출시킬 수 있다. 다만, 이 경우에는 다시 이전으로 돌리는 것은 불가능하며 설정의 단숨함이 주는 잇점은 사라진다.
2. react-app-rewired : cra 설정을 오버라이드 할 수 있게 해준다. 필요한 부분만 오버라이드 할 수 있다. 다만, webpack이나 jest 같은 환경 구축에 필요한 설정들을 잘 이해하고 있어야 가능하다.

## 프로젝트 생성
`npx create-react-app [프로젝트 이름] --template typescript
   `
## 프로젝트 오버라이드

### react-app-rewired 설치
`yarn add react-app-rewired --dev`

### webpack-bundle-analyzer 설치
`yarn add webpack-bundle-analyzer --dev`

### webpack-retry-chunk-load-plugin 설치
`webpack-retry-chunk-load-plugin --dev`

### prettier 설정
#### devDependencies 설치
`yarn add prettier --dev`

#### .prettierrc 파일 생성
````
{
"printWidth": 150,
"trailingComma": "es5",
"tabWidth": 2,
"semi": true,
"singleQuote": true,
"bracketSpacing": true,
"arrowParens": "avoid",
"useTabs": false,
"parser": "typescript"
}
````

### eslint 설정

#### devDependencies 설치

##### eslint 설치
`yarn add eslint --dev`

##### typescript recommended rule 
```
yarn add @typescript-eslint/eslint-plugin --dev
yarn add @typescript-eslint/parser --dev
```

#### airbnb recommended rule
`yarn add eslint-config-airbnb --dev`
`yarn add eslint-config-airbnb-typescript --dev`

#### prettier recommended rule
`yarn add eslint-config-prettier --dev`

#### import recommended rule
`yarn add eslint-plugin-import --dev`

#### jsx-a11y recommended rule
`yarn add eslint-plugin-jsx-a11y --dev`

#### prettier recommended rule
`yarn add eslint-plugin-prettier --dev`

#### react recommended rule
`yarn add eslint-plugin-react --dev`

#### react-hook recommended rule
`yarn add eslint-plugin-react-hook --dev`

#### .eslintrc.json 파일 생성
```
{
    "env": {
        "browser": true, // Browser global variables like `window` etc.
        "commonjs": true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        "es6": true, // Enable all ECMAScript 6 features except for modules.
        "jest": true, // Jest global variables like `it` etc.
        "node": true // Defines things like process.env when generating through node
    },
    "extends": [
        "airbnb",
        "airbnb-typescript",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "prettier",
        "jsx-a11y"
    ],
    "rules": {
        "react/jsx-props-no-spreading": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
        "import/no-unresolved": 0,
        "@typescript-eslint/naming-convention": 0,
        "react/require-default-props": 0,
        "@typescript-eslint/no-empty-interface": 0
    },
    "ignorePatterns": [
        "build/**/*.*",
        "config-overrides.js"
    ]
}
```

