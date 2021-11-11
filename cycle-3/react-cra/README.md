# React CRA 실무 환경 적용기

## 개요
웹프론트엔드는 Webpack 과 같은 번들러와 Babel 과 같은 트랜스파일링등 개발을 위한 기본적인 설정 파일들 뿐만 아니라 lint 같은 코드 품질 도구나 각종 컨벤션 플로그인, 코드 최적화 및 테스팅 도구까지 관리해 줘야 할 것들이 매우 많다. 

개발 환경 구축에 들이는 비용을 조금이라도 줄이고자 하는 상황에서 간단한 명령어 한줄로 개발 환경 구축해주는 CRA 나 vite 같은 도구들을 이용하여 쉽게 개발 환경을 구축해 사용하는 것을 한번쯤 고민해 보셨을 것이다. 

대부분 많은 프론트엔드 개발자들은 CRA 혹은 vite 같은 개발 환경 구축 도구보다는 직접 webpack, babel, eslint 등 이미 구축된 프로젝트를 참고하여 구축하는 것을 선호할 것이다. 

하지만 대부분의 경우, CRA 나 vite 같은 개발환경 구축도구를 이용한 결과물보다 못한 경우가 많았고 특히, 유지보수적인 측면에서 많은 설정 파일과 의존성 라이브러리들간의 호환성 문제로 이후 관리가 매우 어렵다는 단점이 있다. 

실제로 구축 이후 운영되는 많은 프로덕트 코드들이 지속적인 관리에 실패하여 결국 개발환경을 재구축하는 경우를 많이 경험하였다. 

하지만 그럼에서 실무 환경에서는 CRA 같은 개발환경 구축 도구를 이용하여 운영하는 것은 어려운 일이라고 생각한다. 정말 그러할까? 

여기서는 CRA를 실무에서 어떻게 적용할 수 있는지 점검해 보도록 하겠다.

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

1. eject : eject 스크립트를 실행함으로써 모든 설정을 노출시킬 수 있다. 다만, 이 경우에는 다시 이전으로 돌리는 것은 불가능하며 설정의 단순함이 주는 잇점은 사라진다.
2. react-app-rewired : cra 설정을 오버라이드 할 수 있게 해준다. 필요한 부분만 오버라이드 할 수 있다. 다만, webpack이나 jest 같은 환경 구축에 필요한 설정들을 잘 이해하고 있어야 가능하다.

## 프로젝트 생성
`npx create-react-app [프로젝트 이름] --template typescript
   `
## 프로젝트 오버라이드

### react-app-rewired 설치

#### react-app-rewired devDependencies 설치
react cra 설정을 오버라이드할 수 있도록 해주는 의존성 라이브러리를 설치한다.

`yarn add react-app-rewired --dev`

#### webpack-bundle-analyzer plugin devDependencies 설치
build 결과물 상태를 분석하여 중복 리소스를 분석하는데 유리하다. 

`yarn add webpack-bundle-analyzer --dev`

#### webpack-retry-chunk-load-plugin plugin devDependencies 설치
실무 환경에서 dynamic module import 사용 시, 'chunkloaderror loading chunk failed' 오류의 간현적으로 발생하게 된다.

이를 방지하기 위해 webpack-retry-chunk-load-plugin을 설치한다.

주의 사항으로는 v2 버전은 webpack v5 버전 이상만 지원하므로 cra 같은 webpack v4 버전에서는 webpack-retry-chunk-load-plugin v1 버전으로 설치해주어야 한다.

`webpack-retry-chunk-load-plugin@1.5.0 --dev`

#### config-overrides.js 설치
```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const { BUNDLE_VISUALIZE } = process.env;
const isAddBundleVisualizer = Object.is(BUNDLE_VISUALIZE, 'true');
const publicPath = 'https://www.cdn.com/';
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

module.exports = {
  jest: function (config) {
    // alias 대응을 위한 패스 설정
    config.moduleNameMapper['^@src(.*)$'] = '<rootDir>/src$1';


    return config;
  },

  webpack: function (config, env) {
    const isProduct = env === 'production';

    // 절대 경로 사용을 위한 패스 설정
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, 'src')];

    // alias 사용을 위한 패스 설정
    config.resolve.alias = {
      '@src': path.resolve(__dirname, `src`),
    };

    // build 같은 로컬 개발 용도가 아닌 실무 용도로 사용
    if (isProduct) {
      config.output.publicPath = publicPath;
      config.optimization.runtimeChunk = true;
      config.optimization.splitChunks.name = true;

      // ManifestPlugin override
      config.plugins[6].opts.publicPath = publicPath;

      // dynamic module import 사용 시, 'chunkloaderror loading chunk failed' 오류 방지 목적
      config.plugins.push(
              new RetryChunkLoadPlugin({
                // optional value to set the amount of time in milliseconds before trying to load the chunk again. Default is 0
                retryDelay: 200,
                // optional value to set the maximum number of retries to load the chunk. Default is 1
                maxRetries: 5,
              })
      );

      // bundle 결과를 비쥬얼하게 확인하는 용도
      isAddBundleVisualizer && config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};
```

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

##### typescript recommended rule 
typescript rule 체크를 위한 의존성라이브러리를 설치한다.

`yarn add @typescript-eslint/eslint-plugin --dev`

`yarn add @typescript-eslint/parser --dev`

#### airbnb recommended rule
airbnb에서 권장하는 rule 체크를 위한 의존성 라이브러리를 설치한다.

`yarn add eslint-config-airbnb --dev`

`yarn add eslint-config-airbnb-typescript --dev`

#### prettier recommended rule
prettier 설정과 연동하기 위한 의존성 라이브러리를 설치한다.

`yarn add eslint-config-prettier --dev`

`yarn add eslint-plugin-prettier --dev`

#### import recommended rule
es6 import 구문에 대한 rule 체크를 위한 의존성 라이브러리를 설치한다.

`yarn add eslint-plugin-import --dev`

#### jsx-a11y recommended rule
jsx 템플릿에 대한 기본적인 접근성 rule 체크를 위한 의존성 라이브러리를 설치한다.

`yarn add eslint-plugin-jsx-a11y --dev`

#### react recommended rule
react 권장 rule 체크를 위한 의존설 라이브러리를 설치한다.

`yarn add eslint-plugin-react --dev`

#### react-hook recommended rule
react hook을 사용하고 있다면 react-hook 권장 rule 체크를 위한 라이브러리를 추가 설치한다.

`yarn add eslint-plugin-react-hook --dev`

#### .eslintrc.json 파일 생성
```json
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

#### tsconfig-paths-webpack-plugin devDependencies 설치
`yarn add tsconfig-paths-webpack-plugin --dev`

#### tsconfig.paths.json 파일 생성
https://github.com/facebook/create-react-app/issues/8909 를 살펴보면 tsconfig.json에 paths 를 추가하면 빌드 시점에서 해당 패스 설정이 사라지는 현상이 발생한다.

이를 방지하려면 파일을 별도로 설정하고 tsconfig.json에 별도로 연결해 줘야 한다.
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      // webpack alia 설정에 맞춰서 패스 설정 필요
      "@src/*": ["./*"]
    }
  }
}
```

#### tsconfig.json
위에서 설정한 tsconfig.paths.json을 아래와 같이 연결해 준다. 

`"extends": "./tsconfig.paths.json"`
```json
{
  "extends": "./tsconfig.paths.json",
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es5",
      "es6",
      "es7",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src/**/*"
  ]
}
```

#### package.json 스크립트 추가
```json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "build:report": "BUNDLE_VISUALIZE=true react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject",
    "lint": "eslint ."
  },
```

## 결론
이로써 CRA 환경을 가지고 eject 하지 않고 리액트 개발환경을 구축하는 방법에 대해서 알아보았다.

본인이 webpack 이나 babel등 프로젝트 구축에 필요한 기술에 자신이 있다면 인터넷상에 레퍼런스를 참고하여 진행해보는 것도 좋은 선택일 수 있을 것이다. 

다만, 대부분의 devDependencies 의존성 관계를 지속적으로 유지 관리는 어느정도 필수적으로 필요할 수 있다.

하지만 필자는 대부분의 프로젝트에서 이러한 devDependencies 의존성 관리에 실패하여 업데이트를 포기하는 사례를 수 없이 보아왔다.

프로젝트의 devDependencies 와 관련 설정을 최소한으로 간결히 유지하고 싶은 개발자들에게 권하고 싶은 개발 구축 방법이 되겠다.

사실, vue나 angular에서는 cli로 구축하는게 어느정도 보편적이기 때문에 커스텀이 필요한 부분만 적절히 오버라이드해서 사용하는 것도 장기적인 프로젝트 관리에 장점으로 작용하지 않을까 생각해 본다. 

## 참고 자료
[react-router v6에서는 어떤것들이 변했을까??](https://blog.woolta.com/categories/1/posts/211)

[tsconfig.json에 paths를 추가하면 사라지는 현상](https://velog.io/@pilyeooong/tsconfig.json%EC%97%90-paths%EB%A5%BC-%EC%B6%94%EA%B0%80%ED%95%98%EB%A9%B4-%EC%82%AC%EB%9D%BC%EC%A7%80%EB%8A%94-%ED%98%84%EC%83%81)

[[webpack4] splitChunksPlugin 옵션 파헤치기](https://simsimjae.medium.com/webpack4-splitchunksplugin-%EC%98%B5%EC%85%98-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-19f5de32425a)

[Webpack을 활용한 성능향상 - 캐싱 활용하기](https://yceffort.kr/2020/07/make-use-of-long-term-caching)

https://www.npmjs.com/package/webpack-retry-chunk-load-plugin