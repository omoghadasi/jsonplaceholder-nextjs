import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments, selectCommentIds } from "../../slice/commentsSlice";
import { useEffect } from "react";
import Link from "next/link";
function CommentsSlider() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.comments.status);
  const error = useSelector((state) => state.comments.error);
  const commentIds = useSelector(selectCommentIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllComments());
    }
  }, [dispatch, status]);

  const lastCommentIds = commentIds.slice(0, 12);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = lastCommentIds.map((id) => (
      <SwiperSlide key={id}>
        <CommentCard commentId={id} />
      </SwiperSlide>
    ));
  } else if (status == "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="comments-slider my-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-black text-4xl capitalize">latest comments</h1>
        <Link href="/comments">
          <a className="btn btn-primary ">see more</a>
        </Link>
      </div>
      <div className="flex rounded-lg overflow-hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={1.7}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="commentsSwiper"
        >
          {content}
        </Swiper>
      </div>
    </section>
  );
}

export default CommentsSlider;
