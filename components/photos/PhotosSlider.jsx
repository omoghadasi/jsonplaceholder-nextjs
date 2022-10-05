import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import PhotoCard from "./PhotoCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPhotos, selectPhotoIds } from "../../slice/photosSlice";
import { useEffect } from "react";
import Link from "next/link";
import "swiper/css/effect-coverflow";
function PhotosSlider() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.photos.status);
  const error = useSelector((state) => state.photos.error);
  const photoIds = useSelector(selectPhotoIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllPhotos());
    }
  }, [dispatch, status]);

  const lastPhotoIds = photoIds.slice(0, 12);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = lastPhotoIds.map((id) => (
      <SwiperSlide key={id}>
        <PhotoCard photoId={id} />
      </SwiperSlide>
    ));
  } else if (status == "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="photos-slider my-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-black text-4xl capitalize">latest photos</h1>
        <Link href="/photos">
          <a className="btn btn-primary ">see more</a>
        </Link>
      </div>
      <div className="flex rounded-lg overflow-hidden">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2.5}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow]}
          className="photosSwiper"
        >
          {content}
        </Swiper>
      </div>
    </section>
  );
}

export default PhotosSlider;
