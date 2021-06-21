import React from 'react';
import {useQuery} from "react-query";
import axios from "axios";

function App(): JSX.Element {
    const { isLoading, error, isFetching, refetch } = useQuery('list', () => axios.get('https://60d08b927de0b20017108f83.mockapi.io/api/v1/lists'));

    const onRefetch = () => refetch();

    if (isLoading) return <div>loading...</div>;

    if (error) return <div>error</div>

    if (isFetching) {
        console.log(refetch)
    }

    return (
        <div>
            <button onClick={onRefetch}>재실행</button>
        </div>

    );
}

export default App;
