# 8. UNIT TESTING JWT AND MAIL

# jwt.service.spec.ts 파일 작성

```jsx
import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtService } from './jwt.service';

const TEST_KEY = 'testKey';

describe('JwtService', () => {
  let service: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey: TEST_KEY },
        },
      ],
    }).compile();
    service = module.get<JwtService>(JwtService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.todo('sign');
  it.todo('verify');
});
```

# 의존성 라이브러리와 의존성 끊기

모듈 mocking하기 

```jsx

import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'TOKEN'),
  };
});
```

잘동작하는데요 fake로 작성해아하다니

순수 jwt.service의 동작만을 체크하려는 의도로 보임

생성된 토큰 성공을 확인하려면 어쩔수 없는 듯?
(그러나 생성된 토큰이 string인지만 체크함?)

```jsx
expect(typeof token).toBe('string');
```

 

이번에는 실제코드와는 상관없는 verify함수의 리턴값을 임의로 생성하여  그 결과가 나오면 테스트 성공?

```jsx
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'TOKEN'),
    verify: jest.fn(() => ({
      id: USER_ID,
    })),
  };
});

// 생략 //
const decodedToken = service.verify(TOKEN);
expect(decodedToken).toEqual({ id: USER_ID });
```

위의 샘플 코드들은 의존성 모듈을 어떻게 테스트 하는지에 대해 이해 시키기 위한 코드로 보이며 실무에서는 너무 명확한 값이기에 테스트 제외 될 것 같다는 생각이 듦

의존성 모듈 테스트시에 해달 모듈에 전달하는 인자값의 type이나 값을 체크하는것이 더 유용해 보임

# mail.service.spec.ts 테스트

### sendVerificationEmail 함수 테스트

private function test는 불가? 테스트를 위해 Public으로 바꾸네?

테스트 함수 내부에서 호출되는 함수가 호출되는 지 체크(toHaveBeenCalledTimes)하기 위해서는 Mock이나 spy생성을 해줘야 한다

```jsx
expect(service.sendEmail).toHaveBeenCalledTimes(1);
```

## spy 함수

테스트 함수에서 호출하는 동일 class내의 함수는 동일하게 테스트를 진행하기 때문에

mock으로 작업하면 안되고 spy함수로 염탐을 해야한다.

mock은 전역으로 설정, spy는 it 내부에서 하나의 테스트를 위한 설정

```jsx
jest.spyOn(service, 'sendEmail').mockImplementation(async () => {});
```

### sendEmail 함수 테스트

모듈 전체를 mock하기, 모듈명만 인자로 전달

```jsx
jest.mock('got');
jest.mock('form-data');
```

하위 메서드는 따로 mock안해도 사용가능

```jsx
expect(got.post).toHaveBeenCalledTimes(1);
```

인스턴스화 된 class를 테스트 해야할때는 spyOn에 Class.prototype을 전달해야 내부 메서드에 대한 spy를 할수 있다

```jsx
const fromSpy = jest.spyOn(FormData.prototype, 'append');
```

테스트 코드를 위해 실코드가 바뀌는 것에 대한 고민

ex) maiilService의 coverage를 위해 post성공/실패시 return true/false추가