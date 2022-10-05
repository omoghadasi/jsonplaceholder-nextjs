import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, selectPostIds } from "../../slice/postsSlice";
import { useEffect } from "react";
import Link from "next/link";
function PostsSlider() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const postIds = useSelector(selectPostIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, status]);

  const lastPostIds = postIds.slice(0, 13);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = lastPostIds.map((id) => (
      <SwiperSlide key={id}>
        <PostCard postId={id} />
      </SwiperSlide>
    ));
  } else if (status == "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-slider my-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-black text-4xl capitalize">latest posts</h1>
        <Link href="/posts">
          <a className="btn btn-primary ">see more</a>
        </Link>
      </div>
      <div className="flex">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {content}
        </Swiper>
      </div>
    </section>
  );
}

export default PostsSlider;
