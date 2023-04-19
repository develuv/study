# SvelteKit 1.0 알아보기

## SvelteKit이란?

- svelete를 이용하여 빠르게 웹 어플리케이션을 개발하기 위한 프레임워크입니다.
- 유사 프레임워크
    - NextJS (React)
    - NuxtJS (Vue)
- Svelte 만 이용하여 어플리케이션을 구성할 수 있지만 그 외 필요한 것들도 같이 제공합니다.
    - 파일 시스템 기반 Router 제공
    - CSR, SSR, Prerendering(SSG) 설정 제공
    - Preloading 으로 빠른 렌더링 제공
    - Vite를 이용한 HMR, Build 제공
    - ETC.
- SvelteKit 프로젝트 셋업 CLI를 통해 프로젝트 셋업을 간단하게 할 수 있습니다.
    
    ```tsx
    npm create svelte@latest [project-name]
    ```
    
    - Type system : Typescript, Javascript with jsdoc
    - Linter : ESLint
    - Fomartter: Prettier
    - E2E Test : Playwright
    - Unit Test : Vitest

## Structure

```bash
src
├── lib // 유틸리티나 컴포넌트를 포함하는 디렉토리
│   └── server // 서버 전용 라이브러리를 모아두는 디렉토리 (클라에서 사용하는 경우 예외)
├── params // routes의 보조역할로, param matchers를 통해 허용된 파라미터만 받을 수 있도록 설정할 수 있음.
├── routes // 애플리케이션 경로 디렉토리
├── app.html // 기본 템플릿
├── error.html // 에러 페이지
└── service-worker.js // 서비스워커
static // static 파일 디렉토리
tests // playwright e2e 테스트 디렉토리
```

위 구조에 따라 `.svelte-kit` 폴더가 생성됩니다.

- `./$types` 라우트에 대한 타이핑이 자동으로 생성되고 해당 alias로 가져올 수 있습니다.
- `$lib` lib 폴더에 있는 유틸리티, 컴포넌트 등을 해당 alias로 가져올 수 있습니다.
- `$app`

## Routes

라우트를 사용하기 위해선 SvelteKit에서 정의한 인터페이스에 맞추어 명명해야 합니다.

- `+page.svelte` 페이지 UI 컴포넌트를 정의합니다.
- `+page.(js|ts)` 페이지에서 필요한 데이터를 로드하거나 렌더링 방법을 설정할 수 있습니다.
    - `load()` 페이지에 필요한 데이터를 반환하면 `.svelte` 파일에서 사용할 수 있습니다.
    - prerender, ssr, csr 옵션을 이용하여 렌더링 방법을 설정할 수 있습니다.

```tsx
export const load = () => { /* ... */ }
export const prerender = true;
export const ssr = true;
export const csr = true;
```

- `+page.server.(js|ts)` 위의 파일처럼 렌더링 방법을 설정할 수 있고 load 함수를 사용할 수 있지만, **서버에서만 실행**되도록 할 수 있는 파일입니다.
    - `actions()` 폼 액션에 대해 처리할 수 있습니다.
    - load 함수에서의 반환값은 `data` 명칭으로 prop으로 전달됩니다.
- `+error.svelte` 오류가 발생하는 경우 동일한 레벨에 있는 해당 파일을 렌더링 합니다.
    - 동일한 레벨에 없는 경우 트리를 따라 올라가면서 해당 파일이 있는지 찾습니다.
    - 루트의 `+layout` 의 로드에서 예외가 발생하면 루트에 있는 `error.html` 을 렌더링 합니다.
- `+layout` 공통으로 들어가는 요소들을 레이아웃입니다. GNB, Footer 등 공통으로 렌더링할 요소를 포함합니다.
    - `+layout.svelte`
        - `<slot>` 이 선언된 부분에 콘텐츠가 교체됩니다.
        - 루트 뿐만 아닌 하위 경로에서도 중첩으로 사용할 수 있습니다.
    - `+layout.(js|ts)` `+layout.server.(js|ts)`
        - 페이지의 스크립트 파일과 동일한 기능을 제공합니다.
        - 페이지가 변경될 때 레이아웃의 로드를 다시 실행시킬 수 있습니다.

## Loading Data

`.server.ts` `.ts` 파일에서 사용하는 `load()` 함수에 대한 내용입니다.

라우트의 각 파일에서 반환되는 타입은 `.svelte-kit` 폴더 하위에 자동으로 생성됩니다.

- Page
    - load 함수 타입: `PageLoad` `PageServerLoad`
    - 반환되는 data 타입: `PageData`
- Layout
    - load 함수 타입: `LayoutLoad` `LayoutServerLoad`
    - 반환되는 data 타입: `LayoutData`
- $page.data
    - `page.svelte` 에서 `layout.svelte` 의 데이터와 부모의 모든 데이터를 사용할 수 있습니다.
    - 심지어 반대로 `layout.svelte` 에서 `page.svelte` 의 데이터도 사용할 수 있습니다.

## Server vs. Client

`.ts` 파일에서의 load 함수는 범용성으로 서버와 클라이언트에서 모두 실행됩니다.

`.server.ts` 파일에서는 load 함수가 서버에서만 실행됩니다.

- 차이점
    - Input
        - `.server.ts` 에서는 cookies, request, platform 등 접근이 가능합니다.
        - `.ts` 에서는 서버와 클라이언트에서 모두 사용할 수 있는 url 관련 정보와 data 속성을 사용할 수 있습니다.
    - Output
        - 서버의 경우 시리얼라이즈 가능한 데이터의 값을 반환해야 합니다.

## 예외, 리디렉션 유틸 함수

- `error` 로드 중 예상 가능한 오류의 경우 `@sveltejs/kit` 에 있는 error 함수를 사용할 수 있습니다.
- `redirect` 리디렉션 하기위해서 3xx 코드와 함께 위치를 지정할 수 있습니다.

```tsx
import { error, redirect } from '@sveltejs/kit'
export const load = () => {
	if (!user) {
		throw redirect(307, '/login');
  }

	if (!anything) {
		throw error(404, 'Not Found');
  }
};
```

## 수동 무효화

- load 함수의 인자로 제공되는 `fetch` `depends` 함수를 통해 강제로 데이터를 최신화 시킬 수 있습니다.
- fetch의 `url`, depends의 `이름` 을 load 함수에 사용하고 `.svelte` 파일에서 `invalidate` `invalidateAll` sveltekit에서 제공하는 유틸 함수를 통해 재실행 시킬 수 있습니다.

## 렌더링

- prerender
    - `true` 로 설정하는 경우 빌드시 HTML을 생성하여 미리 렌더링 할 수 있습니다.
    - `false` 로 설정하는 경우 빌드시 포함하지 않습니다.
    - `auto` 로 설정하는 경우 동적 패스를 사전 렌더링하고 롱테일은 서버사이드 렌더링 할 수 있습니다.
    
    ```tsx
    export const prerender = true | false | 'auto';
    ```
    
    - SvelteKit은 명시적으로 prerender를 설정하지 않으면 기본으로 prerender 값은 true입니다.
    - 엔드포인트로 `+server.ts` 파일을 생성한다면 하위에 더이상 라우트를 생성할 수 없습니다.
        - 대응할 수 있는 방법은 `+server.ts` 가 있는 폴더명에 확장자를 붙이면 하위로 생성할 수 있습니다.
        - 페이지인 경우 `index.html` 을 생성할 수 있습니다.
        - 이렇게 엔드포인트로 사용하는 경우 클라이언트 측 라우팅이 비활성화 됩니다.
    
    ```tsx
    // X
    src/route/foo/+server.ts.     ---> /foo
    src/route/foo/bar/+server.ts. ---> /foo/bar
    
    // O
    src/route/foo.json/+server.ts.     ---> /foo.json
    src/route/foo/bar.json/+server.ts. ---> /foo/bar.json
    
    src/route/foo/index.html
    ```
    
- ssr
    - 서버에서 렌더링할 수 있도록 하고 false로 설정한 경우 빈 페이지가 렌더링됩니다.
    - 루트에 있는 `+layout.ts` 에 false로 설정한다면 SPA로 사용할 수 있습니다.
- csr
    - 클라이언트 측에서만 렌더링 되도록 설정할 수 있습니다.
    - 자바스크립트가 필요없는 정보만 있는 페이지에서 false로 설정할 수 있습니다.
    - csr: false인 경우 하이드레이션이 발생하지 않아 자바스크립트 기능 동작이 되지 않습니다.
- trailingSlash
    - path 뒤에 붙는 슬래시의 여부를 정하는 옵션으로 `always` `never(default)` `ignore` 세가지를 설정할 수 있습니다.
    - 뒤에 붙는 슬래시로 SEO에도 좋지 않은 영향을 끼칠 수 있어 되도록 사용하지 않는 것이 좋습니다.