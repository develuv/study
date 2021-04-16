# refactoring...

### What
> 리팩터링(refactoring)은 소프트웨어 공학에서 '결과의 변경 없이 코드의 구조를 재조정함'을 뜻한다. 주로 가독성을 높이고 유지보수를 편하게 한다. 버그를 없애거나 새로운 기능을 추가하는 행위는 아니다. 사용자가 보는 외부 화면은 그대로 두면서 내부 논리나 구조를 바꾸고 개선하는 유지보수 행위이다.

* 리팩토링 : 결과의 변경 없이...
* 재개발 : 버그를 없애거나 새로운 기능을 추가하는것...


### Why

돌아가는 코드(?), 읽을 수 있는 코드(?)

협업하는 코드란?
내가 읽고, 남이 읽고, 수정하고, 추가하고...
기계가 이해 할 수 있는 코드 -> 사람이 이해할 수 있는 코드를 작성한다.
 
### How to

* Test Code, 
* OOP,
   
> TDD ( 프로덕션 코드 < 테스트 코드 (2.5배)   
> TDD [?], Test Code [O] => 결과의 변경 없이 누가 보장해줘?, 공격적으로 고처보자. 

로버트 마틴이 말한 객체지향 프로그래밍의 다섯가지 기본 원칙(SOLID)을 기반으로

>프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있다.[3] SOLID 원칙들은 소프트웨어 작업에서 프로그래머가 소스 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 소프트웨어 소스 코드를 리팩터링하여 코드 냄새를 제거하기 위해 적용할 수 있는 지침이다. 이 원칙들은 애자일 소프트웨어 개발과 적응적 소프트웨어 개발의 전반적 전략의 일부다.[3]

[SOLID1](https://akasai.space/ts-solid-1/)
[SOLID2](https://akasai.space/ts-solid-2/)

#### 테스트 코드 작성 목적 : 
비지니스 로직 -> 기능 분리 (비지니스 로직은 흐름을 가지고 기능을 라이브러리처럼)

#### TDD 3가지 법칙
- Failing code가 있을때 production code를 작성 해야 한다.
- 어떤 실패를 나타내는데 충분할 정도만 작성해라.
- 프로덕션 코드는 실패하는 테스트가 성공하는 만큼만 작성해라.

> Red ->  green -> refactor   
> [소프트웨어 테스트 안티 패턴 - 1](https://velog.io/@leejh3224/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%88%ED%8B%B0-%ED%8C%A8%ED%84%B4)
> [소프트웨어 테스트 안티 패턴 - 2](https://velog.io/@leejh3224/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%88%ED%8B%B0-%ED%8C%A8%ED%84%B4-2)

##### 원칙&팀
- 간단하고 쉬운거, 수준이하의 테스트 (계산기라면 0+0 -> 나누기로)
- 적용코딩만으로 돌아가게 만들어라
- 테스트가 점점더 구체화 될수록 프로덕션 코드는 제너릭 해진다. (모든케이스를 수용할 수 있는)



##### 클린코드
- 한가지 일만 해야 한다.
- 함수의 크기 (24줄, 80컬럼, 함수는 20줄 이내 -> 4줄짜리 함수)
- 인덴션, 와일, 네스티드 if
- 잘 지어진 서술적인 긴 이름을 갖는 많고 작은 함수들로 유지 된다.

- 더 이상 작아질 수 없을 만큼 작아야 한다.
- 큰 함수를 보면 클래스로 추출할 생각을 해야함
- 클래스는 일련의 변수들에 동작하는 기능의 집


### Example (fitness)
Robert C. Martin이 Clean Coders에서 Function에 대해 설명할 때 사용한 예제
> 마이클 C. 페더스  -> 레거시 코드 활용 전략 (http://www.yes24.com/Product/Goods/64586851)

1. 복작한 전체 코드를 추출한다. TestableHtmlBuilder Class를 추출
2. 위키페이지를 여러군데서 사용, 버퍼도 여려군데서 사용 -> 필드 변수로 이, 초기화 생성자에서
메소드의 여러군데서 사용하는 변수를 필드변수로 올리면 또 다른 작은 메소드로 추출할때 파라메터로 달고 다니지 않아도 됨 -> 평션은 작은갯수로 파라메터를 가져야 된다는 조건을 충족
3. 중복 코드를 찾아낸다. (그중 다른부분만 판단... -> 그거만 변수로 추출 한다. option+command+v)
4. 중복 로직을 extract method로 includePage
5. 다음 중복 suiteSetup쪽 중복 로직을 제거... (상수를 변수로 pageName);
6. includeInherited로 추출...
이렇게 extract method로 추출 할때는 서로 다른점을 변수로 추출
7. 파라메터에만 쓰이는 변수는 인라인으로 처리하고 {} 괄호 제거 -> 괄호가 있으면 한가지 이상의 일을 하는 메소드로 혼란을 제공한다.
8. 이제 가독성을 높여 볼까? setup -> includeSetup으로 extract Method
9. includeSetup, includeTeardown은 하나의 문장으로...
10. method 추출 -> isTestPage()

#### 개선
읽기 쉬워지고   
이해하기 쉬워지고   
함수가 자신의 의도를 잘 전달 (함수의 사용하는 디테일함을 찾아가서 볼 필요가 없을것 같다. 이름만 봐도 뭐 하는구나)   

#### 개선의 원인
작아졌다. (함수가 작아졌다.)   
블록이 적어야 함 (if, else, while 문장 등의 내부 블록은 한줄이여야 함)   
Indenting이 적어야 함 (함수는 중첩구조를 갖을 만큼 크면 안됨, 들여쓰기는 한두단계 정도만)   


리팩토링 전의 함수(하나 이상의 일을 함)
- 버퍼를 생성하고, 페이지를 페치하고, 서치, 렌딩, 어펜드, HTML생성...

리팩토링 후 함수는 한가지 단순한 일을 한다.   
결과물이 3가지 일을 하는것 아닌가? -> 3가지 일을 추상화 수준을 한단계 높은 하는 추상화 수준을 한단계 높이면 서라운드라는 한가지 일로 대표 되는거다.


함수가 수행하는 모든 일의 추상화 수준이 같다. (함수이름과 행위가 1:1 동등하다면 re-phrasing 이지)

더이상 추출 할 수 없을때 까지 잘게 extract 메소드를 한다. (추상화 수준이 변하지 않을 수준까지 한다.)



### Example (expenses)
Robert C. Martin의 Clean Coders Screen Cast 중 Episode 10. OCP(Open but Closed Principle)에서 사용된 예제를 가지고 어떤 문제가 있는지, 어떻게 해결할 수 있는지를 보자   
이 예제에서는
* Function Should Do One Thing
* SRP(Single Responsibility Principle)
* Feature Envy
* OCP(Open but Closed Principle)   

등을 준수하는 방법을 아래와 같은 기법을 통해 보여준다.

* Extract Variable / Field / Method / Class / Interface
* Inline Variable
* Rename
* Change Signature
* Create a Field for Parameter
* Move Method
* Safely Delete
* Replace Type Code with Subclasses
* push members down


#### problem
1.1 Function Should Do One Thing 위반 (ExpenseReport)
- 함수가 너무 크고,
- 중복도 존재(xx / 100)
- 작은 메소드들로 추출(extract)할 필요가 있다.
- Composed Method Pattern, Extract till drop 규칙에 따라 extract method를 수행

1.2 SRP 위반 (ExpenseReport)
- 비즈니스 로직(비용 계산 로직)과 메시지/포맷팅 로직이 섞여 있다.
- 한가지가 아니라 여러가지 이유로 변경이 필요한 경우가 발생한다.

1.3 OCP 위반 (ExpenseReport)
- 비지니스 규칙을 확장하고자 한다면 이 모듈을 수정해야 한다.
- 메시지와 포맷팅을 변경하고자 한다면 이 모듈을 수정해야한다   

만일 새로운 식사 타입으로 LUNCH를 추가하는 경우 타입에 의존하는 코드로 인해 어려움을 겪게된다.    
시스템 내의 모든 소스에서 expense type에 의존하는 모든 switch-case나 if-else 문장을 수정해야 한다.


1.4 Feature Envy (ExpenseReport)
- Expense의 type, amount 등을 이용하여 결정을 내리고 있다.
- 이런 로직은 Expense에 있어야 함.



#### Do it


#### 1. Function Should Do One Thing
1. extract method - printHeader, printTotals
2. for loop를 출력과 계산으로 나눈다.
3. extract method - totalsUpExpenses (전에 다루는 지역변수를 멤버변수로)
4. extract method - printExpenses
5. printReport의 printer는 필드변수로 추출
6. 파라메터 제거
7. extract method - printExpensesAndTotals (한번 더 추상화)
8. extract method - switch문을 getName
9. 한군데만 호출되는 name을 인라인으로 변경
10. extract method - isOverages
11. 비용계산 로직도 extract method - totalUpExpense 
12. extract method - isMeal

#### 2. Feature Envy
1. Move isOverages -> Expense
2. Move getName -> Expense
3. Move isMeal -> Expense



#### 3. SRP
1. rename ExpenseReport to ExpenseReporter
2. extract delegate - ExpenseReport
- totalUpExpenses, addToTotals, addExenses, expenses, total, mealExpenses 추출

#### 4. OCP
1. Expense를 하위 클래스로
- 생성자에서 type 파라미터는 이름과 중복. change signature
- push members down - isMeal, isOverage, getName - keep abstract
2. run with coverage 사용 안 하는 코드 삭제


###### result
클래스 다이어그램을 보면 복잡해 진 것 같으나, 기존 다이어그램에서 Expense가 data holder로서 객체의 역할을 수행하지 못하고 있는 것에 반해
리팩토링 후에는 책임(출력, 계산)이 분리되었고, Expense에 관련된 행위가 옮겨졌다. 또 다이어그램만으로 어떤 Expense들이 존재하는지 어떤 기능들이 있는지가 눈에 잘 들어온다.
또 데이터와 관련된 기능이 한 객체에 모이면서 내부의 변경이 외부에 영향을 주지 않게 되었다.


### Conclusion
Test Code,   
OOP가 말하고 싶은것...   
모든것에 정답은 없다.    
대학 과제나 공모전 소스처럼 유지 보수 필요없으면 의미없다.   
단순한 시스템, 프로토타입정도는 절차나 간단한 함수형 나열로 충분하지 않을까?   
계속 유지보수하고 사용해야 하는 거라면 OOP 관점에서 생각해 볼 필요가 있지 않을까?   