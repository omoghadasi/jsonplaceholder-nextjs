import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, fetchSinglePostById } from "./../../slice/postsSlice";
import { selectUserById, fetchSingleUserById } from "./../../slice/usersSlice";
import Link from "next/link";
import CommentsSinglePost from "../comments/CommentsSinglePost";

export default function PostSingle({ postId }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, postId));

  const author = useSelector((state) =>
    selectUserById(state, post ? post.userId : 0)
  );
  useEffect(() => {
    if (!post) {
      dispatch(fetchSinglePostById(postId));
    }
    if (!author && post) {
      dispatch(fetchSingleUserById(post.userId));
    }
  }, [post, dispatch, postId, author]);

  return (
    <>
      <div className="p-4 bg-base-200 rounded-lg">
        <h1 className="font-black text-3xl">{post ? post.title : null}</h1>
        <div className="mb-2">
          author:{" "}
          <Link href={`/users/${author ? author.id : null}`}>
            <a>{author ? author.name : null}</a>
          </Link>
        </div>
        <hr />
        <p>{post ? post.body : null}</p>
      </div>
      <CommentsSinglePost postId={postId} />
    </>
  );
}
