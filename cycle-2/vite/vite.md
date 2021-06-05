# Vite

## 기능

### NPM 종속성 해결 및 사전 번들링

- **CommonJS 및 UMD 호환성**: 페이지 로딩 속도를 개선하고 CommonJS / UMD 모듈을 ESM으로 변환하기 위해 사전 번들로 제공합니다.
- `react` 처럼 `exports` 에 동적으로 할당된 경우에도 `named import`를 사용할수 있도록 `스마트 가져오기 분석(smart import analysis)`을 수행합니다.
```ts
import React, { useState } from 'react'
```

- **성능**: 사전 번들링 단계는 esbuild로 수행되며 Vite의 콜드 시작 시간을 JavaScript 기반 번 들러보다 훨씬 빠르게 만듭니다.


![esbuild](https://user-images.githubusercontent.com/25737303/120878784-aaeb2d80-c5f9-11eb-8f3e-5cc4078af20e.JPG)


### Hot Module Replacement

- Vite는 네이티브 ESM을 통해 HMR API를 제공합니다.
- Vite는 Vue 단일 파일 구성 요소 및 React Fast Refresh에 대한 자사 HMR 통합을 제공합니다.

### Typescript 기본 지원

- Vite는 esbuild를 사용하여 TypeScript를 vanilla tsc보다 약 20 ~ 30 배 빠른 JavaScript로 변환하고 HMR 업데이트는 50ms 이내에 브라우저에 반영 될 수 있습니다
- esbuild는 유형 정보없이 변환 만 수행하기 때문에 `const enum` 및 암시 적 유형 전용 가져 오기와 같은 특정 기능을 지원하지 않습니다.
- tsconfig.json에서 "isolatedModules": true를 compilerOptions 아래에 설정해야 TS가 격리 된 트랜스 파일로 작동하지 않는 기능에 대해 경고 할 수 있습니다.
- Vite의 기본 유형은 Node.js API 용입니다. Vite 애플리케이션에서 클라이언트 측 코드의 환경을 shim하려면 tsconfig의 compilerOptions.types에 `vite/client`를 추가합니다.
    - Asset imports(`.svg`)
    - `import.meta.env`의 Vite 주입 환경 변수 유형
    - `import.meta.hot`의 HMR API 유형

### Vue

Vite는 최고 수준의 Vue 지원을 제공합니다.

- Vue 3 SFC support via @vitejs/plugin-vue
- Vue 3 JSX support via @vitejs/plugin-vue-jsx
- Vue 2 support via underfin/vite-plugin-vue2

### JSX

- .jsx 및 .tsx 파일도 기본적으로 지원됩니다.
- 트랜스 파일도 esbuild를 통해 처리되며 기본값은 React 16 플레이버입니다.
- 수동 임포트를 방지하기 위해 jsxInject (Vite 전용 옵션)를 사용하여 JSX 도우미를 삽입 할 수 있습니다. <br/>
  <details>
    <summary>vite.config.js</summary>
    <div>

  ```js
  // vite.config.js
  export default {
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
  };
  ```

    </div>
  </details>

### Css

- .css 파일을 가져 오면 HMR이 지원되는 <style> 태그를 통해 해당 콘텐츠가 페이지에 삽입됩니다. 처리 된 CSS를 모듈의 `default export`로 문자열로 검색 할 수도 있습니다.
- Vite는 postcss-import를 통해 CSS @import 인라인을 지원하도록 사전 구성되어 있습니다.
- Vite 별칭은 CSS @import에도 적용됩니다. 또한 가져온 파일이 다른 디렉토리에 있더라도 모든 CSS url () 참조는 정확성을 보장하기 위해 항상 자동으로 리베이스됩니다.
- .module.css로 끝나는 모든 CSS 파일은 CSS 모듈 파일로 간주됩니다. 이러한 파일을 가져 오면 해당 모듈 객체가 반환됩니다. <br/>
  <details>
  <summary>open</summary>
  <div>

  ```css
  /* example.module.css */
  .red {
    color: red;
  }
  ```

  ```js
  import classes from "./example.module.css";
  document.getElementById("foo").className = classes.red;
  ```

  </div>
  </details>

### CSS 전처리기

- Vite는 최신 브라우저만을 대상으로하기 때문에 CSSWG 초안 (예 : `postcss-nesting`)을 구현하고 일반 미래 표준 호환 CSS를 작성하는 PostCSS 플러그인과 함께 기본 CSS 변수를 사용하는 것이 좋습니다.
- 즉, Vite는 .scss, .sass, .less, .styl 및 .stylus 파일에 대한 기본 지원을 제공합니다. Vite 전용 플러그인을 설치할 필요는 없지만 해당 전 처리기 자체를 설치해야합니다.

```sh
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

- 파일 확장자에 `.module`을 추가하여 전처리 기와 결합 된 CSS 모듈을 사용할 수도 있습니다 (예 : `style.module.scss`).

### Static Assets

- 정적 자산을 가져 오면 제공 될 때 해결 된 공개 URL이 반환됩니다.
- `webpack`의 `file-loader`와의 차이점은 개발중 프로젝트 루트 기반으로 절대경로나 상대경로를 사용할수 있다는 점입니다.

```js
import imgUrl from "./img.png";
document.getElementById("hero-img").src = imgUrl;
```

### JSON

```js
// import the entire object
import json from "./example.json";
// import a root field as named exports - helps with treeshaking!
import { field } from "./example.json";
```

### Glob Import

- Vite는 특별한 `import.meta.glob` 함수를 통해 파일 시스템에서 여러 모듈 가져 오기를 지원합니다.

```js
const modules = import.meta.glob("./dir/*.js");
```

```js
// code produced by vite
const modules = {
  "./dir/foo.js": () => import("./dir/foo.js"),
  "./dir/bar.js": () => import("./dir/bar.js"),
};
```

```js
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod);
  });
}
```

- 일치하는 파일은 기본적으로 동적 가져 오기를 통해 지연로드되며 빌드 중에 별도의 청크로 분할됩니다.
- 모든 모듈을 직접 가져 오려면 (예 : 먼저 적용 할 이러한 모듈의 부작용에 의존) import.meta.globEager를 대신 사용할 수 있습니다.

```js
const modules = import.meta.globEager("./dir/*.js");
```

```js
// code produced by vite
import * as __glob__0_0 from "./dir/foo.js";
import * as __glob__0_1 from "./dir/bar.js";
const modules = {
  "./dir/foo.js": __glob__0_0,
  "./dir/bar.js": __glob__0_1,
};
```

- 이것은 Vite 전용 기능이며 웹 또는 ES 표준이 아닙니다.
- glob 패턴은 가져 오기 지정자처럼 처리됩니다. 상대적 (./로 시작) 또는 절대적 (/로 시작, 프로젝트 루트에 상대적으로 확인)이어야합니다.

### Web Assembly

- 미리 컴파일 된 `.wasm` 파일을 직접 가져올 수 있습니다.
- `default export`는 wasm 인스턴스의 내보내기 개체에 대한 Promise를 반환하는 초기화 함수입니다.

```js
import init from "./example.wasm";

init().then((exports) => {
  exports.test();
});
```

- init 함수는 WebAssembly.instantiate에 전달 된 imports 객체를 두 번째 인수로 사용할 수도 있습니다.

```js
init({
  imports: {
    someFunc: () => {
      /* ... */
    },
  },
}).then(() => {
  /* ... */
});
```

### Web Workers

- 웹 워커 스크립트는 import 요청에 `?worker`를 추가하여 직접 가져올 수 있습니다.
- `default export`는 커스텀 워커 생성자입니다.

```js
import MyWorker from "./worker?worker";

const worker = new MyWorker();
```

### Build Optimizations

> 빌드 프로세스의 일부로 자동으로 적용되며 비활성화하지 않는 한 명시적인 구성이 필요하지 않습니다.

- CSS Code Splitting
- Preload Directives Generation
- Async Chunk Loading Optimization
