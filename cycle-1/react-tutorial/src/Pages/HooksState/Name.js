import React, {memo} from 'react';

function Name(props) {
  const {name} = props;

  return (
    <p>name: {name}</p>
  )
}

export default memo(Name);