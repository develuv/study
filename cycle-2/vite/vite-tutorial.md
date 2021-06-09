# Vite + React 기반의 프로젝트 구성하기

## 목차

-   [1. 프로젝트 생성하기](#1-프로젝트-생성하기)
-   [2. 빌드 및 데브서버 실행](#2-빌드-및-데브서버-실행)
-   [3. 원격 저장소에 올리기](#3-원격-저장소에-올리기)
-   [4. Github 페이지에 배포하기](#4-Github-페이지에-배포하기)
-   [5. eslint 추가하기](#5-eslint-추가하기)
-   [6. prettier 추가하기](#6-prettier-추가하기)
-   [7. 커밋대상 eslint 적용하기](#7-커밋대상-eslint-적용하기)
-   [8. degit을 활용하여 스캐폴딩 재사용하기](#8-degit을-활용하여-스캐폴딩-재사용하기)

## 1. 프로젝트 생성하기

repl 이용한 방법

```shell
npm init @vitejs/app
```

```shell
yarn create @vitejs/app
```

repl 없이 한번에 설정

```shell
npm init @vitejs/app [폴더명] --template [템플릿]
```

## 2. 빌드 및 데브서버 실행

in `package.json`

```json
{
    "dev": "vite", // 개발서버 실행
    "build": "tsc && vite build", // 빌드
    "serve": "vite preview" // 빌드 서버 실행
}
```

## 3. 원격 저장소에 올리기

```shell
git remote add origin [원격저장소 주소]
git push -u origin main
```

## 4. Github 페이지에 배포하기

`gh-pages` 설치

```shell
npm i -D gh-pages
```

`homepage`값 추가와 `predeploy`, `deploy` 스크립트 추가 in `package.json`

```json
{
    "homepage": "https://[깃허브 아이디].github.io/[저장소 이름]",
    "script": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d [빌드폴더]"
    }
}
```

vite 기본 base 는 `/` 인데 깃헙페이지의 도메인 루트는 `저장소 이름` 이기 때문에
vite base 경로를 저장소 이름으로 통일 시켜주어야 한다.

in `vite.config.ts`

```ts
{
    base: '/[저장소 이름]/';
}
```

페이지 배포

```shell
yarn deploy
```

## 5. eslint 추가하기

```shell
npm i -D eslint
```

```shell
eslint --init
```

`ignorePatterns`, `settings` 옵션 추가 in `.eslintrc.js`

```javascript
module.exports = {
    ignorePatterns: ['node_modules/'],
    settings: {
        react: {
            version: 'detect'
        }
    }
};
```

## 6. prettier 추가하기

```shell
npm i -D prettier
```

`.prettierrc` 파일 추가

[prettier 설정 playground](https://prettier.io/playground/) 에서 설정 추가
후 변경

```
"singleQuote": true,
"printWidth": 150,
"trailingComma": "none",
"tabWidth": 4,
```

eslint 연동

`eslint-config-prettier`: eslint 설정 충돌 비활성화

```shell
npm i -D eslint-config-prettier
```

eslint 설정에 `prettier` 추가

```js
module.exports = {
    extends: ['prettier']
};
```

ide의 prettier 지원 플러그인 설치후 저장시에 prettier 동작하도록 설정

## 7. 커밋대상 eslint 적용하기

```shell
npx mrm@2 lint-staged
```

설정 변경 in `.husky/_/pre-commit`

```
npx lint-staged --verbose
```

설정 변경 in `package.json`

```json
{
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": "eslint --fix --color",
        "*.{js,jsx,ts,tsx,css,md}": "prettier --write"
    },
    "scripts": {
        "lint-staged": "lint-staged --verbose"
    }
}
```

## 8. degit을-활용하여-스캐폴딩-재사용하기

### 원격저장소 복사(깃 히스토리 X) https://github.com/Rich-Harris/degit

로컬에서 degit을 사용하면 git clone 과는 다르게 git 히스토리 없이 템플릿만을 빠르게 복사해서 재사용할 수 있다.

```sh
npx degit [repo address] [directory]
npx degit [repo address][#branch] [directory]  // 해당 브랜치 복사 (기본 master)
npx degit [repo address][#tag] [directory]  // 해당 태그 복사
npx degit [repo address][#commitHash] [directory]  // 해당 커밋해쉬 복사
npx degit [repo address]/[directory] [directory]  // 폴더 뎁스로 들어가서 복사

// 저장소명만으로도 가능
degit github:[user]/[repo name]
```

## 참고

> -   [Vite Guide](https://vitejs.dev/guide/)
> -   [Awesome Vite](https://github.com/vitejs/awesome-vite)
> -   [Eslint Settings](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
