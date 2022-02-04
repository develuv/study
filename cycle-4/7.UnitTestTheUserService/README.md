## 7. Unit Test the UserService.
nest.js 구조를 보면 거의 모든 controller.ts or resolver.ts 와 service.ts 파일에 spec.ts파일이 같이 붙어 있는 것을 볼 수 있다.   
spec.ts파일은 테스트를 위한 파일이다.

터미널에서 테스트실행을 해 보자.
>npm run test:watch 실행


### user.service.spec.ts 파일 작성
> nest g mo, service 만들시 자동 생성 됨   
> 테스트 파일 형식 (*.spec.ts)

```typescript
import {UsersService} from './users.service';
import {Test} from '@nestjs/testing';

describe('UserService', () => {
    let service: UsersService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [UsersService]
        }).compile();
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it.todo('createAccount');
    it.todo('login');
    it.todo('findById');
    it.todo('editProfile');
    it.todo('verifyEmail');
});
```

> *테스트 파일의 위치는 어디가 좋을까?*
> - 리얼파일과 동일한 경로에 위치 시킴
>> 장점 : 테스트 코드 현행화가 쉽다.  
>> 단점 : 파일이 많아지면 관리비용이 많이 들어간다.
>
> - src/와 동일한 root레벨에 test/로 둔다.
>> 장점/단점 : 위와 반대.

### 의존관계 모듈 Fake DI provider 생성
* UNIT Test의 핵심.  
  *isolation*

- 인터페이스의 중요성
  : 현재 우리는 interface 없이 concrete class 로 구현되어 있다.  
  만약 jwtService가 변경된다면 ?? jwtService에 의존하는 테스트는?

*Custom providers*
> : 상수값이나, 현재 환경을 기반으로 구성된 오브젝트, 외부라이브러리, 사전에 미리 계산된 값, 테스트 목업
> Nest가 항상 명심해야 할 한 가지는 Nest가 토큰을 사용하여 종속성을 식별한다는 것이다.   
> 일반적으로 자동 생성된 토큰은 클래스와 같다. 사용자 지정 공급자를 만들려면 토큰을 선택해야 한다.
> 모범 사례를 따르면, 해당 토큰을 분리된 파일 (예: constants.ts)에 보관해야 한다.
> 우리는 구현클래스를 토큰으로 사용하여 따로 관리하지 않는다.

- Use value   
  : useValue 구문은 상수 값을 정의하거나 외부 라이브러리를 Nest 컨테이너에 넣거나 실제 구현을 모의 객체로 대체 할 때 유용하다.
- Use class  
  : useClass 구문을 사용하면 선택한 요소마다 다른 클래스를 사용할 수 있다.
- Use factory  
  : useFactory는 제공자를 동적으로 만드는 방법 이다.
- Use existing  
  : useExisting을 사용하면 기존 공급자의 별칭을 만들 수 있다.

### Utility Type
- Partial : 파셜 타입은 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있습니다.
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// Partial - 상품의 정보를 업데이트 (put) 함수 -> id, name 등등 어떤 것이든 인자로 들어올수있다
// 인자에 type으로 Product를 넣으면 모든 정보를 다 넣어야함
// 그게 싫으면
interface UpdateProduct {
  id?: number;
  name?: string;
  price?: number;
  brand?: string;
  stock?: number;
}
// 위와 같이 정의한다.
// 그러나 같은 인터페이스를 또 정의하는 멍청한 짓을 피하기 위해서 우리는 Partial을 쓴다.
function updateProductItem(prodictItem: Partial<Product>) {
  // Partial<Product>이 타입은 UpdateProduct 타입과 동일하다
}
```
- Pick : 픽 타입은 특정 타입에서 몇 개의 속성을 선택하여 타입을 정의합니다.
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 상품 목록을 받아오기 위한 api
function fetchProduct(): Promise<Product[]> {
  // ... id, name, price, brand, stock 모두를 써야함
}

type shoppingItem = Pick<Product, "id" | "name" | "price">;

// 상품의 상세정보 (Product의 일부 속성만 가져온다)
function displayProductDetail(shoppingItem: shoppingItem) {
  // id, name, price의 일부만 사용 or 별도의 속성이 추가되는 경우가 있음
  // 인터페이스의 모양이 달라질 수 있음
}

```

- Omit : 특정 속성만 제거한 타입을 정의합니다. pick의 반대
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

type shoppingItem = Omit<Product, "stock">;

const apple: Omit<Product, "stock"> = {
  id: 1,
  name: "red apple",
  price: 1000,
  brand: "del"
};
```

- Record Type<K, T> : Record Type은 Record<Key, Type>형식으로 키가 key이고, 값이 Type인 객체 타입이다.

Index signature : 대괄호로 객체에 접근하는 방법
```typescript
type humanInfo = { 
  [name: string]: number 
};

let  human:humanInfo = {
  '김철수' : 13,
  '이영희' : 18
};
```
위에 문법을 Record로 표현했을때...
```typescript
type humanInfo = Record<string, number>;

let  human:humanInfo = {
  '김철수' : 13,
  '이영희' : 18
};
```
그럼 어떤게 좋나? 구문관점에서는 인덱스 시그니처가 더 좋다. 왜냐면 name이라는 키의 의도가 명확하게 표현되기 때문이다.

*Record Type이 유용한 이유?*
- Index signature(인덱스 시그니처)는 문자열 리터럴을 key로 사용할 경우 오류 발생
```typescript
type humanInfo = { 
  [name: '홍길동'| '김철수'| '이영희']: number 
}
```

Record Type을 문자열 리터럴을 사용을 허용 (enum 열거형도 가능)
```typescript
type names = '홍길동'| '김철수'| '이영희';
// OR
enum names {
    '홍길동',
    '김철수', 
    '이영희'
};
type humanInfo = Record<names, number>;
```

*keyof 와 Record Type을 같이 사용*  
Record Type은 아래 예제와 같이 기존 타입의 속성이름을 key값으로 하고 싶은 경우 keyof와 같이 사용.
```typescript
type humanInfo = { 
    name: string,
    age: number,
    address: string
}

type humanRecordType = Record<keyof humanInfo, string>;

let human: humanRecordType = {
    name: '홍길동',
    age: "18",
    address: "서울시 행동동..."
};
```

### Test Code 요약
의존 모듈의 메소드 리턴값을 fake 한다.
의존 모듈의 메소드들이 정상 호출 또는 호출 안되었는지 체크 한다.
의존 모듈의 메소드로 전달 될 파라메터를 체크 한다.
예상되는 결과를 확인 한다.


*테스트코드는 살아있는 명세서이다.*
- 테스트 설명이 있다.
- 동작 원리, 원칙이 있다. (규칙)
- 실제 동작하고 결과를 확인 할 수 있다. (항상 현행화 된 산출물 이다.)

*내가 테스트 코드를 작성하면서 제일 힘들었던 부분.*
- 어디까지를 가짜로 작성해야 하는거야?
- 이게 의미가 있나?  
  => 의심하지 마라. 모래 한알한알 모아서 해변을 만드는게 유닛테스트다.


> How to... DI, Ioc가 주는 추상화의 의미...      
> 의존역전이라는 의미가 주는 의미를 다시 한번 생각 해보자?  
> User (Entity) < Repository > DataBaseController >DataBase   
> Repository가 DataBaseController에 의존적 이라면 분명 connection, open, close, ...ㅡㅇㄹ 구현해야 겠지.  
> 근데 User에 의존 적이기 때문에 User를 save, update, ...로 정의되어 진다.  
> 의존관계를 약결합으로 만들고 언제든 변경할수 있게 한다.