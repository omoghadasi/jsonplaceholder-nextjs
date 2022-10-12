import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, fetchSingleUserById } from "../../slice/usersSlice";
import UserAlbums from "./sections/UserAlbums";
import UserInfo from "./sections/UserInfo";
import UserPosts from "./sections/UserPosts";
import UserTodos from "./sections/UserTodos";
export default function UserSingle({ userId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, userId));
  useEffect(() => {
    if (!user && userId) {
      dispatch(fetchSingleUserById(userId));
    }
  }, [dispatch, user, userId]);
  return (
    <div>
      {user ? (
        <>
          <UserInfo user={user} />
          <UserPosts userId={user.id} />
          <UserAlbums userId={user.id} />
          <UserTodos userId={user.id} />
        </>
      ) : null}
    </div>
  );
}
