import {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useIntersection } from 'react-use';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'

import {fetchUsers, resetUsers } from '../../modules/users'
import ScrollSensor from '../../components/ScrollSensor'


const Card = styled.li`
  border: 1px solid #eee;
  padding: 10px;
  width: 100%;
`

function GlobalState() {
  const dispatch = useDispatch();
  const {users, index, status, action} = useSelector((state) => ({
    users: state.users.users,
    index: state.users.index,
    status: state.users.status,
    action: state.history.action,
  }))
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  });
  
  useEffect(() => {
    console.log("> list mount: ", action);
    if (action === "POP") {
      return;
    }
    dispatch(resetUsers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])
  
  useEffect(() => {
    if (intersection?.isIntersecting) {
      const nextIndex = index + 1
      dispatch(fetchUsers(nextIndex))
    }
  }, [dispatch, index, intersection])
  
  return (
    <ol>
      {users.status === 'loading' && <div>로딩중</div>}
      {users.length > 0 && users.map(({_id, name, trips, airline: { logo, name: airlineName } }) => (
        <Card key={_id}>
          <Link to={`/global/product/${_id}`}>
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

export default GlobalState;

