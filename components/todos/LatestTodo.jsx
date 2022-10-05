import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTodos,
  selectTodoIds,
  selectTodoById,
} from "../../slice/todosSlice";
import { selectUserById } from "../../slice/usersSlice";
import Link from "next/link";

function TodoRow({ todoId }) {
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const user = useSelector((state) => selectUserById(state, todo.userId));
  return (
    <tr>
      <th>{todo.id}</th>
      <td>{todo.title}</td>
      <td>
        <Link href={`users/${user.id}`}>
          <a>@{user.username}</a>
        </Link>
      </td>
      <td>{todo.completed ? "completed" : "pending"}</td>
    </tr>
  );
}

function LatestTodo() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const todoIds = useSelector(selectTodoIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllTodos());
    }
  }, [dispatch, status]);

  const lastTodoIds = todoIds.slice(0, 3);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = lastTodoIds.map((id) => <TodoRow key={id} todoId={id} />);
  } else if (status == "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="todos-slider">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-black text-4xl capitalize">latest todos</h1>
        <Link href="/todos">
          <a className="btn btn-primary ">see more</a>
        </Link>
      </div>
      <div className="flex rounded-lg overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Username</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default LatestTodo;
