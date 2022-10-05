import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCommentById } from "../../slice/commentsSlice";
import { selectPostById } from "../../slice/postsSlice";

export default function CommentCard({ commentId }) {
  const comment = useSelector((state) => selectCommentById(state, commentId));
  const post = useSelector((state) => selectPostById(state, comment.postId));
  return (
    <div className="bg-base-200 hover:bg-base-300 p-4 rounded-lg text-white">
      <h2 className="font-extrabold">Comment: {comment.name}</h2>
      <div className="font-bold text-sm min-h-[20px]">
        was published by{" "}
        <a className="text-secondary" href={`mailto:${comment.email}`}>
          {comment.email}
        </a>{" "}
        in{" "}
        <Link href={`posts/${post.id}#comment-${comment.id}`}>
          <a className="text-secondary">{post.title}</a>
        </Link>
      </div>

      <p className="text-sm mt-3">{comment.body}</p>
    </div>
  );
}
