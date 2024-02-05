Bun 번들러는 즉시 사용 가능한 기본 로더 세트를 구현합니다. 경험상 번들러와 런타임은 모두 기본적으로 동일한 파일 형식 집합을 지원합니다.

`.js` `.cjs` `.mjs` `.mts` `.cts` `.ts` `.tsx` `.jsx` `.toml` `.json` `.txt` `.wasm` `.node`

Bun은 파일 확장자를 사용하여 어떤 내장 로더(loader)를 사용하여 파일을 파싱할지 결정합니다. 
각 로더에는 js, tsx, 또는 json과 같은 확장자명이 있습니다.

이러한 확장자명은  [플러그인](/docs/bundler/plugins)을 사용하여 Bun에 사용자 지정 로더를 추가할 때 사용됩니다.

## Built-in loaders

### `js`

**JavaScript**. Default for `.cjs` and `.mjs`.

코드를 구문 분석하고 죽은 코드 제거, 트리 셰이킹 및 환경 변수 인라인과 같은 기본 변환을 적용합니다.

현재 Bun은 구문을 다운컨버팅하지 않습니다.

### `jsx`

**JavaScript + JSX.**.  Default for `.js` and `.jsx`.

`js`로더와 동일하지만 JSX 문법을 지원합니다. 
기본적으로 JSX는 일반 자바스크립트로 다운컨버트됩니다.
옵션에 따라 달라집니다. 자세한 내용은 TypeScript 문서 내에 [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)항목을 참조하세요.

### `ts`

**TypeScript loader**. Default for `.ts`, `.mts`, and `.cts`.

모든 TypeScript 구문을 제거한 다음 `js`로더와 동일하게 동작합니다. 
Bun은 형식(typechecking) 검사를 수행하지 않습니다.

### `tsx`

**TypeScript + JSX loader**. Default for `.tsx`.
TypeScript 및 JSX를 모두 일반 자바스크립트로 트랜스파일합니다.

### `json`

**JSON loader**. Default for `.json`.

JSON 파일은 직접 가져올 수 있습니다. 

```ts
import pkg from "./package.json";
pkg.name; // => "my-package"
```

번들링 과정에서 파싱된 `JSON`은 자바스크립트 객체로 번들에 인라인됩니다.
이는 `JSON`파일의 내용이 번들에 직접 포함되어, 번들된 자바스크립트 파일에서 해당 객체를 사용할 수 있도록 하는 것을 의미합니다. 
번들링된 파일이 실행될 때, `JSON`내용이 자바스크립트 객체로 즉시 사용 가능합니다.

```ts
var pkg = {
  name: "my-package",
  // ... other fields
};
pkg.name;
```

번들링된 파일에서는 `JSON` 파일의 내용이 객체 형태로 포함되어 있으며, 다른 모듈에서 이를 가져와 사용할 수 있습니다.


번들링 전 (JSON 파일):
```json#Input
{
  "name": "John Doe",
  "age": 35,
  "email": "johndoe@example.com"
}
```

번들링 후 (JavaScript 파일):
```js#Output
export default {
  name: "John Doe",
  age: 35,
  email: "johndoe@example.com"
}
```

### `toml`

**TOML loader**. Default for `.toml`.

TOML 파일은 직접 가져올 수 있습니다. 

Bun은 빠른 내장 TOML 파서를 사용하여 이들을 파싱합니다.

```ts
import config from "./bunfig.toml";
config.logLevel; // => "debug"
```

번들링 중에, 파싱된 TOML은 번들에 자바스크립트 객체로 인라인됩니다.
```ts
var config = {
  logLevel: "debug",
  // ...other fields
};
config.logLevel;
```

만약 `.toml` 파일이 번들의 진입점(entrypoint)으로 전달된다면, 이는 `.js` 모듈로 변환되어 파싱된 객체를 `export default`합니다.

이렇게 함으로써, 다른 모듈에서 이 TOML 파일의 파싱된 내용을 가져와 사용할 수 있게 됩니다.

```toml#Input
name = "John Doe"
age = 35
email = "johndoe@example.com"
```

```js#Output
export default {
  name: "John Doe",
  age: 35,
  email: "johndoe@example.com"
}
```

**Text loader**. Default for `.txt`.

텍스트 파일의 내용은 읽혀지고 문자열로 번들에 인라인됩니다. 

텍스트 파일은 직접 가져올 수 있습니다. 파일은 읽혀지고 문자열로 반환됩니다.

```ts
import contents from "./file.txt";
console.log(contents); // => "Hello, world!"
```

빌드 중에 참조될 때, 내용은 번들에 문자열로 인라인됩니다.

```ts
var contents = `Hello, world!`;
console.log(contents);
```

만약 `.txt` 파일이 번들의 진입점(entrypoint)으로 전달된다면, 이는 `.js` 모듈로 변환되어 파일의 내용을 `export default`합니다.

```txt#Input
Hello, world!
```

```js#Output
export default "Hello, world!";
```

### `wasm`

**WebAssembly loader**. Default for `.wasm`.

런타임에서는 WebAssembly 파일을 직접 가져올 수 있습니다. 파일은 읽혀지고 `WebAssembly.Module`로 반환됩니다.

```ts
import wasm from "./module.wasm";
console.log(wasm); // => WebAssembly.Module
```

번들러에서, `.wasm` 파일은 [`file`](#file) 로더를 사용하여 처리됩니다.

.wasm 파일은 특별한 바이너리 형식인 WebAssembly을 나타냅니다. 이 파일은 단순한 텍스트나 JSON이 아니기 때문에, 번들러에서는 이를 특별한 방식으로 처리해야 합니다. 따라서 Bun 번들러는 .wasm 확장자를 가진 파일들을 file 로더를 통해 처리합니다.

이렇게 함으로써, .wasm 파일이 번들에 포함되지 않고 따로 처리되며, 런타임에서 필요할 때 동적으로 불러와질 수 있도록 합니다

### `napi`

**Native addon loader**. Default for `.node`.

런타임에서는 네이티브 애드온을 직접 가져올 수 있습니다.

```ts
import addon from "./addon.node";
console.log(addon);
```

번들러에서, `.node` 파일은 [`file`](#file) 로더를 사용하여 처리됩니다.

`.node` 파일은 네이티브 코드로 작성된 모듈을 나타내며, `bun`은 이를 런타임에서 적절하게 처리할 수 있도록 지원합니다.

네이티브 애드온은 주로 C++ 등의 언어로 작성된 모듈로, 이를 통해 JavaScript에서 네이티브 코드를 호출하거나 상호작용할 수 있습니다. 
이로써, Bun은 런타임에서 네이티브 애드온을 직접 불러와 사용할 수 있도록 합니다.

이는 특히 Node.js 환경에서 자주 사용되는 기능 중 하나로, JavaScript 코드와 네이티브 코드 간의 통합을 가능하게 합니다.

### `sqlite`

**SQLite loader**. `with { "type": "sqlite" }` import attribute

런타임 및 번들러에서 SQLite 데이터베이스를 직접 가져올 수 있습니다. 

이는 [`bun:sqlite`](/docs/api/sqlite.md)를 사용하여 데이터베이스를 로드합니다.


```ts
import db from "./my.db" with {type: "sqlite"};
```

SQLite 데이터베이스를 가져올 때 해당 동작이 `target`이 `bun`일 때만 지원됩니다.

일반적으로 번들러가 생성하는 결과물은 특정한 실행 환경에서 동작할 수 있도록 최적화되어 있습니다. 
`target`이 `bun`으로 설정되면, SQLite 데이터베이스를 번들에 포함시키거나 특별한 방식으로 처리할 수 있게 됩니다.

기본적으로, SQLite 데이터베이스는 번들 외부에 위치합니다.
이는 번들에 포함된 파일이 아닌 다른 위치에서 데이터베이스를 로드할 수 있도록 하는 것을 의미합니다.
그 결과로 데이터베이스 파일은 최종 출력 번들에 포함되지 않습니다.

`"embed"` 속성을 사용할 수 있습니다.
이 속성을 통해 데이터베이스 파일이 번들에 포함되는지 여부를 지정할 수 있습니다.

```ts
// embed the database into the bundle
import db from "./my.db" with {type: "sqlite", embed: "true"};
```

[독립 실행 가능한 실행 파일](/docs/bundler/executables)을 사용할 때, 데이터베이스가 단일 파일 실행 가능한 실행 파일에 내장됩니다.

독립 실행 가능한 실행 파일은 번들러가 생성하는 결과물 중 하나로, 하나의 단일 파일에 모든 종속성과 실행 로직이 포함된 실행 가능한 파일입니다. 이러한 실행 파일을 사용할 때, 데이터베이스도 해당 실행 파일 안에 내장됩니다.
이는 번들러가 실행 파일을 생성할 때 데이터베이스 파일을 실행 파일 내에 포함하여, 사용자가 별도의 데이터베이스 파일을 다운로드하거나 관리하지 않고도 실행 파일을 통해 데이터베이스에 액세스할 수 있도록 하는 편리한 기능입니다.
만약 독립 실행 가능한 실행 파일을 사용한다면, 번들러는 해당 실행 파일을 생성할 때 데이터베이스를 내장하게 됩니다.

독립 실행 가능한 실행 파일을 사용하지 않을 경우, 내장할 데이터베이스 파일은 `outdir`로 복사되고 해시된 파일 이름이 사용된다



### `bunshell` loader

**Bun Shell loader**. Default for `.bun.sh` files

이 로더는 [Bun Shell](/docs/runtime/shell) 스크립트를 파싱하기 위해 사용됩니다. 그러나 이 로더는 Bun 자체를 시작할 때만 지원되며, 번들러나 런타임에서는 사용할 수 없습니다.

즉, Bun Shell 스크립트는 Bun 자체를 실행할 때 사용되는 스크립트이며, 이를 통해 Bun 환경에서 특수한 작업이나 스크립팅이 가능합니다. 하지만 이 스크립트는 번들러나 런타임에서 독립적으로 사용되지 않으며, Bun 자체를 시작할 때에만 의미가 있는 스크립트입니다.

```sh
$ bun run ./script.bun.sh
```

### `file`

**File loader**. Default for all unrecognized file types.

이 로더는 가져온 파일을 _path/URL_ 로 해석하여 처리합니다. 이는 주로 미디어나 폰트와 같은 자산을 참조하는 데에 사용됩니다.
파일 로더는 번들러가 인식하지 않는 특별한 파일 형식에 대해서 사용되며, 파일을 경로나 URL로 해석하여 처리함으로써 다양한 형태의 자산을 포함시킬 수 있습니다.

```ts#logo.ts
import logo from "./logo.svg";
console.log(logo);
```

_In the runtime_, Bun checks that the `logo.svg` file exists and converts it to an absolute path to the location of `logo.svg` on disk.

Bun은 실행 중에  `logo.svg` 파일이 존재하는지 확인하고, 해당 파일의 절대 경로를 디스크상의 위치를 나타내는 절대 경로로 변환합니다. 이는 런타임에서 특정 파일의 위치를 확인하고, 필요한 경우에 이 파일에 액세스하기 위해 사용됩니다.

이렇게 함으로써, Bun은 `logo.svg` 파일이 존재하면 해당 파일의 절대 경로로 변환하고, 존재하지 않으면 에러를 발생시킬 수 있습니다. 이는 런타임 환경에서 파일을 동적으로 확인하고 처리할 때 유용한 기능 중 하나입니다.

```bash
$ bun run logo.ts
/path/to/project/logo.svg
```

이로써, 번들러는 `logo.svg` 파일을 그대로 `outdir`로 복사하고, 해당 파일을 가리키는 상대 경로로 해석합니다. 번들러는 일반적으로 모든 종속성을 번들 결과물과 함께 위치시키기 위해 이러한 동작을 수행합니다.

이는 런타임에서의 동작과는 다르게, 번들러에서는 파일이 그대로 복사되어 번들 결과물과 함께 위치하게 됩니다.

```ts#Output
var logo = "./logo.svg";
console.log(logo);
```

만약 publicPath에 값이 지정되어 있다면, 해당 값은 가져오기(import)가 절대 경로 또는 URL을 구성할 때 사용될 접두사로 동작합니다. 이는 특정 자산이나 파일이 웹 서버의 특정 경로에 위치해 있을 때, 해당 경로를 지정하여 가져오기할 때 사용됩니다.


- Public path
- Resolved import

---

- `""` (default)
- `/logo.svg`

---

- `"/assets"`
- `/assets/logo.svg`

---

- `"https://cdn.example.com/"`
- `https://cdn.example.com/logo.svg`


복사된 파일의 위치와 파일 이름은 [`naming.asset`](/docs/bundler#naming) 설정의 값에 의해 결정됩니다. 이 설정은 번들러가 파일을 처리하고 결과물을 생성할 때 사용되며, 파일이 저장될 경로와 이름을 지정합니다.

이 로더는 다른 파일들과 함께 번들러에 의해 처리되며, 처리된 결과물은 일반적으로 `outdir` 디렉토리에 저장됩니다. 이때, 해당 로더는 그대로 유지되며, 로더 자체의 내용은 변경되지 않습니다.

### TypeScript 사용 시 주의

TypeScript에서는 특정 파일 형식에 대한 타입 정의가 없는 경우에 에러가 발생할 수 있습니다. 이를 방지하기 위해 타입 정의 파일을 생성하라는 안내가 포함되어 있습니다.

이는 TypeScript가 모듈을 가져올 때 해당 모듈에 대한 타입 정보를 확인하기 위한 내용으로, 필요한 경우에는 타입 정의 파일을 추가로 작성하여 해당 에러를 해결할 수 있습니다.

```ts
// TypeScript error
// Cannot find module './logo.svg' or its corresponding type declarations.
```

### TypeScript 오류 해결을 위한 *.d.ts 파일

TypeScript에서 발생하는 오류를 해결하기 위해 프로젝트 어디에든지 `*.d.ts` 파일을 생성하면 됩니다. 파일의 이름은 중요하지 않습니다. 

아래는 파일 내용의 예시입니다:

```ts
declare module "*.svg" {
  const content: string;
  export default content;
}
```

이는 TypeScript에게 모든 `.svg` 파일에서 가져온 값이 문자열(`string`)로 취급되어야 한다고 알려주는 역할을 합니다. 따라서 TypeScript는 해당 모듈을 사용할 때, 기본 가져오기의 타입을 문자열로 간주하게 됩니다.

이러한 타입 정의를 추가함으로써 TypeScript는 해당 파일의 타입 정보를 알고, 에러를 방지하면서도 가져온 값이 문자열임을 인식하게 됩니다.
