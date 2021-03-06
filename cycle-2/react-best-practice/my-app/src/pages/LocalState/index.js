import {useRef, useEffect, useState, useCallback} from 'react';
import { useIntersection } from 'react-use';
import * as api from '../../api';
import ScrollSensor from './ScrollSensor'

function LocalState() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  });
  
  const fetchUsers = useCallback(async (page) => {
    const { data } = await api.getUsers(page);
    const uniqUsers = [...new Set(users.concat(data.data))];
    setUsers(uniqUsers);
    setPage(page + 1);
  }, [users])
  

  useEffect(() => {
    if (intersection?.isIntersecting) {
      fetchUsers(page)
    }
  }, [intersection])
  
  
  return (
    <ol>
      {users.map(({_id, name, trips, airline: { logo, name: airlineName } }) => (
        <li key={_id}>
          <div>name: {name}</div>
          <div>trips: {trips}</div>
          <img src={logo} alt={airlineName} width={50} />
        </li>
      ))}
      <ScrollSensor intersection={intersection} ref={intersectionRef} />
    </ol>
  )
}

export default LocalState;

