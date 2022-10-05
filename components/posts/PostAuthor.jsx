import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserById } from "../../slice/usersSlice";

export default function PostAuthor({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  return (
    <Link href={`/users/${userId}`}>
      <a className="font-semibold capitalize">
        by {user ? user.name : "Unknown Author"}
      </a>
    </Link>
  );
}
