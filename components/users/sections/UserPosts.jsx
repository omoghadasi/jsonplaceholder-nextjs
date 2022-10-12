import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostsByUserId,
  fetchPostsByUserId,
} from "../../../slice/postsSlice";
import PostCard from "../../posts/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

export default function UserPosts({ userId }) {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => selectPostsByUserId(state, userId));
  useEffect(() => {
    if (!userPosts.length && userId) {
      dispatch(fetchPostsByUserId(userId));
    }
  }, [dispatch, userId, userPosts]);
  const posts = userPosts.map((post) => (
    <SwiperSlide key={post.id}>
      <PostCard postId={post.id} />
    </SwiperSlide>
  ));
  return (
    <div className="my-5">
      <h1 className="font-extrabold mb-3 text-2xl">User Posts</h1>
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
        {posts}
      </Swiper>
    </div>
  );
}
