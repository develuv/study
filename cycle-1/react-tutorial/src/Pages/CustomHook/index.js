import React, { useState } from 'react';
import useWindowScrollEffect from './useWindowScrollEffect'
function Index() {
  const [scrolled, setScrolled] = useState(false);
	useWindowScrollEffect((scrollY) => {
  	if (scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false)
      }
  });

	return (
    <>
      <div style={{height: '3000px', backgroundColor: '#eee'}}>하이하이</div>
      <div style={{position: 'fixed', fontSize: '20px', top: '0px', right: '0px'}}>{scrolled.toString()}</div>
    </>
  )
}

export default Index