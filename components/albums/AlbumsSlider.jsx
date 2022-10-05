import { Swiper, SwiperSlide } from "swiper/react";
import AlbumCard from "./AlbumCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAlbums, selectAlbumIds } from "../../slice/albumsSlice";
import { useEffect } from "react";
import Link from "next/link";
import { EffectCreative } from "swiper";
import "swiper/css/effect-creative";
function AlbumsSlider() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.albums.status);
  const error = useSelector((state) => state.albums.error);
  const albumIds = useSelector(selectAlbumIds);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchAllAlbums());
    }
  }, [dispatch, status]);

  const lastAlbumIds = albumIds.slice(0, 12);

  let content;
  if (status == "loading") {
    content = <div>loading...</div>;
  } else if (status == "success") {
    content = lastAlbumIds.map((id) => (
      <SwiperSlide key={id}>
        <AlbumCard albumId={id} />
      </SwiperSlide>
    ));
  } else if (status == "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="albums-slider my-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-black text-4xl capitalize">latest albums</h1>
        <Link href="/albums">
          <a className="btn btn-primary ">see more</a>
        </Link>
      </div>
      <div className="flex rounded-lg overflow-hidden">
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative]}
          className="albumsSwiper"
        >
          {content}
        </Swiper>
      </div>
    </section>
  );
}

export default AlbumsSlider;
