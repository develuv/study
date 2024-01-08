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

<BR />

### UI & DOM testing

Bun은 React Testing Library와 happy-dom을 포함한 기존 컴포넌트 및 DOM 테스트 라이브러리와 잘 작동합니다.

#### happy-dom

```sh
bun add -d @happy-dom/global-registrator

```

테스트를 실행하기 전에 Bun의 preload 기능을 사용하여 happy-dom 글로벌을 등록 해야 함. 이 단계를 통해 문서와 같은 브라우저 API를 글로벌 범위에서 사용할 수 있게 됨. 프로젝트의 루트에 `happydom.ts` 파일을 만들고 아래 코드를 추가.

`happydom.ts`

```typescript
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
```

<BR />

### Dates and times

`bun:test`를 사용하면 테스트에서 시간을 변경할 수 있음.

이 함수는 다음 중 하나에서 작동

- `Date.now`
- `new Date()`
- `new Intl.DateTimeFormat().format()`

타이머는 아직 영향을 받지 않지만, 향후 Bun 릴리스에 적용될 수 있습니다. (무슨말이지..?!)

<br />

#### setSystemTime

시스템 시간을 변경하려면 setSystemTime을 사용

```typescript
import { setSystemTime, beforeAll, test, expect } from "bun:test";

beforeAll(() => {
  setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
});

test("it is 2020", () => {
  expect(new Date().getFullYear()).toBe(2020);
});
```

Jest와 "bun:test"이라는 테스트 프레임워크의 차이를 보여주는 예제입니다. 두 테스트 프레임워크에서 시간과 관련된 함수를 어떻게 다뤄지는지를 비교하고 있습니다

```typescript
// 코드가 직관적인거 빼고 잘 모르겠다..ㅠ

test("just like in jest", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
  expect(new Date().getFullYear()).toBe(2020);
  jest.useRealTimers();
  expect(new Date().getFullYear()).toBeGreaterThan(2020);
});

test("unlike in jest", () => {
  const OriginalDate = Date;
  jest.useFakeTimers();
  if (typeof Bun === "undefined") {
    // Jest에서는 가짜 타이머를 사용하면 Date 생성자가 변경되므로, 이를 확인
    expect(Date).not.toBe(OriginalDate);
    // 마찬가지로 Date.now도 변경되었음을 확인
    expect(Date.now).not.toBe(OriginalDate.now);
  } else {
    // bun:test는 Date 생성자가 변경되지 않음을 테스트
    expect(Date).toBe(OriginalDate);
    expect(Date.now).toBe(OriginalDate.now);
  }
});
```

> Timers - 모킹 타이머에 대한 기본 지원은 아직 구현되지 않았지만, 로드맵에 포함되어 있습니다.

<br />

#### Reset the system time

시스템 시간을 재설정하려면 setSystemTime에 인수를 전달하지 않으면됨.

```typescript
import { setSystemTime, beforeAll } from "bun:test";

test("it was 2020, for a moment.", () => {
  // 날짜를 변경했따!!!
  setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
  expect(new Date().getFullYear()).toBe(2020);

  // 여기가 리셋!!
  setSystemTime();

  expect(new Date().getFullYear()).toBeGreaterThan(2020);
});
```

<br />

#### Set the time zone

시간대를 변경하려면 번 테스트에 `$TZ` 환경 변수를 전달.

```sh
TZ=America/Los_Angeles bun test
```

또는 런타임에 process.env.TZ를 설정.

```typescript
import { test, expect } from "bun:test";

test("Welcome to California!", () => {
  process.env.TZ = "America/Los_Angeles";
  expect(new Date().getTimezoneOffset()).toBe(420);
  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    "America/Los_Angeles"
  );
});

test("Welcome to New York!", () => {
  // Unlike in Jest, you can set the timezone multiple times at runtime and it will work.
  process.env.TZ = "America/New_York";
  expect(new Date().getTimezoneOffset()).toBe(240);
  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    "America/New_York"
  );
});
```

### 각 제품별 CLI

- bun: https://bun.sh/docs/cli/test#timeouts
- jest: https://jestjs.io/docs/cli
- node.js: https://nodejs.org/api/cli.html#--test

bun은 jest와 node.js 짬뽕되어 있는 느낌...ㅎㅎ;;

### bunfig.toml에서 test

- jest 같이 복잡한 설정이 없어서 좋았음.
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
