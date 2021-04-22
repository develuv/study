import { useEffect, useState } from 'react';

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', onScroll);
  
  return () => {
  	window.removeEventListener('scroll', onScroll)
  }
  }, [setScrolled])

	return scrolled;   
}

export default useScrolled