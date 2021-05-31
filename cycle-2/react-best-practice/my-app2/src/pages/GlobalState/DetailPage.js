import {useState, useEffect, useCallback} from 'react';
import {
  useParams
} from "react-router-dom";
import * as api from '../../api/user';

function DetailPage() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const fetchUser = useCallback(async (id) => {
    const { data } = await api.getUser(id);
    setUser(data);
  }, []);
  

  useEffect(() => {
      fetchUser(id);
  }, [fetchUser, id]);

  return (
    <>
      {user && (
        <section>
          <h2>{user.name}</h2>
          <img src={user.airline.logo} alt={user.airline.name} />
          <ul>  
            <li>{user.airline.country}</li>
            <li>{user.airline.established}</li>
            <li>{user.airline.head_quaters}</li>
            <li>{user.airline.slogan}</li>      
          </ul>
        </section>)}
    </>
  )
}

export default DetailPage;