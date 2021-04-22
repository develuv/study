# React 문서 훝어보기

목차

1. 함수형 vs 클래스 컴포넌트
2. hooks
3. 합성 (Composition) vs 상속 (Inheritance)
4. React로 생각하기
5. react 개발자도구

---

## 함수형 vs 클래스

### 차이점

branch: `react-fnclass-1`

클래스의 `showMessage`메서드를 살펴보자:

```javascript
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };
```

이 메서드는 `this.props.user`로부터 값을 불러온다.
Props는 리액트에서 불변(immutable) 값이다. **하지만, `this`는 변경 가능하며(mutable), 조작할 수 있다.**

그것이 `this`가 클래스에서 존재하는 목적이다. 리액트가 시간이 지남에 따라 이를 변경하기 때문에 `render`나 라이프사이클 메서드를 호출할 때 업데이트된 값들을 읽어 올 수 있는 것이다.

### class 컴포넌트를 수정해보자

```javascript
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert("Followed " + user);
  };

  handleClick = () => {
    const { user } = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

- 코드를 복잡하게 만든다
  - 여러개의 `props`에 접근하게 되면?
  - `state`에도 접근해야 한다면?
- 컨벤션은 어떻게 할것인가?
- 버그나기 쉬운 구조
- **무엇보다 `showMessage`가 다른 메서드를 부르고 그 메서드가 `this.props.something`이나 `this.state.something`과 같은 코드를 포함해야 한다면 또 다시 문제에 부딪힌다.**

코드를 쉽게 쪼갤 수 있으면서 호출했을 때의 props와 state를 유지할 수 있는 구조를 찾아야 한다.
**이 문제는 리액트에만 국한된 것이 아니다. `this`와 같이 변경 가능한 object에 데이터를 저장하는 UI 라이브러리들 또한 적용 가능한 문제다.**

혹시 생성자에서 메서드를 *bind*하면 되지 않을까?

```javascript
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showMessage() {
    alert("Followed " + this.props.user);
  }

  handleClick() {
    setTimeout(this.showMessage, 3000);
  }

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

답은 No다. 이 방법은 해결하지 못한다.

`this.props`를 너무 늦게 읽는다는 것이 문제지 문법이 문제는 아니다. **이 문제는 자바스크립트의 클로저로 이를 해결할 수 있다.**

```javascript
class ProfilePage extends React.Component {
  render() {
    // props의 값을 고정!
    const props = this.props;

    // Note: 여긴 *render 안에* 존재하는 곳이다!
    // 클래스의 메서드가 아닌 render의 메서드
    const showMessage = () => {
      alert("Followed " + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

**이제 원하는 함수들을 얼마든지 추가할 수 있다. 또한 이 함수들은 모두 동일한 props와 state를 사용할 것이다.**
클로저가 우리를 구원해주었다.

---

### functional 컴포넌트를 사용해보자

메서드를 클래스에 선언하지 않고 `render` 내부에 선언할건데 굳이 클래스를 이용할 필요가 있나라는 생각이 든다.

클래스라는 껍떼기를 벗기고, 함수형 컴포넌트로 다시 작성해보자

```javascript
function ProfilePage(props) {
  const showMessage = () => {
    alert("Followed " + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>Follow</button>;
}
```

값이 인자로 전달됐기 때문에 아까와 마찬가지로 `props`는 보존된다. **클래스의 `this`와는 다르게, 함수가 받는 인자는 리액트가 변경할 수 없다.**

함수선언부에서 `props`를 분해(destructure) 해준다면 조금 더 명확하게 표현할 수 있다.

```javascript
function ProfilePage({ user }) {
  const showMessage = () => {
    alert("Followed " + user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>Follow</button>;
}
```

> **함수형 컴포넌트는 render 될 때의 값들을 유지한다.**

**Hooks의 state에서도 같은 원리가 적용된다.** 아래 예제를 살펴보자:

```javascript
function MessageThread() {
  const [message, setMessage] = useState("");

  const showMessage = () => {
    alert("You said: " + message);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
```

---

지금까지 리액트에서 함수가 props와 state 값을 유지한다는 것에 대해 알아보았다. **그런데 만약 특정 render에 종속된 것 말고 가장 최근의 state나 props를 읽고 싶다면 어떻게 해야할까?** 최신의 값을 바로 가져와 쓰고 싶다면?

```javascript
function MessageThread() {
  const [message, setMessage] = useState("");
  const latestMessage = useRef("");

  const showMessage = () => {
    alert("You said: " + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    latestMessage.current = e.target.value;
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
```

이는 함수가 가변적인 성질이 필요할 때 비상구 역할을 해준다. 무언가를 넣을 수 있는 **박스**라고 봐도 좋다.

일반적으로 이러한 기능을 쓰게 되는 경우는 드물기 때문에 이를 **기본동작(default)으로 두는 것은 비효율적**이다.
만약 ref를 이용해 최신값을 유지하고 싶다면 다음과 같은 방법을 쓸 수 있다.

```javascript
function MessageThread() {
  const [message, setMessage] = useState("");
  const latestMessage = useRef("");

  const showMessage = () => {
    alert("You said: " + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    latestMessage.current = e.target.value;
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
```

https://overreacted.io/ko/how-are-function-components-different-from-classes/

## Hooks?

branch: `hooks`

*Hook*이 React 버전 16.8에 새로 추가

Hook을 이용하여 Class를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있습니다.

함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수입니다.
**Hook은 class 안에서는 동작하지 않습니다.** 대신 class 없이 React를 사용할 수 있게 해주는 것입니다.

동기: https://ko.reactjs.org/docs/hooks-intro.html#motivation

### 기본 Hooks

https://ko.reactjs.org/docs/hooks-intro.html

### `useState`

여기서 `useState`가 바로 _Hook_ 입니다(이게 무슨 의미인지는 앞으로 알아보겠습니다). Hook을 호출해 함수 컴포넌트(function component) 안에 state를 추가했습니다. 이 state는 컴포넌트가 다시 렌더링 되어도 그대로 유지될 것입니다. `useState`는 _현재의_ state 값과 이 값을 업데이트하는 함수를 쌍으로 제공합니다. 우리는 이 함수를 이벤트 핸들러나 다른 곳에서 호출할 수 있습니다

```javascript
import React, { useState } from "react";

export default function Example() {
  // "count"라는 새 상태 변수를 선언합니다
  const [count, setCount] = useState(0);
  let num = 0;
  const handleIncrementClick = (event) => {
    setCount(count + 1);
    num++;
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* num 항상 0이다 */}
      <p>You clicked {num} times</p>
      <button onClick={handleIncrementClick}>Click me</button>
    </div>
  );
}
```

클래스 컴포넌트는 매우 귀찮다..

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

다양하게 사용가능

```javascript
function ExampleWithManyStates() {
  // 상태 변수를 여러 개 선언했습니다!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
  // ...
}
```

### `useEffect`

*Effect Hook*을 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있습니다.

```javascript
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 같은 방식으로
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

side effects란?

- 데이터 가져오기

- 구독(subscription) 설정하기

- 수동으로 리액트 컴포넌트의 DOM을 수정하는 것

이런 기능들(operations)을 side effect(혹은 effect)라 부르는 것이 익숙하지 않을 수도 있지만, 아마도 이전에 만들었던 컴포넌트에서 위의 기능들을 구현해보았을 것입니다.

#### Class vs function + useEffect

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

function + hook 조합으로 코드를 깔끔하고 가독성있게 변경 가능하다.

```javascript
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

아래코드는 문제가 있는 코드다..

컴포넌트 state가 변경될때 useEffect는 실행된다.

```javascript
function Example() {
  // "count"라는 새 상태 변수를 선언합니다
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(async () => {
    const response = await getTestData(count);
    setData(response);
  });

  const handleIncrementClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <p>id: {data?.id}</p>
      <p>count: {data?.count}</p>
      <button onClick={handleIncrementClick}>Click me</button>
    </div>
  );
}
```

디펜던시를 잘 이용

```javascript
function Example() {
  // "count"라는 새 상태 변수를 선언합니다
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(async () => {
    const response = await getTestData(count);
    setData(response);
  }, [count]);

  const handleIncrementClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <p>id: {data?.id}</p>
      <p>count: {data?.count}</p>
      <button onClick={handleIncrementClick}>Click me</button>
    </div>
  );
}
```

#### 병렬로 사용하여 관심사 분리도 가능하다.

```javascript
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

```javascript
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

### `useMemo`

연산값을 재활용하는 것

```javascript
import React, { useRef, useState } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };
  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  const count = countActiveUsers(users);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

### `useCallback`

컴포넌트 내에 함수는 컴포넌트가 리렌더링 될 때 마다 새로 만들어집니다. 함수를 선언하는 것 자체는 사실 메모리도, CPU 도 리소스를 많이 차지 하는 작업은 아니기 때문에 함수를 새로 선언한다고 해서 그 자체 만으로 큰 부하가 생길일은 없지만, 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요합니다.

그 이유는, 우리가 나중에 컴포넌트에서 `props` 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업을 할건데요, 이 작업을 하려면, 함수를 재사용하는것이 필수입니다.

### Keyword

- forwardRef
- CreateRef

## 합성 (Composition) vs 상속 (Inheritance)

React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋습니다.

### 컴포넌트에서 다른 컴포넌트를 담기

```javascript
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
```

Vue의 Slot 형태로도 사용가능

```javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}

function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
}
```

### 그렇다면 상속은?

Facebook에서는 수천 개의 React 컴포넌트를 사용하지만, **컴포넌트를 상속 계층 구조로 작성을 권장할만한 사례를 아직 찾지 못했습니다.**

props와 합성은 명시적이고 안전한 방법으로 컴포넌트의 모양과 동작을 커스터마이징하는데 필요한 모든 유연성을 제공합니다. 컴포넌트가 원시 타입의 값, React 엘리먼트 혹은 함수 등 어떠한 props도 받을 수 있다는 것을 기억하세요.

UI가 아닌 기능을 여러 컴포넌트에서 재사용하기를 원한다면, 별도의 JavaScript 모듈로 분리하는 것이 좋습니다. 컴포넌트에서 해당 함수, 객체, 클래스 등을 import 하여 사용할 수 있습니다. 상속받을 필요 없이 말이죠.

https://ko.reactjs.org/docs/composition-vs-inheritance.html

## React로 사고하기

`Declarative`에 대해 생각해보기

`index.js`

```javascript
import React, { useEffect, useState } from "react";

function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [setScrolled]);

  return (
    <>
      <div style={{ height: "3000px", backgroundColor: "#eee" }}>하이하이</div>
      <div
        style={{
          position: "fixed",
          fontSize: "20px",
          top: "0px",
          right: "0px",
        }}
      >
        {scrolled.toString()}
      </div>
    </>
  );
}

export default Index;
```

이것을 리펙토링 한다면

`index.js`

```javascript
import React, { useEffect, useState } from "react";

function Index() {
  const scrolled = useScrolled();

  return (
    <>
      <div style={{ height: "3000px", backgroundColor: "#eee" }}>하이하이</div>
      <div
        style={{
          position: "fixed",
          fontSize: "20px",
          top: "0px",
          right: "0px",
        }}
      >
        {scrolled.toString()}
      </div>
    </>
  );
}

export default Index;
```

`useScrolled.js`

```javascript
import { useEffect, useState } from "react";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [setScrolled]);

  return scrolled;
}

export default useScrolled;
```

한가지 질문,

아래 코드를 보고 `useScrolled`가 어떤 역활을 하는지 알겠는가?

함수이름을 대충지어서 그런거 아닌가?

**how는 공통로직으로 what은 선억적으로 관리**

```javascript
const scrolled = useScrolled();
```

How와 What의 관점으로 바라보자

HOW(어떻게)는 이벤트 리스너나 `useEffect` 를 등록하는 방식

```javascript
import { useEffect, useState } from "react";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false); // WHAT

  useEffect(() => {
    // HOW
    const onScroll = () => {
      if (window.scrollY > 500) {
        // WHAT
        setScrolled(true);
      } else {
        setScrolled(false); // WHAT
      }
    };

    window.addEventListener("scroll", onScroll); // HOW

    return () => {
      window.removeEventListener("scroll", onScroll); // HOW
    };
  }, [setScrolled]);

  return scrolled;
}

export default useScrolled;
```

`useWindowScrollEffect.js`

```javascript
function useWindowScrollEffect(listener, deps = []) {
  useEffect(() => {
    const onScroll = () => {
      listener(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, deps);
}
```

`index.js`

```javascript
import React, { useEffect, useState } from "react";
import useWindowScrollEffect from "./useWindowScrollEffect";
function Index() {
  const [scrolled, setScrolled] = useState(false);
  useWindowScrollEffect((scrollY) => {
    if (scrollY > 500) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      <div style={{ height: "3000px", backgroundColor: "#eee" }}>하이하이</div>
      <div
        style={{
          position: "fixed",
          fontSize: "20px",
          top: "0px",
          right: "0px",
        }}
      >
        {scrolled.toString()}
      </div>
    </>
  );
}

export default Index;
```

#### HOW는 NPM 라이브러리 처럼

#### WHAT은 연관된 것끼리 가까운곳에 모으기

```
새로운 생각은 새로운 추상화를 만들고

새로운 추상화는 새로운 문법을 만듭니다.
```

\*https://youtu.be/YP7d9ae_VzI?t=1510**

https://ko.reactjs.org/docs/thinking-in-react.html

# 기술에 담긴 생각을 찾으세요

## react 개발자도구

https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
