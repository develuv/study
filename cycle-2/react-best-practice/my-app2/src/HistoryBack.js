import {useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {setAction} from './modules/history'

function HistoryBack() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
      // console.log("history change: ", history.action)
      dispatch(setAction(history.action))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

  return (<></>);
}

export default HistoryBack;