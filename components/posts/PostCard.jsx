import { useSelector } from "react-redux";
import { selectPostById } from "../../slice/postsSlice";
import PostAuthor from "./PostAuthor";
import Link from "next/link";

export default function PostCard({ postId, summaryCount = 0, className = "" }) {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className={`bg-base-200 p-4 rounded-lg ${className}`}>
      <h2 className="font-bold mb-3 capitalize min-h-[50px]">{post.title}</h2>
      <p className="mb-3">
        {summaryCount
          ? post.body.substring(0, summaryCount) + "..."
          : post.body}
      </p>
      <div className="flex justify-between items-center">
        <PostAuthor userId={post.userId} />
        <Link href={`/posts/${postId}`}>
          <a className="btn btn-secondary">read more</a>
        </Link>
      </div>
    </article>
  );
}
