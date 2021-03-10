#  Typescript 얕은 정리

## Config

- **target**: 결과물의 ECMA 버전

  - ```
    'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'.
    ```

- **module**: 결과물이 어떤 모듈을 사용할 것인가에 대한 설정

  - ```
    'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'.
    ```

- **lib**: 컴파일에 포함할 추가 라이브러리 지정(definition 파일), default는 target에 맞는 라이브러리

- **strict**: 엄격 타입 검사

- **noImplicitAny**: 암묵적 Any 타입 사용시 오류 발생

- **removeComments**: 결과물에 주석 제거

- **esModuleInterop**: commonJs 모듈을 es 모듈 로 import 해오게 함

- **experimentalDecorators**: es7 데코레이터 지원 활성화

- **baseUrl**: 상대경로가 아닌 해당 디렉토리를 경로탐색의 기본 디렉토리로 설정

- **paths**: baseUrl 기준으로 경로를 다시 매핑하는 항목

- **typeRoots**: types 와 해당옵션중 하나를 사용, 타입 정의를 포함할 폴더 목록

  - [`./node_modules/@types`, `@types`] : `@types` 하위 `:module/index.d.ts` 로 선언가능

- **types**: typeRoots 와 해당옵션중 하나를 사용, 컴파일에 포함될 타입 선언 파일 (default: [`./node_modules/@types`])



## Type

ESCMAScript 표준 기본 자료형 6가지 포함 후 몇가지 추가제공

- **ECMAScript 기본 자료형**: Number, String, Boolean, Null, Undefined, Symbol, Array(object)

- **추가**: Any, Unknown, Void, Never, Enum, Tuple

> undefined, null은 모든타입의 서브타입으로 모든타입에 대입 가능(`strictNullChecks: false`)
>
> - `strictNullChecks: true`일 경우 불가, 이 경우 항상 null과 undefined를 포함한 유니온 타입 선언이 필요
>
> 리터럴 타입 : 값자체가 하나의 타입이 되어 사용됨



## Type Assertion

형변환이 아닌 타입체킹할때 넓은범위의 타입 사용시 프로그래머가 정확한 타입을 알고있는 상황에서 컴파일러에게 해당 타입을 알려주기 위한 용도

>  `변수 as 타입` or `<타입>변수` 로 사용



## Type Alias

중복 사용하는 타입을 타입 별칭을 지정하여 사용



## Indexable Type

```ts
interface Person {
    name: string;
    [index: string or number]: string
}
```



## 클래스

- 클래스 사용시 접근제어자 `public` ,`protected`, `private` 사용
- `static`으로 인스턴스가 아닌 객체 자체에 프로퍼티 및 메소드 할당 



## Generic

호출시점에 알게되는 타입을 Generic 으로 활용하여 해당 함수 내에서 타입을 any 가 아닌 확정하여 사용가능

```ts
function hello(message: any): any {
    return message;
}
hello('asdf'). (?)
```

인자와 리턴 의 관계가 없기 때문에 any 형의 경우 리턴 후의 타입추론불가능

```ts
function hellO<T>(message: T): T {
    return message;
}
hello('asdf'). (!)
```

인자의 타입을 리턴타입에 사용함으로써 관계설정이 되어 타임추론 가능

> - 제너릭 디폴트 상속 가능: `<T extends number | string>`
> - 다중 제너릭 가능: `<T, K>`



## keyof

리터럴 타입의 유니온 으로 반환

```ts
interface Person {
    name: string;
    age: number;
}
type Test = keyof Person // 'name' | 'age'
```

```ts
let a = 'asdf'; // string, 스트링 타입
const a = 'asdf'; // 'asdf', 'asdf'라는 리터럴 타입
```



## Type Lookup System

```ts
interface Person {
    name: string;
    age: number;
}
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
const person: Person = {
    name: 'dj',
    age: 35
}
getProperty(person, 'name') // OK
getProperty(person, 'height') // Error: Argument of type '"height"' is not assignable to parameter of type '"name" | "age"'.
```

오브젝트타입 T와 키의 명시적 타입 T를 받아 obj의 키를 확정할수 있다.



## 유니온 타입과 타입가드

```ts
interface Person {
    name: string;
    age: number;
}
interface Car {
    brand: string;
    wheel: number;
}
function hello(obj: Person | Car) {
    obj. (?)
}
```

Person 과 Car 중에 어떤 타입일지 추론 불가능

```ts
interface Person {
    name: string;
    age: number;
}
interface Car {
    brand: string;
    wheel: number;
    name: string;
}
function isPerson(arg: any): arg is Person {
    return arg.name !== undefined;
}
function hello(obj: Person | Car) {
    if(isPerson(obj)) {
        obj. (!) // Person
    }
}
```

타입 가드를 활용하여 타입추론 할수있도록 처리



## 템플릿 리터럴 타입 (4.1)

```ts
type Height = '170' | '180';
type Weight = '50' | '60' | '70';

type BodyProfile = `${Height}cm-${Weight}kg`;

const myBody: BodyProfile = '170cm-50kg';
```



## New Type Aliases (4.1)

```ts
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;
```





## 장점

- 코드 예측성 올라감 (선언부를 보지 않아도 명시적인 타입을 보고 고민없이 개발 가능)



## 추가 관련 자료

- [**올해 버려야 할 타입스크립트 나쁜 버릇 10가지**](https://ui.toast.com/weekly-pick/ko_20210217)
