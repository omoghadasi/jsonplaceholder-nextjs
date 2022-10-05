import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectUserIds } from "../../slice/usersSlice";
import { useEffect } from "react";
import Link from "next/link";
function UsersSlider() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const userIds = useSelector(selectUserIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, status]);

  const lastUserIds = userIds.slice(0, 12);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = lastUserIds.map((id) => (
      <SwiperSlide key={id}>
        <UserCard userId={id} />
      </SwiperSlide>
    ));
  } else if (status == "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="users-slider my-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-black text-4xl capitalize">latest users</h1>
        <Link href="/users">
          <a className="btn btn-primary ">see more</a>
        </Link>
      </div>
      <div className="flex">
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="usersSwiper"
        >
          {content}
        </Swiper>
      </div>
    </section>
  );
}

export default UsersSlider;
