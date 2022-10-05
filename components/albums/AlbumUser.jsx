import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserById } from "../../slice/usersSlice";

export default function AlbumUser({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  return (
    <Link href={`/users/${userId}`}>
      <a className="font-semibold text-sm capitalize text-center block">
        by @{user ? user.name : "Unknown Author"}
      </a>
    </Link>
  );
}
