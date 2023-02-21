import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [todos, setTodos] = useState<string[]>([]);
    const [todo, setTodo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const res = await fetch("/todos")
            const data = await res.json()

            setTodos(data);
            setLoading(false);
        })();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        await fetch("todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: todo
        })

        const res = await fetch("/todos")
        const data = await res.json();

        setTodo("");
        setTodos(data);
        setLoading(false);
    };

    const removeItem = async (idx: number) => {
        setLoading(true);

        await fetch(`todos/${idx}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            },
        })

        const res = await fetch("/todos")
        const data = await res.json();

        setTodos(data);
        setLoading(false);
    }


    return (
        <div>
            <h2>할일 목록</h2>

            <ul>
                {todos.map((todo, idx) => (
                    <li key={idx}>{todo}
                        <button disabled={loading} onClick={() => removeItem(idx)}>삭제</button>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="todo"
                    placeholder="새로운 할일"
                    disabled={loading}
                    value={todo}
                    onChange={({target: {value}}) => setTodo(value)}
                />
                <button disabled={!todo}>추가</button>
            </form>
        </div>
    );
}

export default App;
