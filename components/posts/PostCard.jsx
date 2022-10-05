import { useSelector } from "react-redux";
import { selectPostById } from "../../slice/postsSlice";
import PostAuthor from "./PostAuthor";
import Link from "next/link";

export default function PostCard({ postId }) {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className="bg-base-200 p-4 rounded-lg">
      <h2 className="font-bold mb-3 capitalize min-h-[50px]">{post.title}</h2>
      <p className="mb-3">{post.body.substring(0, 120)}...</p>
      <div className="flex justify-between items-center">
        <PostAuthor userId={post.userId} />
        <Link href={`/posts/${postId}`}>
          <a className="btn btn-secondary">read more</a>
        </Link>
      </div>
    </article>
  );
}
