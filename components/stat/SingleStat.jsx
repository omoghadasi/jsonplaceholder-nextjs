import { useSelector } from "react-redux";
import { selectPostIds } from "./../../slice/postsSlice";
import { selectAlbumIds } from "./../../slice/albumsSlice";
import { selectCommentIds } from "./../../slice/commentsSlice";
import { selectPhotoIds } from "./../../slice/photosSlice";
import { selectTodoIds } from "./../../slice/todosSlice";
import { selectUserIds } from "./../../slice/usersSlice";

function SingleStat({ entitie }) {
  let item;
  switch (entitie) {
    case "posts":
      item = useSelector(selectPostIds);
      break;
    case "comments":
      item = useSelector(selectCommentIds);
      break;
    case "users":
      item = useSelector(selectUserIds);
      break;
    case "todos":
      item = useSelector(selectTodoIds);
      break;
    case "photos":
      item = useSelector(selectPhotoIds);
      break;
    case "albums":
      item = useSelector(selectAlbumIds);
      break;

    default:
      item = null;
      break;
  }
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-8 h-8 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div className="stat-title uppercase">{entitie}</div>
      <div className="stat-value">{item ? item.length : 0}</div>
    </div>
  );
}

export default SingleStat;
