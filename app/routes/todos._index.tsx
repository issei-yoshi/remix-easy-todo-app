import { useState } from "react"
import {v4 as uuid} from "uuid"

type Todo = {
  id: string;
  content: string;
  completed: boolean;
}

export default function TodoIndexPage() {
  const [todo, setTodo] = useState("")
  const [todoLists, setTodoLists] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    const todoId = uuid()

    e.preventDefault();

    if (todo === ""){
      return
    };

    setTodoLists([...todoLists,{
      id: todoId,
      content: todo,
      completed: false
    }])

    setTodo("");
  }

  const handleChecked = (id: string) => {
    const lists = [...todoLists];
    const list = lists.find((todo) => todo.id === id);

    if(list == undefined) return;

    list.completed = !list?.completed;
    setTodoLists(lists)
  }

  return(
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input className="border" type="text" placeholder="ここに入力" onChange={handleChange} value={todo}/>
          <button>送信</button>
        </form>
      </div>

      <div>
        {todoLists.map((todo) => (
          <div className={todo.completed ? "text-gray-500" : ""}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleChecked(todo.id)} />
            {todo.content}
          </div>
        ))}
      </div>
    </>
  )
}