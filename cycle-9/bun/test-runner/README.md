# TEST RUNNER

bun은 jest와 호환되는(?) 빠른 빌트인 기능을 제공 합니다. 테스트는 bun 런타임으로 실행되며, 다음 기능들을 지원합니다.

- typescript,JSX
- 라이프사이클 훅스
- 스냅샷 테스팅
- UI & DOM 테스팅
- Watch 모드 (`--wathch`)
- Script pre-loading (`--preload`)

> bun은 jest의 호환을 목표로 하지만, 모든 것이 구현된 것은 아닙니다.

<br />

## `bun test` 실습

- bun/test-runner 폴더

### default match file

```sh
bun test
```

- `*.test.{js|jsx|ts|tsx}`
- `*_test.{js|jsx|ts|tsx}`
- `*.spec.{js|jsx|ts|tsx}`
- `*_spec.{js|jsx|ts|tsx}`

<br />

### 특정 테스트 매칭 실행

- "kim" 이름이 들어간 테스트를 실행하고 싶을때.

```sh
bun test --test-name-pattern addition
```

<br />

## CLI 실습

### timeout

테스트별 타임아웃을 milliseconds 단위로 셋팅할 수 있다.

(jest에도 있음)

```sh
# default value is 5000
bun test --timeout 20
```

<br />

### rerun tests

각 테스트를 여러 번 실행시 `--rerun-each`를 사용.
이 플래그는 불규칙하거나 비결정적인 테스트 실패를 감지하는데 유용하다(?)

(jest에 없음)

> jest에는 약 70개의 CLI가 있는데, 그중에 이런 플래그를 찾지 못함.

```sh
bun test --rerun-each 100
```

<br />

### Bail out with `--bail`

미리 정해진 횟수의 테스트 실패 후 테스트 실행을 조기에 중단하려면 --bail 플래그를 사용하세요. 기본적으로 Bun은 모든 테스트를 실행하고 모든 실패를 보고하지만, CI 환경에서는 CPU 사용량을 줄이기 위해 더 일찍 종료하는 것이 더 나은 경우도 있습니다.

```sh
// 테스트가 실행이 안되는?
bun test --bail 10


// 테스트가 실행되는데,, 실패를 하나만 해도 바로 멈추는...; 아.. 잘 모르겠다...
bun test . --bail 10
```

<br />

### Watch mode

```sh
bun test --watch
```

<br />

### 라이플 사이클 hooks

| Hook         | Description                        |
| ------------ | ---------------------------------- |
| `beforeAll`  | 모든 테스트 전에 한 번 실행됩니다. |
| `beforeEach` | 각 테스트 전에 실행됩니다.         |
| `afterEach`  | 각 테스트 후에 실행됩니다.         |
| `afterAll`   | 모든 테스트 후 한 번 실행됩니다.   |

<br />

#### preload

`setup.ts` 파일을 아래와 같이 만듬.

`setup.ts`

```typescript
import { beforeEach, afterEach } from "bun:test";

beforeEach(() => {
  console.log("우왕 굳");
});

afterEach(() => {
  console.log("우왕 짱");
});
```

<br />

아래와 같이 테스트를 실행하면

```sh
$ bun test --preload ./setup.ts

// result
index_test.ts:
우왕 굳
✓ kim jae sub [0.04ms]
우왕 짱
우왕 굳
✓ yang sang hoon [0.01ms]
우왕 짱
우왕 굳
✓ kim hee jun [0.01ms]
우왕 짱
우왕 굳
✓ lee dong ju [0.01ms]
우왕 짱
우왕 굳
✓ son jin young [0.01ms]
우왕 짱

```

<br />

### MOCKS

> <del> 모듈 모킹(`jest.mock()`)은 아직 지원되지 않습니다. 여기에서 지원을 추적하세요.</del>
>
> 지원함!! PR Close됨!

```typescript
import { test, expect, jest, mock } from "bun:test";
const random1 = mock(() => Math.random());
const random2 = jest.fn(() => Math.random());

test("bun mock", async () => {
  const val = random1();
  expect(val).toBeGreaterThan(0);
  expect(random1).toHaveBeenCalled();
  expect(random1).toHaveBeenCalledTimes(1);
});

test("jest.mock", async () => {
  const val = random2();
  expect(val).toBeGreaterThan(0);
  expect(random2).toHaveBeenCalled();
  expect(random2).toHaveBeenCalledTimes(1);
});
```

<br />

### Snapshot testing

스냅샷 테스트는 `.toMatchSnapshot()` matcher를 사용하여 작성합니다:

```typescript
import { test, expect } from "bun:test";

test("snapshot", async () => {
  expect({ a: 1 }).toMatchSnapshot();
});
```

<BR />
스냅샷 업데이트

```sh
bun test --update-snapshots
```

### 각 제품별 CLI

- bun: https://bun.sh/docs/cli/test#timeouts
- jest: https://jestjs.io/docs/cli
- node.js: https://nodejs.org/api/cli.html#--test

bun은 jest와 node.js 짬뽕되어 있는 느낌...ㅎㅎ;;

### bunfig.toml에서 test

- https://bun.sh/docs/runtime/bunfig#test-root

## jest에서 bun으로 마이그레이션 하기

https://bun.sh/guides/test/migrate-from-jest

실제로는 안되는게 많다..;;

### bun 호환성표 라고 쓰고, 이슈 티켓이라 쓴다...

https://github.com/oven-sh/bun/issues/1825

# 성능

## 벤치마크 hyperfine

https://github.com/sharkdp/hyperfine

## bun 메모리 사용

https://x.com/jarredsumner/status/1743564059927327062?s=20

## --watch 모드 성능

https://x.com/jarredsumner/status/1640890850535436288?s=20

## jest를 bun으로 점진적으로 변환하는 방범.

- jest: `.test.`
- bun: `.spec.`

## bun 로드맵

https://github.com/oven-sh/bun/issues/159
