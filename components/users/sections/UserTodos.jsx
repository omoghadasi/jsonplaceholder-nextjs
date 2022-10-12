import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodosByUserId,
  fetchTodosByUserId,
} from "../../../slice/todosSlice";
import { TodoRow } from "../../todos/LatestTodo";

export default function UserTodos({ userId }) {
  const dispatch = useDispatch();
  const userTodos = useSelector((state) => selectTodosByUserId(state, userId));
  useEffect(() => {
    if (!userTodos.length && userId) {
      dispatch(fetchTodosByUserId(userId));
    }
  }, [dispatch, userId, userTodos.length]);
  const content = userTodos.map((todo) => (
    <TodoRow key={todo.id} todoId={todo.id} />
  ));
  return (
    <div className="my-4">
      <h1 className="text-2xl font-extrabold mb-4">User Todos</h1>
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
    </div>
  );
}
