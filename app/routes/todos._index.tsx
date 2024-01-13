import { useState } from "react"
import {v4 as uuid} from "uuid"

type Todo = {
  id: string;
  content: string;
  completed: boolean;
  edit: boolean;
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
      completed: false,
      edit: false
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

  const handleEdit = (id: string) => {
    const todos = [...todoLists]
    const todo = todos.find((todo) => todo.id == id);
    if(!todo) return
    todo.edit = true
    setTodoLists(todos)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const todos = [...todoLists]
    const todo = todos.find((todo) => todo.id === id);
    if(!todo) return;
    todo.content = e.target.value;
    setTodoLists(todos)
  }

  const handleUpdate = (id: string) => {
    const todos = [...todoLists]
    const todo = todoLists.find((todo) => todo.id == id);
    if (!todo) return
    todo.edit = !todo.edit;
    setTodoLists(todos)
  }

  const handleDelete = (id: string) => {
    const todos = [...todoLists];
    const todo = todos.find((todo) => todo.id === id);
    if(!todo) return;

    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodoLists(newTodos)
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
        {todoLists.map((todo) => {
          return(
            todo.edit ? (
              <div key={todo.id} className={todo.completed ? "text-gray-500" : ""}>
                <input type="text" onChange={(e) => handleEditChange(e, todo.id)} />
                <button onClick={() => handleUpdate(todo.id)}>保存</button>
              </div>
              )
              :
              (
                <div key={todo.id} className={todo.completed ? "text-gray-500" : ""}>
                  <input type="checkbox" checked={todo.completed} onChange={() => handleChecked(todo.id)} />
                    {todo.content}
                  <button onClick={() => handleEdit(todo.id)}>編集</button>
                  <button onClick={() => handleDelete(todo.id)}>削除</button>
                </div>
              ))
            }
          )}
      </div>
    </>
  )
}