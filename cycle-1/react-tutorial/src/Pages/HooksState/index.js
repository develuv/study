import React, { useEffect, useState, useCallback } from 'react';
import Name from './Name';
import getTestData from '../../mock'

function Example() {
  console.log("랜더링");
  // "count"라는 새 상태 변수를 선언합니다
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([
    {
      name: "김성광",
      acite: true,
    },
    {
      name: "aaaa",
      acite: false,
    },
    {
      name: "bbbb",
      acite: false,
    },
  ]);

  // useEffect(async () => {
  //   const response = await getTestData(count);
  //   setData(response);
  // }, [count])

  const handleIncrementClick = useCallback(() => {
    setCount(count + 1);
  }, [count])

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  
  return (
    <div>
      <p>You clicked {count} times</p>
      <p>id: {data?.id}</p>
      <p>count: {data?.count}</p>
      <button onClick={handleIncrementClick}>
        Click me
      </button>
      <input type="text" onChange={handleNameChange} />
      <Name name={name}></Name>
    </div>
  );
}

export default Example