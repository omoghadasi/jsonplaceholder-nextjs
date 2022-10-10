import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllComments, fetchAllComments } from "../../slice/commentsSlice";
import CommentCard from "./CommentCard";

export default function CommentsSinglePost({ postId }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.comments.status);
  const error = useSelector((state) => state.comments.error);
  const AllCommentsId = useSelector(selectAllComments);
  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllComments());
    }
  }, [dispatch, status]);

  const PostComments = AllCommentsId.filter(
    (comment) => comment.postId == postId
  );
  let content;
  if (PostComments.length) {
    content = PostComments.map((comment) => (
      <CommentCard key={comment.id} commentId={comment.id} />
    ));
  } else {
    content = "NotFound Comment For This Post";
  }
  return (
    <div className="mt-4">
      <h1 className="font-bold text-xl">Comments: </h1>
      <div className="mt-4 gap-y-2 flex flex-col">{content}</div>
    </div>
  );
}
