import React from 'react';

const ScrollSensor = React.forwardRef((props, ref) => {
  const {intersection} = props;

  return (
    <div ref={ref}>
      {intersection && intersection.intersectionRatio < 1
        ? 'Obscured'
        : 'Fully in view'}
    </div>
  )
});

export default ScrollSensor;