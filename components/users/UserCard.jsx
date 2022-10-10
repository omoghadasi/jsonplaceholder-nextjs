import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserById } from "../../slice/usersSlice";

export default function UserCard({ userId, className }) {
  const user = useSelector((state) => selectUserById(state, userId));
  return (
    <Link href={`users/${userId}`}>
      <a
        className={`bg-base-200 p-4 rounded-lg flex flex-col justify-center items-center transition-all hover:bg-primary hover:text-white ${className}`}
      >
        <h2>{user.name}</h2>
        <span className=" font-extrabold">{user.email}</span>
        <span className="w-1/2 text-center text-sm">@{user.username}</span>
      </a>
    </Link>
  );
}
