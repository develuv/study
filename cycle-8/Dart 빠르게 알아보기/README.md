# Dart 빠르게 알아보기

# 개요

- 객체지향 언어이다.
- 구글에서 만들었다.
- User Interface 만드는데 최적화되어있다.
- 많은 플랫폼에 맞게 빠르게 컴파일한다.
- 핫리로딩 등 개발생산성이 좋다.
- flutter로 개발하기 위해서는 dart를 먼저 알아야 한다.
- flutter와 dart의 개발을 모두 구글에서 하기 때문에 상호 최적화 업데이트 가능

**언어 비교(dart, Kotlin, Swift, Typescript)**

![스크린샷 2023-04-15 오후 12.41.54.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_12.41.54.png)

# 왜 Dart 인가?

## 컴파일러의 종류

- Dart Web(JIT)
    - Javascript로 컴파일 해주는 컴파일러
- Dart Native(AOT)
    - 여러 CPU의 아키텍쳐에 맞게 컴파일 해주는 컴파일러
    - IOS, Android, Windows, Linux, Mac으로 컴파일 가능
    - 더 작은 전력의 아키텍쳐로도 가능(flutter를 사물인터넷 만드는데도 사용)
    
    ![스크린샷 2023-04-15 오후 12.52.13.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_12.52.13.png)
    

## 컴파일 방법

- just-in-time(JIT)
    - JIT 컴파일은 프로그램이 실행되는 도중에 필요한 코드를 기계어로 변환하는 방식입니다.
    - 코드가 실제로 필요할 때만 컴파일되기 때문에, 초기 프로그램 실행 속도가 빠릅니다.
    - 그러나 실행 중 컴파일이 필요한 경우, 실행 속도에 영향을 줄 수 있습니다.
    - JIT 컴파일이 일반적으로 사용되는 예로는 자바와 C# 등의 언어가 있습니다.

`JIT 컴파일은 실행 중 필요한 코드만 컴파일하여 빠른 시작 시간을 가지지만 실행 중 컴파일이 필요한 경우 속도에 영향을 줄 수 있다.`

- ahead-of-time(AOT)
    - AOT 컴파일은 프로그램 실행 전에 모든 소스 코드를 기계어로 변환하는 방식입니다.
    - 프로그램 실행 시, 이미 컴파일된 기계어를 사용하기 때문에 실행 속도가 빠르지만, 컴파일 과정이 길어질 수 있습니다.
    - 실행 파일 크기가 커질 수 있으며, 플랫폼 간 호환성이 떨어질 수 있습니다.
    - AOT 컴파일이 일반적으로 사용되는 예로는 C, C++, Rust, Go 등의 언어가 있습니다.

`AOT 컴파일은 프로그램 실행 전 모든 코드를 기계어로 변환하여 실행 속도가 빠르지만, 컴파일 시간이 길어지고 파일 크기가 커질 수 있다. (컴파일을 마친 바이너리를 배포)`

ps:

- 자바스크립트는 원래 인터프리터로 소스코드를 한줄씩 읽고 실행하는 방식
- 최근의 자바스크립트 엔진들은 JIT을 적용하고 있다.
    - ex) 구글의 V8 엔진과 같은 최신 자바스크립트 엔진은 소스 코드를 바이트코드(bytecode)로 변환한 다음, 실행 중 필요한 부분만 기계어로 컴파일하는 JIT 컴파일을 사용한다.
    - 이 방식은 자바스크립트의 실행 속도를 크게 향상시켰으며, 현재 웹 브라우저와 Node.js에서 널리 사용되고 있다.
    

## 그래서 Dart는?

- 모든 플랫폼에 컴파일(AOT)을 한다는건 시간이 오래걸린다.(최적화과정, 기계어컴파일 등, 개발모드 일때도 마찬가지)
- UI를 변경하고 빠르게 변경할때마다 모든 컴파일을 하는건 비효율적이다.
- 개발환경에서는 Dart VM(가상머신)이 JIT 컴파일러를 제공하여 풍부한 디버깅 지원과 함께 변경사항을 바로 화면에 보여준다.(가상머신환경이라 조금 느리게 반영될수 있음)
- 모든걸 끝내고 앱을 배포시에는 Dart VM 을 사용하지 않고 AOT 컴파일러를 사용한다.

`Dart를 사용하여 개발할 때 AOT 컴파일 방식이 릴리스 빌드에, JIT 컴파일 방식이 디버그 빌드에 사용됩니다`

# Dart 실행하기

## **다트패드에서 실행하기**

[https://dartpad.dev](https://dartpad.dev/)

## **설치 후 실행하기**

```bash
// dart 설치
$ brew tap dart-lang/dart
$ brew install dart

// dart프로젝트 생성
$ dart create my_project

// 의존성 설치
$ cd my_project
$ dart pub get

// dart 실행
$ dart run
```

- “Dart SDK 가 구성되지 않았습니다” 에러 해결
    1. IntelliJ에서 Dart 프로젝트를 엽니다.
    2. 상단 메뉴에서 "File" > "Settings" (Mac의 경우 "IntelliJ IDEA" > "Preferences")를 클릭합니다.
    3. 설정 창에서 왼쪽 패널에서 "Languages & Frameworks"를 찾아 확장하고, "Dart"를 선택합니다.
    4. "Enable Dart support for the project..." 체크박스를 선택합니다.
    5. "Dart SDK path" 입력란에 설치된 Dart SDK 경로를 입력하거나, 폴더 아이콘을 클릭하여 Dart SDK가 설치된 경로를 찾아 선택합니다. 일반적으로 Homebrew를 통해 설치한 경우 Mac에서 Dart SDK 경로는 **`/usr/local/opt/dart/libexec`**입니다.
    6. "Apply" 버튼을 클릭하여 변경 사항을 적용하고, "OK" 버튼을 클릭하여 설정 창을 닫습니다.
    7. SDK 경로를 모를 경우 터미널에서 **`which dart`**명령어를 실행하여 Dart 실행 파일의 경로를 확인하고, 그 경로를 따라가면 SDK 폴더를 찾을 수 있습니다.

**실행결과**

- dart는 자동으로 main 함수를 찾아서 실행해준다.

![스크린샷 2023-04-15 오후 1.51.57.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.51.57.png)

![스크린샷 2023-04-15 오후 1.52.02.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.52.02.png)

# Dart의 특징

- null safety
    - 예기치 않은 null로 인한 에러를 방지하여 안전한 프로그램에 집중
- semicolon
    - dart에서는 세미콜론이 필수이다.
    - 다만 일부러 세미콜론을 안쓸때(cascade operator)가 있기 때문에 일괄적으로 붙여주는 포맷팅 기능은 없다.
- trailling comma
    - 끝에 콤마 여부에 따라 한줄 표현 다중 표현가능, 끝에 콤마를 넣은 후 포맷팅하면 다중개행 처리된다.

# 문법

## 변수

- dart 컴파일러가 name의 타입이 문자열이라는것을 추론하기 때문에 일일이 타입을 지정하지 않아도 된다.
- 값을 업데이트할때는 본래의 타입과 일치해야 한다.
- 관습적으로 함수나 메소드의 내부에 지역변수를 선언할때는 var를 사용한다.(dart 스타일가이드 권장방식)
- 클래스에서 변수나 property를 선언할때는 타입을 지정해준다.

```dart
var name = '동주'; // 암시적 타입 선언
name = 1; // error: A value of type 'int' can't be assigned to a variable of type 'String'.

String name2 = '동주'; // 명시적 타입 선언
```

### 다이나믹 타입

- dart는 개발자 친화적이고 때대로 엄격한 규칙을 회피할수 있게 해준다.
- `dynamic`은 여러 타입을 가질수 있는 변수에 쓰는 키워드
- `dynamic` 으로 직접선언할수도있고 var로 초기화없이 선언만 해두어도 `dynamic` 타입이된다.
- 사용하는게 추천 되지는 않지만 때대로 유용하다.
    - 변수가 어떤타입인지 알기 어려울 경우
    

![스크린샷 2023-04-15 오후 2.22.09.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.22.09.png)

```dart
var name;
name = '동주';
name = 12; // 다이나믹 타입에는 어떠한 타입도 넣을 수 있다.
print('$name'); // 12, dynamic type, 실제로 마지막 대입값이 출력된다.
```

- 다이나믹 타입은 어떤 타입을 특정할수 없기 때문에 사용가능한 메소드가 한정적이지만

![스크린샷 2023-04-15 오후 2.25.43.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.25.43.png)

- 타입가드를 적용하면 해당 타입의 메드를 사용할수 있으며 자동완성 해준다. ( `변수 is 타입` )

**dynamic타입은 되도록 피하고 꼭 필요할때만 쓰는것이 좋다.**

![스크린샷 2023-04-15 오후 2.25.58.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.25.58.png)

![스크린샷 2023-04-15 오후 2.31.43.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.31.43.png)

### Nullable 변수

- null safety
    - 개발자가 null값을 참조할수 없도록 하는 것이다.
    - 컴파일 단게에서 null 참조 에러를 잡아내는 역할을 한다.(NoSuchMethodError)
    - 예기치 않은 null로 인한 에러를 방지하여 안전한 프로그램에 집중

![스크린샷 2023-04-15 오후 2.43.40.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.43.40.png)

```dart
String? name = '동주'; // 타입뒤에 ? 를 넣으면 nullable 변수가 된다. 
name = null;
if(name != null) {
  print(name.isEmpty);
}
name?.isEmpty;  // Optional Chaining으로 null 에러를 회피할수 있다.
```

### Final 변수

- 한번 정의하고 수정할수 없게 만들때 사용한다.

![스크린샷 2023-04-15 오후 2.58.03.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.58.03.png)

```dart
final String name = '동주'; // 타입을 명시할수도 있음
name = '하하';
```

### Late 변수

- late는 변수선언 키워드 앞에 붙여줄수 있는 키워드이다.
- 변수를 초기 데이터 없이 선언할수 있지만 사용되기 전에 반드시 초기화되어야 함을 명시적으로 지정해줄수 있다.
- 초기화되기 전 변수를 사용하려고 하면 에러가 발생한다.
- 다만 다른 키워드 var나 final 도 초기데이터 없이 선언할수는 있지만 명시적이지 않다는 차이가 있다.
- var는 명시적으로 초기화하기 전에도 사용할수 있고 null로 기본 초기화되어있다.

### Constant 변수

- Compile-time constant
- 컴파일 시점에 이미 초기화 되어 있어야 하는 값
    - 런타임 api에서 받아오는 데이터를 const키워드로 선언할 수 없다.

## 변수 결론

- type을 명시하거나 명시하지 않고 선언할수 있다.
- class property 작성시에는 타입을 명시하고 그외에는 명시하지 않는 키워드 방식을 권장한다.
- 변수를 한번 할당후 수정할수 없게 하기위해 `final` 키워드를 사용한다.
- 타입을 특정할수 없을때 `dynamic` 타입을 쓸수 있지만 되도록 사용을 지양한다.
- 컴파일시점에 미리 알수있는값들은 `const`로 선언한다.
- dynamic 외 모든 타입은 nulllable 하지 않기 때문에 nullable 하게 하기 위해 `?`를 사용할수 있다.
- 나중에 초기화 시키는 데이터를 명시할때 `late` 를 사용한다.

## 자료형

### 기본 자료형

- null을 제외한 dart 의 모든 자료형은 함수를 포함해 모두 `Object`이다.
- 타입을 명시하지 않은 변수를 소수로 초기화하면 double변수로 선언된다.
- int는 double에 할당할수 있지만 반대로 double은 int에 할당할 수 없다.

```dart
String name = 'dj';
bool alive = true;
int age = 20;  // 정수만 가능
double height = 1.75; // 소수 가능
num weight = 75;  // 정수 소수 모두 가능
weight = 1.1
```

### List

```dart
List<int> numbers1 = [1, 2, 3, 4, 5];
var numbers2 = [1, 2, 3, 4, 5];  // 이 역시 List<int> 로 추론된다.
```

**collection If**

- collection if 기능으로 리스트 내에서 간결하게 조건문으로 요소를 추가할 수 있다.

```dart
var giveMeSix = true;
List<int> numbers1 = [
  1,
  2,
  3,
  4,
  5,
  if (giveMeSix) 6 else 7,
];

// 아래코드와 동일
if(giveMeSix) {
  numbers1.add(6)
} else {
  numbers1.add(7)
}
```

**String Interpolation**

- 텍스트에 변수를 추가하는 방법
- ‘이나 “ 상관없이 문자열 안에 `$` 키워드를 통해 변수를 사용할 수 있다.
- 표현식은 `${}` 내부에 작성한다.

```dart
// 문자열 추가
var name = 'dj';
var greeting = 'hello $name';
print(greeting);  // hello dj

// 계산식
var age = 30;
var greeting = 'hello $name, my age is ${age + 1}}';
print(greeting);  // hello dj, my age is 31
```

**collection for**

- 리스트의 생성시에 동적으로 특정 크기만큼 요소를 추가할수 있다.

```dart
var oldFriends = ['John', 'Paul', 'George', 'Ringo'];
var newFriends = [
  'Pete',
  for (var friend in oldFriends) '$friend-old',
];
print(newFriends);  // [Pete, John-old, Paul-old, George-old, Ringo-old]

var newFriends = [
  'Pete',
  for (var friend in [1, 2, 3, 4, 5]) 'new',
];
print(newFriends); // [Pete, new, new, new, new, new]
```

### Map

- Object에는 null을 제외한 모든 값을 할당될 수 있다.

```dart
var player = { // Map<String, Object> 로 추론된다.
  'name': 'Bob',
  'level': 1,
  'health': 100,
  'mana': 100,
  'inventory': ['sword', 'shield', 'potion'],
  'skills': ['attack', 'defend', 'heal'],
  'location': {'x': 10, 'y': 20}
};
```

- 이런식으로 다양하게 Map을 구성할수 있다.
- 키로 Primitive value 가 사용될경우 동일한 Primitive value로 접근 가능하지만 객체일 경우 참조로 접근해야 한다.
- 다만 객체생성시 이런 Map 보다는 특정모델의 의미를 담아 Class로 만드는게 더 권장된다.

```dart
var player = {
  'name': 'Bob',
  'level': 1,
  'health': 100,
  'mana': 100,
  'inventory': ['sword', 'shield', 'potion'],
  'skills': ['attack', 'defend', 'heal'],
  'location': {'x': 10, 'y': 20}
};

Map<int, String> numbers = {
  1: 'one',
  2: 'two',
  3: 'three',
};

Map<bool, String> bools = {
  true: 'true',
  false: 'false',
};

final ref = ['one', 'two'];
Map<List<String>, String> listMap = {
  ref: 'one two',
  ['three', 'four']: 'three four',
};

List<Map<String, Object>> players = [
  {
    'name': 'Bob',
    'level': 1,
    'health': 100,
    'mana': 100,
    'inventory': ['sword', 'shield', 'potion'],
    'skills': ['attack', 'defend', 'heal'],
    'location': {'x': 10, 'y': 20}
  },
  {
    'name': 'Alice',
    'level': 1,
    'health': 100,
    'mana': 100,
    'inventory': ['sword', 'shield', 'potion'],
    'skills': ['attack', 'defend', 'heal'],
    'location': {'x': 10, 'y': 20}
  },
];

print(player);
print(player['name']);
print('-------------------');
print(numbers);
print(numbers[1]);
print('-------------------');
print(bools);
print(bools[true]);
print('-------------------');
print(listMap);
print(listMap[['one', 'two']]);  // null
print(listMap[ref]);
print('-------------------');
print(players);
print(players[1]['name']);
```

### Set

- Set에 속한 모든 요소는 unique 하다.
- Dart의 List는 Python의 List와 같고 Dart의 Set은 Python의 Set과 같다.

```dart
var numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};  // Set<int> 로 추론된다.
```

## 함수

- 리턴타입, 함수명, 파라미터, 본문
- 화살표 함수도 가능하다.

```dart
String sayHello(String name) {  // String Function(String) 로 추론
  return 'Hello $name nice to meet you';
}
// or 
String sayHello(String name) => 'Hello $name nice to meet you';

void main() {
  print(sayHello('John')); // Hello John nice to meet you
}
```

### Named Parameters

- 파라미터를 `{}`로 묶어서 지정할수 있다.
- 네임드 파라미터를 사용하면 기본적으로  `null` 이 올수 있게되고 nullable한 타입이 아닐 경우 경고가 발생한다.
- 파라미터를 `?` 옵셔널로 변경하여 `null`을 허용시키거나, 초기값을 지정하거나, `required` 로 필수 파라미터를 명시해줄수 있다.

```dart
String sayHello({
  String? name,
  int? age,
  String? country,
}) =>
    'Hello $name nice to meet you, you are $age years old and you are from $country';

String sayHello({
  String name = 'Nick',
  int age = 30,
  String country = 'wakanda',
}) =>
    'Hello $name nice to meet you, you are $age years old and you are from $country';

String sayHello({
  required String name,
  required int age,
  required String country,
}) =>
    'Hello $name nice to meet you, you are $age years old and you are from $country';

void main() {
	print(sayHello(
		age: 30,    
		name: 'John',
    country: 'USA',
  ));
}
```

### **Optional Positional Parameters**

- positional parameter에서 옵셔널이나 초기값 지정이 필요할 경우에는 해당 파라미터를 `[]`로 감싸준다.

```dart
String sayHello(
  String name,
  int age,
  [String? country = 'USA']
) =>
    'Hello $name nice to meet you, you are $age years old and you are from $country';

void main() {
  print(sayHello('John', 30));
}
```

![스크린샷 2023-04-15 오후 6.00.27.png](Dart%20%E1%84%88%E1%85%A1%E1%84%85%E1%85%B3%E1%84%80%E1%85%A6%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%20ef83b4a99f9c4865a38329891995b573/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-04-15_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_6.00.27.png)

### QQ Operator

- name 파라미터가 nullable일 경우 `name?.` 을 통해 옵셔널 체이닝 처리 해준다.
- ??  연산자를 사용하면 좌항이 null일 경우 우항이 실행된다.

```dart
String capitalize(String? name) => name?.toUpperCase() ?? 'NO NAME'; // nullable name 지정

void main() {
	print(capitalize('hello world'));  // HELLO WORLD
  print(capitalize(null));  // NO NAME
}
```

### QQ Assignment Operator

- 변수의 값이 null 일 경우에 해당 변수에 우항의 값을 대입한다.

```dart
String? name = 'haha';
name ??= 'nico';
print(name);  // haha
---------------------------
String? name;
name ??= 'nico';
print(name);  // nico
```

### Type Definition

- typedef 을 이용해 type alias 를 만들고 사용할수 있다.

```dart
typedef ListOfInt = List<int>;

ListOfInt reverseListOfNumbers(ListOfInt numbers) {
  return numbers.reversed.toList();
}
```

## 함수 결론

- 파라미터에는 positional parameter(순서중요)와 named parameter가 있다.

## Class

- 클래스의 property 선언시에는 타입을 명시해준다.
- fianl property로 선언하면 수정할수 없다.
- `this`는 해당 클래스의 인스턴스를 바라본다.
- 클래스에서 멤버변수에 접근할때 `this`를 쓰지 않아도 된다.(선택)
    - 메소드의 지역변수와 이름이 겹치는게 아닌 이상 사용하지 않는것을 권장

```dart
class Player {
  final String name = 'John';
  int age = 20;

  void sayHello() {
    print("Hello, my name is $name, I'm $age years old");
  }
}

void main() {
  var p = Player();
  print(p);
  print(p.name);  // John
  p.name = "Nick"; // 'name' can't be used as a setter because it's final.
  p.age = 30;
  print(p.age); // 30
}
```

### Constructor

```dart
class Player {
  late String name;
  late int age;
  
  Player(String name, int age) {
    this.name = name;
    this.age = age;
  }
  // 프로퍼티 선언후 생성자에서 초기화 

  String name;
  int age;
  Player(this.name, this.age);
  // 프로퍼티 선언후 생성자에서 간결하게 초기화

  void sayHello() {
    print("Hello, my name is $name");
  }
}

void main() {
  var p = Player("John", 20);
  var p2 = Player("Nick", 30);

  p.sayHello();
  p2.sayHello();
}
```

- Typescript 의 Constructor 간결화
    
    ```tsx
    class Player {
      name: string;
      age: number;
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
      // 프로퍼티 선언후 생성자에서 초기화 
    
      constructor(public name: string, public age: number) {
      }
      // 생성자 선언과 동시에 프로퍼티 초기화
    
      sayHello() {
        console.log("Hello, " + this.name, this.age);
      }
    }
    
    const player = new Player("John", 20);
    player.sayHello();
    ```
    

### ****Named Constructor Parameters****

- 기본 생성자 파라미터는 positional parameter 이기 때문에 생성하는 구문만 보면 모호할수 있다.
- 함수와 마찬가지로 생성자에서도 named parameter 를 사용할 수 있다.

```tsx
class Player {
  final String name;
  final int age;
  final String position;
  final String team;
  Player(this.name, this.age, this.position, this.team);

  void sayHello() {
    print("Hello, my name is $name, I'm $age years old, I play as a $position and I play for $team");
  }
}

void main() {
  var p = Player("John", 20, "Forward", "Real Madrid");

  p.sayHello();
}
```

- 파라미터 부분을 `{}`로 감싸서 네임드 파라미터로 변경할 수 있다.
- 함수와 마찬가지로 네임드파라미터로 변경하면 해당 파라미터들이 모두 nullable 파라미터가 되기 때문에 그 부분을 해결해주어야 한다.
    - `옵셔널` or `required` or `초기값`

```tsx
class Player {
  final String name;
  final int age;
  final String? position;
  final String team;

  Player({required this.name, required this.age, this.position, this.team = 'No team'});

  void sayHello() {
    print(
        "Hello, my name is $name, I'm $age years old, I play as a $position and I play for $team");
  }
}

void main() {
  var p = Player(
    name: "John",
    age: 20,
    position: "Forward",
    team: "Real Madrid",
  );
  p.sayHello();

  var p2 = Player(
    name: "Nick",
    age: 30,
    position: "Midfielder",
  );
  p2.sayHello();
}
```

- 번외로 멤버변수가 같은 타입일 경우 동시에 지정 가능하다.
- 다만 옵셔널이나 final등 적용된 키워드는 모두 같이 적용됨

```dart
class Player {
	final String name, position, team;
  final int age;
}
```

### Named Constructor

여러 케이스의 생성자를 만들고 싶을때 사용한다.

- 레알마드리드 팀 플레이어와
- 바르셀로나 팀 플레이어를 만드는

 생성자 예시

- 팀을 제외한 나머지 파라미터만을 넘겨주고 특정 팀의 플레이어를 생성하였다.
- 생성자 본문 `:` 키워드 뒤에오는 내용으로 간결화할수 있다.

```dart
class Player {
  final String name;
  final int? age;
  final String? position;
  final String team;

  Player({required this.name, this.age, this.position, this.team = 'No team'});

	// this로 모든 프로퍼티를 접근하여 초기화해줌
  Player.createRealMadridPlayer(
      {required String name, required int age, required String position})
      : this.name = name,
        this.age = age,
        this.position = position,
        this.team = 'Real Madrid';

  // this를 한번에 묶어
	Player.createRealMadridPlayer({required String name, required int age, required String position}) : this(
    name: name,
    age: age,
    position: position,
    team: 'Real Madrid',
  );

  // 가장 권장되는 심플한 문법, 파라미터에 this를 사용함으로써 생성자 생생과 동시에 초기화 
	Player.createRealMadridPlayer(
      {required this.name, required this.age, required this.position})
      : team = 'Real Madrid';

  Player.createBarcelonaPlayer(
      {required this.name, required this.age, required this.position})
      : team = 'Barcelona';

  void sayHello() {
    print(
        "Hello, my name is $name, I'm $age years old, I play as a $position and I play for $team");
  }
}

void main() {
  var p3 = Player.createRealMadridPlayer(
    name: "John",
    age: 20,
    position: "Forward",
  );
  p3.sayHello(); // Hello, my name is John, I'm 20 years old, I play as a Forward and I play for Real Madrid

  var p4 = Player.createBarcelonaPlayer(
    name: "John",
    age: 20,
    position: "Forward",
  );
  p4.sayHello(); // Hello, my name is John, I'm 20 years old, I play as a Forward and I play for Barcelona
}
```

### FromJson 생성자

- api에서 받아오는 데이터를 클래스의 `fromJson`  생성자로 인스턴스화 할수 있다.
- 리스트를 순회하면서 아이템을 모두 생성자에 파라미터로 주입하면 생성할수 있어서 간편하다.

```dart
class Player {
  final String name;
  final int? age;
  final String? position;
  final String team;

  Player.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        age = json['age'],
        position = json['position'],
        team = 'No team';

  void sayHello() {
    print(
        "Hello, my name is $name, I'm $age years old, I play as a $position and I play for $team");
  }
}

void main() {
  var apiData = [
    {
      'name': 'Cristiano Ronaldo',
      'age': 36,
      'position': 'Forward',
    },
    {
      'name': 'Lionel Messi',
      'age': 34,
      'position': 'Forward',
    },
    {
      'name': 'Karim Benzema',
      'age': 33,
      'position': 'Forward',
    },
  ];

  // apiData.forEach((player) {
  //   var playerObject = Player.fromJson(player);
  //   playerObject.sayHello();
  // });

  for (var player in apiData) {
    var playerObject = Player.fromJson(player);
    playerObject.sayHello();
  }
}
```

**루프 권장사항**

dart에서는 여러 이유로 forEach보다는 for loop사용을 권장한다. ([avoid_function_literals_in_foreach_calls](https://dart-lang.github.io/linter/lints/avoid_function_literals_in_foreach_calls.html))

- for 루프를 사용하면 개발자가 자신의 의도를 명확하고 명시적으로 나타낼 수 있습니다.
- for 루프 본문의 `return`은 함수 본문에서 반환되며 forEach 클로저 본문의 `return`은 forEach의 해당 반복에 대한 값만 반환합니다.
- for 루프의 본문은 `await`를 포함할 수 있지만 forEach의 클로저 본문은 포함할 수 없습니다.

### Cascade Notation

객체의 프로퍼티와 메소드를 접근하는 간편한 체이닝 방법

- 기본적으로 객체의 값을 변경하거나 메소드를 호출할때 해당 객체를 먼저 접근후 실행할수 있다.

```dart
class Player {
  String name;
  int age;
  String position;
  String team;

  Player({
    required this.name,
    required this.age,
    required this.position,
    required this.team,
  });

  void sayHello() {
    print(
        "Hello, my name is $name, I'm $age years old, I play as a $position and I play for $team");
  }
}

void main() {
  var player = Player(
    name: "Lionel Messi",
    age: 33,
    position: "Forward",
    team: "Barcelona",
  );
  player.name = "Eden Hazard";
  player.age = 29;
  player.position = "Gunner";
  player.team = "Real Madrid";
  player.sayHello();
}
```

- casecade(`..`) 표기법을 사용하면 프로퍼티의 값을 할당 후에도 그대로 체이닝 하여 해당 객체에 접근할수 있다.

```dart
class Player {
  String name;
  int age;
  String position;
  String team;

  Player({
    required this.name,
    required this.age,
    required this.position,
    required this.team,
  });

  void sayHello() {
    print(
        "Hello, my name is $name, I'm $age years old, I play as a $position and I play for $team");
  }
}

void main() {
  var player2 = Player(
    name: "Lionel Messi",
    age: 33,
    position: "Forward",
    team: "Barcelona",
  )
  ..name = "Achraf Hakimi"
  ..age = 42
  ..position = "Engineer"
  ..team = "Dortmund"
  ..sayHello();
}
```

### Enums

- Enum 을 사용해서 오타를 예방할수 있고 해당 타입으로 특정할수 있다.
- 초기값이 없이 선언할경우 enum의 멤버변수.name을 사용하여 해당 네임을 활용할수 있다.
- name외에 value다르게 주고 싶을 경우 `()` 로 값을 넣어준뒤에 아래 조건을 설정해준다.

```dart
enum Team {
  barcelona,
  realMadrid,
  dortmund,
}

print(Team.barcelona) // Team.barcelona
print(Team.barcelona.name) // barcelona

enum Team2 {
  barcelona('BBB'),
  realMadrid('RRR'),
  dortmund('DDD');
  const Team2 (this.vvv); // value변수를 vvv 로 설정
	final String vvv;  // value의 타입 지정
}

print(Team2.barcelona) // Team2.barcelona
print(Team2.barcelona.name) // barcelona
print(Team2.barcelona.vvv) // BBB
```

### Abstract Class

- 오버라이드한 메소드는 `@override` 데코레이터를 달아준다.(필수는 아니지만 권장)

```dart
abstract class Human {
  void walk();
}

class Coach extends Human {
  @override
  void walk() {
    print("I'm coach walking");
  }
}

void main() {
	var coach = Coach();
  coach.walk(); // I'm coach walking
}
```

### 상속

- 자식 클래스 생성자에서 super를 통해 부모의 생성자를 호출해준다.
- 생성자에 부모의 파라미터를 담아주어 super없이 작성할 수도 있다.
- 자식 메소드에서 부모인스턴스를 super로 접근할 수 있다.

```dart
class Human {
  final String name;
  final int age;

  Human({required this.name, required this.age});

  void sayHello() {
    print("Hello, my name is $name and I am $age years old.");
  }
}

enum Team { red, blue, green }

class Player extends Human {
  final Team team;

  Player({
    required String name,
    required int age,
    required this.team,
  }) : super(
          name: name,
          age: age,
        );
  or
	Player({
    required super.name,
    required super.age,
    required this.team,
  });
  // 이렇게 생성자에 부모의 파라미터를 담아주어 super없이 작성할 수도 있다.

  @override
  void sayHello() {
    super.sayHello();
    print("I am on team $team.");
  }
}

void main() {
  var player = Player(name: "John", age: 20, team: Team.blue);
  player.sayHello();
}
```

### Mixin

- 여러클래스에서 재사용 하기 위한 클래스
- Mixin 클래스에 있는 프로퍼티나 메소드를 가져올수 있다.
- Mixin 클래스에는 생성자가 없다.
- 생성자가 있는 클래스는 Mixin 으로 사용할 수 없다.
- 클래스 선언시 `with` 키워드를 사용해서 가져온다.
- 하나의 클래스에서만 사용한다면 의미 없다.
- mixin 클래스가 부모클래스가 되는것은 아니다.
- 필요에 따라 메소드를 오버라이드 할수 있다.

```dart
class Strong {
  final double strengthLevel = 1500.99;
}

class QuickRunnner {
  void runQuickly() {
    print("I am running quickly.");
  }
}

class Tall {
  final double height = 6.5;
}

enum Team { red, blue, green }

class Player with Strong, QuickRunnner, Tall {
  Team? team;

  Player({this.team});

  void sayHello() {
    print("I am on team $team.");
  }
}

class Horse with Strong, QuickRunnner {
  @override
  void runQuickly() {
    print("I am running very quickly.");
  }
}

class Kid with QuickRunnner {}

void main() {
  var player = Player(team: Team.blue);
  player.sayHello();  // I am on team Team.blue.
  player.runQuickly();  // I am running quickly.
  print(player.strengthLevel); // 1500.99
  print(player.height);  // 6.5

  var horse = Horse();
  horse.runQuickly();  // I am running very quickly.
  print(horse.strengthLevel);

  var kid = Kid();
  kid.runQuickly();  // I am running quickly.
}
```

# 느낀점

- 간결하고 직관적이고 군더더기가 없다는 느낌을 많이 받았다.
- 개발자 편의를 많이 신경쓴 느낌이다.
- this, forEach 등등 많은 면에서 자바스크립트와 비슷하고 많이 참고하고 개선부분도 있는것 같다.
- 그래서 그런지 자바스크립트를 아는 사람을 dart를 익히기 매우 수월할 것 같다.(더 많은 기능이 있겠지만..)
- 애초에 컴파일 언어라서 그런지 타입체킹이 매우 잘 되어있는 느낌이다.
- 이 외에도 수많은 dart의 기능들이 있기 대문에 나중에 더 알아볼 필요는 있을것 같다.
