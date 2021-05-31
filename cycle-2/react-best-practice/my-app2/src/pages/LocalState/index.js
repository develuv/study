import {useRef, useEffect, useState, useCallback} from 'react';
import { useIntersection } from 'react-use';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'
import * as api from '../../api/user';
import ScrollSensor from '../../components/ScrollSensor'


const Card = styled.li`
  border: 1px solid #eee;
  padding: 10px;
  width: 100%;
`


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
        <Card key={_id}>
          <Link to={`/local/product/${_id}`}>
          <div>id: {_id}</div>
          <div>name: {name}</div>
          <div>trips: {trips}</div>
          <img src={logo} alt={airlineName} width={50} />
          </Link>
        </Card>
      ))}
      <ScrollSensor intersection={intersection} ref={intersectionRef} />
    </ol>
  )
}

export default LocalState;

