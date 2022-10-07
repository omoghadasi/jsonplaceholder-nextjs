import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostIds, fetchAllPosts } from "./../../slice/postsSlice";
import PostCard from "./PostCard";

export default function PostsArchive() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const postIds = useSelector(selectPostIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, status]);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = postIds.map((id) => (
      <PostCard postId={id} key={id} className="w-[32.5%] " />
    ));
  } else if (status == "error") {
    content = <div>{error}</div>;
  }

  return <div className="flex flex-wrap justify-between gap-4">{content}</div>;
}
