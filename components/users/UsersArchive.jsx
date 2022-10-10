import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserIds, fetchAllUsers } from "./../../slice/usersSlice";
import UserCard from "./UserCard";

export default function UsersArchive() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const userIds = useSelector(selectUserIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, status]);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = userIds.map((id) => (
      <UserCard userId={id} key={id} className="w-[24%] flex-grow" />
    ));
  } else if (status == "error") {
    content = <div>{error}</div>;
  }
  return <div className="flex flex-wrap justify-between gap-4">{content}</div>;
}
