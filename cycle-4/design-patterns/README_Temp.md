# Software design pattern

>프로그램을 개발할 때 예전과 같은 작업을 반복하고 있다는 느낌이 들 때가 있다.  
>경험이 쌓일수록 이러한 자신만의 '패턴'이 머리 속에 축적되고, 그 '패턴'을 다음 개발에 적용할 수 있게 된다.
>
>Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides 4명은 개발자의 '경험'이나 '내적인 축적'을
>**디자인 패턴** 이라는 형태로 정리 했다.
>이 4명을 the Gang of Four 또는 GoF라고 부른다.
>GoF는 자주 사용되는 23개의 디자인 패턴에 '이름'을 붙이고 '카탈로그'로 정리해서 '오브젝트(객체) 지향에 있어서
>재이용을 위한 디자인 패턴' 이라는 책을 서술했다.
>
>많은 모듈이 상호 관련되어 동작할 때 인터페이스가 중요하는건 모두 알고 있다.  
>특히 많은 개발자가 공동으로 작업할 경우에는 인간의 인터페이스가 중요하다.  
>그 인터페이스의 기본이 되는 것은 '언어' 이다.  
>특히 코드에 대한 상세한 논의가 아니라 프로그램의 커다란 구조에 대해서 논의할 경우에는 언어나 도식이 중요하다.  
>어떤 개발자가 주장하고 있는 개선안은 나의 개선안과 같은가, 다른가?  
>큰 틀에서는 같지만 세부적인 차이점은 없는가? 무한한 시간과 인내력이 있다면 논의를 반복해서 의문에 대한 답을 얻을 수 있을지도 모른다.
>그러나 디자인 패턴의 용어를 빌리면, 보다 용이하게 서로의 아이디어를 비교하고 논의할 수 있다.  


디자인 패턴은 개발자들에게 유익하고 풍부한 어휘를 부여하고 상호간의 의사 소통을 쉽게 해 준다.  
디자인 패턴은 우리가 매일 쓰고 있는 프로그램을 새로운 시점에서 다시 생각하고, 재사용을 쉽게 하고, 기능확장이 쉬운 소프트웨어를 만들기 위한 유익한 기법이다.

## Curriculum : GoF가 정리한 23개의 디자인 패턴
>**Part 1 디자인 패턴과 친해지기**  
>Chapter 01 Iterator - 순서대로 지정해서 처리하기  
>Chapter 02 Adapter - 바꿔서 재이용하기  
>
>**Part 2 하위 클래스에게 위임하기**  
>Chapter 03 Template Method - 하위 클래스에서 구체적으로 처리하기  
>Chapter 04 Factory Method - 하위 클래스에서 인스턴스 만들기    
>
>**Part 3 인스턴스 만들기**  
>Chapter 05 Singleton - 인스턴스를 한 개만 만들기  
>Chapter 06 Prototype - 복사해서 인스턴스 만들기  
>Chapter 07 Builder - 복잡한 인스턴스 조립하기  
>Chapter 08 Abstarct Factory - 관련 부품을 조합해서 제품 만들기  
>
>**Part 4 분리해서 생각하기**  
>Chapter 09 Bridge - 기능 계층과 구현 계층 분리하기  
>Chapter 10 Strategy - 알고리즘을 모두 바꾸기  
>
>**Part 5 동일시하기**  
>Chapter 11 Composite - 그릇과 내용물을 동일시하기  
>Chapter 12 Decorator - 장식과 내용물을 동일시하기  
>
>**Part 6 구조를 돌아다니기**  
>Chapter 13 Visitor - 데이터 구조를 돌아다니면서 처리하기  
>Chapter 14 Chain of Responsibility - 책임 떠넘기기  
>
>**Part 7 단순화하기**  
>Chapter 15 Facade - 단순한 창구  
>Chapter 16 Mediator - 중개인을 통해서 처리하기  
>
>**Part 8 상태를 관리하기**  
>Chapter 17 Observer - 상태의 변화를 알려주기  
>Chapter 18 Memento - 상태를 저장하기  
>Chapter 19 State - 상태를 클래스로 표현하기  
>
>**Part 9 낭비 없애기**  
>Chapter 20 Flyweight - 동일한 것을 공유해서 낭비 없애기  
>Chapter 21 Proxy - 필요해지면 만들기  
>
>**Part 10 클래스로 표현하기**  
>Chapter 22 Command - 명령을 클래스로 하기  
>Chapter 23 Interpreter - 문법규칙을 클래스로 표현하기  

 
```shell
npm init -y

-- 타입스크립트를 추가
npm install typescript --save-dev
-- node.d.ts를 추가 
npm install @types/node --save-dev

-- tsconfig.json
npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs

npm install ts-node --save-dev

npm install nodemon --save-dev    

```

## Part 3 인스턴스 만들기
### Chapter 06 Prototype - 복사해서 인스턴스 만들기
Prototype은 '원형'이나 '모범' 이라는 의미입니다. 원형이 되는 인스턴스, 모범이 되는 인스턴스를 기초로 새로운 인스턴스를 만드는 것입니다.

new 라는 키워드로 인스턴스를 만들 경우에는 클래스 이름을 반드시 지정해야 합니다. 그러나 클래스 이름을 지정하지 않고 인스턴스를 생성 할 때도 있습니다. 다음과 같은 경우에는 클래스로부터 인스턴스를 만드는 것이 아니라 인스턴스를 복사해서 새로운 인스턴스를 만듭니다.


1. 종류가 너무 많아 클래스로 정리되지 않는 경우
   -> 첫 번째는 취급하는 오브젝트의 종류가 너무 많아서 각각을 별도의  클래스로 만들어 다수의 소스파일을 작성해야 하는 경우 입니다.

2. 클래스로부터 인스턴스 생성이 어려운 경우
   -> 두 번째는 생성하고 싶은 인스턴스가 복잡한 작업을 거쳐 만들어지기 때문에 클래스로부터 만들기가 매우 어려운 경우입니다.
   (예: 그래픽 에디터 마우스 조작)

3. Framework 와 생성할 인스턴스를 분리하고 싶은 경우
   -> 인스턴스를 생성할 때의 Framework를 특정 클래스에 의존하지 않도록 만들고 싶은 경우입니다. 이 경우는 클래스 이름을 지정해서 인스턴스를 만드는 것이 아니라 이미 '모형' 이 되는 인스턴스를 등록해 두고, 그 등록된 인스턴스를 복사해서 인스턴스를 생성합니다.


인스턴스로부터 다른 인스턴스를 만드는 것이 복사기를 사용해서 서류를 복사하는 일과 비슷합니다. 원래의 서류를 어떻게 만들었는지 몰라도 복사기로 같은 종류의 서류를 몇 장이라도 만들 수 있습니다. 클래스로부터 인스턴스를 생성하는 것이 아니라 인스턴스로부터 별도의 인스턴스를  만드는 것을  Prototype 패턴 이라고 합니다.
```typescript
/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);

        // Cloning an object that has a nested object with backreference
        // requires special treatment. After the cloning is completed, the
        // nested object should point to the cloned object, instead of the
        // original object. Spread operator can be handy for this case.
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

/**
 * The client code.
 */
function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
        console.log('Primitive field values have been carried over to a clone. Yay!');
    } else {
        console.log('Primitive field values have not been copied. Booo!');
    }
    if (p1.component === p2.component) {
        console.log('Simple component has not been cloned. Booo!');
    } else {
        console.log('Simple component has been cloned. Yay!');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned. Booo!');
    } else {
        console.log('Component with back reference has been cloned. Yay!');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('Component with back reference is linked to original object. Booo!');
    } else {
        console.log('Component with back reference is linked to the clone. Yay!');
    }
}

clientCode();

```
#### 정리

#### Hint


### Chapter 07 Builder - 복잡한 인스턴스 조립하기

![img_3.png](img_3.png)

#### 정리

- Builder (건축자) = Builder 클래스

- ConcreteBuilder(구체적인 건축자) = TextBuilder 클래스 or HtmlBuilder 클래스

- Director(감독자) = Director 클래스

- Client(의뢰인) = Main 클래스


#### Hint


### Chapter 08 Abstarct Factory - 관련 부품을 조합해서 제품 만들기
'추상적이다' 라는 단어는 '구체적으로  어떻게 구현되어 있는지에 대해서는 생각하지 않고, 인터페이스(API)만을 생각'하는 것이라 의미입니다.


#### 정리
~ factory 패키지 : 추상적인 공장, 제품, 부품을 포함한 패키지

~ main 패키지 : Main 클래스를 포함한 패키지

~ listfactory 패키지 : 구체적인 공장, 제품, 부품을 포함한 패키지

#### Hint