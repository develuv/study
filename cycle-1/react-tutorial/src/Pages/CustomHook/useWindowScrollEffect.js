import { useEffect} from 'react';


function useWindowScrollEffect(listener, deps = []) {
	useEffect(() => {
		const onScroll = () => {
			listener(window.scrollY);
		}
		
		window.addEventListener('scroll', onScroll);
  
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
	}, deps)
}

export default useWindowScrollEffect;