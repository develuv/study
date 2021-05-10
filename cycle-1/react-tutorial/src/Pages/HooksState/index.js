import React, { useEffect, useState, useCallback } from 'react';
// import Name from './Name';
import getTestData from '../../mock'

function Example() {
  // "count"라는 새 상태 변수를 선언합니다
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(async () => {
    const response = await getTestData(count);
    setData(response);
  }, [])

  const handleIncrementClick = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <p>id: {data?.id}</p>
      <p>count: {data?.count}</p>
      <button onClick={handleIncrementClick}>
        Click me
      </button>
    </div>
  );
}

export default Example